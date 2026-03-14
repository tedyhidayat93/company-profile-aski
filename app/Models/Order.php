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
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'total_price' => 'decimal:2',
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
