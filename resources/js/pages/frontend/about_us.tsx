import { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import SeoHead from '@/components/seo-head';
import ProfileVideoHandler from '@/components/profile-video-handler';
import { Link } from '@inertiajs/react'; // Import Link Inertia agar routing bekerja
import { 
    Mail, 
    Phone, 
    MessageCircle, 
    MapPin, 
    FileDown, 
    Building2,
    Target,
    Compass,
    ArrowRight,
    Briefcase // Menggunakan ikon Briefcase untuk pembeda seksi layanan
} from 'lucide-react';
import CtaSection from '@/components/cta-section';
import { Service } from './service';
import { handleImageError } from '@/utils/image';

interface Props {
    seo: {
        title: string;
        description: string;
        keywords: string;
        image: string;
        type: string;
    };
    data: {
        site_name: string;
        site_tagline: string;
        meta_description: string;
        about_us: {
            about: string;
            tagline: string;
            vision: string;
            mission: string;
            profile_video: string;
            company_profile_pdf: string | null;
            office_branch: string;
            site_operational_hour: string;
        };
        contact: {
            email: string;
            whatsapp: string;
            phone: string;
        };
        social_media: {
            tiktok: string;
            instagram: string;
            x: string;
            facebook: string;
            youtube: string;
        };
        google_maps_embed: string;
        services: Service[];
    };
}

export default function AboutUs({ seo, data }: Props) {

    return (
        <FrontendLayout>
            <SeoHead title={seo.title} description={seo.description} />

            {/* --- 1. HERO BANNER SECTION --- */}
            <section className="relative bg-white dark:bg-slate-950 pt-16 pb-12 md:pt-24 md:pb-16 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-500 uppercase">
                        Mengenal Lebih Dekat
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {data.site_name || `Alumoda Sinergi Kontainer Indonesia`}
                    </h1>
                    <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full mt-4" />
                </div>
            </section>

            {/* --- 2. VIDEO PROFILE HANDLER CONTAINER --- */}
            <div className="max-w-full mx-auto px-4 mb-20">
                <ProfileVideoHandler />
            </div>

            {/* --- 3. ALTERNATING CORPORATE STORY SECTION --- */}
            <main className="mx-auto pb-24 space-y-24 md:space-y-36">
                
                {/* BARIS 1: SEKILAS PERUSAHAAN */}
                {data.about_us.about && (
                    <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        <div className="lg:col-span-7 space-y-4 order-1">
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                                <Building2 className="w-4 h-4" /> Profil Perusahaan
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {data.site_tagline || `Kami berpegang pada tujuan sebagai fondasi, dan menatap masa depan sebagai arah visi kami`}
                            </h2>
                            <div 
                                className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed space-y-4 [&_p]:mb-4 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5"
                                dangerouslySetInnerHTML={{ __html: data.about_us.about }}
                            />
                        </div>
                        
                        <div className="lg:col-span-5 order-2">
                            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl" />
                                <div className="space-y-2 relative z-10">
                                    <div className='text-xs px-4 border-2 border-orange-300 rounded-full py-1 font-bold bg-orange-300/20 w-max'>Lebih Detail Tentang Kami</div>
                                    <div className="text-slate-900 dark:text-white font-black text-lg tracking-tight">{data.site_name || `Alumoda PT. Sinergi Kontainer Indonesia`}</div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                                        {data.meta_description || `Menyediakan kontainer standar internasional dengan akreditasi perbaikan teruji dan modifikasi struktural kreatif untuk memperkuat logistik bisnis Anda.`}
                                    </p>
                                </div>
                                {data.about_us.company_profile_pdf && (
                                    <div className="pt-6 relative z-10">
                                        <a 
                                            href={`/storage/${data.about_us.company_profile_pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex justify-center w-full items-center gap-2 bg-slate-900 hover:bg-orange-600 dark:bg-slate-800 dark:hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-xl text-xs transition duration-300 shadow-sm"
                                        >
                                            <FileDown className="w-4 h-4" /> Unduh Company Profile (PDF)
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- BLOK ELEGAN: VISI & MISI --- */}
                {(data.about_us.vision || data.about_us.mission) && (
                    <div className="w-full bg-slate-950 dark:bg-slate-900/40 border-y border-slate-900 dark:border-slate-800 py-20 md:py-28 my-12 relative overflow-hidden">
                        <div className="absolute left-1/4 top-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute right-1/4 bottom-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="max-w-6xl mx-auto px-4 space-y-24 md:space-y-32 relative z-10">
                            {/* BARIS 2: VISI */}
                            {data.about_us.vision && (
                                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                                    <div className="lg:col-span-4 hidden lg:flex justify-center order-2 lg:order-1">
                                        <div className="w-24 h-24 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/5">
                                            <Target className="w-12 h-12 stroke-[1.2]" />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8 space-y-4 order-1 lg:order-2">
                                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                                            <Target className="w-4 h-4 lg:hidden" /> Pandangan Masa Depan
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                            Visi Kami
                                        </h2>
                                        <div 
                                            className="tinymce-content"
                                            dangerouslySetInnerHTML={{ __html: data.about_us.vision }} 
                                        />
                                    </div>
                                </section>
                            )}

                            {/* BARIS 3: MISI */}
                            {data.about_us.mission && (
                                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                                    <div className="lg:col-span-8 space-y-4">
                                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                                            <Compass className="w-4 h-4 lg:hidden" /> Langkah Strategis
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                            Misi Kami
                                        </h2>
                                        <div 
                                            className="text-slate-300 text-sm md:text-base leading-relaxed [&_p]:mb-3 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5 [&_strong]:text-white [&_strong]:font-semibold"
                                            dangerouslySetInnerHTML={{ __html: data.about_us.mission }} 
                                        />
                                    </div>
                                    <div className="lg:col-span-4 hidden lg:flex justify-center">
                                        <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shadow-xl">
                                            <Compass className="w-12 h-12 stroke-[1.2]" />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                )}

                {data.services.length > 0 && (
                    <section className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-5 mb-8">
                            <div className="space-y-1.5">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500">
                                    <Briefcase className="w-3.5 h-3.5" /> Solusi Industri
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Layanan Utama Kami
                                </h3>
                            </div>
                            <p className="text-xs text-slate-400 max-w-sm font-medium">
                                Komitmen penuh menghadirkan infrastruktur kargo modular terintegrasi untuk akselerasi bisnis Anda.
                            </p>
                        </div>

                        {/* Horizontal Grid List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.services.map((service) => (
                                <div 
                                    key={service.id} 
                                    className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 dark:bg-slate-900/40 dark:border-slate-800/80"
                                >
                                    {/* Thumbnail Image */}
                                    <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative dark:bg-slate-800">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            onError={handleImageError}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Deskripsi Singkat Card */}
                                    <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-slate-900 text-base tracking-tight dark:text-white group-hover:text-orange-500 transition-colors">
                                                {service.title}
                                            </h4>
                                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 dark:text-slate-400">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="pt-1">
                                            <Link
                                                href={`/layanan/${service.slug}`}
                                                className="inline-flex items-center text-xs font-bold text-orange-500 hover:text-orange-600 gap-1 group/btn dark:text-orange-400"
                                            >
                                                Selengkapnya
                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 4. SECTION: QUICK CHANNELS & MAPS INTEGRATION --- */}
                <section className="max-w-6xl mx-auto px-4 space-y-12 border-t-2 pt-10 border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 dark:border-slate-900 pb-6">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Hubungi Kami
                            </h3>
                            <div className="h-1 w-8 bg-orange-500 rounded-full" />
                        </div>
                        {data.meta_description && (
                            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 max-w-md md:text-right font-medium leading-relaxed">
                                {data.meta_description}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.contact.whatsapp && (
                            <a 
                                href={`https://wa.me/${data.contact.whatsapp.replace(/\D/g, '')}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-5 p-5 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgb(249,115,22,0.06)] hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-6">
                                    <MessageCircle className="w-5 h-5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">WhatsApp</h4>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">{data.contact.whatsapp}</p>
                                </div>
                            </a>
                        )}

                        {data.contact.phone && (
                            <a 
                                href={`tel:${data.contact.phone.replace(/\D/g, '')}`} 
                                className="group flex items-center gap-5 p-5 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgb(249,115,22,0.06)] hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-6">
                                    <Phone className="w-5 h-5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">Telepon</h4>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">{data.contact.phone}</p>
                                </div>
                            </a>
                        )}

                        {data.contact.email && (
                            <a 
                                href={`mailto:${data.contact.email}`} 
                                className="group flex items-center gap-5 p-5 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_8px_30px_rgb(249,115,22,0.06)] hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-6">
                                    <Mail className="w-5 h-5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <h4 className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">Email Resmi</h4>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 truncate break-all">{data.contact.email}</p>
                                </div>
                            </a>
                        )}
                    </div>

                    {/* INTERGASI MAPS & JALUR OPERASIONAL ASIMETRIS */}
                    {data.google_maps_embed && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-3 shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                
                                {/* KOLOM KIRI (LG: 7/12): Google Maps Embed Full Container */}
                                <div className={`${data.about_us.office_branch ? 'lg:col-span-7': 'lg:col-span-12' } flex flex-col h-[350px] lg:h-[480px]`}>
                                    {/* Sub-header List */}
                                     {data.about_us.office_branch && (
                                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                                            <Building2 className="w-4 h-4 text-orange-500" />
                                            Head Office
                                        </div>
                                     )}
                                    <div 
                                        className=" w-full h-[350px] lg:h-[480px] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-inner
                                            [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 grayscale-[20%] contrast-[105%] dark:[&_iframe]:invert-[0.9] dark:[&_iframe]:hue-rotate-180 transition-all duration-300"
                                        dangerouslySetInnerHTML={{ __html: data.google_maps_embed }}
                                    />
                                </div>


                                {/* KOLOM KANAN (LG: 5/12): List Cabang Hasil TinyMCE */}
                                {data.about_us.office_branch && (
                                    <div className="lg:col-span-5 flex flex-col h-[350px] lg:h-[480px]">
                                        {/* Sub-header List */}
                                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                                            <Building2 className="w-4 h-4 text-orange-500" />
                                            Daftar Wilayah Kerja & Cabang
                                        </div>

                                        {/* Area Scroll Box Konten TinyMCE */}
                                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 space-y-2">
                                            <div 
                                                className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed
                                                    [&_h3]:text-sm [&_h3]:font-black [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mb-1 [&_h3]:mt-4 first:[&_h3]:mt-0 [&_h3]:tracking-tight
                                                    [&_p]:text-slate-500 dark:[&_p]:text-slate-400 [&_p]:mb-3 [&_p]:font-medium
                                                    [&_ul]:list-none [&_ul]:space-y-4"
                                                dangerouslySetInnerHTML={{ __html: data.about_us.office_branch }}
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </section>

            </main>

            {/* CTA Section */}
            <CtaSection />
        </FrontendLayout>
    );
}