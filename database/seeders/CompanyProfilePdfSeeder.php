<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class CompanyProfilePdfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $config = [
            'label' => 'Company Profile PDF',
            'description' => 'Unggah file PDF Company Profile perusahaan (Maksimal 10MB)',
            'group' => 'other',
            'key' => 'company_profile_pdf',
            'value' => '', 
            'type' => 'file',
        ];

        // Menggunakan updateOrCreate agar jika key sudah ada, deskripsi/label terbaru tetap terupdate tanpa duplikat
        Configuration::updateOrCreate(
            ['key' => $config['key'], 'group' => $config['group']],
            $config
        );

        $this->command->info('Configuration untuk Company Profile PDF berhasil ditambahkan!');
    }
}