<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class CompanyProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            [
                'label' => 'Detail Tentang Kami',
                'description' => 'Deskripsi lengkap atau sejarah singkat mengenai profil perusahaan.',
                'group' => 'about',
                'key' => 'about_detail',
                'value' => 'PT. Alumoda Sinergi Kontainer Indonesia adalah penyedia solusi kontainer terpercaya yang bergerak di bidang pengadaan, modifikasi custom, hingga manajemen logistik andalan untuk mendukung berbagai sektor industri.', 
                'type' => 'wysiwyg',
            ],
            [
                'label' => 'Visi Perusahaan',
                'description' => 'Visi jangka panjang yang ingin dicapai oleh perusahaan.',
                'group' => 'about',
                'key' => 'about_vision',
                'value' => 'Menjadi pemimpin pasar nasional dalam industri modifikasi dan penyedia kontainer dengan mengutamakan inovasi, kualitas berstandar global, dan kepuasan pelanggan.', 
                'type' => 'wysiwyg',
            ],
            [
                'label' => 'Misi Perusahaan',
                'description' => 'Misi atau langkah strategis yang dijalankan perusahaan.',
                'group' => 'about',
                'key' => 'about_mission',
                'value' => '1. Menyediakan produk kontainer berkualitas tinggi dan aman.\n2. Menghadirkan inovasi modifikasi custom sesuai kebutuhan spesifik klien.\n3. Memberikan pelayanan profesional, transparan, dan pengiriman tepat waktu.', 
                'type' => 'wysiwyg',
            ],
            [
                'label' => 'Company Profile PDF',
                'description' => 'Unggah file PDF Company Profile perusahaan (Maksimal 10MB)',
                'group' => 'about', // Group diubah menjadi 'about' sesuai permintaan
                'key' => 'company_profile_pdf',
                'value' => '', 
                'type' => 'file',
            ],
        ];

        foreach ($configs as $config) {
            // Menggunakan updateOrCreate agar jika key sudah ada, data diperbarui tanpa membuat duplikat
            Configuration::updateOrCreate(
                ['key' => $config['key']],
                $config
            );
        }

        $this->command->info('Configuration untuk Profil Perusahaan (About, Vision, Mission, & PDF) berhasil ditambahkan!');
    }
}