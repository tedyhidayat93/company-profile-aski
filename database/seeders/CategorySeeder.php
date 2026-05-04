<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
        [
            'name' => 'Container',
            'slug' => 'container',
            'type' => 'product',
            'description' => 'Berbagai jenis container untuk kebutuhan logistik dan industri',
            'children' => [

                [
                    'name' => 'Standar (Dry Container)',
                    'slug' => 'standar-container',
                    'type' => 'product',
                    'description' => 'Container standar untuk pengiriman umum',
                ],
                [
                    'name' => 'Reefer (Pendingin)',
                    'slug' => 'reefer',
                    'type' => 'product',
                    'description' => 'Container dengan sistem pendingin',
                ],
                [
                    'name' => 'Open Top',
                    'slug' => 'open-top',
                    'type' => 'product',
                    'description' => 'Container terbuka di bagian atas',
                ],
                [
                    'name' => 'Flat Rack',
                    'slug' => 'flat-rack',
                    'type' => 'product',
                    'description' => 'Container tanpa dinding samping untuk barang besar',
                ],
                [
                    'name' => 'Tank Container',
                    'slug' => 'tank-container',
                    'type' => 'product',
                    'description' => 'Container untuk cairan atau bahan kimia',
                ],

            ]
        ],

        [
            'name' => 'Property',
            'slug' => 'property',
            'type' => 'product',
            'description' => 'Modifikasi container menjadi bangunan fungsional',
            'children' => [

                [
                    'name' => 'Rumah',
                    'slug' => 'rumah',
                    'type' => 'product',
                    'description' => 'Hunian berbasis container',
                ],
                [
                    'name' => 'Gudang',
                    'slug' => 'gudang',
                    'type' => 'product',
                    'description' => 'Penyimpanan barang berbasis container',
                ],
                [
                    'name' => 'Kantor',
                    'slug' => 'kantor',
                    'type' => 'product',
                    'description' => 'Office container untuk proyek atau bisnis',
                ],
                [
                    'name' => 'Depo',
                    'slug' => 'depo',
                    'type' => 'product',
                    'description' => 'Tempat penyimpanan container atau logistik',
                ],

            ]
        ],

        [
            'name' => 'Service',
            'slug' => 'service',
            'type' => 'service',
            'description' => 'Berbagai layanan profesional untuk kebutuhan kontainer dan logistik',
            'children' => [

                [
                    'name' => 'Domestic Shipping',
                    'slug' => 'domestic-shipping',
                    'type' => 'service',
                    'description' => 'Pengiriman domestik meliputi trucking, pickup & delivery, cargo oversize, serta jalur udara dan laut',
                ],

                [
                    'name' => 'Jual & Beli Kontainer',
                    'slug' => 'jual-beli-container',
                    'type' => 'service',
                    'description' => 'Menjual berbagai jenis kontainer baru dan bekas dengan harga kompetitif',
                ],

                [
                    'name' => 'Maintenance & Repairing',
                    'slug' => 'maintenance-repairing',
                    'type' => 'service',
                    'description' => 'Perawatan dan perbaikan kontainer oleh tim bersertifikasi IICL dengan garansi',
                ],

                [
                    'name' => 'Modifikasi Kontainer',
                    'slug' => 'modifikasi-container',
                    'type' => 'service',
                    'description' => 'Layanan modifikasi kontainer untuk berbagai kebutuhan seperti rumah, kantor, dan bisnis',
                ],

                [
                    'name' => 'Sewa Alat Berat',
                    'slug' => 'sewa-alat-berat',
                    'type' => 'service',
                    'description' => 'Penyewaan alat berat seperti Reach Stacker dan Forklift dengan layanan 24 jam',
                ],

                [
                    'name' => 'Sewa Depo',
                    'slug' => 'sewa-depo',
                    'type' => 'service',
                    'description' => 'Pengelolaan container yard dan depot penitipan kontainer di lokasi strategis',
                ],

                [
                    'name' => 'Sewa Gudang',
                    'slug' => 'sewa-gudang',
                    'type' => 'service',
                    'description' => 'Gudang terbuka dan tertutup untuk kegiatan stuffing dan stripping',
                ],

                [
                    'name' => 'Sewa Kontainer',
                    'slug' => 'sewa-container',
                    'type' => 'service',
                    'description' => 'Penyewaan berbagai tipe kontainer dengan harga kompetitif',
                ],

            ]
        ]
    ];

        $this->createCategories($categories);
    }

    /**
     * Create categories recursively
     */
    private function createCategories(array $categories, ?int $parentId = null): void
    {
        foreach ($categories as $categoryData) {
            $children = $categoryData['children'] ?? null;
            unset($categoryData['children']);

            $categoryData['slug'] = Str::slug($categoryData['slug']);
            $categoryData['parent_id'] = $parentId;
            $categoryData['is_active'] = true;

            $category = Category::firstOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );

            if ($children && is_array($children)) {
                $this->createCategories($children, $category->id);
            }
        }
    }
}
