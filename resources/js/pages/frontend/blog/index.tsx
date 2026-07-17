import { lazy, useState, Suspense, useMemo, memo } from 'react';
import { Link, useForm, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Eye, Filter, ChevronRight, BoxIcon, Layers, ChevronLeft, RotateCcw, Search, Flame } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { RootCategory } from '../product';
import CtaSection from '@/components/cta-section';
import { SocialProfileEmbed } from '@/components/social-profile-embed';
import ProductCard from '@/components/ProductCard';
import "react-image-gallery/styles/image-gallery.css";

const ImageGallery = lazy(() => import("react-image-gallery"));

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

export const FlatCategoryList = memo(function FlatCategoryList({ items }: { items: FlatCategoryItem[] }) {
    return (
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-orange-600 stroke-[2.5]" />
                    <h2 className="text-base font-extrabold uppercase tracking-wide text-zinc-950 dark:text-white">
                        Daftar Layanan & Jenis Produk
                    </h2>
                </div>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <a 
                        key={item.slug || index}
                        href={item.href}
                        className="group flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl items-center justify-between transition-all hover:border-orange-500 dark:hover:border-orange-500"
                    >
                        <div className="flex gap-4 items-center min-w-0 flex-1">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-center">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform-gpu" loading="lazy" decoding="async" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">No Img</div>
                                )}
                            </div>
                            <div className="min-w-0 flex-1 space-y-1">
                                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">{item.parentTitle}</span>
                                <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors leading-tight">{item.name}</h3>
                                {item.description && <div className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }} />}
                            </div>
                        </div>
                        <div className="shrink-0 pl-2 hidden md:block">
                            <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all">
                                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
});

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface HeadlinePostProps {
    headline_posts: BlogPost[];
    isLoading: boolean;
}

