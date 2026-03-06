<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $viewMode = $request->get('view', 'table');
        
        if ($viewMode === 'tree') {
            // Tree view - no pagination, get all categories with children
            $categories = Category::with('parent')
                ->when($request->type && $request->type !== 'all', function ($query, $type) {
                    return $query->ofType($type);
                })
                ->when($request->search, function ($query, $search) {
                    return $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                })
                ->orderBy('lft')
                ->get();
                
            // Transform to match expected structure for tree view
            $categories = [
                'data' => $categories,
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => count($categories),
                'total' => count($categories),
                'links' => [
                    'first' => '',
                    'last' => '',
                    'prev' => null,
                    'next' => null,
                ]
            ];
        } else {
            // Table view - with pagination
            $categories = Category::with('parent')
                ->when($request->type && $request->type !== 'all', function ($query, $type) {
                    return $query->ofType($type);
                })
                ->when($request->search, function ($query, $search) {
                    return $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                })
                ->orderBy('lft')
                ->paginate(10);
        }

        $parentCategories = Category::with('children')
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return Inertia::render('backpanel/category/index', [
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'filters' => $request->only(['search', 'type', 'view'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|string|in:product,service,blog',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('categories', 'public');
            $validated['image'] = $path;
        }

        $validated['is_active'] = $validated['is_active'] ?? true;

        $category = Category::create($validated);

        return redirect()->route('cms.category.index')
            ->with('success', 'Kategori berhasil dibuat');
    }

    public function show($id)
    {
        $category = Category::with('parent', 'children')->findOrFail($id);

        return Inertia::render('backpanel/category/show', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories')->ignore($category->id),
            ],
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|string|in:product,service,blog',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'sometimes|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $image = $request->file('image');
            $path = $image->store('categories', 'public');
            $validated['image'] = $path;
        }

        // Handle is_active field properly
        $validated['is_active'] = isset($validated['is_active']) 
            ? (bool) $validated['is_active'] 
            : $category->is_active;

        $category->update($validated);

        return redirect()->route('cms.category.index')
            ->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->children()->count() > 0) {
            return redirect()->route('cms.category.index')
            ->with('error', 'Tidak dapat menghapus kategori yang memiliki subkategori');
        }

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->route('cms.category.index')
            ->with('success', 'Kategori berhasil dihapus');
    }

    public function getTree(Request $request)
    {
        $categories = Category::with('children')
            ->when($request->type && $request->type !== 'all', function ($query, $type) {
                return $query->ofType($type);
            })
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Struktur kategori berhasil diambil'
        ]);
    }

    public function toggleStatus($id)
    {
        $category = Category::findOrFail($id);
        $category->is_active = !$category->is_active;
        $category->save();

        return redirect()->route('cms.category.index')
            ->with('success', 'Status kategori berhasil diperbarui');
    }

    public function create()
    {
        $parentCategories = Category::with('children')
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return Inertia::render('backpanel/category/create', [
            'parentCategories' => $parentCategories
        ]);
    }

    public function edit($id)
    {
        $category = Category::with('parent', 'children')->findOrFail($id);
        $parentCategories = Category::with('children')
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return Inertia::render('backpanel/category/edit', [
            'category' => $category,
            'parentCategories' => $parentCategories
        ]);
    }
}