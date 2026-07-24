import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useConfig } from "@/utils/config";
import { Phone, MessageSquare } from "lucide-react";

interface ProductContactBarProps {
    product: {
        name: string;
        [key: string]: any;
    };
}

export default function MiniProductContactBar({ product }: ProductContactBarProps) {
    const { getConfig } = useConfig();

    // 1. Ambil properti global props dari Inertia & ambil data rute saat ini
    const { visitorActions = {}, appPages = {} } = usePage().props as any;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    // 2. Fungsi Deteksi Halaman Otomatis Berdasarkan URL Path
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

    // 3. Fungsi Handler Klik Terintegrasi Analitik Backend
    const handleTanyaSalesClick = async () => {
        const cleanPhone = getConfig('contact_whatsapp', '6281282336464').replace(/[^0-9]/g, '');
        
        const openWhatsApp = () => {
            const message = encodeURIComponent(
                `Halo Sales, saya tertarik dengan produk kontainer ini:\n\n` +
                `*${product.name}*\n` +
                `Link: ${currentUrl}\n\n` +
                `Mohon informasi ketersediaan unit dan penawaran harganya.\n\n` +
                `_(Dikirim via: ${pageName})_`
            );
            window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
        };

        try {
            // Kirim data ke backend analitik leads (Aksi: whatsapp_onpage_direct_click)
            await axios.post('/api/visitor-logs/leads', {
                name: 'Visitor Tanya Sales (Bar)',
                message: `Klik tombol tanya sales on-page untuk produk: ${product.name}`,
                source_page: pageName,
                source_url: currentUrl,
                action_type: visitorActions.WA_DIRECT_ONPAGE_CLICK || 'whatsapp_onpage_direct_click'
            });

            openWhatsApp();
        } catch (error) {
            console.error('Gagal merekam log tanya sales, mengalihkan langsung ke WhatsApp:', error);
            // Fallback jika API bermasalah agar user tetap terhubung ke WA
            openWhatsApp();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-xl dark:bg-zinc-900/40 dark:border-zinc-800">
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400 shrink-0">
                    <Phone className="h-5 w-5 animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Punya Pertanyaan Mengenai Unit Ini?
                    </span>
                    <span className="text-sm font-extrabold text-zinc-700 dark:text-zinc-200 tracking-wide">
                        {getConfig('contact_phone', '081282336464')}
                    </span>
                </div>
            </div>
            
            <button
                onClick={handleTanyaSalesClick}
                className="w-full sm:w-auto h-10 px-4 cursor-pointer inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-[0.98]"
            >
                <MessageSquare className="h-4 w-4" />
                Tanya Sales via WA
            </button>
        </div>
    );
}