import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
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

    return (
        <section className="relative py-24 bg-white text-slate-900 overflow-hidden border-t border-b border-slate-100">
            
            {/* 🕸️ Efek Latar Belakang Jaring Kotak-Kotak Tipis */}
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
                
                {/* Header Section (Menggunakan Config Dynamic CMS) */}
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

                {/* PILIHAN TABS (Navigasi Horizontal) */}
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
                <div className="space-y-8">
                    
                    {/* Deskripsi Atas Kategori Utama */}
                    {currentCategory.description && (
                        <div className="bg-slate-50/80 backdrop-blur-xs p-6 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <p className="text-slate-600 text-sm font-medium max-w-4xl leading-relaxed">
                                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: currentCategory.meta_description || currentCategory.description || ''  }} />
                            </p>
                            <Link
                                href={`/produk/${currentCategory.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 uppercase shrink-0 tracking-wider group"
                            >
                                <span>Lihat Katalog</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    )}

                    {/* GRID BROSUR (Setiap kartu dibungkus komponen <Link> agar Full Clickable) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {currentCategory.items && currentCategory.items.length > 0 ? (
                            currentCategory.items.map((item, key) => {
                                const isFallbackItem = !item.image;
                                const targetUrl = item.slug ? `/produk/${item.slug}` : `/katalog?category=${currentCategory.slug}`;

                                if (isFallbackItem) {
                                    return (
                                        <Link
                                            key={key}
                                            href={item.href}
                                            className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50/50 shadow-xs transition-all text-center min-h-[180px] group"
                                        >
                                            <div className="p-3 rounded-xl bg-white text-orange-500 border border-slate-200/60 mb-2 group-hover:scale-110 transition-transform shadow-xs">
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
                                        className="flex flex-col sm:flex-row gap-5 items-start bg-white border border-slate-200/70 p-4 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 text-left cursor-pointer group"
                                    >
                                        {/* Sisi Kiri: Gambar Brosur */}
                                        <div className="w-full sm:w-[38%] aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200/50">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                onError={handleImageError}
                                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-104"
                                            />
                                        </div>

                                        {/* Sisi Kanan: Spesifikasi */}
                                        <div className="w-full sm:w-[62%] flex flex-col justify-between h-full min-h-[130px] pt-1">
                                            <div className="space-y-1.5">
                                                <h3 className="text-lg font-bold text-slate-950 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium">
                                                    <div className="space-y-4" dangerouslySetInnerHTML={{ __html: item.meta_description || item.description || ''  }} />
                                                </p>
                                            </div>

                                            {/* Footer Brosur */}
                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                {/* <div className="flex gap-1.5">
                                                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                                        ISO Standard & Support 24/7 & Terpercaya
                                                    </span>
                                                </div> */}
                                                <div className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-orange-600 gap-1 transition-colors">
                                                    <span>Lihat Detail</span>
                                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                                Tidak ada sub-unit dalam kategori ini.
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}