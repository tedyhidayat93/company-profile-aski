<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogCategories = [
            [
                'name' => 'Produk Container',
                'slug' => 'produk-container',
                'type' => 'blog',
                'description' => 'Informasi produk container baru, bekas, dan modifikasi',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Container 20 Feet', 'slug' => 'container-20-feet', 'type' => 'blog', 'description' => 'Container ukuran 20 feet'],
                    ['name' => 'Container 40 Feet', 'slug' => 'container-40-feet', 'type' => 'blog', 'description' => 'Container ukuran 40 feet dan high cube'],
                    ['name' => 'Reefer Container', 'slug' => 'reefer-container', 'type' => 'blog', 'description' => 'Container pendingin (cold storage)'],
                    ['name' => 'Container Bekas', 'slug' => 'container-bekas', 'type' => 'blog', 'description' => 'Container second dengan berbagai kondisi'],
                    ['name' => 'Container Modifikasi', 'slug' => 'container-modifikasi', 'type' => 'blog', 'description' => 'Container custom untuk cafe, kantor, dll'],
                ]
            ],
            [
                'name' => 'Harga & Penawaran',
                'slug' => 'harga-container',
                'type' => 'blog',
                'description' => 'Informasi harga container terbaru dan penawaran',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Harga Container 20ft', 'slug' => 'harga-container-20ft', 'type' => 'blog', 'description' => 'Update harga container 20 feet'],
                    ['name' => 'Harga Container 40ft', 'slug' => 'harga-container-40ft', 'type' => 'blog', 'description' => 'Update harga container 40 feet'],
                    ['name' => 'Faktor Harga', 'slug' => 'faktor-harga-container', 'type' => 'blog', 'description' => 'Faktor yang mempengaruhi harga container'],
                ]
            ],
            [
                'name' => 'Edukasi & Panduan',
                'slug' => 'edukasi-container',
                'type' => 'blog',
                'description' => 'Panduan dan tips seputar container',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Panduan Membeli', 'slug' => 'panduan-membeli-container', 'type' => 'blog', 'description' => 'Tips membeli container'],
                    ['name' => 'Perawatan Container', 'slug' => 'perawatan-container', 'type' => 'blog', 'description' => 'Cara merawat container agar tahan lama'],
                    ['name' => 'Jenis Container', 'slug' => 'jenis-container', 'type' => 'blog', 'description' => 'Perbedaan jenis container'],
                    ['name' => 'Pengiriman Container', 'slug' => 'pengiriman-container', 'type' => 'blog', 'description' => 'Logistik dan pengiriman container'],
                ]
            ],
            [
                'name' => 'Inspirasi & Penggunaan',
                'slug' => 'inspirasi-container',
                'type' => 'blog',
                'description' => 'Inspirasi penggunaan container',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Container Cafe', 'slug' => 'container-cafe', 'type' => 'blog', 'description' => 'Inspirasi cafe dari container'],
                    ['name' => 'Container Office', 'slug' => 'container-office', 'type' => 'blog', 'description' => 'Kantor dari container'],
                    ['name' => 'Container Rumah', 'slug' => 'container-rumah', 'type' => 'blog', 'description' => 'Hunian berbasis container'],
                ]
            ],
            [
                'name' => 'Proyek & Portofolio',
                'slug' => 'proyek-container',
                'type' => 'blog',
                'description' => 'Dokumentasi proyek container',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Proyek Client', 'slug' => 'proyek-client', 'type' => 'blog', 'description' => 'Implementasi container oleh client'],
                    ['name' => 'Studi Kasus', 'slug' => 'studi-kasus-container', 'type' => 'blog', 'description' => 'Analisis penggunaan container'],
                ]
            ],
            [
                'name' => 'Berita Industri',
                'slug' => 'berita-industri-container',
                'type' => 'blog',
                'description' => 'Update industri logistik dan container',
                'parent_id' => null,
                'children' => [
                    ['name' => 'Tren Pasar', 'slug' => 'tren-pasar-container', 'type' => 'blog', 'description' => 'Perkembangan harga dan supply'],
                    ['name' => 'Regulasi', 'slug' => 'regulasi-container', 'type' => 'blog', 'description' => 'Kebijakan terkait container'],
                ]
            ],
        ];

        $this->createBlogCategories($blogCategories);
    }

    /**
     * Create blog categories recursively
     */
    private function createBlogCategories(array $categories, ?int $parentId = null): void
    {
        foreach ($categories as $categoryData) {
            $children = $categoryData['children'] ?? null;
            unset($categoryData['children']);

            $categoryData['slug'] = Str::slug($categoryData['slug']);
            $categoryData['parent_id'] = $parentId;
            $categoryData['is_active'] = true;

            $category = Category::firstOrCreate(
                ['slug' => $categoryData['slug'], 'type' => $categoryData['type']],
                $categoryData
            );

            if ($children && is_array($children)) {
                $this->createBlogCategories($children, $category->id);
            }
        }
    }
}
