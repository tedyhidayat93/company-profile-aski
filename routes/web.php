<?php

use App\Http\Controllers\Frontend\HomepageController;
use App\Http\Controllers\Frontend\CatalogController;
use App\Http\Controllers\BackPanel\DashboardController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\BackPanel\CMS\CategoryController;
use App\Http\Controllers\BackPanel\CMS\ServiceController;
use App\Http\Controllers\BackPanel\CMS\BrandController;
use App\Http\Controllers\BackPanel\CMS\TagController;
use App\Http\Controllers\BackPanel\CMS\FaqController;
use App\Http\Controllers\BackPanel\CMS\ProductController;
use App\Http\Controllers\BackPanel\CMS\ArticleController;
use App\Http\Controllers\BackPanel\CRM\CustomerController;
use App\Http\Controllers\BackPanel\Settings\{
    ProfileController,
    PasswordController,
    TwoFactorAuthenticationController,
    SettingsController,
    ConfigurationController
};
use Illuminate\Support\Facades\Route;

// Frontend (Public)
Route::get('/', [HomepageController::class, 'index'])->name('homepage');

Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');

Route::get('/catalog/{id}', [CatalogController::class, 'show'])
    ->name('catalog.show');
    
Route::get('/catalog/{category}', function($category) {
    return 'Catalog category: ' . $category;
})->name('catalog.category');

Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/{slug}', [BlogController::class, 'show'])->name('blog.show');
    Route::get('/category/{slug}', [BlogController::class, 'category'])->name('blog.category');
    Route::get('/tag/{slug}', [BlogController::class, 'tag'])->name('blog.tag');
});


