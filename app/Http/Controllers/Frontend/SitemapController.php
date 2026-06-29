<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Product;
use App\Models\Service;
use App\Models\Category; // Pastikan model Category di-import
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Traits\TracksVisitors;

class SitemapController extends Controller
{
    use TracksVisitors;

    /**
     * Display the sitemap page (HTML View for Users)
     */
    public function index(Request $request)
    {
        // Track visitor
        $this->trackPageVisit($request, 'Sitemap');
        
        // 1. Ambil data Layanan Terpilih
        $services = Service::where('is_active', true)
            ->orderBy('sequence')
            ->get(['id', 'name', 'slug', 'updated_at']);

        // 2. Ambil data Kategori Utama yang bertipe Product
        $productCategories = Category::ofType('product')
            ->root()
            ->active()
            ->get(['id', 'name', 'slug', 'updated_at']);

        // 3. Ambil data Produk Unit
        $products = Product::where('status', 'published')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'updated_at']);

        // 4. Ambil data Artikel / Info Blog
        $articles = Article::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->get(['id', 'title', 'slug', 'published_at']);

        // Navigation links disesuaikan akurat mengikuti rute web.php terbaru
        $navigation = [
            ['name' => 'Beranda', 'href' => '/'],
            ['name' => 'Layanan', 'href' => '/layanan'],
            ['name' => 'Produk', 'href' => '/produk'], 
            ['name' => 'Tentang Kami', 'href' => '/tentang-kami'],
            ['name' => 'Katalog Referensi', 'href' => '/katalog'], 
            ['name' => 'Info & Artikel', 'href' => '/info'],
            ['name' => 'Testimoni', 'href' => '/testimonial'],
            ['name' => 'Kontak Kami', 'href' => '/kontak'],
            ['name' => 'Site Map', 'href' => '/sitemap'],
        ];

        return Inertia::render('frontend/sitemap', [
            'services'           => $services ?? [],
            'product_categories' => $productCategories ?? [], // Dilempar ke frontend React
            'products'           => $products ?? [],
            'articles'           => $articles ?? [],
            'navigation'         => $navigation ?? [],
        ]);
    }

    /**
     * Generate XML sitemap for search engines
     */
    public function xml()
    {
        $baseUrl = config('app.url');
        
        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        // 1. ADD HOMEPAGE (Prioritas Utama)
        $sitemap .= '
            <url>
                <loc>' . $baseUrl . '</loc>
                <lastmod>' . now()->toAtomString() . '</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>';
        
        // 2. ADD MAIN INDEX PAGES (Halaman Indeks Utama)
        $mainIndexes = [
            '/layanan',
            '/produk',
            '/katalog',
            '/info'
        ];
        
        foreach ($mainIndexes as $page) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . $page . '</loc>
                    <lastmod>' . now()->toAtomString() . '</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.9</priority>
                </url>';
        }

        // 3. ADD STATIC PAGES
        $staticPages = [
            '/tentang-kami',
            '/kontak',
            '/sitemap',
            '/testimonial'
        ];
        
        foreach ($staticPages as $page) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . $page . '</loc>
                    <lastmod>' . now()->toAtomString() . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // 4. ADD SERVICES LIST (Detail Jasa - Rute: /layanan/{slug})
        $services = Service::where('is_active', true)->get(['slug', 'updated_at']);
        foreach ($services as $service) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/layanan/' . $service->slug . '</loc>
                    <lastmod>' . ($service->updated_at ? $service->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }

        // 5. ADD PRODUCT CATEGORIES (Rute: /produk/{category})
        $categories = Category::ofType('product')->root()->active()->get(['slug', 'updated_at']);
        foreach ($categories as $category) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/produk/' . $category->slug . '</loc>
                    <lastmod>' . ($category->updated_at ? $category->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // 6. ADD PRODUCTS LIST (Detail Unit Produk - Rute: /katalog/{slug})
        $products = Product::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($products as $product) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/katalog/' . $product->slug . '</loc>
                    <lastmod>' . ($product->updated_at ? $product->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // 7. ADD ARTICLES LIST (Detail Blog - Mengikuti Catch-All Root Route: /{slug})
        $articles = Article::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($articles as $article) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/' . $article->slug . '</loc>
                    <lastmod>' . ($article->updated_at ? $article->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>';
        }
        
        $sitemap .= '</urlset>';
        
        return response($sitemap)
            ->header('Content-Type', 'application/xml')
            ->header('Cache-Control', 'public, max-age=3600');
    }
}