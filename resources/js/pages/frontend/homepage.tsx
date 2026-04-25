
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, ArrowRightIcon, Loader, PhoneCall, RefreshCcwDot } from 'lucide-react';
import { useState, useEffect } from 'react';
import catalog from '@/routes/catalog';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import blog from '@/routes/blog';
import { handleImageError } from '@/utils/image';
import { useConfig } from '@/utils/config';


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

  // Typing animation for placeholder
  const [placeholder, setPlaceholder] = useState('');
  const placeholderTexts = [
    'Cari kontainer yang kamu butuhkan...',
    'kontainer 20 feet...',
    'Kontainer 40 feet...',
    'Kontainer office...',
    'Kontainer kustom...'
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = placeholderTexts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
        }
      } else {
        if (currentCharIndex > 0) {
          setPlaceholder(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % placeholderTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentTextIndex, placeholderTexts]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // Simulate API call or processing
    setTimeout(() => {
        router.get(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`, {}, {
            preserveState: true,
            onFinish: () => {
                setIsSearching(false);
            }
        });
    }, 1000);
  };


  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  
  // Update the image loading handler
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

 

  return (
    <FrontendLayout title="Beranda">
      <Head title={`${getConfig('site_name', 'Your site name')} - ${getConfig('site_tagline', 'Your site tagline')}`}>
        <meta name="description" content={getConfig('meta_description', 'PT. Alumoda Sinergi Kontainer Indonesia - Jual & Sewa Kontainer dengan kualitas terbaik dan harga kompetitif')} />
        <meta name="keywords" content={getConfig('meta_keywords', 'jual kontainer, sewa kontainer, kontainer bekas, kontainer modifikasi, PT. Alumoda Sinergi Kontainer Indonesia')} />
        <style
          jsx
          global
        >{`
          html {
            scroll-behavior: smooth;
            top: 10;
          }
        `}</style>
      </Head>

      <main>
        {/* Hero Section */}
        <section 
          id="home"
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-amber-400 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/90 via-amber-400/80 to-orange-800/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 z-20 " />

          
          <img 
            src={getConfig('hero_image', '/images/bg-hero.png')} 
            alt="Alumoda Sinergi Kontainer Indonesia - Solusi Terpercaya untuk Kontainer Anda" 
            className="absolute inset-0 z-10 object-cover w-full h-full"
            loading="eager"
            onError={(e) => handleImageError(e, '/images/bg-hero.png', "Hero background image")}
          />
          
          <div className="container drop-shadow-md relative z-40 mx-auto px-4 py-20 text-center text-white">
            <div className="animate-fade-in-up">
              <h1 className="mb-6 font-black leading-[0.95] tracking-tighter text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-slate-900 dark:text-orange-400">
                <span dangerouslySetInnerHTML={{ 
                  __html: getConfig('hero_title', 
                  'Solusi Terpercaya <br /> Untuk ' + 
                  '<span className="relative inline-block mx-2">' +
                    '<span className="relative z-10 px-4 py-1 text-white bg-slate-900 shadow-xl transform -rotate-1 inline-block">Kontainer</span>' +
                  '</span>' + 
                  ' Anda') 
                }} />
              </h1>
              
              <p className="mx-auto mb-10 max-w-2xl font-medium text-sm md:text-xl dark:text-orange-200 text-slate-900 leading-7 lg:text-xl">
                {getConfig('hero_description', 'Kami menyediakan berbagai pilihan kontainer untuk disewa atau dibeli. Mulai dari Kontainer standar hingga Kontainer Custom sesuai kebutuhan Anda.')}
              </p>

              <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
                  <div className="relative group">
                      <input
                          type="text"
                          placeholder={placeholder || 'Cari kontainer...'}
                          className="w-full rounded-full border-2 border-white/20 bg-white/80 px-6 py-4 pr-14 md:pr-36 text-white placeholder-gray-800 backdrop-blur-lg focus:border-white/40 focus:bg-white focus:text-black font-bold focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent peer text-xs md:text-base"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                          type="submit"
                          disabled={isSearching || !searchQuery.trim()}
                          className={`absolute right-1.5 cursor-pointer top-1/2 -translate-y-1/2 transform rounded-full px-3 py-2 md:px-8 md:py-3 font-semibold transition-all ${
                              isSearching 
                                  ? 'bg-amber-400 text-white cursor-wait' 
                                  : 'bg-orange-400 text-white hover:bg-orange-500 hover:shadow-lg hover:text-white hover:shadow-orange-500/30 peer-focus:bg-primary peer-focus:text-white'
                          }`}
                      >
                          {isSearching ? (
                              <div className="flex items-center">
                                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                                  Mencari...
                              </div>
                          ) : (
                            <span className="text-xs md:text-base">Cari Produk</span>
                          )}
                      </button>
                  </div>
                </form>
                
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="flex items-center text-sm font-bold text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-green-400"></span>
                    {getConfig('feature_stock_available', 'Stok Tersedia')}
                  </span>
                  <span className="flex items-center text-sm font-bold text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-400"></span>
                    {getConfig('feature_quality_guarantee', 'Garansi Kualitas')}
                  </span>
                  <span className="flex items-center text-sm font-bold text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-purple-400"></span>
                    {getConfig('feature_competitive_price', 'Harga Kompetitif')}
                  </span>
                  <span className="flex items-center text-sm font-bold text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-black"></span>
                    {getConfig('feature_support_247', 'Support 24/7')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 z-40 left-1/2 -translate-x-1/2 transform animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-white/50 p-1">
              <div className="h-2 w-1 rounded-full bg-white/80"></div>
            </div>
          </div>
        </section>

        {/* services Section */}
        <section id="services" className="bg-white py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 dark:text-orange-400">{getConfig('services_title', 'Layanan Kami')}</h2>
              <p className="mx-auto max-w-5xl text-gray-600 dark:text-gray-300 text-xl">
                {getConfig('services_description', 'Berbagai layanan profesional yang kami tawarkan untuk memenuhi kebutuhan kontainer Anda')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-30 dark:bg-amber-900/20"></div>
                  <div className="relative z-10">
                    <div className="mb-6 h-2 w-12 rounded-full bg-amber-300"></div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-orange-400">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{service.description}</p>
                  </div>
                </div>
              ))}
              {/* CTA Card */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 transition-all group-hover:scale-110"></div>
                <div className="relative z-10 text-white">
                  <div className="mb-6 h-2 w-12 rounded-full bg-white/50"></div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Butuh Solusi Khusus?
                  </h3>
                  <p className="mb-6 text-amber-100 text-sm md:text-base">
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

        {/* products Section */}
        <section id="products" className="bg-gray-50 py-20 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-center md:justify-between md:flex-row">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{getConfig('products_title', 'Produk Kami')}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {getConfig('products_description', 'Temukan produk-produk kontainer untuk kebutuhanmu')}
                </p>
              </div>
              <Link href={catalog.index()} className="btn btn-ghost flex items-center">
                Tampilkan Lebih Banyak <ArrowRight className="ml-1 h-4 w-4" /> 
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Client Section */}
        <section className="relative bg-white py-12 dark:bg-gray-900">
          <div className="container relative mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4">
                {getConfig('clients_title', 'Klien Kami')}
              </h2>
              <p className="mx-auto max-w-5xl text-gray-600 dark:text-gray-300 text-xl">
                {getConfig('clients_description', 'Kami telah melayani berbagai perusahaan dan organisasi di berbagai sektor')}
              </p>
            </div>
            
            <div className="relative rounded-xl ">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {clients.map((client, index) => (
                  <div key={client.id || index} className={`flex h-32 items-center justify-center rounded-lg bg-white p-4 transition-all hover:border hover:border-orange-400 dark:bg-gray-700 ${client.logo && 'border border-gray-200 bg-slate-400 dark:border-gray-600'}`}>
                    {client.logo ? (
                      <img 
                        src={`${client.logo}`} 
                        alt={client.name} 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span className={`text-center font-bold italic text-gray-700 dark:text-gray-200 ${client.logo ? 'hidden' : ''}`}>
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section className="bg-white dark:bg-gray-900">
          {
            testimonials.length > 0 && (
            <div className="container py-20  mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4">Apa Kata Mereka</h2>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                  Testimoni dari klien yang telah menggunakan layanan kami
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>

              <div className="mt-12 text-center flex items-center justify-center">
                  <Link 
                    href="/testimonial"
                    className="btn btn-ghost flex items-center"
                  >
                    Tampilkan Lebih Banyak <ArrowRight className="ml-1 h-4 w-4" />  
                  </Link>
                </div>
            </div>
            )
          }
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20 dark:bg-gray-800">
          {
            faqs.length > 0 && (
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="mb-4 dark:text-orange-400">{getConfig('faq_title', 'Pertanyaan yang Sering Diajukan')}</h2>
                <p className="mx-auto max-w-5xl text-gray-600 dark:text-gray-300 text-xl">
                  {getConfig('faq_description', 'Temukan jawaban atas pertanyaan umum seputar layanan kami')}
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
                {faqs.map((faq, index) => (
                  <div key={index} className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                      className="hover:text-primary cursor-pointer flex w-full items-center justify-between px-2 py-4 text-left transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${activeFaq === index ? 'rotate-180' : ''} text-gray-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeFaq === index && (
                      <div className="px-2 pb-4 text-gray-600 dark:text-gray-300">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            )
          }
        </section>

        {/* Article section */}
        <section id="article" className="bg-white dark:bg-gray-900">
          {
            articles.length > 0 && (
              <div className="container mx-auto px-4 py-20">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 dark:text-orange-400">{getConfig('articles_title', 'Artikel Terbaru')}</h2>
                  <p className="mx-auto max-w-5xl text-gray-600 dark:text-gray-300 text-xl">
                    {getConfig('articles_description', 'Temukan informasi terbaru seputar kontainer dan solusi logistik')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <div 
                      key={article.id} 
                      className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800"
                    >
                      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-600 transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                                loadedImages[article.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              loading="lazy"
                              onLoad={() => handleImageLoad(article.id)}
                              onError={(e) => handleImageError(e, undefined, article.title)}
                            />
                            {!loadedImages[article.id] && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-pulse flex space-x-4 w-full h-full">
                                  <div className="flex-1 space-y-4 py-1">
                                    <div className="h-full w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-medium text-white">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      <div className="p-6">
                        <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                          {article.date}
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <Link 
                            href={`/blog/${article.slug}`} 
                            className="flex items-center text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                          >
                            Baca Selengkapnya
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center flex items-center justify-center">
                  <Link 
                    href={blog.index()}
                    className="btn btn-ghost flex items-center"
                  >
                    Tampilkan Lebih Banyak <ArrowRight className="ml-1 h-4 w-4" />  
                  </Link>
                </div>
              </div>
            )
          }
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-orange-200 dark:bg-orange-300 py-20 text-white">
          <div className="container mx-auto px-4 text-center flex flex-col justify-center items-center">
            <h2 className="mb-6 text-5xl font-[800]! text-black">{getConfig('cta_title', 'Butuh Kontainer untuk Bisnis Anda?')}</h2>
            <p className="mx-auto mb-8 text-slate-800 max-w-2xl">
              {getConfig('cta_description', 'Dapatkan penawaran terbaik untuk sewa atau beli kontainer berkualitas. Cocok untuk berbagai kebutuhan usaha mulai dari gudang, kantor, hingga ruang komersial.')}
            </p>
            <a target='_blank' href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=Halo%20Alumoda%2C%20saya%20ingin%20bertanya`}  className="btn flex! w-max items-center gap-2 text-white bg-green-600 cursor-pointer animate-bounce! hover:bg-green-500 shadow-lg p-4! px-7! rounded-full! text-base"> 
              <PhoneCall className="h-5 w-5" /> {getConfig('cta_button_text', 'Hubungi Kami via WhatsApp')}</a>
          </div>
        </section>
      </main>
    </FrontendLayout>
  );
}
