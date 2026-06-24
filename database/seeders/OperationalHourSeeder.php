<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class OperationalHourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            [
                'label' => 'Daftar Informasi Cabang',
                'description' => 'Informasi daftar cabang kantor/tenan mu.',
                'group' => 'about',
                'key' => 'office_branch',
                'value' => '', 
                'type' => 'wysiwyg',
            ],
            [
                'label' => 'Jam Operasional',
                'description' => 'Informasi jam operasional',
                'group' => 'site',
                'key' => 'site_operational_hour',
                'value' => 'Buka 24 jam', 
                'type' => 'wysiwyg',
            ],
        ];

        foreach ($configs as $config) {
            Configuration::updateOrCreate(
                ['key' => $config['key']],
                $config
            );
        }

        $this->command->info('Configuration untuk Jam Operasional & Informasi Cabang berhasil ditambahkan!');
    }
}