import { useState, useEffect } from 'react';
import { Loader, SearchIcon, Box, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types';

interface HeroProps {
  products?: Product[];
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
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
  placeholder,
  getConfig,
  handleImageError
}: HeroProps) {
  
  // State untuk melacak indeks produk yang aktif di slider
  const [currentIndex, setCurrentIndex] = useState(0);
  // State untuk memicu animasi transisi saat slide berganti
  const [isFade, setIsFade] = useState(false);

  // Efek untuk auto-slide setiap 4 detik
  useEffect(() => {
    if (!products || products.length <= 1) return;

    const interval = setInterval(() => {
      setIsFade(true); // Mulai efek menghilang
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        setIsFade(false); // Selesai efek memunculkan slide baru
      }, 300); // Waktu jeda transisi transparan (ms)

    }, 4000); // Durasi per slide (4 detik)

    return () => clearInterval(interval);
  }, [products]);

  const activeProduct = products?.[currentIndex];

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-amber-400 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300/80 via-amber-400/70 to-orange-900/80 animate-gradient-wave" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-gradient-wave-slow blur-xl" />
      </div>

      <img 
        src={'/storage/' + getConfig('hero_image', '')} 
        alt="Alumoda Sinergi Kontainer Indonesia" 
        className="absolute inset-0 z-10 object-cover w-full h-full"
        loading="eager"
        onError={(e) => handleImageError(e, '/images/bg-hero.png', "Hero background image")}
      />
      
      {/* Main Container - Grid System */}
      <div className="container relative z-40 mx-auto px-4 py-12 sm:px-6 lg:px-8 mt-16 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* SEBELAH KIRI: Deskripsi & Search Content */}
          <div className="lg:col-span-7 text-center xl:text-left text-white animate-fade-in-up space-y-6">
            <h1 className="font-black leading-[1.1] sm:leading-[0.95] tracking-tighter text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-slate-900">
              <span dangerouslySetInnerHTML={{ 
                __html: getConfig('hero_title', 
                'Solusi Terpercaya <br class="hidden sm:inline" /> Untuk ' + 
                '<span class="relative inline-block mx-2">' +
                  '<span class="relative z-10 px-4 py-1 text-white bg-slate-900 shadow-xl transform -rotate-1 inline-block">Kontainer</span>' +
                '</span>' + 
                ' Anda') 
              }} />
            </h1>
            
            <p className="max-w-2xl font-bold text-base md:text-lg text-slate-900/90 leading-relaxed">
              {getConfig('hero_description', 'Kami menyediakan berbagai pilihan kontainer untuk disewa atau dibeli. Mulai dari Kontainer standar hingga Kontainer Custom sesuai kebutuhan Anda.')}
            </p>

            {/* Search Bar Form */}
            <div className="w-full xl:max-w-xl pt-2">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder={placeholder || 'Cari kontainer...'}
                    className="w-full rounded-full border-2 border-white/20 bg-white/90 px-6 py-4 pr-14 md:pr-36 text-gray-900 placeholder-gray-500 backdrop-blur-lg focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-sm md:text-base shadow-lg transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 transform rounded-full px-4 py-2.5 md:px-8 md:py-3 font-bold transition-all ${
                      isSearching 
                        ? 'bg-amber-500 text-white cursor-wait' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isSearching ? (
                      <div className="flex text-sm items-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Mencari...
                      </div>
                    ) : (
                      <span className="text-sm md:text-base flex items-center gap-1">
                        <SearchIcon className='w-4 h-4'/> Cari 
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Features Badges */}
            <div className="flex flex-wrap gap-3 pt-2 w-full justify-center xl:justify-start">
              {[
                { text: getConfig('feature_stock_available', 'Stok Tersedia'), color: 'bg-green-500' },
                { text: getConfig('feature_quality_guarantee', 'Garansi Kualitas'), color: 'bg-blue-500' },
                { text: getConfig('feature_competitive_price', 'Harga Kompetitif'), color: 'bg-amber-500' },
                { text: getConfig('feature_support_247', 'Support 24/7'), color: 'bg-slate-900' }
              ].map((feat, idx) => (
                <span key={idx} className="flex items-center text-xs md:text-sm font-black bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                  <span className={`mr-2 flex h-2.5 w-2.5 rounded-full ${feat.color} animate-pulse`} />
                  {feat.text}
                </span>
              ))}
            </div>
          </div>

          {/* SEBELAH KANAN: Auto-Sliding Shuffle Product */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center min-h-[380px]">
            {activeProduct ? (
              <div className="w-full max-w-sm flex flex-col items-center space-y-4">
                
                {/* Wrapper Card dengan animasi fade-in-out */}
                <div className={`w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20 transform hover:scale-[1.01] group/card relative overflow-hidden transition-all duration-300 ${
                  isFade ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                  
                  {/* Badges Status (Bestseller / New) */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {activeProduct.is_bestseller && (
                      <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Laris
                      </span>
                    )}
                    {activeProduct.is_new && (
                      <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Baru
                      </span>
                    )}
                  </div>

                  {/* Status Jual / Sewa di Pojok Kanan Atas */}
                  <div className="absolute top-3 right-3 z-10 flex gap-1 font-bold text-[10px]">
                    {activeProduct.is_rent && (
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md">Sewa</span>
                    )}
                    {activeProduct.is_for_sell && (
                      <span className="bg-orange-600 text-white px-2 py-0.5 rounded-md">Dijual</span>
                    )}
                  </div>
                  
                  {/* Product Image */}
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-100 relative">
                    <img 
                      src={activeProduct.image || '/images/placeholder-container.png'} 
                      alt={activeProduct.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-container.png';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 space-y-2">
                    <h3 className="font-black text-slate-900 text-lg md:text-xl line-clamp-1">
                      {activeProduct.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 font-medium min-h-[40px]">
                      {activeProduct.description || 'Tidak ada deskripsi singkat.'}
                    </p>
                    
                    {/* Footer Card: Tombol Aksi */}
                    <div className="pt-3 flex items-center justify-end border-t border-gray-100">
                      <Link 
                        href={`/catalog/${activeProduct.slug}`}
                        className="inline-flex h-9 items-center justify-center rounded-full bg-slate-900 px-5 text-xs font-bold text-white hover:bg-orange-600 transition-colors shadow-md"
                      >
                        Detail Unit
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bullets/Dots Navigation Indicator untuk Slider */}
                {products.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsFade(true);
                          setTimeout(() => {
                            setCurrentIndex(index);
                            setIsFade(false);
                          }, 250);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === index 
                            ? 'w-6 bg-slate-900' 
                            : 'w-2 bg-slate-900/40 hover:bg-slate-900/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

              </div>
            ) : (
              /* --- FALLBACK: Animasi Kontainer 3D Mengambang (Jika data produk kosong) --- */
              <div className="relative w-full max-w-sm flex flex-col items-center justify-center py-10 text-center text-white bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl">
                <div className="absolute w-40 h-40 bg-orange-400/30 rounded-full blur-3xl animate-pulse -z-10" />
                
                <div className="relative animate-bounce [animation-duration:3s] flex items-center justify-center mb-6">
                  <div className="relative p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border-2 border-orange-400/40 transform rotate-12">
                    <Box className="w-16 h-16 text-orange-400" strokeWidth={1.5} />
                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 w-16 h-2 bg-black/20 rounded-full blur-sm scale-x-110 animate-pulse" />
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 mb-1">Memuat Unit Terbaik...</h3>
                <p className="text-xs text-slate-900/80 font-semibold max-w-[240px]">
                  Sistem sedang menyiapkan daftar pilihan kontainer ready stock untuk Anda.
                </p>
                
                <div className="w-full bg-slate-900/20 h-1.5 rounded-full mt-5 overflow-hidden">
                  <div className="bg-orange-500 h-full w-1/2 rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 z-40 left-1/2 -translate-x-1/2 transform animate-bounce hidden sm:block">
        <div className="h-8 w-5 rounded-full border-2 border-white/50 p-1">
          <div className="h-2 w-1 rounded-full bg-white/80 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}