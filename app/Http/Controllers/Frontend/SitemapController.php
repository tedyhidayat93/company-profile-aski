<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Product;
use App\Models\Service;
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
        
        // Get all active services
        $services = Service::where('is_active', true)
            ->orderBy('sequence')
            ->get(['id', 'name', 'slug', 'updated_at']);

        // Get all published articles
        $articles = Article::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->get(['id', 'title', 'slug', 'published_at']);

        // Get all active products
        $products = Product::where('status', 'published')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'created_at']);

        // Navigation links dari constants (Diselaraskan dengan URL Baru Terlokalisasi)
        $navigation = [
            ['name' => 'Beranda', 'href' => '/'],
            ['name' => 'Layanan', 'href' => '/layanan'],
            ['name' => 'Tentang Kami', 'href' => '/tentang-kami'],
            ['name' => 'Katalog Produk', 'href' => '/jual-sewa'],
            ['name' => 'Info & Artikel', 'href' => '/info'],
            ['name' => 'Testimoni', 'href' => '/testimonial'],
            ['name' => 'Kontak Kami', 'href' => '/kontak'],
            ['name' => 'Site Map', 'href' => '/sitemap'],
        ];

        return Inertia::render('frontend/sitemap', [
            'services'   => $services ?? [],
            'articles'   => $articles ?? [],
            'products'   => $products ?? [],
            'navigation' => $navigation ?? [],
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
        
        // 2. ADD MAIN INDEX PAGES (Halaman List Utama)
        $mainIndexes = [
            '/jual-sewa',
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

        // 3. ADD STATIC PAGES (Halaman Informasi Statis)
        $staticPages = [
            '/tentang-kami',
            '/layanan',
            '/kontak',
            '/sitemap'
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
        
        // 4. ADD SERVICES LIST (Detail Jasa / Repair)
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
        
        // 5. ADD PRODUCTS LIST (Detail Unit Jual / Sewa - Set ke Weekly untuk Update Stok/Harga)
        $products = Product::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($products as $product) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/jual-sewa/' . $product->slug . '</loc>
                    <lastmod>' . $product->updated_at->toAtomString() . '</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // 6. ADD ARTICLES LIST (Detail Blog - Mengikuti Rute Root Catch-All '/{slug}')
        $articles = Article::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($articles as $article) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/' . $article->slug . '</loc>
                    <lastmod>' . $article->updated_at->toAtomString() . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>';
        }
        
        // 7. ADD TESTIMONIALS PAGE
        $sitemap .= '
            <url>
                <loc>' . $baseUrl . '/testimonial</loc>
                <lastmod>' . now()->toAtomString() . '</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
            </url>';
        
        $sitemap .= '</urlset>';
        
        return response($sitemap)
            ->header('Content-Type', 'application/xml')
            ->header('Cache-Control', 'public, max-age=3600');
    }
}