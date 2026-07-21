import { useState } from 'react';
import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { 
    Calendar, 
    Clock, 
    Facebook, 
    Linkedin, 
    Eye, 
    MessageCircle, 
    Copy, 
    PhoneCall, 
    Tag,
    CheckCircle,
    Newspaper,
    Check,
    FolderOpen,
    BoxIcon
} from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { formatDateArticle } from '@/lib/utils';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image?: string;
    published_at: string;
    updated_at: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    author: {
        name: string;
    };
    views_count: number;
    reading_time?: number;
    tags?: string[];
    is_headline?: boolean;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface BlogDetailProps {
    post: Article;
    related_posts?: Article[];
    random_products: any[];
    seo: SeoHeadProps;
}

const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function BlogDetail({ post, related_posts = [], random_products = [], seo }: BlogDetailProps) {
    const { getConfig } = useConfig();
    const [copied, setCopied] = useState(false);


    const readingTime = post.reading_time || Math.ceil(post.content.split(' ').length / 200);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || post.meta_title || post.title}
                description={seo.description || post.meta_description || post.excerpt}
                image={seo.image || post.featured_image}   
                keywords={seo.keywords || post.meta_keywords}
                url={shareUrl}
                publishedAt={post.published_at}
                updatedAt={post.updated_at}
                robots={seo.robots || 'index,follow'}
                contentType={seo.contentType || 'website'}
            />

            {/* PURE WHITE BACKGROUND */}
            <div className="bg-white dark:bg-zinc-950 min-h-screen antialiased">
                
                {/* 🗺️ 1. NAVIGASI BREADCRUMB (Tanpa Border Bawah) */}
                <div className="w-full bg-white dark:bg-zinc-900 text-sm text-zinc-500 dark:text-zinc-400 py-3.5 font-medium">
                    <div className="max-w-7xl mx-auto px-3 md:px-7 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                        <span className="text-zinc-300 dark:text-zinc-700">/</span>
                        <Link href="/info" className="hover:text-orange-600 transition-colors">Pusat Informasi</Link>
                        {post.category && (
                            <>
                                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                                <Link href={`/info?category=${post.category.slug}`} className="text-orange-600 font-bold hover:underline">
                                    {post.category.name}
                                </Link>
                            </>
                        )}
                        <span className="text-zinc-300 dark:text-zinc-700">/</span>
                        <span className="text-zinc-800 dark:text-zinc-200 max-w-xs">{post.title}</span>
                    </div>
                </div>

                {/* --- MAIN CONTAINER --- */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* ===================================================
                            KOLOM KIRI: KONTEN UTAMA (Tanpa Border & Shadow)
                        =================================================== */}
                        <article className="lg:col-span-8 bg-white dark:bg-zinc-900 sm:p-2 space-y-6">
                            
                            {/* Judul & Info Kategori */}
                            <div className="space-y-4">
                                
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-950 dark:text-white leading-snug">
                                    {post.title}
                                </h1>

                                {/* Meta Informasi */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <span>Oleh: <strong className="text-zinc-900 dark:text-zinc-100">{post.author?.name || 'Tim Redaksi'}</strong></span>
                                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                    <span className="flex items-center gap-1.5 flex-nowrap"><Calendar className="w-4 h-4 text-zinc-400" /> {formatDateArticle(post.published_at)}</span>
                                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                    <span className="flex items-center gap-1.5 flex-nowrap"><Clock className="w-4 h-4 text-zinc-400" /> {readingTime} mnt baca</span>
                                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                    <span className="flex items-center gap-1.5 flex-nowrap"><Eye className="w-4 h-4 text-zinc-400" /> {post.views_count} dilihat</span>
                                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                    
                                    {post.category && (
                                        <Link href={"/info?category="+post.category.slug} className="inline-flex text-xs font-bold tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-700 gap-1 dark:text-orange-400 px-3 py-1.5 rounded-lg">
                                            <FolderOpen className="w-4 h-4" /> {post.category.name}
                                        </Link>
                                    )}
                                </div>

                            </div>

                            {/* Gambar Utama (Tanpa Border) */}
                            {post.featured_image && (
                                <div className="overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 aspect-[16/9]">
                                    <img
                                        src={post.featured_image.startsWith('http') ? post.featured_image : `/storage/${post.featured_image}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => handleImageError(e, '/images/placeholder.png', post.title)}
                                        alt={post.title}
                                    />
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-t border-b border-dashed border-zinc-100 dark:border-zinc-800/60">
                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Bagikan:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {/* Facebook */}
                                    <button 
                                        title="Bagikan ke Facebook"
                                        className="inline-flex h-9 w-9 cursor-pointer sm:h-auto sm:w-auto sm:px-3 rounded-lg items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 text-xs font-bold transition-all"
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}
                                    >
                                        <Facebook className="w-3.5 h-3.5 fill-current text-zinc-500 dark:text-zinc-400" />
                                        <span className="hidden sm:inline">Facebook</span>
                                    </button>

                                    {/* X */}
                                    <button 
                                        title="Bagikan ke X"
                                        className="inline-flex h-9 w-9 cursor-pointer sm:h-auto sm:w-auto sm:px-3 rounded-lg items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 text-xs font-bold transition-all"
                                        onClick={() => window.open(`https://x.com/intent/tweet?url=${shareUrl}`)}
                                    >
                                        <XIcon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                                        <span className="hidden sm:inline">X/Twitter</span>
                                    </button>

                                    {/* LinkedIn */}
                                    <button 
                                        title="Bagikan ke LinkedIn"
                                        className="inline-flex h-9 w-9 cursor-pointer sm:h-auto sm:w-auto sm:px-3 rounded-lg items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 text-xs font-bold transition-all"
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)}
                                    >
                                        <Linkedin className="w-3.5 h-3.5 fill-current text-zinc-500 dark:text-zinc-400" />
                                        <span className="hidden sm:inline">LinkedIn</span>
                                    </button>

                                    {/* WhatsApp */}
                                    <button 
                                        title="Bagikan ke WhatsApp"
                                        className="inline-flex h-9 w-9 cursor-pointer sm:h-auto sm:w-auto sm:px-3 rounded-lg items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 text-xs font-bold transition-all"
                                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`)}
                                    >
                                        <MessageCircle className="w-3.5 h-3.5 fill-current text-zinc-500 dark:text-zinc-400" />
                                        <span className="hidden sm:inline">WhatsApp</span>
                                    </button>

                                    {/* Copy Link */}
                                    <button 
                                        title="Salin Tautan"
                                        className={`inline-flex h-9 px-3 rounded-lg items-center justify-center gap-2 text-xs font-bold transition-all ${
                                            copied 
                                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950' 
                                                : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                        }`}
                                        onClick={handleCopyLink}
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
                                        <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Isi Konten Artikel */}
                            <div
                                className="tinymce-content prose prose-zinc prose-lg max-w-none text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal"
                                style={{ fontSize: '1.2rem' }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tag Artikel */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        <Tag className="w-3.5 h-3.5" /> Topik Artikel
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="text-xs font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-3 py-1.5 rounded-lg">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </article>

                        {/* ===================================================
                            KOLOM KANAN: SIDEBAR (Tanpa Border & Shadow)
                           =================================================== */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8 w-full">
                            
                            {/* Kotak Hubungi Konsultasi WA (Gaya Flat Bersih) */}
                            <div className="bg-zinc-950 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden">
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-xl font-extrabold tracking-tight text-white leading-snug">
                                        Dapatkan Penawaran Container
                                    </h3>
                                    <p className="text-zinc-100 text-sm font-medium leading-relaxed">
                                        Hubungi tim marketing pelayanan ramah kami secara langsung. Kami siap memandu dan memberikan penawaran harga terbaik & diskon bulan ini.
                                    </p>
                                    <a 
                                        href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`} 
                                        target="_blank"
                                        className="inline-flex w-full h-12 justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all active:scale-[0.98]"
                                    >
                                        <PhoneCall className="w-4 h-4 mr-2" /> Hubungi via WhatsApp
                                    </a>
                                </div>
                            </div>

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

                            {/* Kotak Unduh Profil Perusahaan (Flat Putih) */}
                            {getConfig('company_profile_pdf') && (
                                <div className="bg-white dark:bg-zinc-900 p-2 space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                                        Produk Container Kami
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        Unduh Company Profile kami untuk mendapatkan informasi produk kami.
                                    </p>
                                    <a 
                                        href={`/storage/${getConfig('company_profile_pdf')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full h-11 justify-center items-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl text-sm transition-colors"
                                    >
                                        Unduh Company Profile (PDF)
                                    </a>
                                </div>
                            )}

                            {/* Keunggulan Kami (Flat Putih) */}
                            <div className="bg-white dark:bg-zinc-900 p-2">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-400 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                                    Mengapa Memilih Kami?
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Kualitas Unit Standar Internasional', 
                                        'Harga Jujur, Transparan & Kompetitif', 
                                        'Bisa Pesan Sesuai Ukuran Keinginan', 
                                        'Garansi Pengiriman Aman & Tepat Waktu'
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                            <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Artikel Terkait (Flat Putih) */}
                            {related_posts.length > 0 && (
                                <div className="bg-white dark:bg-zinc-900 p-2 space-y-4">
                                    <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                                        <Newspaper className="w-4 h-4 text-orange-500" />
                                        <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-400">
                                            Rekomendasi Artikel
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        {related_posts.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/${item.slug}`}
                                                className="group flex gap-3 p-1.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                            >
                                                <div className="w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative">
                                                    <img
                                                        src={`${item.featured_image}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => handleImageError(e, '/images/placeholder.png', item.title)}
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex flex-col justify-center">
                                                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-200 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-orange-600 font-bold mt-1">
                                                        Baca Sekarang ➔
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>

                    </div>
                </div>

            </div>
        </FrontendLayout>
    );
}