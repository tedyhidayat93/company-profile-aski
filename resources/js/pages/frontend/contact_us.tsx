import { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import { 
    Mail, 
    Phone, 
    MessageCircle, 
    MapPin, 
    FileDown, 
    Send,
    Facebook, 
    Instagram, 
    Youtube, 
    SquarePlay, 
    Twitter 
} from 'lucide-react';

interface Props {
    seo: any;
    data: {
        site_name: string;
        about_us: {
            about: string;
            vision: string;
            mission: string;
            company_profile_pdf: string | null;
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
    const { getConfig } = useConfig();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const socialIcons = [
        { name: 'Facebook', icon: Facebook, href: data.social_media.facebook },
        { name: 'Instagram', icon: Instagram, href: data.social_media.instagram },
        { name: 'X / Twitter', icon: Twitter, href: data.social_media.x },
        { name: 'YouTube', icon: Youtube, href: data.social_media.youtube },
        { name: 'TikTok', icon: SquarePlay, href: data.social_media.tiktok },
    ].filter(item => item.href);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Integrasi direct chat atau email API bisa ditaruh di sini
        const whatsappUrl = `https://wa.me/${data.contact.whatsapp?.replace(/\D/g, '')}?text=Halo%20Alumoda,%20Nama%20saya%20${encodeURIComponent(form.name)}.%20${encodeURIComponent(form.message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <FrontendLayout>
            <SeoHead title="Hubungi Kami" description={seo.description} />

            {/* --- HERO BANNER SECTION --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/70 to-slate-900 py-28 px-4 border-b border-orange-500/20">
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
            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT COLUMN: CONTACT INFORMATION (5 KOLOM) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Informasi Kontak
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Silakan hubungi kami via kanal komunikasi resmi di bawah ini.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* WhatsApp */}
                            {data.contact.whatsapp && (
                                <a 
                                    href={`https://wa.me/${data.contact.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Hotline</h4>
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.contact.whatsapp}</p>
                                    </div>
                                </a>
                            )}

                            {/* Phone */}
                            {data.contact.phone && (
                                <a 
                                    href={`tel:${data.contact.phone}`}
                                    className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telepon Kantor</h4>
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.contact.phone}</p>
                                    </div>
                                </a>
                            )}

                            {/* Email */}
                            {data.contact.email && (
                                <a 
                                    href={`mailto:${data.contact.email}`}
                                    className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-orange-500/40 transition duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surel / Email</h4>
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5 break-all">{data.contact.email}</p>
                                    </div>
                                </a>
                            )}
                        </div>

                        {/* --- EXCLUSIVE: COMPANY PROFILE PDF DOWNLOAD BOX --- */}
                        {data.about_us.company_profile_pdf && (
                            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1 tracking-tight">Company Profile</h3>
                                        <p className="text-slate-400 text-xs leading-relaxed">Unduh brosur resmi & Company Profile PDF.</p>
                                    </div>
                                    <a 
                                        href={`/storage/${data.about_us.company_profile_pdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl border border-white/10 hover:border-orange-500 transition duration-300 text-xs shadow-md"
                                    >
                                        <FileDown className="w-3.5 h-3.5" /> Unduh PDF
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Social Media Links */} 
                        {socialIcons.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                                    Ikuti Media Sosial Kami
                                </h4>
                                
                                <div className="flex flex-wrap gap-3">
                                    {socialIcons.map((social, i) => {
                                        const Icon = social.icon;
                                        
                                        // Menentukan warna hover spesifik berdasarkan nama media sosial
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
                        )}
                    </div>

                    {/* RIGHT COLUMN: INTERACTIVE CONNECT FORM (7 KOLOM) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
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

                {/* --- FULL WIDTH MAPS SECTION --- */}
                {data.google_maps_embed && (
                    <section className="mt-20 border-t border-slate-100 dark:border-slate-800 pt-16 space-y-6">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase">
                            <MapPin className="w-4 h-4" /> Lokasi Workshop & Kantor Pusat
                        </div>
                        <div 
                            className="w-full h-96 md:h-[450px] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md grayscale-[10%] contrast-[105%] [&_iframe]:w-full [&_iframe]:h-full"
                            dangerouslySetInnerHTML={{ __html: data.google_maps_embed }}
                        />
                    </section>
                )}
            </main>
        </FrontendLayout>
    );
}