import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    Clock, 
    Facebook, 
    Twitter, 
    Linkedin, 
    Eye, 
    MessageCircle, 
    Copy, 
    PhoneCall, 
    Tag,
    CheckCircle,
    Newspaper
} from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { FeaturedProductsBanner } from '../catalog';

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

export default function BlogDetail({ post, related_posts = [], random_products = [], seo }: BlogDetailProps) {
    const { getConfig } = useConfig();
    
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const readingTime = post.reading_time || Math.ceil(post.content.split(' ').length / 200);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

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

            <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
                
                {/* 🗺️ 1. NAVIGASI BREADCRUMB - Dibuat lebih besar dan kontras */}
                <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 py-4 font-semibold">
                    <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                        <Link href="/" className="hover:text-orange-600 hover:underline transition-colors">Beranda</Link>
                        <span className="text-zinc-400">/</span>
                        <Link href="/info" className="hover:text-orange-600 hover:underline transition-colors">Pusat Informasi</Link>
                        {post.category && (
                            <>
                                <span className="text-zinc-400">/</span>
                                <Link href={`/info?category=${post.category.slug}`} className="text-orange-600 hover:underline font-bold">
                                    {post.category.name}
                                </Link>
                            </>
                        )}
                        <span className="text-zinc-400">/</span>
                        <span className="text-zinc-800 dark:text-zinc-200 max-w-xs">{post.title}</span>
                    </div>
                </div>

                {/* --- CONTAINER UTAMA --- */}
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* ===================================================
                            KOLOM KIRI: KONTEN UTAMA (Fokus Keterbacaan Maksimal)
                           =================================================== */}
                        <article className="lg:col-span-8 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 rounded-2xl shadow-sm">
                            
                            {/* Judul & Info Kategori */}
                            <div className="space-y-4 mb-6">
                                {post.category && (
                                    <span className="inline-block text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 px-3.5 py-1.5 rounded-md">
                                        Kategori: {post.category.name}
                                    </span>
                                )}
                                
                                {/* Ukuran judul diperbesar untuk keterbacaan prima */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
                                    {post.title}
                                </h1>

                                {/* Meta Informasi - Font dinaikkan ke text-sm & warna lebih gelap */}
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium pt-4 border-t border-zinc-200 dark:border-zinc-850">
                                    <span>Ditulis oleh: <strong className="text-zinc-900 dark:text-zinc-100">{post.author?.name || 'Tim Redaksi'}</strong></span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={15} /> {formatDate(post.published_at)}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><Clock size={15} /> Estimasi {readingTime} menit baca</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><Eye size={15} /> Dilihat {post.views_count} kali</span>
                                </div>
                            </div>

                            {/* Gambar Utama - Dibuat besar dan jelas */}
                            {post.featured_image && (
                                <div className="mb-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                                    <img
                                        src={post.featured_image.startsWith('http') ? post.featured_image : `/storage/${post.featured_image}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => handleImageError(e, '/images/placeholder.png', post.title)}
                                        alt={post.title}
                                    />
                                </div>
                            )}

                            {/* Isi Konten Artikel - menggunakan kelas prose-lg, teks tebal/gelap, dan leading-loose */}
                            <div
                                className="tinymce-content prose prose-zinc prose-lg max-w-none text-zinc-950 dark:text-zinc-100 leading-loose font-normal"
                                style={{ fontSize: '1.15rem' }} // Mengamankan ukuran font agar nyaman dibaca tanpa kacamata dekat
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tag Artikel */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
                                        <Tag className="w-4 h-4" /> Topik Artikel Ini:
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="text-sm font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-850 dark:text-zinc-300 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bagikan Artikel - Tombol dibuat besar agar mudah ditekan */}
                            <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-bold text-zinc-900 dark:text-white text-sm uppercase tracking-wider mb-4">Bagikan Informasi Ini Ke Keluarga & Teman:</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <button 
                                        className="h-12 px-5 rounded-xl bg-[#1877F2] text-white font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm"
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}
                                    >
                                        <Facebook className="w-4 h-4 fill-white" /> Facebook
                                    </button>
                                    <button 
                                        className="h-12 px-5 rounded-xl bg-[#1DA1F2] text-white font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm"
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`)}
                                    >
                                        <Twitter className="w-4 h-4 fill-white" /> Twitter
                                    </button>
                                    <button 
                                        className="h-12 px-5 rounded-xl bg-[#0077B5] text-white font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm"
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)}
                                    >
                                        <Linkedin className="w-4 h-4 fill-white" /> LinkedIn
                                    </button>
                                    <button 
                                        className="h-12 px-5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm"
                                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`)}
                                    >
                                        <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp
                                    </button>
                                    <button 
                                        className="h-12 px-5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-300 transition-colors flex items-center gap-2"
                                        onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Alamat tautan berhasil disalin!'); }}
                                    >
                                        <Copy className="w-4 h-4" /> Salin Tautan
                                    </button>
                                </div>
                            </div>

                        </article>

                        {/* ===================================================
                            KOLOM KANAN: SIDEBAR (Simpel, Informatif, & Jelas)
                           =================================================== */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 w-full">
                            
                            {/* Kotak Hubungi Konsultasi WA (Ukuran Teks & Tombol Besar) */}
                            <div className="bg-zinc-900 text-white border border-zinc-800 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold tracking-tight text-white leading-snug">
                                        Butuh Bantuan atau Tanya Jawab?
                                    </h3>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        Hubungi tim pelayanan ramah kami secara langsung. Kami siap memandu dan menjawab seluruh pertanyaan Anda.
                                    </p>
                                    <a 
                                        href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`} 
                                        target="_blank"
                                        className="inline-flex w-full h-14 justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-base transition-colors shadow-md shadow-orange-500/20"
                                    >
                                        <PhoneCall className="w-5 h-5 mr-2" /> Hubungi Kami via WhatsApp
                                    </a>
                                </div>
                            </div>

                            {/* Kotak Unduh Profil Perusahaan */}
                            {getConfig('company_profile_pdf') && (
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
                                    <div className="space-y-4">
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                            Brosur Profil Perusahaan
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                            Unduh dokumen penjelasan produk resmi kami untuk dibaca secara luring (offline) atau dicetak di kertas.
                                        </p>
                                        <a 
                                            href={`/storage/${getConfig('company_profile_pdf')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full h-12 justify-center items-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-sm transition-colors"
                                        >
                                            Unduh Berkas Brosur (PDF)
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Keunggulan Kami */}
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-4 border-b border-zinc-150 dark:border-zinc-800 pb-2">
                                    Mengapa Memilih Kami?
                                </h3>
                                <ul className="space-y-3.5">
                                    {[
                                        'Kualitas Produk Standar Internasional', 
                                        'Harga Jujur, Transparan & Kompetitif', 
                                        'Bisa Pesan Sesuai Ukuran Keinginan', 
                                        'Garansi Pengiriman Aman & Tepat Waktu'
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                            <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Artikel Terkait */}
                            {related_posts.length > 0 && (
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-2 mb-4 border-b border-zinc-150 dark:border-zinc-800 pb-3">
                                        <Newspaper className="w-5 h-5 text-orange-500" />
                                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                                            Rekomendasi Artikel Lainnya
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4">
                                        {related_posts.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/${item.slug}`}
                                                className="group flex gap-4 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                                            >
                                                <div className="w-20 h-20 shrink-0 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden relative border border-zinc-200 dark:border-zinc-700">
                                                    <img
                                                        src={`${item.featured_image}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => handleImageError(e, '/images/placeholder.png', item.title)}
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex flex-col justify-center">
                                                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-200 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-orange-600 font-bold mt-1.5">
                                                        Klik untuk membaca ➔
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

                {/* Banner Rekomendasi Produk */}
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="bg-zinc-700 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                        <FeaturedProductsBanner products={random_products}/>
                    </div>
                </div>

            </div>
        </FrontendLayout>
    );
}