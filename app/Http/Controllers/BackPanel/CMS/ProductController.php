<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductImage;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
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
            ->when($request->type_sell, function ($query, $type) {
                if($type === 'sell') {
                    return $query->where('is_for_sell', true);
                } elseif($type === 'rent') {
                    return $query->where('is_rent', true);
                } elseif($type === 'rent-and-sell') {
                    return $query->where('is_for_sell', true)->where('is_rent', true);
                }
            })
            ->when($request->brand, function ($query, $brand) {
                return $query->where('brand_id', $brand);
            })
            ->when($request->type, function ($query, $type) {
                return $query->where('type', $type);
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
            ->with(['brand', 'category', 'coverImage'])
            ->orderBy('id', 'desc')
            // ->orderBy('name')
            ->paginate(10);

        // Transform products to include proper image paths
        $transformedProducts = $products->getCollection()->map(function ($product) {
            // Get cover image with proper path validation
            $coverImagePath = $product->coverImage?->image_path;
            if ($coverImagePath && !str_starts_with($coverImagePath, '/storage/')) {
                $coverImagePath = '/storage/' . ltrim($coverImagePath, '/');
            } elseif (!$coverImagePath) {
                $coverImagePath = '/images/placeholder.png';
            }
            
            // Check if the image file actually exists
            $fullPath = public_path($coverImagePath);
            if (!file_exists($fullPath)) {
                $coverImagePath = '/images/placeholder.png';
            }
            
            // Add the image path to the product
            $product->image_path = $coverImagePath;
            return $product;
        });

        // Replace the collection in the paginator
        $products->setCollection($transformedProducts);

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
        // Normalize currency inputs
        $request->merge([
            'price' => normalize_currency($request->price),
            'compare_at_price' => normalize_currency($request->compare_at_price),
            'cost_per_item' => normalize_currency($request->cost_per_item),
        ]);

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
            'is_for_sell' => 'boolean',
            'is_rent' => 'boolean',
            'show_price' => 'boolean',
            'position' => 'nullable|integer|min:0',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'images' => 'nullable|array|max:5',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'cover_image' => 'nullable|integer|min:0',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = array_filter($validated['tags']);
            $this->insertNewTags($validated['tags'], 'product');
        }

        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['is_bestseller'] = $validated['is_bestseller'] ?? false;
        $validated['is_new'] = $validated['is_new'] ?? false;
        $validated['is_for_sell'] = $validated['is_for_sell'] ?? false;
        $validated['is_rent'] = $validated['is_rent'] ?? false;
        $validated['show_price'] = $validated['show_price'] ?? true;
        $validated['track_quantity'] = $validated['track_quantity'] ?? true;
        $validated['position'] = $validated['position'] ?? 0;
        
        // Handle "none" values for brand_id and category_id
        if ($validated['brand_id'] === 'none') {
            $validated['brand_id'] = null;
        }
        if ($validated['category_id'] === 'none') {
            $validated['category_id'] = null;
        }

        $product = Product::create($validated);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $coverImageIndex = $validated['cover_image'] ?? 0;
            
            foreach ($images as $index => $image) {
                $path = $image->store('products', 'public');
                
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_cover' => $index === $coverImageIndex,
                    'position' => $index,
                ]);
            }
        }

        return redirect()->route('cms.product.index')
            ->with('success', 'Produk berhasil dibuat');
    }

    public function show($id)
    {
        $product = Product::with(['brand', 'category', 'images' => function($query) {
            $query->orderBy('position');
        }])->findOrFail($id);

        return Inertia::render('backpanel/product/show', [
            'product' => $product
        ]);
    }

    public function edit($id)
    {
        $product = Product::with(['brand', 'category', 'images' => function($query) {
            $query->orderBy('position');
        }])->findOrFail($id);
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

        // Normalize currency inputs
        $request->merge([
            'price' => normalize_currency($request->price),
            'compare_at_price' => normalize_currency($request->compare_at_price),
            'cost_per_item' => normalize_currency($request->cost_per_item),
        ]);

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
            'is_for_sell' => 'boolean',
            'is_rent' => 'boolean',
            'position' => 'nullable|integer|min:0',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'images' => 'nullable|array|max:5',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'cover_image' => 'nullable|integer|min:0',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'nullable|integer',
        ]);
        
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = array_filter($validated['tags']);
            $this->insertNewTags($validated['tags'], 'product');
        }

        $validated['is_featured'] = $validated['is_featured'] ?? $product->is_featured;
        $validated['is_bestseller'] = $validated['is_bestseller'] ?? $product->is_bestseller;
        $validated['is_new'] = $validated['is_new'] ?? $product->is_new;
        $validated['show_price'] = $validated['show_price'] ?? $product->show_price;
        $validated['track_quantity'] = $validated['track_quantity'] ?? $product->track_quantity;
        $validated['position'] = $validated['position'] ?? $product->position;
        
        // Handle "none" values for brand_id and category_id
        if ($validated['brand_id'] === 'none') {
            $validated['brand_id'] = null;
        }
        if ($validated['category_id'] === 'none') {
            $validated['category_id'] = null;
        }

        $product->update($validated);

        // Handle image removals
        if (isset($validated['remove_images']) && is_array($validated['remove_images'])) {
            foreach ($validated['remove_images'] as $imageId) {
                $image = ProductImage::find($imageId);
                if ($image && $image->product_id === $product->id) {
                    // Delete file from storage
                    Storage::disk('public')->delete($image->image_path);
                    // Delete record
                    $image->delete();
                }
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $coverImageIndex = $validated['cover_image'] ?? 0;
            $maxPosition = $product->images()->max('position') ?? 0;
            
            foreach ($images as $index => $image) {
                $path = $image->store('products', 'public');
                
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_cover' => $index === $coverImageIndex,
                    'position' => $maxPosition + $index + 1,
                ]);
            }
        }

        // Update cover image if specified
        if (isset($validated['cover_image']) && $validated['cover_image'] !== '') {
            // Reset all cover images
            $product->images()->update(['is_cover' => false]);
            
            // Set new cover image
            $coverImage = $product->images()->where('id', $validated['cover_image'])->first();
            if ($coverImage) {
                $coverImage->update(['is_cover' => true]);
            }
        }

        return redirect()->route('cms.product.index')
            ->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy($id)
    {
        $product = Product::with('images')->findOrFail($id);

        // Delete all product images from storage
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('cms.product.index')
            ->with('success', 'Produk berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $product = Product::findOrFail($id);
        $product->status = $product->status === 'published' ? 'draft' : 'published';
        $product->save();

        return redirect()->route('cms.product.index')
            ->with('success', 'Status produk berhasil diperbarui');
    }

    public function toggleFeatured($id)
    {
        $product = Product::findOrFail($id);
        $product->is_featured = !$product->is_featured;
        $product->save();

        return redirect()->route('cms.product.index')
            ->with('success', 'Status unggulan produk berhasil diperbarui');
    }

    public function toggleBestseller($id)
    {
        $product = Product::findOrFail($id);
        $product->is_bestseller = !$product->is_bestseller;
        $product->save();

        return redirect()->route('cms.product.index')
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

        return redirect()->route('cms.product.index')
            ->with('success', 'Posisi produk berhasil diperbarui');
    }

    /**
     * Insert new tags into the tags table
     *
     * @param array $tags
     * @param string $type
     * @return void
     */
    private function insertNewTags(array $tags, string $type)
    {
        foreach ($tags as $tagName) {
            $tagName = trim($tagName);
            if (!empty($tagName)) {
                $slug = Str::slug($tagName);
                
                // Check if tag already exists
                $existingTag = Tag::where('slug', $slug)
                    ->orWhere('name', $tagName)
                    ->first();
                
                // Insert only if tag doesn't exist
                if (!$existingTag) {
                    Tag::create([
                        'name' => $tagName,
                        'slug' => $slug,
                        'type' => $type,
                    ]);
                }
            }
        }
    }
}