<?php

namespace App\Http\Controllers\BackPanel;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Article;
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
                'changeType' => 'increase'
            ],
            [
                'name' => 'Total Layanan',
                'value' => Service::count(),
                'icon' => 'FileText',
                'change' => '+5%',
                'changeType' => 'increase'
            ],
            [
                'name' => 'Total Pelanggan',
                'value' => Customer::count(),
                'icon' => 'Users',
                'change' => '+8.2%',
                'changeType' => 'increase'
            ],
            [
                'name' => 'Total Pesanan',
                'value' => Order::count(),
                'icon' => 'ShoppingCart',
                'change' => '-2.1%',
                'changeType' => 'decrease'
            ],
        ];

        // Get order statistics
        $orderStats = [
            [
                'name' => 'Pesanan Baru',
                'value' => Order::where('status', 'pending')->count(),
                'icon' => 'Clock',
                'color' => 'bg-yellow-100 text-yellow-800'
            ],
            [
                'name' => 'Dikonfirmasi',
                'value' => Order::where('status', 'confirmed')->count(),
                'icon' => 'CheckCircle',
                'color' => 'bg-purple-100 text-purple-800'
            ],
            [
                'name' => 'Diproses',
                'value' => Order::where('status', 'processing')->count(),
                'icon' => 'Clock',
                'color' => 'bg-blue-100 text-blue-800'
            ],
            [
                'name' => 'Dikirim',
                'value' => Order::where('status', 'shipped')->count(),
                'icon' => 'Package',
                'color' => 'bg-orange-100 text-orange-800'
            ],
            [
                'name' => 'Selesai',
                'value' => Order::where('status', 'completed')->count(),
                'icon' => 'CheckCircle',
                'color' => 'bg-green-100 text-green-800'
            ],
            [
                'name' => 'Dibatalkan',
                'value' => Order::where('status', 'cancelled')->count(),
                'icon' => 'XCircle',
                'color' => 'bg-red-100 text-red-800'
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

        // Get top searched products (for now, use most viewed or recent)
        $topSearchedProducts = Product::with('category')
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->take(5)
            ->get()
            ->map(function ($product, $index) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'searches' => rand(100, 1000), // Placeholder for actual search analytics
                    'change' => '+' . rand(1, 15) . '%' // Placeholder for actual analytics
                ];
            });

        // Generate mock traffic data (in real implementation, this would come from analytics)
        $websiteTrafficData = [
            'today' => [
                ['time' => '00:00', 'visitors' => 45, 'pageViews' => 120, 'bounceRate' => 45],
                ['time' => '04:00', 'visitors' => 23, 'pageViews' => 58, 'bounceRate' => 52],
                ['time' => '08:00', 'visitors' => 156, 'pageViews' => 420, 'bounceRate' => 38],
                ['time' => '12:00', 'visitors' => 234, 'pageViews' => 580, 'bounceRate' => 32],
                ['time' => '16:00', 'visitors' => 189, 'pageViews' => 490, 'bounceRate' => 35],
                ['time' => '20:00', 'visitors' => 98, 'pageViews' => 245, 'bounceRate' => 42],
            ],
            'thisMonth' => [
                ['date' => '1 Mar', 'visitors' => 1200, 'pageViews' => 3200, 'bounceRate' => 45],
                ['date' => '5 Mar', 'visitors' => 1450, 'pageViews' => 3800, 'bounceRate' => 42],
                ['date' => '10 Mar', 'visitors' => 1650, 'pageViews' => 4200, 'bounceRate' => 40],
                ['date' => '15 Mar', 'visitors' => 1890, 'pageViews' => 4800, 'bounceRate' => 38],
                ['date' => '20 Mar', 'visitors' => 2100, 'pageViews' => 5200, 'bounceRate' => 35],
                ['date' => '25 Mar', 'visitors' => 1950, 'pageViews' => 4900, 'bounceRate' => 37],
                ['date' => '30 Mar', 'visitors' => 2200, 'pageViews' => 5500, 'bounceRate' => 33],
            ],
            'last3Months' => [
                ['date' => 'Jan', 'visitors' => 28000, 'pageViews' => 72000, 'bounceRate' => 38],
                ['date' => 'Feb', 'visitors' => 32000, 'pageViews' => 85000, 'bounceRate' => 35],
                ['date' => 'Mar', 'visitors' => 35000, 'pageViews' => 92000, 'bounceRate' => 32],
            ],
            'thisYear' => [
                ['date' => 'Jan', 'visitors' => 35000, 'pageViews' => 92000, 'bounceRate' => 32],
                ['date' => 'Feb', 'visitors' => 33000, 'pageViews' => 88000, 'bounceRate' => 34],
                ['date' => 'Mar', 'visitors' => 38000, 'pageViews' => 98000, 'bounceRate' => 30],
            ],
        ];

        return Inertia::render('backpanel/dashboard', [
            'stats' => $stats,
            'orderStats' => $orderStats,
            'topSearchedProducts' => $topSearchedProducts,
            'latestProducts' => $latestProducts,
            'recentOrders' => $recentOrders,
            'websiteTrafficData' => $websiteTrafficData,
        ]);
    }
}
