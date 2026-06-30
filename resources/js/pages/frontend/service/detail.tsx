import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { ArrowLeft, CheckCircle2, Layers, Package, PhoneCall } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import SeoHead from '@/components/seo-head';
import { useConfig } from '@/utils/config';
import CtaSection from '@/components/cta-section';
import ProductCard from '@/components/ProductCard';

interface Props {
    service: {
        id: number;
        title: string;
        short_description: string;
        description: string;
        content?: string;
        image: string;
    };
    products: any[];
    related_services: any[];
    seo: any;
}

export default function ServiceDetail({ service, products = [], related_services = [], seo }: Props) {
    const { getConfig } = useConfig();

    return (
        <FrontendLayout>
            <SeoHead title={service?.title} />

            {/* --- HERO SECTION (Sama dengan Index untuk Konsistensi) --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/80 to-slate-900 py-52 px-4 border-b border-orange-500/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-8xl mx-auto text-center relative z-10 -mt-10">
                    <Link 
                        href="/layanan"
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-orange-400 uppercase mb-6 hover:text-orange-300 transition group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" /> Kembali ke Layanan
                    </Link>
                    
                    {/* --- H1 Estetik dengan Gradient Glossy --- */}
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] 
                        bg-gradient-to-b from-white via-slate-100 to-orange-400 
                        bg-clip-text text-transparent drop-shadow-xl">
                        {service.title}
                    </h1>
                    
                    {/* Dekorasi Garis Halus di bawah H1 */}
                    <div className="flex justify-center mb-8">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
                    </div>
                    
                    <p className="mx-auto max-w-3xl text-white text-sm md:text-xl font-medium opacity-80 leading-relaxed">
                        {
                            !service.short_description ? (
                                <>
                                    {getConfig('service_description', 'Solusi kontainer terbaik, modifikasi custom, dan manajemen logistik andalan untuk bisnis Anda.')}
                                </>
                            ) : (
                                service.short_description
                            )
                        }
                    </p>
                </div>
            </section>

            {/* --- MAIN CONTENT SECTION --- */}
            <main className="max-w-7xl mx-auto px-4 py-16 -mt-42">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* SISI KIRI: KONTEN UTAMA (8 Kolom) */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Gambar Utama Layanan */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                onError={handleImageError}
                                className="w-full h-full object-cover aspect-5/3"
                            />
                        </div>

                        {/* Deskripsi & Konten */}
                        <article className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                Mengenal {service.title}
                            </h2>
                            
                            <div className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-2xl">
                                {service.content ? (
                                    <div 
                                        className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4"
                                        dangerouslySetInnerHTML={{ __html: service.content }} 
                                    />
                                ) : (
                                    <div 
                                        className="tinymce-content"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                )}
                            </div>
                        </article>
                    </div>

                    {/* SISI KANAN: SIDEBAR (4 Kolom) */}
                    <aside className="lg:col-span-4 space-y-8">
                        
                        {/* Box: Hubungi Kami (CTA) */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 border border-orange-500/20 shadow-xl relative overflow-hidden group">
                            {/* Efek pendaran orange sangat halus di dalam card */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/15 transition duration-500" />
                            
                            {/* Icon dengan opacity yang diturunkan agar tenang */}
                            <PhoneCall className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-500/5 rotate-12 group-hover:scale-105 group-hover:text-orange-500/10 transition duration-500" />
                            
                            {/* Judul menggunakan warna putih */}
                            <h3 className="text-xl font-bold mb-3 text-white relative z-10 tracking-tight">
                                Butuh Konsultasi?
                            </h3>
                            
                            {/* Teks diubah ke abu-abu terang (slate-400) agar sangat nyaman dibaca */}
                            <p className="text-slate-200 text-sm mb-6 relative z-10 leading-relaxed">
                                Diskusikan kebutuhan spesifik Anda dengan tim ahli kami sekarang.
                            </p>
                            
                            {/* Tombol WhatsApp diubah menjadi Orange Solid dengan teks putih */}
                            <a 
                                href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`} 
                                target="_blank"
                                className="inline-flex w-full justify-center items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/10 hover:from-orange-600 hover:to-orange-700 transition duration-200 relative z-10 text-sm"
                            >
                                Chat via WhatsApp
                            </a>
                        </div>

                        {/* --- NEW BOX: Download Company Profile (Hanya Muncul Jika File Tersedia) --- */}
                        {getConfig('company_profile_pdf') && (
                            <div className="bg-gradient-to-br from-slate-800 to-slate-500 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-slate-800 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/5 transition duration-500" />
                                
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                                        Company Profile
                                    </h3>
                                    <p className="text-slate-200 text-sm mb-5 leading-relaxed">
                                        Unduh profil perusahaan kami untuk informasi lebih lengkap mengenai spesifikasi teknis dan legalitas.
                                    </p>
                                    <a 
                                        href={`/storage/${getConfig('company_profile_pdf')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full justify-center items-center gap-2 bg-slate-800 border border-slate-700 hover:border-orange-500/50 text-slate-200 hover:text-white font-semibold py-3 px-6 rounded-xl transition duration-200 text-sm"
                                    >
                                        Unduh Brosur PDF (Company Profile)
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Box: Layanan Lainnya */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Layers className="w-5 h-5 text-orange-500" />
                                <h3 className="font-bold text-xl text-slate-900 dark:text-white">Layanan Lainnya</h3>
                            </div>
                            
                            <div className="space-y-5">
                                {related_services.map((item) => (
                                    <Link 
                                        key={item.id}
                                        href={`/layanan/${item.slug}`}
                                        className="group flex gap-4 items-center"
                                    >
                                        <div className="w-20 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                onError={handleImageError}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                            />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Box: Keunggulan */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-5">Mengapa Memilih Kami?</h3>
                            <ul className="space-y-3">
                                {['Kualitas Standar Global', 'Harga Kompetitif', 'Custom Sesuai Kebutuhan', 'Pengiriman Cepat'].map((text, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>

                {/* --- RECOMMENDATION SECTION (PRODUK) --- */}
                <section className="mt-24 border-t border-slate-100 dark:border-slate-800 pt-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase">
                                <Package className="w-4 h-4" /> Solusi Produk
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Rekomendasi Untuk Anda
                            </h2>
                        </div>
                        <Link href="/katalog" className="text-orange-500 font-bold text-sm hover:underline">
                            Lihat Semua Katalog
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.slug} product={product} />
                        ))}
                    </div>
                </section>
            </main>
            <CtaSection />
        </FrontendLayout>
    );
}