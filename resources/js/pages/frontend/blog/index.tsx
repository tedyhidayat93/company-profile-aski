import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    author: {
        id: number;
        name: string;
    };
    tags: string[];
    published_at: string;
    reading_time?: number;
    views_count: number;
};

type BlogIndexProps = {
    posts: {
        data: BlogPost[];
        links: any;
        meta: any;
    };
    tag?: string;
};

export default function BlogIndex({ posts, tag }: BlogIndexProps) {
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

    return (
        <FrontendLayout>
            <Head title={tag ? `Tag: ${tag}` : "Blog"} />
            
            {/* Hero Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            {tag ? `Tag: ${tag}` : "Blog & Artikel"}
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            {tag 
                                ? `Temukan artikel dengan tag "${tag}"`
                                : "Temukan artikel terbaru seputar industri, tips, dan informasi terbaru dari kami."
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Blog Posts */}
                    <div className="lg:w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post) => (
                                <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                    <div className="flex-shrink-0">
                                        <img 
                                            className="h-48 w-full object-cover" 
                                            src={post.featured_image || '/images/placeholder-blog.jpg'} 
                                            alt={post.title} 
                                        />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <Link href={`/blog/${post.slug}`} className="block">
                                                <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <User className="h-4 w-4 mr-2" />
                                                <span>{post.author.name}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <time dateTime={post.published_at}>
                                                    {formatDate(post.published_at)}
                                                </time>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>{post.reading_time || calculateReadingTime(post.content)} menit baca</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span>{post.views_count} dilihat</span>
                                            </div>
                                        </div>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {post.tags.slice(0, 3).map((tag, index) => (
                                                    <span 
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {posts.links?.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                                            link.active
                                                ? 'bg-primary text-white'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}