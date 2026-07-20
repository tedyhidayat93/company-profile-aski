import { useState, useEffect } from 'react';
import { X, Phone, User, FileText, Send, LucidePhone } from 'lucide-react';
import { useConfig } from '@/utils/config';

export default function FloatingWhatsAppCTA() {
    const { getConfig } = useConfig();
    const [isOpen, setIsOpen] = useState(false);
    
    // State untuk form isian
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    // Pengecekan localStorage untuk pembatasan 3 jam
    useEffect(() => {
        const STORAGE_KEY = 'alumoda_cta_dismissed_at';
        const THREE_HOURS = 3 * 60 * 60 * 1000;
        const now = Date.now();
        const dismissedAt = localStorage.getItem(STORAGE_KEY);

        if (!dismissedAt) {
            const timer = setTimeout(() => setIsOpen(true), 2500);
            return () => clearTimeout(timer);
        } else {
            const timePassed = now - parseInt(dismissedAt, 10);
            if (timePassed > THREE_HOURS) {
                localStorage.removeItem(STORAGE_KEY);
                const timer = setTimeout(() => setIsOpen(true), 2500);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
        localStorage.setItem('alumoda_cta_dismissed_at', Date.now().toString());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const waNumber = getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '');
        const defaultMessage = getConfig('whatsapp_message', 'Halo Alumoda');
        
        // Menyusun teks kustom dari form
        let textParams = `${defaultMessage}`;
        if (formData.name) textParams += `\n\nNama: ${formData.name}`;
        if (formData.message) textParams += `\nLayanan/Pesan: ${formData.message}`;

        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(textParams)}`;
        
        // Buka tab baru WhatsApp
        window.open(waLink, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 w-[calc(100vw-32px)] sm:w-[380px] font-sans">
            
            {/* 💬 POPUP KOTAK DIALOG + FORM EDITORIAL */}
            {isOpen && (
                <div className="w-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative animate-in fade-in slide-in-from-bottom-5 duration-300">
                    
                    {/* Tombol Tutup Silang (X) yang Besar */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-150 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Tutup jendela bantuan"
                    >
                        <X className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    {/* Header Profil Pelayanan */}
                    <div className="flex items-center gap-3.5 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                            <Phone className="w-5 h-5 fill-white" />
                        </div>
                        <div>
                            <h4 className="text-base font-extrabold text-zinc-950 dark:text-white leading-snug">Layanan Pelanggan 24/7</h4>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                Online • Tanggapan Cepat
                            </span>
                        </div>
                    </div>

                    {/* Deskripsi Pengantar Gaya Editorial */}
                    <p className="text-base text-zinc-800 dark:text-zinc-300 leading-relaxed mb-5 font-normal">
                        Dapatkan Penawaran terabik dari kami atau konsultasikan kepada kami kebutuhan Container anda. Tim kami akan langsung memandu Anda melalui percakapan WhatsApp.
                    </p>

                    {/* FORM INTERAKTIF */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Input 1: Nama */}
                        <div className="space-y-1.5 group">
                            <label className="text-sm font-extrabold text-zinc-950 dark:text-white block">
                                Nama Lengkap Anda
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-emerald-600 transition-colors">
                                    <User className="w-5 h-5 stroke-[2]" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Budi Santoso"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Input 2: Isi Pesan */}
                        <div className="space-y-1.5 group">
                            <label className="text-sm font-extrabold text-zinc-950 dark:text-white block">
                                Pertanyaan atau Pesan Anda
                            </label>
                            <div className="relative">
                                <span className="absolute top-3.5 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-emerald-600 transition-colors">
                                    <FileText className="w-5 h-5 stroke-[2]" />
                                </span>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Tuliskan produk atau bantuan yang Anda perlukan di sini..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Tombol Kirim Besar & Mantap */}
                        <button
                            type="submit"
                            className="flex h-13 w-full items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-base transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99]"
                        >
                            <Send className="w-5 h-5 fill-white" />
                            Kirim Pertanyaan via WhatsApp
                        </button>
                    </form>
                </div>
            )}

            <div className="relative group/button flex items-center gap-3">
                
                {/* 💡 Tooltip Hint (Muncul otomatis di sebelah kiri tombol saat belum dibuka) */}
                {!isOpen && (
                    <div className="absolute right-20 bg-zinc-900 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap shadow-md opacity-0 scale-95 pointer-events-none translate-x-2 group-hover/button:opacity-100 group-hover/button:scale-100 group-hover/button:translate-x-0 transition-all duration-255 font-sans after:content-[''] after:absolute after:top-1/2 after:-right-1 after:-mt-1 after:border-4 after:border-y-transparent after:border-r-transparent after:border-l-zinc-900 hidden sm:block">
                        Butuh bantuan? Chat / hubungi kami di sini!
                    </div>
                )}

                {/* Efek Lingkaran Denyut (Hanya aktif saat popup tertutup agar eye-catching) */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />
                )}

                {/* Tombol Utama */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white dark:border-zinc-800 focus:outline-none cursor-pointer relative z-10`}
                    aria-label="Buka formulir chat WhatsApp"
                >
                    {isOpen ? (
                        <X className="w-7 h-7 stroke-[2.5] animate-in spin-in-90 duration-200" />
                    ) : (
                        <LucidePhone className="w-8 h-8 fill-white hover:rotate-12 transition-transform duration-200" />
                    )}
                </button>
            </div>
            

        </div>
    );
}