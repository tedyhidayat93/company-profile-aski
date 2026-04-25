import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { getConfig } from '@/hooks/use-configuration';

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
            <Head title={`Artikel - ${getConfig('site_name', 'Your site name')}`}>
                <meta name="description" content={getConfig('meta_description', '-')} />
                <meta name="keywords" content={getConfig('meta_keywords', '-')} />
            </Head>

            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                {/* Header Portal */}
                <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {tag ? <span className="text-primary"># {tag}</span> : "Warta Terbaru"}
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Menyajikan informasi terpercaya dan mendalam setiap hari.
                        </p>
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Main Section (Left/Center) */}
                        <div className="lg:col-span-8">
                            {/* Featured Post - Hanya muncul jika tidak sedang filter tag */}
                            {!tag && posts.data.length > 0 && (
                                <div className="mb-12 group cursor-pointer">
                                    <Link href={`/blog/${posts.data[0].slug}`} className="block relative overflow-hidden rounded-2xl shadow-xl">
                                        <img 
                                            className="h-[400px] w-full object-cover transition duration-500 group-hover:scale-105" 
                                            src={posts.data[0].featured_image || '/images/placeholder.png'} 
                                            alt={posts.data[0].title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase">
                                                Headline
                                            </span>
                                            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                                {posts.data[0].title}
                                            </h2>
                                            <p className="text-gray-200 line-clamp-2 text-sm md:text-base">
                                                {posts.data[0].excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Grid Berita (Sisa konten setelah headline atau semua jika tag aktif) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {posts.data.slice(tag ? 0 : 1).map((post) => (
                                    <article key={post.id} className="flex flex-col group">
                                        <div className="relative overflow-hidden rounded-xl mb-4 shadow-md">
                                            <img 
                                                className="h-52 w-full object-cover transition duration-500 group-hover:scale-110" 
                                                src={post.featured_image || '/images/placeholder.png'} 
                                                alt={post.title}
                                            />
                                            <div className="absolute top-3 left-3 flex gap-1">
                                                {post.tags?.slice(0, 1).map((t, i) => (
                                                    <span key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <Link href={`/blog/${post.slug}`} className="block group">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            </Link>
                                            <div className="mt-4 flex items-center gap-4 text-[12px] font-medium text-gray-400 uppercase">
                                                <span className="flex items-center gap-1">
                                                    <User size={14} /> {post.author.name}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} /> {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-16 flex justify-center border-t pt-10 dark:border-gray-800">
                                {/* ... pagination code tetap sama ... */}
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <aside className="lg:col-span-4 space-y-10">
                            {/* Trending Section */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white text-gray-900 border-l-4 border-primary pl-3">
                                    Populer Minggu Ini
                                </h3>
                                <div className="space-y-6">
                                    {posts.data.slice(0, 4).map((post, index) => (
                                        <div key={post.id} className="flex gap-4 group cursor-pointer">
                                            <span className="text-3xl font-black text-gray-200 dark:text-gray-700 italic">0{index + 1}</span>
                                            <div>
                                                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-200 line-clamp-2 leading-tight">
                                                        {post.title}
                                                    </h4>
                                                </Link>
                                                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{post.views_count} Views</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter/CTA */}
                            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-2">Berlangganan Warta</h3>
                                <p className="text-sm text-white/80 mb-6">Dapatkan kurasi berita terbaik langsung di email Anda setiap pagi.</p>
                                <input 
                                    type="email" 
                                    placeholder="Email Anda..." 
                                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder:text-white/50 focus:outline-none focus:bg-white focus:text-gray-900 transition-all text-sm"
                                />
                                <button className="w-full mt-4 bg-white text-primary font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    Daftar Sekarang
                                </button>
                            </div>
                        </aside>

                    </div>
                </main>
            </div>
        </FrontendLayout>
    );
}