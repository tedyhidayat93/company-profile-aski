import { useState, useMemo } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Eye, Search,  Tag, BoxIcon, Send, X, ArrowUpRight, RotateCcw } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { Pagination } from '@/components/ui/pagination';
import { formatDateArticle } from '@/lib/utils';

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

type ProductItem = {
    id: number;
    name: string;
    slug: string;
    image: string;
    brand: string | null;
    category: { id: number; name: string; slug: string; } | null;
};

type CategoryItem = {
    id: number;
    name: string;
    slug: string;
    type: string;
    children?: CategoryItem[];
};

type Props = {
    headline_posts: BlogPost[];
    most_read_posts: BlogPost[];
    recent_posts: BlogPost[];
    all_posts: { data: BlogPost[]; links: any; };
    categories: CategoryItem[];
    popular_tags: string[];
    random_products: ProductItem[];
    filters: { search: string; category: string; tag: string; };
    seo: SeoHeadProps;
};

export default function BlogIndex({ 
    headline_posts = [], 
    most_read_posts = [], 
    recent_posts = [], 
    all_posts = { data: [], links: [] }, 
    categories = [], 
    popular_tags = [],
    random_products = [],
    filters = { search: '', category: '', tag: '' },
    seo
}: Props) {
    
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        tag: filters.tag || '',
    });

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const isFiltered = useMemo(() => {
        return !!(filters.search || filters.category || filters.tag);
    }, [filters]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        get('/info', {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsSearching(false);
                setIsSearchOpen(false);
            }
        });
    };

    const handleCategoryChange = (slug: string) => {
        setData(slice => {
            const updated = { ...slice, category: slug, tag: '', search: '' };
            router.get('/info', updated, { preserveState: true, preserveScroll: true });
            return updated;
        });
    };

    const handleTagClick = (tag: string) => {
        setData(slice => {
            const updated = { ...slice, tag: tag, category: '', search: '' };
            router.get('/info', updated, { preserveState: true, preserveScroll: true });
            return updated;
        });
    };

    const handleClearFilters = () => {
        setData({ search: '', category: '', tag: '' });
        router.get('/info', { search: '', category: '', tag: '' }, { preserveState: true, preserveScroll: true });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phone = "6281282336464"; 
        const text = `Halo, saya tertarik dengan produk container Anda.\n\n*Nama:* ${form.name}\n*Kontak:* ${form.email}\n*Kebutuhan Projek:* ${form.subject}\n*Pesan Tambahan:* ${form.message}`;
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const activeCategoryName = useMemo(() => {
        if (!filters.category) return '';
        const found = categories.find(cat => cat.slug === filters.category);
        return found ? found.name : '';
    }, [filters.category, categories]);

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />

            {/* 🔍 JENDELA PENCARIAN FLUID */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4 transition-all animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-4 duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cari Artikel</h3>
                            <button onClick={() => setIsSearchOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    type="text"
                                    autoFocus
                                    placeholder="Ketik topik container yang ingin Anda cari..."
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                    className="h-12 pl-11 text-base rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-orange-500 font-bold"
                                />
                            </div>
                            <Button type="submit" className="h-12 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-6 shadow-md shadow-orange-500/20 cursor-pointer">
                                {isSearching ? 'Memuat...' : 'Cari'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
    
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans antialiased">
                
                {/* 📌 HEADER UTAMA + KAPSUL NAVIGASI KATEGORI */}
                <div className="flex flex-col gap-6 mb-10 pb-6 border-b border-slate-150 dark:border-slate-900">
                    {/* 📋 AREA JUDUL & DESKRIPSI (ATAS) */}
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                            Artikel & <span className="text-orange-500">Edukasi Container</span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-medium leading-relaxed">
                            Panduan lengkap, inspirasi modifikasi, dan info bisnis container terkini.
                        </p>
                    </div>

                    {/* 🗂️ AREA TOMBOL CARI & KATEGORI (BAWAH) */}
                    <div className="flex items-center max-w-full overflow-x-auto scrollbar-none py-1.5 relative">
                        
                        {/* 📌 Bagian yang Di-fixed/Sticky (Tombol Cari + Pembatas) */}
                        <div className="sticky left-0 z-10 flex items-center gap-2.5 bg-white dark:bg-slate-950 pr-2">
                            {/* Tombol Cari */}
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer border ${
                                    filters.search 
                                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 border-slate-200/60 dark:border-slate-800'
                                }`}
                                title="Cari Artikel"
                            >
                                <Search className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            
                            {/* Separator / Pembatas Sekat */}
                            <span className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />
                        </div>

                        {/* 🏃‍♂️ Bagian Kategori (Bisa Di-scroll) */}
                        <div className="flex items-center gap-2.5">
                            {/* Tombol Semua Topik */}
                            <button 
                                onClick={() => handleCategoryChange('')}
                                className={`shrink-0 px-4 h-10 rounded-full text-sm font-extrabold tracking-wide transition-all cursor-pointer ${
                                    !filters.category 
                                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md' 
                                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                                }`}
                            >
                                Semua Topik
                            </button>

                            {/* Perulangan Data Kategori */}
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.slug)}
                                    className={`shrink-0 px-4 h-10 rounded-full text-sm font-extrabold tracking-wide transition-all cursor-pointer ${
                                        filters.category === cat.slug 
                                            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

                {/* 📢 BAR INFORMASI FILTRASI PENCARIAN */}
                {isFiltered && (
                    <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-300">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Menampilkan hasil untuk:{' '}
                            {filters.search && <span className="font-extrabold text-slate-900 dark:text-white">Kata Kunci "{filters.search}"</span>}
                            {filters.category && <span className="font-extrabold text-slate-900 dark:text-white">Kategori "{activeCategoryName || filters.category}"</span>}
                            {filters.tag && <span className="font-extrabold text-slate-900 dark:text-white">Tag #{filters.tag}</span>}
                            <span className="ml-2 px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-bold">
                                {all_posts.data.length} Artikel Ditemukan
                            </span>
                        </div>
                        <button 
                            onClick={handleClearFilters}
                            className="flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset Saringan
                        </button>
                    </div>
                )}

                {/* 📰 BENTO HERO GRID (Pilihan Utama Redaksi - Hanya Muncul Tanpa Filter) */}
                {!isFiltered && headline_posts.length > 0 && (
                  <section aria-label="Artikel Pilihan Utama" className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-14">
                      {/* 🟧 KARTU UTAMA (KIRI) */}
                      {headline_posts[0] && (
                          <article className="md:col-span-8 group relative aspect-[16/10] md:aspect-auto md:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-100 dark:border-slate-900">
                              <img
                                  src={`/storage/${headline_posts[0].featured_image}`}
                                  className="absolute inset-0 w-full h-full object-cover opacity-85 hover:brightness-95 transition-transform duration-700 ease-out"
                                  loading="lazy"
                                  onError={handleImageError} alt={headline_posts[0].title} decoding="async"
                              />
                              {/* Gradasi gelap di bagian bawah untuk menjamin keterbacaan teks */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                              
                              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end space-y-3 z-10">
                                  <span className="self-start text-xs font-black uppercase tracking-wider bg-orange-500 text-white px-2.5 py-1 rounded-md shadow-sm">
                                      SOROTAN UTAMA
                                  </span>
                                  <Link href={`/${headline_posts[0].slug}`} className="block duration-200">
                                      <h3 className="text-xl sm:text-2xl transition-colors font-black text-white group-hover:text-orange-500 tracking-tight leading-tight line-clamp-2">
                                          {headline_posts[0].title}
                                      </h3>
                                  </Link>
                                  <p className="text-slate-200 text-sm line-clamp-2 opacity-95 font-normal max-w-2xl leading-relaxed">
                                      {headline_posts[0].excerpt}
                                  </p>
                              </div>
                          </article>
                      )}

                      {/* 🟧 KARTU SEKUNDER (KANAN STACK) */}
                      <div className="md:col-span-4 grid grid-cols-1 gap-5">
                          {headline_posts.slice(1, 3).map((post) => (
                              <article key={post.id} className="group relative aspect-[16/9.5] md:aspect-auto md:h-[200px] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-100 dark:border-slate-900">
                                  <img
                                      src={`/storage/${post.featured_image}`}
                                      loading="lazy"
                                      className="absolute inset-0 w-full h-full object-cover opacity-80 hover:brightness-95 transition-transform duration-500"
                                      onError={handleImageError} alt={post.title} decoding="async"
                                  />
                                  {/* Gradasi gelap disesuaikan untuk kartu yang lebih kecil */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                  
                                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end space-y-2 text-white z-10">
                                      {post.category && (
                                          <span className="self-start text-xs font-bold uppercase tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                                              {post.category.name}
                                          </span>
                                      )}
                                      <Link href={`/${post.slug}`} className="duration-200">
                                          <h4 className="font-extrabold text-base transition-colors text-white group-hover:text-orange-500 tracking-tight line-clamp-2 leading-snug">
                                              {post.title}
                                          </h4>
                                      </Link>
                                  </div>
                              </article>
                          ))}
                      </div>
                  </section>
                )}

                {/* 🌟 SECTION: ARTIKEL POPULER & TERBARU (Sesuai Referensi Gambar) */}
                {!isFiltered && (most_read_posts.length > 0 || recent_posts.length > 0) && (
                    <section aria-label="Artikel Terpopuler dan Terbaru" className="mb-16 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 border-b py-5">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-orange-500 uppercase block mb-1">Paling Banyak Dicari</span>
                                <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">Informasi Container Terpopuler Untuk Anda</h2>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm md:text-right font-medium leading-relaxed">
                                Ulasan produk dan panduan edukasi container kustom yang paling sering dibaca oleh mitra bisnis kami.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* KIRI: Artikel Populer Utama (Banner Besar Vertikal) */}
                            <div className="lg:col-span-7 group">
                                {most_read_posts[0] && (
                                    <div className="space-y-4 p-3 border border-slate-150 dark:border-slate-900/60 rounded-3xl bg-slate-50/30 dark:bg-slate-900/10 shadow-xs transition-all">
                                        {/* 📸 AREA GAMBAR BANNER */}
                                        <Link href={`/${most_read_posts[0].slug}`} className="block w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-xs relative">
                                            <img 
                                                src={`/storage/${most_read_posts[0].featured_image}`} 
                                                className="absolute inset-0 w-full h-full object-cover hover:brightness-95 transition-transform duration-700 ease-out" 
                                                onError={handleImageError} 
                                                alt={most_read_posts[0].title}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </Link>

                                        {/* 📝 AREA KONTEN TEKS */}
                                        <div className="space-y-4 p-2">
                                            <Link href={`/${most_read_posts[0].slug}`} className="block">
                                                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-500 transition-colors duration-200">
                                                    {most_read_posts[0].title}
                                                </h3>
                                            </Link>
                                            
                                            <div className="flex items-center justify-between gap-4 pt-1">
                                                {/* BADGE KATEGORI KUSTOM */}
                                                {most_read_posts[0].category && (
                                                    <button 
                                                        onClick={() => handleCategoryChange(most_read_posts[0].category!.slug)}
                                                        className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-3xs hover:border-orange-500 hover:text-orange-500 cursor-pointer transition-all duration-200"
                                                    >
                                                        {most_read_posts[0].category.name}
                                                    </button>
                                                )}

                                                {/* 👁️ JUMLAH PEMBACA */}
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                                                    <Eye className="w-4 h-4 stroke-[2]" /> 
                                                    <span>{most_read_posts[0].views_count.toLocaleString('id-ID')} Kali Dibaca</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* KANAN: List Artikel Terbaru */}
                            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                                {recent_posts.slice(0, 4).map((post) => (
                                    <article key={post.id} className="group/item flex gap-4 items-start border-b border-slate-100 dark:border-slate-900 pb-5 last:border-0 last:pb-0">
                                        <Link href={`/${post.slug}`} className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 block relative">
                                            <img 
                                                src={`/storage/${post.featured_image}`} 
                                                className="absolute inset-0 w-full h-full object-cover" 
                                                onError={handleImageError} 
                                                alt={post.title}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </Link>
                                        <div className="flex-1 flex flex-col justify-between h-24 sm:h-28 py-0.5">
                                            <div className="space-y-1">
                                                <Link href={`/${post.slug}`} className="block">
                                                    <h4 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug line-clamp-2 group-hover/item:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </h4>
                                                </Link>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-normal">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                            {post.category && (
                                                <button 
                                                    onClick={() => handleCategoryChange(post.category!.slug)}
                                                    className="self-start inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 shadow-3xs hover:border-orange-500 hover:text-orange-500 cursor-pointer transition"
                                                >
                                                    {post.category.name}
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 🏬 LAYOUT FEED UTAMA + BILIK KANAN (SIDEBAR) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* FEED ARTIKEL KIRI */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                            <h2 className="text-sm font-black tracking-wider text-slate-950 dark:text-white uppercase flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> {isFiltered ? 'Hasil Saringan Artikel' : 'Info Pembaruan & Rilis Container Untuk Anda'}
                            </h2>
                        </div>
                        
                        {all_posts.data.length === 0 ? (
                            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-semibold text-slate-400">Tidak ada materi atau artikel edukasi yang sesuai.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
                                {all_posts.data.map((post) => (
                                    <article key={post.id} className="group flex flex-col space-y-3.5">
                                        {/* Area Gambar */}
                                        <Link href={`/${post.slug}`} className="w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 block relative border border-slate-150 dark:border-slate-800/60 shadow-2xs">
                                            <img src={`/storage/${post.featured_image}`} className="absolute inset-0 w-full h-full object-cover hover:brightness-95 duration-500" onError={handleImageError} alt={post.title} loading="lazy" decoding="async" />
                                            {post.category && (
                                                <span className="absolute top-3 left-3 text-xs font-black uppercase tracking-wider bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-white px-2.5 py-0.5 rounded-md shadow-xs z-10">
                                                    {post.category.name}
                                                </span>
                                            )}
                                        </Link>

                                        {/* Bagian Konten */}
                                        <div className="flex-1 flex flex-col justify-between space-y-2">
                                            <div className="space-y-1.5">
                                                <Link href={`/${post.slug}`} className="flex items-start justify-between gap-1 group/title text-slate-950 dark:text-white">
                                                    <h3 className="font-extrabold text-base tracking-tight leading-snug line-clamp-2 group-hover/title:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <ArrowUpRight className="w-4 h-4 shrink-0 text-slate-400 group-hover/title:text-orange-500 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all mt-0.5" />
                                                </Link>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            {/* Meta & Penulis */}
                                            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-100 dark:border-slate-900/60">
                                                <span className="truncate max-w-[100px] text-slate-600 dark:text-slate-300 font-semibold">
                                                    {post.author?.name || 'Tim Ahli'}
                                                </span>
                                                <span>{formatDateArticle(post.published_at)}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {all_posts.data.length > 0 && (
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-900">
                                <Pagination links={all_posts.links} />
                            </div>
                        )}
                    </div>

                    {/* BILIK KANAN (SIDEBAR WIDGET) */}
                    <aside className="lg:col-span-4 space-y-8 w-full border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-900 pt-8 lg:pt-0 lg:pl-8">
                        
                        {/* 🌟 WIDGET 1: FORM PENAWARAN HARGA CONTAINER */}
                        <div className="bg-slate-900 dark:bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
                            <div className="border-b border-slate-800 pb-4 mb-4">
                                <h3 className="text-base font-black uppercase tracking-wide text-white flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" /> Dapatkan Penawaran Harga
                                </h3>
                                <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
                                    Tertarik memesan unit kustom, office container, atau modifikasi khusus? Hubungi tim ahli kami.
                                </p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-300">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:text-black! focus:border-orange-500 transition" 
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-300">Email / WhatsApp / Telepon</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={form.email}
                                        onChange={e => setForm({...form, email: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:text-black! focus:border-orange-500 transition" 
                                        placeholder="Email/WhatsApp/Telephone..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-300">Rencana Kebutuhan Projek</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={form.subject}
                                        onChange={e => setForm({...form, subject: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:text-black! focus:border-orange-500 transition" 
                                        placeholder="Contoh: Booth Container Kuliner 20ft"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-300">Detail Spesifikasi / Pesan</label>
                                    <textarea 
                                        rows={3}
                                        required
                                        value={form.message}
                                        onChange={e => setForm({...form, message: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:text-black! focus:border-orange-500 transition resize-none" 
                                        placeholder="Sebutkan estimasi ukuran, fasilitas kustom, atau lokasi pengiriman unit..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 px-4 rounded-xl shadow-md shadow-orange-500/20 transition duration-200 text-xs uppercase tracking-wider mt-2 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" /> Kirim Permintaan Penawaran
                                </button>
                            </form>
                        </div>

                        {/* WIDGET 2: REKOMENDASI PRODUK CONTAINER PILIHAN */}
                        {random_products.length > 0 && (
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-3">
                                    <BoxIcon className="h-4 w-4 text-orange-500 stroke-[2.5]" />
                                    <h3 className="text-sm font-black uppercase tracking-wider">
                                        Rekomendasi Unit Pilihan
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {random_products.map((product) => (
                                        <Link 
                                            key={product.id} 
                                            href={`/katalog/${product.slug}`}
                                            className="group flex flex-col bg-slate-50 dark:bg-slate-900/40 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800 p-2 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-all shadow-xs"
                                        >
                                            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden relative bg-slate-200 dark:bg-slate-800 mb-2">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    onError={handleImageError}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                                                    {product.name}
                                                </h4>
                                                {product.category && (
                                                    <span className="text-[10px] font-bold text-slate-400 mt-1 block uppercase tracking-wide">
                                                        {product.category.name}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* WIDGET 3: TOPIK POPULER TAGS */}
                        {popular_tags.length > 0 && (
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-400 uppercase">
                                    <Tag className="h-4 w-4 stroke-[2.5]" />
                                    <span>Eksplorasi Kata Kunci</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {popular_tags.map((tag, index) => (
                                        <button 
                                            key={index} 
                                            type="button" 
                                            onClick={() => handleTagClick(tag)} 
                                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${filters.tag === tag ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 text-slate-400 dark:hover:bg-slate-800'}`}
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </FrontendLayout>
    );
}