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
                    'slug' => 'standar',
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
