<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use App\Traits\TracksVisitors;

class CatalogController extends Controller
{
    use TracksVisitors;
    public function show(Request $request, $slug)
    {
        // Track visitor
        $this->trackPageVisit($request, 'Product Detail - ' . $slug);
        
        $product = Product::published()
            ->with(['category', 'brand', 'images' => function ($query) {
                $query->orderBy('position', 'asc');
            }])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment product view count with rate limiting (per IP per hour)
        $this->incrementProductView($product, $request->ip());

        // Get related products
        $relatedProducts = Product::published()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->with(['category', 'coverImage'])
            ->limit(4)
            ->get()
            ->map(function ($product) {
                // Get cover image with proper path validation like backpanel
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
                
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'type' => $product->type,
                    'show_price' => $product->show_price,
                    'price' => $product->price,
                    'compare_at_price' => $product->compare_at_price,
                    'stock' => $product->track_quantity ? $product->quantity : null,
                    'image' => $coverImagePath,
                    'description' => $product->short_description ?? $product->description,
                    'is_bestseller' => $product->is_bestseller,
                    'is_new' => $product->is_new,
                    'is_for_sell' => $product->is_for_sell,
                    'is_rent' => $product->is_rent,
                ];
            });

        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'type' => $product->type,
            'category' => $product->category?->name ?? 'Uncategorized',
            'brand' => $product->brand?->name,
            'price' => $product->price,
            'compare_at_price' => $product->compare_at_price,
            'stock' => $product->track_quantity ? $product->quantity : null,
            'description' => $product->description,
            'short_description' => $product->short_description,
            'sku' => $product->sku,
            'barcode' => $product->barcode,
            'is_bestseller' => $product->is_bestseller,
            'is_new' => $product->is_new,
            'is_featured' => $product->is_featured,
            'is_for_sell' => $product->is_for_sell,
            'show_price' => $product->show_price,
            'is_rent' => $product->is_rent,
            'images' => $product->images->isNotEmpty() ? $product->images->map(function ($image) {
                // Use the same path as backpanel - just prepend /storage/ if not already present
                $imagePath = $image->image_path;
                if (!str_starts_with($imagePath, '/storage/')) {
                    $imagePath = '/storage/' . ltrim($imagePath, '/');
                }
                
                // Check if the image file actually exists, otherwise use placeholder
                $fullPath = public_path($imagePath);
                if (!file_exists($fullPath)) {
                    $imagePath = '/images/placeholder.png';
                }
                
                return [
                    'id' => $image->id,
                    'path' => $imagePath,
                    'is_cover' => $image->is_cover,
                    'position' => $image->position,
                ];
            }) : [[
                'id' => 0,
                'path' => '/images/placeholder.png',
                'is_cover' => true,
                'position' => 0,
            ]],
            'tags' => $product->tags,
        ];

        return Inertia::render('frontend/catalog/detail', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts
        ]);
    }

    /**
     * Increment product view count with rate limiting
     * Prevents duplicate counts from same IP within 1 hour
     *
     * @param Product $product
     * @param string $ipAddress
     * @return void
     */
    private function incrementProductView(Product $product, string $ipAddress): void
    {
        try {
            // Create cache key for rate limiting (IP + Product ID)
            $cacheKey = 'product_view_' . $product->id . '_' . md5($ipAddress);
            
            // Check if this IP has viewed this product recently (within 1 hour)
            if (!Cache::has($cacheKey)) {
                // Increment the view count
                $product->increment('views');
                
                // Set cache to prevent duplicate counting for 1 hour
                Cache::put($cacheKey, true, 3600);
                
                // Log the view increment for debugging
                \Log::info('Product view incremented', [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'ip_address' => $ipAddress,
                    'total_views' => $product->fresh()->views,
                ]);
            } else {
                \Log::info('Product view skipped (rate limited)', [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'ip_address' => $ipAddress,
                ]);
            }
        } catch (\Exception $e) {
            // Log error but don't break the user experience
            \Log::error('Failed to increment product view', [
                'product_id' => $product->id,
                'ip_address' => $ipAddress,
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function index(Request $request)
    {
        // Track visitor
        $this->trackPageVisit($request, 'Product Catalog');
        
        // Get categories and types from database with hierarchical structure
        $categories = $this->getHierarchicalCategories();
        
        $types = ['sell', 'rent', 'rent-and-sell'];

        // Build query with filters
        $query = Product::published()
            ->with(['category', 'brand', 'coverImage'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%')
                        ->orWhere('meta_title', 'LIKE', '%' . $search . '%')
                        ->orWhere('meta_description', 'LIKE', '%' . $search . '%')
                        ->orWhere('tags', 'LIKE', '%' . $search . '%')
                        ->orWhere('short_description', 'LIKE', '%' . $search . '%')
                        ->orWhere('sku', 'LIKE', '%' . $search . '%');
                });
            })
            ->when($request->type, function ($query, $type) {
                if($type === 'sell') {
                    return $query->where('is_for_sell', true);
                } elseif($type === 'rent') {
                    return $query->where('is_rent', true);
                } elseif($type === 'rent-and-sell') {
                    return $query->where('is_for_sell', true)->where('is_rent', true);
                }
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->when($request->minPrice, function ($query, $minPrice) {
                $query->where('price', '>=', $minPrice);
            })
            ->when($request->maxPrice, function ($query, $maxPrice) {
                $query->where('price', '<=', $maxPrice);
            });

        // Sorting
        switch ($request->sort) {
            case 'price-desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name-asc':
                $query->orderBy('name', 'asc');
                break;
            case 'name-desc':
                $query->orderBy('name', 'desc');
                break;
            case 'price-asc':
            default:
                $query->orderBy('price', 'asc');
                break;
        }

        // Pagination
        $perPage = (int) $request->input('perPage', 12);
        $products = $query->paginate($perPage, ['*'], 'page', $request->input('page', 1));

        // If search returns no results, show latest products
        if ($request->search && $products->isEmpty()) {
            $query = Product::published()
                ->with(['category', 'brand', 'coverImage'])
                ->orderBy('created_at', 'desc');
            
            // Apply other filters (except search) to latest products
            $query->when($request->type, function ($query, $type) {
                if($type === 'sell') {
                    return $query->where('is_for_sell', true);
                } elseif($type === 'rent') {
                    return $query->where('is_rent', true);
                } elseif($type === 'rent-and-sell') {
                    return $query->where('is_for_sell', true)->where('is_rent', true);
                }
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->when($request->minPrice, function ($query, $minPrice) {
                $query->where('price', '>=', $minPrice);
            })
            ->when($request->maxPrice, function ($query, $maxPrice) {
                $query->where('price', '<=', $maxPrice);
            });

            // Apply sorting to latest products
            switch ($request->sort) {
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name-asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name-desc':
                    $query->orderBy('name', 'desc');
                    break;
                case 'price-asc':
                default:
                    $query->orderBy('price', 'asc');
                    break;
            }

            $products = $query->paginate($perPage, ['*'], 'page', $request->input('page', 1));
        }

        // Transform products for frontend
        $transformedProducts = $products->getCollection()->map(function ($product) {
            // Get cover image with proper path validation like backpanel
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
                
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'type' => $product->type,
                    'category' => $product->category?->name ?? 'Uncategorized',
                    'brand' => $product->brand?->name,
                    'price' => $product->price,
                                       'compare_at_price' => $product->compare_at_price,
                    'compare_at_price' => $product->compare_at_price,
                    'stock' => $product->track_quantity ? $product->quantity : null,
                    'image' => $coverImagePath,
                'description' => $product->short_description ?? $product->description,
                'is_bestseller' => $product->is_bestseller,
                'is_new' => $product->is_new,
                'is_featured' => $product->is_featured,
                'is_for_sell' => $product->is_for_sell,
                'is_rent' => $product->is_rent,
                'show_price' => $product->show_price,
                'sku' => $product->sku,
            ];
        });

        $productsData = [
            'status' => 'success',
            'data' => $transformedProducts,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'last_page' => $products->lastPage(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
            ],
            'load_info' => [
                'request_time' => $request->server('REQUEST_TIME'),
                'timestamp' => time(),
                'formatted' => date('Y-m-d H:i:s'),
                'timezone' => date_default_timezone_get(),
                'microtime' => microtime(true),
                'load_time' => round(microtime(true) - LARAVEL_START, 4),
                'memory_usage' => round(memory_get_usage() / 1024 / 1024, 2) . ' MB',
            ]
        ];

        return Inertia::render('frontend/catalog/index', [
            'products' => $productsData,
            'categories' => $categories,
            'types' => $types,
            'filters' => $request->only(['search', 'type', 'category', 'minPrice', 'maxPrice', 'sort', 'perPage'])
        ]);
    }

    // function order frontend
    public function order(Request $request)
    {
        try {
            $validated = $request->validate([
                'company_name' => 'required|string|max:255',
                'pic_name' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'email' => 'required|email|max:255',
                'notes' => 'nullable|string',
                'product_id' => 'required|integer',
                'quantity' => 'required|integer|min:1',
            ]);

            // Get product data from database with cover image
            $product = \App\Models\Product::with('coverImage')->findOrFail($validated['product_id']);
            
            // Get cover image or fallback to product image
            $productImage = $product->coverImage?->path ?? $product->image;

            // Check if customer exists (optional, for future use)
            $customer = \App\Models\Customer::where('email', $validated['email'])->first();

            // Create new customer if not found (optional, for future use)
            if (!$customer) {
                $customer = \App\Models\Customer::create([
                    'name' => $validated['pic_name'],
                    'phone' => $validated['phone'],
                    'email' => $validated['email'],
                    'address' => '',
                    'is_active' => true,
                ]);
            }

            // Prepare order data using existing table structure
            $orderData = [
                'customer_id' => $customer->id, // Now available after migration
                'order_number' => \App\Models\Order::generateOrderNumber(),
                'company_name' => $validated['company_name'],
                'pic_name' => $validated['pic_name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'status' => 'pending',
                'address' => '',
                'province' => '',
                'regency' => '',
                'district' => '',
                'village' => '',
                'postal_code' => '',
                'admin_notes' => '',
                'product_id' => $product->id,
                'product_name' => $product->name,
                'product_category' => $product->category?->name ?? 'Uncategorized',
                'product_image' => $productImage,
                'product_price' => $product->price,
                'quantity' => $validated['quantity'],
                'total_price' => $product->price * $validated['quantity'],
                'notes' => $validated['notes'] ?? '',
            ];

            $order = \App\Models\Order::create($orderData);

            return response()->json([
                'success' => true,
                'message' => 'Pesanan Anda telah diterima. Kami akan segera menghubungi Anda untuk konfirmasi.',
                'order' => $order
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal. Silakan periksa kembali form Anda.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Log error for debugging
            \Log::error('Order submission error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi atau hubungi kami langsung.'
            ], 500);
        }
    }

    /**
     * Get hierarchical categories structure
     */
    private function getHierarchicalCategories()
    {
        // Get all categories ordered by parent and name
        $allCategories = Category::active()
            ->where('type', 'product')
            ->orderBy('parent_id')
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id', 'slug']);

        // Build hierarchical structure
        $categories = [];
        $categoryMap = [];

        // First pass: create category map
        foreach ($allCategories as $category) {
            $categoryMap[$category->id] = [
                'label' => $category->name,
                'value' => $category->slug,
                'subcategories' => []
            ];
        }

        // Second pass: build hierarchy
        foreach ($allCategories as $category) {
            if (is_null($category->parent_id)) {
                // This is a parent category
                $categories[] = &$categoryMap[$category->id];
            } else {
                // This is a child category
                if (isset($categoryMap[$category->parent_id])) {
                    $categoryMap[$category->parent_id]['subcategories'][] = &$categoryMap[$category->id];
                }
            }
        }

        // If no hierarchical data exists, return flat structure with mock data
        if (empty($categories)) {
            return [
                [
                    'label' => 'Container',
                    'value' => 'container',
                    'subcategories' => [
                        ['label' => 'Container 20ft', 'value' => 'container-20ft'],
                        ['label' => 'Container 30ft', 'value' => 'container-30ft'],
                        ['label' => 'Container 40ft', 'value' => 'container-40ft'],
                        ['label' => 'Container 45ft', 'value' => 'container-45ft'],
                    ]
                ],
                [
                    'label' => 'Office Container',
                    'value' => 'office-container',
                    'subcategories' => [
                        ['label' => 'Office Container 20ft', 'value' => 'office-20ft'],
                        ['label' => 'Office Container 40ft', 'value' => 'office-40ft'],
                    ]
                ],
                [
                    'label' => 'Toilet Container',
                    'value' => 'toilet-container',
                    'subcategories' => [
                        ['label' => 'Toilet Portable', 'value' => 'toilet-portable'],
                        ['label' => 'Toilet Container 20ft', 'value' => 'toilet-20ft'],
                    ]
                ],
                [
                    'label' => 'Gudang',
                    'value' => 'gudang',
                    'subcategories' => [
                        ['label' => 'Gudang Mini', 'value' => 'gudang-mini'],
                        ['label' => 'Gudang Besar', 'value' => 'gudang-besar'],
                    ]
                ]
            ];
        }

        return $categories;
    }
}