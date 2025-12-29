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

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Tag = {
    id: number;
    name: string;
    slug: string;
};

type Comment = {
    id: number;
    content: string;
    created_at: string;
    author: {
        name: string;
        avatar?: string;
    };
    replies?: Comment[];
};

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: Category;
    author: Author;
    tags: Tag[];
    published_at: string;
    reading_time: number;
    view_count: number;
    related_posts: Array<{
        id: number;
        title: string;
        slug: string;
        featured_image: string;
        published_at: string;
        reading_time: number;
    }>;
    comments: Comment[];
};

type BlogDetailProps = {
    post: BlogPost;
};

export default function BlogDetail({ post }: BlogDetailProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const shareOnSocialMedia = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title);
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <FrontendLayout>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.featured_image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Article Header */}
            <div className="bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Blog
                    </Link>
                    
                    <div className="mb-6">
                        <Link 
                            href={`/blog/category/${post.category.slug}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                        >
                            {post.category.name}
                        </Link>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">{post.title}</h1>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-6 mb-8">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{post.reading_time} menit baca</span>
                        </div>
                        <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span>{post.comments.length} Komentar</span>
                        </div>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden mb-8">
                        <img 
                            src={post.featured_image || '/images/placeholder-blog.jpg'} 
                            alt={post.title} 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Bagikan:</span>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500 hover:text-blue-600"
                                onClick={() => shareOnSocialMedia('facebook')}
                            >
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500 hover:text-blue-400"
                                onClick={() => shareOnSocialMedia('twitter')}
                            >
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500 hover:text-blue-700"
                                onClick={() => shareOnSocialMedia('linkedin')}
                            >
                                <Linkedin className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="text-sm text-gray-500">
                            {post.view_count} Dilihat
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div 
                    className="prose prose-lg prose-primary max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Tag:</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/blog/tag/${tag.slug}`}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Author Bio */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="flex items-center">
                        {post.author.avatar ? (
                            <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="h-16 w-16 rounded-full"
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <User className="h-8 w-8" />
                            </div>
                        )}
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{post.author.name}</h3>
                            {post.author.bio && (
                                <p className="mt-1 text-gray-600">{post.author.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Comments Section */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Komentar ({post.comments.length})</h2>
                    
                    {/* Comment Form */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Tinggalkan Komentar</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                                <textarea
                                    id="comment"
                                    rows={4}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="Tulis komentar Anda di sini..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Kirim Komentar</Button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-8">
                        {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-4">
                                    <div className="shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-5 w-5 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-gray-600">{comment.content}</p>
                                            <button 
                                                type="button" 
                                                className="mt-2 text-sm text-primary hover:text-primary/80"
                                            >
                                                Balas
                                            </button>
                                        </div>
                                        
                                        {/* Replies */}
                                        {comment.replies && comment.replies.length > 0 && (
                                            <div className="ml-8 mt-4 space-y-4">
                                                {comment.replies.map((reply) => (
                                                    <div key={reply.id} className="flex space-x-4">
                                                        <div className="shrink-0">
                                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                                <User className="h-4 w-4 text-gray-500" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-sm font-medium text-gray-900">{reply.author.name}</h4>
                                                                    <span className="text-xs text-gray-500">
                                                                        {new Date(reply.created_at).toLocaleDateString('id-ID', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                        })}
                                                                    </span>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-600">{reply.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {post.related_posts.length > 0 && (
                <div className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {post.related_posts.map((relatedPost) => (
                                <article key={relatedPost.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
                                    <div className="shrink-0">
                                        <img 
                                            className="h-48 w-full object-cover" 
                                            src={relatedPost.featured_image || '/images/placeholder-blog.jpg'} 
                                            alt={relatedPost.title} 
                                        />
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                        </div>
                                        <div className="mt-6 flex items-center text-sm text-gray-500">
                                            <time dateTime={relatedPost.published_at}>
                                                {new Date(relatedPost.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                            <span className="mx-1">•</span>
                                            <span>{relatedPost.reading_time} min read</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </FrontendLayout>
    );
}