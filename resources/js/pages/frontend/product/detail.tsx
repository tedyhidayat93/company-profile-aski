import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowLeft, CheckCircle2, Layers, Package, PhoneCall, ChevronDown, Download, ShieldCheck, FileText, BadgeCheck, Truck, ArrowRight } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';
import ProductCard from '@/components/ProductCard';
import { FeaturedProductsBanner } from '../catalog';

interface Props {
    product: {
        id: number;
        title: string;
        short_description: string;
        description: string;
        content?: string;
        image: string;
        slug: string;
    };
    products: any[];
    related_categories: any[];
    seo: any;
}

export default function ProductDetail({ product, products = [], related_categories = [], seo }: Props) {
    const { getConfig } = useConfig();
    const [isExpanded, setIsExpanded] = useState(false);

    const defaultVisibleCount = 5;
    const hasMoreCategories = related_categories.length > defaultVisibleCount;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || products.length === 0 || isHovered) return;

        // Mengatur kecepatan laju scroll (makin kecil angkanya, makin halus lajunya)
        const speed = 1; 
        
        const autoScrollInterval = setInterval(() => {
            // Jika sudah mencapai batas akhir kanan, reset kembali ke posisi awal (looping)
            if (container.scrollLeft + container.clientWidth >= container.scrollHeight - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollLeft += speed;
            }
        }, 5); // Bergeser setiap 30 milidetik

        return () => clearInterval(autoScrollInterval);
    }, [products, isHovered]);

    // Teks Pesan WhatsApp Universal untuk Segala Kebutuhan Unit
    const waMessage = `Halo Alumoda, saya tertarik dan ingin menanyakan informasi lebih lanjut mengenai produk/layanan: ${encodeURIComponent(product.title)}. Mohon info spesifikasi detail dan penawaran harga terbaiknya.`;

    return (
        <FrontendLayout>
            <SeoHead title={seo?.title || product?.title} description={seo?.description} />

            {/* --- 💥 HERO BANNER: UNIVERSAL INDUSTRIAL LOOK --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-slate-950 border-b-8 border-slate-950 py-32 md:py-40 px-4">
                {/* Blueprint Pattern Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Kiri: Judul Utama Universal */}
                        <div className="lg:col-span-8 space-y-4 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950 text-orange-400 font-black text-[11px] tracking-widest uppercase shadow-md">
                                ⚡ Solusi Jual, Beli, Sewa & Modifikasi Kontainer Terintegrasi dan Terbaik
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none text-slate-950 drop-shadow-sm">
                                {product.title}
                            </h1>
                            <p className="text-slate-900 text-sm sm:text-base md:text-lg font-extrabold max-w-2xl leading-relaxed opacity-95">
                                {!product.short_description ? (
                                    <>{getConfig('catalog_description', 'Pusat pengadaan unit, layanan modifikasi ruang struktural, sewa space depo, dan solusi properti berbasis kontainer berkualitas tinggi.')}</>
                                ) : (
                                    product.short_description
                                )}
                            </p>
                        </div>

                        {/* Kanan: Badge Penawaran Universal Sapujagat */}
                        <div className="lg:col-span-4 bg-slate-950 text-white p-6 border-2 border-white/20 shadow-2xl rounded-xl">
                            {/* 1. KATA KUNCI: JAMINAN DAN KEPASTIAN */}
                            <span className="text-[10px] uppercase font-black tracking-widest text-orange-500 block mb-1">
                                📍 Jaminan Unit & Status Depot
                            </span>
                            
                            {/* 2. KATA KUNCI: REAL-TIME & SIAP KIRIM (Menghilangkan trauma inden lama) */}
                            <div className="text-xl font-black uppercase text-white tracking-tight mb-4 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-orange-500 animate-bounce" /> READY STOCK & SIAP KIRIM
                            </div>
                            
                            <div className="space-y-2 text-xs font-semibold text-slate-300">
                                {/* 3. KATA KUNCI: FLEKSIBEL & RESMI */}
                                <div className="flex justify-between py-1 border-b border-white/10">
                                    <span>Metode Transaksi:</span> 
                                    <span className="text-white font-bold">Bisa Jual-Beli / Sewa Resmi</span>
                                </div>
                                
                                {/* 4. KATA KUNCI: INSPEKSI & KUALITAS (Menandakan barang dicek, bukan kontainer rongsok) */}
                                <div className="flex justify-between py-1 border-b border-white/10">
                                    <span>Kondisi Struktural:</span> 
                                    <span className="text-orange-400 font-bold">Lolos Inspeksi / Cargo Worthy</span>
                                </div>
                                
                                {/* 5. KATA KUNCI: KEPASTIAN LOGISTIK */}
                                <div className="flex justify-between py-1">
                                    <span>Layanan Armada:</span> 
                                    <span className="text-white font-bold">Kirim & Set di Lokasi (Nasional)</span>
                                </div>

                                {/* 6. PIL BADGES DENGAN WARNA HIGHLIGHT ASIA/INDONESIA (Hijau/Biru Terang untuk trust) */}
                                <div className="flex flex-wrap justify-center gap-2.5 pt-5 w-full lg:justify-start">
                                    {[
                                        { text: getConfig('feature_stock_available', 'Unit Selalu Ready'), badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-500' },
                                        { text: getConfig('feature_quality_guarantee', 'Garansi Anti Bocor'), badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', dot: 'bg-cyan-500' },
                                        { text: getConfig('feature_competitive_price', 'Harga Langsung Depo'), badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30', dot: 'bg-amber-500' },
                                        { text: getConfig('feature_support_247', 'Survei Unit Silahkan'), badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30', dot: 'bg-indigo-500' }
                                    ].map((feat, idx) => (
                                        <span 
                                            key={idx} 
                                            className={`flex items-center text-[11px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xs border shadow-sm transition-all duration-300 ${feat.badge}`}
                                        >
                                            <span className={`mr-2 flex h-2 w-2 rounded-full animate-pulse ${feat.dot}`} />
                                            {feat.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 🛠️ MAIN TECHNICAL SPECS LAYOUT --- */}
            <main className="max-w-7xl mx-auto md:px-4 xl:px-0 py-12 md:py-16 relative z-20">
                <div className='-mt-52 bg-gradient-to-br from-slate-950 via-slate-300 to-slate-900 rounded-3xl'>
                    <FeaturedProductsBanner products={products}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
                    
                    {/* SISI KIRI: DATA TEKNIS & GAMBAR UTAMA (8 Kolom) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Foto Utama Unit/Depo */}
                        <div className="relative overflow-hidden border-2 border-slate-300 dark:border-neutral-800 bg-neutral-900 group shadow-md">
                            <div className="absolute inset-3 border border-white/20 z-10 pointer-events-none" />
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                onError={handleImageError}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-6 left-6 z-20 bg-slate-950/90 text-white border border-orange-500/50 px-3 py-1.5 flex items-center gap-2 rounded-xl backdrop-blur-sm">
                                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                                <span className="text-[10px] font-black tracking-wider uppercase">Sewa Kontainer & jual beli container Jabodetabek & Indonesia</span>
                            </div>
                        </div>

                        {/* Lembar Dokumen Detail Deskripsi */}
                        <div className="bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 p-6 sm:p-8 relative">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500" />

                            <div className="flex items-center gap-2 mb-6 border-b-2 border-slate-950 dark:border-neutral-700 pb-4">
                                <FileText className="w-4 h-4 text-orange-500" />
                                <h2 className="text-lg md:text-xl font-black uppercase text-slate-950 dark:text-white tracking-tight">
                                    Spesifikasi Teknis & Komersial
                                </h2>
                            </div>
                            
                            <div className="text-slate-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-medium space-y-4">
                                {product.content ? (
                                    <div className="space-y-4" dangerouslySetInnerHTML={{ __html: product.content }} />
                                ) : (
                                    <div 
                                        className="tinymce-content"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SISI KANAN: FLOATING SIDEBAR (4 Kolom) */}
                    <aside className="lg:col-span-4 space-y-6">
                        
                        {/* Brosur Order Box (CTA) Universal */}
                        <div className="bg-slate-950 text-white p-6 md:p-8 border-t-4 border-orange-500 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-orange-500 text-slate-950 font-black text-[9px] tracking-widest uppercase">
                                INQUIRY BROSUR
                            </div>
                            
                            <h3 className="text-xl font-black uppercase mb-1 text-white tracking-tight">
                                Hubungi TIM AHLI KAMI
                            </h3>
                            <p className="text-slate-400 text-xs mb-6 font-medium leading-relaxed">
                                Konsultasikan rencana proyek, kustomisasi ruang, manajemen sewa kontainer, atau estimasi pengadaan unit {product.title} langsung bersama tim ahli kami.
                            </p>
                            
                            <div className="space-y-3">
                                <a 
                                    href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${waMessage}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-3.5 px-6 transition duration-200 text-xs uppercase tracking-widest"
                                >
                                    <PhoneCall className="w-3.5 h-3.5" />
                                    Minta Penawaran Harga
                                </a>

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

                        {/* Brosur Index Kategori */}
                        <div className="bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 p-6">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-slate-950 dark:border-neutral-700">
                                <Layers className="w-4 h-4 text-orange-500" />
                                <h3 className="font-black text-xs uppercase tracking-widest text-slate-950 dark:text-white">Produk & Layanan Lainnya</h3>
                            </div>
                            
                            <div className="divide-y divide-slate-100 dark:divide-neutral-800">
                                {related_categories.slice(0, defaultVisibleCount).map((item) => (
                                    <Link 
                                        key={item.id}
                                        href={`/produk/${item.slug}`}
                                        className={`flex gap-3 items-center py-2.5 transition-colors hover:text-orange-500 group ${item.title === product.title ? 'text-orange-500 font-extrabold' : 'text-slate-800 dark:text-neutral-300 font-bold'}`}
                                    >
                                        <BadgeCheck className={`w-4 h-4 shrink-0 ${item.title === product.title ? 'text-orange-500' : 'text-slate-300 dark:text-neutral-700 group-hover:text-orange-500'}`} />
                                        <h4 className="text-xs uppercase tracking-wide transition line-clamp-1">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>

                            {/* Collapse Element */}
                            {hasMoreCategories && (
                                <>
                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden divide-y divide-slate-100 dark:divide-neutral-800">
                                            {related_categories.slice(defaultVisibleCount).map((item) => (
                                                <Link 
                                                    key={item.id}
                                                    href={`/produk/${item.slug}`}
                                                    className="flex gap-3 items-center py-2.5 text-slate-700 dark:text-neutral-300 font-bold transition-colors hover:text-orange-500 group"
                                                >
                                                    <BadgeCheck className="w-4 h-4 shrink-0 text-slate-300 dark:text-neutral-700 group-hover:text-orange-500" />
                                                    <h4 className="text-xs uppercase tracking-wide transition line-clamp-1">
                                                        {item.title}
                                                    </h4>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="w-full mt-4 py-2 border border-slate-200 dark:border-neutral-800 text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <span>{isExpanded ? 'Sembunyikan Index' : `Lihat Semua Jenis (${related_categories.length})`}</span>
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Garansi Kualitas Universal */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5">
                            <h3 className="font-black text-[11px] tracking-widest uppercase text-slate-950 dark:text-white mb-3">Komitmen & Jaminan</h3>
                            <ul className="space-y-2.5">
                                {[
                                    'Struktur Kokoh Corten Steel Standar Heavy Duty', 
                                    'Kualitas dan kepuasan jadi poin utama', 
                                    'Fleksibilitas Kustomisasi Fabrikasi Interior & Eksterior', 
                                    'Kelayakan Pengiriman Jalur Darat & Laut Seluruh Indonesia'
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-neutral-400 font-medium leading-tight">
                                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
            <CtaSection />
        </FrontendLayout>
    );
}