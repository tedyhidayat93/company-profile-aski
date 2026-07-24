<?php

namespace App\Http\Controllers\BackPanel\Analytics;

use App\Http\Controllers\Controller;
use App\Models\LogVisitor;
use Illuminate\Validation\Rules\Enum;
use App\Traits\TracksVisitors; // 1. Tambahkan Trait Anda di sini
use App\Support\Enums\VisitorAction;
use App\Support\Enums\PageList;      // <-- Import Enum Halaman
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator; // Tambahkan untuk validasi API
use Illuminate\Support\Facades\Cache;     // Tambahkan untuk anti-bruteforce lock

class VisitorLogController extends Controller
{
    // 2. Gunakan trait tracking visitor Anda
    use TracksVisitors;

    public function __construct()
    {
        // 3. Pastikan 'storeLeadsLog' dikecualikan (except) agar bisa diakses publik/frontend
        $this->middleware('permission:visitor-log-list')->except(['storeLeadsLog']);
    }

    public function index(Request $request)
    {
        Gate::authorize('visitor-log-list');
        
        // Build base query with filters
        $baseQuery = LogVisitor::query()
            ->when($request->search, function ($query, $search) {
                return $query->where('page', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('device', 'like', "%{$search}%")
                    ->orWhere('user_agent', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('url_path', 'like', "%{$search}%");
            })
            ->when($request->device, function ($query, $device) {
                return $query->where('device', $device);
            })
            ->when($request->action, function ($query, $action) {
                return $query->where('action', $action);
            })
            ->when($request->date_from, function ($query, $dateFrom) {
                return $query->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($query, $dateTo) {
                return $query->whereDate('created_at', '<=', $dateTo);
            });

        // Get visitor statistics with same filters
        $visitorStatistics = $this->getVisitorStatistics($baseQuery);

        // Get paginated results
        $perPage = $request->get('per_page', 50);
        $visitorLogs = $baseQuery->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('backpanel/analytics/visitor-logs/index', [
            'visitorLogs' => $visitorLogs,
            'actionOptions' => VisitorAction::getOptions(),
            'filters' => $request->only(['search', 'device', 'action', 'date_from', 'date_to', 'per_page']),
            'statistics' => $visitorStatistics,
        ]);
    }

    public function show($id)
    {
        Gate::authorize('visitor-log-list');
        
        $visitorLog = LogVisitor::findOrFail($id);
        
        return Inertia::render('backpanel/analytics/visitor-logs/show', [
            'visitorLog' => $visitorLog,
        ]);
    }

    /**
     * Get visitor statistics based on filtered query
     */
    private function getVisitorStatistics($query)
    {
        return [
            'total_visitors' => (clone $query)->count(),
            'unique_ips' => (clone $query)->distinct('ip_address')->count('ip_address'),
            'by_device' => (clone $query)->selectRaw('device, count(*) as count')
                ->groupBy('device')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->device => $item->count];
                }),
            'by_action' => (clone $query)->selectRaw('action, count(*) as count')
                ->groupBy('action')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->action => $item->count];
                }),
            'by_country' => (clone $query)->selectRaw('country, count(*) as count')
                ->whereNotNull('country')
                ->groupBy('country')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get(),
            'recent_visits' => (clone $query)->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(['page', 'ip_address', 'device', 'created_at']),
        ];
    }

    /**
     * =========================================================================
     * ENDPOINT API: Menyimpan log interaksi Leads (WhatsApp/Contact Submit)
     * Bersifat Universal untuk Segala Komponen & Halaman (Nullable Friendly)
     * Proteksi Bruteforce & Content Duplicate Check via Cache Lock
     * =========================================================================
     */
    public function storeLeadsLog(Request $request)
    {
        // 1. Validasi struktur data
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:100',
            'company'     => 'nullable|string|max:150',
            'phone'       => 'nullable|string|max:30',   
            'email'       => 'nullable|email|max:100',    
            'subject'     => 'nullable|string|max:200',  
            'message'     => 'required|string|max:2000',
            'source_page' => ['required', 'string', new Enum(PageList::class)],
            'action_type' => ['required', 'string', new Enum(VisitorAction::class)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data formulir tidak valid.',
                'errors'  => $validator->errors()
            ], 422);
        }

        // 2. Proteksi Anti-Spam / Double-Click Presisi
        $ip = $request->ip();
        $identifier = $request->phone ?? $request->email ?? $request->name ?? 'anonymous';
        
        $actionStr = $request->action_type instanceof VisitorAction ? $request->action_type->value : $request->action_type;
        $pageStr = $request->source_page instanceof PageList ? $request->source_page->value : $request->source_page;

        // Racikan Hash menyertakan action_type dan sha1(message). 
        // Ini menjamin: Jika aksi/tombolnya berbeda, atau isi pesannya berbeda, HASH AKAN BERBEDA (Lolos).
        // Tapi jika aksi dan pesan SAMA PERSIS diklik berulang kali, HASH AKAN SAMA (Terblokir).
        $contentHash = md5(
            $ip . '_' . 
            $actionStr . '_' . 
            $pageStr . '_' . 
            trim($identifier) . '_' . 
            sha1($request->message)
        );
        
        $antiSpamKey = 'leads_lock_' . $contentHash;

        if (Cache::has($antiSpamKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Pesan serupa sedang diproses, mohon tunggu sebentar.'
            ], 422); // Mengembalikan 422 agar sisi Axios React tahu ini terblokir/debounce
        }

        // Kunci selama 4 detik untuk mencegah spam klik ganda pada tombol & pesan yang sama
        Cache::put($antiSpamKey, true, 4);

        // 3. Format teks log deskripsi
        $details = [];
        if ($request->company) $details[] = "Perusahaan: {$request->company}";
        if ($request->subject) $details[] = "Kebutuhan: {$request->subject}";
        
        $shortMessage = mb_strimwidth($request->message, 0, 60, "...");
        $details[] = "Pesan: {$shortMessage}";

        $logMessage = "Leads Form Submit [" . implode(' | ', $details) . "]";

        // 4. Catat Aksi Ke Database
        $action = $request->action_type instanceof VisitorAction 
            ? $request->action_type->value 
            : VisitorAction::from($request->action_type)->value;

        $page = $request->source_page instanceof PageList 
            ? $request->source_page->value 
            : PageList::from($request->source_page)->value;

        $this->trackAction(
            $request,
            $action,
            $page,
            $logMessage
        );

        return response()->json([
            'success' => true,
            'message' => 'Berhasil merekam log interaksi data visitor.'
        ], 200);
    }
}