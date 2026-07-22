import React, { useState } from 'react';
import { usePage } from '@inertiajs/react'; // <-- Menggunakan Inertia hook untuk mendeteksi URL halaman aktif
import { Send } from 'lucide-react';
import { useConfig } from '@/utils/config';
import axios from 'axios'; 

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface QuoteFormCardProps {
  pageName: string; 
  orientation?: 'vertical' | 'horizontal';
}

export default function QuoteMiniFormCard({ pageName, orientation = 'vertical' }: QuoteFormCardProps) {
  const { getConfig } = useConfig();
  
  // Mengambil info halaman dari konteks Inertia.js
  const { url } = usePage(); // `url` akan berisi path & query string saat ini (misal: /produk/office-container?ref=footer)

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string, altText: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackUrl;
    target.alt = altText;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mendapatkan URL penuh dari browser atau fallback ke Inertia
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url;

    // 1. Definisikan fungsi untuk membuka WhatsApp agar bisa dipakai berulang
    const redirectToWhatsApp = () => {
        const whatsappPhone = getConfig('contact_whatsapp', '6281282336464');
        const companyText = form.company ? `\n*Perusahaan:* ${form.company}` : '';
        
        const text = `Halo, saya tertarik dengan produk container Anda.\n\n*Nama:* ${form.name}${companyText}\n*Email:* ${form.email}\n*WhatsApp/Telp:* ${form.phone}\n*Kebutuhan Projek:* ${form.subject}\n*Pesan Tambahan:* ${form.message}\n\n_(Dikirim via halaman: ${pageName})_\n_(URL Sumber: ${currentUrl})_`;
        
        window.open(
        `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(text)}`, 
        '_blank', 
        'noopener,noreferrer'
        );
    };

    try {
        // 2. Coba simpan ke Back-End terlebih dahulu
        await axios.post('/api/visitor-logs/leads', {
        ...form,
        source_page: pageName, 
        source_url: currentUrl, 
        action_type: 'whatsapp_quote_request'
        });

        // Beri jeda 600ms jika berhasil, agar proses simpan BE benar-benar selesai
        await new Promise((resolve) => setTimeout(resolve, 600));
        
        // Matikan loading & buka WhatsApp
        setIsSubmitting(false);
        redirectToWhatsApp();

    } catch (error) {
        // 3. JIKA GAGAL: Log error hanya di konsol dev agar tidak mengganggu user
        console.error('Gagal menyimpan ke BE, mengalihkan langsung ke WhatsApp:', error);
        
        // Tanpa jeda, langsung matikan loading & langsung buka WhatsApp secara seamless
        setIsSubmitting(false);
        redirectToWhatsApp();
    }
    };

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`w-full mx-auto rounded-2xl overflow-hidden relative border border-white/20 shadow-xl font-sans antialiased my-6 ${isHorizontal ? 'max-w-5xl' : 'max-w-md'}`}>
      
      {/* BACKGROUND IMAGE DINAMIS */}
      <div className="absolute inset-0 z-0">
        <img 
          src={'/storage/' + getConfig('hero_image', '')} 
          alt="Alumoda Sinergi Kontainer Indonesia" 
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => handleImageError(e, '/images/bg-hero.png', "Hero background image")}
        />
        <div className="absolute inset-0 bg-slate-950/15" />
      </div>

      {/* STRUKTUR GLASMORPHISM DENGAN KONDISI ORIENTASI */}
      <div className={`relative z-10 w-full h-full bg-white/80 dark:bg-slate-900/85 backdrop-blur-sm flex border border-white/30 ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'}`}>
        
        {/* BAGIAN JUDUL / BRANDING */}
        <div className={`p-6 sm:p-8 flex flex-col justify-between bg-orange-500/5 ${isHorizontal ? 'w-full md:w-[38%] border-b md:border-b-0 md:border-r border-slate-200/50' : 'w-full border-b border-slate-200/50'}`}>
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-1">
              Segera Hubungi Kami
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-wide uppercase leading-snug">
              Dapatkan Penawaran
            </h3>
            <p className="text-sm text-slate-650 dark:text-slate-300 mt-2 font-bold leading-relaxed">
              Silakan isi formulir untuk mendapatkan estimasi harga container atau pengerjaan unit kontainer kustom Anda.
            </p>
          </div>
          
          {isHorizontal && (
            <div className="mt-6 pt-4 border-t border-slate-300/50 hidden md:block">
              <p className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Terhubung ke WhatsApp Resmi
              </p>
            </div>
          )}
        </div>

        {/* BAGIAN FORMULIR UTAMA */}
        <div className={`p-6 bg-white/50 dark:bg-slate-950/25 ${isHorizontal ? 'w-full md:w-[62%]' : 'w-full'}`}>
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            
            <div className={`grid gap-4 ${isHorizontal ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              
              {/* Nama Lengkap */}
              <div className={`space-y-1 ${isHorizontal ? 'col-span-1 sm:col-span-2' : ''}`}>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                  placeholder="Nama Anda"
                />
              </div>

              {/* Nama Perusahaan */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex justify-between">
                  <span>Perusahaan</span>
                  <span className="text-[11px] text-slate-400 font-normal self-center">(Opsional)</span>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                  placeholder="Nama Perusahaan"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                  placeholder="Contoh: 0812345678"
                />
              </div>

              {/* Email */}
              <div className={`space-y-1 ${isHorizontal ? 'col-span-1 sm:col-span-2' : ''}`}>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                  placeholder="alamat@email.com"
                />
              </div>

              {/* Rencana Kebutuhan */}
              <div className={`space-y-1 ${isHorizontal ? 'col-span-1 sm:col-span-2' : ''}`}>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Jenis Kebutuhan Unit</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                  placeholder="Contoh: Office Container 20ft"
                />
              </div>

              {/* Detail Spesifikasi */}
              <div className={`space-y-1 ${isHorizontal ? 'col-span-1 sm:col-span-2' : ''}`}>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Detail / Pesan Tambahan</label>
                <textarea
                  rows={2}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/90 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition resize-none"
                  placeholder="Spesifikasi kustom atau lokasi pengiriman..."
                />
              </div>

            </div>

            {/* Tombol Aksi */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition duration-150 text-sm uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> 
                {isSubmitting ? 'Memproses...' : 'Kirim via WhatsApp'}
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}