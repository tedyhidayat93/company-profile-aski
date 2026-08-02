<?php

namespace App\Http\Controllers\BackPanel\CRM;

use App\Http\Controllers\Controller;
use App\Support\Enums\PageList;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;    

class LeadController extends Controller
{
    /**
     * Menampilkan daftar semua leads.
     */
    public function index(Request $request)
    {
        $formActions = [
            'whatsapp_quote_catalog_detail',
            'whatsapp_contact_page_submit',
            'whatsapp_mini_form_quote_request',
            'whatsapp_global_floating',
        ];

        $directActions = [
            'whatsapp_onpage_direct_click',
            'whatsapp_top_navbar_direct_click',
            'whatsapp_footer_direct_click',
        ];

        $leads = Lead::with('visitorLog')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('message', 'like', "%{$search}%");
            })
            ->when($request->type && $request->type !== 'all', function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->lead_category, function ($query, $category) use ($formActions, $directActions) {
                if ($category === 'complete_contact') {
                    $query->where(function($q) {
                        $q->whereNotNull('phone')->where('phone', '!=', '')
                          ->orWhereNotNull('email')->where('email', '!=', '');
                    });
                } elseif ($category === 'form_incomplete') {
                    $query->whereIn('action', $formActions)
                          ->where(function($q) {
                              $q->whereNull('phone')->orWhere('phone', '=', '')
                                ->whereNull('email')->orWhere('email', '=', '');
                          });
                } elseif ($category === 'direct_click') {
                    $query->whereIn('action', $directActions);
                }
            })
            ->when($request->page_source && $request->page_source !== 'all', function ($query, $pageValue) {
                $query->whereHas('visitorLog', function($q) use ($pageValue) {
                    $q->where('page', $pageValue);
                });
            })
            ->latest('timestamp')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('backpanel/crm/leads/index', [
            'leads' => $leads,
            'filters' => $request->only(['search', 'type', 'lead_category', 'page_source', 'date_from', 'date_to']),
            'pageOptions' => collect(PageList::cases())->map(fn($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
        ]);
    }

    /**
     * Menampilkan detail informasi lead tertentu.
     */
    public function show($id)
    {
        // Cari lead beserta relasi log visitor-nya
        $lead = Lead::with(['visitorLog'])->findOrFail($id);

        return Inertia::render('backpanel/crm/leads/show', [
            'lead' => [
                'id'               => $lead->id,
                'name'             => $lead->name ?? 'Anonymous',
                'phone'            => $lead->phone ?? '-',
                'email'            => $lead->email ?? '-',
                'type'             => $lead->type,
                'action'           => $lead->action,
                'message'          => $lead->message ?? '-',
                'is_approve_terms' => $lead->is_approve_terms,
                'ip_address'       => $lead->ip_address,
                'country'          => $lead->country ?? 'Unknown',
                'region'           => $lead->region ?? 'Unknown',
                'page_url'         => $lead->page_url,
                'timestamp'        => $lead->timestamp ? $lead->timestamp->format('d M Y, H:i:s') : '-',
                
                // Data pendukung dari relasi LogVisitor (jika ada)
                'visitor_log'      => $lead->visitorLog ? [
                    'device'      => $lead->visitorLog->device,
                    'user_agent'  => $lead->visitorLog->user_agent,
                    'city'        => $lead->visitorLog->city,
                    'latitude'    => $lead->visitorLog->latitude,
                    'longitude'   => $lead->visitorLog->longitude,
                    'http_method' => $lead->visitorLog->http_method,
                ] : null,
            ],
        ]);
    }

    /**
     * Menghapus data lead.
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return redirect()->route('cpanel.crm.leads.index')
            ->with('success', 'Data lead berhasil dihapus.');
    }
}