<?php

namespace App\Http\Controllers\BackPanel\CRM;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            })
            ->when($request->active !== null, function ($query, $active) {
                return $query->where('is_active', $active === 'true');
            })
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('backpanel/crm/customer/index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'active'])
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/crm/customer/create');
    }

    public function store(Request $request)
    {
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
        $customer = Customer::findOrFail($id);

        return Inertia::render('backpanel/crm/customer/show', [
            'customer' => $customer
        ]);
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('backpanel/crm/customer/edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
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
        $customer = Customer::findOrFail($id);

        $customer->delete();

        return redirect()->route('crm.customers.index')
            ->with('success', 'Pelanggan berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->is_active = !$customer->is_active;
        $customer->save();

        return redirect()->route('crm.customers.index')
            ->with('success', 'Status pelanggan berhasil diperbarui');
    }
}