import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { 
    Calendar, 
    Facebook, 
    Linkedin, 
    Eye, 
    Copy, 
    CheckCircle,
    Check,
    Star,
    Plane,
    Hotel,
    MapPin,
    Share2,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowRight,
    X,           // Tambahan icon Close/X
    ZoomIn       // Tambahan icon ZoomIn
} from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import QuoteMiniFormCard from '@/components/quote-mini-form-card';
import { Button } from '@headlessui/react';
import CtaSection from '@/components/cta-section';

interface PortfolioPost {
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
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface PortfolioDetailProps {
    post: PortfolioPost;
    related_posts?: PortfolioPost[];
    random_products: any[];
    seo: SeoHeadProps;
}

const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function PortfolioDetail({ post, related_posts = [], random_products = [], seo }: PortfolioDetailProps) {
    const { getConfig } = useConfig();
    const [copied, setCopied] = useState(false);
    const { appPages = {} } = usePage().props as any;

    // State untuk menampung data gambar yang sedang dibuka di modal zoom
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    // Lock scroll body ketika modal zoom sedang terbuka
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    // Tutup modal jika menekan tombol Escape (ESC)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Data item untuk slider grid card
    const gridSliderItems = [
        {
            id: 1,
            title: "Sixty Minute Climb",
            description: "Climbing Endurance",
            image: post.featured_image || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000&auto=format&fit=crop',
            featuredBg: true
        },
        {
            id: 2,
            title: "Ninety Second Sprint",
            description: "Anaerobic",
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
            featuredBg: false
        },
        {
            id: 3,
            title: "Beginner Training Plan",
            description: "Endurance",
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
            featuredBg: false
        },
        {
            id: 4,
            title: "Advanced Performance",
            description: "Neuromuscular",
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
            featuredBg: false
        },
        {
            id: 5,
            title: "Desain Responsif",
            description: "Optimasi Tampilan",
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
            featuredBg: false
        }
    ];

    // State navigasi halaman/geser grid slider
    const [sliderPage, setSliderPage] = useState(0);
    const itemsPerPage = 6;
    const maxPages = Math.ceil(gridSliderItems.length / itemsPerPage);

    const nextGridSlide = () => {
        setSliderPage((prev) => (prev + 1) % maxPages);
    };

    const prevGridSlide = () => {
        setSliderPage((prev) => (prev - 1 + maxPages) % maxPages);
    };

    const visibleGridItems = gridSliderItems.slice(sliderPage * itemsPerPage, (sliderPage + 1) * itemsPerPage);

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

            <div className="bg-white dark:bg-zinc-950 min-h-screen antialiased selection:bg-orange-500 selection:text-white">

                <div className="max-w-full mx-auto px-4 sm:px-6 py-8">
                    <div className="space-y-4 text-center">
                        <h1 className="text-3xl sm:text-5xl xl:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                            {post.title}
                        </h1>
                    </div>
                    <div className="flex justify-center items-center pt-6">
                        <a 
                            href="#formQuote" 
                            className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-lg font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <span>Minta Penawaran</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1.5" />
                        </a>
                    </div>
                </div>

                <div className="max-w-full mx-auto px-4 sm:px-10 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* KIRI: DETAIL ARTIKEL / KONTEN PROYEK */}
                        <div className="lg:col-span-8 space-y-10">

                            <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                                            Galeri & Tampilan Visual Proyek
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={prevGridSlide}
                                            className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white text-zinc-900 dark:text-white flex items-center justify-center transition cursor-pointer border border-zinc-200 dark:border-zinc-800"
                                            aria-label="Previous Slide"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={nextGridSlide}
                                            className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-orange-500 hover:text-white text-zinc-900 dark:text-white flex items-center justify-center transition cursor-pointer border border-zinc-200 dark:border-zinc-800"
                                            aria-label="Next Slide"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Container Grid Slider Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                                    {visibleGridItems.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className={`rounded-3xl p-6 flex flex-col justify-between transition duration-300 relative overflow-hidden h-[460px] ${
                                                item.featuredBg 
                                                    ? 'bg-orange-500 text-white dark:bg-orange-500' 
                                                    : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white'
                                            }`}
                                        >
                                            <div className="space-y-1.5 z-10">
                                                <h3 className="text-2xl font-bold tracking-tight leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className={`text-xs font-medium ${item.featuredBg ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Gambar Preview dengan fitur Klik Popup/Zoom */}
                                            <div 
                                                onClick={() => setSelectedImage({ src: item.image, title: item.title })}
                                                className="relative mt-6 w-full aspect-square rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 group cursor-pointer"
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                                    onError={handleImageError} 
                                                />
                                                {/* Overlay Efek Hover Zoom */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg transform group-hover:scale-110 transition-transform">
                                                        <ZoomIn className="w-6 h-6" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Share Tombol */}
                            <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                    <Share2 className="w-4 h-4 text-orange-500" /> Bagikan Halaman Ini:
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`)} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                        <Facebook className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => window.open(`https://x.com/intent/tweet?url=${shareUrl}`)} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`)} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleCopyLink} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-orange-500 hover:text-white transition cursor-pointer">
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* KANAN: FORM QUOTE KECIL & STICKY */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 w-full">
                            <div className="space-y-4 pt-2 lg:px-5">
                                <h2 className="text-xl font-black text-zinc-900 dark:text-white">Tentang Proyek</h2>
                                <div
                                    className="tinymce-content prose prose-zinc prose-lg max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                            <div id="formQuote">
                                <QuoteMiniFormCard pageName={appPages.PORTFOLIO_SHOW} />    
                            </div>
                        </aside>

                    </div>
                </div>
            </div>

            {/* =========================================================
                MODAL POPUP LIGHTBOX (ZOOM VIEW LARGE)
               ========================================================= */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[9999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Container Gambar Modal */}
                    <div 
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup ketika area gambar diklik
                    >
                        {/* Tombol Close (X) */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 sm:-right-4 text-white hover:text-orange-500 bg-zinc-800/80 hover:bg-zinc-800 p-2.5 rounded-full transition cursor-pointer z-10"
                            aria-label="Tutup"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Tampilan Gambar Besar */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 max-h-[80vh] w-auto">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-full max-h-[80vh] object-contain select-none"
                                onError={handleImageError}
                            />
                        </div>

                        {/* Caption / Title Gambar */}
                        {selectedImage.title && (
                            <div className="mt-4 text-center">
                                <p className="text-white text-lg font-bold tracking-wide">
                                    {selectedImage.title}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </FrontendLayout>
    );
}