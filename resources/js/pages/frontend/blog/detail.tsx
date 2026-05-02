import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { getConfig } from '@/hooks/use-configuration';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Link2, Eye, MessageCircle, Instagram, Music, Copy } from 'lucide-react';
import { useConfig } from '@/utils/config';
import { generateBlogUrl } from '@/utils/app';
import { handleImageError } from '@/utils/image';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image?: string;
    published_at: string;
    author: {
        name: string;
    };
    views_count: number;
    reading_time?: number;
    tags?: string[];
    is_headline?: boolean;
}

interface BlogDetailProps {
    post: Article;
    related_posts?: Article[];
}

export default function BlogDetail({ post, related_posts = [] }: BlogDetailProps) {

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const readingTime = post.reading_time || Math.ceil(post.content.split(' ').length / 200);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <FrontendLayout>
            <Head title={`${post.title} - ${getConfig('site_name', 'Alumoda Sinergi Kontainer')}`}>
                {/* 1. Meta Tag Dasar */}
                <meta name="description" content={post.excerpt || getConfig('meta_description', 'Jual & Sewa Kontainer kualitas terbaik di PT. Alumoda Sinergi Kontainer Indonesia.')} />
                <meta name="keywords" content={`${post.title}, berita kontainer, artikel kontainer, ${getConfig('meta_keywords')}`} />
                <meta name="author" content={getConfig('site_name', 'Alumoda Sinergi Kontainer')} />
                
                {/* 2. Canonical (Sangat Penting agar tidak dianggap konten duplikat) */}
                <link rel="canonical" href={generateBlogUrl(post.slug)} />

                {/* 3. Open Graph / Facebook (Agar tampil bagus saat di-share di WA/FB) */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} - Alumoda Sinergi Kontainer`} />
                <meta property="og:description" content={post.excerpt || "Baca artikel terbaru tentang kontainer di Alumoda Sinergi Kontainer."} />
                <meta property="og:image" content={post.featured_image || '/default-share-image.jpg'} />
                <meta property="og:url" content={generateBlogUrl(post.slug)} />

                {/* 4. Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:image" content={post.featured_image} />

                {/* 5. Robots Tag */}
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="max-w-4xl mx-auto px-4 py-10">

                {/* 🔹 BACK */}
                <Link href="/blog" className="text-sm text-gray-500 flex items-center mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Berita
                </Link>

                {/* 🔥 HEADER */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                        {post.title}
                    </h1>

                    {/* META */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                            Disusun Oleh <strong>{post.author.name}</strong>
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(post.published_at)}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {readingTime} menit baca
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {post.views_count} Dilihat
                        </span>

                        {/* HEADLINE BADGE */}
                        {post.is_headline && (
                            <>
                                <span>•</span>
                                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                                    HEADLINE
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* 🔥 FEATURED IMAGE */}
                {post.featured_image && (
                    <div className="mb-6">
                        <img
                            src={`/storage/${post.featured_image}`}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => handleImageError(e, '/images/placeholder.png', post.title)}
                            alt={post.title}
                        />
                    </div>
                )}

                {/* 🔥 CONTENT */}
                <div className="prose prose-lg max-w-none leading-relaxed prose-headings:text-black prose-p:text-black text-gray-800 dark:text-gray-100 prose-strong:text-black prose-li:text-black">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* 🔥 TAGS */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-10 pt-6 border-t">
                        <h3 className="font-semibold mb-3 text-lg">Kata Kunci</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 🔥 SHARE */}
                <div className="mt-10 pt-6 border-t">
                    <h3 className="font-semibold mb-3 text-lg">Bagikan</h3>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() =>
                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)
                            }
                        >
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                        </Button>

                        <Button
                            size="sm"
                            className="bg-sky-500 text-white hover:bg-sky-600"
                            onClick={() =>
                                window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`)
                            }
                        >
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                        </Button>

                        <Button
                            size="sm"
                            className="bg-blue-700 text-white hover:bg-blue-800"
                            onClick={() =>
                                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)
                            }
                        >
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                        </Button>

                        <Button
                            size="sm"
                            className="bg-green-500 text-white hover:bg-green-600"
                            onClick={() =>
                                window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this article: ${post.title} - ${shareUrl}`)}`)
                            }
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                        </Button>

                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                            onClick={() =>
                                window.open(`https://www.instagram.com/`)
                            }
                        >
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                        </Button>

                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800"
                            onClick={() =>
                                window.open(`https://www.tiktok.com/`)
                            }
                        >
                            <Music className="w-4 h-4 mr-2" />
                            TikTok
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(shareUrl);
                                alert('Link berhasil disalin!');
                            }}
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Salin Link
                        </Button>
                    </div>
                </div>

                {/* 🔥 RELATED */}
                {related_posts.length > 0 && (
                    <div className="mt-12 pt-8 border-t">
                        <h3 className="text-xl font-bold mb-6">
                            Artikel Terkait
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            {related_posts.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/blog/${item.slug}`}
                                    className="group"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={`/storage/${item.featured_image}`}
                                            className="w-28 h-24 object-cover rounded"
                                            onError={(e) => handleImageError(e, '/images/placeholder.png', item.title)}
                                            alt={item.title}
                                        />

                                        <div>
                                            <h4 className="font-semibold group-hover:text-blue-600 line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </FrontendLayout>
    );
}