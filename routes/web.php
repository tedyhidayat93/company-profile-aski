<?php

use App\Http\Controllers\Frontend\HomepageController;
use App\Http\Controllers\Frontend\CatalogController;
use App\Http\Controllers\BackPanel\DashboardController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\BackPanel\Settings\{
    ProfileController,
    PasswordController,
    TwoFactorAuthenticationController,
    SettingsController
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
        
        // Post Management
        Route::get('cms', function () {
            // Catalog Product
            // Brand
            // Services
            // Category
            // Article/News
            // Tag
            // return Inertia::render('posts');
        });
    
        // CRM
        Route::get('crm', function () {
            // Customer
            // Order List
            // Invoice
            // Report
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
            Route::get('', [SettingsController::class, 'index']);
            
            // Profile Routes
            Route::get('profile', [ProfileController::class, 'edit'])
                ->name('profile.edit');
            Route::patch('profile', [ProfileController::class, 'update'])
                ->name('profile.update');
            Route::delete('profile', [ProfileController::class, 'destroy'])
                ->name('profile.destroy');
            
            // Password Routes
            Route::get('password', [PasswordController::class, 'edit'])
                ->name('password.edit');
            Route::put('password', [PasswordController::class, 'update'])
                ->middleware('throttle:6,1')
                ->name('password.update');
            
            // Appearance
            Route::get('appearance', [SettingsController::class, 'editAppearance'])
                ->name('appearance.edit');
            
            // Two Factor Authentication
            Route::get('two-factor', [TwoFactorAuthenticationController::class, 'show'])
                ->name('two-factor.show');
        });
    });
});





