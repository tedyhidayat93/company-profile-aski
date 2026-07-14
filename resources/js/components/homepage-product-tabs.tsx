import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ArrowRight, LayoutDashboard, MessageSquare, FileText } from 'lucide-react';
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

export default function HomepageProductTabs() {
    const { getConfig } = useConfig();
    const { productCategories } = usePage().props as unknown as { productCategories: RootCategory[] };
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

    if (!productCategories || productCategories.length === 0) return null;

    const currentCategory = productCategories[activeTab];
    const items = currentCategory.items || [];

    // Logika menghitung sisa slot kosong agar total grid pas kelipatan 3
    const remainder = items.length % 3;
    const emptySlotsCount = remainder === 0 ? 0 : 3 - remainder;

    return (
        <section className="relative py-24 bg-white text-slate-900 overflow-hidden border-t border-b border-slate-100">
            
            <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                }}
            />
            
            {/* Soft Ambient Radial Blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-5xl mx-auto mb-16 space-y-3">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest text-orange-600 uppercase bg-orange-50 rounded-full border border-orange-200">
                        Product Lineup
                    </span>
                    <h2 className="text-xl md:text-4xl font-black text-slate-950 tracking-tight">
                        {getConfig('products_title', 'Produk Kami')}
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        {getConfig('products_description', 'Temukan produk-produk kontainer untuk kebutuhanmu')}
                    </p>
                </div>

                {/* PILIHAN TABS */}
                <div className="flex justify-center mb-14">
                    <div className="inline-flex flex-wrap p-1.5 bg-slate-50 rounded-2xl border border-slate-200/70 shadow-sm gap-1">
                        {productCategories.map((category, index) => {
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={category.slug || index}
                                    type="button"
                                    onClick={() => setActiveTab(index)}
                                    className={`px-6 py-3 text-xs md:text-sm font-bold rounded-xl tracking-wide uppercase transition-all duration-300 active:scale-95 ${
                                        isActive
                                            ? 'bg-slate-900 text-white shadow-md'
                                            : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                                    }`}
                                >
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* PANEL KONTEN TAB */}
                <div className="space-y-6">
                    
                    {/* Deskripsi Atas Kategori Utama */}
                    {currentCategory.description && (
                        <div className="bg-slate-50/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-slate-600 text-sm font-medium max-w-4xl leading-relaxed">
                                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: currentCategory.meta_description || currentCategory.description || ''  }} />
                            </div>
                            <Link
                                href={`/produk/${currentCategory.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 uppercase shrink-0 tracking-wider group"
                            >
                                <span>Lihat Katalog</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    )}

                    {/* SEAMLESS GALLERY GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        {items.length > 0 ? (
                            <>
                                {/* RENDER PRODUK ASLI */}
                                {items.map((item, key) => {
                                    const isFallbackItem = !item.image;
                                    const targetUrl = item.slug ? `/produk/${item.slug}` : `/katalog?category=${currentCategory.slug}`;

                                    if (isFallbackItem) {
                                        return (
                                            <Link
                                                key={key}
                                                href={item.href}
                                                className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-all text-center min-h-[250px] border border-slate-200/40 group relative"
                                            >
                                                <div className="p-3 rounded-xl bg-white text-orange-500 border border-slate-200/60 mb-3 group-hover:scale-110 transition-transform shadow-xs">
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
                                            className="relative flex flex-col aspect-[4/3] w-full overflow-hidden bg-slate-900 group cursor-pointer border border-slate-100"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                onError={handleImageError}
                                                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:opacity-85"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                                            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                <div className="space-y-1">
                                                    <h3 className="text-base font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                                                        {item.name}
                                                    </h3>
                                                    <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                                        <div dangerouslySetInnerHTML={{ __html: item.meta_description || item.description || ''  }} />
                                                    </div>
                                                </div>

                                                <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                                                        Klik untuk detail
                                                    </span>
                                                    <div className="inline-flex items-center text-xs font-bold text-orange-400 gap-1">
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}

                                {/* DYNAMIC CTA GENERATOR FOR EMPTY SLOTS */}
                                {emptySlotsCount >= 1 && (
                                    <a
                                        href="https://wa.me/628xxxxxxxxxx?text=Halo%20saya%20ingin%20konsultasi%20mengenai%20produk%20kontainer..."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex flex-col justify-between p-6 aspect-[4/3] w-full overflow-hidden bg-slate-950 text-white group cursor-pointer border border-slate-100"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-slate-950 to-slate-950" />
                                        
                                        {/* Icon dan Label */}
                                        <div className="relative z-10">
                                            <div className="inline-flex p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <MessageSquare className="h-5 w-5" />
                                            </div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                                                Butuh Kustomisasi?
                                            </h4>
                                            <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1 leading-snug">
                                                Hubungi Tim Ahli <br />Desain Kami
                                            </h3>
                                        </div>

                                        {/* Bottom Trigger */}
                                        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-[11px] text-slate-400 font-medium">
                                                Konsultasi Gratis Sekarang
                                            </span>
                                            <div className="inline-flex items-center text-xs font-bold text-orange-400 gap-1 group-hover:translate-x-1 transition-transform">
                                                <span>Chat WA</span>
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </a>
                                )}

                                {emptySlotsCount >= 2 && (
                                    <Link
                                        href="/hubungi-kami"
                                        className="relative flex flex-col justify-between p-6 aspect-[4/3] w-full overflow-hidden bg-slate-950 text-white group cursor-pointer border border-slate-900/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-slate-950 to-slate-950" />
                                        
                                        {/* Icon dan Label */}
                                        <div className="relative z-10">
                                            <div className="inline-flex p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                                                B2B & Proyek Besar
                                            </h4>
                                            <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1 leading-snug">
                                                Minta Penawaran <br />Harga Resmi
                                            </h3>
                                        </div>

                                        {/* Bottom Trigger */}
                                        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-[11px] text-slate-400 font-medium">
                                                Dapatkan Estimasi Biaya
                                            </span>
                                            <div className="inline-flex items-center text-xs font-bold text-orange-400 gap-1 group-hover:translate-x-1 transition-transform">
                                                <span>Form RFQ</span>
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <div className="col-span-full text-center py-12 bg-slate-50 text-slate-400 text-sm">
                                Tidak ada sub-unit dalam kategori ini.
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}