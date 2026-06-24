<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            [
                'label' => 'Video Profil',
                'description' => 'Video tentang profile personal/perusahaan mu. Sematkan video mu dalam bentuk link.',
                'group' => 'about',
                'key' => 'profile_video',
                'value' => '', 
                'type' => 'wysiwyg',
            ],
            [
                'label' => 'Tampilkan Modal Popup Video Profil',
                'description' => 'Popup otomatis Video Profile di halaman Beranda',
                'group' => 'other',
                'key' => 'auto_modal_popup_video_homepate',
                'value' => 'false',
                'type' => 'checkbox',
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