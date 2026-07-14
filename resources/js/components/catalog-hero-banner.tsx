import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ArrowRight, LayoutDashboard, MessageSquare, FileText, Search, ArrowDown } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { useConfig } from '@/utils/config';

interface SubCategoryItem {
    name: string;
    slug?: string;
    description?: string;
    meta_description?: string;
    meta_title?: string;
    image?: string;
    href: string;
}

interface RootCategory {
    title: string;
    slug: string;
    description: string;
    meta_description?: string;
    meta_title?: string;
    image?: string;
    items: SubCategoryItem[];
}

export default function CatalogHeroBanner() {
    const { productCategories } = usePage().props as unknown as { productCategories: RootCategory[] };
    const { getConfig } = useConfig();
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (productCategories && productCategories.length > 0) {
            const containerIndex = productCategories.findIndex(cat => 
                cat.title.toLowerCase().includes('container')
            );
            if (containerIndex !== -1) {
                setActiveTab(containerIndex);
            }
        }
    }, [productCategories]);

    // Fungsi untuk scroll halus ke bagian katalog filter di bawah
    const scrollToCatalog = () => {
        const catalogSection = document.getElementById('catalog-product-list');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!productCategories || productCategories.length === 0) return null;

    const currentCategory = productCategories[activeTab];
    const items = currentCategory.items || [];

    // Logika dinamis untuk grid 4 kolom di laptop/desktop
    const remainder = items.length % 4;
    const emptySlotsCount = remainder === 0 ? 0 : 4 - remainder;

    return (
        <section className="relative py-6 bg-white text-slate-900 border-b border-slate-100 w-full">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Container Full Width menyesuaikan Search Bar di atasnya */}
            <div className="w-full px-2 relative z-10 space-y-6">
                
                {/* 1. SEKSYEN TAB DI ATAS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="border-l-2 border-orange-500 pl-3">
                        <span className="text-xl font-black tracking-widest text-orange-600 uppercase block">
                            Mau Cari Apa?
                        </span>
                        <h3 className="text-lg font-medium text-slate-950">
                            Pilihan lengkap Unit Kontainer yang kamu butuhkan ada di sini
                        </h3>
                    </div>

                    <div className="hidden md:block flex-1 h-px bg-orange-400/40 rounded-xl mx-10"></div>

                    {/* Tab Navigation */}
                    <div className="flex overflow-x-auto p-1 bg-slate-50 rounded-xl border border-slate-200/60 gap-1 scrollbar-none">
                        {productCategories.map((category, index) => {
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={category.slug || index}
                                    type="button"
                                    onClick={() => setActiveTab(index)}
                                    className={`px-5 py-2.5 text-xs font-bold rounded-lg tracking-wide uppercase transition-all duration-200 whitespace-nowrap active:scale-98 ${
                                        isActive
                                            ? 'bg-slate-950 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                                    }`}
                                >
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. SEAMLESS GALLERY GRID (4 Kolom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
                    {items.length > 0 ? (
                        <>
                            {/* RENDER PRODUK */}
                            {items.map((item, key) => {
                                const isFallbackItem = !item.image;
                                const targetUrl = item.slug ? `/produk/${item.slug}` : `/katalog?category=${currentCategory.slug}`;

                                if (isFallbackItem) {
                                    return (
                                        <Link
                                            key={key}
                                            href={item.href}
                                            className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-all text-center min-h-[200px] border border-white group relative"
                                        >
                                            <div className="p-3 rounded-xl bg-white text-orange-500 border border-slate-200/60 mb-2 group-hover:scale-110 transition-transform">
                                                <LayoutDashboard className="h-5 w-5" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-700 group-hover:text-orange-600 uppercase tracking-wider">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.slug || key}
                                        href={targetUrl}
                                        className="relative flex flex-col aspect-[4/3] w-full overflow-hidden bg-slate-900 group cursor-pointer border border-white"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            onError={handleImageError}
                                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:opacity-85"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                                        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="space-y-0.5">
                                                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <div className="text-sm text-slate-100 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                                    <div dangerouslySetInnerHTML={{ __html: item.meta_description || item.description || ''  }} />
                                                </div>
                                            </div>

                                            <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                                                    Lihat Unit
                                                </span>
                                                <div className="inline-flex items-center text-xs font-bold text-orange-400 gap-1">
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* DYNAMIC CTA 1: WA - Hijau Khas yang Ramah Orang Tua */}
                            {emptySlotsCount >= 1 && (
                                <a
                                    href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`}  
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex flex-col justify-between p-6 aspect-[4/3] w-full overflow-hidden bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 cursor-pointer border border-white group"
                                >
                                    {/* 🌟 WATERMARK IKON DI BELAKANG (Hoverable & Aesthetic) */}
                                    <MessageSquare className="absolute -right-4 -bottom-4 h-42 w-42 text-white opacity-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12" />

                                    <div className="relative z-10 flex items-start justify-between">
                                        <div className="p-3 rounded-xl bg-white/10 text-white border border-white/20 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                            <MessageSquare className="h-6 w-6 fill-white/10" />
                                        </div>
                                        <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                                            Melalui WA
                                        </span>
                                    </div>
                                    
                                    <div className="relative z-10 space-y-1 mt-auto">
                                        <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight text-white">
                                            Hubungi WhatsApp <br />Tim Ahli Kami
                                        </h3>
                                        <p className="text-sm text-emerald-100/90 font-medium">
                                            Tekan di sini untuk tanya-tanya langsung
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-3 mt-3 border-t border-white/20 flex items-center justify-between font-bold text-xs text-white">
                                        <span>Respon Cepat</span>
                                        <div className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            <span>Buka WA</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </a>
                            )}

                            {/* DYNAMIC CTA 2: RFQ - Oranye dengan Ikon Raksasa di Background */}
                            {emptySlotsCount >= 2 && (
                                <Link
                                    href="/kontak"
                                    className="relative flex flex-col justify-between p-6 aspect-[4/3] w-full overflow-hidden bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 cursor-pointer border border-white group"
                                >
                                    {/* 🌟 WATERMARK IKON DI BELAKANG (Hoverable & Aesthetic) */}
                                    <FileText className="absolute -right-4 -bottom-4 h-42 w-42 text-white opacity-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12" />

                                    <div className="relative z-10 flex items-start justify-between">
                                        <div className="p-3 rounded-xl bg-white/10 text-white border border-white/20 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                                            Isi Formulir
                                        </span>
                                    </div>

                                    <div className="relative z-10 space-y-1 mt-auto">
                                        <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight text-white">
                                            Minta Penawaran <br />& Brosur Harga
                                        </h3>
                                        <p className="text-sm text-orange-100/90 font-medium">
                                            Tekan untuk estimasi biaya pembuatan
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-3 mt-3 border-t border-white/20 flex items-center justify-between font-bold text-xs text-white">
                                        <span>Gratis Estimasi</span>
                                        <div className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            <span>Minta Harga</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* DYNAMIC CTA 3: INTERAKTIF SCROLL DOWN - Biru dengan Ikon Raksasa di Background */}
                            {emptySlotsCount >= 3 && (
                                <button
                                    type="button"
                                    onClick={scrollToCatalog}
                                    className="relative flex flex-col justify-between p-6 aspect-[4/3] w-full overflow-hidden bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 cursor-pointer border border-white text-left outline-hidden group"
                                >
                                    {/* 🌟 WATERMARK IKON DI BELAKANG (Hoverable & Aesthetic) */}
                                    <Search className="absolute -right-4 -bottom-4 h-42 w-42 text-white opacity-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12" />

                                    <div className="relative z-10 flex items-start justify-between">
                                        <div className="p-3 rounded-xl bg-white/10 text-white border border-white/20 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                            <Search className="h-6 w-6" />
                                        </div>
                                        <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                                            Lihat Kebawah
                                        </span>
                                    </div>

                                    <div className="relative z-10 space-y-1 mt-auto">
                                        <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight text-white">
                                            Cari Produk Lebih <br />Lengkap di Bawah
                                        </h3>
                                        <p className="text-sm text-blue-100/90 font-medium">
                                            Tekan untuk geser otomatis ke daftar produk
                                        </p>
                                    </div>

                                    <div className="relative z-10 pt-3 mt-3 border-t border-white/20 flex items-center justify-between font-bold text-xs text-white">
                                        <span>Gunakan Filter Pencarian</span>
                                        <div className="inline-flex items-center gap-1 animate-bounce">
                                            <span>Geser</span>
                                            <ArrowDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="col-span-full text-center py-12 bg-slate-50 text-slate-400 text-sm">
                            Tidak ada sub-unit dalam kategori ini.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}