import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useConfig } from "@/utils/config";
import { PhoneCall, Download } from "lucide-react";

interface ProductInquiryCardProps {
    product: {
        title: string;
        [key: string]: any;
    };
}

export default function ProductInquiryCard({ product }: ProductInquiryCardProps) {
    const { getConfig } = useConfig();

    // 1. Ambil properti global props dari Inertia & ambil data rute saat ini
    const { visitorActions = {}, appPages = {} } = usePage().props as any;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    // 2. Fungsi Deteksi Halaman Otomatis Berdasarkan URL Path (Switch Case)
    const detectPageName = (): string => {
        if (typeof window === 'undefined') return appPages.UNKNOWN || 'unknown_page';

        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);

        switch (true) {
            case (path === '/' || path === ''): return appPages.HOMEPAGE;
            case (path === '/kontak'): return appPages.CONTACT_US;
            case (path === '/tentang-kami'): return appPages.ABOUT_US;
            case (path === '/sitemap' || path === '/sitemap.xml'): return appPages.SITEMAP;
            case (path === '/layanan'): return appPages.SERVICE_INDEX;
            case (path.startsWith('/layanan/')): return appPages.SERVICE_SHOW;
            case (path === '/produk'): return appPages.PRODUCT_INDEX;
            case (path.startsWith('/produk/')): return appPages.PRODUCT_DETAIL;
            case (path === '/katalog' || path === '/katalog/'): return appPages.CATALOG_INDEX;
            case (path.startsWith('/katalog/kategori/')): return appPages.CATALOG_CATEGORY;
            case (path.startsWith('/katalog/')): return appPages.CATALOG_SHOW;
            case (path === '/testimonial' || path === '/testimonial/'): return appPages.TESTIMONIAL_INDEX;
            case (path === '/testimonial/maps'): return appPages.TESTIMONIAL_MAPS;
            case (path === '/info' || path === '/info/'): return appPages.BLOG_INDEX;
            case (path.startsWith('/info/kategori/')): return appPages.BLOG_CATEGORY;
            case (path.startsWith('/info/tag/')): return appPages.BLOG_TAG;
            case (segments.length === 1): return appPages.BLOG_DETAIL;
            default: return appPages.UNKNOWN || 'unknown_page';
        }
    };

    const pageName = detectPageName();

    // 3. Handler klik untuk merekam analitik ke backend secara background
    const handleWhatsAppClick = async () => {
        try {
            await axios.post('/api/visitor-logs/leads', {
                name: 'Visitor Product Inquiry',
                message: `Melakukan klik Minta Penawaran Harga pada produk: ${product.title}`,
                source_page: pageName,
                source_url: currentUrl,
                action_type: visitorActions.WA_ONPAGE_DIRECT_CLICK || 'whatsapp_dirrect'
            });
        } catch (error) {
            // Gagal silent agar tidak mengganggu alur redirect user ke WhatsApp
            console.error('Gagal mencatat log inquiry produk:', error);
        }
    };

    // 4. Susun pesan kustom WhatsApp secara dinamis berdasarkan properti produk
    const waNumber = getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '');
    const defaultText = `Halo Alumoda, saya tertarik dan ingin minta penawaran harga untuk produk *${product.title}*.`;
    const trackingText = `\n\n_(Dikirim via: ${pageName})_\n_(URL: ${currentUrl})_`;
    const fullWaLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultText + trackingText)}`;

    return (
        <div className="bg-slate-950 text-white p-6 md:p-8 border-t-4 border-orange-500 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-orange-500 text-slate-950 font-black text-[9px] tracking-widest uppercase">
                INQUIRY BROSUR
            </div>
            
            <h3 className="text-xl font-black uppercase mb-1 text-white tracking-tight">
                Hubungi TIM AHLI KAMI
            </h3>
            <p className="text-slate-400 text-xs mb-6 font-medium leading-relaxed">
                Konsultasikan rencana proyek, kustomisasi ruang, manajemen sewa kontainer, atau estimasi pengadaan unit <span className="text-orange-400 font-bold">{product.title}</span> langsung bersama tim ahli kami.
            </p>
            
            <div className="space-y-3">
                {/* Tombol Minta Penawaran Harga WhatsApp */}
                <a 
                    href={fullWaLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick} // <-- Memicu background logger analitik
                    className="flex w-full justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-3.5 px-6 transition duration-200 text-xs uppercase tracking-widest"
                >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Minta Penawaran Harga
                </a>

                {/* Tombol Download Brosur (Bila Config Tersedia) */}
                {getConfig('company_profile_pdf') && (
                    <a 
                        href={`/storage/${getConfig('company_profile_pdf')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full justify-center items-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold py-3 px-6 transition duration-200 text-xs uppercase tracking-widest"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download Brosur Spesifikasi
                    </a>
                )}
            </div>
        </div>
    );
}