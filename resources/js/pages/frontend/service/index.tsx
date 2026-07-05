import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowRight, FileDown } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';
import PageHeader from '@/components/page-header';

export interface Service {
    id?: number;
    title: string;
    slug: string;
    description: string;
    image: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    brand: string | null;
}

interface Props {
    services: Service[];
    products: Product[];
    seo: SeoHeadProps;
}

export default function ServiceIndex({ services = [], products = [], seo }: Props) {
    const { getConfig } = useConfig();

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || getConfig('services_meta_title', 'Layanan Kami')}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />


            <PageHeader 
                badge="Layanan Kami"
                titleNormal={getConfig('service_title', 'Layanan')}
                titleGradient="Sewa Kontainer & Modifikasi Berkualitas"
                description={getConfig('service_description', 'Solusi kontainer terbaik, modifikasi custom, dan manajemen logistik andalan untuk bisnis Anda.')}
                imageSrc="/images/kontainer-illsutartion.png"
                imageAlt={getConfig('site_tagline', 'Alumoda') + ' - ' + getConfig('site_name', 'Alumoda') + ' - Kontainer Modifikasi & Solusi Ruang Kerja Logistik'}
            />

            {/* Main Content Container */}
            <div className="w-full max-w-none px-0">
                {services.length > 0 ? (
                    /* GRID SYSTEM: 3 Kolom di Desktop, Full Width di Mobile */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                        {services.map((service) => (
                            <div 
                                key={service.id} 
                                className="relative group w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden border-b border-r border-slate-200/20 dark:border-slate-800/20 bg-slate-900"
                            >
                                {/* 1. LAYER BASE: GAMBAR UTAMA */}
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* 2. LAYER OVERLAY: GRADASI GELAP */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 md:opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                                {/* 3. LAYER CONTENT: OVERLAY TEKS */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white z-10">
                                    <div className="space-y-3 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        
                                        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                                            {service.title}
                                        </h2>
                                        
                                        <div className="text-slate-200 text-sm font-medium leading-relaxed line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            <div className="tinymce-content [&_*]:!text-slate-200" dangerouslySetInnerHTML={{ __html: service.description || '' }} />
                                        </div>
                                        
                                        <div className="pt-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            <Link
                                                href={`/layanan/${service.slug}`}
                                                className="inline-flex items-center text-sm font-bold text-orange-400 hover:text-orange-300 gap-2 group/btn"
                                            >
                                                <span>Pelajari Selengkapnya</span>
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition duration-200" />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* 4. DYNAMIC EXTRA GRID: Muncul otomatis jika jumlah data tidak habis dibagi 3 */}
                        {services.length % 3 !== 0 && (
                            <Link
                                href="/katalog"
                                className="relative group w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden border-b border-r border-slate-200/20 dark:border-slate-800/20 bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 flex flex-col justify-end p-6 md:p-10 text-white"
                            >
                                {/* Pola Garis Kontainer Halus sebagai Background Khas */}
                                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:24px_100%] pointer-events-none" />
                                
                                {/* Konten CTA */}
                                <div className="relative z-10 space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                                    <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-white/20 rounded-md mb-2 border border-white/10">
                                        Rekomendasi Unit
                                    </span>
                                    
                                    <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
                                        Lihat Lebih Banyak <br /> Produk Kami
                                    </h2>
                                    
                                    <p className="text-orange-100 text-xs md:text-sm font-medium">
                                        Jelajahi seluruh katalog kontainer modifikasi dan unit kargo standar ready stock.
                                    </p>
                                    
                                    <div className="pt-4 inline-flex items-center text-sm font-bold text-white gap-2">
                                        <span>Buka Katalog</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                ) : (
                    /* STATE KOSONG */
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            Belum ada layanan yang tersedia saat ini.
                        </div>
                    </div>
                )}
            </div>
            <CtaSection/>
        </FrontendLayout>
    );
}