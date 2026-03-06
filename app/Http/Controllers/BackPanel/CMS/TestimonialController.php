<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $testimonials = Testimonial::query()
            ->when($request->search, function ($query, $search) {
                return $query->where('nama', 'like', "%{$search}%")
                    ->orWhere('perusahaan', 'like', "%{$search}%")
                    ->orWhere('testimoni', 'like', "%{$search}%");
            })
            ->when($request->public !== null, function ($query, $public) {
                return $query->where('is_show_public', $public === 'true');
            })
            ->when($request->rating, function ($query, $rating) {
                return $query->where('rate_star', $rating);
            })
            ->orderBy('sequence', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('backpanel/testimonial/index', [
            'testimonials' => $testimonials,
            'filters' => $request->only(['search', 'public', 'rating'])
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/testimonial/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'keterangan' => 'nullable|string|max:255',
            'perusahaan' => 'nullable|string|max:255',
            'foto_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'rate_star' => 'required|integer|min:1|max:5',
            'testimoni' => 'required|string|max:1000',
            'is_show_public' => 'boolean',
        ]);

        if ($request->hasFile('foto_avatar')) {
            $image = $request->file('foto_avatar');
            $path = $image->store('testimonials', 'public');
            $validated['foto_avatar'] = $path;
        }

        $validated['sequence'] = Testimonial::max('sequence') + 1;
        $validated['is_show_public'] = $validated['is_show_public'] ?? true;

        Testimonial::create($validated);

        return redirect()->route('cms.testimonial.index')
            ->with('success', 'Testimonial berhasil ditambahkan');
    }

    public function show($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        return Inertia::render('backpanel/testimonial/show', [
            'testimonial' => $testimonial
        ]);
    }

    public function edit($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        return Inertia::render('backpanel/testimonial/edit', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'keterangan' => 'nullable|string|max:255',
            'perusahaan' => 'nullable|string|max:255',
            'foto_avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'rate_star' => 'required|integer|min:1|max:5',
            'testimoni' => 'required|string|max:1000',
            'is_show_public' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('foto_avatar')) {
            // Delete old image if exists
            if ($testimonial->foto_avatar) {
                Storage::disk('public')->delete($testimonial->foto_avatar);
            }
            $image = $request->file('foto_avatar');
            $path = $image->store('testimonials', 'public');
            $validated['foto_avatar'] = $path;
        }

        // Handle image removal
        if ($request->input('remove_foto_avatar') && $testimonial->foto_avatar) {
            Storage::disk('public')->delete($testimonial->foto_avatar);
            $validated['foto_avatar'] = null;
        }

        $validated['is_show_public'] = isset($validated['is_show_public']) 
            ? (bool) $validated['is_show_public'] 
            : $testimonial->is_show_public;

        $testimonial->update($validated);

        return redirect()->route('cms.testimonial.index')
            ->with('success', 'Testimonial berhasil diperbarui');
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        if ($testimonial->foto_avatar) {
            Storage::disk('public')->delete($testimonial->foto_avatar);
        }

        $testimonial->delete();

        return redirect()->route('cms.testimonial.index')
            ->with('success', 'Testimonial berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->is_show_public = !$testimonial->is_show_public;
        $testimonial->save();

        return redirect()->route('cms.testimonial.index')
            ->with('success', 'Status testimonial berhasil diperbarui');
    }
}