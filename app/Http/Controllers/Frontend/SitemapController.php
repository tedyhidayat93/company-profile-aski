<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Product;
use App\Models\Service; // Tambahkan import model Service
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Traits\TracksVisitors;

class SitemapController extends Controller
{
    use TracksVisitors;
    /**
     * Display the sitemap page
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

        // Navigation links dari constants (Menyesuaikan href Layanan ke halaman index barunya)
        $navigation = [
            ['name' => 'Beranda', 'href' => '/'],
            ['name' => 'Layanan', 'href' => '/services'], // Diubah dari hash anchor ke path asli index services
            ['name' => 'Tentang Kami', 'href' => '/about-us'],
            ['name' => 'Katalog Produk', 'href' => '/catalog'],
            ['name' => 'Artikel', 'href' => '/articles'],
            ['name' => 'Testimoni', 'href' => '/testimonial'],
            ['name' => 'Kontak Kami', 'href' => '/contact-us'],
            ['name' => 'Site Map', 'href' => '/sitemap'],
        ];

        return Inertia::render('frontend/sitemap', [
            'services'   => $services ?? [], // Kirim list services ke view React
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
        
        // Add homepage
        $sitemap .= '
            <url>
                <loc>' . $baseUrl . '</loc>
                <lastmod>' . now()->toAtomString() . '</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
            </url>';
        
        // Add static & main dynamic index pages
        $staticPages = [
            '/about-us',
            '/services',
            '/catalog',
            '/articles',
            '/contact-us',
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
        
        // --- ADD SERVICES LIST (Baru) ---
        $services = Service::where('is_active', true)->get(['slug', 'updated_at']);
        foreach ($services as $service) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/service/' . $service->slug . '</loc>
                    <lastmod>' . ($service->updated_at ? $service->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // Add articles
        $articles = Article::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($articles as $article) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/articles/' . $article->slug . '</loc>
                    <lastmod>' . $article->updated_at->toAtomString() . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>';
        }
        
        // Add products
        $products = Product::where('status', 'published')->get(['slug', 'updated_at']);
        foreach ($products as $product) {
            $sitemap .= '
                <url>
                    <loc>' . $baseUrl . '/catalog/' . $product->slug . '</loc>
                    <lastmod>' . $product->updated_at->toAtomString() . '</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>';
        }
        
        // Add testimonials
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