<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    /**
     * Otomatis simpan atau update data customer berdasarkan nomor telepon (unik)
     */
    public static function syncFromLead(array $data): ?self
    {
        // Jika nomor telepon kosong / tidak ada, batalkan proses simpan customer
        if (empty($data['phone'])) {
            return null;
        }

        // Bersihkan format nomor telepon (opsional, misal hanya ambil angka)
        $cleanPhone = preg_replace('/[^0-9]/', '', $data['phone']);

        if (empty($cleanPhone)) {
            return null;
        }

        // Cek apakah customer dengan nomor telepon tersebut sudah ada (termasuk yang soft deleted)
        $customer = self::withTrashed()->where('phone', 'LIKE', "%{$cleanPhone}%")->first();

        if ($customer) {
            // Jika sudah ada, update data jika ada informasi baru yang lebih lengkap
            $updateData = [];
            
            // Update nama jika sebelumnya kosong atau menggunakan nama default
            if (!empty($data['name']) && (empty($customer->name) || $customer->name === 'Anonymous')) {
                $updateData['name'] = $data['name'];
            }
            
            // Update email jika sebelumnya kosong
            if (!empty($data['email']) && empty($customer->email)) {
                $updateData['email'] = $data['email'];
            }

            // Jika customer sebelumnya dalam status soft deleted, aktifkan kembali
            if ($customer->trashed()) {
                $customer->restore();
                $updateData['is_active'] = true;
            }

            if (!empty($updateData)) {
                $customer->update($updateData);
            }

            return $customer;
        }

        // Jika belum ada, buat customer baru
        return self::create([
            'name'      => $data['name'] ?? 'Pelanggan Baru',
            'email'     => $data['email'] ?? null,
            'phone'     => $data['phone'],
            'address'   => $data['address'] ?? null,
            'is_active' => true,
        ]);
    }
}
