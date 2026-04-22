<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing role-permission assignments
        DB::table('role_has_permissions')->delete();

        // Get roles
        $superAdmin = Role::where('name', 'Super Admin')->first();
        $admin = Role::where('name', 'Admin')->first();
        $editor = Role::where('name', 'Editor')->first();

        // Get all permissions
        $allPermissions = Permission::all();

        // Super Admin gets all permissions
        if ($superAdmin) {
            $superAdmin->givePermissionTo($allPermissions);
        }

        // Admin gets most permissions except user/role/permission management
        if ($admin) {
            $adminPermissions = Permission::whereNotIn('group_name', ['Authorization'])->get();
            $admin->givePermissionTo($adminPermissions);
        }

        // Editor gets CMS and Dashboard permissions only
        if ($editor) {
            $editorPermissions = Permission::whereIn('group_name', ['Dashboard', 'CMS'])->get();
            $editor->givePermissionTo($editorPermissions);
        }
    }
}
