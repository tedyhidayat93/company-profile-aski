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
                'description' => 'Various types of containers for different purposes',
                'parent_id' => null,
                'children' => [
                    [
                        'name' => 'Shipping Container',
                        'slug' => 'shipping-container',
                        'type' => 'product',
                        'description' => 'Containers for shipping and logistics',
                        'children' => [
                            ['name' => 'Dry Container 20ft', 'slug' => 'dry-container-20ft', 'type' => 'product'],
                            ['name' => 'Dry Container 40ft', 'slug' => 'dry-container-40ft', 'type' => 'product'],
                            ['name' => 'Dry Container 40ft High Cube', 'slug' => 'dry-container-40ft-high-cube', 'type' => 'product'],
                            ['name' => 'Refrigerated Container', 'slug' => 'refrigerated-container', 'type' => 'product'],
                            ['name' => 'Open Top Container', 'slug' => 'open-top-container', 'type' => 'product'],
                            ['name' => 'Flat Rack Container', 'slug' => 'flat-rack-container', 'type' => 'product'],
                            ['name' => 'Tank Container', 'slug' => 'tank-container', 'type' => 'product'],
                            ['name' => 'Ventilated Container', 'slug' => 'ventilated-container', 'type' => 'product'],
                        ]
                    ],
                    [
                        'name' => 'Custom Container',
                        'slug' => 'custom-container',
                        'type' => 'product',
                        'description' => 'Custom containers for various purposes',
                        'children' => [
                            ['name' => 'House Container', 'slug' => 'house-container', 'type' => 'product'],
                            ['name' => 'Cafe Container', 'slug' => 'cafe-container', 'type' => 'product'],
                            ['name' => 'Shop Container', 'slug' => 'shop-container', 'type' => 'product'],
                            ['name' => 'Toilet Container', 'slug' => 'toilet-container', 'type' => 'product'],
                            ['name' => 'Security Post Container', 'slug' => 'security-post-container', 'type' => 'product'],
                            ['name' => 'Storage Container', 'slug' => 'storage-container', 'type' => 'product'],
                            ['name' => 'Gazebo Container', 'slug' => 'gazebo-container', 'type' => 'product'],
                        ]
                    ]
                ]
            ],
            [
                'name' => 'Rental',
                'slug' => 'rental',
                'type' => 'service',
                'description' => 'Various rental services',
                'parent_id' => null,
                'children' => [
                    [
                        'name' => 'Warehouse Rental',
                        'slug' => 'warehouse-rental',
                        'type' => 'service',
                        'description' => 'Warehouse space rental services'
                    ],
                    [
                        'name' => 'Heavy Equipment Rental',
                        'slug' => 'heavy-equipment-rental',
                        'type' => 'service',
                        'description' => 'Heavy equipment rental services'
                    ],
                    [
                        'name' => 'Reachstacker Rental',
                        'slug' => 'reachstacker-rental',
                        'type' => 'service',
                        'description' => 'Reachstacker rental services'
                    ]
                ]
            ],
            [
                'name' => 'Buy & Sell',
                'slug' => 'buy-sell',
                'type' => 'product',
                'description' => 'Buy and sell various properties and items',
                'parent_id' => null,
                'children' => [
                    [
                        'name' => 'House',
                        'slug' => 'house',
                        'type' => 'product',
                        'description' => 'Residential properties for sale',
                        'children' => [
                            ['name' => 'Rumah Tipe 36', 'slug' => 'rumah-tipe-36', 'type' => 'product'],
                            ['name' => 'Rumah Tipe 45', 'slug' => 'rumah-tipe-45', 'type' => 'product'],
                            ['name' => 'Rumah Tipe 54', 'slug' => 'rumah-tipe-54', 'type' => 'product'],
                            ['name' => 'Villa', 'slug' => 'villa', 'type' => 'product'],
                            ['name' => 'Apartemen', 'slug' => 'apartemen', 'type' => 'product']
                        ]
                    ],
                    [
                        'name' => 'Property',
                        'slug' => 'property',
                        'type' => 'product',
                        'description' => 'Various properties for sale',
                        'children' => [
                            ['name' => 'Tanah', 'slug' => 'tanah', 'type' => 'product'],
                            ['name' => 'Ruko', 'slug' => 'ruko', 'type' => 'product'],
                            ['name' => 'Gudang', 'slug' => 'gudang', 'type' => 'product'],
                            ['name' => 'Kantor', 'slug' => 'kantor', 'type' => 'product'],
                            ['name' => 'Pabrik', 'slug' => 'pabrik', 'type' => 'product']
                        ]
                    ]
                ]
            ],
            [
                'name' => 'Logistics & Transport',
                'slug' => 'logistics-transport',
                'type' => 'service',
                'description' => 'Logistics and transportation services',
                'parent_id' => null,
                'children' => [
                    [
                        'name' => 'Trucking Service',
                        'slug' => 'trucking-service',
                        'type' => 'service',
                        'description' => 'Goods transportation services',
                        'children' => [
                            ['name' => 'Truk CDE', 'slug' => 'truk-cde', 'type' => 'service'],
                            ['name' => 'Truk Engkel', 'slug' => 'truk-engkel', 'type' => 'service'],
                            ['name' => 'Truk Trailer', 'slug' => 'truk-trailer', 'type' => 'service'],
                            ['name' => 'Truk Kontainer', 'slug' => 'truk-kontainer', 'type' => 'service']
                        ]
                    ],
                    [
                        'name' => 'Freight Forwarding',
                        'slug' => 'freight-forwarding',
                        'type' => 'service',
                        'description' => 'Freight forwarding services',
                        'children' => [
                            ['name' => 'Udara Laut', 'slug' => 'udara-laut', 'type' => 'service'],
                            ['name' => 'Udara Darat', 'slug' => 'udara-darat', 'type' => 'service'],
                            ['name' => 'Ekspor Impor', 'slug' => 'ekspor-impor', 'type' => 'service']
                        ]
                    ]
                ]
            ],
            [
                'name' => 'Heavy Equipment',
                'slug' => 'heavy-equipment',
                'type' => 'product',
                'description' => 'Heavy equipment and machinery',
                'parent_id' => null,
                'children' => [
                    [
                        'name' => 'Excavator',
                        'slug' => 'excavator',
                        'type' => 'product',
                        'description' => 'Excavator machines',
                        'children' => [
                            ['name' => 'Kobelco', 'slug' => 'kobelco-excavator', 'type' => 'product'],
                            ['name' => 'Komatsu', 'slug' => 'komatsu-excavator', 'type' => 'product'],
                            ['name' => 'Caterpillar', 'slug' => 'caterpillar-excavator', 'type' => 'product'],
                            ['name' => 'Hitachi', 'slug' => 'hitachi-excavator', 'type' => 'product']
                        ]
                    ],
                    [
                        'name' => 'Bulldozer',
                        'slug' => 'bulldozer',
                        'type' => 'product',
                        'description' => 'Bulldozer machines',
                        'children' => [
                            ['name' => 'Komatsu', 'slug' => 'komatsu-bulldozer', 'type' => 'product'],
                            ['name' => 'Caterpillar', 'slug' => 'caterpillar-bulldozer', 'type' => 'product'],
                            ['name' => 'Shantui', 'slug' => 'shantui-bulldozer', 'type' => 'product']
                        ]
                    ],
                    [
                        'name' => 'Crane',
                        'slug' => 'crane',
                        'type' => 'product',
                        'description' => 'Crane machines',
                        'children' => [
                            ['name' => 'Tower Crane', 'slug' => 'tower-crane', 'type' => 'product'],
                            ['name' => 'Mobile Crane', 'slug' => 'mobile-crane', 'type' => 'product'],
                            ['name' => 'Crawler Crane', 'slug' => 'crawler-crane', 'type' => 'product']
                        ]
                    ]
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