interface CustomGalleryItem {
    original: string;
    originalAlt?: string;
    description?: string;
    postData: BlogPost;
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

export function HeadlinePost({ headline_posts, isLoading }: HeadlinePostProps) {
    if (isLoading || !headline_posts?.length) return null;

    // 1. Transformasi data posts menjadi format item yang dikenali react-image-gallery
    // Kita selipkan objek asli 'post' di dalamnya untuk digunakan saat kustom render
    const galleryItems = headline_posts.map((post) => ({
        original: `/storage/${post.featured_image}`,
        originalAlt: post.title,
        description: post.excerpt,
        // Properti kustom tambahan kita sendiri
        postData: post 
    }));

    // 2. Fungsi Kustom untuk me-render seluruh layout (Teks + Gambar) per item slide
    const renderCustomItem = (item: any) => {
        // Cast ke tipe kustom kita di dalam fungsi
        const customItem = item as CustomGalleryItem;
        const post = customItem.postData;
        
        return (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[420px] lg:min-h-[400px] lg:px-2 xl:px-0 text-left">
                {/* ✍️ KOLOM KIRI: DETAIL TEKS */}
                <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 space-y-4 z-10 my-auto">
                    <div className="flex items-center gap-2 text-xs text-orange-400 font-black tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span>BERITA UTAMA HARI INI</span>
                    </div>

                    <Link href={`/${post.slug}`} className="block group">
                        <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-4xl font-black text-white leading-tight group-hover:text-orange-400 group-hover:underline decoration-2 transition-colors duration-200 line-clamp-3">
                            {post.title}
                        </h1>
                    </Link>

                    <p className="text-zinc-300 text-xs sm:text-sm lg:text-base leading-relaxed border-l-4 border-orange-500 pl-3 font-medium line-clamp-2">
                        {post.excerpt}
                    </p>
                </div>

                {/* 📸 KOLOM KANAN: VISUAL GAMBAR */}
                <div className="order-first lg:order-last lg:col-span-5 relative w-full aspect-[5/3] lg:aspect-[3/2] lg:h-full p-0 sm:p-6 lg:p-6 xl:p-8 flex items-center justify-center bg-zinc-950/20">
                    <div className="w-full h-full sm:rounded-xl overflow-hidden relative shadow-xl bg-slate-950">
                        <img
                            src={customItem.original}
                            alt={customItem.originalAlt}
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 text-white rounded-2xl overflow-hidden shadow-2xl relative custom-headline-gallery">
            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-zinc-400">Memuat Berita...</div>}>
                <ImageGallery
                    items={galleryItems}
                    renderItem={renderCustomItem}
                    showPlayButton={false}       // Matikan tombol play bawaan
                    showFullscreenButton={false} // Matikan tombol fullscreen bawaan
                    showThumbnails={false}       // Matikan gambar thumbnail bawah
                    showNav={false}              // Matikan panah kiri/kanan bawaan (opsional)
                    showBullets={headline_posts.length > 1} // Indikator titik aktif otomatis
                    autoPlay={headline_posts.length > 1}    // Otomatis jalan
                    slideInterval={7000}         // Durasi antar slide (7 detik)
                    slideDuration={450}          // Kecepatan transisi slide (ms)
                />
            </Suspense>
        </div>
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
    
    // 🌟 PERBAIKAN 1: Bungkus proses flatMap dengan useMemo agar HANYA dieksekusi 
    // ketika data `productCategories` dari backend benar-benar berubah!
    const flattenedCategories = useMemo<FlatCategoryItem[]>(() => {
        if (!productCategories) return [];
        return productCategories.flatMap((category) => 
            category.items.map((item) => ({
                parentTitle: category.title,
                parentSlug: category.slug,
                name: item.name,
                slug: item.slug,
                description: item.meta_description || item.description || category.description,
                image: item.image || category.image,
                href: item.href || `/produk/${category.slug}/${item.slug}`
            }))
        );
    }, [productCategories]); // Hanya hitung ulang jika array ini berubah

    const isFilteringActive = data.search || data.category || data.tag;
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

    // 🌟 PERBAIKAN 2: Keluarkan router.get dari dalam updater state setData
    const handleCategoryChange = (slug: string) => {
        const updated = { ...data, category: slug, tag: '' };
        setData(updated);
        router.get('/info', updated, { preserveState: true, preserveScroll: true });
    };

    // 🌟 PERBAIKAN 3: Samakan penanganan dengan handleCategoryChange
    const handleTagClick = (tag: string) => {
        const updated = { ...data, tag: tag, category: '' };
        setData(updated);
        router.get('/info', updated, { preserveState: true, preserveScroll: true });
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
    
            <div className="w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
                {/* ========================================================================= */}
                {/* 🔍 Bagian 1: BAR PENCARIAN UTAMA & TOMBOL RESET */}
                {/* ========================================================================= */}
                <div className="flex flex-col md:flex-row gap-4 items-center w-full max-w-7xl mx-auto">
                    <form onSubmit={handleSearch} className="w-full relative flex-1 group">
                        {/* 🌟 Efek ambient glow di belakang input saat hover/focus */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 focus-within:opacity-20 dark:focus-within:opacity-10 transition duration-300 blur-sm pointer-events-none" />
                        
                        <div className="relative">
                            {/* 🔍 Ikon Pencarian dengan indikator aktif warna */}
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                            </div>
                            
                            <input
                                type="text"
                                placeholder="Cari artikel atau topik berita hari ini..."
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                className="w-full h-13 pl-12 pr-24 text-base font-semibold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200/40 dark:hover:bg-zinc-900/80 focus:bg-white dark:focus:bg-zinc-950 border border-zinc-200/20 dark:border-zinc-800/50 focus:border-orange-500 dark:focus:border-orange-500 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 shadow-sm transition-all duration-200"
                            />
                            
                            {/* 🚀 Tombol Cari yang Lebih Bold & Eye-Catching */}
                            <button 
                                type="submit" 
                                disabled={isSearching}
                                className="absolute right-2 top-2 h-9 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 transition-all duration-200"
                            >
                                {isSearching ? (
                                    <span className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </span>
                                ) : 'Cari'}
                            </button>
                        </div>
                    </form>

                    {/* 🛑 Tombol Reset dengan Desain Clean-Premium */}
                    {isFilteringActive && (
                        <button
                            type="button"
                            onClick={() => {
                                setData({ search: '', category: '', tag: '' });
                                router.get('/info', {}, { preserveState: true, preserveScroll: true });
                            }}
                            className="w-full md:w-auto h-13 px-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent text-sm font-black uppercase tracking-wide transition-all duration-200 shadow-sm active:scale-95 shrink-0"
                        >
                            <RotateCcw className="h-4 w-4 stroke-[2.5]" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

                {/* ========================================================================= */}
                {/* 📰 Bagian 2: BANNER BERITA UTAMA (HERO BANNER) */}
                {/* ========================================================================= */}
                <HeadlinePost headline_posts={headline_posts} isLoading={isLoading} />

                {/* ========================================================================= */}
                {/* 🏷️ Bagian 3: PILIHAN FILTER HORIZONTAL (TOPIK & TRENDING TAGS) */}
                {/* ========================================================================= */}
                <div className="w-full space-y-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                    
                    {/* 🏷️ BARIS 1: KATEGORI UTAMA (HORIZONTAL SCROLL) */}
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/20 p-2 rounded-2xl">
                        {/* Penanda Label Kiri */}
                        <div className="flex items-center gap-1.5 text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-r border-zinc-250 dark:border-zinc-800 pr-4 shrink-0 select-none">
                            <Filter className="h-3.5 w-3.5 text-orange-500" />
                            <span className="hidden sm:inline">Topik</span>
                        </div>

                        {/* Container List Kategori */}
                        <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                            <div className="flex items-center gap-2 pb-0.5">
                                <button
                                    type="button"
                                    onClick={() => handleCategoryChange('')}
                                    className={`rounded-xl px-4 py-1.5 text-xs sm:text-sm font-extrabold border transition-all duration-200 whitespace-nowrap ${
                                        !data.category 
                                            ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10' 
                                            : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                                    }`}
                                >
                                    Semua Berita
                                </button>

                                {categories
                                    .filter(cat => cat.type === 'blog')
                                    .map((category) => {
                                        const isCatActive = data.category === category.slug;
                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => handleCategoryChange(category.slug)}
                                                className={`rounded-xl px-4 py-1.5 text-xs sm:text-sm font-extrabold border transition-all duration-200 whitespace-nowrap ${
                                                    isCatActive 
                                                        ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10' 
                                                        : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* 🔥 BARIS 2: TRENDING TAGS (HORIZONTAL SCROLL) */}
                    {popular_tags.length > 0 && (
                        <div className="flex items-center gap-4 px-2">
                            {/* Penanda Label Kiri */}
                            <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 uppercase tracking-widest shrink-0 select-none">
                                <Flame className="h-3.5 w-3.5 fill-orange-500/10 animate-pulse" />
                                <span>Trending:</span>
                            </div>

                            {/* Container List Tags */}
                            <div className="flex-1 overflow-x-auto no-scrollbar">
                                <div className="flex items-center gap-1.5 pb-0.5">
                                    {popular_tags.map((tag, index) => {
                                        const isTagActive = data.tag === tag;
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleTagClick(tag)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 whitespace-nowrap ${
                                                    isTagActive 
                                                        ? 'bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400' 
                                                        : 'bg-zinc-100 dark:bg-zinc-900 border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                                }`}
                                            >
                                                #{tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- CONTAINER KONTEN UTAMA - Menggunakan w-full & px-4/px-6/px-8 saja --- */}
            <main className="w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                
                {/* Banner Rekomendasi Produk */}
                {/* <div className="w-full mb-10 bg-white dark:bg-slate-950 border border-zinc-200 rounded-2xl overflow-hidden">
                    <FeaturedProductsBanner products={random_products} autoScroll={false} />
                </div> */}

                 <section className='mb-10'>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-1 mb-4 border-b-2 border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                        <div className="space-y-2">
                            <h2 id="section-sorotan" className="text-xl font-extrabold uppercase text-zinc-900 dark:text-white flex items-center gap-2.5">
                                <span className="w-2 h-6 bg-orange-500 inline-block rounded-full"></span>
                                Rekomendasi Unit Kontainer Untukmu
                            </h2>
                        </div>
                        <Link href="/katalog" className="text-orange-500 font-bold text-sm underline pl-4">
                            Lihat Unit Lainnya
                        </Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto snap-x custom-scrollbar snap-mandatory scroll-smooth no-scrollbar">
                        {random_products.map((product) => (
                            <div
                                key={product.id}
                                className="w-60 flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-xl p-1"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
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
                                            <Link 
                                                href={`/${post.slug}`} 
                                                className="w-full aspect-[4/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800 block relative"
                                            >
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="absolute inset-0 w-full h-full object-cover"
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
                        <section aria-labelledby="section-arsip" className=" border-zinc-200 dark:border-zinc-850 pt-8">
                            <div className="border-b-2 border-zinc-300 dark:border-zinc-800 pb-3 mb-6">
                                <h2 id="section-arsip" className="text-xl font-extrabold uppercase text-zinc-900 dark:text-white flex items-center gap-2.5">
                                    <span className="w-2 h-6 bg-orange-500 inline-block rounded-full"></span>
                                    Baca Artikel Lainnya
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
                                            <Link href={`/${post.slug}`} className="w-full md:w-42 xl:w-64 aspect-[16/11] shrink-0 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 block relative">
                                                <img 
                                                    src={`/storage/${post.featured_image}`} 
                                                    className="w-full h-full object-cover" 
                                                    onError={handleImageError} 
                                                    alt={post.title} 
                                                    loading="lazy" 
                                                />
                                            </Link>
                                            
                                            <div className="flex-1 space-y-3.5 w-full">
                                                <div className="flex items-center gap-3 flex-wrap text-xs xl:text-sm font-bold">
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
                                                    <Link href={`/${post.slug}`}  className="inline-flex hover:underline items-center gap-1 text-orange-600 text-base font-extrabold">
                                                        Baca Selengkapnya ➔
                                                    </Link>
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

                        {/* ========================================================================= */}
                        {/* 📱 SECTION: SOCIAL MEDIA FEEDS (PALING ATAS SIDEBAR) */}
                        {/* ========================================================================= */}
                        <div className="space-y-4">
                            
                            {/* 1. Card TikTok */}
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                                <div className="mb-3">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                        Ikuti Kami di TikTok
                                    </h3>
                                </div>
                                
                                {/* Wrapper area embed TikTok */}
                                <div className="w-full bg-zinc-50 dark:bg-zinc-950/40 rounded-xl overflow-hidden p-2 flex items-center justify-center min-h-[300px]">
                                    <SocialProfileEmbed 
                                        platform="tiktok" 
                                        urlConfig={getConfig("social_tiktok", "https://www.tiktok.com/@alumodakontainer")} 
                                    />
                                </div>
                            </div>

                            {/* 2. Card YouTube */}
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                                <div className="mb-3">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                        Video Terbaru YouTube
                                    </h3>
                                </div>
                                
                                {/* Wrapper area embed YouTube video */}
                                <div className="w-full bg-zinc-50 dark:bg-zinc-950/40 rounded-xl overflow-hidden p-3 space-y-2">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-zinc-200/60 dark:border-zinc-800 shadow-inner">
                                        <SocialProfileEmbed 
                                            platform="youtube" 
                                            urlConfig="UCKxrMhKnI0z-dQt0JhtukWg" 
                                            youtubeType="latest-video" 
                                        />
                                    </div>
                                    <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 text-center pt-1">
                                        Update seputar modifikasi & sewa kontainer.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* ========================================================================= */}
                        {/* 📦 BOX PANEL: HUBUNGAN LAYANAN UNIT */}
                        {/* ========================================================================= */}
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

                        {/* ========================================================================= */}
                        {/* 🏷️ FILTER KATEGORI */}
                        {/* ========================================================================= */}
                        <FlatCategoryList items={flattenedCategories} />

                    </aside>
                </section>
            </main>
            <CtaSection />
        </FrontendLayout>
    );
}