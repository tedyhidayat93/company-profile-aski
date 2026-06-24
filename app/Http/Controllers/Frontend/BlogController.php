<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\TracksVisitors;

class BlogController extends Controller
{
    use TracksVisitors;

    public function index(Request $request)
    {
        $this->trackPageVisit($request, 'Blog Index');

        $filters = [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'tag' => $request->string('tag')->toString(),
        ];

        /*
        |--------------------------------------------------------------------------
        | Categories
        |--------------------------------------------------------------------------
        */
        $categories = Category::query()
            ->where('type', 'blog')
            ->where('is_active', true)
            ->with('children')
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Popular Tags
        |--------------------------------------------------------------------------
        */
        $popularTags = Article::published()
            ->whereNotNull('tags')
            ->pluck('tags')
            ->flatMap(function ($tags) {
                if (is_array($tags)) {
                    return $tags;
                }

                if (is_string($tags)) {
                    return json_decode($tags, true) ?? [];
                }

                return [];
            })
            ->filter()
            ->countBy()
            ->sortDesc()
            ->take(10)
            ->keys()
            ->values();

        /*
        |--------------------------------------------------------------------------
        | Base Query
        |--------------------------------------------------------------------------
        */
        $baseQuery = Article::query()
            ->published()
            ->with([
                'author:id,name',
                'category:id,name,slug',
            ])
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($filters['category'], function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($filters['tag'], function ($query, $tag) {
                $query->where('tags', 'like', "%{$tag}%");
            });

        /*
        |--------------------------------------------------------------------------
        | Homepage Sections
        |--------------------------------------------------------------------------
        */
        $headlinePosts = (clone $baseQuery)
            ->headline()
            ->latest('published_at')
            ->limit(5)
            ->get();

        $mostReadPosts = (clone $baseQuery)
            ->orderByDesc('views_count')
            ->limit(5)
            ->get();

        $recentPosts = (clone $baseQuery)
            ->latest('published_at')
            ->limit(5)
            ->get();

        $allPosts = (clone $baseQuery)
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

       /*
        |--------------------------------------------------------------------------
        | SEO Config
        |--------------------------------------------------------------------------
        |*/
        $seoConfigs = Configuration::query()
            ->whereIn('key', [
                'article_meta_image',
                'article_meta_title',
                'article_meta_description',
                'meta_keywords',
            ])
            ->pluck('value', 'key');

        $seo = [
            'title' => !empty($seoConfigs['article_meta_title']) 
                ? strip_tags($seoConfigs['article_meta_title']) 
                : 'Blog & Artikel',

            'description' => !empty($seoConfigs['article_meta_description']) 
                ? strip_tags($seoConfigs['article_meta_description']) 
                : 'Artikel terbaru seputar container, office container, reefer, logistik, modifikasi container, dan tips industri dari Alumoda Sinergi Kontainer Indonesia.',

            'keywords' => !empty($seoConfigs['meta_keywords']) 
                ? strip_tags($seoConfigs['meta_keywords']) 
                : 'blog container, artikel container, office container, reefer container, modifikasi container',

            'image' => !empty($seoConfigs['article_meta_image'])
                ? asset('storage/' . $seoConfigs['article_meta_image'])
                : asset('images/placeholder.png'),

            'type' => 'website',
        ];

        /*
        |--------------------------------------------------------------------------
        | Dynamic SEO
        |--------------------------------------------------------------------------
        |*/
        if (!empty($filters['category'])) {
            $category = $categories->firstWhere(
                'slug',
                $filters['category']
            );

            if ($category) {
                $categoryName = strip_tags($category->name);
                $seo['title'] = "{$categoryName} | Artikel";
                $seo['description'] = "Artikel dan informasi terbaru tentang {$categoryName} dari Alumoda Sinergi Kontainer Indonesia.";
            }
        }

        if (!empty($filters['search'])) {
            // Sanitize input search untuk mencegah XSS di Meta Tag
            $cleanSearch = strip_tags($filters['search']);
            
            $seo['title'] = 'Pencarian "' . $cleanSearch . '" | Artikel';
            $seo['description'] = 'Hasil pencarian artikel untuk "' . $cleanSearch . '" di blog Alumoda Sinergi Kontainer Indonesia.';
        }

        if (!empty($filters['tag'])) {
            // Sanitize input tag untuk mencegah XSS di Meta Tag
            $cleanTag = strip_tags($filters['tag']);
            
            $seo['title'] = 'Tag "' . $cleanTag . '" | Artikel';
            $seo['description'] = 'Artikel dengan tag "' . $cleanTag . '" di blog Alumoda Sinergi Kontainer Indonesia.';
        }

        return Inertia::render('frontend/blog/index', [
            'headline_posts' => $headlinePosts,
            'most_read_posts' => $mostReadPosts,
            'recent_posts' => $recentPosts,
            'all_posts' => $allPosts,
            'categories' => $categories,
            'popular_tags' => $popularTags,
            'filters' => $filters,
            'seo' => $seo,
        ]);
    }

    public function show(Request $request, string $slug)
    {
        $this->trackPageVisit($request, 'Blog Article - ' . $slug);

        $post = Article::query()
            ->published()
            ->with([
                'author:id,name',
                'category:id,name,slug',
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        $post->increment('views_count');
        
        // Manipulate featured image
        $post->featured_image = $this->resolveImagePath($post->featured_image);

        /*
        |--------------------------------------------------------------------------
        | Related Posts
        |--------------------------------------------------------------------------
        */
        $relatedPosts = Article::query()
            ->published()
            ->where('id', '!=', $post->id)
            ->when($post->category_id, function ($query) use ($post) {
                $query->where('category_id', $post->category_id);
            })
            ->latest('published_at')
            ->limit(3)
            ->get([
                'id',
                'title',
                'slug',
                'featured_image',
                'excerpt',
                'published_at',
            ])
            ->map(function ($item) {
                $item->featured_image = $this->resolveImagePath($item->featured_image);

                return $item;
            });

        return Inertia::render('frontend/blog/detail', [
            'post' => $post,
            'related_posts' => $relatedPosts,
            'seo' => [
                'title' => $post->meta_title ? strip_tags($post->meta_title) : $post->title,

                'description' => ($post->meta_description ? strip_tags($post->meta_description) : null)
                    ?: (($post->excerpt ? strip_tags($post->excerpt) : null)
                        ?: str($post->content)
                            ->stripTags()
                            ->limit(160)
                            ->trim()
                            ->toString()
                    ),

                'image' => $post->featured_image,

                'keywords' => $post->meta_keywords 
                    ? strip_tags($post->meta_keywords) 
                    : (is_array($post->tags)
                        ? implode(', ', array_map('strip_tags', $post->tags))
                        : ''
                    ),

                'type' => 'article',
            ],
        ]);
    }

    public function category(string $slug)
    {
        return redirect()->route('blog.index', [
            'category' => $slug,
        ]);
    }

    public function tag(string $slug)
    {
        return redirect()->route('blog.index', [
            'tag' => $slug,
        ]);
    }

    private function resolveImagePath(?string $path): string
    {
        $baseUrl = rtrim(config('app.url'), '/');
        
        if (empty($path)) {
            return $baseUrl . '/images/placeholder.png';
        }

        // Jika sudah full URL
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return $baseUrl . '/storage/' . ltrim($path, '/');
    }
}