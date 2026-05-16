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
        $categorySlug = $request->get('category');
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
        if ($categorySlug) {
            $baseQuery->whereHas('category', function($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });
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


        // SEO
        $seoTitle = 'Blog & Artikel';

        $seoDescription =
            'Artikel terbaru seputar container, office container, reefer, logistik, modifikasi container, dan tips industri dari Alumoda Sinergi Kontainer Indonesia.';

        $seoKeywords =
            'blog container, artikel container, office container, reefer container, modifikasi container';

        if ($categorySlug) {

            $category = Category::where(
                'slug',
                $categorySlug
            )->first();

            if ($category) {

                $seoTitle =
                    $category->name .
                    ' | Artikel';

                $seoDescription =
                    'Artikel dan informasi terbaru tentang ' .
                    $category->name .
                    ' dari Alumoda Sinergi Kontainer Indonesia.';
            }
        }

        if ($search) {

            $seoTitle =
                'Pencarian "' .
                $search .
                '" | Artikel';

            $seoDescription =
                'Hasil pencarian artikel untuk "' .
                $search .
                '" di blog Alumoda Sinergi Kontainer Indonesia.';
        }

        if ($tag) {

            $seoTitle =
                'Tag "' .
                $tag .
                '" | Artikel';

            $seoDescription =
                'Artikel dengan tag "' .
                $tag .
                '" di blog Alumoda Sinergi Kontainer Indonesia.';
        }

        return Inertia::render('frontend/blog/index', [
            'headline_posts' => $headlinePosts,
            'most_read_posts' => $mostReadPosts,
            'recent_posts' => $recentPosts,
            'all_posts' => $allPosts,
            'categories' => $categories,
            'popular_tags' => $popularTags,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
                'tag' => $tag,
            ],
            'seo' => [
                'title' =>
                    $seoTitle,

                'description' =>
                    $seoDescription,

                'keywords' =>
                    $seoKeywords,

                'image' => asset(
                    'images/logo-main.png'
                ),

                'type' => 'website',
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
            ->get(['id', 'title', 'slug', 'featured_image', 'excerpt', 'published_at']);

        return Inertia::render('frontend/blog/detail', [
            'post' => $post,
            'related_posts' => $relatedPosts,
            'seo' => [
                'title' =>

                    $post->meta_title
                    ?:
                    $post->title,

                'description' =>

                    $post->meta_description
                    ?:
                    (
                        $post->excerpt
                        ?:
                        str($post->content)
                            ->stripTags()
                            ->limit(160)
                    ),

                'image' =>

                    $post->featured_image

                        ? asset(
                            'storage/' .
                            ltrim(
                                $post->featured_image,
                                '/'
                            )
                        )

                        : asset(
                            'images/placeholder.png'
                        ),

                'keywords' =>

                    $post->meta_keywords
                    ?:
                    (
                        is_array($post->tags)
                            ? implode(
                                ', ',
                                $post->tags
                            )
                            : ''
                    ),

                'type' => 'article',
            ],
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
