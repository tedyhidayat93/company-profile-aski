import { lazy, useState, Suspense, useMemo, memo } from 'react';
import { Link, useForm, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Eye, Filter, ChevronRight, BoxIcon, Layers, ChevronLeft, RotateCcw, Search, Flame, Container, Send, User } from 'lucide-react';
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
                            className="w-full h-full object-cover transform-gpu"
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
  filters = {},
  seo
}: Props) {
  const { getConfig } = useConfig();
  const { productCategories } = usePage().props as any;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSearching, setIsSearching] = useState(false);
  
  const { data, setData, get } = useForm({
    search: filters.search || '',
    category: filters.category || '',
    tag: filters.tag || '',
  });

  const flattenedCategories = useMemo(() => {
    if (!productCategories) return [];
    return productCategories.flatMap((category: any) => 
      category.items.map((item: any) => ({
        parentTitle: category.title,
        parentSlug: category.slug,
        name: item.name,
        slug: item.slug,
        description: item.meta_description || item.description || category.description,
        image: item.image || category.image,
        href: item.href || `/produk/${category.slug}/${item.slug}`
      }))
    );
  }, [productCategories]);

  const isFilteringActive = data.search || data.category || data.tag;
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Ambil nomor WhatsApp dan bersihkan karakter non-digit
    const whatsappNumber = getConfig('contact_whatsapp', '').replace(/\D/g, '');

    // 2. Susun template pesan promosi dengan rapi (mendukung baris baru / enter)
    const messageTemplate = 
    `Halo Marketing Alumoda,

    Nama saya: ${form.name}
    Saya ingin tanya harga: ${form.subject}

    Catatan tambahan:
    ${form.message || '-'}`;

    // 3. Encode seluruh pesan sekaligus agar format spasi dan enter tidak rusak
    const encodedMessage = encodeURIComponent(messageTemplate);

    // 4. Gabungkan menjadi URL utama
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 5. Buka tab baru
    window.open(whatsappUrl, '_blank');
    };

  const handleCategoryChange = (slug: string) => {
    const updated = { ...data, category: slug, tag: '' };
    setData(updated);
    router.get('/info', updated, { preserveState: true, preserveScroll: true });
  };

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
        title={seo.title || getConfig('services_meta_title', 'Inspirasi & Promo Kontainer Custom')}
        description={seo.description}
        image={seo.image}   
        keywords={seo.keywords}
        contentType={seo.contentType || 'website'}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* SECTION 1: SEARCH BAR */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
          <form onSubmit={handleSearch} className="w-full relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl opacity-0 group-hover:opacity-5 focus-within:opacity-10 transition duration-300 blur-sm pointer-events-none" />
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari info modifikasi, ukuran, atau harga kontainer..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="w-full h-14 pl-12 pr-28 text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 bg-zinc-100 dark:bg-zinc-900/40 focus:bg-white dark:focus:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 focus:border-orange-500 rounded-xl outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={isSearching}
                className="absolute right-2 top-2 h-10 px-5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                {isSearching ? '...' : 'Cari'}
              </button>
            </div>
          </form>

          {isFilteringActive && (
            <button
              type="button"
              onClick={() => {
                setData({ search: '', category: '', tag: '' });
                router.get('/info', {}, { preserveState: true, preserveScroll: true });
              }}
              className="w-full sm:w-auto h-14 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-sm font-bold uppercase tracking-wider transition shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* SECTION 2: HERO BANNER */}
        <HeadlinePost headline_posts={headline_posts} isLoading={isLoading} />

        {/* SECTION 3: FILTER CATEGORIES & TAGS */}
        <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/30 p-2 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider pl-2 pr-3 border-r border-zinc-200 dark:border-zinc-800 shrink-0 select-none">
              <Filter className="h-3.5 w-3.5 text-orange-500" />
              <span className="hidden sm:inline">Kategori</span>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 pb-0.5">
                <button
                  type="button"
                  onClick={() => handleCategoryChange('')}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
                    !data.category 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  Semua Artikel & Promo
                </button>
                {categories.filter(cat => cat.type === 'blog').map((category) => {
                  const isCatActive = data.category === category.slug;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
                        isCatActive 
                          ? 'bg-orange-500 text-white shadow-sm' 
                          : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRODUCT RECOMMENDATIONS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-base font-bold uppercase text-zinc-900 dark:text-white tracking-wider flex items-center gap-2.5">
              <span className="w-2 h-5 bg-orange-500 inline-block rounded-full"></span>
              Pilihan Unit Kontainer Terlaris (Siap Modifikasi)
            </h2>
            <Link href="/katalog" className="text-orange-500 hover:text-orange-600 font-bold text-sm transition underline">
              Lihat Katalog Unit &rarr;
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 no-scrollbar">
            {random_products.map((product) => (
              <div key={product.id} className="w-64 flex-shrink-0 snap-start transition hover:-translate-y-1 p-0.5">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: TWO COLUMNS CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ARTICLES */}
          <main className="order-2 lg:order-1 lg:col-span-8 space-y-12">
            
            {/* SUB-SECTION: LATEST POSTS */}
            {headline_posts.length > 1 && (
              <section className="space-y-4">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <h2 className="text-base font-bold uppercase text-zinc-900 dark:text-white tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-orange-500 inline-block rounded-full"></span>
                    Panduan & Rekomendasi Container Untuk Anda
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {headline_posts.slice(1, 4).map((post) => (
                    <article key={post.id} className="flex flex-col bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                      <Link href={`/${post.slug}`} className="w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800 block relative">
                        <img 
                          src={`/storage/${post.featured_image}`} 
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={handleImageError}
                          alt={post.title}
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            <span>By {post.author?.name || 'Admin Alumoda'}</span>
                        </div>
                        <Link href={`/${post.slug}`} className="group block">
                          {/* FONT DIPERBESAR (text-base) */}
                          <h3 className="font-bold md:text-base xl:text-lg text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                            {post.title}
                          </h3>
                        </Link>
                        
                        {/* PENULIS & TANGGAL */}
                        <div className="space-y-1 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                          <div className="flex items-center justify-between text-[11px]">
                            <span>{formatDate(post.published_at)}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views_count}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* MAIN ARCHIVE LIST */}
            <section className="space-y-6">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h2 className="text-base font-bold uppercase text-zinc-900 dark:text-white tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-orange-500 inline-block rounded-full"></span>
                  Semua Berita & Tips Industri Kontainer
                </h2>
              </div>
              
              <div className="space-y-6">
                {all_posts.data.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-base text-zinc-500">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                  </div>
                ) : (
                  all_posts.data.map((post) => (
                    <article key={post.id} className="flex flex-col md:flex-row gap-6 p-5 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-xl items-start hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-sm">
                      <div className="w-full md:w-56 lg:w-64 aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 relative">
                        <img 
                          src={`/storage/${post.featured_image}`} 
                          className="w-full h-full object-cover" 
                          onError={handleImageError} 
                          alt={post.title} 
                          loading="lazy" 
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3 w-full">
                        <Link href={`/${post.slug}`} className="block group">
                          {/* JUDUL DIPERBESAR AGAR NYAMAN DI MATA (text-xl md:text-2xl) */}
                          <h3 className="font-black text-xl md:text-2xl text-zinc-950 dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                                {post.category && (
                                    <span className="uppercase text-orange-700 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded">
                                    {post.category.name}
                                    </span>
                                )}
                                
                                {/* CREATOR BY / PENULIS DI DAFTAR UTAMA */}
                                <span className="text-zinc-600 dark:text-zinc-300 flex items-center gap-1 font-bold">
                                    By {post.author?.name || 'Admin'}
                                </span>
                            </div> 
                          
                            <span className="text-zinc-400">
                                {formatDate(post.published_at)}
                            </span>
                        </div>


                        {/* DESKRIPSI SINGKAT LEBIH BESAR & JELAS (text-sm md:text-base) */}
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-850">
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views_count} kali dilihat</span>
                          {/* LINK BACA SELENGKAPNYA LEBIH BESAR */}
                          <Link href={`/${post.slug}`} className="text-orange-500 font-bold hover:underline text-sm md:text-base">
                            Baca Selengkapnya &rarr;
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="mt-8">
                <SimpleArrowPagination links={all_posts.links} />
              </div>
            </section>
          </main>

          {/* RIGHT COLUMN: STICKY ASIDE - WORDING PROMOSI KONTAINER */}
          <aside className="order-1 lg:order-2 lg:col-span-4 sticky top-6 w-full space-y-6">
            <div className="bg-slate-900 dark:bg-zinc-900 rounded-xl p-6 border border-slate-800 dark:border-zinc-800 shadow-xl space-y-6">
              
              {/* Header Form Wording Promosi Jual-Beli-Sewa & Modifikasi */}
                <div className="space-y-2 border-b border-slate-800 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-orange-500">
                    <Container className="w-5 h-5 animate-bounce" />
                    <span className="text-xs font-black tracking-widest uppercase text-orange-600 dark:text-orange-400">
                    Dapatkan Penawaran
                    </span>
                </div>
                <h3 className="text-xl font-black text-white dark:text-white tracking-tight">
                    Konsultasi & Cek Harga Kontainer
                </h3>
                <p className="text-slate-300 dark:text-zinc-300 text-sm leading-relaxed">
                    Ingin <strong>jual, beli, sewa, atau modifikasi container</strong>? Hubungi marketing kami sekarang untuk mendapatkan penawaran harga terbaik kami.
                </p>
                </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Nama */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Nama Lengkap Anda
                  </label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                    placeholder="Contoh: Bpk. Bambang"
                  />
                </div>

                {/* Kontak / Email */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Nomor WhatsApp / Email
                  </label>
                  <input 
                    type="text" 
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                    placeholder="Contoh: 081234xxxx / nama@email.com"
                  />
                </div>

                {/* Jenis Kontainer */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Tipe Kontainer Yang Dibutuhkan
                  </label>
                  <input 
                    type="text" 
                    required
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                    placeholder="Contoh: Office Container 20 Feet / Direksi Keet"
                  />
                </div>

                {/* Catatan / Pesan */}
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                    Rencana Penggunaan / Spesifikasi Kustom
                  </label>
                  <textarea 
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                    placeholder="Sampaikan spesifikasi sesuai kebuthanmu... "
                  />
                </div>

                {/* CTA Button Lebih Besar & Menonjol */}
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm uppercase tracking-wide mt-3 active:scale-95"
                >
                  <Send className="w-4 h-4" /> Kirim Permintaan Penawaran
                </button>
              </form>
            </div>
          </aside>

        </div>
      </div>
      <CtaSection />
    </FrontendLayout>
  );
}