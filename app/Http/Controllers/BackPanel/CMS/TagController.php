<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class TagController extends Controller
{
    public function __construct()
    {
        // Apply permission middleware to all methods
        $this->middleware('permission:tag-list')->only(['index', 'show']);
        $this->middleware('permission:tag-create')->only(['create', 'store']);
        $this->middleware('permission:tag-edit')->only(['edit', 'update']);
        $this->middleware('permission:tag-delete')->only(['destroy']);
    }
    public function index(Request $request)
    {
        Gate::authorize('tag-list');
        
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
        Gate::authorize('tag-create');
        
        return Inertia::render('backpanel/tag/create');
    }

    public function store(Request $request)
    {
        Gate::authorize('tag-create');
        
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
        Gate::authorize('tag-list');
        
        $tag = Tag::findOrFail($id);

        return Inertia::render('backpanel/tag/show', [
            'tag' => $tag
        ]);
    }

    public function edit($id)
    {
        Gate::authorize('tag-edit');
        
        $tag = Tag::findOrFail($id);

        return Inertia::render('backpanel/tag/edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('tag-edit');
        
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
        Gate::authorize('tag-delete');
        
        $tag = Tag::findOrFail($id);

        $tag->delete();

        return redirect()->route('cms.tag.index')
            ->with('success', 'Tag berhasil dihapus');
    }
}