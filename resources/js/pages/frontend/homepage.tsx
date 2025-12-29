import logoImage from '@/assets/images/logo-main.png';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AlignEndVerticalIcon, ArrowRightIcon, Facebook, Instagram, Linkedin, Mail, Megaphone, Phone, RefreshCcwDot, Video, X } from 'lucide-react';
import { useState } from 'react';
import BgHero from '@/assets/images/bg-hero.png';
import catalog, { index } from '@/routes/catalog';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import { ApiResponse, Product } from './catalog';
import blog from '@/routes/blog';
import { handleImageError } from '@/utils/image';


// Mock data
const services = [
  {
    id: 1,
    title: 'Jual & Beli Kontainer',
    description:
      'Menjual berbagai jenis kontainer baru dan bekas seperti Dry Container, Open Top, Flatrack, Refrigerated, dan ISO Tank dengan ukuran 10 Ft, 20 Ft, 40 Ft, dan 40 Ft HC dengan harga kompetitif.',
  },
  {
    id: 2,
    title: 'Sewa Kontainer',
    description:
      'Layanan sewa kontainer berbagai tipe dan ukuran seperti Dry Container, Open Top, Flatrack, Refrigerated, dan ISO Tank dengan harga yang bersaing.',
  },
  {
    id: 3,
    title: 'Modifikasi Kontainer',
    description:
      'Melayani modifikasi kontainer untuk perumahan, kantor, klinik, rumah sakit, café, dan kebutuhan lainnya dengan ukuran 10 Ft, 20 Ft, 40 Ft, dan 40 Ft HC sesuai budget.',
  },
  {
    id: 4,
    title: 'Sewa Gudang Terbuka & Tertutup',
    description:
      'Menyediakan gudang terbuka dan tertutup untuk kegiatan stuffing dan stripping impor maupun ekspor dengan dukungan peralatan mekanik lengkap.',
  },
  {
    id: 5,
    title: 'Sewa Depo',
    description:
      'Layanan pengelolaan container yard atau depot penitipan kontainer ex impor yang berlokasi strategis dekat Pelabuhan Tanjung Priok.',
  },
  {
    id: 6,
    title: 'Sewa Alat Berat',
    description:
      'Melayani sewa alat berat seperti Reach Stacker dan Forklift di seluruh Indonesia dengan layanan operasional 24 jam.',
  },
  {
    id: 7,
    title: 'Maintenance & Repairing Container',
    description:
      'Didukung tim berkualifikasi IICL untuk perawatan dan perbaikan kontainer di lokasi pelanggan dengan standar terbaik dan garansi satu tahun.',
  },
  {
    id: 8,
    title: 'Domestic Shipping',
    description:
      'Layanan pengiriman domestik meliputi trucking darat, pickup & delivery lokal, cargo oversize, serta pengiriman melalui jalur udara dan laut.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Pemilik UMKM',
    content:
      'Pelayanan yang sangat memuaskan! Kontainer yang saya sewa dalam kondisi sangat baik dan harga bersaing.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    role: 'Manajer Logistik',
    content:
      'Tim yang profesional dan responsif. Pengiriman tepat waktu dan kontainer dalam kondisi prima.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const faqs = [
  {
    question: 'Berapa lama masa sewa minimum?',
    answer: 'Masa sewa minimum adalah 1 bulan untuk semua jenis kontainer.',
  },
  {
    question: 'Apakah ada biaya pengiriman?',
    answer:
      'Biaya pengiriman tergantung pada lokasi pengantaran. Tim kami akan memberikan penawaran terbaik untuk Anda.',
  },
  {
    question: 'Bagaimana cara memesan kontainer?',
    answer: 'Anda dapat memesan langsung melalui website kami atau menghubungi tim penjualan kami.',
  },
];

const articles = [
  {
    id: 1,
    title: 'Tips Memilih Kontainer yang Tepat',
    excerpt:
      'Beberapa hal yang perlu diperhatikan saat memilih kontainer untuk kebutuhan bisnis Anda.',
    date: '15 Des 2023',
    image: 'https://images.unsplash.com/photo-1578163677454-b3933804a354?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Tips & Trik'
  },
  {
    id: 2,
    title: 'Keuntungan Menggunakan Jasa Sewa Kontainer',
    excerpt: 'Mengapa sewa kontainer bisa menjadi solusi yang lebih efisien untuk bisnis Anda.',
    date: '10 Des 2023',
    image: 'https://images.unsplash.com/photo-1578163677454-b3933804a354?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Keuntungan'
  },
  {
    id: 3,
    title: 'Tips Perawatan Kontainer agar Awet',
    excerpt: 'Cara merawat kontainer agar tetap dalam kondisi prima selama masa pakai.',
    date: '5 Des 2023',
    image: 'https://images.unsplash.com/photo-1578163677454-b3933804a354?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Tips & Trik'
  },
];

export default function Homepage({products: initialProducts}: {products: ApiResponse<Product>}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const { data: products } = initialProducts;


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
      <Head title="PT. Alumoda Sinergi Kontainer Indonesia - Jual & Sewa Kontainer">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          // @ts-ignore - styled-jsx types are handled by the babel plugin
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
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-500 via-amber-400 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
          
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/80 via-amber-400/80 backdrop-blur to-orange-100/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 z-20 " />

          
          <img 
            src={BgHero} 
            alt="Alumoda Sinergi Kontainer Indonesia - Solusi Terpercaya untuk Kontainer Anda" 
            className="absolute inset-0 z-10 object-cover w-full h-full"
            loading="eager"
          />
          
          <div className="container drop-shadow-md relative z-40 mx-auto px-4 py-20 text-center text-white">
            <div className="animate-fade-in-up">
              
              <h1 className="mb-6 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                Solusi Terpercaya <br /> Untuk <span className="text-amber-100 drop-shadow-md">Kontainer</span> Anda
              </h1>
              
              <p className="mx-auto mb-10 max-w-2xl font-medium text-lg text-white/90 md:text-xl">
                Kami menyediakan berbagai pilihan kontainer untuk disewa atau dibeli. Mulai dari Kontainer standar hingga Kontainer Custom sesuai kebutuhan Anda.
              </p>

              <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
                  <div className="relative group">
                      <input
                          type="text"
                          placeholder="Cari kontainer yang kamu butuhkan..."
                          className="w-full rounded-full border-2 border-white/20 bg-white/10 px-6 py-4 pr-36 text-white placeholder-white/70 backdrop-blur-sm focus:border-white/40 focus:bg-white focus:text-black font-bold focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent peer"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                          type="submit"
                          disabled={isSearching || !searchQuery.trim()}
                          className={`absolute right-1.5 cursor-pointer top-1/2 -translate-y-1/2 transform rounded-full px-8 py-3 font-semibold transition-all ${
                              isSearching 
                                  ? 'bg-amber-400 text-white cursor-wait' 
                                  : 'bg-white text-amber-600 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/30 peer-focus:bg-primary peer-focus:text-white'
                          }`}
                      >
                          {isSearching ? (
                              <div className="flex items-center">
                                  <RefreshCcwDot className="mr-2 h-5 w-5 animate-spin" />
                                  Mencari...
                              </div>
                          ) : 'Cari Sekarang'}
                      </button>
                  </div>
                </form>
                
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="flex items-center text-sm font-medium text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-green-400"></span>
                    Stok Tersedia
                  </span>
                  <span className="flex items-center text-sm font-medium text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-400"></span>
                    Garansi Kualitas
                  </span>
                  <span className="flex items-center text-sm font-medium text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-purple-400"></span>
                    Harga Kompetitif
                  </span>
                  <span className="flex items-center text-sm font-medium text-white/90">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-black"></span>
                    Support 24/7
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

        {/* Layanan Section */}
        <section id="services" className="bg-white py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4">Layanan Kami</h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Berbagai layanan profesional yang kami tawarkan untuk memenuhi kebutuhan kontainer
                Anda
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
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                </div>
              ))}
              {/* CTA Card */}
              <div className="group relative overflow-hidden rounded-xl bg-linear-to-br from-amber-500 to-amber-600 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 transition-all group-hover:scale-110"></div>
                <div className="relative z-10 text-white">
                  <div className="mb-6 h-2 w-12 rounded-full bg-white/50"></div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Butuh Solusi Khusus?
                  </h3>
                  <p className="mb-6 text-amber-100">
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

        {/* Produk Section */}
        <section id="products" className="bg-gray-50 py-20 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-center md:justify-between md:flex-row">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Produk Kami</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Temukan produk-produk kontainer untuk kebutuhanmu
                </p>
              </div>
              <Link href={catalog.index()}>
                <button className="btn btn-outline">Tampilkan Lebih Banyak</button>
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
        <section className="relative bg-gray-50 py-12 dark:bg-gray-900">
          <div className="container relative mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4">
                Klien Kami
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Kami telah melayani berbagai perusahaan dan organisasi di berbagai sektor
              </p>
            </div>
            
            <div className="relative max-h-[60vh] overflow-y-auto rounded-xl ">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[
                  'Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5',
                  'Client 6', 'Client 7', 'Client 8', 'Client 9', 'Client 10',
                  'Client 11', 'Client 12', 'Client 13', 'Client 14', 'Client 15',
                  'Client 16', 'Client 17', 'Client 18', 'Client 19', 'Client 20'
                ].map((client, index) => (
                  <div key={index} className="flex h-32 items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-700">
                    <span className="text-center font-medium text-gray-700 dark:text-gray-200">{client}</span>
                  </div>
                ))}
              </div>
            
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section className="bg-white py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4">Apa Kata Mereka</h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Testimoni dari klien yang telah menggunakan layanan kami
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
                  <div className="mb-4 flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="mr-4 h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic dark:text-gray-300">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4">Pertanyaan yang Sering Diajukan</h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Temukan jawaban atas pertanyaan umum seputar layanan kami
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 dark:border-gray-700">
                  <button
                    className="hover:text-primary flex w-full items-center justify-between px-2 py-4 text-left transition-colors"
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
        </section>

        {/* Article section */}
        <section id="article" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4">Artikel Terbaru</h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Baca artikel dan berita terkini tentang industri kontainer dan solusi penyimpanan terbaik
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  title: 'Cara Memilih Kontainer yang Tepat untuk Kebutuhan Bisnis Anda',
                  excerpt: 'Panduan lengkap untuk memilih kontainer yang sesuai dengan kebutuhan penyimpanan dan logistik bisnis Anda.',
                  image: '/images/placeholder.png',
                  category: 'Tips Bisnis',
                  date: '29 Des 2024',
                  slug: 'cara-memilih-kontainer-yang-tepat'
                },
                {
                  id: 2,
                  title: 'Keuntungan Menggunakan Container untuk Penyimpanan Jangka Panjang',
                  excerpt: 'Temukan berbagai keuntungan menggunakan container sebagai solusi penyimpanan jangka panjang yang efektif dan efisien.',
                  image: '/images/placeholder.png',
                  category: 'Penyimpanan',
                  date: '25 Des 2024',
                  slug: 'keuntungan-menggunakan-container'
                },
                {
                  id: 3,
                  title: 'Inovasi Terbaru dalam Desain Kontainer Modern',
                  excerpt: 'Eksplorasi inovasi terbaru dalam desain kontainer yang mengubah cara kita berpikir tentang ruang penyimpanan.',
                  image: '/images/placeholder.png',
                  category: 'Inovasi',
                  date: '20 Des 2024',
                  slug: 'inovasi-desain-kontainer-modern'
                }
              ].map((article) => (
                <div 
                  key={article.id} 
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <div className="absolute inset-0 bg-linear-to-r from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-600 transition-transform duration-500 group-hover:scale-110" />
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
                    </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center space-x-2 text-xs text-slate-500 dark:text-amber-400">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${article.slug}`} 
                      className="flex items-center text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      Baca Selengkapnya
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href={blog.index()}
                className="btn btn-outline"
              >
                Tampilkan Lebih Banyak
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-orange-500 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-5xl font-extrabold">Butuh Kontainer untuk Bisnis Anda?</h2>
            <p className="mx-auto mb-8 text-white max-w-2xl text-lg">
              Dapatkan penawaran terbaik untuk sewa atau beli kontainer berkualitas. Cocok untuk berbagai kebutuhan usaha mulai dari gudang, kantor, hingga ruang komersial.
            </p>
            <button className="btn text-primary bg-white cursor-pointer animate-bounce hover:bg-gray-100 px-8 py-3 text-lg">Hubungi Kami Sekarang Juga !</button>
          </div>
        </section>
      </main>
    </FrontendLayout>
  );
}
