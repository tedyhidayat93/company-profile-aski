import React, { useState } from 'react';
import { usePage } from '@inertiajs/react'; // <-- Menggunakan Inertia hook untuk mendeteksi URL halaman aktif
import { Send, Check, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { useConfig } from '@/utils/config';
import axios from 'axios'; 

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_approve_terms: boolean; // <-- Ditambahkan untuk persetujuan privasi
}

interface QuoteFormCardProps {
  pageName: string; 
  orientation?: 'vertical' | 'horizontal';
}

export default function QuoteMiniFormCard({ pageName, orientation = 'vertical' }: QuoteFormCardProps) {
  const { getConfig } = useConfig();
  
  const { url, visitorActions = {} } = usePage().props as any;

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    is_approve_terms: false, // <-- State awal false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // State untuk modal detail privasi

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string, altText: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackUrl;
    target.alt = altText;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.is_approve_terms) return; // Validasi tambahan jika belum dicentang
    setIsSubmitting(true);

    // Mendapatkan URL penuh dari browser atau fallback ke Inertia
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url;

    // Definisikan fungsi untuk membuka WhatsApp agar bisa dipakai berulang
    const redirectToWhatsApp = () => {
        const whatsappPhone = getConfig('contact_whatsapp', '6281282336464');
        const companyText = form.company ? `\n*Perusahaan:* ${form.company}` : '';
        
        const text = `Halo, saya tertarik dengan produk container Anda.\n\n*Nama:* ${form.name}${companyText}\n*Email:* ${form.email}\n*WhatsApp/Telp:* ${form.phone}\n*Kebutuhan Projek:* ${form.subject}\n*Pesan Tambahan:* ${form.message}\n\n_(Dikirim via halaman: ${pageName})_\n_(URL Sumber: ${currentUrl})_`;
        
        window.open(
          `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(text)}`, 
          '_blank', 
          'noopener,noreferrer'
        );
        // Reset form setelah sukses
        setForm({
          name: '',
          company: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          is_approve_terms: false,
        });
    };

    try {
        // Simpan ke Back-End lengkap dengan is_approve_terms
        await axios.post('/api/visitor-logs/leads', {
            ...form,
            source_page: pageName, 
            source_url: currentUrl,
            action_type: visitorActions.WA_MINI_FORM_QUOTE_REQUEST || '' 
        });

        // Beri jeda 600ms jika berhasil, agar proses simpan BE benar-benar selesai
        await new Promise((resolve) => setTimeout(resolve, 600));
        
        // Matikan loading & buka WhatsApp
        setIsSubmitting(false);
        redirectToWhatsApp();

    } catch (error) {
        // JIKA GAGAL: Log error hanya di konsol dev agar tidak mengganggu user
        console.error('Gagal menyimpan ke BE, mengalihkan langsung ke WhatsApp:', error);
        
        // Tanpa jeda, langsung matikan loading & langsung buka WhatsApp secara seamless
        setIsSubmitting(false);
        redirectToWhatsApp();
    }
  };

  const isHorizontal = orientation === 'horizontal';

  return (
    <>
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

              {/* ☑️ CHECKBOX PERSETUJUAN (is_approve_terms) */}
              <div className={`pt-1 ${isHorizontal ? 'col-span-1 sm:col-span-2' : ''}`}>
                <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      required
                      disabled={isSubmitting}
                      checked={form.is_approve_terms}
                      onChange={(e) => setForm({ ...form, is_approve_terms: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 rounded border border-slate-400 bg-white dark:bg-slate-800 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                      <Check className="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-tight">
                    <span className="font-medium">Saya menyetujui</span> pengumpulan data ini semata-mata untuk komunikasi transaksi, penawaran harga, &amp; administrasi kerjasama. 
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-orange-600 dark:text-orange-400 font-bold ml-1 hover:underline inline-flex items-center gap-0.5"
                    >
                      Detail <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </label>
              </div>

              {/* Tombol Aksi */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !form.is_approve_terms}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white disabled:text-slate-500 font-bold py-2.5 px-4 rounded-lg shadow-sm transition duration-150 text-sm uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" /> 
                  {isSubmitting ? 'Memproses...' : 'Kirim via WhatsApp'}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* 🛡️ MODAL DETAIL KEBIJAKAN PRIVASI & PENGGUNAAN DATA */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 font-sans">
            
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Komitmen Keamanan & Privasi Data</h3>
                <span className="text-xs text-slate-500 font-medium">Perlindungan Data Konsumen Alumoda</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                Kami sangat menghargai privasi dan kerahasiaan informasi pribadi Anda. Setiap data yang Anda masukkan dikelola secara ketat dengan ketentuan sebagai berikut:
              </p>
              
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Eksklusif untuk Komunikasi Internal
                </h4>
                <p>
                  Data Anda <strong>tidak akan pernah</strong> diperjualbelikan, disewakan, atau dibagikan kepada pihak ketiga manapun di luar kepentingan operasional perusahaan.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Keperluan Transaksi & Penawaran Kerjasama
                </h4>
                <p>
                  Informasi yang Anda berikan digunakan semata-mata untuk mempermudah komunikasi awal, menyusun proposal penawaran harga (Quotation), serta proses administrasi transaksi resmi (seperti pembuatan dokumen Surat Perjanjian Kerja / Invoice) apabila terjalin kerjasama bisnis dengan kami.
                </p>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan ini, silakan hubungi tim kami langsung melalui kontak yang tersedia.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                Saya Mengerti &amp; Setuju
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}