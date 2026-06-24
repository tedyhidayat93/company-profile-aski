<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'sadmin@alumodasinergi.com'],
        //     [
        //         'name' => 'Super Admin',
        //         'password' => bcrypt('password'),
        //         'email_verified_at' => now(),
        //         'is_active' => true,
        //     ]
        // );



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
            // OrderSeeder::class,
            // TestimonialSeeder::class,
            // LogVisitorSeeder::class,
        ]);
    }
}
