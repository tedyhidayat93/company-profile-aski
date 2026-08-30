import { useState, useMemo } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Search, X, RotateCcw, Sparkles, LayoutGrid, List as ListIcon, ArrowUpRight, Calendar, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { Pagination } from '@/components/ui/pagination';
import { formatDateArticle } from '@/lib/utils';

// --- SWIPER CAROUSEL IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

type PortfolioPost = {
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
    all_posts: { data: PortfolioPost[]; links: any; };
    filters: { search: string; tag: string; };
    seo: SeoHeadProps;
};

export default function PortfolioIndex({ 
    all_posts = { data: [], links: [] }, 
    filters = { search: '', tag: '' },
    seo
}: Props) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        tag: filters.tag || '',
    });

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const isFiltered = useMemo(() => {
        return !!(filters.search || filters.tag);
    }, [filters]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        get('/portofolio', {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsSearching(false);
                setIsSearchOpen(false);
            }
        });
    };

    const handleClearFilters = () => {
        setData({ search: '', tag: '' });
        router.get('/portofolio', { search: '', tag: '' }, { preserveState: true, preserveScroll: true });
    };

    // Data dummy fallback jika post kosong untuk menjaga visual gallery slider
    const featuredProjects = all_posts.data.length > 0 ? all_posts.data.slice(0, 6) : [
        { id: 1, title: 'Modifikasi Office Container 20ft', slug: '#', featured_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000' },
        { id: 2, title: 'Commercial Store Unit Container', slug: '#', featured_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000' },
        { id: 3, title: 'Modular Housing Structure', slug: '#', featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000' },
    ];

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />

            {/* 🔍 SEARCH MODAL / OVERLAY */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-start justify-center pt-28 px-4 transition-all">
                    <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Pencarian Portofolio
                            </span>
                            <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={handleSearch} className="flex gap-2.5">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    type="text"
                                    autoFocus
                                    placeholder="Cari portofolio proyek kontainer..."
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                    className="h-12 pl-11 text-sm rounded-2xl bg-slate-50 border-slate-200/80 focus-visible:ring-orange-500 font-medium"
                                />
                            </div>
                            <Button type="submit" className="h-12 rounded-2xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-6 shadow-lg shadow-orange-500/20 cursor-pointer">
                                {isSearching ? 'Mencari...' : 'Cari'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8 text-slate-900 font-sans antialiased">

                {/* 🎨 MINIMALIST ART GALLERY HERO SECTION (SERUPA GAMBAR REFERENSI) */}
                <section className="relative py-12 sm:py-16 overflow-hidden bg-white rounded-3xl mb-16">
                    
                    {/* Header Typography Art Style */}
                    <div className="max-w-8xl mx-auto text-center space-y-4 px-4 mb-10">
                        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                            <span>PORTOFOLIO KAMI</span>
                            <span className="w-8 h-[1px] bg-slate-300 inline-block" />
                            <span>Inovasi Kontainer</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 uppercase leading-none font-serif">
                            SEBUAH EXPLORASI <br />
                            <span className="font-sans font-black tracking-normal text-slate-900">DALAM KONTAINER</span>
                            <sup className="text-xs font-normal align-super text-slate-400 ml-1">©</sup>
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium tracking-wide leading-relaxed pt-2">
                            Galeri portofolio proyek modifikasi kontainer dan struktur modular yang telah berhasil kami bangun dan selesaikan.
                        </p>
                    </div>

                    {/* 🔄 HORIZONTAL SLIDER / CAROUSEL GALLERY */}
                    <div className="relative w-full max-w-7xl mx-auto px-4">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={3}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            coverflowEffect={{
                                rotate: 12,
                                stretch: 0,
                                depth: 160,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            navigation={{
                                nextEl: '.swiper-btn-next',
                                prevEl: '.swiper-btn-prev',
                            }}
                            modules={[EffectCoverflow, Navigation, Autoplay]}
                            className="w-full py-6 !overflow-visible"
                        >
                            {featuredProjects.map((item: any) => (
                                <SwiperSlide key={item.id} className="!w-[280px] sm:!w-[340px] md:!w-[380px]">
                                    <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xl transition-all duration-500">
                                        <img 
                                            src={item.featured_image.startsWith('http') ? item.featured_image : `/storage/${item.featured_image}`} 
                                            alt={item.title}
                                            onError={handleImageError}
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="font-bold text-lg leading-snug line-clamp-2 text-white">{item.title}</h3>
                                            {item.slug !== '#' && (
                                                <Link href={`/portofolio/${item.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white pt-1">
                                                    <span>Lihat Detail</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation Arrows Minimalis */}
                        <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-2 -right-2 z-20 pointer-events-none">
                            <button className="swiper-btn-prev w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 text-slate-800 flex items-center justify-center hover:bg-slate-950 hover:text-white transition pointer-events-auto cursor-pointer">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button className="swiper-btn-next w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 text-slate-800 flex items-center justify-center hover:bg-slate-950 hover:text-white transition pointer-events-auto cursor-pointer">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </section>
            </main>
        </FrontendLayout>
    );
}