<?php

namespace App\Http\Controllers\BackPanel;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Article;
use App\Models\LogVisitor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Get real stats
        $stats = [
            [
                'name' => 'Total Produk',
                'value' => Product::count(),
                'icon' => 'Package',
                'change' => '+12%',
                'changeType' => 'increase',
                'color' => 'bg-blue-500 text-white'
            ],
            [
                'name' => 'Total Artikel',
                'value' => Article::count(),
                'icon' => 'FileText',
                'change' => '+5%',
                'changeType' => 'increase',
                'color' => 'bg-green-500 text-white'
            ],
            [
                'name' => 'Total Pelanggan',
                'value' => Customer::count(),
                'icon' => 'Users',
                'change' => '+8.2%',
                'changeType' => 'increase',
                'color' => 'bg-purple-500 text-white'
            ],
            [
                'name' => 'Total Pesanan',
                'value' => Order::count(),
                'icon' => 'ShoppingCart',
                'change' => '-2.1%',
                'changeType' => 'decrease',
                'color' => 'bg-orange-500 text-black'
            ],
            [
                'name' => 'Total Kunjungan Situs',
                'value' => LogVisitor::count(),
                'icon' => 'Eye',
                'change' => '+15%',
                'changeType' => 'increase',
                'color' => 'bg-cyan-500 text-white'
            ],
        ];

        // Get latest products
        $latestProducts = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'added' => $product->created_at->diffForHumans(),
                    'status' => $product->is_active ? 'active' : 'draft',
                    'edit_url' => ''
                ];
            });

        // Get recent orders
        $recentOrders = Order::with('customer')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'customer' => $order->company_name ?: $order->customer?->name ?: 'N/A',
                    'product' => $order->product_name,
                    'date' => $order->created_at->format('d M Y'),
                    'status' => $order->status,
                    'amount' => 'Rp ' . number_format($order->total_price, 0, ',', '.'),
                ];
            });

        // Get top searched products (based on most views)
        $products = Product::with(['category', 'coverImage'])
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();
        
        // Check if all products have 0 views
        $allViewsZero = $products->every(function ($product) {
            return $product->views == 0;
        });
        
        $topSearchedProducts = [];
        
        // Only process and return products if not all views are 0
        if (!$allViewsZero) {
            $topSearchedProducts = $products->map(function ($product, $index) {
                // Calculate percentage change compared to previous period (simplified calculation)
                $previousViews = $product->views * 0.85; // Assume 15% growth for demo
                $change = $previousViews > 0 ? round((($product->views - $previousViews) / $previousViews) * 100, 1) : 0;
                
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'searches' => $product->views,
                    'change' => ($change >= 0 ? '+' : '') . $change . '%',
                    'image_path' => function () use ($product) {
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
                        
                        return $coverImagePath;
                    }
                ];
            });
        }

        // Get real traffic data from LogVisitor
        $todayVisitors = LogVisitor::whereDate('timestamp', today())
            ->selectRaw('HOUR(timestamp) as hour, COUNT(*) as visitors')
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(function ($item) {
                return [
                    'time' => sprintf('%02d:00', $item->hour),
                    'visitors' => $item->visitors,
                    'pageViews' => $item->visitors * rand(2, 4), // Estimate page views
                    'bounceRate' => rand(25, 55) // Mock bounce rate for now
                ];
            });

        // Fill missing hours with zero data
        $todayData = [];
        for ($hour = 0; $hour < 24; $hour += 4) {
            $hourData = $todayVisitors->firstWhere('time', sprintf('%02d:00', $hour));
            $todayData[] = $hourData ?: [
                'time' => sprintf('%02d:00', $hour),
                'visitors' => 0,
                'pageViews' => 0,
                'bounceRate' => 0
            ];
        }

        // Get monthly data
        $monthlyVisitors = LogVisitor::whereMonth('timestamp', now()->month)
            ->selectRaw('DAY(timestamp) as day, COUNT(*) as visitors')
            ->groupBy('day')
            ->orderBy('day')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => now()->format('d M'),
                    'visitors' => $item->visitors,
                    'pageViews' => $item->visitors * rand(2, 4),
                    'bounceRate' => rand(25, 55)
                ];
            });

        // Get country and region statistics
        $countryStats = LogVisitor::selectRaw('country, COUNT(*) as visitors')
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderByDesc('visitors')
            ->limit(10)
            ->get();

        $regionStats = LogVisitor::selectRaw('region, COUNT(*) as visitors')
            ->whereNotNull('region')
            ->groupBy('region')
            ->orderByDesc('visitors')
            ->limit(10)
            ->get();

        $websiteTrafficData = [
            'today' => $todayData,
            'thisMonth' => $monthlyVisitors->toArray(),
            'last3Months' => [
                ['date' => 'Jan', 'visitors' => LogVisitor::whereMonth('timestamp', 1)->count(), 'pageViews' => 72000, 'bounceRate' => 38],
                ['date' => 'Feb', 'visitors' => LogVisitor::whereMonth('timestamp', 2)->count(), 'pageViews' => 85000, 'bounceRate' => 35],
                ['date' => 'Mar', 'visitors' => LogVisitor::whereMonth('timestamp', 3)->count(), 'pageViews' => 92000, 'bounceRate' => 32],
            ],
            'thisYear' => [
                ['date' => 'Jan', 'visitors' => LogVisitor::whereMonth('timestamp', 1)->count(), 'pageViews' => 92000, 'bounceRate' => 32],
                ['date' => 'Feb', 'visitors' => LogVisitor::whereMonth('timestamp', 2)->count(), 'pageViews' => 88000, 'bounceRate' => 34],
                ['date' => 'Mar', 'visitors' => LogVisitor::whereMonth('timestamp', 3)->count(), 'pageViews' => 98000, 'bounceRate' => 30],
            ],
        ];

        return Inertia::render('backpanel/dashboard', [
            'stats' => $stats,
            'topSearchedProducts' => $topSearchedProducts,
            'latestProducts' => $latestProducts,
            'recentOrders' => $recentOrders,
            'websiteTrafficData' => $websiteTrafficData,
            'countryStats' => $countryStats,
            'regionStats' => $regionStats,
        ]);
    }
}
