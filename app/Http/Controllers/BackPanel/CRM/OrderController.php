<?php

namespace App\Http\Controllers\BackPanel\CRM;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('customer')
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
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('backpanel/orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to'])
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/orders/create');
    }

    public function store(Request $request)
    {
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
        $order = Order::with(['product.coverImage'])->find($id);
        return Inertia::render('backpanel/orders/show', [
            'order' => $order
        ]);
    }

    public function edit($id)
    {
        $order = Order::find($id);
        return Inertia::render('backpanel/orders/edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, $id)
    {
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
        $order = Order::find($id);
        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Pesanan berhasil dihapus.');
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::find($id);
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,completed,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->back()
            ->with('success', 'Status pesanan berhasil diperbarui.');
    }
}