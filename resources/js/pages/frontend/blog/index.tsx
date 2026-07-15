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
import { FeaturedProductsBanner } from '../catalog';

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
    random_products: any[];
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
    random_products = [], 
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
            month: 'long',
            year: 'numeric',
        });

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || getConfig('services_meta_title', 'Berita & Informasi')}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />
    
            {/* 🌟 1. BERITA UTAMA / HEADLINE */}
            {/* OPTIMASI: Menghapus select-none raksasa yang membebani scroll engine browser */}
            {!isLoading && headline_posts[0] && (
                <div className="w-full bg-zinc-950 text-white relative overflow-hidden font-sans border-b border-zinc-800">
                    <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] lg:min-h-[500px]">
                        
                        {/* KOLOM KIRI: TEKS JUDUL */}
                        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative z-10 bg-zinc-950">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 w-full">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500" />
                                    <span className="text-xs font-bold tracking-wider uppercase text-orange-400">
                                        {getConfig('site_name', 'Alumoda')} / Berita Utama
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-zinc-400">
                                    {formatDate(headline_posts[0].published_at)}
                                </span>
                            </div>

                            <div className="my-8 lg:my-auto space-y-4">
                                <Link href={`/${headline_posts[0].slug}`} className="block group">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight transition-colors duration-305 group-hover:text-orange-400 break-words">
                                        {headline_posts[0].title}
                                    </h1>
                                </Link>
                                <p className="text-zinc-300 text-base md:text-lg leading-relaxed border-l-4 border-orange-500 pl-4 font-normal">
                                    {headline_posts[0].excerpt}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800 w-full text-sm font-semibold text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <span>Penulis:</span>
                                    <span className="text-zinc-100 font-bold">{headline_posts[0].author?.name || 'Tim Redaksi'}</span>
                                </div>
                                <Link 
                                    href={`/${headline_posts[0].slug}`} 
                                    className="inline-flex h-12 items-center gap-2 bg-orange-500 text-white px-6 rounded-xl font-bold uppercase text-sm hover:bg-orange-650 transition-colors duration-300 shadow-sm"
                                >
                                    Baca Selengkapnya
                                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                                </Link>
                            </div>
                        </div>

                        {/* KOLOM KANAN: GAMBAR */}
                        {/* OPTIMASI: Menambahkan 'will-change-transform' & 'translate-z-0' untuk memaksa akselerasi GPU pada animasi scale gambar */}
                        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-zinc-900 group overflow-hidden">
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={`/storage/${headline_posts[0].featured_image}`}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover opacity-95 transition-transform duration-500 will-change-transform [transform:translateZ(0)] group-hover:scale-105"
                                    alt={headline_posts[0].title}
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 lg:hidden" />
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* --- KONTEN CONTAINER UTAMA --- */}
            <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-zinc-50 dark:bg-zinc-950">
                
                {/* OPTIMASI: Mengunci rasio aspek container agar layout tidak melompat ketika banner produk ter-render */}
                <div className="shadow rounded-xl mb-8 border overflow-hidden min-h-[120px]">
                    <FeaturedProductsBanner products={random_products}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ===================================================
                        KOLOM KIRI: UTAMA
                       =================================================== */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* SEKSI: INFORMASI PILIHAN */}
                        {headline_posts.length > 1 && (
                            <section aria-labelledby="section-sorotan">
                                <div className="border-b border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                                    <h2 id="section-sorotan" className="text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white flex items-center gap-2">
                                        <span className="w-1.5 h-5 bg-orange-500 inline-block rounded-full"></span>
                                        Informasi Pilihan Pembaca
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {headline_posts.slice(1, 4).map((post) => (
                                        <article key={post.id} className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                                            {/* OPTIMASI: Menggunakan 'aspect-video' solid agar tinggi card stabil sejak awal */}
                                            <Link href={`/${post.slug}`} className="aspect-video w-full overflow-hidden bg-zinc-150 dark:bg-zinc-800 relative block">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                                                    onError={handleImageError}
                                                    alt={post.title}
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-bold text-base text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SEKSI: POPULER & TERBARU */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-300 dark:border-zinc-800 pt-8">
                            
                            {/* Paling Banyak Dibaca */}
                            <section aria-labelledby="section-trending">
                                <h2 id="section-trending" className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b-2 border-orange-500 pb-2 mb-4 inline-block">
                                    Artikel Terpopuler
                                </h2>
                                <div className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                                    {most_read_posts.slice(0, 4).map((post, i) => (
                                        <article key={post.id} className="group flex gap-4 pt-4 first:pt-0 items-center">
                                            <Link href={`/${post.slug}`} className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 block relative">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover" onError={handleImageError} alt={post.title} loading="lazy" />
                                            </Link>
                                            <div className="space-y-1 min-w-0">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* Rilisan Terbaru */}
                            <section aria-labelledby="section-terbaru">
                                <h2 id="section-terbaru" className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b-2 border-orange-500 pb-2 mb-4 inline-block">
                                    Artikel Terbaru
                                </h2>
                                <div className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                                    {recent_posts.slice(0, 4).map((post) => (
                                        <article key={post.id} className="group flex gap-4 pt-4 first:pt-0 items-center">
                                            <Link href={`/${post.slug}`} className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 block relative">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover" onError={handleImageError} alt={post.title} loading="lazy" />
                                            </Link>
                                            <div className="space-y-1 min-w-0">
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* SEKSI UTAMA: DAFTAR SEMUA ARSIP ARTIKEL */}
                        <section aria-labelledby="section-arsip" className="border-t border-zinc-300 dark:border-zinc-800 pt-8">
                            <div className="border-b border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                                <h2 id="section-arsip" className="text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-orange-500 inline-block rounded-full"></span>
                                    Baca Artikel Lainnya
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                {all_posts.data.length === 0 ? (
                                    <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs">
                                        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                                    </div>
                                ) : (
                                    all_posts.data.map((post) => (
                                        <article key={post.id} className="group flex flex-col md:flex-row gap-6 p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm items-center">
                                            <Link href={`/${post.slug}`} className="w-full md:w-56 aspect-[16/10] shrink-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 block relative">
                                                <img src={`/storage/${post.featured_image}`} className="w-full h-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-103" onError={handleImageError} alt={post.title} loading="lazy" />
                                            </Link>
                                            <div className="flex-1 space-y-3 w-full">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    {post.category && (
                                                        <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-950 px-2.5 py-1 rounded-md">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                                        {formatDate(post.published_at)}
                                                    </span>
                                                </div>
                                                <Link href={`/${post.slug}`}>
                                                    <h3 className="font-extrabold text-xl md:text-2xl text-zinc-950 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-base text-zinc-700 dark:text-zinc-300 font-normal line-clamp-2 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count} Kunjungan</span>
                                                    <span className="inline-flex items-center gap-0.5 font-bold text-orange-600 group-hover:text-orange-700">
                                                        Baca Selengkapnya ➔
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <Pagination links={all_posts.links} />
                            </div>
                        </section>

                    </div>

                    {/* ===================================================
                        KOLOM KANAN: SIDEBAR PENCARIAN & LAYANAN
                       =================================================== */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 w-full">
                        
                        {/* BOX PANEL: FORM PENCARIAN */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 space-y-5">
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                        Pencarian Artikel
                                    </h2>
                                </div>
                                {(data.search || data.category || data.tag) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData({ search: '', category: '', tag: '' });
                                            router.get('/info', {}, { preserveState: true, preserveScroll: true });
                                        }}
                                        className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-md hover:bg-red-200 transition-colors"
                                    >
                                        Atur Ulang
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">KATA KUNCI</label>
                                    <Input
                                        type="text"
                                        placeholder="Cari judul atau topik artikel..."
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="h-11 text-sm rounded-lg border border-zinc-300 font-medium focus-visible:ring-1 focus-visible:ring-orange-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">PILIH KATEGORI</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="h-11 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-orange-500"
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

                                <Button type="submit" disabled={isSearching} className="w-full h-12 rounded-xl text-sm bg-zinc-950 hover:bg-orange-500 text-white font-bold transition-all shadow-sm">
                                    {isSearching ? 'Mencari...' : 'Terapkan Pencarian'}
                                </Button>
                            </form>

                            {/* Pilihan Tag Terpopuler */}
                            {popular_tags.length > 0 && (
                                <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                                        <Tag className="h-4 w-4 text-orange-500" />
                                        <span>TOPIK POPULER</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {popular_tags.map((tag, index) => {
                                            const isActive = data.tag === tag;
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleTagClick(tag)}
                                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                                                        isActive 
                                                            ? 'bg-orange-500 border-orange-600 text-white shadow-xs' 
                                                            : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
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

                        {/* BOX PANEL: HUBUNGAN LAYANAN UNIT */}
                        {footerServices.length > 0 && (
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 space-y-4">
                                <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <BoxIcon className="h-4 w-4 text-orange-500" />
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                        Layanan Utama Kami
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {footerServices.map((item, key) => (
                                        <Link 
                                            key={key} 
                                            href={`/layanan/${item.slug}`} 
                                            className="group flex gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors items-center shadow-xs"
                                        >
                                            <div className="w-12 h-12 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        onError={handleImageError}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-zinc-400 text-[10px] uppercase">Unit</span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <span className="block text-sm font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors truncate">
                                                    {item.name}
                                                </span>
                                                <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium line-clamp-1">
                                                    {item.short_description}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-2 text-center border-t border-zinc-100 dark:border-zinc-800">
                                    <Link href="/layanan" className="inline-flex items-center gap-1 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-orange-600">
                                        Lihat Semua Unit Layanan ➔
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