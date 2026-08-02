<?php

namespace App\Http\Controllers\BackPanel\Analytics;

use App\Http\Controllers\Controller;
use App\Models\LogVisitor;
use App\Models\Lead;
use App\Models\Customer;
use App\Traits\TracksVisitors;
use App\Support\Enums\LeadType;
use App\Support\Enums\VisitorAction;
use App\Support\Enums\PageList;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Carbon\Carbon;

class VisitorLogController extends Controller
{
    use TracksVisitors;

    /**
     * Daftar device yang valid & dikenal oleh sistem.
     * Dipakai untuk zero-fill matrix "by_device" agar bentuk respons stabil di FE.
     */
    private const KNOWN_DEVICES = ['phone', 'tablet', 'pc'];

    public function __construct()
    {
        $this->middleware('permission:visitor-log-list')->except(['storeLeadsLog']);
    }

    public function index(Request $request)
    {
        Gate::authorize('visitor-log-list');

        // 1. Validasi & normalisasi seluruh input filter di satu tempat.
        //    Ini mencegah nilai liar (mis. per_page=99999, device tidak dikenal,
        //    action bukan enum) ikut nyasar ke query.
        $validated = $this->resolveFilters($request);

        [$dateFrom, $dateTo, $search, $device, $action, $perPage] = [
            $validated['date_from'],
            $validated['date_to'],
            $validated['search'],
            $validated['device'],
            $validated['action'],
            $validated['per_page'],
        ];

        // 2. Bangun Base Query Utama yang terikat dengan aturan Filtering.
        //    "all" dianggap sama dengan "tidak difilter" — baik dikirim FE maupun tidak.
        $query = LogVisitor::query()
            ->when($dateFrom, fn (Builder $q) => $q->whereDate('created_at', '>=', $dateFrom))
            ->when($dateTo, fn (Builder $q) => $q->whereDate('created_at', '<=', $dateTo))
            ->when($device && $device !== 'all', fn (Builder $q) => $q->where('device', $device))
            ->when($action && $action !== 'all', fn (Builder $q) => $q->where('action', $action))
            ->when($search, function (Builder $q) use ($search) {
                return $q->where(function (Builder $innerQuery) use ($search) {
                    $innerQuery->where('message', 'like', "%{$search}%")
                        ->orWhere('url_path', 'like', "%{$search}%")
                        ->orWhere('page', 'like', "%{$search}%")
                        ->orWhere('ip_address', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('region', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%");
                });
            });

        // 3. Ambil data analitik matriks & chart menggunakan kloning query terfilter.
        $visitorStatistics = $this->getVisitorStatistics(clone $query);

        // 4. Dapatkan daftar baris data terpaginasi untuk tabel bawah.
        $visitorLogs = $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('backpanel/analytics/visitor-logs/index', [
            'visitorLogs' => $visitorLogs,
            'actionOptions' => VisitorAction::getOptions(),
            'filters' => [
                'search' => $search,
                'device' => $device,
                'action' => $action,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
                'per_page' => (int) $perPage,
            ],
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
     * Validasi & normalisasi semua parameter filter dari request.
     * Mengembalikan array asosiatif siap pakai dengan default yang konsisten.
     */
    private function resolveFilters(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
            'search' => ['nullable', 'string', 'max:150'],
            'device' => ['nullable', 'string', 'in:all,' . implode(',', self::KNOWN_DEVICES)],
            'action' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:10', 'max:200'],
        ]);

        // Jangan sampai action tidak valid membuat 500 — validasi manual lewat enum,
        // fallback ke 'all' bila tidak dikenal (silent-safe, bukan hard error 422)
        // supaya widget filter yang stale/typo URL tidak mem-break dashboard.
        $action = $request->input('action');
        if ($action && $action !== 'all' && VisitorAction::tryFrom($action) === null) {
            $action = 'all';
        }

        $data = $validator->safe()->only(['date_from', 'date_to', 'search', 'device', 'per_page']);

        return [
            'date_from' => $data['date_from'] ?? Carbon::now()->subMonth()->toDateString(),
            'date_to' => $data['date_to'] ?? Carbon::now()->toDateString(),
            'search' => $data['search'] ?? null,
            'device' => $data['device'] ?? 'all',
            'action' => $action ?: 'all',
            'per_page' => (int) ($data['per_page'] ?? 10),
        ];
    }

    /**
     * Menghitung & mengelompokkan data analitik grafik berdasarkan kueri terfilter.
     */
    private function getVisitorStatistics(Builder $query): array
    {
        // A. Matriks Total & Device Breakdown
        $totalAllRow = (clone $query)->count();

        $byDeviceRaw = (clone $query)->selectRaw('device, count(*) as count')
            ->groupBy('device')
            ->get()
            ->pluck('count', 'device')
            ->toArray();

        // Zero-fill agar key selalu lengkap (phone/tablet/pc) meski hasilnya 0 —
        // penting supaya widget & pie chart di FE tidak perlu cek "undefined".
        $byDevice = collect(self::KNOWN_DEVICES)
            ->mapWithKeys(fn ($d) => [$d => $byDeviceRaw[$d] ?? 0])
            ->toArray();

        $topDeviceKey = $byDevice ? array_search(max($byDevice), $byDevice) : null;

        // B. Total per Visitor Action — zero-fill terhadap seluruh enum (kecuali "all")
        //    supaya bar/pie chart action tidak "loncat-loncat" bentuknya antar filter.
        $byActionRaw = (clone $query)->selectRaw('action, count(*) as count')
            ->groupBy('action')
            ->get()
            ->pluck('count', 'action')
            ->toArray();

        $byAction = collect(VisitorAction::cases())
            ->reject(fn (VisitorAction $case) => $case === VisitorAction::ALL)
            ->mapWithKeys(fn (VisitorAction $case) => [
                $case->value => [
                    'label' => $case->label(),
                    'count' => $byActionRaw[$case->value] ?? 0,
                ],
            ])
            ->toArray();

        // C. Breakdown Aktivitas Khusus WhatsApp
        //    Semua case WA_* di enum konsisten diawali "whatsapp_", jadi prefix-match
        //    ('whatsapp%') lebih murah dibanding infix-match ('%whatsapp%').
        $whatsappBreakdownRaw = (clone $query)->selectRaw('action, count(*) as count')
            ->where('action', 'like', 'whatsapp%')
            ->groupBy('action')
            ->get()
            ->pluck('count', 'action')
            ->toArray();

        $whatsappBreakdown = collect($whatsappBreakdownRaw)
            ->mapWithKeys(function ($count, $actionValue) {
                $label = VisitorAction::tryFrom($actionValue)?->label() ?? $actionValue;
                return [$actionValue => ['label' => $label, 'count' => $count]];
            })
            ->toArray();

        $totalWhatsapp = array_sum($whatsappBreakdownRaw);

        // D. Data Negara & Wilayah Terbanyak
        $byCountryRegion = (clone $query)->selectRaw('country, region, count(*) as count')
            ->whereNotNull('country')
            ->groupBy('country', 'region')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        $topCountry = (clone $query)->selectRaw('country, count(*) as count')
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderByDesc('count')
            ->first();

        // E. Total Kunjungan Per Halaman & Halaman Paling Sering Dibuka
        $byPage = (clone $query)->selectRaw('page, count(*) as count')
            ->groupBy('page')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // F. Trendline Line-Chart (Data Akumulasi Aktivitas per Hari untuk Grafik)
        $trendline = (clone $query)->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn ($item) => [
                'date' => Carbon::parse($item->date)->format('Y-m-d'),
                'date_label' => Carbon::parse($item->date)->translatedFormat('d M'),
                'count' => (int) $item->count,
            ]);

        return [
            'total_all_row' => $totalAllRow,
            'leaderboard' => [
                'top_country' => $topCountry->country ?? 'Unknown',
                'top_page' => $byPage->first()->page ?? '-',
                'top_device' => $topDeviceKey ?: '-',
            ],
            'by_device' => $byDevice,
            'by_action' => $byAction,
            'whatsapp_stats' => [
                'total' => $totalWhatsapp,
                'breakdown' => $whatsappBreakdown,
            ],
            'by_country_region' => $byCountryRegion,
            'by_page' => $byPage,
            'trendline' => $trendline,
        ];
    }

    public function storeLeadsLog(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'             => 'required|string|max:100',
            'company'          => 'nullable|string|max:150',
            'phone'            => 'nullable|string|max:30',
            'email'            => 'nullable|email|max:100',
            'is_approve_terms' => ['sometimes', 'accepted'],
            'subject'          => 'nullable|string|max:200',
            'message'          => 'required|string|max:2000',
            'source_page'      => ['required', 'string', new Enum(PageList::class)],
            'action_type'      => ['required', 'string', new Enum(VisitorAction::class)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data formulir tidak valid.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $ip = $request->ip();
        $identifier = $request->phone ?? $request->email ?? $request->name ?? 'anonymous';

        $actionStr = $request->action_type instanceof VisitorAction ? $request->action_type->value : $request->action_type;
        $pageStr = $request->source_page instanceof PageList ? $request->source_page->value : $request->source_page;

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
                'message' => 'Pesan serupa sedang diproses, mohon tunggu sebentar.',
            ], 422);
        }

        Cache::put($antiSpamKey, true, 4);

        $action = $request->action_type instanceof VisitorAction
            ? $request->action_type->value
            : VisitorAction::from($request->action_type)->value;

        $page = $request->source_page instanceof PageList
            ? $request->source_page->value
            : PageList::from($request->source_page)->value;

        $leadType = str_contains(strtolower($action), 'whatsapp') 
            ? LeadType::WHATSAPP 
            : LeadType::CONTACT_FORM;

        $fullMessage = $request->message;
        if ($request->company || $request->subject) {
            $metaInfo = [];
            if ($request->company) $metaInfo[] = "Perusahaan: {$request->company}";
            if ($request->subject) $metaInfo[] = "Subjek/Kebutuhan: {$request->subject}";
            $fullMessage = "[" . implode(' | ', $metaInfo) . "] \n\n" . $request->message;
        }

        $details = [];
        if ($request->company) $details[] = "Perusahaan: {$request->company}";
        if ($request->subject) $details[] = "Kebutuhan: {$request->subject}";
        $shortMessage = mb_strimwidth($request->message, 0, 60, "...");
        $details[] = "Pesan: {$shortMessage}";
        $logMessage = "Leads Form Submit [" . implode(' | ', $details) . "]";

        $visitorLog = $this->trackAction($request, $action, $page, $logMessage);
        $visitorLogId = $visitorLog?->id;

        Customer::syncFromLead([
            'name'  => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        Lead::capture(
            request: new Request([
                'name'       => $request->name,
                'phone'      => $request->phone,
                'email'      => $request->email,
                'message'    => $fullMessage,
                'action'     => $action,
                'is_approve_terms' => $request->boolean('is_approve_terms'),
                'page_url'   => $request->input('page_url', url()->previous()),
            ]),
            type: $leadType,
            action: $action,
            logVisitorId: $visitorLogId
        );

        return response()->json([
            'success' => true,
            'message' => 'Berhasil merekam log interaksi dan data leads.',
        ], 200);
    }
}