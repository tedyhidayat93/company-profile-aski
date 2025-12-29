<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function index(Request $request): Response
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
            ]
        ];

        $products = [
            'status' => 'success',
            'data' => collect($products)->take(3)->values()->all(),
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

        return Inertia::render('frontend/homepage', [
            'canRegister' => false,
            'canForgotPassword' => false,
            'products' => $products
        ]);
    }
}