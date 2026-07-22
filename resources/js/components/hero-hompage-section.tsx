import { useState, useEffect } from 'react';
import { SearchIcon, Box, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types';

interface ClientData {
  name: string;
  is_pinned: boolean;
  logo: string;
}

interface HeroProps {
  products?: Product[];
  clients?: ClientData[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  placeholder?: string;
  getConfig: (key: string, fallback: string) => string;
  handleImageError: (e: any, fallback: string, alt: string) => void;
}

export default function HeroSection({
  products = [],
  clients = [], 
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
  placeholder,
  getConfig,
  handleImageError
}: HeroProps) {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFade, setIsFade] = useState(false);

  useEffect(() => {
    if (!products || products.length <= 1) return;

    const interval = setInterval(() => {
      setIsFade(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        setIsFade(false);
      }, 300);

    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const activeProduct = products?.[currentIndex];

  return (
    <section id="home" className="w-full bg-white dark:bg-slate-950 sm:pt-4 pb-3 px-0 sm:px-6 lg:px-8">
      {/* 🔲 CONTAINER UTAMA: Menggunakan Slate Pekat (Mendekati Hitam/Abu Baja) agar Aksen Oranye Menyala */}
      <div className="sm:max-w-[94vw] mx-auto relative bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-b-4xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[3.5rem] p-3 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px] lg:min-h-[680px] overflow-hidden items-stretch">
        
        {/* ================= 📝 SISI KIRI: TEXT CONTENT & SEARCH ================= */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between py-8 pl-4 pr-2 sm:pl-6 lg:pl-10 z-10 space-y-12">
          
          <div className="space-y-6">
            {/* Judul Besar dengan sentuhan aksen teks Oranye */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.1]">
              <span dangerouslySetInnerHTML={{ 
                __html: getConfig('hero_title', 'Sewa, Jual Beli & <br/><span className="text-orange-500">Repair Container</span>') 
              }} />
            </h1>
            
            {/* Deskripsi */}
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
              {getConfig('hero_description', 'Solusi lengkap untuk sewa kontainer office & dry, jual-beli, serta jasa modifikasi kustom terbaik seluruh Indonesia dengan armada mandiri.')}
            </p>

            {/* Form Pencarian dengan Aksen Border Focus Oranye */}
            <div className="w-full max-w-3xl xl:max-w-xl pt-4">
              <form onSubmit={handleSearch} className="w-full">
                {/* Pembungkus utama diubah menjadi putih solid (bg-white) */}
                <div className="relative flex items-center bg-white border border-slate-200 p-1.5 rounded-2xl focus-within:ring-4 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all shadow-lg">
                  
                  {/* Warna ikon disesuaikan menjadi slate-400 agar kontras di atas warna putih */}
                  <div className="flex items-center pl-3 text-slate-400">
                    <SearchIcon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  
                  {/* Input dibuat bg-transparent, warna teks diubah ke text-slate-900 agar terbaca jelas */}
                  <input
                    type="text"
                    placeholder={placeholder || 'Cari kontainer office, reefer, dll...'}
                    className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-slate-900 placeholder-slate-400 font-semibold text-sm px-3 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  {/* Tombol oranye tetap dipertahankan sebagai aksen utama */}
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="shrink-0 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-black px-6 py-2.5 text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20"
                  >
                    {isSearching ? '...' : 'Cari'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 👥 BOTTOM LEFT AREA: Avatar Stack Clients */}
          {clients && clients.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 select-none pt-4 border-t border-white/5 w-full overflow-hidden">
              
              {/* Wording Teks Pendukung */}
              <p className="text-xs font-black text-slate-400 tracking-wide uppercase leading-tight shrink-0 max-w-[180px] sm:max-w-none">
                Telah Dipercaya oleh
              </p>

              {/* Container Utama untuk Track Animasi */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className={`flex items-center gap-4 py-1 ${clients.length > 3 ? 'w-max animate-marquee' : ''}`}>
                  
                  {/* Looping Pertama */}
                  {clients.map((client, index) => (
                    <div 
                      key={`orig-${index}`} 
                      className="inline-block h-12 w-12 lg:h-14 lg:w-14 rounded-full ring-2 ring-slate-900 bg-white overflow-hidden p-2 shadow-sm shrink-0"
                      title={client.name}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain filter grayscale-70 hover:grayscale-0 opacity-85 hover:opacity-100 transition-all"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                      />
                    </div>
                  ))}

                  {/* Duplikasi Looping Kedua (Hanya aktif jika client > 3 untuk menyambung animasi tanpa jeda) */}
                  {clients.length > 3 && clients.map((client, index) => (
                    <div 
                      key={`dup-${index}`} 
                      className="inline-block h-12 w-12 lg:h-14 lg:w-14 rounded-full ring-2 ring-slate-900 bg-white overflow-hidden p-2 shadow-sm shrink-0"
                      title={client.name}
                      aria-hidden="true"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain filter grayscale-70 hover:grayscale-0 opacity-85 hover:opacity-100 transition-all"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                      />
                    </div>
                  ))}

                </div>
              </div>

            </div>
          )}

        </div>

        {/* ================= 🖼️ SISI KANAN: HERO IMAGE FULL FRAME CARD ================= */}
        <div className="col-span-1 lg:col-span-6 relative w-full h-[400px] lg:h-auto rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden group shadow-2xl border border-slate-800">
          
          {/* Gambar Latar Belakang Utama Dinamis */}
          <img 
            src={'/storage/' + getConfig('hero_image', '')} 
            alt="Alumoda Sinergi Kontainer Indonesia" 
            className="absolute inset-0 z-0 object-cover w-full h-full transform group-hover:scale-102 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => handleImageError(e, '/images/bg-hero.png', "Hero background image")}
          />
          
          {/* Overlay Gelap Transparan */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-slate-950/30 z-10" />

          {/* Floating Widget 1: Info Unit Terkini */}
          {activeProduct && (
            <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-md bg-slate-900/30 dark:bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl transition-all duration-300">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase mb-0.5">Featured Unit</span>
                <h3 className={`font-black text-white text-sm sm:text-base line-clamp-2 sm:line-clamp-1 transition-opacity ${isFade ? 'opacity-40' : 'opacity-100'}`}>
                  {activeProduct.name}
                </h3>
              </div>
              
              <Link 
                href={`/katalog/${activeProduct.slug}`}
                className="shrink-0 inline-flex w-full sm:w-fit h-9 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-4 text-xs font-extrabold transition-all gap-1.5 group/btn"
              >
                Minta Penawaran <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}

          {/* Floating Widget 2: Slider Indicator Menggunakan Warna Oranye */}
          {products.length > 1 && (
            <div className="absolute top-6 right-6 z-20 flex gap-1.5 bg-slate-950/40 backdrop-blur-xs px-3 py-2 rounded-full border border-white/5">
              {products.map((_, index) => (
                <span 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'w-4 bg-orange-500' : 'w-1.5 bg-white/40'
                  }`} 
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}