// Control Panel (Admin)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('cpanel')->group(function () {
        // Dashboard
        Route::get('', [DashboardController::class, 'index'])->name('dashboard');
        
        // CMS Management
        Route::prefix('cms')->name('cms.')->group(function () {
            // Categories
            Route::prefix('category')->name('category.')->group(function () {
                // Categories
                Route::get('', [CategoryController::class, 'index'])->name('categories.index');
                Route::get('create', [CategoryController::class, 'create'])->name('categories.create');
                Route::post('', [CategoryController::class, 'store'])->name('categories.store');
                Route::get('{id}', [CategoryController::class, 'show'])->name('categories.show');
                Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('categories.edit');
                Route::put('{id}', [CategoryController::class, 'update'])->name('categories.update');
                Route::delete('{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
                Route::patch('{id}/toggle-status', [CategoryController::class, 'toggleStatus'])->name('categories.toggle-status');
                Route::get('tree', [CategoryController::class, 'getTree'])->name('categories.tree');
            });

            // Services
            Route::prefix('service')->name('service.')->group(function () {
                Route::get('', [ServiceController::class, 'index'])->name('services.index');
                Route::get('create', [ServiceController::class, 'create'])->name('services.create');
                Route::post('', [ServiceController::class, 'store'])->name('services.store');
                Route::get('{id}', [ServiceController::class, 'show'])->name('services.show');
                Route::get('edit/{id}', [ServiceController::class, 'edit'])->name('services.edit');
                Route::put('{id}', [ServiceController::class, 'update'])->name('services.update');
                Route::delete('{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
                Route::patch('{id}/toggle-status', [ServiceController::class, 'toggleStatus'])->name('services.toggle-status');
                Route::patch('{id}/toggle-featured', [ServiceController::class, 'toggleFeatured'])->name('services.toggle-featured');
            });

            // Brands
            Route::prefix('brand')->name('brand.')->group(function () {
                Route::get('', [BrandController::class, 'index'])->name('brands.index');
                Route::get('create', [BrandController::class, 'create'])->name('brands.create');
                Route::post('', [BrandController::class, 'store'])->name('brands.store');
                Route::get('{id}', [BrandController::class, 'show'])->name('brands.show');
                Route::get('edit/{id}', [BrandController::class, 'edit'])->name('brands.edit');
                Route::put('{id}', [BrandController::class, 'update'])->name('brands.update');
                Route::delete('{id}', [BrandController::class, 'destroy'])->name('brands.destroy');
                Route::patch('{id}/toggle-status', [BrandController::class, 'toggleStatus'])->name('brands.toggle-status');
                Route::patch('update-position', [BrandController::class, 'updatePosition'])->name('brands.update-position');
            });

            // Tags
            Route::prefix('tag')->name('tag.')->group(function () {
                Route::get('', [TagController::class, 'index'])->name('tags.index');
                Route::get('create', [TagController::class, 'create'])->name('tags.create');
                Route::post('', [TagController::class, 'store'])->name('tags.store');
                Route::get('{id}', [TagController::class, 'show'])->name('tags.show');
                Route::get('edit/{id}', [TagController::class, 'edit'])->name('tags.edit');
                Route::put('{id}', [TagController::class, 'update'])->name('tags.update');
                Route::delete('{id}', [TagController::class, 'destroy'])->name('tags.destroy');
            });

            // FAQs
            Route::prefix('faq')->name('faq.')->group(function () {
                Route::get('', [FaqController::class, 'index'])->name('faqs.index');
                Route::get('create', [FaqController::class, 'create'])->name('faqs.create');
                Route::post('', [FaqController::class, 'store'])->name('faqs.store');
                Route::get('{id}', [FaqController::class, 'show'])->name('faqs.show');
                Route::get('edit/{id}', [FaqController::class, 'edit'])->name('faqs.edit');
                Route::put('{id}', [FaqController::class, 'update'])->name('faqs.update');
                Route::delete('{id}', [FaqController::class, 'destroy'])->name('faqs.destroy');
                Route::patch('{id}/toggle-status', [FaqController::class, 'toggleStatus'])->name('faqs.toggle-status');
                Route::patch('update-position', [FaqController::class, 'updatePosition'])->name('faqs.update-position');
            });

            // Products
            Route::prefix('product')->name('product.')->group(function () {
                Route::get('', [ProductController::class, 'index'])->name('products.index');
                Route::get('create', [ProductController::class, 'create'])->name('products.create');
                Route::post('', [ProductController::class, 'store'])->name('products.store');
                Route::get('{id}', [ProductController::class, 'show'])->name('products.show');
                Route::get('edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
                Route::put('{id}', [ProductController::class, 'update'])->name('products.update');
                Route::delete('{id}', [ProductController::class, 'destroy'])->name('products.destroy');
                Route::patch('{id}/toggle-status', [ProductController::class, 'toggleStatus'])->name('products.toggle-status');
                Route::patch('{id}/toggle-featured', [ProductController::class, 'toggleFeatured'])->name('products.toggle-featured');
                Route::patch('{id}/toggle-bestseller', [ProductController::class, 'toggleBestseller'])->name('products.toggle-bestseller');
                Route::patch('update-position', [ProductController::class, 'updatePosition'])->name('products.update-position');
            });

            // Articles
            Route::prefix('article')->name('article.')->group(function () {
                Route::get('', [ArticleController::class, 'index'])->name('articles.index');
                Route::get('create', [ArticleController::class, 'create'])->name('articles.create');
                Route::post('', [ArticleController::class, 'store'])->name('articles.store');
                Route::get('{id}', [ArticleController::class, 'show'])->name('articles.show');
                Route::get('edit/{id}', [ArticleController::class, 'edit'])->name('articles.edit');
                Route::put('{id}', [ArticleController::class, 'update'])->name('articles.update');
                Route::delete('{id}', [ArticleController::class, 'destroy'])->name('articles.destroy');
                Route::patch('{id}/toggle-status', [ArticleController::class, 'toggleStatus'])->name('articles.toggle-status');
                Route::patch('update-position', [ArticleController::class, 'updatePosition'])->name('articles.update-position');
            });    
        });
    
        // CRM
        Route::prefix('crm')->name('crm.')->group(function () {
            // Customers
            Route::prefix('customer')->name('customer.')->group(function () {
                Route::get('', [CustomerController::class, 'index'])->name('customers.index');
                Route::get('create', [CustomerController::class, 'create'])->name('customers.create');
                Route::post('', [CustomerController::class, 'store'])->name('customers.store');
                Route::get('{id}', [CustomerController::class, 'show'])->name('customers.show');
                Route::get('edit/{id}', [CustomerController::class, 'edit'])->name('customers.edit');
                Route::put('{id}', [CustomerController::class, 'update'])->name('customers.update');
                Route::delete('{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
                Route::patch('{id}/toggle-status', [CustomerController::class, 'toggleStatus'])->name('customers.toggle-status');
            });
        });
    
        // System
        Route::get('system', function () {
            // Role
            // Permission
            // Log Activity
            // User Management
        });

        // Settings
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/', [SettingsController::class, 'index'])->name('index');
            Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
            Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
            Route::put('password', [PasswordController::class, 'update'])->name('password.update');
            Route::get('two-factor', [TwoFactorAuthenticationController::class, 'show'])->name('two-factor.show');
            Route::get('appearance', [SettingsController::class, 'editAppearance'])->name('appearance.edit');
            
            // Configuration
            Route::prefix('configuration')->name('configuration.')->group(function () {
                Route::get('/', [ConfigurationController::class, 'index'])->name('index');
                Route::get('site', [ConfigurationController::class, 'site'])->name('site');
                Route::put('site', [ConfigurationController::class, 'update', 'site'])->name('site.update');
                Route::post('site', [ConfigurationController::class, 'create', 'site'])->name('site.create');
                Route::delete('site/{id}', [ConfigurationController::class, 'destroy', 'site'])->name('site.destroy');
                
                Route::get('email', [ConfigurationController::class, 'email'])->name('email');
                Route::put('email', [ConfigurationController::class, 'update', 'email'])->name('email.update');
                Route::post('email', [ConfigurationController::class, 'create', 'email'])->name('email.create');
                Route::delete('email/{id}', [ConfigurationController::class, 'destroy', 'email'])->name('email.destroy');
                
                Route::get('system', [ConfigurationController::class, 'system'])->name('system');
                Route::put('system', [ConfigurationController::class, 'update', 'system'])->name('system.update');
                Route::post('system', [ConfigurationController::class, 'create', 'system'])->name('system.create');
                Route::delete('system/{id}', [ConfigurationController::class, 'destroy', 'system'])->name('system.destroy');
                
                Route::get('payment', [ConfigurationController::class, 'payment'])->name('payment');
                Route::put('payment', [ConfigurationController::class, 'update', 'payment'])->name('payment.update');
                Route::post('payment', [ConfigurationController::class, 'create', 'payment'])->name('payment.create');
                Route::delete('payment/{id}', [ConfigurationController::class, 'destroy', 'payment'])->name('payment.destroy');
                
                Route::get('shipping', [ConfigurationController::class, 'shipping'])->name('shipping');
                Route::put('shipping', [ConfigurationController::class, 'update', 'shipping'])->name('shipping.update');
                Route::post('shipping', [ConfigurationController::class, 'create', 'shipping'])->name('shipping.create');
                Route::delete('shipping/{id}', [ConfigurationController::class, 'destroy', 'shipping'])->name('shipping.destroy');
                
                Route::get('other', [ConfigurationController::class, 'other'])->name('other');
                Route::put('other', [ConfigurationController::class, 'update', 'other'])->name('other.update');
                Route::post('other', [ConfigurationController::class, 'create', 'other'])->name('other.create');
                Route::delete('other/{id}', [ConfigurationController::class, 'destroy', 'other'])->name('other.destroy');
            });
        });    
    });
});





