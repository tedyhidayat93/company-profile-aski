import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowRight, FileDown, Layers, ShieldCheck } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';

interface SubCategoryItem {
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    href: string;
}

interface RootCategory {
    title: string;
    slug: string;
    description: string;
    image?: string;
    items: SubCategoryItem[];
}

interface Props {
    seo: any;
}

export default function ProductIndex({ seo }: Props) {
    const { getConfig } = useConfig();
    const { productCategories } = usePage().props as unknown as { productCategories: RootCategory[] };

    return (
        <FrontendLayout>
            <SeoHead title={seo?.title || 'Katalog Produk'} description={seo?.description} />

            {/* Hero Header Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/80 to-slate-900 py-24 px-4 border-b border-orange-500/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-orange-400 uppercase bg-orange-500/10 rounded-full mb-4 border border-orange-500/20">
                        Product Specification
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {getConfig('product_title', 'Katalog')}{' '}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Produk Kami
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-slate-200 text-base md:text-lg leading-relaxed font-medium">
                        Eksplorasi lini produk kontainer terbaik kami. Dirancang dengan presisi dan standar inspeksi tinggi untuk kebutuhan industri Anda.
                    </p>
                </div>
            </section>

            {/* Hybrid Brochure Grid Layout */}
            <div className="w-full">
                {productCategories && productCategories.length > 0 ? (
                    productCategories.map((rootCategory, index) => {
                        const isEven = index % 2 === 0;
                        const bgClass = isEven 
                            ? 'bg-white dark:bg-slate-900' 
                            : 'bg-slate-50/70 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-900';

                        return (
                            <section key={rootCategory.slug || index} className={`py-16 md:py-20 ${bgClass}`}>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    
                                    {/* Header Kategori Utama */}
                                    <div className="mb-12 border-l-4 border-orange-500 pl-5">
                                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                                            {rootCategory.title}
                                        </h2>
                                        {rootCategory.description && (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                                                {rootCategory.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* GRID BROSUR 2 KOLOM (Memotong panjang halaman hingga 50%) */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                                        {rootCategory.items.map((item, key) => {
                                            if (!item.image) return null;
                                            const targetUrl = item.slug ? `/katalog/${item.slug}` : `/katalog/${rootCategory.slug}`;

                                            return (
                                                <div 
                                                    key={item.slug || key}
                                                    className="flex flex-col sm:flex-row gap-6 items-start bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                                                >
                                                    {/* Sisi Kiri: Gambar Mini Brosur (Tetap Elegan) */}
                                                    <div className="w-full sm:w-2/5 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200/40">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            loading="lazy"
                                                            onError={handleImageError}
                                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    {/* Sisi Kanan: Teks & Info Teknis */}
                                                    <div className="w-full sm:w-3/5 flex flex-col justify-between h-full space-y-4">
                                                        <div className="space-y-1.5">
                                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                                                {item.description || 'Unit kontainer standarisasi tinggi dengan proteksi penuh dan opsi modifikasi custom sesuai kebutuhan bisnis.'}
                                                            </p>
                                                        </div>

                                                        {/* Badge Kecil Pengganti Bullet Point */}
                                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                                            <span className="inline-flex items-center text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                                                                ISO Standard
                                                            </span>
                                                            <span className="inline-flex items-center text-[10px] font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded">
                                                                Cargo Worthy
                                                            </span>
                                                        </div>

                                                        {/* Link Aksi */}
                                                        <div className="pt-2">
                                                            <Link
                                                                href={targetUrl}
                                                                className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 gap-1 group/btn transition-colors"
                                                            >
                                                                <span>Spesifikasi Unit</span>
                                                                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </section>
                        );
                    })
                ) : (
                    <div className="max-w-7xl mx-auto px-4 py-24">
                        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            Belum ada spesifikasi produk yang tersedia saat ini.
                        </div>
                    </div>
                )}
            </div>

            <CtaSection />
        </FrontendLayout>
    );
}