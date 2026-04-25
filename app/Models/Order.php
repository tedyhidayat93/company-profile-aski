<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'order_number',
        'company_name',
        'pic_name',
        'phone',
        'email',
        'address',
        'province',
        'regency',
        'district',
        'village',
        'postal_code',
        'notes',
        'product_id',
        'product_name',
        'product_category',
        'product_image',
        'product_price',
        'quantity',
        'total_price',
        'status',
        'admin_notes',
        'status_history',
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'status_history' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function generateOrderNumber(): string
    {
        $prefix = 'ORD';
        $date = now()->format('Ymd');
        $lastOrder = static::where('order_number', 'like', $prefix . $date . '%')
            ->orderBy('order_number', 'desc')
            ->first();

        if ($lastOrder) {
            $lastSequence = (int) substr($lastOrder->order_number, -4);
            $sequence = $lastSequence + 1;
        } else {
            $sequence = 1;
        }

        return $prefix . $date . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Log status change with user information
     */
    public function logStatusChange(string $status, string $note = null, $userId = null, $username = null): void
    {
        $history = $this->status_history ?? [];
        
        $history[] = [
            'created_by' => $userId ?? auth()->id(),
            'username' => $username ?? (auth()->user()->name ?? 'System'),
            'note' => $note,
            'status' => $status,
            'created_at' => now()->toISOString(),
        ];

        $this->status_history = $history;
        $this->save();
    }

    /**
     * Get formatted status history
     */
    public function getFormattedStatusHistory(): array
    {
        $history = $this->status_history ?? [];
        
        return array_map(function ($item) {
            return [
                'created_by' => $item['created_by'] ?? null,
                'username' => $item['username'] ?? 'Unknown',
                'note' => $item['note'] ?? '',
                'status' => $item['status'] ?? '',
                'created_at' => $item['created_at'] ?? '',
                'formatted_date' => isset($item['created_at']) ? \Carbon\Carbon::parse($item['created_at'])->format('d M Y H:i') : '',
            ];
        }, $history);
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pending' => 'Pesanan Baru',
            'confirmed' => 'Dikonfirmasi',
            'processing' => 'Diproses',
            'shipped' => 'Dikirim',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan',
            default => ucfirst($this->status),
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'warning',
            'confirmed' => 'info',
            'processing' => 'primary',
            'shipped' => 'secondary',
            'completed' => 'success',
            'cancelled' => 'danger',
            default => 'secondary',
        };
    }
}
