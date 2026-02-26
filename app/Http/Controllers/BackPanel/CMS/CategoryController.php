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
        $categories = Category::with('parent')
            ->when($request->type, function ($query, $type) {
                return $query->ofType($type);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('lft')
            ->paginate(10);

        $parentCategories = Category::with('children')
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return Inertia::render('backpanel/category/index', [
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'filters' => $request->only(['search', 'type'])
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

        return redirect()->route('cms.categories.index')
            ->with('success', 'Category created successfully');
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
            'is_active' => 'boolean',
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

        $validated['is_active'] = $validated['is_active'] ?? $category->is_active;

        $category->update($validated);

        return redirect()->route('cms.categories.index')
            ->with('success', 'Category updated successfully');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->children()->count() > 0) {
            return redirect()->route('cms.categories.index')
                ->with('error', 'Cannot delete category with subcategories');
        }

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->route('cms.categories.index')
            ->with('success', 'Category deleted successfully');
    }

    public function getTree(Request $request)
    {
        $categories = Category::with('children')
            ->when($request->type, function ($query, $type) {
                return $query->ofType($type);
            })
            ->root()
            ->active()
            ->orderBy('lft')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Category tree retrieved successfully'
        ]);
    }

    public function toggleStatus($id)
    {
        $category = Category::findOrFail($id);
        $category->is_active = !$category->is_active;
        $category->save();

        return redirect()->route('cms.categories.index')
            ->with('success', 'Category status updated successfully');
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