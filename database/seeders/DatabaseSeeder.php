<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ConfigurationSeeder::class,
            MetaSeoConfigurationSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            BlogCategorySeeder::class,
            BrandSeeder::class,
            ProductSeeder::class,
            ServiceSeeder::class,
            ClientSeeder::class,
            FaqSeeder::class,
            ArticleSeeder::class,
            CompanyProfileSeeder::class,
            OperationalHourSeeder::class,
            AboutSeeder::class,
            SeoAboutPageSeeder::class,

            // new
            SeoProductPageSeeder::class,
            HeadingCatalogHomePageSectionSeeder::class
        ]);


        // php artisan db:seed --class=CompanyProfileSeeder && php artisan db:seed --class=OperationalHourSeeder && php artisan db:seed --class=AboutSeeder && php artisan db:seed --class=SeoAboutPageSeeder
    }
}
