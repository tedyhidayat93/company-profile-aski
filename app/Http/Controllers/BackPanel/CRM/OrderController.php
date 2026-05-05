<?php

namespace App\Http\Controllers\BackPanel\CRM;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function __construct()
    {
        // Apply permission middleware to all methods
        $this->middleware('permission:order-list')->only(['index', 'show']);
        $this->middleware('permission:order-create')->only(['create', 'store']);
        $this->middleware('permission:order-edit')->only(['edit', 'update', 'updateStatus']);
        $this->middleware('permission:order-delete')->only(['destroy']);
    }
    public function index(Request $request)
    {
        Gate::authorize('order-list');
        
        // Build base query with filters for both pagination and statistics
        $baseQuery = Order::with(['customer'])
            ->when($request->search, function ($query, $search) {
                return $query->where('order_number', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%")
                    ->orWhere('pic_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });
            })
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->date_from, function ($query, $dateFrom) {
                return $query->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($query, $dateTo) {
                return $query->whereDate('created_at', '<=', $dateTo);
            });

        // Get order statistics with same filters
        $orderStatistics = $this->getOrderStatistics($baseQuery);

        // Get paginated orders
        $perPage = $request->get('per_page', 5);
        $orders = $baseQuery->orderBy('created_at', 'desc')->paginate($perPage);

        return Inertia::render('backpanel/orders/index', [
            'orders' => $orders,
            'orderStatistics' => $orderStatistics,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to', 'per_page'])
        ]);
    }

    /**
     * Calculate order statistics based on filtered query
     *
     * @param \Illuminate\Database\Eloquent\Builder $baseQuery
     * @return array
     */
    private function getOrderStatistics($baseQuery): array
    {
        // Clone the base query to avoid affecting pagination
        $statsQuery = clone $baseQuery;

        // Get total count with filters applied
        $totalOrders = $statsQuery->count();

        // Get counts by status with same filters
        $statusCounts = (clone $statsQuery)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Define all possible statuses with their labels
        $statusLabels = [
            'pending' => 'Pesanan Baru',
            'confirmed' => 'Dikonfirmasi',
            'processing' => 'Diproses',
            'shipped' => 'Dikirim',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan'
        ];

        // Build statistics array
        $statistics = [
            [
                'name' => 'Total Semua Pesanan',
                'value' => $totalOrders,
                'icon' => 'shopping-cart',
                'color' => 'bg-blue-100 text-blue-800'
            ]
        ];

        // Add status-specific statistics
        foreach ($statusLabels as $status => $label) {
            $statistics[] = [
                'name' => $label,
                'value' => $statusCounts[$status] ?? 0,
                'icon' => $this->getStatusIcon($status),
                'color' => $this->getStatusColor($status)
            ];
        }

        return $statistics;
    }

    /**
     * Get icon for order status
     *
     * @param string $status
     * @return string
     */
    private function getStatusIcon(string $status): string
    {
        $icons = [
            'pending' => 'clock',
            'confirmed' => 'check-circle',
            'processing' => 'clock',
            'shipped' => 'package',
            'completed' => 'check-circle',
            'cancelled' => 'x-circle'
        ];

        return $icons[$status] ?? 'file-text';
    }

    /**
     * Get color for order status
     *
     * @param string $status
     * @return string
     */
    private function getStatusColor(string $status): string
    {
        $colors = [
            'pending' => 'bg-yellow-100 text-yellow-800',
            'confirmed' => 'bg-blue-100 text-blue-800',
            'processing' => 'bg-purple-100 text-purple-800',
            'shipped' => 'bg-indigo-100 text-indigo-800',
            'completed' => 'bg-green-100 text-green-800',
            'cancelled' => 'bg-red-100 text-red-800'
        ];

        return $colors[$status] ?? 'bg-gray-100 text-gray-800';
    }

    public function create()
    {
        Gate::authorize('order-create');
        
        return Inertia::render('backpanel/orders/create');
    }

    public function store(Request $request)
    {
        Gate::authorize('order-create');
        
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'pic_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string',
            'province' => 'required|string|max:255',
            'regency' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'notes' => 'nullable|string',
            'product_id' => 'required|integer',
            'product_name' => 'required|string|max:255',
            'product_category' => 'required|string|max:255',
            'product_image' => 'required|string|max:255',
            'product_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'status' => 'nullable|in:pending,confirmed,processing,shipped,completed,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $validated['order_number'] = Order::generateOrderNumber();
        $validated['status'] = $validated['status'] ?? 'pending';

        Order::create($validated);

        return redirect()->route('orders.index')
            ->with('success', 'Pesanan berhasil dibuat.');
    }

    public function show($id)
    {
        Gate::authorize('order-list');
        
        $order = Order::with(['product.coverImage'])->find($id);
        
        if ($order) {
            $order->status_history = $order->getFormattedStatusHistory();
        }
        
        return Inertia::render('backpanel/orders/show', [
            'order' => $order
        ]);
    }

    public function edit($id)
    {
        Gate::authorize('order-edit');
        
        $order = Order::find($id);
        return Inertia::render('backpanel/orders/edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('order-edit');
        
        $order = Order::find($id);
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'pic_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string',
            'province' => 'required|string|max:255',
            'regency' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'notes' => 'nullable|string',
            'product_id' => 'required|integer',
            'product_name' => 'required|string|max:255',
            'product_category' => 'required|string|max:255',
            'product_image' => 'required|string|max:255',
            'product_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,confirmed,processing,shipped,completed,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->route('orders.index')
            ->with('success', 'Pesanan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Gate::authorize('order-delete');
        
        $order = Order::find($id);
        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Pesanan berhasil dihapus.');
    }

    public function updateStatus(Request $request, $id)
    {
        Gate::authorize('order-edit');
        
        $order = Order::find($id);
        
        if (!$order) {
            return redirect()->back()
                ->with('error', 'Pesanan tidak ditemukan.');
        }
        
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,completed,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $oldStatus = $order->status;
        $newStatus = $validated['status'];
        $adminNotes = $validated['admin_notes'] ?? '';

        // Update the order
        $order->update($validated);

        // Log status change if status actually changed
        if ($oldStatus !== $newStatus) {
            $user = auth()->user();
            $order->logStatusChange(
                $newStatus,
                $adminNotes,
                $user?->id,
                $user?->name
            );
        }

        return redirect()->back()
            ->with('success', 'Status pesanan berhasil diperbarui.');
    }
}