import { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import SeoHead from '@/components/seo-head';
// import { useConfig } from '@/utils/config';
import { 
    Mail, 
    Phone, 
    MessageCircle, 
    MapPin, 
    FileDown, 
    Send,
    // Facebook, 
    // Instagram, 
    // Youtube, 
    // SquarePlay, 
    // Twitter,
    Building2,
    Target,
    Compass
} from 'lucide-react';

interface Props {
    seo: any;
    data: {
        site_name: string;
        about_us: {
            about: string;
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

export default function ContactUs({ seo, data }: Props) {
    // const { getConfig } = useConfig();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTabExpanded, setIsTabExpanded] = useState(false);

    // const socialIcons = [
    //     { name: 'Facebook', icon: Facebook, href: data.social_media.facebook },
    //     { name: 'Instagram', icon: Instagram, href: data.social_media.instagram },
    //     { name: 'X / Twitter', icon: Twitter, href: data.social_media.x },
    //     { name: 'YouTube', icon: Youtube, href: data.social_media.youtube },
    //     { name: 'TikTok', icon: SquarePlay, href: data.social_media.tiktok },
    // ].filter(item => item.href);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappUrl = `https://wa.me/${data.contact.whatsapp?.replace(/\D/g, '')}?text=Halo%20Alumoda,%20Nama%20saya%20${encodeURIComponent(form.name)}.%20${encodeURIComponent(form.message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <FrontendLayout>
            <SeoHead title="Hubungi Kami" description={seo.description} />

            {/* --- HERO BANNER SECTION --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/70 to-slate-900 py-10 md:py-28 px-4 border-b border-orange-500/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-orange-400 uppercase bg-orange-500/10 rounded-full mb-4 border border-orange-500/20">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] bg-gradient-to-b from-white via-slate-200 to-orange-400 bg-clip-text text-transparent drop-shadow-xl">
                        Hubungi Tim Ahli Kami
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
                    </div>
                    <p className="mx-auto max-w-2xl text-slate-300 text-sm md:text-base font-medium opacity-90 leading-relaxed">
                        Kami siap membantu merealisasikan kebutuhan unit kontainer, modifikasi custom khusus, hingga solusi logistik korporasi Anda.
                    </p>
                </div>
            </section>

            {/* --- MAIN GRID SECTION --- */}
            <main className="max-w-7xl mx-auto px-4 pt-10 md:pt-20 pb-3">
                <div className="space-y-2 mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Informasi Kontak
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Silakan hubungi kami via kanal komunikasi resmi yang tertera.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: CONTACT INFORMATION & ABOUT (5 KOLOM) */}
                    <div className="lg:col-span-4 space-y-7 order-2">
                        {/* --- DI SINI: BAGIAN ABOUT UTAMA YANG SUDAH DIBUAT OKE & PROFESIONAL --- */}
                        {data.about_us.about && (
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 space-y-2">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                                    <Building2 className="w-4 h-4 text-orange-500" />
                                    Sekilas Perusahaan
                                </div>
                                
                                {/* Container untuk teks About dengan limit tinggi & efek fade */}
                                <div className="relative">
                                    <div 
                                        className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed [&_p]:mb-2 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-4 [&_ul]:pl-4 transition-all duration-500 overflow-hidden ${
                                            isExpanded ? 'max-h-[1000px]' : 'max-h-32'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: data.about_us.about }}
                                    />
                                    
                                    {/* Efek Blur Memudar jika tidak di-expand */}
                                    {!isExpanded && (
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900/40 pointer-events-none" />
                                    )}
                                </div>

                                {/* Tombol Tampilkan Lebih Banyak / Sembunyikan */}
                                <div className="pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-xs font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition flex items-center gap-1 focus:outline-none"
                                    >
                                        {isExpanded ? 'Sembunyikan' : 'Tampilkan Lebih Banyak...'}
                                    </button>
                                </div>

                                {/* Mini Tabs Visi & Misi */}
                                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                                    <div className="flex gap-2 mb-3 bg-slate-200/50 dark:bg-slate-950 p-1 rounded-xl">
                                        <button 
                                            type="button"
                                            onClick={() => setActiveTab('vision')}
                                            className={`flex-1 text-center py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'vision' ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                        >
                                            Visi
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setActiveTab('mission')}
                                            className={`flex-1 text-center py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'mission' ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                        >
                                            Misi
                                        </button>
                                    </div>

                                    <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-900 min-h-[70px] space-y-2">
                                        {activeTab === 'vision' ? (
                                            <div className="flex items-start gap-2">
                                                <Target className="w-4 h-4 text-orange-500/70 shrink-0 mt-0.5" />
                                                <div className="relative flex-1">
                                                    {/* Render HTML TinyMCE untuk Visi */}
                                                    <div 
                                                        className={`w-full [&_p]:mb-1 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-4 [&_ul]:pl-4 transition-all duration-500 overflow-hidden ${
                                                            isTabExpanded ? 'max-h-[1000px]' : 'max-h-24'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: data.about_us.vision }} 
                                                    />
                                                    {!isTabExpanded && (
                                                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent dark:from-slate-900/10 pointer-events-none" />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-2">
                                                <Compass className="w-4 h-4 text-orange-500/70 shrink-0 mt-0.5" />
                                                <div className="relative flex-1">
                                                    {/* Render HTML TinyMCE untuk Misi */}
                                                    <div 
                                                        className={`w-full [&_p]:mb-1 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-4 [&_ul]:pl-4 transition-all duration-500 overflow-hidden ${
                                                            isTabExpanded ? 'max-h-[1000px]' : 'max-h-24'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: data.about_us.mission }} 
                                                    />
                                                    {!isTabExpanded && (
                                                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent dark:from-slate-900/10 pointer-events-none" />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tombol Toggle khusus untuk area Visi / Misi */}
                                        <div className="pt-1 pl-6">
                                            <button
                                                type="button"
                                                onClick={() => setIsTabExpanded(!isTabExpanded)}
                                                className="text-[11px] font-bold text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition flex items-center gap-1 focus:outline-none"
                                            >
                                                {isTabExpanded ? 'Sembunyikan' : 'Lihat Detail...'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- COMPANY PROFILE PDF DOWNLOAD BOX --- */}
                        {data.about_us.company_profile_pdf && (
                            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1 tracking-tight">Dokumen Perusahaan</h3>
                                        <p className="text-slate-400 text-xs leading-relaxed">Unduh brosur resmi & Company Profile PDF.</p>
                                    </div>
                                    <a 
                                        href={`/storage/${data.about_us.company_profile_pdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex text-nowrap items-center gap-2 bg-white/5 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl border border-white/10 hover:border-orange-500 transition duration-300 text-xs shadow-md"
                                    >
                                        <FileDown className="w-3.5 h-3.5" /> Unduh PDF
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: INTERACTIVE CONNECT FORM (7 KOLOM) */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            {data.contact.whatsapp && (
                                <a 
                                    href={`https://wa.me/${data.contact.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="flex gap-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <MessageCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Hotline</h4>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.contact.whatsapp}</p>
                                    </div>
                                </a>
                            )}

                            {data.contact.phone && (
                                <a 
                                    href={`tel:${data.contact.phone.replace(/\D/g, '')}`}
                                    className="flex gap-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Telepon Kantor</h4>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.contact.phone}</p>
                                    </div>
                                </a>
                            )}

                            {data.contact.email && (
                                <a 
                                    href={`mailto:${data.contact.email}`}
                                    className="flex gap-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Surel / Email</h4>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5 break-all">{data.contact.email}</p>
                                    </div>
                                </a>
                            )}
                        </div>
                        {/* Form code tetap sama seperti sebelumnya */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Kirim Pesan Langsung
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">
                                    Isi data di bawah ini untuk memulai konsultasi kilat dengan marketing manager.
                                </p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={form.name}
                                            onChange={e => setForm({...form, name: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                            placeholder="Masukkan nama Anda"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Alamat Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={form.email}
                                            onChange={e => setForm({...form, email: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                            placeholder="nama@perusahaan.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Subjek Kebutuhan</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={form.subject}
                                        onChange={e => setForm({...form, subject: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                        placeholder="Contoh: Modifikasi Office Container 20ft"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Detail Pesan</label>
                                    <textarea 
                                        rows={4}
                                        required
                                        value={form.message}
                                        onChange={e => setForm({...form, message: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition resize-none" 
                                        placeholder="Tuliskan detail spesifikasi produk atau pertanyaan Anda..."
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/10 transition duration-200 text-sm mt-2"
                                >
                                    <Send className="w-4 h-4" /> Kirim via WhatsApp Fast Response
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */} 
                {/* {socialIcons.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                            Ikuti Media Sosial Kami
                        </h4>
                        
                        <div className="flex flex-wrap gap-3">
                            {socialIcons.map((social, i) => {
                                const Icon = social.icon;
                                
                                const getHoverStyles = (name: string) => {
                                    switch (name.toLowerCase()) {
                                        case 'facebook': return 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[#1877F2]/20';
                                        case 'instagram': return 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:shadow-[#ee2a7b]/20';
                                        case 'x / twitter': return 'hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white hover:shadow-black/10';
                                        case 'youtube': return 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[#FF0000]/20';
                                        case 'tiktok': return 'hover:bg-black hover:text-white hover:border-black hover:shadow-black/20';
                                        default: return 'hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-orange-500/20';
                                    }
                                };

                                return (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex h-12 w-auto px-4 items-center justify-center gap-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getHoverStyles(social.name)}`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="text-xs font-bold tracking-wide">{social.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )} */}

                {/* --- FULL WIDTH MAPS SECTION --- */}
                {data.google_maps_embed && (
                    <section className="border-t border-slate-100 dark:border-slate-800 pt-16 space-y-6">
                        
                        {/* Judul Section Utama */}
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs tracking-widest uppercase mb-2">
                            <MapPin className="w-4 h-4 animate-bounce" /> Jaringan Lokasi & Kantor Cabang
                        </div>

                        {/* Grid Integrasi Menyatu */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl mb-20">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                
                                {/* KOLOM KIRI (LG: 7/12): Google Maps Embed Full Container */}
                                <div className="lg:col-span-7 flex flex-col h-[350px] lg:h-[480px]">
                                    {/* Sub-header List */}
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                                        <Building2 className="w-4 h-4 text-orange-500" />
                                        Head Office
                                    </div>
                                    <div 
                                        className=" w-full h-[350px] lg:h-[480px] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-inner
                                            [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 grayscale-[20%] contrast-[105%] dark:[&_iframe]:invert-[0.9] dark:[&_iframe]:hue-rotate-180 transition-all duration-300"
                                        dangerouslySetInnerHTML={{ __html: data.google_maps_embed }}
                                    />
                                </div>


                                {/* KOLOM KANAN (LG: 5/12): List Cabang Hasil TinyMCE */}
                                <div className="lg:col-span-5 flex flex-col h-[350px] lg:h-[480px]">
                                    {/* Sub-header List */}
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                                        <Building2 className="w-4 h-4 text-orange-500" />
                                        Daftar Wilayah Kerja & Cabang
                                    </div>

                                    {/* Area Scroll Box Konten TinyMCE */}
                                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 space-y-2">
                                        {data.about_us.office_branch ? (
                                            <div 
                                                className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed
                                                    [&_h3]:text-sm [&_h3]:font-black [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mb-1 [&_h3]:mt-4 first:[&_h3]:mt-0 [&_h3]:tracking-tight
                                                    [&_p]:text-slate-500 dark:[&_p]:text-slate-400 [&_p]:mb-3 [&_p]:font-medium
                                                    [&_ul]:list-none [&_ul]:space-y-4"
                                                dangerouslySetInnerHTML={{ __html: data.about_us.office_branch }}
                                            />
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 italic text-xs py-10">
                                                <MapPin className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2 stroke-[1.5]" />
                                                Belum ada daftar kantor cabang yang terkonfigurasi.
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                )}
            </main>
        </FrontendLayout>
    );
}