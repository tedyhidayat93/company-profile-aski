<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                return $query->where('type', $type);
            })
            ->when($request->brand, function ($query, $brand) {
                return $query->where('brand_id', $brand);
            })
            ->when($request->category, function ($query, $category) {
                return $query->where('category_id', $category);
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'published') {
                    return $query->where('status', 'published');
                } elseif ($status === 'draft') {
                    return $query->where('status', 'draft');
                }
            })
            ->when($request->featured !== null, function ($query, $featured) {
                return $query->where('is_featured', $featured === 'true');
            })
            ->when($request->bestseller !== null, function ($query, $bestseller) {
                return $query->where('is_bestseller', $bestseller === 'true');
            })
            ->with(['brand', 'category'])
            ->orderBy('name')
            ->paginate(15);

        $brands = Brand::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('backpanel/product/index', [
            'products' => $products,
            'brands' => $brands,
            'categories' => $categories,
            'filters' => $request->only(['search', 'type', 'brand', 'category', 'status', 'featured', 'bestseller'])
        ]);
    }

    public function create()
    {
        $brands = Brand::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('backpanel/product/create', [
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'type' => 'required|string|in:physical,digital',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => 'nullable|string|max:100|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'cost_per_item' => 'nullable|numeric|min:0',
            'track_quantity' => 'boolean',
            'quantity' => 'nullable|integer|min:0',
            'barcode' => 'nullable|string|max:100',
            'status' => 'required|string|in:draft,published',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new' => 'boolean',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = array_filter($validated['tags']);
        }

        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['is_bestseller'] = $validated['is_bestseller'] ?? false;
        $validated['is_new'] = $validated['is_new'] ?? false;
        $validated['track_quantity'] = $validated['track_quantity'] ?? true;

        $product = Product::create($validated);

        return redirect()->route('cms.products.index')
            ->with('success', 'Produk berhasil dibuat');
    }

    public function show($id)
    {
        $product = Product::with(['brand', 'category'])->findOrFail($id);

        return Inertia::render('backpanel/product/show', [
            'product' => $product
        ]);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $brands = Brand::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('backpanel/product/edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products')->ignore($product->id),
            ],
            'type' => 'required|string|in:physical,digital',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('products')->ignore($product->id),
            ],
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'cost_per_item' => 'nullable|numeric|min:0',
            'track_quantity' => 'boolean',
            'quantity' => 'nullable|integer|min:0',
            'barcode' => 'nullable|string|max:100',
            'status' => 'required|string|in:draft,published',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new' => 'boolean',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = array_filter($validated['tags']);
        }

        $validated['is_featured'] = $validated['is_featured'] ?? $product->is_featured;
        $validated['is_bestseller'] = $validated['is_bestseller'] ?? $product->is_bestseller;
        $validated['is_new'] = $validated['is_new'] ?? $product->is_new;
        $validated['track_quantity'] = $validated['track_quantity'] ?? $product->track_quantity;

        $product->update($validated);

        return redirect()->route('cms.products.index')
            ->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return redirect()->route('cms.products.index')
            ->with('success', 'Produk berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $product = Product::findOrFail($id);
        $product->status = $product->status === 'published' ? 'draft' : 'published';
        $product->save();

        return redirect()->route('cms.products.index')
            ->with('success', 'Status produk berhasil diperbarui');
    }

    public function toggleFeatured($id)
    {
        $product = Product::findOrFail($id);
        $product->is_featured = !$product->is_featured;
        $product->save();

        return redirect()->route('cms.products.index')
            ->with('success', 'Status unggulan produk berhasil diperbarui');
    }

    public function toggleBestseller($id)
    {
        $product = Product::findOrFail($id);
        $product->is_bestseller = !$product->is_bestseller;
        $product->save();

        return redirect()->route('cms.products.index')
            ->with('success', 'Status terlaris produk berhasil diperbarui');
    }

    public function updatePosition(Request $request)
    {
        $validated = $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|integer|exists:products,id',
            'products.*.position' => 'required|integer|min:0',
        ]);

        foreach ($validated['products'] as $productData) {
            Product::where('id', $productData['id'])
                ->update(['position' => $productData['position']]);
        }

        return redirect()->route('cms.products.index')
            ->with('success', 'Posisi produk berhasil diperbarui');
    }
}