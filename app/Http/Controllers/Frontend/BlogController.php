<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = Article::published()
            ->with(['author'])
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('frontend/blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = Article::where('slug', $slug)
            ->with(['author'])
            ->firstOrFail();

        // Increment view count
        $post->increment('views_count');

        // Get related posts (same category or similar tags)
        $relatedPosts = Article::published()
            ->where('id', '!=', $post->id)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get(['id', 'title', 'slug', 'featured_image', 'published_at']);

        return Inertia::render('frontend/blog/detail', [
            'post' => $post,
            'related_posts' => $relatedPosts,
        ]);
    }

    public function category($slug)
    {
        // For now, redirect to blog index since we don't have category model
        return redirect()->route('blog.index');
    }

    public function tag($slug)
    {
        // Get articles with this tag
        $posts = Article::published()
            ->whereJsonContains('tags', $slug)
            ->with(['author'])
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('frontend/blog/index', [
            'posts' => $posts,
            'tag' => $slug,
        ]);
    }
}
