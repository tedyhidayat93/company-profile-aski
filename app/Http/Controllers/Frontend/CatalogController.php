<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function show($id)
    {
        $products = [
            [
                'id' => 1,
                'name' => 'Kontainer 20ft Standar',
                'type' => 'sewa',
                'category' => 'Standard',
                'price' => 15000000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1578163677454-b3933804a354',
                'description' => 'Kontainer standar 20 kaki, cocok untuk penyimpanan dan pengiriman barang kering.',
                'specifications' => [
                    'Panjang' => '20 kaki',
                    'Lebar' => '8 kaki',
                    'Tinggi' => '8.5 kaki',
                    'Berat Kosong' => '2.2 ton',
                    'Kapasitas Muat' => '33.2 m³',
                    'Kondisi' => 'Baru',
                    'Tahun Pembuatan' => '2023',
                ],
                'features' => [
                    'Dilengkapi dengan sistem ventilasi',
                    'Dinding dan lantai kuat',
                    'Tahan karat dan air',
                    'Pintu ganda di ujung',
                    'Sertifikasi internasional'
                ]
            ],
            [
                'id' => 2,
                'name' => 'Kontainer 40ft High Cube',
                'type' => 'jual',
                'category' => 'High Cube',
                'price' => 28000000,
                'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
                'description' => 'Kontainer 40 kaki high cube dengan ketinggian ekstra, ideal untuk muatan tinggi.',
                'specifications' => [
                    'Panjang' => '40 kaki',
                    'Lebar' => '8 kaki',
                    'Tinggi' => '9.5 kaki',
                    'Berat Kosong' => '3.8 ton',
                    'Kapasitas Muat' => '76.3 m³',
                    'Kondisi' => 'Bekas',
                    'Tahun Pembuatan' => '2020',
                ],
                'features' => [
                    'Tinggi ekstra untuk muatan tinggi',
                    'Dinding baja kuat',
                    'Sistem keamanan ganda',
                    'Pintu geser',
                    'Sertifikasi CSC'
                ]
            ]
        ];

        $product = collect($products)->firstWhere('id', (int)$id);

        if (!$product) {
            abort(404);
        }

        return Inertia::render('frontend/catalog/detail', [
            'product' => $product,
            'relatedProducts' => [
                // Add some related products here
                [
                    'id' => 3,
                    'name' => 'Kontainer 20ft Reefer',
                    'type' => 'sewa',
                    'price' => 20000000,
                    'stock' => 3,
                    'image' => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
                    'description' => 'Kontainer berpendingin untuk menyimpan barang yang membutuhkan suhu terkontrol.'
                ],
                [
                    'id' => 4,
                    'name' => 'Kontainer 40ft Open Top',
                    'type' => 'jual',
                    'price' => 25000000,
                    'stock' => 7,
                    'image' => 'https://images.unsplash.com/photo-1601057185944-d8f4e572be5c',
                    'description' => 'Kontainer atap terbuka untuk muatan tinggi yang memudahkan loading dari atas.'
                ]
            ]
        ]);
    }

    public function index(Request $request)
    {
        $products = [
            [
                'id' => 1,
                'name' => 'Kontainer 20ft Standar',
                'type' => 'sewa',
                'category' => 'Standard',
                'price' => 15000000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1578163677454-b3933804a354',
                'description' => 'Kontainer standar 20 kaki, cocok untuk penyimpanan dan pengiriman barang kering.'
            ],
            [
                'id' => 2,
                'name' => 'Kontainer 40ft High Cube',
                'type' => 'jual',
                'category' => 'High Cube',
                'price' => 28000000,
                'stock' => 8,
                'image' => 'https://images.unsplash.com/photo-1602147577110-3a15b7bdfd3d',
                'description' => 'Kontainer tinggi 40 kaki dengan kapasitas lebih besar untuk volume muatan besar.'
            ],
            [
                'id' => 3,
                'name' => 'Kontainer 20ft Reefer',
                'type' => 'sewa',
                'category' => 'Reefer',
                'price' => 22000000,
                'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
                'description' => 'Kontainer pendingin 20 kaki untuk produk makanan dan farmasi.'
            ],
            [
                'id' => 4,
                'name' => 'Kontainer 40ft Reefer',
                'type' => 'jual',
                'category' => 'Reefer',
                'price' => 45000000,
                'stock' => 4,
                'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
                'description' => 'Kontainer pendingin 40 kaki dengan suhu terkontrol.'
            ],
            [
                'id' => 5,
                'name' => 'Kontainer 20ft Open Top',
                'type' => 'sewa',
                'category' => 'Open Top',
                'price' => 18000000,
                'stock' => 6,
                'image' => 'https://images.unsplash.com/photo-1592833159155-37a2c3d1f96c',
                'description' => 'Kontainer open top untuk muatan tinggi atau berat.'
            ],
            [
                'id' => 6,
                'name' => 'Kontainer 40ft Open Top',
                'type' => 'jual',
                'category' => 'Open Top',
                'price' => 32000000,
                'stock' => 3,
                'image' => 'https://images.unsplash.com/photo-1617957743925-97f99d53c6a3',
                'description' => 'Kontainer open top 40 kaki untuk alat berat dan mesin.'
            ],
            [
                'id' => 7,
                'name' => 'Kontainer 20ft Flat Rack',
                'type' => 'sewa',
                'category' => 'Flat Rack',
                'price' => 20000000,
                'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8',
                'description' => 'Flat rack 20 kaki untuk muatan lebar dan berat.'
            ],
            [
                'id' => 8,
                'name' => 'Kontainer 40ft Flat Rack',
                'type' => 'jual',
                'category' => 'Flat Rack',
                'price' => 38000000,
                'stock' => 2,
                'image' => 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16',
                'description' => 'Flat rack 40 kaki untuk pengiriman kargo oversize.'
            ],
            [
                'id' => 9,
                'name' => 'Kontainer 20ft Open Side',
                'type' => 'sewa',
                'category' => 'Open Side',
                'price' => 17000000,
                'stock' => 7,
                'image' => 'https://images.unsplash.com/photo-1627308595186-e6ca5e6bb24b',
                'description' => 'Kontainer open side dengan akses pintu samping.'
            ],
            [
                'id' => 10,
                'name' => 'Kontainer 40ft Open Side',
                'type' => 'jual',
                'category' => 'Open Side',
                'price' => 30000000,
                'stock' => 4,
                'image' => 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
                'description' => 'Kontainer open side 40 kaki untuk bongkar muat fleksibel.'
            ],
            [
                'id' => 11,
                'name' => 'ISO Tank 20ft',
                'type' => 'sewa',
                'category' => 'Tank',
                'price' => 25000000,
                'stock' => 3,
                'image' => 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c',
                'description' => 'ISO tank untuk pengangkutan cairan kimia atau makanan.'
            ],
            [
                'id' => 12,
                'name' => 'ISO Tank Chemical',
                'type' => 'jual',
                'category' => 'Tank',
                'price' => 52000000,
                'stock' => 2,
                'image' => 'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
                'description' => 'ISO tank khusus cairan kimia berstandar internasional.'
            ],
            // === duplikasi variasi hingga 30 ===
            [
                'id' => 13,
                'name' => 'Kontainer 20ft Standar Bekas',
                'type' => 'jual',
                'category' => 'Standard',
                'price' => 12000000,
                'stock' => 15,
                'image' => 'https://images.unsplash.com/photo-1597008641621-9f9c61d5b1df',
                'description' => 'Kontainer standar bekas layak pakai.'
            ],
            [
                'id' => 14,
                'name' => 'Kontainer 40ft Standar',
                'type' => 'sewa-jual',
                'category' => 'Standard',
                'price' => 26000000,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1581093588401-22f636be0c4a',
                'description' => 'Kontainer standar 40 kaki untuk kebutuhan logistik.'
            ],
            [
                'id' => 15,
                'name' => 'Kontainer 20ft High Cube',
                'type' => 'sewa',
                'category' => 'High Cube',
                'price' => 19000000,
                'stock' => 6,
                'image' => 'https://images.unsplash.com/photo-1611095783649-79aaeddb7f34',
                'description' => 'High Cube 20 kaki dengan tinggi ekstra.'
            ],
            [
                'id' => 16,
                'name' => 'Kontainer 40ft HC Bekas',
                'type' => 'jual',
                'category' => 'High Cube',
                'price' => 24000000,
                'stock' => 9,
                'image' => 'https://images.unsplash.com/photo-1610000020032-6b3d4b2d9b2a',
                'description' => 'High Cube bekas kondisi siap pakai.'
            ],
            [
                'id' => 17,
                'name' => 'Reefer Frozen Cargo',
                'type' => 'sewa',
                'category' => 'Reefer',
                'price' => 26000000,
                'stock' => 4,
                'image' => 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d1',
                'description' => 'Reefer untuk muatan beku bersuhu rendah.'
            ],
            [
                'id' => 18,
                'name' => 'Open Top Project Cargo',
                'type' => 'sewa-jual',
                'category' => 'Open Top',
                'price' => 29000000,
                'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1617957743925-97f99d53c6a3',
                'description' => 'Open top untuk project cargo.'
            ],
            [
                'id' => 19,
                'name' => 'Flat Rack Heavy Duty',
                'type' => 'sewa',
                'category' => 'Flat Rack',
                'price' => 34000000,
                'stock' => 3,
                'image' => 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16',
                'description' => 'Flat rack heavy duty untuk alat berat.'
            ],
            [
                'id' => 20,
                'name' => 'Open Side Exhibition',
                'type' => 'jual',
                'category' => 'Open Side',
                'price' => 31000000,
                'stock' => 2,
                'image' => 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
                'description' => 'Kontainer open side untuk pameran.'
            ],
            // lanjut ringkas
            [
                'id' => 21, 'name' => 'Tank Food Grade', 'type' => 'sewa', 'category' => 'Tank',
                'price' => 48000000, 'stock' => 2,
                'image' => 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c',
                'description' => 'ISO tank food grade.'
            ],
            [
                'id' => 22, 'name' => 'Reefer Pharmaceutical', 'type' => 'sewa-jual', 'category' => 'Reefer',
                'price' => 55000000, 'stock' => 1,
                'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
                'description' => 'Reefer khusus farmasi.'
            ],
            [
                'id' => 23, 'name' => 'Standard Container Cargo', 'type' => 'sewa', 'category' => 'Standard',
                'price' => 16000000, 'stock' => 11,
                'image' => 'https://images.unsplash.com/photo-1578163677454-b3933804a354',
                'description' => 'Kontainer standar untuk cargo umum.'
            ],
            [
                'id' => 24, 'name' => 'High Cube Export', 'type' => 'jual', 'category' => 'High Cube',
                'price' => 30000000, 'stock' => 6,
                'image' => 'https://images.unsplash.com/photo-1602147577110-3a15b7bdfd3d',
                'description' => 'High cube siap ekspor.'
            ],
            [
                'id' => 25, 'name' => 'Open Top Construction', 'type' => 'sewa', 'category' => 'Open Top',
                'price' => 21000000, 'stock' => 7,
                'image' => 'https://images.unsplash.com/photo-1592833159155-37a2c3d1f96c',
                'description' => 'Open top untuk material konstruksi.'
            ],
            [
                'id' => 26, 'name' => 'Flat Rack Export', 'type' => 'jual', 'category' => 'Flat Rack',
                'price' => 40000000, 'stock' => 2,
                'image' => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8',
                'description' => 'Flat rack ekspor.'
            ],
            [
                'id' => 27, 'name' => 'Open Side Retail', 'type' => 'sewa', 'category' => 'Open Side',
                'price' => 20000000, 'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1627308595186-e6ca5e6bb24b',
                'description' => 'Open side untuk retail.'
            ],
            [
                'id' => 28, 'name' => 'ISO Tank Industrial', 'type' => 'jual', 'category' => 'Tank',
                'price' => 60000000, 'stock' => 1,
                'image' => 'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
                'description' => 'ISO tank kebutuhan industri.'
            ],
            [
                'id' => 29, 'name' => 'Reefer Export Frozen', 'type' => 'sewa', 'category' => 'Reefer',
                'price' => 29000000, 'stock' => 3,
                'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
                'description' => 'Reefer untuk ekspor frozen food.'
            ],
            [
                'id' => 30, 'name' => 'Standard Warehouse Container', 'type' => 'sewa-jual', 'category' => 'Standard',
                'price' => 18000000, 'stock' => 9,
                'image' => 'https://images.unsplash.com/photo-1581093588401-22f636be0c4a',
                'description' => 'Kontainer standar untuk gudang.'
            ],
        ];

        $categories = ['Standard', 'High Cube', 'Reefer', 'Open Top', 'Flat Rack', 'Open Side', 'Tank'];
        $types = ['sewa', 'jual', 'sewa-jual'];

        // Filtering logic
        $filteredProducts = collect($products)
            ->when($request->search, function ($collection, $search) {
                $searchTerm = strtolower($search);
                return $collection->filter(function ($product) use ($searchTerm) {
                    return str_contains(strtolower($product['name']), $searchTerm) !== false;
                });
            })
            ->when($request->type, function ($collection, $type) {
                return $collection->where('type', $type);
            })
            ->when($request->category, function ($collection, $category) {
                return $collection->where('category', $category);
            })
            ->when($request->minPrice, function ($collection, $minPrice) {
                return $collection->where('price', '>=', $minPrice);
            })
            ->when($request->maxPrice, function ($collection, $maxPrice) {
                return $collection->where('price', '<=', $maxPrice);
            });


            // Sorting
        if ($request->sort === 'price-desc') {
            $filteredProducts = $filteredProducts->sortByDesc('price');
        } else {
            $filteredProducts = $filteredProducts->sortBy('price');
        }

        // Pagination
        $perPage = 12;
        $currentPage = $request->input('page', 1);
        $pagedData = $filteredProducts->forPage($currentPage, $perPage);

        $products = [
            'status' => 'success',
            'data' => $pagedData->values()->all(),
            'pagination' => [
                'current_page' => $currentPage,
                'per_page' => $perPage,
                'total' => $filteredProducts->count(),
            ],
            'load_info' => [
                'request_time' => $request->server('REQUEST_TIME'),
                'timestamp' => time(),
                'formatted' => date('Y-m-d H:i:s'),
                'timezone' => date_default_timezone_get(),
                'microtime' => microtime(true),
                'load_time' => round(microtime(true) - LARAVEL_START, 4),
                'memory_usage' => round(memory_get_usage() / 1024 / 1024, 2) . ' MB',
            ]
        ];

        return Inertia::render('frontend/catalog/index', [
            'products' => $products,
            'categories' => $categories,
            'types' => $types,
            'filters' => $request->only(['search', 'type', 'category', 'minPrice', 'maxPrice', 'sort'])
        ]);
    }
}