import { useState } from 'react';
import { Link, useForm, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Eye, Filter, Tag, ChevronRight, BoxIcon, Layers, ChevronLeft } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { FeaturedProductsBanner } from '../catalog';
import { RootCategory } from '../product';

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

interface FlatCategoryItem {
    parentTitle: string;
    parentSlug: string;
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    href: string;
}

export function FlatCategoryList({ items }: { items: FlatCategoryItem[] }) {
    return (
        <div className="w-full bg-zinc-50 dark:bg-zinc-950 py-6">
            
            {/* 📦 SATU CARD UTAMA (Bentuk Luar & Padding Meniru Sempurna Card Atas) */}
            <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                
                {/* Header Card: Icon, Judul & Informasi Total Item */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                    <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-orange-600 stroke-[2.5]" />
                        <div>
                            <h2 className="text-base font-extrabold uppercase tracking-wide text-zinc-950 dark:text-white">
                                Daftar Layanan & Jenis Produk
                            </h2>
                        </div>
                    </div>
                
                </div>

                {/* 📝 DAFTAR ITEM (Menggunakan Style Card Dalam yang Seragam & Rapi) */}
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <a 
                            key={item.slug || index}
                            href={item.href}
                            className="group flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl items-center justify-between transition-all hover:border-orange-500 dark:hover:border-orange-500"
                        >
                            
                            {/* Sisi Kiri: Gambar Mini + Informasi Teks */}
                            <div className="flex gap-4 items-center min-w-0 flex-1">
                                
                                {/* Thumbnail Gambar: Bentuk Kotak Rounded Elegan */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-center">
                                    {item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-405 dark:text-zinc-500 uppercase tracking-widest">
                                            No Img
                                        </div>
                                    )}
                                </div>

                                {/* Detail Teks: Jelas & Rapi */}
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block text-[10px] font-black uppercase tracking-wider text-orange-650 dark:text-orange-400">
                                            {item.parentTitle}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors leading-tight">
                                        {item.name}
                                    </h3>
                                    
                                    {item.description && (
                                        <div className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description || ''  }} />
                                    )}
                                </div>

                            </div>

                            {/* Sisi Kanan: Tombol Buka Detail (Chevron Minimalis) */}
                            <div className="shrink-0 pl-2 hidden md:block">
                                <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-405 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all">
                                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                </div>
                            </div>

                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
}

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export function SimpleArrowPagination({ links }: PaginationProps) {
    // Laravel mengembalikan link "Previous" di indeks pertama (0) 
    // dan link "Next" di indeks terakhir (links.length - 1)
    const prevLink = links[0];
    const nextLink = links[links.length - 1];

    return (
        <nav className="w-full flex items-center justify-between gap-4 py-3 bg-transparent">
            {/* ⬅️ TOMBOL SEBELUMNYA */}
            {prevLink.url ? (
                <Link
                    href={prevLink.url}
                    preserveScroll
                    className="inline-flex h-14 items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 rounded-2xl font-black text-base uppercase transition-all hover:border-orange-500 hover:text-orange-600 active:scale-98 shadow-xs"
                >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    Sebelumnya
                </Link>
            ) : (
                // State Mati (Disabled) jika berada di halaman pertama
                <div className="inline-flex h-14 items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-850 text-zinc-400 dark:text-zinc-600 px-6 rounded-2xl font-black text-base uppercase cursor-not-allowed select-none">
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                    Sebelumnya
                </div>
            )}

            {/* ➡️ TOMBOL SELANJUTNYA */}
            {nextLink.url ? (
                <Link
                    href={nextLink.url}
                    preserveScroll
                    className="inline-flex h-14 items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 rounded-2xl font-black text-base uppercase transition-all hover:border-orange-500 hover:text-orange-600 active:scale-98 shadow-xs"
                >
                    Selanjutnya
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
            ) : (
                // State Mati (Disabled) jika berada di halaman terakhir
                <div className="inline-flex h-14 items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-850 text-zinc-400 dark:text-zinc-600 px-6 rounded-2xl font-black text-base uppercase cursor-not-allowed select-none">
                    Selanjutnya
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
            )}
        </nav>
    );
}

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
    const { productCategories } = usePage().props as unknown as { productCategories: RootCategory[] };
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        tag: filters.tag || '',
    });
    
    // Proses pemetaan menjadi satu tingkat (Flat Array)
    const flattenedCategories: FlatCategoryItem[] = productCategories.flatMap((category) => 
        category.items.map((item) => ({
            parentTitle: category.title, // Menyimpan nama kategori utama sebagai penanda
            parentSlug: category.slug,   // Menyimpan slug utama untuk keperluan routing
            name: item.name,
            slug: item.slug,
            description: item.meta_description || item.description || category.description, // Fallback ke deskripsi utama jika kosong
            image: item.image || category.image, // Fallback ke gambar utama jika sub-item tidak punya gambar
            href: item.href || `/produk/${category.slug}/${item.slug}`
        }))
    );
    
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
    
            {/* 🌟 1. BERITA UTAMA (HEADLINE) - Full Width Dioptimasi untuk 1024px (lg) ke atas */}
            {!isLoading && headline_posts[0] && (
                <div className="w-full bg-zinc-950 text-white border-b border-zinc-900">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
                        
                        {/* 📸 KOLOM GAMBAR (MOBILE: Tampil di atas, DESKTOP: Tampil di kanan) */}
                        {/* Menggunakan order-first untuk mobile, lalu lg:order-last untuk mengembalikannya ke sisi kanan di desktop */}
                        <div className="order-first lg:order-last lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-full bg-zinc-950 overflow-hidden">
                            <img
                                src={`/storage/${headline_posts[0].featured_image}`}
                                onError={handleImageError}
                                // object-cover menjamin gambar selalu penuh tanpa distorsi dan tidak menyisakan background kosong
                                className="absolute inset-0 w-full h-full object-cover"
                                alt={headline_posts[0].title}
                                loading="eager"
                            />
                            {/* Overlay gradasi gelap halus di mobile (bawah) dan desktop (kiri) agar transisi ke teks lebih mulus */}
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-transparent to-transparent opacity-80" />
                        </div>

                        {/* ✍️ KOLOM TEKS (MOBILE: Tampil di bawah gambar, DESKTOP: Tampil di kiri) */}
                        <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-20 bg-zinc-955 space-y-6">
                            
                            {/* Tag Kategori / Headline */}
                            <div className="flex items-center gap-3 text-xs sm:text-sm text-orange-400 font-black tracking-widest uppercase">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                <span>BERITA UTAMA HARI INI</span>
                            </div>

                            {/* Judul: Fleksibel dan responsif */}
                            <Link href={`/${headline_posts[0].slug}`} className="block group">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight group-hover:text-orange-400 group-hover:underline decoration-2 transition-colors duration-200">
                                    {headline_posts[0].title}
                                </h1>
                            </Link>

                            {/* Deskripsi Singkat: Sangat mudah dibaca */}
                            <p className="text-zinc-200 text-base sm:text-lg lg:text-lg xl:text-xl leading-relaxed border-l-4 border-orange-500 pl-4 font-medium line-clamp-3 lg:line-clamp-none">
                                {headline_posts[0].excerpt}
                            </p>

                            {/* Info Penulis & Tombol Baca */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-zinc-900 text-base font-semibold text-zinc-450">
                                <div className="text-sm sm:text-base">
                                    Oleh: <strong className="text-white font-black">{headline_posts[0].author?.name || 'Tim Redaksi'}</strong>
                                    <span className="mx-2 text-zinc-700">•</span>
                                    <span className="text-zinc-300">{formatDate(headline_posts[0].published_at)}</span>
                                </div>
                                
                                <Link 
                                    href={`/${headline_posts[0].slug}`} 
                                    className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 bg-orange-500 text-white px-6 sm:px-8 rounded-xl font-black uppercase text-sm sm:text-base hover:bg-orange-650 active:scale-98 transition-all duration-200 shadow-lg shadow-orange-950/20"
                                >
                                    BACA SEKARANG
                                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* --- CONTAINER KONTEN UTAMA - Menggunakan w-full & px-4/px-6/px-8 saja --- */}
            <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 bg-zinc-50 dark:bg-zinc-950">
                
                {/* Banner Rekomendasi Produk */}
                <div className="w-full mb-10 bg-white dark:bg-slate-950 border border-zinc-200 rounded-2xl overflow-hidden">
                    <FeaturedProductsBanner products={random_products}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ===================================================
                        KOLOM KIRI: ARSIP ARTIKEL (Lebar Lebih Luas)
                       =================================================== */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* SEKSI: INFORMASI PILIHAN */}
                        {headline_posts.length > 1 && (
                            <section aria-labelledby="section-sorotan">
                                <div className="border-b-2 border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                                    <h2 id="section-sorotan" className="text-xl font-extrabold uppercase text-zinc-900 dark:text-white flex items-center gap-2.5">
                                        <span className="w-2 h-6 bg-orange-500 inline-block rounded-full"></span>
                                        Informasi Pilihan Pembaca
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {headline_posts.slice(1, 4).map((post) => (
                                        <article key={post.id} className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden">
                                            <Link href={`/${post.slug}`} className="w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 block relative">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover"
                                                    onError={handleImageError}
                                                    alt={post.title}
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <Link href={`/${post.slug}`} className="group">
                                                    <h3 className="font-extrabold text-lg text-zinc-950 dark:text-white leading-snug group-hover:text-orange-600 group-hover:underline">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                                <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                                                    <span>{formatDate(post.published_at)}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.views_count}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SEKSI UTAMA: ARSIP DAFTAR ARTIKEL */}
                        <section aria-labelledby="section-arsip" className="border-t-2 border-zinc-200 dark:border-zinc-850 pt-8">
                            <div className="border-b border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                                <h2 id="section-arsip" className="text-xl font-extrabold uppercase text-zinc-900 dark:text-white flex items-center gap-2.5">
                                    <span className="w-2 h-6 bg-orange-500 inline-block rounded-full"></span>
                                    Daftar Artikel Lengkap
                                </h2>
                            </div>
                            
                            <div className="space-y-8">
                                {all_posts.data.length === 0 ? (
                                    <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                        <p className="text-base font-bold text-zinc-600 dark:text-zinc-400">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                                    </div>
                                ) : (
                                    all_posts.data.map((post) => (
                                        <article key={post.id} className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl items-start">
                                            <Link href={`/${post.slug}`} className="w-full md:w-64 aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 block relative">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover" 
                                                    onError={handleImageError} 
                                                    alt={post.title} 
                                                    loading="lazy" 
                                                />
                                            </Link>
                                            
                                            <div className="flex-1 space-y-3.5 w-full">
                                                <div className="flex items-center gap-3 flex-wrap text-sm font-bold">
                                                    {post.category && (
                                                        <span className="uppercase tracking-wider text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-950 px-3 py-1 rounded-md">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-zinc-600 dark:text-zinc-400">
                                                        {formatDate(post.published_at)}
                                                    </span>
                                                </div>

                                                <Link href={`/${post.slug}`} className="block group">
                                                    <h3 className="font-black text-2xl md:text-3xl text-zinc-950 dark:text-white leading-snug group-hover:text-orange-600 group-hover:underline">
                                                        {post.title}
                                                    </h3>
                                                </Link>

                                                <p className="text-zinc-800 dark:text-zinc-200 text-lg md:text-xl leading-relaxed font-normal line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between text-sm font-bold text-zinc-600 dark:text-zinc-400 pt-4 border-t border-zinc-150 dark:border-zinc-800">
                                                    <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {post.views_count} kali dibaca</span>
                                                    <span className="inline-flex items-center gap-1 text-orange-600 text-base font-extrabold">
                                                        Buka Artikel ➔
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>

                            <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <SimpleArrowPagination links={all_posts.links} />
                            </div>
                        </section>

                    </div>

                    {/* ===================================================
                        KOLOM KANAN: SIDEBAR PENCARIAN & LAYANAN (Full Width Adaptif)
                       =================================================== */}
                    <aside className="lg:col-span-4 space-y-6 w-full">
                        
                        {/* BOX PANEL: FORM PENCARIAN */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-5">
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-orange-500" />
                                    <h2 className="text-base font-extrabold uppercase text-zinc-900 dark:text-white">
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
                                        className="text-xs font-bold bg-red-100 text-red-700 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors"
                                    >
                                        Atur Ulang
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 block uppercase tracking-wider">KATA KUNCI</label>
                                    <Input
                                        type="text"
                                        placeholder="Tulis judul yang ingin dicari..."
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="h-12 text-base rounded-xl border-zinc-300 dark:border-zinc-700 font-semibold focus-visible:ring-2 focus-visible:ring-orange-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 block uppercase tracking-wider">PILIH KATEGORI</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="h-12 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-850 px-3 text-base font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
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

                                <Button type="submit" disabled={isSearching} className="w-full h-12 rounded-xl text-base bg-zinc-950 hover:bg-orange-500 hover:text-white dark:bg-zinc-800 text-white font-extrabold transition-colors">
                                    {isSearching ? 'Mencari...' : 'Terapkan Pencarian'}
                                </Button>
                            </form>

                            {/* Pilihan Tag Terpopuler */}
                            {popular_tags.length > 0 && (
                                <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
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
                                                    className={`rounded-lg px-3.5 py-2 text-xs font-bold border transition-colors ${
                                                        isActive 
                                                            ? 'bg-orange-500 border-orange-600 text-white shadow-xs' 
                                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200'
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
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <BoxIcon className="h-5 w-5 text-orange-500" />
                                    <h2 className="text-base font-extrabold uppercase text-zinc-900 dark:text-white">
                                        Layanan Utama Kami
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {footerServices.map((item, key) => (
                                        <Link 
                                            key={key} 
                                            href={`/layanan/${item.slug}`} 
                                            className="group flex flex-wrap md:flex-nowrap gap-3.5 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors items-center"
                                        >
                                            <div className="w-14 h-14 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
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
                                                <span className="block text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="block text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium line-clamp-3">
                                                    {item.short_description}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-3 text-center border-t border-zinc-150 dark:border-zinc-800">
                                    <Link href="/layanan" className="inline-flex items-center gap-1 text-base font-black text-zinc-950 dark:text-white hover:text-orange-600">
                                        Lihat Semua Unit Layanan ➔
                                    </Link>
                                </div>
                            </div>

                        )}

                        <FlatCategoryList items={flattenedCategories} />

                    </aside>
                </div>
            </main>
        </FrontendLayout>
    );
}