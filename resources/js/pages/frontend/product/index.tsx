import { Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowRight } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';
import PageHeader from '@/components/page-header';

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

interface Props {
    seo: SeoHeadProps;
}

export default function ProductIndex({ seo }: Props) {
    const { getConfig } = useConfig();
    const { productCategories } = usePage().props as unknown as { productCategories: RootCategory[] };

    return (
        <FrontendLayout>

            <SeoHead
                title={seo.title || getConfig('services_meta_title', 'Produk Kami')}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />
    
            <PageHeader 
                badge={getConfig('site_name', 'Alumoda')}
                titleNormal="Sewa Kontainer & Modifikasi"
                titleGradient="Berkualitas & Terpercaya"
                description="Menerima sewa kontainer tahunan & bulanan, modifikasi custom, dan solusi ruang kerja logistik dengan standar kualitas terbaik. Hubungi tim ahli kami untuk konsultasi dan penawaran terbaik."
                imageSrc="/images/sketch-container.png"
                imageAlt={getConfig('site_tagline', 'Alumoda') + ' - ' + getConfig('site_name', 'Alumoda') + ' - Kontainer Modifikasi & Solusi Ruang Kerja Logistik'}
            />

            {/* Hybrid Brochure Grid Layout */}
            <div className="w-full px-3">
                {productCategories && productCategories.length > 0 ? (
                    productCategories.map((rootCategory, index) => {
                        const isEven = index % 2 === 0;
                        const bgClass = isEven 
                            ? 'bg-white dark:bg-slate-900' 
                            : 'bg-slate-50/70 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-900';

                        return (
                            <section key={rootCategory.slug || index} className={`py-16 md:py-20 ${bgClass}`}>
                                <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
                                    
                                    {/* Header Kategori Utama */}
                                    <div className="mb-12 border-l-4 border-orange-500 pl-5">
                                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                                            {rootCategory.meta_title || rootCategory.title}
                                        </h2>
                                        {rootCategory.meta_description && (
                                            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                                                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: rootCategory.meta_description || rootCategory.description || ''  }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* GRID BROSUR 2 KOLOM (Memotong panjang halaman hingga 50%) */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-14">
                                        {rootCategory.items.map((item, key) => {
                                            if (!item.image) return null;
                                            const targetUrl = item.slug ? `/produk/${item.slug}` : `/produk/${rootCategory.slug}`;

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
                                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">
                                                                {item.name}
                                                            </h3>
                                                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-4 leading-relaxed">
                                                                <div className="space-y-4" dangerouslySetInnerHTML={{ __html: item.meta_description || item.description || ''  }} />
                                                            </div>
                                                        </div>

                                                        {/* Badge Kecil Pengganti Bullet Point */}
                                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                                            <span className="inline-flex items-center text-[10px] font-bold bg-green-100 dark:bg-green-700 text-green-600 dark:text-slate-300 px-2 py-0.5 rounded">
                                                                Support 24/7
                                                            </span>
                                                            <span className="inline-flex items-center text-[10px] font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded">
                                                                Kirim Seluruh Indonesia
                                                            </span>
                                                        </div>

                                                        {/* Link Aksi */}
                                                        <div className="pt-2">
                                                            <Link
                                                                href={targetUrl}
                                                                className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 gap-1 group/btn transition-colors"
                                                            >
                                                                <span>Lihat Selengkapnya</span>
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