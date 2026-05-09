<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\View;
use App\Models\Product;
use App\Models\Article;
use App\Models\Service;
use Inertia\Inertia;

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
            'footerProducts' => fn () => Product::getBestsellerForFooter(),
            'footerArticles' => fn () => Article::getMostReadForFooter(),
            'footerServices' => fn () => Service::getAllForFooter(),
        ]);
    }
}
