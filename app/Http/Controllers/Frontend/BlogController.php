<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\TracksVisitors;

class BlogController extends Controller
{
    use TracksVisitors;
    public function index(Request $request)
    {
        // Track visitor
        $this->trackPageVisit($request, 'Blog Index');
        
        // Get filters
        $search = $request->get('search');
        $categoryId = $request->get('category');
        $tag = $request->get('tag');
        
        // Get blog categories
        $categories = Category::where('type', 'blog')
            ->where('is_active', true)
            ->with('children')
            ->get();
        
        // Get popular tags
        $popularTags = Article::published()
            ->whereNotNull('tags')
            ->where('tags', '!=', '')
            ->pluck('tags')
            ->flatMap(function($tags) {
                // Handle both string (JSON) and array formats
                if (is_string($tags)) {
                    return json_decode($tags, true) ?: [];
                } elseif (is_array($tags)) {
                    return $tags;
                }
                return [];
            })
            ->filter(function($tag) {
                return !empty($tag) && is_string($tag);
            })
            ->countBy()
            ->sortDesc()
            ->take(10)
            ->keys()
            ->toArray();    
        
        // Base query for articles
        $baseQuery = Article::published()
            ->with(['author', 'category']);
        
        // Apply search filter
        if ($search) {
            $baseQuery->where(function($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('excerpt', 'LIKE', "%{$search}%")
                      ->orWhere('content', 'LIKE', "%{$search}%");
            });
        }
        
        // Apply category filter
        if ($categoryId) {
            $baseQuery->where('category_id', $categoryId);
        }
        
        // Apply tag filter
        if ($tag) {
            $baseQuery->where(function($query) use ($tag) {
                $query->where('tags', 'LIKE', "%\"{$tag}\"%")
                      ->orWhere('tags', 'LIKE', "%{$tag}%");
            });
        }
        
        // 1. Headline articles (is_headline = true) - 5 articles
        $headlinePosts = (clone $baseQuery)
            ->headline()
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        // 2. Most read articles (views_count) - 5 articles
        $mostReadPosts = (clone $baseQuery)
            ->orderBy('views_count', 'desc')
            ->limit(5)
            ->get();

        // 3. Recently published articles - 5 articles
        $recentPosts = (clone $baseQuery)
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        // 4. All other articles with pagination
        $allPosts = $baseQuery
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('frontend/blog/index', [
            'headline_posts' => $headlinePosts,
            'most_read_posts' => $mostReadPosts,
            'recent_posts' => $recentPosts,
            'all_posts' => $allPosts,
            'categories' => $categories,
            'popular_tags' => $popularTags,
            'filters' => [
                'search' => $search,
                'category' => $categoryId,
                'tag' => $tag,
            ],
        ]);
    }

    public function show(Request $request, $slug)
    {
        // Track visitor
        $this->trackPageVisit($request, 'Blog Article - ' . $slug);
        
        $post = Article::where('slug', $slug)
            ->with(['author', 'category'])
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
