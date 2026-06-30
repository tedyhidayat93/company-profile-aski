
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import catalog from '@/routes/catalog';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import { handleImageError } from '@/utils/image';
import { useConfig } from '@/utils/config';
import SeoHead from '@/components/seo-head';
import HeroHomepageSection from '@/components/hero-hompage-section';
import GoogleReviewsWidget from '@/components/google-reviews-widget';
import CtaSection from '@/components/cta-section';
import HomepageProductTabs from '@/components/homepage-product-tabs';


export default function Homepage({ 
  products = [], 
  services = [], 
  clients = [], 
  faqs = [], 
  articles = [],
  testimonials = []
}: { 
  products?: any[];
  services?: any[];
  clients?: any[];
  faqs?: any[];
  articles?: any[];
  testimonials?: any[];
}) {
  const { getConfig } = useConfig();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSearching) return;

    const query = searchQuery.trim();

    if (!query) {
      setIsSearching(true);

      setTimeout(() => {
        router.get('/katalog', {}, {
          preserveState: false,
          preserveScroll: true,
          onFinish: () => setIsSearching(false),
        });
      }, 600);

      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      router.get(
        '/katalog',
        { search: query },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => setIsSearching(false),
        }
      );
    }, 600);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <FrontendLayout>
      <SeoHead />

      <main>
        <HeroHomepageSection 
          products={products}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isSearching={isSearching}
          placeholder="Cari kontainer office, reefer, dll..."
          getConfig={getConfig}
          handleImageError={handleImageError}
        />

        {/* services Section */}
        <section id="services" className="bg-white py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-1 dark:text-orange-400">{getConfig('services_title', 'Layanan Kami')}</h2>
              <p className="mx-auto mt-2 xl:max-w-7xl text-gray-600 dark:text-gray-300 text-base font-medium">
                {getConfig('services_description', 'Berbagai layanan profesional yang kami tawarkan untuk memenuhi kebutuhan kontainer Anda')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 flex flex-col justify-between"
                >
                  {/* Efek Lingkaran Dekoratif */}
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-30 dark:bg-amber-900/20"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Bar Dekoratif */}
                    <div className="mb-6 h-2 w-12 rounded-full bg-amber-300"></div>
                    
                    {/* Judul & Deskripsi */}
                    <div className="flex-grow">
                      <h3 className="mb-3 text-xl md:text-2xl font-semibold text-gray-900 dark:text-orange-400">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* --- Tombol Pelajari Selengkapnya --- */}
                    <div className="pt-2 mt-auto">
                      <Link
                        href={`/layanan/${service.slug}`}
                        className="inline-flex items-center text-sm font-bold text-orange-500 hover:text-orange-600 dark:text-orange-400 gap-1.5 group/btn border-b border-transparent hover:border-orange-500 pb-0.5 transition duration-200"
                      >
                        Pelajari Selengkapnya
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {/* CTA Card */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 transition-all group-hover:scale-110"></div>
                <div className="relative z-10 text-white">
                  <div className="mb-6 h-2 w-12 rounded-full bg-white/50"></div>
                  <h3 className="mb-4 text-xl md:text-2xl font-bold">
                    Butuh Solusi Khusus?
                  </h3>
                  <p className="mb-6 text-white font-medium text-sm md:text-base">
                    Tim ahli kami siap membantu memberikan solusi terbaik untuk kebutuhan kontainer Anda.
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 font-medium text-amber-600 transition-colors hover:bg-gray-100"
                  >
                    Hubungi Kami
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Product Section  */}
        <HomepageProductTabs />

        {/* Catalog Section */}
        <section 
          id="catalog" 
          className="relative bg-white bg-gradient-to-tr from-orange-50/30 via-white to-orange-50/10 py-24 text-slate-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-orange-950/10 dark:text-neutral-100 overflow-hidden border-t border-b border-slate-100 dark:border-neutral-900/60"
        >
          
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-orange-500/[0.04] dark:bg-orange-500/[0.02] rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-12 left-1/4 w-[600px] h-[400px] bg-amber-500/[0.03] dark:bg-amber-500/[0.015] rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header Section */}
            <div className="mb-14 flex flex-col items-center justify-between md:flex-row gap-6">
              <div className="text-center md:text-left md:border-l-4 md:border-orange-500 md:pl-5">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-orange-600 uppercase bg-orange-100/60 dark:bg-orange-500/10 dark:text-orange-400 rounded-md mb-2 border border-orange-200/40 dark:border-orange-500/10">
                  Sewa Kontainer & Jual Kointainer
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                  {getConfig('catalog_title', 'Produk Kami')}
                </h2>
                <p className="text-slate-600 dark:text-neutral-400 text-sm md:text-base font-medium mt-1.5 max-w-xl leading-relaxed">
                  {getConfig('catalog_description', 'Temukan produk-produk kontainer untuk kebutuhanmu')}
                </p>
              </div>
              
              {/* Tombol Katalog Atas */}
              <Link 
                aria-label='Go to Our Products page' 
                href={catalog.index()} 
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white dark:text-neutral-200 dark:hover:text-white px-5 py-3 bg-white/80 hover:bg-slate-900 dark:bg-neutral-900 dark:hover:bg-orange-500 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all shadow-xs duration-300"
              >
                <span>Lihat Katalog</span> 
                <ArrowRight className="h-3.5 w-3.5 text-orange-500 group-hover:text-white transition-transform group-hover:translate-x-1 duration-300" /> 
              </Link>
            </div>

            {/* Grid List Product */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            {/* Footer Load More */}
            <div className="mt-16 flex justify-center">
              <Link
                aria-label='View more Our Products'
                href="/katalog"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border-2 border-slate-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500/50 hover:bg-orange-50/30 dark:hover:bg-neutral-900 rounded-xl px-7 py-4 shadow-sm transition-all hover:shadow-md active:scale-98 duration-300"
              >
                <span>Tampilkan Lebih Banyak</span>
                <ArrowRight className="h-3.5 w-3.5 text-orange-500 transition-transform group-hover:translate-x-1 duration-300" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 🏢 CLIENT SECTION */}
        {/* ========================================================================= */}
        <section className="relative bg-white py-24 text-slate-900 dark:bg-neutral-950 dark:text-neutral-100 overflow-hidden border-b border-slate-100 dark:border-neutral-900/60">
          {/* Bias Cahaya Ringan */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/[0.02] dark:bg-orange-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-orange-600 uppercase bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 rounded-md mb-2 border border-orange-200/40">
                Trusted By
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                {getConfig('clients_title', 'Klien Kami')}
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 text-sm md:text-base font-medium mt-1.5 leading-relaxed">
                {getConfig('clients_description', 'Kami telah melayani berbagai perusahaan dan organisasi di berbagai sektor')}
              </p>
            </div>
            
            {/* Grid Klien Premium Semi-Transparent Grid Look */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {clients.map((client, index) => (
                <div 
                  key={client.id || index} 
                  className="flex h-28 items-center justify-center rounded-xl bg-slate-50/50 dark:bg-neutral-900/40 p-5 border border-slate-200/60 dark:border-neutral-800/60 transition-all duration-300 hover:bg-white dark:hover:bg-neutral-900 hover:border-orange-500/50 dark:hover:border-orange-500/40 hover:shadow-sm group"
                >
                  {client.logo ? (
                    <img 
                      src={`${client.logo}`} 
                      alt={client.name} 
                      className="max-h-full max-w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors ${client.logo ? 'hidden' : ''}`}>
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 💬 TESTIMONI SECTION */}
        {/* ========================================================================= */}
        <section className="relative bg-gradient-to-b from-white via-orange-50/10 to-slate-50/60 py-24 text-slate-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900/30 dark:text-neutral-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-orange-600 uppercase bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 rounded-md mb-2 border border-orange-200/40">
                Review & Feedback
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                {getConfig('testimonials_title', 'Apa Kata Mereka')}
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 text-sm md:text-base font-medium mt-1.5 leading-relaxed">
                {getConfig('testimonials_description', 'Testimoni dari klien yang telah menggunakan layanan kami')}
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="group">
                  <div className="h-full rounded-2xl border border-slate-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900 p-1 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-300 dark:hover:border-neutral-700">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </div>

            {/* Google Widget Integration Container */}
            <div className="bg-white/60 dark:bg-neutral-900/40 border border-slate-200/50 dark:border-neutral-800/50 rounded-2xl p-4 shadow-xs">
              <GoogleReviewsWidget />
            </div>

            {/* CTA */}
            <div className="mt-16 flex justify-center">
              <Link
                href="/testimonial"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border-2 border-slate-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500/50 hover:bg-slate-50 dark:hover:bg-neutral-900 rounded-xl px-7 py-4 shadow-sm transition-all hover:shadow-md active:scale-98 duration-300"
              >
                <span>Tampilkan Lebih Banyak</span>
                <ArrowRight className="h-3.5 w-3.5 text-orange-500 transition-transform group-hover:translate-x-1 duration-300" />
              </Link>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* ❓ FAQ SECTION */}
        {/* ========================================================================= */}
        {faqs.length > 0 && (
          <section className="relative bg-white py-24 text-slate-900 dark:bg-neutral-950 dark:text-neutral-100 overflow-hidden border-t border-b border-slate-100 dark:border-neutral-900/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-orange-600 uppercase bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 rounded-md mb-2 border border-orange-200/40">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                  {getConfig('faq_title', 'Pertanyaan yang Sering Diajukan')}
                </h2>
                <p className="text-slate-600 dark:text-neutral-400 text-sm md:text-base font-medium mt-1.5 leading-relaxed">
                  {getConfig('faq_description', 'Temukan jawaban atas pertanyaan umum seputar layanan kami')}
                </p>
              </div>

              {/* FAQ List 2 Column Grid */}
              <div className="mx-auto max-w-full grid md:grid-cols-2 gap-5 items-start">
                {faqs.map((faq, index) => {
                  const isActive = activeFaq === index;

                  return (
                    <div
                      key={index}
                      className={`
                        group rounded-2xl border transition-all duration-300 h-max overflow-hidden
                        ${isActive 
                          ? 'bg-white dark:bg-neutral-900 border-orange-500/60 dark:border-orange-500/40 shadow-md' 
                          : 'bg-slate-50/50 dark:bg-neutral-900/30 border-slate-200/70 dark:border-neutral-800/70 hover:shadow-sm hover:border-slate-300 dark:hover:border-neutral-700'
                        }
                      `}
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`
                            flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black shrink-0 transition-colors
                            ${isActive 
                              ? 'bg-slate-900 text-white dark:bg-orange-500 dark:text-white' 
                              : 'bg-slate-200/70 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-orange-500'
                            }
                          `}>
                            Q
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {faq.question}
                          </span>
                        </div>

                        {/* Smooth Rotate Arrow */}
                        <svg
                          className={`h-4 w-4 shrink-0 transform transition-transform duration-300 ${
                            isActive ? 'rotate-180 text-orange-500' : 'text-slate-400'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Answer Content Wrapper */}
                      <div
                        className={`
                          grid transition-all duration-300 ease-in-out
                          ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                        `}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 pl-[44px] text-xs md:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {/* {faq.answer} */}
                            <div 
                                className="tinymce-content"
                                dangerouslySetInnerHTML={{ __html: faq.answer }} 
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}


        {/* ========================================================================= */}
        {/* 📰 ARTICLE SECTION */}
        {/* ========================================================================= */}
        {articles.length > 0 && (
          <section id="article" className="relative bg-white bg-gradient-to-tr from-orange-50/20 via-white to-transparent py-24 text-slate-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-orange-950/5 dark:text-neutral-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="mb-14 flex flex-col items-center justify-between md:flex-row gap-6">
                <div className="text-center md:text-left md:border-l-4 md:border-orange-500 md:pl-5">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-orange-600 uppercase bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 rounded-md mb-2 border border-orange-200/40">
                    Insights & News
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                    {getConfig('articles_title', 'Artikel Terbaru')}
                  </h2>
                  <p className="text-slate-600 dark:text-neutral-400 text-sm md:text-base font-medium mt-1.5 max-w-xl leading-relaxed">
                    {getConfig('articles_description', 'Temukan informasi terbaru seputar kontainer dan solusi logistik')}
                  </p>
                </div>
                
                <Link 
                  href="/info"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white dark:text-neutral-200 dark:hover:text-white px-5 py-3 bg-white hover:bg-slate-900 dark:bg-neutral-900 dark:hover:bg-orange-500 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all shadow-xs duration-300"
                >
                  <span>Semua Artikel</span> 
                  <ArrowRight className="h-3.5 w-3.5 text-orange-500 group-hover:text-white transition-transform group-hover:translate-x-1 duration-300" /> 
                </Link>
              </div>
              
              {/* Article Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => window.location.href=`/${article.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white border border-slate-200/70 dark:border-neutral-800/70 shadow-xs cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-neutral-900"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-neutral-800 border-b border-slate-100 dark:border-neutral-800">
                      <img 
                        src={'storage/' + article.image} 
                        alt={article.title} 
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-104 ${
                          loadedImages[article.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(article.id)}
                        onError={(e) => handleImageError(e, undefined, article.title)}
                      />
                      {!loadedImages[article.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-neutral-800 animate-pulse" />
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-6">
                      <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-2">
                        <span>{article.category || 'Logistik'}</span>
                        {article.date && <span className="text-slate-300 dark:text-neutral-700">•</span>}
                        <span className="text-slate-400 dark:text-neutral-500 font-medium normal-case">{article.date}</span>
                      </div>
                      
                      <h3 className="mb-2.5 text-lg font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="mb-5 text-xs md:text-sm text-slate-500 dark:text-neutral-400 line-clamp-3 leading-relaxed font-medium">
                        {article.excerpt}
                      </p>

                      <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
                        <span className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-neutral-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors gap-1">
                          Baca Selengkapnya
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile-Only Bottom Navigation */}
              <div className="mt-12 text-center flex items-center justify-center md:hidden">
                <Link 
                  href="/info"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border-2 border-slate-200 dark:border-neutral-800 rounded-xl px-6 py-3.5 shadow-sm"
                >
                  <span>Tampilkan Lebih Banyak</span>
                  <ArrowRight className="h-3.5 w-3.5 text-orange-500 transition-transform group-hover:translate-x-1" />  
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* CTA Section */}
        <CtaSection />

      </main>
    </FrontendLayout>
  );
}
