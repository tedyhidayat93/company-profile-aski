<?php

namespace App\Http\Controllers\BackPanel\Authorization;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:permission-list|permission-create|permission-edit|permission-delete', ['only' => ['index', 'show']]);
    //     $this->middleware('permission:permission-create', ['only' => ['create', 'store']]);
    //     $this->middleware('permission:permission-edit', ['only' => ['edit', 'update']]);
    //     $this->middleware('permission:permission-delete', ['only' => ['destroy']]);
    // }

    public function index(Request $request)
    {
        $permissions = Permission::with('roles')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('group_name', 'like', "%{$search}%");
            })
            ->when($request->group, function ($query, $group) {
                if ($group !== 'all') {
                    $query->where('group_name', $group);
                }
            })
            ->orderBy('group_name')
            ->orderBy('name')
            ->paginate(15);

        $groups = Permission::distinct('group_name')
            ->whereNotNull('group_name')
            ->pluck('group_name')
            ->sort();

        return Inertia::render('backpanel/authorization/permissions/index', [
            'permissions' => $permissions,
            'groups' => $groups,
            'filters' => $request->only(['search', 'group']),
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/authorization/permissions/create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:permissions,name',
            'guard_name' => 'required|string|max:255',
            'group_name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Permission::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name,
            'group_name' => $request->group_name,
            'description' => $request->description,
        ]);

        return redirect()->route('authorization.permissions.index')
            ->with('success', 'Permission berhasil dibuat.');
    }

    public function show(Permission $permission)
    {
        $permission->load('roles', 'users');

        return Inertia::render('backpanel/authorization/permissions/show', [
            'permission' => $permission,
        ]);
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('backpanel/authorization/permissions/edit', [
            'permission' => $permission,
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('permissions')->ignore($permission->id),
            ],
            'guard_name' => 'required|string|max:255',
            'group_name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $permission->update([
            'name' => $request->name,
            'guard_name' => $request->guard_name,
            'group_name' => $request->group_name,
            'description' => $request->description,
        ]);

        return redirect()->route('authorization.permissions.index')
            ->with('success', 'Permission berhasil diperbarui.');
    }

    public function destroy(Permission $permission)
    {
        if ($permission->roles()->count() > 0) {
            return back()->with('error', 'Permission tidak dapat dihapus karena masih digunakan oleh role.');
        }

        if ($permission->users()->count() > 0) {
            return back()->with('error', 'Permission tidak dapat dihapus karena masih digunakan oleh user.');
        }

        $permission->delete();

        return redirect()->route('authorization.permissions.index')
            ->with('success', 'Permission berhasil dihapus.');
    }

    public function groups()
    {
        $groups = Permission::distinct('group_name')
            ->whereNotNull('group_name')
            ->pluck('group_name')
            ->sort()
            ->map(function ($group) {
                return [
                    'name' => $group,
                    'count' => Permission::where('group_name', $group)->count(),
                ];
            });

        return response()->json($groups);
    }
}