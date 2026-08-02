<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\Enums\LeadType;
use App\Support\Enums\VisitorAction;
use Illuminate\Http\Request;

class Lead extends Model
{
    use HasFactory;

    protected $table = 'leads';

    protected $fillable = [
        'log_visitor_id',
        'type',
        'name',
        'phone',
        'email',
        'message',
        'is_approve_terms',
        'action',
        'ip_address',
        'country',
        'region',
        'page_url',
        'timestamp',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];

    /**
     * Method reusable untuk mencatat dan menyimpan lead baru ke database.
     */
    public static function capture(Request $request, LeadType $type, ?string $action = null, ?int $logVisitorId = null): static
    {
        return self::create([
            'log_visitor_id' => $logVisitorId ?? $request->input('log_visitor_id'),
            'type'           => $type->value,
            'name'           => $request->input('name') ?? $request->name ?? null,
            'phone'          => $request->input('phone') ?? $request->phone ?? null,
            'email'          => $request->input('email') ?? $request->email ?? null,
            'message'        => $request->input('message') ?? $request->message ?? null,
            'is_approve_terms' => $request->input('is_approve_terms') ?? false,
            'action'         => $action ?? $request->input('action') ?? VisitorAction::WA_CONTACT_PAGE_SUBMIT->value,
            'ip_address'     => request()->ip(),
            'country'        => $request->input('country') ?? null,
            'region'         => $request->input('region') ?? null,
            'page_url'       => $request->input('page_url') ?? request()->fullUrl(),
            'timestamp'      => now(),
        ]);
    }

    // Relasi opsional ke LogVisitor (sesuaikan nama model log visitor Anda)
    public function visitorLog()
    {
        return $this->belongsTo(LogVisitor::class, 'log_visitor_id');
    }

    // Scope helper untuk mempermudah filter berdasarkan tipe
    public function scopeOfType($query, string|LeadType $type)
    {
        $typeValue = $type instanceof LeadType ? $type->value : $type;
        return $query->where('type', $typeValue);
    }
}