<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Product;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use App\Traits\TracksVisitors;

class BlogController extends Controller
{
    use TracksVisitors;

    public function index(Request $request)
    {
        // $this->trackPageVisit($request, 'Blog Index');

        $filters = [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'tag' => $request->string('tag')->toString(),
        ];

        // Cek apakah user sedang melakukan pencarian / filter
        $isFiltered = !empty($filters['search']) || !empty($filters['category']) || !empty($filters['tag']);

        /*
        |--------------------------------------------------------------------------
        | Categories (Cached - Berubah jarang, hemat 1 query)
        |--------------------------------------------------------------------------
        */
        $categories = Cache::remember('blog_categories', now()->addDays(1), function () {
            return Category::query()
                ->where('type', 'blog')
                ->where('is_active', true)
                ->with('children')
                ->get();
        });

        /*
        |--------------------------------------------------------------------------
        | Popular Tags (Cached - Diarsip 6 jam, MENGHENTIKAN kebocoran memori PHP)
        |--------------------------------------------------------------------------
        */
        $popularTags = Cache::remember('blog_popular_tags', now()->addHours(6), function () {
            return Article::published()
                ->whereNotNull('tags')
                ->pluck('tags')
                ->flatMap(function ($tags) {
                    if (is_array($tags)) return $tags;
                    if (is_string($tags)) return json_decode($tags, true) ?? [];
                    return [];
                })
                ->filter()
                ->countBy()
                ->sortDesc()
                ->take(8)
                ->keys()
                ->values();
        });

        /*
        |--------------------------------------------------------------------------
        | Base Query
        |--------------------------------------------------------------------------
        */
        $baseQuery = Article::query()
            ->published()
            ->with([
                'author:id,name',
                'category:id,name,slug',
            ])
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    // Catatan: Jika artikel sudah ribuan, pertimbangkan Full-Text Index ketimbang LIKE %%
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($filters['category'], function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($filters['tag'], function ($query, $tag) {
                $query->where('tags', 'like', "%{$tag}%");
            });

        /*
        |--------------------------------------------------------------------------
        | Homepage Sections (Optimized Queries)
        |--------------------------------------------------------------------------
        */
        
        // 1. Ambil All Posts Utama terlebih dahulu
        $allPosts = (clone $baseQuery)
            ->latest('published_at')
            ->paginate(15)
            ->withQueryString();

        // OPTIMASI: Recent posts diambil langsung dari 5 item pertama allPosts (Hemat 1 Query Besar!)
        $recentPosts = $allPosts->getCollection()->take(5)->values();

        // 2. Kondisional Cache untuk Headline dan Most Read
        if ($isFiltered) {
            // Jika user sedang mencari sesuatu, jalankan query dinamis tanpa cache
            $headlinePosts = (clone $baseQuery)->headline()->latest('published_at')->limit(6)->get();
            $mostReadPosts = (clone $baseQuery)->orderByDesc('views_count')->limit(3)->get();
        } else {
            // Jika halaman depan normal (tanpa filter), ambil dari Cache (Hemat 2 Query Berat!)
            $headlinePosts = Article::query()->published()->with(['author:id,name', 'category:id,name,slug'])->headline()->latest('published_at')->limit(5)->get();

            $mostReadPosts = Article::query()->published()->with(['author:id,name', 'category:id,name,slug'])->orderByDesc('views_count')->limit(5)->get();
        }

       /*
        |--------------------------------------------------------------------------
        | SEO Config (Cached - Berubah sangat jarang, hemat 1 query)
        |--------------------------------------------------------------------------
        |*/
        $seoConfigs = Cache::remember('blog_seo_configs', now()->addDays(1), function () {
            return Configuration::query()
                ->whereIn('key', [
                    'article_meta_image',
                    'article_meta_title',
                    'article_meta_description',
                    'meta_keywords',
                ])
                ->pluck('value', 'key');
        });

        $seo = [
            'title' => !empty($seoConfigs['article_meta_title']) ? strip_tags($seoConfigs['article_meta_title']) : 'Blog & Artikel',
            'description' => !empty($seoConfigs['article_meta_description']) ? strip_tags($seoConfigs['article_meta_description']) : 'Artikel terbaru seputar container...',
            'keywords' => !empty($seoConfigs['meta_keywords']) ? strip_tags($seoConfigs['meta_keywords']) : 'blog container, artikel container',
            'image' => !empty($seoConfigs['article_meta_image']) ? asset('storage/' . $seoConfigs['article_meta_image']) : asset('images/placeholder.png'),
            'contentType' => 'website',
        ];

        /*
        |--------------------------------------------------------------------------
        | Dynamic SEO
        |--------------------------------------------------------------------------
        |*/
        if (!empty($filters['category'])) {
            $category = $categories->firstWhere('slug', $filters['category']);
            if ($category) {
                $categoryName = strip_tags($category->name);
                $seo['title'] = "{$categoryName} | Artikel";
                $seo['description'] = "Artikel dan informasi terbaru tentang {$categoryName}.";
            }
        }

        if (!empty($filters['search'])) {
            $cleanSearch = strip_tags($filters['search']);
            $seo['title'] = 'Pencarian "' . $cleanSearch . '" | Artikel';
            $seo['description'] = 'Hasil pencarian artikel untuk "' . $cleanSearch . '"';
        }

        if (!empty($filters['tag'])) {
            $cleanTag = strip_tags($filters['tag']);
            $seo['title'] = 'Tag "' . $cleanTag . '" | Artikel';
            $seo['description'] = 'Artikel dengan tag "' . $cleanTag . '"';
        }

        $products = $this->getRandomProducts(null, 10);
        
        return Inertia::render('frontend/blog/index', [
            'random_products' => $products,
            'headline_posts' => $headlinePosts,
            'most_read_posts' => $mostReadPosts,
            'recent_posts' => $recentPosts,
            'all_posts' => $allPosts,
            'categories' => $categories,
            'popular_tags' => $popularTags,
            'filters' => $filters,
            'seo' => $seo,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $this->trackPageVisit($request, 'Blog Article - ' . $slug);

        $post = Article::query()
            ->published()
            ->with([
                'author:id,name',
                'category:id,name,slug',
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        $post->increment('views_count');
        
        // Manipulate featured image
        $post->featured_image = resolve_image_path($post->featured_image);

        /*
        |--------------------------------------------------------------------------
        | Related Posts
        |--------------------------------------------------------------------------
        */
        $relatedPosts = Article::query()
            ->published()
            ->where('id', '!=', $post->id)
            ->when($post->category_id, function ($query) use ($post) {
                $query->where('category_id', $post->category_id);
            })
            ->latest('published_at')
            ->limit(3)
            ->get([
                'id',
                'title',
                'slug',
                'featured_image',
                'excerpt',
                'published_at',
                'updated_at',
            ])
            ->map(function ($item) {
                $item->featured_image = resolve_image_path($item->featured_image);

                return $item;
            });

        $products = $this->getRandomProducts(null, 6);

            
        return Inertia::render('frontend/blog/detail', [
            'post' => $post,
            'random_products' => $products,
            'related_posts' => $relatedPosts,
            'seo' => [
                'title' => $post->meta_title ? strip_tags($post->meta_title) : $post->title,

                'description' => ($post->meta_description ? strip_tags($post->meta_description) : null)
                    ?: (($post->excerpt ? strip_tags($post->excerpt) : null)
                        ?: str($post->content)
                            ->stripTags()
                            ->limit(160)
                            ->trim()
                            ->toString()
                    ),

                'image' => $post->featured_image,

                'keywords' => $post->meta_keywords 
                    ? strip_tags($post->meta_keywords) 
                    : (is_array($post->tags)
                        ? implode(', ', array_map('strip_tags', $post->tags))
                        : ''
                    ),

                'type' => 'article',
            ],
        ]);
    }

    public function category(string $slug)
    {
        return redirect()->route('article.index', [
            'category' => $slug,
        ]);
    }

    public function tag(string $slug)
    {
        return redirect()->route('article.index', [
            'tag' => $slug,
        ]);
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

    private function getRandomProducts($slug = null, $show = 8)
    {
        // 1. Buat Unique Cache Key berdasarkan slug agar tidak tercampur antar kategori
        $cacheKey = 'random_products_' . ($slug ?? 'all');

        // 2. Simpan/Ambil data mentah dari Cache selama 10 menit (600 detik)
        $products = Cache::remember($cacheKey, 600, function () use ($slug) {
            return Product::query()
                ->published()
                ->with([
                    'brand:id,name',
                    'category:id,name,slug',
                    'coverImage',
                ])
                ->when($slug, function ($query) use ($slug) {
                    return $query->whereHas('category', function ($q) use ($slug) {
                        $q->where('slug', $slug);
                    });
                })
                // JANGAN gunakan ->inRandomOrder() di sini agar cache tidak mengunci 1 variasi acak saja
                ->get();
        });

        // 3. Lakukan pengacakan di level PHP (Collection) dan batasi jumlahnya
        // Ini menjamin setiap page di-refresh, item yang muncul TETAP ACAK & DINAMIS
        $randomizedProducts = $products->shuffle()->take($show);

        // 4. Proses Mapping Data
        return $randomizedProducts->map(function ($product) {
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