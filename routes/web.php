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
use App\Http\Controllers\BackPanel\CMS\ClientController;
use App\Http\Controllers\BackPanel\CMS\TestimonialController;
use App\Http\Controllers\BackPanel\CMS\ProductController;
use App\Http\Controllers\BackPanel\CMS\ArticleController;
use App\Http\Controllers\BackPanel\CRM\OrderController;
use App\Http\Controllers\BackPanel\CRM\CustomerController;
use App\Http\Controllers\BackPanel\Settings\{
    ProfileController,
    PasswordController,
    TwoFactorAuthenticationController,
    SettingsController,
    ConfigurationController
};
use App\Http\Controllers\BackPanel\Authorization\{
    RoleController,
    PermissionController,
    UserManagementController
};
use Illuminate\Support\Facades\Route;

// Frontend (Public)
Route::get('/', [HomepageController::class, 'index'])->name('homepage');

Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');

Route::post('/catalog/order', [CatalogController::class, 'order'])->name('catalog.order');

Route::get('/catalog/{id}', [CatalogController::class, 'show'])
    ->name('catalog.show');
    
Route::get('/catalog/{category}', function($category) {
    return 'Catalog category: ' . $category;
})->name('catalog.category');

Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('index');
    Route::get('/{slug}', [BlogController::class, 'show'])->name('show');
    Route::get('/category/{slug}', [BlogController::class, 'category'])->name('category');
    Route::get('/tag/{slug}', [BlogController::class, 'tag'])->name('tag');
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
                Route::get('/', [CategoryController::class, 'index'])->name('index');
                Route::get('/create', [CategoryController::class, 'create'])->name('create');
                Route::post('/', [CategoryController::class, 'store'])->name('store');
                Route::get('/{id}', [CategoryController::class, 'show'])->name('show');
                Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '/{id}', [CategoryController::class, 'update'])->name('update');
                Route::delete('/{id}', [CategoryController::class, 'destroy'])->name('destroy');
                Route::patch('/{id}/toggle-status', [CategoryController::class, 'toggleStatus'])->name('toggle-status');
                Route::get('/tree', [CategoryController::class, 'getTree'])->name('tree');
            });

            // Services
            Route::prefix('service')->name('service.')->group(function () {
                Route::get('', [ServiceController::class, 'index'])->name('index');
                Route::get('create', [ServiceController::class, 'create'])->name('create');
                Route::post('', [ServiceController::class, 'store'])->name('store');
                Route::get('{id}', [ServiceController::class, 'show'])->name('show');
                Route::get('edit/{id}', [ServiceController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [ServiceController::class, 'update'])->name('update');
                Route::delete('{id}', [ServiceController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [ServiceController::class, 'toggleStatus'])->name('toggle-status');
                Route::patch('{id}/toggle-featured', [ServiceController::class, 'toggleFeatured'])->name('toggle-featured');
            });

            // Clients
            Route::prefix('client')->name('client.')->group(function () {
                Route::get('', [ClientController::class, 'index'])->name('index');
                Route::get('create', [ClientController::class, 'create'])->name('create');
                Route::post('', [ClientController::class, 'store'])->name('store');
                Route::get('{id}', [ClientController::class, 'show'])->name('show');
                Route::get('edit/{id}', [ClientController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [ClientController::class, 'update'])->name('update');
                Route::delete('{id}', [ClientController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [ClientController::class, 'toggleStatus'])->name('toggle-status');
            });

            // Testimonials
            Route::prefix('testimonial')->name('testimonial.')->group(function () {
                Route::get('', [TestimonialController::class, 'index'])->name('index');
                Route::get('create', [TestimonialController::class, 'create'])->name('create');
                Route::post('', [TestimonialController::class, 'store'])->name('store');
                Route::get('{id}', [TestimonialController::class, 'show'])->name('show');
                Route::get('edit/{id}', [TestimonialController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [TestimonialController::class, 'update'])->name('update');
                Route::delete('{id}', [TestimonialController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [TestimonialController::class, 'toggleStatus'])->name('toggle-status');
            });

            // Brands
            Route::prefix('brand')->name('brand.')->group(function () {
                Route::get('', [BrandController::class, 'index'])->name('index');
                Route::get('create', [BrandController::class, 'create'])->name('create');
                Route::post('', [BrandController::class, 'store'])->name('store');
                Route::get('{id}', [BrandController::class, 'show'])->name('show');
                Route::get('edit/{id}', [BrandController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [BrandController::class, 'update'])->name('update');
                Route::delete('{id}', [BrandController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [BrandController::class, 'toggleStatus'])->name('toggle-status');
                Route::patch('update-position', [BrandController::class, 'updatePosition'])->name('update-position');
            });

            // Tags
            Route::prefix('tag')->name('tag.')->group(function () {
                Route::get('', [TagController::class, 'index'])->name('index');
                Route::get('create', [TagController::class, 'create'])->name('create');
                Route::post('', [TagController::class, 'store'])->name('store');
                Route::get('{id}', [TagController::class, 'show'])->name('show');
                Route::get('edit/{id}', [TagController::class, 'edit'])->name('edit');
                Route::put('{id}', [TagController::class, 'update'])->name('update');
                Route::delete('{id}', [TagController::class, 'destroy'])->name('destroy');
            });

            // FAQs
            Route::prefix('faq')->name('faq.')->group(function () {
                Route::get('', [FaqController::class, 'index'])->name('index');
                Route::get('create', [FaqController::class, 'create'])->name('create');
                Route::post('', [FaqController::class, 'store'])->name('store');
                Route::get('{id}', [FaqController::class, 'show'])->name('show');
                Route::get('edit/{id}', [FaqController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [FaqController::class, 'update'])->name('update');
                Route::delete('{id}', [FaqController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [FaqController::class, 'toggleStatus'])->name('toggle-status');
                Route::patch('update-position', [FaqController::class, 'updatePosition'])->name('update-position');
            });

            // Products
            Route::prefix('product')->name('product.')->group(function () {
                Route::get('', [ProductController::class, 'index'])->name('index');
                Route::get('create', [ProductController::class, 'create'])->name('create');
                Route::post('', [ProductController::class, 'store'])->name('store');
                Route::get('{id}', [ProductController::class, 'show'])->name('show');
                Route::get('edit/{id}', [ProductController::class, 'edit'])->name('edit');
                Route::match(['post', 'put'], '{id}', [ProductController::class, 'update'])->name('update');
                Route::delete('{id}', [ProductController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [ProductController::class, 'toggleStatus'])->name('toggle-status');
                Route::patch('{id}/toggle-featured', [ProductController::class, 'toggleFeatured'])->name('toggle-featured');
                Route::patch('{id}/toggle-bestseller', [ProductController::class, 'toggleBestseller'])->name('toggle-bestseller');
                Route::patch('update-position', [ProductController::class, 'updatePosition'])->name('update-position');
            });

            // Articles
            Route::prefix('article')->name('article.')->group(function () {
                Route::get('', [ArticleController::class, 'index'])->name('index');
                Route::get('create', [ArticleController::class, 'create'])->name('create');
                Route::post('', [ArticleController::class, 'store'])->name('store');
                Route::get('{id}', [ArticleController::class, 'show'])->name('show');
                Route::get('edit/{id}', [ArticleController::class, 'edit'])->name('edit');
                Route::put('{id}', [ArticleController::class, 'update'])->name('update');
                Route::delete('{id}', [ArticleController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [ArticleController::class, 'toggleStatus'])->name('toggle-status');
                Route::patch('update-position', [ArticleController::class, 'updatePosition'])->name('update-position');
            });    
        });
    
        // CRM
        Route::prefix('crm')->name('crm.')->group(function () {
            // Orders
            Route::prefix('orders')->name('orders.')->group(function () {
                Route::get('', [OrderController::class, 'index'])->name('index');
                Route::get('create', [OrderController::class, 'create'])->name('create');
                Route::post('', [OrderController::class, 'store'])->name('store');
                Route::get('{id}', [OrderController::class, 'show'])->name('show');
                Route::get('edit/{id}', [OrderController::class, 'edit'])->name('edit');
                Route::put('{id}', [OrderController::class, 'update'])->name('update');
                Route::delete('{id}', [OrderController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/status', [OrderController::class, 'updateStatus'])->name('updateStatus');
            });
            
            // Customers
            Route::prefix('customer')->name('customer.')->group(function () {
                Route::get('', [CustomerController::class, 'index'])->name('index');
                Route::get('create', [CustomerController::class, 'create'])->name('create');
                Route::post('', [CustomerController::class, 'store'])->name('store');
                Route::get('{id}', [CustomerController::class, 'show'])->name('show');
                Route::get('edit/{id}', [CustomerController::class, 'edit'])->name('edit');
                Route::put('{id}', [CustomerController::class, 'update'])->name('update');
                Route::delete('{id}', [CustomerController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [CustomerController::class, 'toggleStatus'])->name('toggle-status');
            });
        });
    
        // Authorization Management
        Route::prefix('authorization')->name('authorization.')->group(function () {
            // User Management
            Route::prefix('user-management')->name('users.')->group(function () {
                Route::get('', [UserManagementController::class, 'index'])->name('index');
                Route::get('create', [UserManagementController::class, 'create'])->name('create');
                Route::post('', [UserManagementController::class, 'store'])->name('store');
                Route::get('{id}', [UserManagementController::class, 'show'])->name('show');
                Route::get('edit/{id}', [UserManagementController::class, 'edit'])->name('edit');
                Route::put('{id}', [UserManagementController::class, 'update'])->name('update');
                Route::delete('{id}', [UserManagementController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [UserManagementController::class, 'toggleStatus'])->name('toggle-status');
            });

            // Role Management
            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('', [RoleController::class, 'index'])->name('index');
                Route::get('create', [RoleController::class, 'create'])->name('create');
                Route::post('', [RoleController::class, 'store'])->name('store');
                Route::get('{id}', [RoleController::class, 'show'])->name('show');
                Route::get('edit/{id}', [RoleController::class, 'edit'])->name('edit');
                Route::put('{id}', [RoleController::class, 'update'])->name('update');
                Route::delete('{id}', [RoleController::class, 'destroy'])->name('destroy');
                Route::patch('{id}/toggle-status', [RoleController::class, 'toggleStatus'])->name('toggle-status');
                Route::get('{id}/permissions', [RoleController::class, 'permissions'])->name('permissions');
                Route::put('{id}/permissions', [RoleController::class, 'syncPermissions'])->name('sync-permissions');
            });

            // Permission Management
            Route::prefix('permissions')->name('permissions.')->group(function () {
                Route::get('', [PermissionController::class, 'index'])->name('index');
                Route::get('create', [PermissionController::class, 'create'])->name('create');
                Route::post('', [PermissionController::class, 'store'])->name('store');
                Route::get('{id}', [PermissionController::class, 'show'])->name('show');
                Route::get('edit/{id}', [PermissionController::class, 'edit'])->name('edit');
                Route::put('{id}', [PermissionController::class, 'update'])->name('update');
                Route::delete('{id}', [PermissionController::class, 'destroy'])->name('destroy');
                Route::get('groups', [PermissionController::class, 'groups'])->name('groups');
            });
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
                
                Route::get('view_homepage', [ConfigurationController::class, 'viewHomepage'])->name('view_homepage');
                Route::put('view_homepage', [ConfigurationController::class, 'update', 'view_homepage'])->name('view_homepage.update');
                Route::post('view_homepage', [ConfigurationController::class, 'create', 'view_homepage'])->name('view_homepage.create');
                Route::delete('view_homepage/{id}', [ConfigurationController::class, 'destroy', 'view_homepage'])->name('view_homepage.destroy');
                
                Route::get('other', [ConfigurationController::class, 'other'])->name('other');
                Route::put('other', [ConfigurationController::class, 'update', 'other'])->name('other.update');
                Route::post('other', [ConfigurationController::class, 'create', 'other'])->name('other.create');
                Route::delete('other/{id}', [ConfigurationController::class, 'destroy', 'other'])->name('other.destroy');
            });
        });    
    });
});