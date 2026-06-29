<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class HeadingCatalogHomePageSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Other Configuration
        $this->buildObject();
    }

    /**
     * Create site configuration settings
     */
    private function buildObject(): void
    {
        $siteConfigs = [
            [
                'label' => 'Katalog - Title',
                'description' => 'Judul section Katalog',
                'group' => 'view_homepage',
                'key' => 'catalog_title',
                'value' => 'Katalog',
                'type' => 'text',
            ],
            [
                'label' => 'Katalog - Description',
                'description' => 'Deskripsi section Katalog',
                'group' => 'view_homepage',
                'key' => 'catalog_description',
                'value' => 'Berbagai layanan profesional yang kami tawarkan untuk memenuhi kebutuhan kontainer Anda',
                'type' => 'textarea',
            ],
            
        ];

        foreach ($siteConfigs as $config) {
            Configuration::firstOrCreate(
                ['key' => $config['key'], 'group' => $config['group']],
                $config
            );
        }
    }
}