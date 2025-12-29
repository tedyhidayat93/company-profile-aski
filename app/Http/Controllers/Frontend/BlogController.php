<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = [
            [
                'id' => 1,
                'title' => 'Cara Membuat Website Profesional dengan Laravel dan React',
                'slug' => 'cara-membuat-website-profesional-dengan-laravel-dan-react',
                'excerpt' => 'Panduan lengkap untuk membangun website profesional menggunakan Laravel sebagai backend dan React sebagai frontend.',
                'content' => '<p>Dalam artikel ini, kita akan membahas langkah demi langkah cara membuat website profesional menggunakan Laravel dan React. Kita akan mulai dari persiapan lingkungan pengembangan hingga deployment.</p>',
                'featured_image' => '/images/placeholder-blog.jpg',
                'category' => [
                    'name' => 'Pengembangan Web',
                    'slug' => 'pengembangan-web'
                ],
                'author' => [
                    'name' => 'Admin',
                    'avatar' => null,
                    'bio' => 'Admin dari Blog Kami'
                ],
                'tags' => [
                    ['id' => 1, 'name' => 'Laravel', 'slug' => 'laravel'],
                    ['id' => 2, 'name' => 'React', 'slug' => 'react'],
                    ['id' => 3, 'name' => 'Web Development', 'slug' => 'web-development'],
                ],
                'published_at' => now()->subDays(2)->toDateTimeString(),
                'reading_time' => 5,
                'view_count' => 124,
            ],
            // Add more dummy posts as needed
        ];

        $categories = [
            ['id' => 1, 'name' => 'Pengembangan Web', 'slug' => 'pengembangan-web', 'posts_count' => 5],
            ['id' => 2, 'name' => 'Teknologi', 'slug' => 'teknologi', 'posts_count' => 3],
            ['id' => 3, 'name' => 'Bisnis', 'slug' => 'bisnis', 'posts_count' => 2],
            ['id' => 4, 'name' => 'Pemasaran', 'slug' => 'pemasaran', 'posts_count' => 4],
        ];

        return Inertia::render('frontend/blog/index', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $post = [
            'id' => 1,
            'title' => 'Cara Membuat Website Profesional dengan Laravel dan React',
            'slug' => 'cara-membuat-website-profesional-dengan-laravel-dan-react',
            'excerpt' => 'Panduan lengkap untuk membangun website profesional menggunakan Laravel sebagai backend dan React sebagai frontend.',
            'content' => '<p>Dalam artikel ini, kita akan membahas langkah demi langkah cara membuat website profesional menggunakan Laravel dan React. Kita akan mulai dari persiapan lingkungan pengembangan hingga deployment.</p>
                         <h2>Persiapan Lingkungan Pengembangan</h2>
                         <p>Sebelum memulai, pastikan Anda telah menginstal:</p>
                         <ul>
                             <li>PHP 8.0+</li>
                             <li>Composer</li>
                             <li>Node.js & NPM</li>
                             <li>MySQL/PostgreSQL</li>
                         </ul>
                         <h2>Membuat Project Laravel Baru</h2>
                         <p>Jalankan perintah berikut untuk membuat project Laravel baru:</p>
                         <pre><code>composer create-project laravel/laravel my-website</code></pre>',
            'featured_image' => '/images/placeholder-blog.jpg',
            'category' => [
                'id' => 1,
                'name' => 'Pengembangan Web',
                'slug' => 'pengembangan-web'
            ],
            'author' => [
                'name' => 'Admin',
                'avatar' => null,
                'bio' => 'Admin dari Blog Kami yang berpengalaman dalam pengembangan web selama lebih dari 5 tahun.'
            ],
            'tags' => [
                ['id' => 1, 'name' => 'Laravel', 'slug' => 'laravel'],
                ['id' => 2, 'name' => 'React', 'slug' => 'react'],
                ['id' => 3, 'name' => 'Web Development', 'slug' => 'web-development'],
            ],
            'published_at' => now()->subDays(2)->toDateTimeString(),
            'reading_time' => 5,
            'view_count' => 124,
            'related_posts' => [
                [
                    'id' => 2,
                    'title' => 'Tips Optimasi Performa Laravel',
                    'slug' => 'tips-optimasi-performa-laravel',
                    'featured_image' => '/images/placeholder-blog.jpg',
                    'published_at' => now()->subDays(5)->toDateTimeString(),
                    'reading_time' => 4,
                ],
                [
                    'id' => 3,
                    'title' => 'Mengenal Lebih Dalam Tentang React Hooks',
                    'slug' => 'mengenal-lebih-dalam-tentang-react-hooks',
                    'featured_image' => '/images/placeholder-blog.jpg',
                    'published_at' => now()->subWeek()->toDateTimeString(),
                    'reading_time' => 6,
                ],
            ],
            'comments' => [
                [
                    'id' => 1,
                    'content' => 'Artikel yang sangat bermanfaat! Saya berhasil mengikuti langkah-langkahnya dengan baik.',
                    'created_at' => now()->subDay()->toDateTimeString(),
                    'author' => [
                        'name' => 'Budi Santoso',
                        'avatar' => null,
                    ],
                    'replies' => [
                        [
                            'id' => 2,
                            'content' => 'Saya juga berhasil mengikutinya, terima kasih atas artikelnya!',
                            'created_at' => now()->subHours(12)->toDateTimeString(),
                            'author' => [
                                'name' => 'Admin',
                                'avatar' => null,
                            ],
                        ]
                    ]
                ]
            ]
        ];

        return Inertia::render('frontend/blog/detail', [
            'post' => $post,
        ]);
    }

    public function category($slug)
    {
        $category = [
            'id' => 1,
            'name' => 'Pengembangan Web',
            'slug' => 'pengembangan-web',
            'description' => 'Artikel-artikel seputar pengembangan web, framework, dan teknologi terbaru.'
        ];

        $posts = [
            // Similar structure as in index() but filtered by category
        ];

        return Inertia::render('frontend/blog/category', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }

    public function tag($slug)
    {
        $tag = [
            'id' => 1,
            'name' => 'Laravel',
            'slug' => 'laravel'
        ];

        $posts = [
            // Similar structure as in index() but filtered by tag
        ];

        return Inertia::render('frontend/blog/tag', [
            'tag' => $tag,
            'posts' => $posts,
        ]);
    }
}