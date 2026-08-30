import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useConfig } from "@/utils/config";
import { PhoneCall } from "lucide-react";

export default function CtaSection () {
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
            case (path === '/portofolio' || path === '/portofolio/'): return appPages.PORTFOLIO_INDEX;
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
    const handleCTAClick = async () => {
        try {
            await axios.post('/api/visitor-logs/leads', {
                name: 'Visitor Direct Click',
                message: `Melakukan klik langsung tombol hubungi kami di section CTA.`,
                source_page: pageName,
                source_url: currentUrl,
                action_type: visitorActions.WA_ONPAGE_DIRECT_CLICK || ''
            });
        } catch (error) {
            console.error('Gagal mencatat log direct click:', error);
        }
    };

    // 4. Susun link WhatsApp secara dinamis dengan tambahan info tracker teks
    const waNumber = getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '');
    const defaultMessage = getConfig('whatsapp_message', 'Halo Alumoda, saya ingin bertanya');
    const trackingText = `\n\n_(Dikirim via: ${pageName})_\n_(URL: ${currentUrl})_`;
    const fullWaLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMessage + trackingText)}`;

    return (
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-800 to-slate-950 px-2 py-24 text-white">
            {/* Efek Dekoratif Background */}
            <div className="absolute top-0 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

            <div className="container relative z-10 mx-auto px-4 text-center flex flex-col justify-center items-center">
                {/* Badge Kecil di Atas */}
                <span className="mb-4 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-400 uppercase border border-orange-500/20">
                    Hubungi Kami
                </span>
                
                <h2 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight text-white xl:max-w-6xl leading-tight">
                    {getConfig('cta_title', 'Butuh Kontainer untuk Bisnis Anda?')}
                </h2>
                
                <p className="mx-auto mb-10 text-base font-medium md:text-lg lg:text-xl text-slate-200 xl:max-w-6xl leading-relaxed">
                    {getConfig('cta_description', 'Dapatkan penawaran terbaik untuk sewa atau beli kontainer berkualitas. Cocok untuk berbagai kebutuhan usaha mulai dari gudang, kantor, hingga ruang komersial.')}
                </p>
                
                {/* Tombol yang Lebih Elegan, Interaktif, dan Terlacak */}
                <a 
                    target='_blank' 
                    rel="noopener noreferrer"
                    aria-label='contact us to getting best products'
                    href={fullWaLink}
                    onClick={handleCTAClick} // <--- Memicu penyimpanan log saat diklik
                    className="group flex w-full items-center justify-center max-w-xl gap-2 bg-gradient-to-r animate-pulse from-green-500 to-emerald-600 px-8 py-4 rounded-full text-white text-center font-medium shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20"
                > 
                    <PhoneCall className="h-5 w-5 transition-transform group-hover:rotate-12" /> 
                    <span>{getConfig('cta_button_text', 'Hubungi Kami via WhatsApp')}</span>
                </a>
            </div>
        </section>
    );
}