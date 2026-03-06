<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = [
            [
                'company_name' => 'PT. Teknologi Maju',
                'pic_name' => 'Budi Santoso',
                'phone' => '+6281234567890',
                'email' => 'budi@teknologimaju.com',
                'address' => 'Jl. Sudirman No. 123, Gedung ABC Lt. 5',
                'province' => 'DKI Jakarta',
                'regency' => 'Jakarta Pusat',
                'district' => 'Tanah Abang',
                'village' => 'Bendungan Hilir',
                'postal_code' => '10210',
                'notes' => 'Mohon dikirim sebelum akhir bulan',
                'product_id' => 1,
                'product_name' => 'Laptop Gaming Pro Max',
                'product_category' => 'Elektronik',
                'product_image' => 'https://via.placeholder.com/300x300',
                'product_price' => 15000000,
                'quantity' => 2,
                'total_price' => 30000000,
                'status' => 'pending',
                'admin_notes' => 'Customer meminta pengiriman cepat',
            ],
            [
                'company_name' => 'CV. Digital Creative',
                'pic_name' => 'Siti Nurhaliza',
                'phone' => '+6289876543210',
                'email' => 'siti@digitalcreative.com',
                'address' => 'Ruko Golden Blok C No. 45',
                'province' => 'Jawa Barat',
                'regency' => 'Kota Bandung',
                'district' => 'Coblong',
                'village' => 'Dago',
                'postal_code' => '40135',
                'notes' => 'Perlu faktur pajak',
                'product_id' => 2,
                'product_name' => 'Smartphone Premium X',
                'product_category' => 'Elektronik',
                'product_image' => 'https://via.placeholder.com/300x300',
                'product_price' => 8000000,
                'quantity' => 5,
                'total_price' => 40000000,
                'status' => 'confirmed',
                'admin_notes' => 'Sudah DP 50%',
            ],
            [
                'company_name' => 'PT. Inovasi Indonesia',
                'pic_name' => 'Ahmad Fauzi',
                'phone' => '+6281122334455',
                'email' => 'ahmad@inovasiindo.com',
                'address' => 'Jl. Gatot Subroto No. 88',
                'province' => 'DKI Jakarta',
                'regency' => 'Jakarta Selatan',
                'district' => 'Mampang Prapatan',
                'village' => 'Tegal Parang',
                'postal_code' => '12790',
                'notes' => 'Urgent untuk kebutuhan kantor',
                'product_id' => 3,
                'product_name' => 'Tablet Pro 12 inch',
                'product_category' => 'Elektronik',
                'product_image' => 'https://via.placeholder.com/300x300',
                'product_price' => 12000000,
                'quantity' => 10,
                'total_price' => 120000000,
                'status' => 'processing',
                'admin_notes' => 'Sedang disiapkan di gudang',
            ],
            [
                'company_name' => 'UD. Sukses Makmur',
                'pic_name' => 'Diana Putri',
                'phone' => '+6285566778899',
                'email' => 'diana@suksesmakmur.com',
                'address' => 'Perumahan Green Garden Blok A No. 15',
                'province' => 'Jawa Timur',
                'regency' => 'Kota Surabaya',
                'district' => 'Sukolilo',
                'village' => 'Keputih',
                'postal_code' => '60117',
                'notes' => 'Mohon packing yang aman',
                'product_id' => 4,
                'product_name' => 'Smartwatch Ultra',
                'product_category' => 'Aksesoris',
                'product_image' => 'https://via.placeholder.com/300x300',
                'product_price' => 3000000,
                'quantity' => 3,
                'total_price' => 9000000,
                'status' => 'shipped',
                'admin_notes' => 'Dikirim via JNE Reguler',
            ],
            [
                'company_name' => 'CV. Berkah Jaya',
                'pic_name' => 'Rizki Ananda',
                'phone' => '+6283344556677',
                'email' => 'rizki@berkahjaya.com',
                'address' => 'Jl. Diponegoro No. 200',
                'province' => 'DI Yogyakarta',
                'regency' => 'Kota Yogyakarta',
                'district' => 'Gondokusuman',
                'village' => 'Gondokusuman',
                'postal_code' => '55225',
                'notes' => 'Pembayaran COD',
                'product_id' => 5,
                'product_name' => 'Headphone Wireless Pro',
                'product_category' => 'Aksesoris',
                'product_image' => 'https://via.placeholder.com/300x300',
                'product_price' => 1500000,
                'quantity' => 8,
                'total_price' => 12000000,
                'status' => 'completed',
                'admin_notes' => 'Pesanan selesai, customer puas',
            ],
        ];

        foreach ($orders as $orderData) {
            $orderData['order_number'] = Order::generateOrderNumber();
            Order::create($orderData);
        }
    }
}
