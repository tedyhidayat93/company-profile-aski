<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing permissions
        DB::table('permissions')->delete();

        $permissions = [
            // User Management
            ['name' => 'user-list', 'guard_name' => 'web', 'group_name' => 'User Management', 'description' => 'Melihat daftar user'],
            ['name' => 'user-create', 'guard_name' => 'web', 'group_name' => 'User Management', 'description' => 'Membuat user baru'],
            ['name' => 'user-edit', 'guard_name' => 'web', 'group_name' => 'User Management', 'description' => 'Mengedit user'],
            ['name' => 'user-delete', 'guard_name' => 'web', 'group_name' => 'User Management', 'description' => 'Menghapus user'],
            
            // Role Management
            ['name' => 'role-list', 'guard_name' => 'web', 'group_name' => 'Role Management', 'description' => 'Melihat daftar role'],
            ['name' => 'role-create', 'guard_name' => 'web', 'group_name' => 'Role Management', 'description' => 'Membuat role baru'],
            ['name' => 'role-edit', 'guard_name' => 'web', 'group_name' => 'Role Management', 'description' => 'Mengedit role'],
            ['name' => 'role-delete', 'guard_name' => 'web', 'group_name' => 'Role Management', 'description' => 'Menghapus role'],
            
            // Permission Management
            ['name' => 'permission-list', 'guard_name' => 'web', 'group_name' => 'Permission Management', 'description' => 'Melihat daftar permission'],
            ['name' => 'permission-create', 'guard_name' => 'web', 'group_name' => 'Permission Management', 'description' => 'Membuat permission baru'],
            ['name' => 'permission-edit', 'guard_name' => 'web', 'group_name' => 'Permission Management', 'description' => 'Mengedit permission'],
            ['name' => 'permission-delete', 'guard_name' => 'web', 'group_name' => 'Permission Management', 'description' => 'Menghapus permission'],
            
            // Dashboard
            ['name' => 'dashboard-view', 'guard_name' => 'web', 'group_name' => 'Dashboard', 'description' => 'Melihat dashboard'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
