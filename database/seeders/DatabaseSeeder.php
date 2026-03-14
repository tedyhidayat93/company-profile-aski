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

        User::firstOrCreate(
            ['email' => 'sadmin@alumodasinergi.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            ConfigurationSeeder::class,
            CategorySeeder::class,
            BrandSeeder::class,
            ProductSeeder::class,
            ServiceSeeder::class,
            ClientSeeder::class,
            FaqSeeder::class,
        ]);
    }
}
