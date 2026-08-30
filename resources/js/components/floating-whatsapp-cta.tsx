import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { X, Phone, User, FileText, Send, LucidePhone, Loader2, PhoneCall, Lock, ShieldCheck, ExternalLink, Check, Mail } from 'lucide-react';
import { useConfig } from '@/utils/config';

export default function FloatingWhatsAppCTA() {
  const { getConfig } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // State untuk modal detail privasi
  
  // 1. Ambil properti global props dari Inertia & ambil data rute saat ini
  const { visitorActions = {}, appPages = {} } = usePage().props as any;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Fungsi Deteksi Halaman Otomatis Berdasarkan URL Path (Pendekatan Switch Case Clean)
  const detectPageName = (): string => {
    if (typeof window === 'undefined') return appPages.UNKNOWN || 'unknown_page';

    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    switch (true) {
        // 1. Static Pages & Root
        case (path === '/' || path === ''):
        return appPages.HOMEPAGE;
        case (path === '/kontak'):
        return appPages.CONTACT_US;
        case (path === '/tentang-kami'):
        return appPages.ABOUT_US;
        case (path === '/sitemap' || path === '/sitemap.xml'):
        return appPages.SITEMAP;

        // 2. Services Section
        case (path === '/layanan'):
        return appPages.SERVICE_INDEX;
        case (path.startsWith('/layanan/')):
        return appPages.SERVICE_SHOW;

        // 3. Products Section
        case (path === '/produk'):
        return appPages.PRODUCT_INDEX;
        case (path.startsWith('/produk/')):
        return appPages.PRODUCT_DETAIL;

        // 4. Catalog Section
        case (path === '/katalog' || path === '/katalog/'):
        return appPages.CATALOG_INDEX;
        case (path.startsWith('/katalog/kategori/')):
        return appPages.CATALOG_CATEGORY;
        case (path.startsWith('/katalog/')):
        return appPages.CATALOG_SHOW;

        // 5. Testimonial Section
        case (path === '/testimonial' || path === '/testimonial/'):
        return appPages.TESTIMONIAL_INDEX;
        case (path === '/testimonial/maps'):
        return appPages.TESTIMONIAL_MAPS;

        // 6. Blog / Info Section
        case (path === '/info' || path === '/info/'):
        return appPages.BLOG_INDEX;
        case (path.startsWith('/info/kategori/')):
        return appPages.BLOG_CATEGORY;
        case (path.startsWith('/info/tag/')):
        return appPages.BLOG_TAG;

        // 7. Catch-All Route (e.g., domain.com/judul-artikel)
        case (segments.length === 1):
        return appPages.BLOG_DETAIL;

        // Default Fallback
        default:
        return appPages.UNKNOWN || 'unknown_page';
    }
  };

  const pageName = detectPageName();

  // State untuk form isian + is_approve terms
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    is_approve_terms: false
  });

  // Pengecekan localStorage untuk pembatasan popup otomatis per 3 jam
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

  // 3. Fungsi Eksekusi Alih ke WhatsApp
  const redirectToWhatsApp = () => {
    const waNumber = getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '');
    const defaultMessage = getConfig('whatsapp_message', 'Halo Alumoda');
    
    let textParams = `${defaultMessage}`;
    if (formData.name) textParams += `\n\n*Nama:* ${formData.name}`;
    if (formData.phone) textParams += `\n*Telepon:* ${formData.phone}`;
    if (formData.email) textParams += `\n*Email:* ${formData.email}`;
    if (formData.message) textParams += `\n*Layanan/Pesan:* ${formData.message}`;
    textParams += `\n\n_(Dikirim via: ${pageName})_\n_(URL: ${currentUrl})_`;

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(textParams)}`;
    
    window.open(waLink, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', phone: '', message: '', is_approve_terms: false }); // Reset form
    setIsOpen(false);
  };

  // 4. Form Submit Handler Terintegrasi Log Analitik Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.is_approve_terms) return; // Validasi tambahan jika belum dicentang
    setIsSubmitting(true);

    try {
      // Rekam data leads ke Backend lengkap dengan status is_approve
      await axios.post('/api/visitor-logs/leads', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        is_approve_terms: formData.is_approve_terms,
        source_page: pageName,
        source_url: currentUrl,
        action_type: visitorActions.WA_GLOBAL_FLOATING || ''
      });

      // Memberikan jeda singkat agar proses penyimpanan di backend tuntas
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitting(false);
      redirectToWhatsApp();
    } catch (error) {
      console.error('Gagal menyimpan log analitik, mengalihkan langsung ke WhatsApp:', error);
      setIsSubmitting(false);
      redirectToWhatsApp();
    }
  };

  return (
    <>
      <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-3 w-[calc(100vw-32px)] sm:w-[380px] font-sans">
        
        {/* 💬 POPUP KOTAK DIALOG + FORM EDITORIAL */}
        {isOpen && (
          <div className="w-full bg-white dark:bg-zinc-900 border-4 border-orange-500 dark:border-zinc-800 rounded-2xl shadow-xl p-4 lg:p-6 relative animate-in fade-in slide-in-from-bottom-5 duration-300 max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              aria-label="Tutup jendela bantuan"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

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

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 font-medium">
              Dapatkan penawaran terbaik dari kami atau konsultasikan kebutuhan Container Anda. Tim kami akan langsung memandu Anda melalui WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={isSubmitting}
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-sm font-extrabold text-zinc-950 dark:text-white block">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-emerald-600 transition-colors">
                    <PhoneCall className="w-5 h-5 stroke-[2]" />
                  </span>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-sm font-extrabold text-zinc-950 dark:text-white block">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 group-focus-within:text-emerald-600 transition-colors">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </span>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Contoh: email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors disabled:opacity-60"
                  />
                </div>
              </div>

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
                    disabled={isSubmitting}
                    placeholder="Tuliskan produk atau bantuan yang Anda perlukan di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-base font-medium text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-colors resize-none leading-relaxed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* ☑️ CHECKBOX PERSETUJUAN (is_approve) */}
              <div className="pt-1 pb-1">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      required
                      disabled={isSubmitting}
                      checked={formData.is_approve_terms}
                      onChange={(e) => setFormData({ ...formData, is_approve_terms: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-300 leading-tight">
                    <span className="font-semibold">Saya menyetujui</span> pengumpulan data ini semata-mata untuk keperluan komunikasi transaksi, penawaran harga, &amp; administrasi kerjasama bisnis. 
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-emerald-600 dark:text-emerald-400 font-bold ml-1 hover:underline inline-flex items-center gap-0.5"
                    >
                      Pelajari <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.is_approve_terms}
                className="flex h-12 w-full items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white disabled:text-zinc-500 font-extrabold rounded-xl text-sm lg:text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses Ke WhatsApp...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 fill-white" />
                    Kirim Pesan via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="relative group/button flex items-center gap-3">
          {!isOpen && (
            <div className="absolute right-20 bg-zinc-900 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap shadow-md opacity-0 scale-95 pointer-events-none translate-x-2 group-hover/button:opacity-100 group-hover/button:scale-100 group-hover/button:translate-x-0 transition-all duration-200 after:content-[''] after:absolute after:top-1/2 after:-right-1 after:-mt-1 after:border-4 after:border-y-transparent after:border-r-transparent after:border-l-zinc-900 hidden sm:block">
              Butuh bantuan? Chat / hubungi kami di sini!
            </div>
          )}

          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />
          )}

          <button
            onClick={() => !isSubmitting && setIsOpen(!isOpen)}
            disabled={isSubmitting}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white dark:border-zinc-800 focus:outline-none cursor-pointer relative z-10 disabled:opacity-80"
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

      {/* 🛡️ MODAL DETAIL KEBIJAKAN PRIVASI & PENGGUNAAN DATA */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 font-sans">
            
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Komitmen Keamanan & Privasi Data</h3>
                <span className="text-xs text-zinc-500 font-medium">Perlindungan Data Konsumen Alumoda</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                Kami sangat menghargai privasi dan kerahasiaan informasi pribadi Anda. Setiap data yang Anda masukkan (Nama, No. Telepon, Email, dan Pesan) dikelola secara ketat dengan ketentuan sebagai berikut:
              </p>
              
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Eksklusif untuk Komunikasi Internal
                </h4>
                <p>
                  Data Anda <strong>tidak akan pernah</strong> diperjualbelikan, disewakan, atau dibagikan kepada pihak ketiga manapun di luar kepentingan operasional perusahaan.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Keperluan Transaksi & Penawaran Kerjasama
                </h4>
                <p>
                  Informasi yang Anda berikan digunakan semata-mata untuk mempermudah komunikasi awal, menyusun proposal penawaran harga (Quotation), serta proses administrasi transaksi resmi (seperti pembuatan dokumen Surat Perjanjian Kerja / Invoice) apabila terjalin kerjasama bisnis dengan kami.
                </p>
              </div>

              <p className="text-[11px] text-zinc-500 pt-1">
                Jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan ini, silakan hubungi tim kami langsung melalui layanan pelanggan yang tersedia.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
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