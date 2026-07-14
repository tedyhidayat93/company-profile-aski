import { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Calendar, Eye, Search, Filter, Tag, Flame, Newspaper, ChevronRight, BoxIcon } from 'lucide-react';
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
    footerServices: Array<{ id: number; name: string; slug: string; short_description: string; image?: string; }>;
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
    footerServices = [],
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

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || getConfig('services_meta_title', 'Produk Kami')}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />
    
            {/* 🌟 1. HERO HEADLINE UTAMA: NEO-BRUTALIST MAGAZINE COVER */}
            {!isLoading && headline_posts[0] && (
                <div className="w-full bg-black text-white border-b-4 border-black relative overflow-hidden font-sans select-none">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] lg:min-h-[650px]">
                        
                        {/* KOLOM KIRI: INFO & JUDUL RAKSASA */}
                        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b-4 lg:border-b-0 lg:border-r-4 border-black relative z-10 bg-black">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-6 w-full">
                                <div className="flex items-center gap-3">
                                    <span className="inline-block w-2.5 h-2.5 rounded-none bg-orange-500 animate-ping" />
                                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-orange-500">
                                        {getConfig('site_name')} / HEADLINE
                                    </span>
                                </div>
                                <span className="text-[11px] font-mono text-zinc-100 tracking-wider">
                                    [{formatDate(headline_posts[0].published_at)}]
                                </span>
                            </div>

                            <div className="my-10 lg:my-auto space-y-6">
                                <Link href={`/${headline_posts[0].slug}`} className="block group">
                                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] transition-colors duration-300 group-hover:text-orange-500 break-words">
                                        {headline_posts[0].title}
                                    </h1>
                                </Link>
                                <p className="text-zinc-400 text-sm md:text-base font-medium max-w-xl leading-relaxed border-l-4 border-orange-500 pl-4">
                                    {headline_posts[0].excerpt}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800 w-full text-xs font-bold text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500">OLEH:</span>
                                    <span className="text-white uppercase tracking-wider">{headline_posts[0].author?.name || 'EDITORIAL TEAM'}</span>
                                </div>
                                <Link 
                                    href={`/${headline_posts[0].slug}`} 
                                    className="inline-flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-none font-black uppercase text-xs tracking-wider border-2 border-black hover:bg-white transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none"
                                >
                                    BACA SELENGKAPNYA
                                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                                </Link>
                            </div>
                        </div>

                        {/* KOLOM KANAN: VISUAL POSTER DENGAN BLOK WARNA MONOKROM-ORANGE */}
                        <div className="lg:col-span-5 relative group min-h-[400px] lg:min-h-full flex flex-col justify-end bg-orange-500">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={`/storage/${headline_posts[0].featured_image}`}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply group-hover:scale-105 transition-all duration-700 ease-out"
                                    alt={headline_posts[0].title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 lg:hidden z-1" />
                            </div>
                            <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-none border-2 border-black flex items-center justify-center font-mono text-xs font-bold text-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                01/05
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* --- MASTER CONTAINER FOR GRID CONTENT --- */}
            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* ===================================================
                        KOLOM KIRI: MAIN STREAM CONTENT (lg:col-span-8)
                       =================================================== */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* SEKSI: MULTI-COLUMN SHADOW HIGHLIGHTS */}
                        {headline_posts.length > 1 && (
                            <section aria-labelledby="section-sorotan">
                                <h2 id="section-sorotan" className="text-xl font-black tracking-tighter uppercase text-black bg-orange-500 border-4 border-black px-4 py-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:text-black mb-8">
                                    INFORMASI PILIHAN 
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {headline_posts.slice(1, 4).map((post) => (
                                        <article key={post.id} className="group flex flex-col bg-white border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
                                            <Link href={`/${post.slug}`} className="aspect-[16/10] w-full overflow-hidden bg-black border-b-4 border-black relative">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 ease-out"
                                                    onError={handleImageError}
                                                    alt={post.title}
                                                />
                                            </Link>
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-black text-base uppercase tracking-tight text-black line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <div className="text-[11px] font-mono font-bold text-zinc-500 flex items-center justify-between border-t-2 border-black pt-3">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SEKSI: SPLIT BLOCK (POPULER VS TERBARU) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-4 border-black pt-12">
                            
                            {/* Paling Banyak Dibaca */}
                            <section aria-labelledby="section-trending">
                                <h2 id="section-trending" className="text-base font-black tracking-tight uppercase text-white bg-black px-3 py-1.5 inline-block mb-6">
                                    ARTIKEL TERPOPULER
                                </h2>
                                <div className="space-y-4 divide-y-2 divide-black">
                                    {most_read_posts.slice(0, 4).map((post) => (
                                        <article key={post.id} className="group flex gap-4 pt-4 first:pt-0 items-center">
                                            <Link href={`/${post.slug}`} className="w-20 h-20 shrink-0 rounded-none overflow-hidden bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-300" onError={handleImageError} alt={post.title} />
                                            </Link>
                                            <div className="space-y-1 min-w-0">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-black text-sm uppercase tracking-tight text-black dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-500">
                                                    [{formatDate(post.published_at)}]
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Rilisan Terbaru */}
                            <section aria-labelledby="section-terbaru">
                                <h2 id="section-terbaru" className="text-base font-black tracking-tight uppercase text-white bg-black px-3 py-1.5 inline-block mb-6">
                                    POSTINGAN TERBARU
                                </h2>
                                <div className="space-y-4 divide-y-2 divide-black">
                                    {recent_posts.slice(0, 4).map((post) => (
                                        <article key={post.id} className="group flex gap-4 pt-4 first:pt-0 items-center">
                                            <Link href={`/${post.slug}`} className="w-20 h-20 shrink-0 rounded-none overflow-hidden bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-300" onError={handleImageError} alt={post.title} />
                                            </Link>
                                            <div className="space-y-1 min-w-0">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-black text-sm uppercase tracking-tight text-black dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-500">
                                                    [{formatDate(post.published_at)}]
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* SEKSI UTAMA: DYNAMIC FEED ARSIP ARTIKEL */}
                        <section aria-labelledby="section-arsip" className="border-t-4 border-black pt-12">
                            <h2 id="section-arsip" className="text-xl font-black tracking-tighter uppercase text-black bg-orange-500 border-4 border-black px-4 py-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
                                ARTIKEl LAINNYA
                            </h2>
                            <div className="space-y-6">
                                {all_posts.data.length === 0 ? (
                                    <div className="text-center py-16 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                        <p className="text-sm font-black uppercase tracking-tight text-zinc-500">Tidak ada artikel yang cocok.</p>
                                    </div>
                                ) : (
                                    all_posts.data.map((post) => (
                                        <article key={post.id} className="group flex flex-col md:flex-row gap-6 p-6 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] items-start">
                                            <Link href={`/${post.slug}`} className="w-full md:w-56 aspect-[16/10] shrink-0 overflow-hidden bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" onError={handleImageError} alt={post.title} />
                                            </Link>
                                            <div className="flex-1 space-y-3 w-full">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    {post.category && (
                                                        <span className="text-[10px] font-black uppercase tracking-wider text-white bg-black border border-black px-2.5 py-1">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-[11px] font-mono font-bold text-zinc-500">
                                                        [{formatDate(post.published_at)}]
                                                    </span>
                                                </div>
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-black text-xl md:text-2xl uppercase tracking-tighter text-black leading-none group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-zinc-600 font-medium line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-100">
                                                    <span className="font-bold text-black flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count} VIEWS</span>
                                                    <span className="inline-flex items-center gap-0.5 font-black uppercase text-orange-600 group-hover:translate-x-1 transition-transform">
                                                        BACA SELENGKAPNYA ➔
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>

                            <div className="mt-12 border-t-4 border-black pt-8">
                                <Pagination links={all_posts.links} />
                            </div>
                        </section>

                    </div>

                    {/* ===================================================
                        KOLOM KANAN: UTILITY SIDEBAR (lg:col-span-4)
                       =================================================== */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8 w-full">
                        
                        {/* BOX PANEL: SEARCH & FILTER BRUTALIST */}
                        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6">
                            <div className="flex items-center justify-between border-b-4 border-black pb-4">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 stroke-[3]" />
                                    <h2 className="text-sm font-black uppercase tracking-tight text-black">
                                        PENCARIAN POSTINGAN
                                    </h2>
                                </div>
                                {(data.search || data.category || data.tag) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData({ search: '', category: '', tag: '' });
                                            router.get('/info', {}, { preserveState: true, preserveScroll: true });
                                        }}
                                        className="text-[10px] font-black uppercase bg-red-500 text-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        RESET
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-black block">KATA KUNCI</label>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="Masukkan kata kunci yang ingin dicari..."
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="h-11 text-xs rounded-none border-2 border-black font-black uppercase focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-orange-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-black block">KATEGORI</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="h-11 w-full rounded-none border-2 border-black bg-white px-3 text-xs font-black uppercase text-black focus:outline-none"
                                    >
                                        <option value="">ALL CATEGORIES</option>
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

                                <Button type="submit" disabled={isSearching} className="w-full h-11 rounded-none text-xs bg-black text-white hover:bg-orange-500 hover:text-black font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] transition-all">
                                    {isSearching ? 'SEARCHING...' : 'APPLY FILTERS'}
                                </Button>
                            </form>

                            {/* Tags Populer */}
                            {popular_tags.length > 0 && (
                                <div className="space-y-3.5 border-t-2 border-black pt-5">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-black">
                                        <Tag className="h-3.5 w-3.5 stroke-[3]" />
                                        <span>TOPIK PALING POPULER</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {popular_tags.map((tag, index) => {
                                            const isActive = data.tag === tag;
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleTagClick(tag)}
                                                    className={`rounded-none px-3 py-1.5 text-[10px] font-black uppercase border-2 border-black transition-all ${
                                                        isActive 
                                                            ? 'bg-orange-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                                                            : 'bg-white text-black hover:bg-black hover:text-white'
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

                        {/* BOX PANEL: DAFTAR LAYANAN BRUTALIST */}
                        {footerServices.length > 0 && (
                            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
                                <div className="flex items-center gap-2 border-b-4 border-black pb-4">
                                    <BoxIcon className="h-4 w-4 stroke-[3]" />
                                    <h2 className="text-sm font-black uppercase tracking-tight text-black">
                                        LAYANAN KAMI 
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {footerServices.map((item, key) => (
                                        <Link 
                                            key={key} 
                                            href={`/layanan/${item.slug}`} 
                                            className="group flex gap-3 p-3 rounded-none border-2 border-black bg-white hover:bg-orange-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all items-center"
                                        >
                                            <div className="w-12 h-12 shrink-0 rounded-none bg-black border-2 border-black flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        onError={handleImageError}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                                    />
                                                ) : (
                                                    <span className="font-black text-white text-[9px] uppercase">UNIT</span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <span className="block text-xs font-black uppercase tracking-tight text-black group-hover:text-orange-600 transition-colors truncate">
                                                    {item.name}
                                                </span>
                                                <span className="block text-[11px] text-zinc-500 mt-0.5 font-medium line-clamp-1">
                                                    {item.short_description}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-2 text-center">
                                    <Link href="/layanan" className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-tight text-black hover:text-orange-600">
                                        LIHAT SEMUA LAYANAN ➔
                                    </Link>
                                </div>
                            </div>
                        )}

                    </aside>
                </div>
            </main>
        </FrontendLayout>
    );
}