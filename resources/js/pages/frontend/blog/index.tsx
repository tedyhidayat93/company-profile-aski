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
    category: {
        name: string;
        slug: string;
    };
    author: {
        name: string;
    };
    published_at: string;
    reading_time: number;
};

type BlogIndexProps = {
    posts: BlogPost[];
    categories: Array<{
        id: number;
        name: string;
        slug: string;
        posts_count: number;
    }>;
};

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
    return (
        <FrontendLayout>
            <Head title="Blog" />
            
            {/* Hero Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Blog & Artikel</h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Temukan artikel terbaru seputar industri, tips, dan informasi terbaru dari kami.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Blog Posts */}
                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.map((post) => (
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
                                            <p className="text-sm font-medium text-primary">
                                                <Link href={`/blog/category/${post.category.slug}`} className="hover:underline">
                                                    {post.category.name}
                                                </Link>
                                            </p>
                                            <Link href={`/blog/${post.slug}`} className="block mt-2">
                                                <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime={post.published_at}>
                                                    {new Date(post.published_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                                <span aria-hidden="true">
                                                    &middot;
                                                </span>
                                                <span>{post.reading_time} min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <nav className="mt-12 flex items-center justify-between px-4 sm:px-0">
                            <div className="-mt-px flex w-0 flex-1">
                                <Button variant="ghost" className="inline-flex items-center border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <ArrowLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Previous
                                </Button>
                            </div>
                            <div className="hidden md:-mt-px md:flex">
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === 1 ? 'default' : 'ghost'}
                                        className="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <div className="-mt-px flex w-0 flex-1 justify-end">
                                <Button variant="ghost" className="inline-flex items-center border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    Next
                                    <ArrowLeft className="ml-3 h-5 w-5 -rotate-180 text-gray-400" aria-hidden="true" />
                                </Button>
                            </div>
                        </nav>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Kategori</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/blog/category/${category.slug}`}
                                        className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-50 group"
                                    >
                                        <span className="text-gray-600 group-hover:text-primary">{category.name}</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {category.posts_count}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Popular Posts */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Artikel Populer</h3>
                            <div className="space-y-4">
                                {posts.slice(0, 3).map((post) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <img 
                                                className="h-16 w-16 rounded object-cover" 
                                                src={post.featured_image || '/images/placeholder-blog.jpg'} 
                                                alt={post.title} 
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                                {new Date(post.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Tag Populer</h3>
                            <div className="flex flex-wrap gap-2">
                                {['teknologi', 'bisnis', 'pemasaran', 'desain', 'pengembangan', 'tips'].map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog/tag/${tag}`}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}