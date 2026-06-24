<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use App\Models\Service;
use App\Models\Product; // Pastikan model Product di-import
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache; // Pastikan Cache di-import
use Inertia\Inertia;
use App\Traits\TracksVisitors;

class ServiceController extends Controller
{
    use TracksVisitors;

    public function index(Request $request)
    {
        $this->trackPageVisit($request, 'Service Index');

        /*
        |--------------------------------------------------------------------------
        | Services
        |--------------------------------------------------------------------------
        */
        $services = Cache::remember(
            'service.list',
            now()->addHours(1),
            function () {
                return Service::query()
                    ->where('is_active', true)
                    ->orderBy('sequence')
                    ->get(['id', 'name', 'slug', 'description', 'short_description', 'image'])
                    ->map(function ($service) {
                        return [
                            'id'          => $service->id,
                            'title'       => $service->name,
                            'slug'        => $service->slug,
                            'description' => $service->short_description ?? $service->description ?? '',
                            'image'       => $service->image ?: '/images/placeholder.png',
                        ];
                    });
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Products (Random & Limit 6)
        |--------------------------------------------------------------------------
        */
        $products = $this->getRandomProducts();

        /*
        |--------------------------------------------------------------------------
        | SEO Config
        |--------------------------------------------------------------------------
        */
        $seoConfigs = Configuration::query()
            ->whereIn('key', [
                'service_meta_image',
                'service_meta_title',
                'service_meta_description',
                'meta_keywords',
            ])
            ->pluck('value', 'key');
        
        $seo = [
            'title'       => !empty($seoConfigs['service_meta_title']) ? strip_tags($seoConfigs['service_meta_title']) : 'Our Services',
            'description' => !empty($seoConfigs['service_meta_description']) ? strip_tags($seoConfigs['service_meta_description']) : 'Layanan terbaik dari Alumoda Sinergi Kontainer Indonesia.',
            'keywords'    => !empty($seoConfigs['meta_keywords']) ? strip_tags($seoConfigs['meta_keywords']) : 'service container, modifikasi container',
            'image'       => !empty($seoConfigs['service_meta_image'])
                ? asset('storage/' . $seoConfigs['service_meta_image'])
                : asset('images/placeholder.png'),
            'type'        => 'website',
        ];

        return Inertia::render('frontend/service/index', [
            'services' => $services,
            'products' => $products, // Ditampilkan di index
            'seo'      => $seo,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $this->trackPageVisit($request, 'Service Detail - ' . $slug);

        // Mengambil detail service berdasarkan slug
        $service = Service::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $serviceDetail = [
            'id'          => $service->id,
            'title'       => $service->name,
            'description' => $service->description ?? '',
            'short_description' => $service->short_description ?? '',
            'content'     => $service->content ?? '',
            'image'       => $this->resolveImagePath($service->image),
        ];

        /*
        |--------------------------------------------------------------------------
        | Products (Random & Limit 6)
        |--------------------------------------------------------------------------
        | Sesuai request, produk acak juga dimuat di halaman detail (show)
        */
        $products = $this->getRandomProducts();

        /*
        |--------------------------------------------------------------------------
        | Related Services
        |--------------------------------------------------------------------------
        */
        $relatedServices = Service::query()
            ->where('is_active', true)
            ->where('id', '!=', $service->id)
            ->orderBy('sequence')
            ->limit(3)
            ->get(['id', 'name', 'slug', 'image'])
            ->map(function ($item) {
                return [
                    'id'    => $item->id,
                    'title' => $item->name,
                    'slug'  => $item->slug,
                    'image' => $this->resolveImagePath($item->image),
                ];
            });

        return Inertia::render('frontend/service/detail', [
            'service'          => $serviceDetail,
            'products'         => $products,
            'related_services' => $relatedServices,
            'seo' => [
                'title'       => $service->meta_title ? strip_tags($service->meta_title) : $service->name,

                'description' => $service->meta_description 
                    ? strip_tags($service->meta_description) 
                    : str(strip_tags($service->description))->limit(160),
                'image'       => $this->resolveImagePath($service->image),
                'keywords'    => $service->meta_keywords ? strip_tags($service->meta_keywords) : '',
                'type'        => 'article',
            ],
        ]);
    }

    /**
     * Helper khusus untuk mengambil produk acak (max 6) dengan cache jangka pendek
     */
    private function getRandomProducts()
    {
        // Cache dikurangi menjadi 5 menit agar efek "random" terasa saat user berpindah halaman atau refresh
        return Cache::remember(
            'service.products.random',
            now()->addMinutes(5),
            function () {
                $baseQuery = Product::query()
                    ->published()
                    ->with([
                        'brand:id,name',
                        'category:id,name,slug',
                        'coverImage',
                    ]);

                $featuredProducts = (clone $baseQuery)
                    ->where('is_featured', true)
                    ->inRandomOrder() // Dibuat random sesuai request
                    ->limit(6)        // Dibatasi hanya 6
                    ->get();

                $products = $featuredProducts->isNotEmpty()
                    ? $featuredProducts
                    : (clone $baseQuery)
                        ->orderByDesc('views')
                        ->inRandomOrder() // Fallback-nya juga di-random jika featured kosong
                        ->limit(6)
                        ->get();

                // Pastikan Anda memproses transformProduct() di bawah ini atau ganti manual jika method-nya tidak ada
                return $products->map(function ($product) {
                    if (method_exists($this, 'transformProduct')) {
                        return $this->transformProduct($product);
                    }

                    // Fallback jika method transformProduct belum didefinisikan di controller ini
                    return [
                        'id'    => $product->id,
                        'name'  => $product->name,
                        'slug'  => $product->slug,
                        'image' => $product->coverImage ? $this->resolveImagePath($product->coverImage->path) : '/images/placeholder.png',
                        'brand' => $product->brand ? $product->brand->name : null,
                    ];
                });
            }
        );
    }

    private function resolveImagePath(?string $path): string
    {
        $baseUrl = rtrim(config('app.url'), '/');
        
        if (empty($path)) {
            return $baseUrl . '/images/placeholder.png';
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return $baseUrl . '/storage/' . ltrim($path, '/');
    }
}