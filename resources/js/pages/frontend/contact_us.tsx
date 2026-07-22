import React, { useState } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { 
    Mail, 
    Phone, 
    MessageCircle, 
    MapPin, 
    FileDown, 
    Send,
    Building2,
    Target,
    Compass
} from 'lucide-react';
import PageHeader from '@/components/page-header';
import { useConfig } from '@/utils/config';
import axios from 'axios'; // Ditambahkan untuk trigger tracking simpan ke database

interface Props {
    seo: SeoHeadProps;
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

interface StaticMapsProps {
    googleMapsEmbed: string;
    officeBranch: string | null;
}

// Dibungkus React.memo agar tidak ikut ter-render ulang saat mengetik form
const StaticMapsSection = React.memo(({ googleMapsEmbed, officeBranch }: StaticMapsProps) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-3 shadow-xl mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* KOLOM KIRI: Google Maps Embed */}
                <div className={`${officeBranch ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col h-full lg:h-full`}>
                    {officeBranch && (
                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                            <Building2 className="w-4 h-4 text-orange-500" />
                            Head Office
                        </div>
                    )}
                    <div 
                        className="tinymce-content"
                        dangerouslySetInnerHTML={{ __html: googleMapsEmbed }}
                    />
                </div>

                {/* KOLOM KANAN: Daftar Wilayah Kerja */}
                {officeBranch && (
                    <div className="lg:col-span-5 flex flex-col h-[350px] lg:h-[480px]">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-base mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                            <Building2 className="w-4 h-4 text-orange-500" />
                            Daftar Wilayah Kerja & Cabang
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 space-y-2">
                            <div 
                                className="tinymce-content"
                                dangerouslySetInnerHTML={{ __html: officeBranch }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
});

StaticMapsSection.displayName = 'StaticMapsSection';

export default function ContactUs({ seo, data }: Props) {
    const { getConfig } = useConfig();
    
    // Menambahkan field 'company' agar sinkron dengan kebutuhan tracking data korporasi
    const [form, setForm] = useState({ 
        name: '', 
        company: '', 
        phone: '', 
        email: '', 
        subject: '', 
        message: '' 
    });
    
    const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTabExpanded, setIsTabExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Simpan rekaman leads log visitor ke database untuk kebutuhan analitik panel admin
            await axios.post('/api/visitor-logs/leads', {
                ...form,
                source_page: 'contact-us',
                action_type: 'contact_page_submit'
            });
        } catch (error) {
            // Log error tetap dicatat konsol, namun tidak menghentikan proses pengalihan ke WhatsApp
            console.error('Gagal merekam log visitor di halaman kontak:', error);
        } finally {
            setIsSubmitting(false);
        }

        // 2. Format & dialihkan ke tautan WhatsApp resmi
        const whatsappPhone = data.contact.whatsapp?.replace(/\D/g, '') || '6281282336464';
        const companyText = form.company ? `\n*Perusahaan:* ${form.company}` : '';
        
        const text = `Halo Alumoda, saya tertarik dengan produk container Anda.\n\n*Nama:* ${form.name}${companyText}\n*Email:* ${form.email}\n*WhatsApp/Telp:* ${form.phone}\n*Kebutuhan Projek:* ${form.subject}\n*Pesan Tambahan:* ${form.message}\n\n_(Dikirim via halaman: Contact Us)_`;

        window.open(`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || 'Kontak Kami'}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />

            {/* --- HERO BANNER SECTION --- */}
            <PageHeader 
                badge="Hubungi Kami"
                titleNormal="Diskusikan Kebutuhan Kontainer"
                titleGradient="Bersama Tim Ahli Kami"
                description="Kami siap membantu merealisasikan kebutuhan unit kontainer, modifikasi custom khusus, hingga solusi ruang kerja logistik korporasi Anda dengan standar kualitas terbaik."
                imageSrc="/images/sketch-container.png"
                imageAlt={getConfig('site_tagline', 'Alumoda') + ' - ' + getConfig('site_name', 'Alumoda') + ' - Kontainer Modifikasi & Solusi Ruang Kerja Logistik'}
            />

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
                    
                    {/* LEFT COLUMN: CONTACT INFORMATION & ABOUT (4 KOLOM) */}
                    <div className="lg:col-span-4 space-y-7 order-2 lg:order-1">
                        {data.about_us.about && (
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 space-y-2">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                                    <Building2 className="w-4 h-4 text-orange-500" />
                                    Sekilas Perusahaan
                                </div>
                                
                                <div className="relative">
                                    <div 
                                        className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed [&_p]:mb-2 last:[&_p]:mb-0 [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-4 [&_ul]:pl-4 transition-all duration-500 overflow-hidden ${
                                            isExpanded ? 'max-h-[1000px]' : 'max-h-32'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: data.about_us.about }}
                                    />
                                    
                                    {!isExpanded && (
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900/40 pointer-events-none" />
                                    )}
                                </div>

                                <div className="pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-xs font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition flex items-center gap-1 focus:outline-none"
                                    >
                                        {isExpanded ? 'Sembunyikan' : 'Tampilkan Lebih Banyak...'}
                                    </button>
                                </div>

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

                    {/* RIGHT COLUMN: INTERACTIVE CONNECT FORM (8 KOLOM) */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            {data.contact.whatsapp && (
                                <a 
                                    href={`https://wa.me/${data.contact.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
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

                        {/* --- FORM UTAMA KINI SUDAH TERINKLUSI FIELD NAMA PERUSAHAAN & DB LOGGER --- */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Kirim Pesan Langsung
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-base">
                                    Isi data di bawah ini untuk memulai konsultasi dengan marketing kami atau mendapatkan penawran.
                                </p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Nama Lengkap */}
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

                                    {/* Nama Perusahaan (Opsional) */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nama Perusahaan</label>
                                            <span className="text-[10px] text-slate-400 font-medium">Opsional</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            value={form.company}
                                            onChange={e => setForm({...form, company: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                            placeholder="Contoh: PT. Maju Jaya"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* WhatsApp / Telepon */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nomor Telepon / WhatsApp</label>
                                        <input 
                                            type="tel" 
                                            required
                                            value={form.phone}
                                            onChange={e => setForm({...form, phone: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                            placeholder="Contoh: 0812xxxxxxxx"
                                        />
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Alamat Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={form.email}
                                            onChange={e => setForm({...form, email: e.target.value})}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" 
                                            placeholder="yourmail@mail.com"
                                        />
                                    </div>
                                </div>

                                {/* Subjek Kebutuhan */}
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

                                {/* Detail Pesan */}
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
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/10 transition duration-200 text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" /> 
                                    {isSubmitting ? 'Memproses Log...' : 'Kirim via WhatsApp Fast Response'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- FULL WIDTH MAPS SECTION --- */}
                {data.google_maps_embed && (
                    <section className="border-t border-slate-100 dark:border-slate-800 pt-16 space-y-6">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs tracking-widest uppercase mb-2">
                            <MapPin className="w-4 h-4 animate-bounce" /> Lokasi Kami
                        </div>

                        {/* Panggil komponen memo di sini untuk memotong rantai re-render */}
                        <StaticMapsSection 
                            googleMapsEmbed={data.google_maps_embed} 
                            officeBranch={data.about_us.office_branch} 
                        />
                    </section>
                )}
            </main>
        </FrontendLayout>
    );
}