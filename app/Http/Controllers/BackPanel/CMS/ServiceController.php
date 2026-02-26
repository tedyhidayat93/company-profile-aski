<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = Service::with('category')
            ->when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            })
            ->when($request->active, function ($query, $active) {
                return $query->where('is_active', $active === 'true');
            })
            ->when($request->featured, function ($query, $featured) {
                return $query->where('is_featured', $featured === 'true');
            })
            ->when($request->category, function ($query, $category) {
                return $query->where('category_id', $category);
            })
            ->orderBy('name')
            ->paginate(10);

        $categories = Category::where('type', 'service')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('backpanel/service/index', [
            'services' => $services,
            'categories' => $categories,
            'filters' => $request->only(['search', 'active', 'featured', 'category'])
        ]);
    }

    public function create()
    {
        $categories = Category::where('type', 'service')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('backpanel/service/create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => 'nullable|string|max:100|unique:services,sku',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['is_active'] = $validated['is_active'] ?? true;

        $service = Service::create($validated);

        return redirect()->route('cms.services.index')
            ->with('success', 'Layanan berhasil dibuat');
    }

    public function show($id)
    {
        $service = Service::with('category')->findOrFail($id);

        return Inertia::render('backpanel/service/show', [
            'service' => $service
        ]);
    }

    public function edit($id)
    {
        $service = Service::with('category')->findOrFail($id);
        
        $categories = Category::where('type', 'service')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('backpanel/service/edit', [
            'service' => $service,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('services')->ignore($service->id),
            ],
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('services')->ignore($service->id),
            ],
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $validated['is_featured'] = $validated['is_featured'] ?? $service->is_featured;
        $validated['is_active'] = $validated['is_active'] ?? $service->is_active;

        $service->update($validated);

        return redirect()->route('cms.services.index')
            ->with('success', 'Layanan berhasil diperbarui');
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        $service->delete();

        return redirect()->route('cms.services.index')
            ->with('success', 'Layanan berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $service = Service::findOrFail($id);
        $service->is_active = !$service->is_active;
        $service->save();

        return redirect()->route('cms.services.index')
            ->with('success', 'Status layanan berhasil diperbarui');
    }

    public function toggleFeatured($id)
    {
        $service = Service::findOrFail($id);
        $service->is_featured = !$service->is_featured;
        $service->save();

        return redirect()->route('cms.services.index')
            ->with('success', 'Status unggulan layanan berhasil diperbarui');
    }
}