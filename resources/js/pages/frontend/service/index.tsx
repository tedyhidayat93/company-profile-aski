import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowRight, FileDown, Package } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';

interface Service {
    id: number;
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
    seo: any;
}

export default function ServiceIndex({ services = [], products = [], seo }: Props) {
    const { getConfig } = useConfig();

    return (
        <FrontendLayout>
            <SeoHead title={'Layanan Kami'} />

            {/* Hero Header Section */}
           <section className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/80 to-slate-900 py-24 px-4 border-b border-orange-500/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-orange-400 uppercase bg-orange-500/10 rounded-full mb-4 border border-orange-500/20">
                        Our Expertise
                    </span>
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {getConfig('service_title', 'Layanan')}{' '}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Kami
                        </span>
                    </h1>
                    
                    <p className="mx-auto max-w-2xl text-slate-200 text-base md:text-lg leading-relaxed font-medium">
                        {getConfig('service_description', 'Solusi kontainer terbaik, modifikasi custom, dan manajemen logistik andalan untuk bisnis Anda.')}
                    </p>

                    {getConfig('company_profile_pdf') && (
                        <div className="flex justify-center">
                            <a 
                                href={`/storage/${getConfig('company_profile_pdf')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex mt-4 items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white hover:text-orange-400 font-semibold py-3 px-6 rounded-xl border border-white/10 hover:border-orange-500/30 transition duration-300 text-sm backdrop-blur-sm group shadow-lg"
                            >
                                <FileDown className="w-4 h-4 text-orange-400 group-hover:scale-110 transition duration-300" />
                                Unduh Company Profile (PDF)
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Services Split Layout (Zigzag Rows) */}
                <div className="mb-28 space-y-20 md:space-y-28">
                    {services.length > 0 ? (
                        services.map((service, index) => {
                            // Menentukan urutan selang-seling berdasarkan index ganjil/genap
                            const isEven = index % 2 === 0;

                            return (
                                <div 
                                    key={service.id} 
                                    className={`flex flex-col md:flex-cols gap-8 md:gap-12 lg:gap-16 items-center ${
                                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                >
                                    {/* Image Wrapper Component */}
                                    <div className="w-full md:w-1/2 aspect-[16/10] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group relative">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            onError={handleImageError}
                                            className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                                        />
                                    </div>

                                    {/* Description Wrapper Component */}
                                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                                        {/* <div className="text-orange-500 font-bold text-sm tracking-widest uppercase">
                                            Layanan {String(index + 1).padStart(2, '0')}
                                        </div> */}
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                            {service.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                            {service.description}
                                        </p>
                                        <div className="pt-2">
                                            <Link
                                                href={`/service/${service.slug}`}
                                                className="inline-flex items-center text-sm font-bold text-orange-500 hover:text-orange-600 dark:text-orange-400 gap-1.5 group/btn border-b-2 border-transparent hover:border-orange-500 pb-0.5 transition duration-200"
                                            >
                                                Pelajari Selengkapnya
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition duration-200" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            Belum ada layanan yang tersedia saat ini.
                        </div>
                    )}
                </div>

            </div>
            <CtaSection/>
        </FrontendLayout>
    );
}