<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\View;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Configuration;
use App\Models\Product;
use App\Models\Article;
use App\Models\Category;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Client;
use App\Observers\ProductObserver;
use App\Observers\ArticleObserver;
use App\Observers\ServiceObserver;
use App\Observers\TestimonialObserver;
use App\Observers\ClientObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Product::observe(
            ProductObserver::class
        );

        Article::observe(
            ArticleObserver::class
        );

        Testimonial::observe(
            TestimonialObserver::class
        );

        Client::observe(
            ClientObserver::class
        );

        Service::observe(
            ServiceObserver::class
        );

        RateLimiter::for('product-order', function (Request $request) {
            // User akan:
            // dibatasi per IP
            // dibatasi per email
            // anti spam
            // anti brute force

            return [

                // Max 5 request per menit per IP
                Limit::perMinute(5)->by($request->ip()),

                // Max 20 request per jam per email
                Limit::perHour(20)->by(
                    $request->input('email')
                ),

            ];
        });


        Inertia::share([
            /*
            |--------------------------------------------------------------------------
            | Product Categories
            |--------------------------------------------------------------------------
            */

            // 'product_categories' => fn () => Cache::remember(
            //     'shared.product_categories',
            //     now()->addMinutes(10),
            //     fn () => Category::with('children')
            //         ->ofType('product')
            //         ->root()
            //         ->active()
            //         ->orderBy('lft')
            //         ->select(['id', 'name', 'slug', 'description', 'meta_title', 'meta_description']) // Ambil kolom spesifik root
            //         ->with(['children' => function($query) {
            //             $query->select(['id', 'name', 'slug', 'description', 'meta_title', 'meta_description']); // Ambil kolom spesifik children
            //         }])
            //         ->get()
            // ),

            'productCategories' => function () {
                return Category::ofType('product')
                    ->root()
                    ->active()
                    ->orderBy('lft')
                    ->select(['id', 'name', 'slug', 'description', 'meta_title', 'meta_description'])
                    ->with(['children' => function($query) {
                        $query->select(['id', 'parent_id', 'name', 'slug', 'description'])->active()->orderBy('lft');
                    }])
                    ->get()
                    ->map(function ($rootCategory) {
                        // 🔄 Lakukan transformasi data langsung di sini
                        return [
                            'title'       => $rootCategory->name,
                            'slug'        => $rootCategory->slug,
                            'description' => $rootCategory->description,
                            'items'       => $rootCategory->children && $rootCategory->children->isNotEmpty()
                                ? $rootCategory->children->map(function ($child) {
                                    return [
                                        'name' => $child->name,
                                        'description' => $child->description,
                                        'href' => "/jual-sewa?category={$child->slug}",
                                    ];
                                })->toArray()
                                : [
                                    [
                                        'name' => "Lihat Semua {$rootCategory->title}",
                                        'href' => "/jual-sewa?category={$rootCategory->slug}",
                                    ]
                                ],
                        ];
                    });
            },

            /*
            |--------------------------------------------------------------------------
            | Footer Products
            |--------------------------------------------------------------------------
            */

            'footerProducts' => fn () => Cache::remember(
                'shared.footer.products',
                now()->addHours(1),
                fn () => Product::getBestsellerForFooter()
            ),

            /*
            |--------------------------------------------------------------------------
            | Footer Articles
            |--------------------------------------------------------------------------
            */

            'footerArticles' => fn () => Cache::remember(
                'shared.footer.articles',
                now()->addHours(1),
                fn () => Article::getMostReadForFooter()
            ),

            /*
            |--------------------------------------------------------------------------
            | Footer Services
            |--------------------------------------------------------------------------
            */

            'footerServices' => fn () => Cache::remember(
                'shared.footer.services',
                now()->addHours(6),
                fn () => Service::getAllForFooter()
            ),

        ]);

        View::share('siteconfig',
            Cache::rememberForever('siteconfig.public', function () {
                return Configuration::orderBy('group')
                    ->orderBy('label')
                    ->get()
                    ->mapWithKeys(fn ($config) => [
                        $config->key => $config->value
                    ]);
            })
        );
    }
}
