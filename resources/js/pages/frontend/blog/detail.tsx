import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, MessageSquare, Facebook, Twitter, Linkedin } from 'lucide-react';

type Author = {
    id: number;
    name: string;
    avatar?: string;
    bio?: string;
};

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    author: Author;
    tags: string[];
    published_at: string;
    reading_time?: number;
    views_count: number;
    related_posts?: Array<{
        id: number;
        title: string;
        slug: string;
        featured_image: string;
        published_at: string;
    }>;
};

type BlogDetailProps = {
    post: BlogPost;
    related_posts?: Array<{
        id: number;
        title: string;
        slug: string;
        featured_image: string;
        published_at: string;
    }>;
};

export default function BlogDetail({ post, related_posts = [] }: BlogDetailProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = post.title;

    return (
        <FrontendLayout>
            <Head title={post.title} />
            
            {/* Hero Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Blog
                    </Link>
                    
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        {post.title}
                    </h1>
                    
                    <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <time dateTime={post.published_at}>
                                {formatDate(post.published_at)}
                            </time>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{post.reading_time || calculateReadingTime(post.content)} menit baca</span>
                        </div>
                        <div className="flex items-center">
                            <span>{post.views_count} dilihat</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Article Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="mb-8">
                                <img 
                                    src={post.featured_image} 
                                    alt={post.title}
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Tag</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Buttons */}
                        <div className="mt-8 pt-8 border-t">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Bagikan Artikel</h3>
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                                >
                                    <Facebook className="h-4 w-4 mr-2" />
                                    Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')}
                                >
                                    <Twitter className="h-4 w-4 mr-2" />
                                    Twitter
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                                >
                                    <Linkedin className="h-4 w-4 mr-2" />
                                    LinkedIn
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Author Info */}
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Tentang Penulis</h3>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-gray-600" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-sm font-medium text-gray-900">{post.author.name}</h4>
                                    {post.author.bio && (
                                        <p className="text-sm text-gray-500">{post.author.bio}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        {related_posts && related_posts.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Artikel Terkait</h3>
                                <div className="space-y-4">
                                    {related_posts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="block group"
                                        >
                                            <div className="flex space-x-3">
                                                <img 
                                                    src={relatedPost.featured_image || '/images/placeholder-blog.jpg'} 
                                                    alt={relatedPost.title}
                                                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatDate(relatedPost.published_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
