<?php

namespace App\Http\Controllers\Frontend;

use App\Helpers\Recaptcha;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Configuration;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Services\EmailService;
use App\Traits\TracksVisitors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CatalogController extends Controller
{
    use TracksVisitors;

    protected EmailService $emailService;

    public function __construct(
        EmailService $emailService
    ) {
        $this->emailService = $emailService;
    }

    /*
    |--------------------------------------------------------------------------
    | INDEX
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $this->trackPageVisit(
            $request,
            'Product Catalog'
        );

        $filters = [
            'search'    => $request->string('search')->toString(),
            'type'      => $request->string('type')->toString(),
            'category'  => $request->string('category')->toString(),
            'minPrice'  => $request->input('minPrice'),
            'maxPrice'  => $request->input('maxPrice'),
            'sort'      => $request->string('sort')->toString(),
            'perPage'   => (int) $request->input('perPage', 12),
        ];

        /*
        |--------------------------------------------------------------------------
        | Categories Hierarchy Default
        |--------------------------------------------------------------------------
        */
        $categories = $this->getHierarchicalCategoriesByProducts($filters['search']);

        $types = [
            'sell',
            'rent',
            'rent-and-sell',
        ];

        /*
        |--------------------------------------------------------------------------
        | Base Query Facets & Products
        |--------------------------------------------------------------------------
        */
        // Buat base query untuk mendasari pencarian facet
        // $baseFacetQuery = Product::query()->with([
        //     'category' => function ($q) {
        //         $q->where('type', 'product');
        //     }
        // ])->published();
        $baseFacetQuery = Product::query()
            ->whereHas('category', function ($q) {
                $q->where('type', 'product')->active(); // Pastikan hanya kategori product yang aktif
            })
            ->published();
        
        // Terapkan filter global seperti 'search' dan 'type' terlebih dahulu ke facet
        if ($filters['search']) {
            // Asumsi method applyProductFilters menghandel search interior
            // Jika tidak, sesuaikan dengan logic partial filter di aplikasi Anda
            $baseFacetQuery->where(function($q) use ($filters) {
                $this->applyProductFilters($q, ['search' => $filters['search']]);
            });
        }
        if ($filters['type']) {
            $baseFacetQuery->where('type', $filters['type']);
        }

        /*
        | Perhitungan Facet Kategori (Mendukung Produk di Kategori Anak / Descendants)
        |--------------------------------------------------------------------------
        */
        $categoryFacets = clone $baseFacetQuery;
        
        // 1. Hitung flat count produk yang menempel langsung di tiap ID kategori daun/anak
        $rawCategoryCounts = $categoryFacets
            ->select('category_id', \DB::raw('count(*) as total'))
            ->groupBy('category_id')
            ->pluck('total', 'category_id')
            ->toArray();

        // 2. Ambil master kategori ber-type 'products' untuk memetakan hirarki pencarian
        $allProductCategories = Category::ofType('product')->active()->get();

        $categoryCounts = [];

        // 3. Akumulasikan jumlah produk dari sub-kategori ke kategori induknya
        foreach ($allProductCategories as $category) {
            // Gunakan method internal kamu 'getCategoryAndDescendants' untuk menarik ID turunan
            $descendantIds = $this->getCategoryAndDescendants($category->slug);
            
            $totalForThisCategory = 0;
            
            // Jumlahkan total produk yang ada di kategori ini beserta seluruh anaknya
            foreach ($descendantIds as $id) {
                $totalForThisCategory += $rawCategoryCounts[$id] ?? 0;
            }

            // Simpan hasilnya dengan key ID dan SLUG agar frontend aman mencocokkan dengan properti apapun
            $categoryCounts[$category->id] = $totalForThisCategory;
            $categoryCounts[$category->slug] = $totalForThisCategory;
        }

        /*
        | 2. Perhitungan Facet Rentang Harga (Low, Mid, High)
        |--------------------------------------------------------------------------
        */
        $priceFacetQuery = clone $baseFacetQuery;
        if ($filters['category']) {
            $this->applyProductFilters($priceFacetQuery, ['category' => $filters['category']]);
        }

        // 1. Ambil nilai MIN dan MAX harga terlebih dahulu
        $priceBounds = (clone $priceFacetQuery)
            ->selectRaw('MIN(price) as min_p, MAX(price) as max_p')
            ->first();

        $minAvailablePrice = (float) ($priceBounds->min_p ?? 0);
        $maxAvailablePrice = (float) ($priceBounds->max_p ?? 0);

        $priceRanges = [
            'low'  => ['label' => 'Ekonomis', 'min' => 0, 'max' => 0, 'count' => 0],
            'mid'  => ['label' => 'Medium', 'min' => 0, 'max' => 0, 'count' => 0],
            'high' => ['label' => 'Premium', 'min' => 0, 'max' => 0, 'count' => 0],
        ];

        if ($maxAvailablePrice > $minAvailablePrice) {
            $step = ($maxAvailablePrice - $minAvailablePrice) / 3;
            
            $lowMax  = $minAvailablePrice + $step;
            $midMax  = $lowMax + $step;

            $priceRanges['low']  = ['label' => 'Ekonomis', 'min' => $minAvailablePrice, 'max' => $lowMax, 'count' => 0];
            $priceRanges['mid']  = ['label' => 'Medium', 'min' => $lowMax + 1, 'max' => $midMax, 'count' => 0];
            $priceRanges['high'] = ['label' => 'Premium', 'min' => $midMax + 1, 'max' => $maxAvailablePrice, 'count' => 0];

            // 2. Ambil semua list harga bersih tanpa terganggu selectRaw MIN/MAX di atas
            $pricesList = $priceFacetQuery->pluck('price');
            
            foreach ($pricesList as $price) {
                if ($price <= $lowMax) {
                    $priceRanges['low']['count']++;
                } elseif ($price <= $midMax) {
                    $priceRanges['mid']['count']++;
                } else {
                    $priceRanges['high']['count']++;
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Products Query (Actual Listing)
        |--------------------------------------------------------------------------
        */
        $query = Product::query()
            ->published()
            ->with([
                'category:id,name,slug',
                'brand:id,name',
                'coverImage',
            ]);

        $query->orderByDesc('is_featured')->orderByDesc('is_bestseller');

        // Terapkan semua filter ke produk yang akan ditampilkan
        $this->applyProductFilters($query, $filters);
        $this->applySorting($query, $filters['sort']);

        $products = $query->paginate($filters['perPage'])->withQueryString();

        /*
        | Fallback Products
        |--------------------------------------------------------------------------
        */
        if ($filters['search'] && $products->isEmpty()) {
            $fallbackQuery = Product::query()
                ->published()
                ->with([
                    'category:id,name,slug',
                    'brand:id,name',
                    'coverImage',
                ])
                ->latest();

            $fallbackFilters = $filters;
            $fallbackFilters['search'] = null;

            $this->applyProductFilters($fallbackQuery, $fallbackFilters);
            $this->applySorting($fallbackQuery, $filters['sort']);

            $products = $fallbackQuery->paginate($filters['perPage'])->withQueryString();
        }

        /*
        | Transform Products
        |--------------------------------------------------------------------------
        */
        $products->setCollection(
            $products->getCollection()->map(fn($product) => $this->transformProduct($product))
        );

        /*
        | Best Seller Products
        |--------------------------------------------------------------------------
        */
        $bestSellerProducts = Product::query()
            ->published()
            ->where('is_featured', true)
            ->where('is_bestseller', true)
            ->with([
                'category:id,name,slug',
                'coverImage',
            ])
            ->latest()
            ->limit(10)
            ->get()
            ->shuffle()  
            ->map(fn($item) => $this->transformProduct($item));

        /*
        | SEO
        |--------------------------------------------------------------------------
        */
        $seo = $this->buildSeo($filters);

        return Inertia::render(
            'frontend/catalog/index',
            [
                'products' => [
                    'status' => 'success',
                    'data' => $products->items(),
                    'pagination' => [
                        'current_page' => $products->currentPage(),
                        'per_page'     => $products->perPage(),
                        'total'        => $products->total(),
                        'last_page'    => $products->lastPage(),
                        'from'         => $products->firstItem(),
                        'to'           => $products->lastItem(),
                    ],
                ],
                'bestSellerProducts' => $bestSellerProducts,
                'categories'         => $categories,
                'types'              => $types,
                'filters'            => $filters,
                'seo'                => $seo,
                
                // 🔥 DATA FACET BARU YANG DIKIRIM KE INERTIA FRONTEND
                'facets' => [
                    'categories' => $categoryCounts, // Berisi array pasangan [category_id => total_product]
                    'price_ranges' => array_values($priceRanges), // Berisi array kumpulan label harga low, mid, high
                ]
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | DETAIL
    |--------------------------------------------------------------------------
    */

    public function show(
        Request $request,
        string $slug
    ) {
        $this->trackPageVisit(
            $request,
            'Product Detail - ' . $slug
        );

        $product = Product::query()
            ->published()
            ->with([
                'category:id,name,slug',
                'brand:id,name',
                'coverImage',
                'images' => fn($q) => $q->orderBy('is_cover', 'desc')->orderBy('position', 'asc'),
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | Increment View
        |--------------------------------------------------------------------------
        */
        $this->incrementProductView(
            $product,
            $request->ip()
        );

        /*
        |--------------------------------------------------------------------------
        | Related Products
        |--------------------------------------------------------------------------
        */
        $relatedProducts = Product::query()
            ->published()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->with([
                'category:id,name,slug',
                'coverImage',
            ])
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn($item) => $this->transformProduct($item));

        /*
        |--------------------------------------------------------------------------
        | Product Images
        |--------------------------------------------------------------------------
        */
        $images = $product->images->isNotEmpty()
            ? $product->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'path' => resolve_image_path(
                        $image->image_path
                    ),
                    'is_cover' => $image->is_cover,
                    'position' => $image->position,
                ];
            })
            : [[
                'id' => 0,
                'path' => '/images/placeholder.png',
                'is_cover' => true,
                'position' => 0,
            ]];

        /*
        |--------------------------------------------------------------------------
        | Product Data
        |--------------------------------------------------------------------------
        */
        $productData = [
            ...$this->transformProduct($product),

            'brand' => $product->brand,

            'stock' => $product->track_quantity
                ? $product->quantity
                : null,

            'description' => $product->description,
            'short_description' => $product->short_description,

            'sku' => $product->sku,
            'barcode' => $product->barcode,

            'is_featured' => $product->is_featured,

            'meta_title' => $product->meta_title,
            'meta_description' => $product->meta_description,

            'images' => $images,

            'tags' => $product->tags,

            'specific_specs' => $product->specific_specs,
        ];

        /*
        |--------------------------------------------------------------------------
        | SEO
        |--------------------------------------------------------------------------
        */
        $seo = [
            'title' => $product->meta_title
                ?: $product->name,

            'description' => $product->meta_description
                ?: (
                    $product->short_description
                    ?: str($product->description)
                        ->stripTags()
                        ->limit(160)
                ),

            'keywords' => is_array($product->tags)
                ? implode(', ', $product->tags)
                : $product->meta_description,

            'image' => resolve_image_path(
                $product->coverImage?->image_path
            ),

            'type' => 'product',
        ];

        return Inertia::render(
            'frontend/catalog/detail',
            [
                'product' => $productData,
                'relatedProducts' => $relatedProducts,
                'seo' => $seo,
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | ORDER
    |--------------------------------------------------------------------------
    */

    public function order(Request $request)
    {
        try {

            $validated = $request->validate([
                'company_name' => ['required', 'string', 'max:255'],
                'pic_name' => ['required', 'string', 'max:255'],
                'phone' => [
                    'required',
                    'string',
                    'max:20',
                    'regex:/^[0-9+\-\s]+$/',
                ],
                'email' => ['required', 'email:rfc,dns'],
                'notes' => ['nullable', 'string'],
                'product_id' => ['required', 'integer'],
                'quantity' => ['required', 'integer', 'min:1'],
                'recaptcha_token' => ['required'],
            ]);

            /*
            |--------------------------------------------------------------------------
            | Recaptcha
            |--------------------------------------------------------------------------
            */
            if (
                !Recaptcha::verify(
                    $validated['recaptcha_token'],
                    'product_order',
                    0.5
                )
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mohon maaf terjadi kesalahan. Silakan coba lagi.',
                ], 422);
            }

            /*
            |--------------------------------------------------------------------------
            | Product
            |--------------------------------------------------------------------------
            */
            $product = Product::query()
                ->with([
                    'coverImage',
                    'category',
                ])
                ->findOrFail(
                    $validated['product_id']
                );

            /*
            |--------------------------------------------------------------------------
            | Transaction
            |--------------------------------------------------------------------------
            */
            $order = DB::transaction(function () use (
                $validated,
                $product
            ) {

                $customer = Customer::firstOrCreate(
                    [
                        'email' => $validated['email'],
                    ],
                    [
                        'name' => $validated['pic_name'],
                        'phone' => $validated['phone'],
                        'address' => '',
                        'is_active' => true,
                    ]
                );

                $order = Order::create([
                    'customer_id' => $customer->id,

                    'order_number' => Order::generateOrderNumber(
                        Configuration::getValue(
                            'catalog_prefix_product_order',
                            'ORD'
                        )
                    ),

                    'company_name' => $validated['company_name'],
                    'pic_name' => $validated['pic_name'],
                    'phone' => $validated['phone'],
                    'email' => $validated['email'],

                    'status' => 'pending',

                    'address' => '',
                    'province' => '',
                    'regency' => '',
                    'district' => '',
                    'village' => '',
                    'postal_code' => '',

                    'product_id' => $product->id,
                    'product_name' => $product->name,

                    'product_category' =>
                        $product->category?->name
                        ?? 'Uncategorized',

                    'product_image' =>
                        $product->coverImage?->image_path,

                    'product_price' => $product->price,

                    'quantity' => $validated['quantity'],

                    'total_price' =>
                        $product->price
                        * $validated['quantity'],

                    'notes' =>
                        $validated['notes'] ?? '',

                    'admin_notes' => '',
                ]);

                $this->emailService
                    ->sendOrderNotifications($order);

                return $order;
            });

            return response()->json([
                'success' => true,
                'message' => 'Pesanan Anda berhasil dikirim.',
                'data' => [
                    'order_number' => $order->order_number,
                ],
            ]);

        } catch (ValidationException $e) {

            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Throwable $e) {

            \Log::error(
                'Frontend Product Order Error',
                [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]
            );

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses pesanan.',
            ], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | HELPERS
    |--------------------------------------------------------------------------
    */
    private function applyProductFilters(
        $query,
        array $filters
    ): void {
        $search   = $filters['search'] ?? null;
        $type     = $filters['type'] ?? null;
        $category = $filters['category'] ?? null;
        $minPrice = $filters['minPrice'] ?? null;
        $maxPrice = $filters['maxPrice'] ?? null;

        $query
            /*
            |--------------------------------------------------------------------------
            | PERBAIKAN: Pencarian Berdasarkan Title, Short Description, & Description
            |--------------------------------------------------------------------------
            */
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%") // Menggunakan 'title' sesuai request
                        ->orWhere('short_description', 'like', "%{$search}%") // Tambahan short_description
                        ->orWhere('description', 'like', "%{$search}%"); // Tetap menyisir full description
                });
            })

            ->when($type, function ($query, $type) {
                match ($type) {
                    'sell' =>
                        $query->where('is_for_sell', true)
                            ->where('is_rent', false),

                    'rent' =>
                        $query->where(function ($q) {
                            $q->where('is_rent', true)
                                ->orWhere(function ($nested) {
                                    $nested->where('is_rent', false)
                                        ->where('is_for_sell', false);
                                });
                        }),

                    'rent-and-sell' =>
                        $query->where('is_for_sell', true)
                            ->where('is_rent', true),

                    default => null,
                };
            })

            ->when($category, function ($query, $category) {
                $categoriesArray = is_string($category) ? explode(',', $category) : (array) $category;
                $allCategoryIds = [];

                foreach ($categoriesArray as $catSlug) {
                    $catSlug = trim($catSlug);
                    if (empty($catSlug)) {
                        continue;
                    }
                    
                    $categoryIds = $this->getCategoryAndDescendants($catSlug);
                    
                    if (!empty($categoryIds)) {
                        $allCategoryIds = array_merge($allCategoryIds, is_array($categoryIds) ? $categoryIds : $categoryIds->toArray());
                    }
                }

                $uniqueCategoryIds = array_unique($allCategoryIds);

                $query->whereIn(
                    'category_id',
                    $uniqueCategoryIds
                );
            })

            ->when($minPrice, function ($query, $minPrice) {
                $query->where('price', '>=', $minPrice);
            })

            ->when($maxPrice, function ($query, $maxPrice) {
                $query->where('price', '<=', $maxPrice);
            });
    }

    private function applySorting(
        $query,
        ?string $sort
    ): void {

        match ($sort) {

            'price-desc' =>
                $query->orderByDesc('price'),

            'name-asc' =>
                $query->orderBy('name'),

            'name-desc' =>
                $query->orderByDesc('name'),

            default =>
                $query->orderBy('price'),
        };
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

    private function resolveImagePath(?string $path): string
    {
        $baseUrl = rtrim(config('app.url'), '/');

        if (empty($path)) {
            return $baseUrl . '/images/placeholder.png';
        }

        // Jika sudah full URL
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return $baseUrl . '/storage/' . ltrim($path, '/');
    }

    private function buildSeo(
        array $filters
    ): array {

        $configs = Configuration::query()
            ->whereIn('key', [
                'catalog_meta_title',
                'catalog_meta_description',
                'catalog_meta_keywords',
                'catalog_meta_image',
                'site_name',
                'site_tagline',
                'site_logo',
                'meta_description',
                'meta_keywords'
            ])
            ->pluck('value', 'key');

        $title =
            $configs['catalog_meta_title']
            ?? 'Katalog Kami';

        if ($filters['category']) {

            $category = Category::query()
                ->where(
                    'slug',
                    $filters['category']
                )
                ->first();

            if ($category) {
                $title =
                    $category->name .
                    ' | Katalog Kontainer';
            }
        }

        if ($filters['search']) {

            $title =
                'Pencarian "' .
                $filters['search'] .
                '" | Katalog Kontainer';
        }

        return [
            'title' => $title ? strip_tags($title) : 'Alumoda Sinergi Kontainer Indonesia',

            'description' => !empty($configs['catalog_meta_description']) 
                ? strip_tags($configs['catalog_meta_description']) 
                : (!empty($configs['meta_description']) ? strip_tags($configs['meta_description']) : 'Temukan berbagai pilihan kontainer baru dan bekas untuk kebutuhan industri.'),

            'keywords' => !empty($configs['catalog_meta_keywords']) 
                ? strip_tags($configs['catalog_meta_keywords']) 
                : (!empty($configs['meta_keywords']) ? strip_tags($configs['meta_keywords']) : 'jual beli kontainer, sewa kontainer, kontainer kustom, kontainer office, DNV, reefer, DRY Container'),

            'image' => match (true) {
                !empty($configs['catalog_meta_image']) => asset(
                    'storage/' . $configs['catalog_meta_image']
                ),

                !empty($configs['site_logo']) => asset(
                    str_starts_with($configs['site_logo'], 'configurations/')
                        ? 'storage/' . $configs['site_logo']
                        : $configs['site_logo']
                ),

                default => asset('images/logo-main.png'),
            },
            'contentType' => 'website',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | VIEW COUNTER
    |--------------------------------------------------------------------------
    */

    private function incrementProductView(
        Product $product,
        string $ipAddress
    ): void {

        try {

            $cacheKey =
                'product_view_' .
                $product->id .
                '_' .
                md5($ipAddress);

            if (!Cache::has($cacheKey)) {

                $product->increment('views');

                Cache::put(
                    $cacheKey,
                    true,
                    now()->addHour()
                );
            }

        } catch (\Throwable $e) {

            \Log::error(
                'Failed increment product view',
                [
                    'product_id' => $product->id,
                    'error' => $e->getMessage(),
                ]
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */

    private function getHierarchicalCategoriesByProducts(?string $search = null): array
    {
        $productCategoryQuery = Product::query()
            ->published()
            ->whereNotNull('category_id')
            // Pastikan relasi kategorinya juga valid bertipe product
            ->whereHas('category', function($q) {
                $q->where('type', 'product')->active();
            });

        // Harus sama persis dengan match yang ada di applyProductFilters!
        if ($search) {
            $productCategoryQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('short_description', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Ambil ID kategori yang benar-benar tersisa dari hasil pencarian produk
        $activeCategoryIds = $productCategoryQuery->distinct()->pluck('category_id')->toArray();

        if (empty($activeCategoryIds)) {
            return [];
        }

        // ... (Sisa kode backtracking parent & mapping pohon ke bawahnya tetap sama)
        $allNecessaryCategoryIds = [];
        $categoriesToProcess = Category::ofType('product')->active()->whereIn('id', $activeCategoryIds)->get();

        foreach ($categoriesToProcess as $cat) {
            $allNecessaryCategoryIds[] = $cat->id;
            $current = $cat;
            while ($current && !is_null($current->parent_id)) {
                if (!in_array($current->parent_id, $allNecessaryCategoryIds)) {
                    $allNecessaryCategoryIds[] = $current->parent_id;
                }
                $current = Category::find($current->parent_id);
            }
        }

        $allCategories = Category::query()
            ->active()
            ->ofType('product')
            ->whereIn('id', array_unique($allNecessaryCategoryIds))
            ->orderBy('parent_id')
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id', 'slug']);

        $categories = [];
        $map = [];

        foreach ($allCategories as $category) {
            $map[$category->id] = [
                'label' => $category->name,
                'value' => $category->slug,
                'subcategories' => [],
            ];
        }

        foreach ($allCategories as $category) {
            if (is_null($category->parent_id)) {
                $categories[] = &$map[$category->id];
            } elseif (isset($map[$category->parent_id])) {
                $map[$category->parent_id]['subcategories'][] = &$map[$category->id];
            }
        }

        return $categories;
    }

    private function getHierarchicalCategories(): array
    {
        $allCategories = Category::query()
            ->active()
            ->where('type', 'product')
            ->orderBy('parent_id')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'parent_id',
                'slug',
            ]);

        $categories = [];
        $map = [];

        foreach ($allCategories as $category) {

            $map[$category->id] = [
                'label' => $category->name,
                'value' => $category->slug,
                'subcategories' => [],
            ];
        }

        foreach ($allCategories as $category) {

            if (is_null($category->parent_id)) {

                $categories[] =
                    &$map[$category->id];

            } elseif (
                isset($map[$category->parent_id])
            ) {

                $map[$category->parent_id]['subcategories'][] =
                    &$map[$category->id];
            }
        }

        return $categories;
    }

    private function getCategoryAndDescendants(
        string $slug
    ): array {

        $category = Category::query()
            ->where('slug', $slug)
            ->first();

        if (!$category) {
            return [];
        }

        return array_merge(
            [$category->id],
            $this->getDescendantIds($category->id)
        );
    }

    private function getDescendantIds(
        int $parentId
    ): array {

        $children = Category::query()
            ->where('parent_id', $parentId)
            ->pluck('id');

        $ids = [];

        foreach ($children as $childId) {

            $ids[] = $childId;

            $ids = array_merge(
                $ids,
                $this->getDescendantIds($childId)
            );
        }

        return $ids;
    }
}