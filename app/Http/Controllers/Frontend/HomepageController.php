<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use App\Models\Configuration;
use App\Models\Client;
use App\Models\Faq;
use App\Models\Article;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\TracksVisitors;

class HomepageController extends Controller
{
    use TracksVisitors;
    public function index(Request $request): Response
    {
        // Track visitor
        $this->trackPageVisit($request, 'Homepage');
        
        // Get featured products for homepage
        $products = Product::where('status', 'published')
            ->where('is_featured', true)
            ->with(['brand', 'category', 'coverImage'])
            ->orderBy('position')
            ->orderBy('name')
            ->take(6)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'type' => $product->type,
                    'description' => $product->description ?? '',
                    'short_description' => $product->short_description,
                    'sku' => $product->sku ?? '',
                    'price' => $product->price,
                    'compare_at_price' => $product->compare_at_price,
                    'cost_per_item' => $product->cost_per_item,
                    'track_quantity' => $product->track_quantity ?? false,
                    'quantity' => $product->quantity,
                    'barcode' => $product->barcode,
                    'status' => $product->status ?? 'active',
                    'is_featured' => $product->is_featured ?? false,
                    'is_bestseller' => $product->is_bestseller ?? false,
                    'is_new' => $product->is_new ?? false,
                    'is_for_sell' => $product->is_for_sell ?? false,
                    'is_rent' => $product->is_rent ?? false,
                    'show_price' => $product->show_price ?? true,
                    'show_stock' => $product->show_stock ?? true,
                    'position' => $product->position,
                    'brand_id' => $product->brand_id,
                    'category_id' => $product->category_id,
                    'image_path' => $product->coverImage?->image_path ? '/storage/' . $product->coverImage->image_path : '/images/placeholder.png',
                    'stock' => $product->quantity ?? 0,
                    'image' => $product->coverImage?->image_path ? '/storage/' . $product->coverImage->image_path : '/images/placeholder.png',
                    'coverImage' => $product->coverImage ? [
                        'id' => $product->coverImage->id,
                        'image_path' => '/storage/' . $product->coverImage->image_path,
                        'is_cover' => $product->coverImage->is_cover,
                        'position' => $product->coverImage->position ?? 0,
                    ] : null,
                    'brand' => $product->brand ? [
                        'id' => $product->brand->id,
                        'name' => $product->brand->name,
                    ] : null,
                    'category' => $product->category ? [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ] : null,
                    'tags' => $product->tags ?? [],
                    'created_at' => $product->created_at?->toISOString() ?? now()->toISOString(),
                    'updated_at' => $product->updated_at?->toISOString() ?? now()->toISOString(),
                ];
            });

        // Get services for homepage
        $services = Service::where('is_active', true)
            ->orderBy('sequence')
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->name,
                    'description' => $service->description ?? '',
                    'image' => $service->image ?? '/images/placeholder.png'
                ];
            });

        // Get clients for homepage
        $clients = Client::where('is_active', true)
            ->orderBy('sequence')
            ->orderBy('name')
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'name' => $client->name,
                    'logo' => $client->image ? '/storage/clients/' . $client->image : '/images/placeholder.png'
                ];
            });

        // Get FAQs for homepage
        $faqs = Faq::where('is_active', true)
            ->orderBy('position')
            ->orderBy('question')
            ->get()
            ->map(function ($faq) {
                return [
                    'id' => $faq->id,
                    'question' => $faq->question,
                    'answer' => $faq->answer
                ];
            });

        // Get latest articles for homepage
        $articles = Article::where('status', 'published')
            ->where('is_headline', true)
            ->with(['author'])
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt ?? '',
                    'image' => $article->featured_image ?? '/images/placeholder.png',
                    'category' => 'Artikel',
                    'date' => $article->published_at?->format('d M Y') ?? '',
                    'slug' => $article->slug
                ];
            });

        // Get testimonials for homepage (limit to 4 for display)
        $testimonials = Testimonial::public()
            ->ordered()
            ->take(4)
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->nama,
                    'role' => $testimonial->keterangan,
                    'company' => $testimonial->perusahaan,
                    'content' => $testimonial->testimoni,
                    'avatar' => $testimonial->foto_avatar ?? '/images/avatar-placeholder.png',
                    'rating' => $testimonial->rate_star
                ];
            });

        return Inertia::render('frontend/homepage', [
            'canRegister' => false,
            'canForgotPassword' => false,
            'products' => $products,
            'services' => $services,
            'clients' => $clients,
            'faqs' => $faqs,
            'articles' => $articles,
            'testimonials' => $testimonials,
        ]);
    }
}