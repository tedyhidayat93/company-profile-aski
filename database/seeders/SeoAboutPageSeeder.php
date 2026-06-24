<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class SeoAboutPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Other Configuration
        $this->createSEOConfiguration();
    }

    /**
     * Create site configuration settings
     */
    private function createSEOConfiguration(): void
    {
        $siteConfigs = [

            // About Page
            [
                'label' => 'Tentang Kami Meta Image',
                'description' => 'Upload meta image untuk SEO halaman Tentang Kami',
                'group' => 'seo',
                'key' => 'about_us_meta_image',
                'value' => '/images/placeholder.png',
                'type' => 'image',
            ],
            [
                'label' => 'Tentang Kami Meta Title',
                'description' => 'SEO Meta title untuk halaman Tentang Kami',
                'group' => 'seo',
                'key' => 'about_us_meta_title',
                'value' => 'Tentang Kami | Jual, Beli, Sewa & Repair Kontainer Berkualitas',
                'type' => 'text',
            ],
            [
                'label' => 'Tentang Kami Meta Description',
                'description' => 'SEO Meta description untuk halaman Tentang Kami (Maksimal 160 Karakter)',
                'group' => 'seo',
                'key' => 'about_us_meta_description',
                'value' => 'Pelajari profil kami sebagai penyedia solusi kontainer terpercaya. Melayani jual, beli, sewa, modifikasi, hingga jasa repair kontainer standar internasional.',
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