<?php

namespace App\Http\Controllers\BackPanel\CRM;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CustomerController extends Controller
{
    public function __construct()
    {
        // Apply permission middleware to all methods
        $this->middleware('permission:customer-list')->only(['index', 'show']);
        $this->middleware('permission:customer-create')->only(['create', 'store']);
        $this->middleware('permission:customer-edit')->only(['edit', 'update', 'toggleStatus']);
        $this->middleware('permission:customer-delete')->only(['destroy']);
    }
    public function index(Request $request)
    {
        Gate::authorize('customer-list');
        
        $customers = Customer::when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            })
            ->when($request->has('active'), function ($query) use ($request) {
                $isActive = $request->boolean('active');
                return $query->where('is_active', $isActive);
            })
            ->when($request->date_from, function ($query, $dateFrom) {
                return $query->whereDate('created_at', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($query, $dateTo) {
                return $query->whereDate('created_at', '<=', $dateTo);
            })
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('backpanel/crm/customer/index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'active', 'date_from', 'date_to'])
        ]);
    }

    public function create()
    {
        Gate::authorize('customer-create');
        
        return Inertia::render('backpanel/crm/customer/create');
    }

    public function store(Request $request)
    {
        Gate::authorize('customer-create');
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $customer = Customer::create($validated);

        return redirect()->route('crm.customers.index')
            ->with('success', 'Pelanggan berhasil dibuat');
    }

    public function show($id)
    {
        Gate::authorize('customer-list');
        
        $customer = Customer::findOrFail($id);

        return Inertia::render('backpanel/crm/customer/show', [
            'customer' => $customer
        ]);
    }

    public function edit($id)
    {
        Gate::authorize('customer-edit');
        
        $customer = Customer::findOrFail($id);

        return Inertia::render('backpanel/crm/customer/edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('customer-edit');
        
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('customers')->ignore($customer->id),
            ],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? $customer->is_active;

        $customer->update($validated);

        return redirect()->route('crm.customers.index')
            ->with('success', 'Pelanggan berhasil diperbarui');
    }

    public function destroy($id)
    {
        Gate::authorize('customer-delete');
        
        $customer = Customer::findOrFail($id);

        $customer->delete();

        return redirect()->route('crm.customers.index')
            ->with('success', 'Pelanggan berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        Gate::authorize('customer-edit');
        
        $customer = Customer::findOrFail($id);
        $customer->is_active = !$customer->is_active;
        $customer->save();

        return redirect()->route('crm.customers.index')
            ->with('success', 'Status pelanggan berhasil diperbarui');
    }
}