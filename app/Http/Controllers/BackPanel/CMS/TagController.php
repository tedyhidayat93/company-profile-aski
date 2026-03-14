<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $tags = Tag::when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                return $query->where('type', $type);
            })
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('backpanel/tag/index', [
            'tags' => $tags,
            'filters' => $request->only(['search', 'type'])
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/tag/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:tags,slug',
            'type' => 'required|string|in:product,article,common',
            'description' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $tag = Tag::create($validated);

        return redirect()->route('cms.tag.index')
            ->with('success', 'Tag berhasil dibuat');
    }
    
    public function show($id)
    {
        $tag = Tag::findOrFail($id);

        return Inertia::render('backpanel/tag/show', [
            'tag' => $tag
        ]);
    }

    public function edit($id)
    {
        $tag = Tag::findOrFail($id);

        return Inertia::render('backpanel/tag/edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('tags')->ignore($tag->id),
            ],
            'type' => 'required|string|in:product,article,common',
            'description' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $tag->update($validated);

        return redirect()->route('cms.tag.index')
            ->with('success', 'Tag berhasil diperbarui');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);

        $tag->delete();

        return redirect()->route('cms.tag.index')
            ->with('success', 'Tag berhasil dihapus');
    }
}