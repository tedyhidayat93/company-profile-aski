<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use App\Models\Service;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
                            'image'       => resolve_image_path($service->image),
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
                'services_meta_image',
                'services_meta_title',
                'services_meta_description',
                'meta_keywords',
            ])
            ->pluck('value', 'key');
        
        $seo = [
            'title'       => !empty($seoConfigs['services_meta_title']) ? strip_tags($seoConfigs['services_meta_title']) : 'Our Services',
            'description' => !empty($seoConfigs['services_meta_description']) ? strip_tags($seoConfigs['services_meta_description']) : 'Layanan terbaik dari Alumoda Sinergi Kontainer Indonesia.',
            'keywords'    => !empty($seoConfigs['meta_keywords']) ? strip_tags($seoConfigs['meta_keywords']) : 'service container, modifikasi container',
            'image'       => !empty($seoConfigs['services_meta_image'])
                ? asset('storage/' . $seoConfigs['services_meta_image'])
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
            'image'       => resolve_image_path($service->image),
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
            ->limit(10)
            ->get(['id', 'name', 'slug', 'image'])
            ->map(function ($item) {
                return [
                    'id'    => $item->id,
                    'title' => $item->name,
                    'slug'  => $item->slug,
                    'image' => resolve_image_path($item->image),
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
                'image'       => resolve_image_path($service->image),
                'keywords'    => $service->meta_keywords ? strip_tags($service->meta_keywords) : '',
                'type'        => 'article',
            ],
        ]);
    }

    public function products(Request $request)
    {
        $this->trackPageVisit($request, 'Our Products Index');

        /*
        |--------------------------------------------------------------------------
        | SEO Config
        |--------------------------------------------------------------------------
        */
        $seoConfigs = Configuration::query()
            ->whereIn('key', [
                'product_meta_image',
                'product_meta_title',
                'product_meta_description',
                'meta_keywords',
            ])
            ->pluck('value', 'key');
        
        $seo = [
            'title'       => !empty($seoConfigs['product_meta_title']) ? strip_tags($seoConfigs['product_meta_title']) : 'Our Products',
            'description' => !empty($seoConfigs['product_meta_description']) ? strip_tags($seoConfigs['product_meta_description']) : 'Produk terbaik dari Alumoda Sinergi Kontainer Indonesia.',
            'keywords'    => !empty($seoConfigs['meta_keywords']) ? strip_tags($seoConfigs['meta_keywords']) : 'service container, modifikasi container',
            'image'       => !empty($seoConfigs['product_meta_image'])
                ? asset('storage/' . $seoConfigs['product_meta_image'])
                : asset('images/placeholder.png'),
            'contentType'        => 'website',
        ];

        return Inertia::render('frontend/product/index', [
            'seo' => $seo,
        ]);
    }

    public function productDetail(Request $request, string $slug)
    {
        $this->trackPageVisit($request, 'Product Detail - ' . $slug);

        // Mengambil detail kategori produk berdasarkan slug
        $productCategory = Category::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $productDetail = [
            'id'                => $productCategory->id,
            'title'             => $productCategory->name,
            'description'       => $productCategory->description ?? '',
            'short_description' => $productCategory->short_description ?? '',
            'content'           => $productCategory->content ?? '',
            'image'             => resolve_image_path($productCategory->image),
        ];

        /*
        |--------------------------------------------------------------------------
        | Varian / List Produk Terkait (Random & Limit 8 Berdasarkan Slug)
        |--------------------------------------------------------------------------
        */
        $catalogRandom = $this->getRandomProducts($slug, 10);

        /*
        |--------------------------------------------------------------------------
        | Kategori Utama Pendukung Lainnya
        |--------------------------------------------------------------------------
        */
        $relatedCategories = Category::ofType('product')
            ->active()
            ->orderBy('lft')
            ->select(['id', 'name', 'slug', 'image', 'description', 'meta_title', 'meta_description'])
            ->get()
            ->map(function ($item) {
                return [
                    'id'    => $item->id,
                    'title' => $item->name,
                    'slug'  => $item->slug,
                    'image' => resolve_image_path($item->image),
                ];
            });

        return Inertia::render('frontend/product/detail', [
            'product'            => $productDetail,
            'products'           => $catalogRandom,
            'related_categories' => $relatedCategories,
            'seo' => [
                'title'       => $productCategory->meta_title ? strip_tags($productCategory->meta_title) : $productCategory->name,
                'description' => $productCategory->meta_description 
                    ? strip_tags($productCategory->meta_description) 
                    : str(strip_tags($productCategory->description))->limit(160),
                'image'       => resolve_image_path($productCategory->image),
                'keywords'    => $productCategory->meta_keywords ? strip_tags($productCategory->meta_keywords) : $productCategory->meta_description,
                'contentType' => 'article',
            ],
        ]);
    }

    private function getRandomProducts($slug = null, $show = 8)
    {
        // Buat cache key dinamis berdasarkan slug agar data tidak saling menimpa
        $cacheKey = 'products.random.' . ($slug ?? 'all');

        // Cache disimpan selama 5 menit agar efek acak tetap terasa saat refresh berkala
        return Cache::remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($slug, $show) {
                $products = Product::query()
                    ->published()
                    ->with([
                        'brand:id,name',
                        'category:id,name,slug',
                        'coverImage',
                    ])
                    // Jika slug diisi, filter berdasarkan slug milik relasi category
                    ->when($slug, function ($query) use ($slug) {
                        return $query->whereHas('category', function ($q) use ($slug) {
                            $q->where('slug', $slug);
                        });
                    })
                    ->inRandomOrder() // Acak data langsung dari database
                    ->limit($show)
                    ->get();

                return $products->map(function ($product) {
                    if (method_exists($this, 'transformProduct')) {
                        return $this->transformProduct($product);
                    }

                    // Fallback mapper jika method transformProduct tidak tersedia
                    return [
                        'id'       => $product->id,
                        'name'     => $product->name,
                        'slug'     => $product->slug,
                        'image'    => $product->coverImage ? resolve_image_path($product->coverImage->path) : '/images/placeholder.png',
                        'brand'    => $product->brand ? $product->brand->name : null,
                        'category' => $product->category ? [
                            'id'   => $product->category->id,
                            'name' => $product->category->name,
                            'slug' => $product->category->slug,
                        ] : null,
                    ];
                });
            }
        );
    }

    private function transformProduct(
        Product $product
    ): array {

        return [
            'id' => $product->id,

            'name' => $product->name,

            'slug' => $product->slug,

            'type' => $product->type,

            'quantity' => $product->quantity,

            'category' => $product->category,

            'price' => $product->price,

            'compare_at_price' =>
                $product->compare_at_price,

            'stock' =>
                $product->quantity ?? 0,

            'image' => resolve_image_path(
                $product->coverImage?->image_path
            ),

            'description' =>
                $product->short_description
                ?? $product->description
                ?? '',

            'is_bestseller' =>
                $product->is_bestseller ?? false,

            'show_price' =>
                $product->show_price,

            'show_stock' =>
                $product->show_stock,

            'is_new' =>
                $product->is_new ?? false,

            'is_featured' =>
                $product->is_featured ?? false,

            'is_for_sell' =>
                $product->is_for_sell ?? false,

            'is_rent' =>
                $product->is_rent ?? false,
        ];
    }
}