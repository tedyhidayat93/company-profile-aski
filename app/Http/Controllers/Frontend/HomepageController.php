<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use App\Models\Configuration;
use App\Models\Client;
use App\Models\Faq;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function index(Request $request): Response
    {
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
                    'category' => $product->category?->name ?? 'Uncategorized',
                    'price' => $product->price,
                    'compare_at_price' => $product->compare_at_price,
                    'stock' => $product->quantity ?? 0,
                    'image' => $product->coverImage?->image_path ?? '/images/placeholder.png',
                    'description' => $product->short_description ?? $product->description ?? '',
                    'is_bestseller' => $product->is_bestseller ?? false,
                    'show_price' => $product->show_price,
                    'is_new' => $product->is_new ?? false
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

        // Get homepage configurations
        $homepageConfigs = Configuration::homepage()
            ->orderBy('label')
            ->get()
            ->map(function ($config) {
                return [
                    'id' => $config->id,
                    'key' => $config->key,
                    'value' => $config->value,
                    'type' => $config->type,
                    'label' => $config->label,
                    'description' => $config->description,
                ];
            });

            // $siteConfig = Configuration::site()->pluck('value', 'key');
        return Inertia::render('frontend/homepage', [
            'canRegister' => false,
            'canForgotPassword' => false,
            'products' => $products,
            'services' => $services,
            'clients' => $clients,
            'faqs' => $faqs,
            'articles' => $articles,
            'homepageConfigs' => $homepageConfigs,
            // 'siteConfig' => $siteConfig
        ]);
    }
}