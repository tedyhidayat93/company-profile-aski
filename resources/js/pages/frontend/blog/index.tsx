import { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Calendar, Eye, Search, Filter, Tag, TagIcon, Folder, Hash, ArrowRight, Flame, Newspaper } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { Pagination } from '@/components/ui/pagination';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    author: { name: string; };
    published_at: string;
    views_count: number;
    category?: { id: number; name: string; slug: string; };
};

type Props = {
    headline_posts: BlogPost[];
    most_read_posts: BlogPost[];
    recent_posts: BlogPost[];
    all_posts: { data: BlogPost[]; links: any; };
    categories: Array<{ id: number; name: string; slug: string; type: string; }>;
    popular_tags: string[];
    filters?: { search?: string; category?: string; tag?: string; };
    seo: SeoHeadProps;
};

export default function BlogIndex({ 
    headline_posts = [], 
    most_read_posts = [], 
    recent_posts = [], 
    all_posts = { data: [], links: [] }, 
    categories = [], 
    popular_tags = [],
    filters = {},
    seo
}: Props) {
    const { getConfig } = useConfig();
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        tag: filters.tag || '',
    });

    const [isSearching, setIsSearching] = useState(false);
    const isLoading = !headline_posts || !most_read_posts || !recent_posts;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        get('/info', {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsSearching(false)
        });
    };

    const handleCategoryChange = (slug: string) => {
        setData(slice => {
            const updated = { ...slice, category: slug, tag: '' };
            router.get('/info', updated, { preserveState: true, preserveScroll: true });
            return updated;
        });
    };

    const handleTagClick = (tag: string) => {
        setData(slice => {
            const updated = { ...slice, tag: tag, category: '' };
            router.get('/info', updated, { preserveState: true, preserveScroll: true });
            return updated;
        });
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const SkeletonItem = () => (
        <div className="flex gap-4 py-3 animate-pulse border-b border-slate-100 dark:border-slate-800">
            <div className="w-24 h-24 sm:w-32 sm:h-24 bg-slate-200 dark:bg-slate-700 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
        </div>
    );

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || getConfig('services_meta_title', 'Produk Kami')}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />
    
            {/* --- MASTER CONTAINER --- */}
            <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12">
                
                {/* 🔥 1. HEADLINE UTAMA (Mencakup Lebar Penuh Atas) */}
                {!isLoading && headline_posts[0] && (
                    <div className="mb-10 group relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-md dark:border-slate-800">
                        <Link href={`/${headline_posts[0].slug}`} className="block relative overflow-hidden aspect-[3/3] md:aspect-[16/9] md:h-[520px] w-full">
                            <img
                                src={`/storage/${headline_posts[0].featured_image}`}
                                onError={handleImageError}
                                className="w-full h-full object-cover group-hover:scale-102 transition duration-700 ease-out"
                                alt={headline_posts[0].title}
                            />
                            {/* Gradient Overlay Lebih Lembut & Gelap di Bawah */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-5 md:p-10" />
                            
                            <div className="absolute bottom-0 inset-x-0 p-5 md:p-10 z-10 space-y-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold tracking-widest text-white bg-orange-600 rounded-full uppercase">
                                    <Flame className="w-3 h-3 fill-white" /> Headline Utama
                                </span>
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight max-w-4xl group-hover:text-orange-400 transition-colors">
                                    {headline_posts[0].title}
                                </h1>
                                <p className="text-xs md:text-sm text-slate-300 line-clamp-2 max-w-2xl font-medium">
                                    {headline_posts[0].excerpt}
                                </p>
                                <div className="pt-1 flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
                                    <span>By {headline_posts[0].author?.name || 'Admin'}</span>
                                    <span>•</span>
                                    <span>{formatDate(headline_posts[0].published_at)}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* --- 2. ASYMMETRIC 2-COLUMN GRID SYSTEM --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ===================================================
                        KOLOM KIRI: STREAM BERITA UTAMA (lg:col-span-8)
                       =================================================== */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* SEKSI: HEADLINE LAINNYA */}
                        {headline_posts.length > 1 && (
                            <div>
                                <h2 className="text-base font-black tracking-wide uppercase text-slate-900 border-l-4 border-orange-500 pl-3 mb-5 dark:text-white flex items-center gap-2">
                                    <Newspaper className="w-4 h-4 text-orange-500" /> Sorotan
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {headline_posts.slice(1, 4).map((post) => (
                                        <div key={post.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-sm">
                                            <Link href={`/${post.slug}`} className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                    onError={handleImageError}
                                                    alt={post.title}
                                                />
                                            </Link>
                                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views_count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEKSI: BERITA POPULER & TERBARU (SIDE-BY-SIDE GRID) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Sub-Seksi: Terpopuler */}
                            <div>
                                <h2 className="text-base font-black tracking-wide uppercase text-slate-900 border-l-4 border-orange-500 pl-3 mb-4 dark:text-white">
                                    Trending / Populer
                                </h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {most_read_posts.slice(0, 4).map((post) => (
                                        <div key={post.id} className="group flex gap-4 py-3.5 items-start">
                                            <Link href={`/${post.slug}`} className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" onError={handleImageError} />
                                            </Link>
                                            <div className="space-y-1">
                                                <Link href={`/${post.slug}`}>
                                                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-orange-500">
                                                        {post.title}
                                                    </h4>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                                    <Calendar className="w-3 h-3" /> {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sub-Seksi: Terbaru */}
                            <div>
                                <h2 className="text-base font-black tracking-wide uppercase text-slate-900 border-l-4 border-orange-500 pl-3 mb-4 dark:text-white">
                                    Rilisan Terbaru
                                </h2>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {recent_posts.slice(0, 4).map((post) => (
                                        <div key={post.id} className="group flex gap-4 py-3.5 items-start">
                                            <Link href={`/${post.slug}`} className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" onError={handleImageError} />
                                            </Link>
                                            <div className="space-y-1">
                                                <Link href={`/${post.slug}`}>
                                                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-orange-500">
                                                        {post.title}
                                                    </h4>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                                    <Calendar className="w-3 h-3" /> {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SEKSI CORE LIST: ALL POSTS FEED */}
                        <div className="pt-4">
                            <h2 className="text-base font-black tracking-wide uppercase text-slate-900 border-l-4 border-orange-500 pl-3 mb-5 dark:text-white下">
                                Arsip Berita & Informasi
                            </h2>
                            <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-800/80">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
                                ) : all_posts.data.length === 0 ? (
                                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                        <p className="text-sm text-slate-500">Tidak ada artikel ditemukan yang sesuai kriteria.</p>
                                    </div>
                                ) : (
                                    all_posts.data.map((post) => (
                                        <div key={post.id} className="group flex flex-col sm:flex-row gap-5 py-5 items-start">
                                            <Link href={`/${post.slug}`} className="w-full sm:w-44 aspect-[4/3] sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 dark:border-slate-800 dark:bg-slate-900">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                                    onError={handleImageError} 
                                                    alt={post.title}
                                                />
                                            </Link>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {post.category && (
                                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded dark:bg-orange-500/10 dark:text-orange-400">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] font-medium text-slate-400">{formatDate(post.published_at)}</span>
                                                </div>
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight leading-snug group-hover:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count} views</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Paginasi Data */}
                            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                                <Pagination links={all_posts.links} />
                            </div>
                        </div>

                    </div>

                    {/* ===================================================
                        KOLOM KANAN: STICKY UTILITY SIDEBAR (lg:col-span-4)
                       =================================================== */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 hidden md:block">
                        
                        {/* BOX PANEL: FILTER & SEARCH */}
                        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5 space-y-5 dark:bg-slate-900 dark:border-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-3 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                                        <Filter className="h-3.5 w-3.5" />
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                        Pencarian Berita
                                    </h3>
                                </div>
                                
                                {/* Trigger Reset */}
                                {(data.search || data.category || data.tag) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData({ search: '', category: '', tag: '' });
                                            router.get('/info', {}, { preserveState: true, preserveScroll: true });
                                        }}
                                        className="text-[11px] font-bold text-red-500 hover:underline"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* Form Input Pencarian */}
                            <form onSubmit={handleSearch} className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Ketik kata kunci kata..."
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="pl-9 h-10 text-xs rounded-xl"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pl-1">Pilih Kategori</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="h-10 w-full rounded-xl border border-input bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories
                                            .filter(cat => cat.type === 'blog')
                                            .map((category) => (
                                                <option key={category.id} value={category.slug}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <Button type="submit" disabled={isSearching} className="w-full h-10 rounded-xl text-xs bg-slate-900 hover:bg-orange-600 font-bold text-white transition-colors">
                                    {isSearching ? 'Mencari...' : 'Terapkan Filter'}
                                </Button>
                            </form>

                            {/* Tags Populer di Dalam Sidebar */}
                            {popular_tags.length > 0 && (
                                <div className="space-y-3 border-t border-slate-50 pt-4 dark:border-slate-800">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <Tag className="h-3.5 w-3.5" />
                                        <span>Tags Terkait</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {popular_tags.map((tag, index) => {
                                            const isActive = data.tag === tag;
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleTagClick(tag)}
                                                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                                                        isActive
                                                            ? 'bg-orange-500 text-white shadow-sm'
                                                            : 'border border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400'
                                                    }`}
                                                >
                                                    #{tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                    </aside>

                </div>

            </div>
        </FrontendLayout>
    );
}