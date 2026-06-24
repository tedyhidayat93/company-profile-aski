import { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import SeoHead from '@/components/seo-head';
import ProfileVideoHandler from '@/components/profile-video-handler';
import { 
    Mail, 
    Phone, 
    MessageCircle, 
    MapPin, 
    FileDown, 
    Send,
    Building2,
    Target,
    Compass,
    ArrowRight
} from 'lucide-react';
import CtaSection from '@/components/cta-section';

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
                
                {/* BARIS 1: SEKILAS PERUSAHAAN (Tetap Terang / Mengikuti Tema Global) */}
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
                                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-orange-600 dark:bg-slate-800 dark:hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-xl text-xs transition duration-300 shadow-sm"
                                        >
                                            <FileDown className="w-4 h-4" /> Unduh Company Profile (PDF)
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- BLOK ELEGAN: VISI & MISI (DIUBAH MENJADI DARK SECTION) --- */}
                {(data.about_us.vision || data.about_us.mission) && (
                    <div className="w-full bg-slate-950 dark:bg-slate-900/40 border-y border-slate-900 dark:border-slate-800 py-20 md:py-28 my-12 relative overflow-hidden">
                        {/* Aksen Gradasi Premium di Background */}
                        <div className="absolute left-1/4 top-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute right-1/4 bottom-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="max-w-6xl mx-auto px-4 space-y-24 md:space-y-32 relative z-10">
                            
                            {/* BARIS 2: VISI (Premium Dark) */}
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
                                            className="text-slate-300 text-sm md:text-base leading-relaxed [&_p]:mb-3 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5 [&_strong]:text-white [&_strong]:font-semibold"
                                            dangerouslySetInnerHTML={{ __html: data.about_us.vision }} 
                                        />
                                    </div>
                                </section>
                            )}

                            {/* BARIS 3: MISI (Premium Dark) */}
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

                {/* --- 4. SECTION: QUICK CHANNELS & MAPS INTEGRATION --- */}
                <section className="max-w-6xl mx-auto px-4 pt-16 space-y-12">
                    {/* JUDUL SEKSI HUBUNGI KAMI (LAYOUT ASIMETRIS ELEGAN) */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Hubungi Kami
                            </h3>
                            <div className="h-1 w-8 bg-orange-500 rounded-full" />
                        </div>
                        
                        {/* Wording Dinamis di Sebelah Kanan (Hanya Muncul jika Ada Data Deskripsi) */}
                        {data.meta_description && (
                            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 max-w-md md:text-right font-medium leading-relaxed">
                                {data.meta_description}
                            </p>
                        )}
                    </div>
                    {/* GRID KARTU KONTAK INTERAKTIF */}
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
                        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-5 md:p-7 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
                        
                            {/* Bingkai Peta Interaktif (Lebih Luas & Menyala) */}
                            <div className="lg:col-span-7 flex flex-col h-[380px] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-900/60 shadow-inner relative group/map">
                                <div 
                                    className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 dark:[&_iframe]:invert-[0.92] dark:[&_iframe]:hue-rotate-180 transition-all duration-500"
                                    dangerouslySetInnerHTML={{ __html: data.google_maps_embed }}
                                />
                                <div className="absolute inset-0 border-2 border-transparent group-hover/map:border-orange-500/20 rounded-2xl pointer-events-none transition-all duration-500" />
                            </div>

                            {/* Panel Informasi Cabang (Scroller Elegan) */}
                            <div className="lg:col-span-5 flex flex-col h-[380px] justify-between pl-2">
                                <div className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-sm tracking-tight mb-4 pb-3 border-b border-slate-100 dark:border-slate-900">
                                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    Cabang & Wilayah Operasional
                                </div>

                                {/* Konten HTML Dinamis Renderer dengan Desain List Premium */}
                                <div 
                                    className="flex-1 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-4
                                        [&_h3]:text-sm [&_h3]:font-black [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mb-1.5 [&_h3]:mt-4 first:[&_h3]:mt-0 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-2
                                        [&_p]:mb-2 [&_p]:pl-0 [&_p]:text-slate-500 dark:[&_p]:text-slate-400
                                        [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:border-l [&_ul]:border-slate-100 dark:[&_ul]:border-slate-900 [&_ul]:pl-3
                                        [&_li]:relative [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:-left-[15px] [&_li]:before:top-[6px] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:rounded-full [&_li]:before:bg-orange-500/60"
                                    dangerouslySetInnerHTML={{ __html: data.about_us.office_branch }}
                                />

                                {/* Informasi Jam Kerja / footer kecil panel */}
                                {data.about_us.site_operational_hour && (
                                    <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-900/60 text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Jam Operasional: {data.about_us.site_operational_hour}
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