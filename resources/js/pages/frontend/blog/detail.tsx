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
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image?: string;
    published_at: string;
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
}

export default function BlogDetail({ post, related_posts = [] }: BlogDetailProps) {
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
                title={post.meta_title || post.title}
                description={post.meta_description || post.excerpt}
                image={post.featured_image}
                keywords={post.meta_keywords || post.tags?.join(', ') || ''}
            />

            {/* --- CONTAINER UTAMA --- */}
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 px-3">
                
                {/* 🗺️ 1. BREADCRUMB COMPACT */}
                <nav className="mb-6 flex max-w-full overflow-x-auto text-xs font-medium text-slate-500 scrollbar-none" aria-label="Breadcrumb">
                    <ol className="inline-flex min-w-max items-center space-x-2 whitespace-nowrap">
                        <li>
                            <Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link>
                        </li>
                        <li className="text-slate-300">/</li>
                        <li>
                            <Link href="/info" className="hover:text-orange-500 transition-colors">Artikel</Link>
                        </li>
                        {post.category && (
                            <>
                                <li className="text-slate-300">/</li>
                                <li>
                                    <Link href={`/info?category=${post.category.slug}`} className="hover:text-orange-500 transition-colors">
                                        {post.category.name}
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="text-slate-300">/</li>
                        <li className="text-slate-800 dark:text-slate-200 truncate max-w-xs font-semibold" aria-current="page">
                            {post.title}
                        </li>
                    </ol>
                </nav>

                {/* --- 2. ASYMMETRIC GRID (KONTEN UTAMA vs CTA SIDEBAR) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ===================================================
                        KOLOM KIRI: DETAIL ARTIKEL (lg:col-span-8)
                       =================================================== */}
                    <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl">

                        {/* Banner Gambar Utama */}
                        {post.featured_image && (
                            <div className="mb-6 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 aspect-video md:max-h-[440px] w-full">
                                <img
                                    src={post.featured_image.startsWith('http') ? post.featured_image : `/storage/${post.featured_image}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => handleImageError(e, '/images/placeholder.png', post.title)}
                                    alt={post.title}
                                />
                            </div>
                        )}

                        {/* Judul & Meta Informasi */}
                        <div className="space-y-4 mb-6">
                            {post.category && (
                                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-md">
                                    {post.category.name}
                                </span>
                            )}
                            
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 font-medium pt-1 border-y border-slate-50 dark:border-slate-800/50 py-3">
                                <span>Oleh <strong className="text-slate-700 dark:text-slate-200">{post.author?.name || 'Admin'}</strong></span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(post.published_at)}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={13} /> {readingTime} mnt baca</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Eye size={13} /> {post.views_count} Dilihat</span>
                            </div>
                        </div>

                        {/* Isi Konten Artikel */}
                        <div
                            className="tinymce-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Metadata Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                    <Tag className="w-3.5 h-3.5" /> Tags Artikel
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.map((tag, i) => (
                                        <span key={i} className="text-xs bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-700/50 font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tombol Share Media Sosial */}
                        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-3">Bagikan Artikel</h3>
                            <div className="flex gap-2 flex-wrap">
                                <Button size="sm" className="rounded-xl bg-[#1877F2] text-white hover:opacity-90 text-xs gap-1.5" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}>
                                    <Facebook className="w-3.5 h-3.5 fill-white" /> Facebook
                                </Button>
                                <Button size="sm" className="rounded-xl bg-[#1DA1F2] text-white hover:opacity-90 text-xs gap-1.5" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`)}>
                                    <Twitter className="w-3.5 h-3.5 fill-white" /> Twitter
                                </Button>
                                <Button size="sm" className="rounded-xl bg-[#0077B5] text-white hover:opacity-90 text-xs gap-1.5" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`)}>
                                    <Linkedin className="w-3.5 h-3.5 fill-white" /> LinkedIn
                                </Button>
                                <Button size="sm" className="rounded-xl bg-[#25D366] text-white hover:opacity-90 text-xs gap-1.5" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`)}>
                                    <MessageCircle className="w-3.5 h-3.5 fill-white" /> WhatsApp
                                </Button>
                                <Button size="sm" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 text-xs gap-1.5" onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link berhasil disalin!'); }}>
                                    <Copy className="w-3.5 h-3.5" /> Salin Link
                                </Button>
                            </div>
                        </div>

                    </article>

                    {/* ===================================================
                        KOLOM KANAN: STICKY PANEL CALL-TO-ACTION (lg:col-span-4)
                       =================================================== */}
                    {/* SISI KANAN: SIDEBAR (4 Kolom) */}
                    <aside className="lg:col-span-4 space-y-8">
                        
                        {/* Box: Hubungi Kami (CTA) */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 border border-orange-500/20 shadow-xl relative overflow-hidden group">
                            {/* Efek pendaran orange sangat halus di dalam card */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/15 transition duration-500" />
                            
                            {/* Icon dengan opacity yang diturunkan agar tenang */}
                            <PhoneCall className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-500/5 rotate-12 group-hover:scale-105 group-hover:text-orange-500/10 transition duration-500" />
                            
                            {/* Judul menggunakan warna putih */}
                            <h3 className="text-xl font-bold mb-3 text-white relative z-10 tracking-tight">
                                Butuh Konsultasi?
                            </h3>
                            
                            {/* Teks diubah ke abu-abu terang (slate-400) agar sangat nyaman dibaca */}
                            <p className="text-slate-200 text-sm mb-6 relative z-10 leading-relaxed">
                                Diskusikan kebutuhan spesifik Anda dengan tim ahli kami sekarang.
                            </p>
                            
                            {/* Tombol WhatsApp diubah menjadi Orange Solid dengan teks putih */}
                            <a 
                                href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`} 
                                target="_blank"
                                className="inline-flex w-full justify-center items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/10 hover:from-orange-600 hover:to-orange-700 transition duration-200 relative z-10 text-sm"
                            >
                                Chat via WhatsApp
                            </a>
                        </div>

                        {/* --- NEW BOX: Download Company Profile (Hanya Muncul Jika File Tersedia) --- */}
                        {getConfig('company_profile_pdf') && (
                            <div className="bg-gradient-to-br from-slate-800 to-slate-500 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-slate-800 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/5 transition duration-500" />
                                
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                                        Company Profile
                                    </h3>
                                    <p className="text-slate-200 text-sm mb-5 leading-relaxed">
                                        Unduh profil perusahaan kami untuk informasi lebih lengkap mengenai spesifikasi teknis dan legalitas.
                                    </p>
                                    <a 
                                        href={`/storage/${getConfig('company_profile_pdf')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full justify-center items-center gap-2 bg-slate-800 border border-slate-700 hover:border-orange-500/50 text-slate-200 hover:text-white font-semibold py-3 px-6 rounded-xl transition duration-200 text-sm"
                                    >
                                        Unduh Brosur PDF (Company Profile)
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Box: Keunggulan */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-5">Mengapa Memilih Kami?</h3>
                            <ul className="space-y-3">
                                {['Kualitas Standar Global', 'Harga Kompetitif', 'Custom Sesuai Kebutuhan', 'Pengiriman Cepat'].map((text, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Box: Artikel Lainnya */}
                        {related_posts.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <Newspaper className="w-5 h-5 text-orange-500" />
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Artikel Lainnya</h3>
                                </div>
                                
                                <div className="space-y-5">
                                    {related_posts.map((item) => (

                                    <Link
                                        key={item.id}
                                        href={`/${item.slug}`}
                                        className="group"
                                    >

                                        <div className="flex gap-4">
                                            <img
                                                src={`${item.featured_image}`}
                                                className="w-28 h-24 object-cover rounded"
                                                onError={(e) => handleImageError(e, '/images/placeholder.png', item.title)}
                                                alt={item.title}
                                            />
                                            <>
                                                <h4 className="font-semibold text-sm group-hover:text-blue-600">
                                                    {item.title}
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {item.excerpt}
                                                </p>
                                            </>
                                        </div>
                                    </Link>

                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>

                </div>

            </div>
        </FrontendLayout>
    );
}