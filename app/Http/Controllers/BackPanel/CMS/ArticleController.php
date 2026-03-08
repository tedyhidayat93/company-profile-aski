<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::when($request->search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'published') {
                    return $query->where('status', 'published');
                } elseif ($status === 'draft') {
                    return $query->where('status', 'draft');
                } elseif ($status === 'archived') {
                    return $query->where('status', 'archived');
                }
            })
            ->when($request->author, function ($query, $author) {
                return $query->where('author_id', $author);
            })
            ->when($request->tag, function ($query, $tag) {
                return $query->withTag($tag);
            })
            ->with(['author'])
            ->orderBy('published_at', 'desc')
            ->paginate(15);

        $authors = User::orderBy('name')->get();

        return Inertia::render('backpanel/article/index', [
            'articles' => $articles,
            'authors' => $authors,
            'filters' => $request->only(['search', 'status', 'author', 'tag'])
        ]);
    }

    public function create()
    {
        $authors = User::orderBy('name')->get();

        return Inertia::render('backpanel/article/create', [
            'authors' => $authors,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'author_id' => 'required|integer|exists:users,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'position' => 'nullable|integer|min:0',
            'is_headline' => 'nullable|boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if (isset($validated['tags'])) {
            // If tags come as JSON string from frontend, decode it first
            if (is_string($validated['tags'])) {
                $decodedTags = json_decode($validated['tags'], true);
                $validated['tags'] = is_array($decodedTags) ? array_filter($decodedTags) : [];
            } else {
                // If tags come as array, filter empty values
                $validated['tags'] = array_filter($validated['tags']);
            }
        }

        // Set default values
        $validated['position'] = $validated['position'] ?? 0;
        $validated['is_headline'] = $validated['is_headline'] ?? false;

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/articles'), $imageName);
            $validated['featured_image'] = 'uploads/articles/' . $imageName;
        }

        $article = Article::create($validated);

        return redirect()->route('cms.article.index')
            ->with('success', 'Artikel berhasil dibuat');
    }

    public function show($id)
    {
        $article = Article::with(['author'])->findOrFail($id);

        return Inertia::render('backpanel/article/show', [
            'article' => $article
        ]);
    }

    public function edit($id)
    {
        $article = Article::findOrFail($id);
        $authors = User::orderBy('name')->get();

        return Inertia::render('backpanel/article/edit', [
            'article' => $article,
            'authors' => $authors,
        ]);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('articles')->ignore($article->id),
            ],
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'author_id' => 'required|integer|exists:users,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'position' => 'nullable|integer|min:0',
            'is_headline' => 'nullable|boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if (isset($validated['tags'])) {
            // If tags come as JSON string from frontend, decode it first
            if (is_string($validated['tags'])) {
                $decodedTags = json_decode($validated['tags'], true);
                $validated['tags'] = is_array($decodedTags) ? array_filter($decodedTags) : [];
            } else {
                // If tags come as array, filter empty values
                $validated['tags'] = array_filter($validated['tags']);
            }
        }

        // Set default values
        $validated['position'] = $validated['position'] ?? 0;
        $validated['is_headline'] = $validated['is_headline'] ?? false;

        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($article->featured_image && file_exists(public_path($article->featured_image))) {
                unlink(public_path($article->featured_image));
            }

            $image = $request->file('featured_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/articles'), $imageName);
            $validated['featured_image'] = 'uploads/articles/' . $imageName;
        }

        $article->update($validated);

        return redirect()->route('cms.article.index')
            ->with('success', 'Artikel berhasil diperbarui');
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);

        // Delete featured image if exists
        if ($article->featured_image && file_exists(public_path($article->featured_image))) {
            unlink(public_path($article->featured_image));
        }

        $article->delete();

        return redirect()->route('cms.article.index')
            ->with('success', 'Artikel berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $article = Article::findOrFail($id);
        
        if ($article->status === 'published') {
            $article->status = 'draft';
        } elseif ($article->status === 'draft') {
            $article->status = 'published';
            if (!$article->published_at) {
                $article->published_at = now();
            }
        } elseif ($article->status === 'archived') {
            $article->status = 'draft';
        }
        
        $article->save();

        return redirect()->route('cms.article.index')
            ->with('success', 'Status artikel berhasil diperbarui');
    }

    public function updatePosition(Request $request)
    {
        $validated = $request->validate([
            'articles' => 'required|array',
            'articles.*.id' => 'required|integer|exists:articles,id',
            'articles.*.position' => 'required|integer|min:0',
        ]);

        foreach ($validated['articles'] as $articleData) {
            Article::where('id', $articleData['id'])
                ->update(['position' => $articleData['position']]);
        }

        return redirect()->route('cms.article.index')
            ->with('success', 'Posisi artikel berhasil diperbarui');
    }
}