import { useState, useEffect, useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  Phone, Mail, X, Heart, Menu, LogInIcon, LayoutDashboardIcon, ChevronDown,
  BoxIcon,
  LayoutDashboard
} from 'lucide-react';

import { useWishlist } from '@/hooks/useWishlist';
import { CONTACT_INFO } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import Wishlist from '@/components/wishlist';
import { useConfig } from '@/utils/config';
import { handleImageError } from '@/utils/image';

interface MenuItem {
  name: string;
  href: string;
  description?: string;
  meta_description?: string;
}

interface MenuCategory {
  title: string;
  slug: string;
  description?: string;
  meta_description?: string;
  items: MenuItem[];
}

// Styling base untuk semua tombol Navigasi agar konsisten
const navItemClassName = (isActive: boolean) => `
  inline-flex items-center gap-1 rounded-full border-2 font-bold px-3 py-1.5 xl:px-5 sm:text-xs xl:text-sm 2xl:text-base dark:text-gray-300 transition-colors cursor-pointer outline-none whitespace-nowrap
  ${isActive 
    ? 'border-orange-300 text-orange-600 bg-orange-400/20' 
    : 'border-white text-gray-900 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-400/20'
  }
`;

export default function Header() {
  const { url } = usePage();
  const { auth } = usePage().props as any;
  const { getConfig } = useConfig();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  // Ekstrak pathname murni (contoh: '/layanan?search=x' atau '/layanan#id' menjadi '/layanan')
  const currentPathname = useMemo(() => {
    if (!url) return '/';
    try {
      return new URL(url, 'http://localhost').pathname;
    } catch {
      return url;
    }
  }, [url]);

  const isHomepage = currentPathname === '/';
  const logoImage = getConfig('/storage/site_logo', '/images/logo-main.png');

  const { footerServices = [], productCategories = [] } = usePage().props as any as {
    footerServices: any[]
    productCategories: MenuCategory[];
  };

  // Penentuan isActive menggunakan pencocokan path murni & sub-path secara presisi
  const navLinks = useMemo(() => {
    return [
      { 
        name: 'Beranda', 
        id: 'home', 
        href: '/', 
        isActive: currentPathname === '/' 
      },
      { 
        name: 'Layanan', 
        id: 'services', 
        href: '/layanan', 
        type: 'dropdown-services', 
        
        isActive: currentPathname === '/layanan' || currentPathname.startsWith('/layanan/') 
      },
      { 
        name: 'Produk', 
        id: 'products', 
        href: '/katalog', 
        type: 'dropdown-products', 
        // Aktif jika di /katalog, /katalog/sub, /catalog, ATAU /catalog/sub
        isActive: 
          currentPathname === '/katalog' || currentPathname.startsWith('/katalog/') ||
          currentPathname === '/catalog' || currentPathname.startsWith('/catalog/')
      },
      { 
        name: 'Blog & Informasi', 
        id: 'article', 
        href: '/info', 
        isActive: currentPathname === '/info' || currentPathname.startsWith('/info/') 
      },
      { 
        name: 'Kontak', 
        id: 'contact', 
        href: '/kontak', 
        isActive: currentPathname === '/kontak' || currentPathname.startsWith('/kontak/') 
      }
    ];
  }, [currentPathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string, href: string) => {
    if (isHomepage && href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const whatsappUrl = `https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`;

  return (
    <>
      <Wishlist
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={removeFromWishlist}
      />
      
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        
        {/* Top Bar */}
        <div className="bg-gradient-to-l from-orange-400 via-orange-500 to-black text-white py-1">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 overflow-hidden">
              <a href={`tel:${getConfig('contact_phone', CONTACT_INFO.phone).replace(/\D/g, '')}`} className="flex items-center text-white font-medium hover:text-slate-100 truncate">
                <Phone className="h-3 w-3 mr-1" />
                <span className="inline text-sm">{getConfig('contact_phone', CONTACT_INFO.phone)}</span>
              </a>
              <a href={`mailto:${getConfig('contact_email', CONTACT_INFO.email)}`} className="flex items-center text-white font-medium hover:text-slate-100 truncate max-w-35 md:max-w-full">
                <Mail className="h-3 w-3 mr-1" />
                <span className="inline text-sm">{getConfig('contact_email', CONTACT_INFO.email)}</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link aria-label='to login' href={auth?.user ? dashboard() : login()} className="md:px-6 py-1 hover:text-yellow-300 transition-colors">
                {auth?.user ? <LayoutDashboard className="h-4 w-4" /> : <LogInIcon className="h-4 w-4" />}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 h-12 w-auto">
                <img
                  src={logoImage}
                  alt="Logo"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => handleImageError(e, '/images/logo-main.png', 'Logo')}
                />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center">
                {navLinks.map((link) => {
                  // Rendering CUSTOM DROPDOWN LAYANAN
                  if (link.type === 'dropdown-services') {
                    return (
                      <div 
                        key={link.id}
                        className="py-4"
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.id, link.href)}
                          className={navItemClassName(link.isActive || isServicesDropdownOpen)}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                        </Link>

                        <div className={`absolute left-0 right-0 top-full w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 origin-top z-50 p-6
                          ${isServicesDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto visible' : 'opacity-0 scale-y-95 pointer-events-none invisible'}`}
                        >
                          <div className="container mx-auto grid grid-cols-12 gap-6">
                            <div className="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-6 space-y-2">
                              <div className="inline-flex items-center justify-center p-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600"><BoxIcon className="h-5 w-5" /></div>
                              <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider text-orange-500">{getConfig('services_meta_title', 'Layanan Kami')}</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{getConfig('services_meta_description', 'Kami melayani fabrikasi kustom, modifikasi arsitektural, hingga penyediaan unit tangguh untuk operasional logistik berskala nasional.')}</p>
                              <Link href="/layanan" className="text-sm font-bold text-orange-500 hover:underline">Lihat Semua Layanan →</Link>
                            </div>
                            <div className="col-span-8 grid grid-cols-2 gap-4">
                              {footerServices.map((item, key) => (
                                <Link key={key} href={`/layanan/${item.slug}`} className="group p-3 rounded-xl  hover:border-l-4 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-slate-800 transition-colors">
                                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500">{item.name}</span>
                                  <span className="block text-xs text-slate-500 mt-0.5 font-medium">{item.short_description}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Rendering CUSTOM DROPDOWN PRODUK
                  if (link.type === 'dropdown-products') {
                    return (
                      <div 
                        key={link.id}
                        className="py-4"
                        onMouseEnter={() => setIsProductDropdownOpen(true)}
                        onMouseLeave={() => setIsProductDropdownOpen(false)}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.id, link.href)}
                          className={navItemClassName(link.isActive || isProductDropdownOpen)}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                        </Link>

                        <div className={`absolute left-0 right-0 top-full w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 origin-top z-50
                          ${isProductDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto visible' : 'opacity-0 scale-y-95 pointer-events-none invisible'}`}
                        >
                          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
                            <div className="col-span-3 border-r border-slate-100 dark:border-slate-800 pr-6 space-y-3">
                              <div className="inline-flex items-center justify-center p-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600"><LayoutDashboardIcon className="h-5 w-5" /></div>
                              <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{getConfig('catalog_meta_title', 'Katalog Kontainer')}</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{getConfig('catalog_meta_description', 'Temukan pilihan dimensi kontainer kargo dan kreasi unit modifikasi custom standar internasional.')}</p>
                              <div className="pt-1"><Link href="/katalog" className="text-sm font-bold text-orange-500 hover:underline">Lihat Semua Katalog →</Link></div>
                            </div>
                            <div className={`col-span-9 grid gap-6 ${productCategories.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                              {productCategories.map((cat, index) => (
                                <div key={index} className="space-y-3 group p-4 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                  <div className="space-y-0.5">
                                    <Link href={`/produk/${cat.slug}`} className="flex items-center">
                                      <h4 className="text-base font-black italic tracking-wider group-hover:text-orange-600 text-slate-900 dark:text-slate-100 uppercase text-orange-600">{cat.title}</h4>
                                    </Link>
                                    {cat.description && <div className="space-y-4 text-xs! text-slate-500! font-medium" dangerouslySetInnerHTML={{ __html: cat.meta_description || cat.description || ''  }} />}
                                  </div>
                                  <ul className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-2">
                                    {cat.items.map((item, i) => (
                                      <li key={i}>
                                        <Link href={item.href} className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors">
                                          <span>{item.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                    <li >
                                      <Link href={`/produk/${cat.slug}`} className="flex border-t pt-2 items-center justify-between text-sm font-semibold text-orange-400  hover:text-orange-500 text-xs transition-colors">
                                        <span>Selengkapnya →</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 py-2.5 text-center text-[11px] text-slate-400 font-medium">
                            {getConfig('catalog_meta_title', 'Pilihan Kontainer & Modifikasi Lengkap dengan Jaminan Kualitas Unit Terbaik')}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Rendering MENU LINK STANDAR (Home, Artikel, Kontak) Menggunakan <Link> Inertia
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      aria-label={'go to ' + link.href}
                      onClick={(e) => handleScrollTo(e, link.id, link.href)}
                      className={navItemClassName(link.isActive)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button 
                  id='wishlists' aria-label='wishlists' onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2 rounded-full border cursor-pointer hover:border-orange-300 text-gray-700 hover:text-primary dark:text-white transition-transform active:scale-90"
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{wishlist.length}</span>}
                </button>

                <div className="hidden lg:flex items-center space-x-3">
                  <Button asChild className="flex h-10 items-center px-5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100 transition-colors gap-2">
                    <a href={whatsappUrl}><Phone className="h-4 w-4" />Hubungi Kami</a>
                  </Button>
                  <Link href="/katalog" className="flex h-10 items-center px-5 rounded-full border border-slate-700 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition-colors gap-2">
                    <LayoutDashboardIcon className="h-4 w-4" />Katalog
                  </Link>
                </div>

                <button className="lg:hidden p-2 text-gray-700 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[850px] border-t' : 'max-h-0'}`}>
            <div className="p-4 space-y-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  if (link.type === 'dropdown-services') {
                    return (
                      <div key={link.id} className="space-y-1">
                        <button 
                          onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)} 
                          className={`w-full flex justify-between items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                            link.isActive 
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
                              : 'text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
                        </button>
                        <div className={`pl-4 border-l-2 border-gray-200 dark:border-slate-700 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${isServicesDropdownOpen ? 'max-h-60 py-1.5' : 'max-h-0'}`}>
                          {footerServices.map((item, key) => (
                            <Link 
                              key={key} 
                              href={`/layanan/${item.slug}`} 
                              className="block text-sm text-gray-600 dark:text-slate-400 py-1.5 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800/50 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (link.type === 'dropdown-products') {
                    return (
                      <div key={link.id} className="space-y-1">
                        <button 
                          onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)} 
                          className={`w-full flex justify-between items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                            link.isActive 
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
                              : 'text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
                        </button>
                        <div className={`pl-4 border-l-2 border-gray-200 dark:border-slate-700 ml-4 space-y-3 overflow-y-auto transition-all duration-200 ${isProductDropdownOpen ? 'max-h-80 py-2' : 'max-h-0'}`}>
                          {productCategories.map((cat, index) => (
                            <div key={index} className="space-y-1">
                              <p className="text-[10px] font-bold text-gray-800 dark:text-slate-500 uppercase tracking-wider px-2">{cat.title}</p>
                              {cat.items.map((item, i) => (
                                <Link 
                                  key={i} 
                                  href={item.href} 
                                  className="block text-sm text-gray-600 dark:text-slate-400 py-1.5 px-2 pl-3 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800/50 transition-colors"
                                >
                                   - {item.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link 
                      key={link.id} 
                      href={link.href} 
                      onClick={(e) => handleScrollTo(e, link.id, link.href)} 
                      className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                        link.isActive 
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
                          : 'text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              <hr className="border-gray-200 dark:border-slate-800" />
              
              {/* Bagian CTA Action Buttons (Dibuat seimbang, presisi, dan proporsional untuk mobile) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button 
                  asChild 
                  className="w-full justify-center py-5 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-xl transition-colors flex items-center gap-2"
                >
                  <a href={whatsappUrl}>
                    <Phone className="h-4 w-4 shrink-0" />
                    Hubungi Kami
                  </a>
                </Button>
                
                <Link 
                  href="/katalog" 
                  className="w-full flex h-10 items-center justify-center px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors gap-2"
                >
                  <LayoutDashboardIcon className="h-4 w-4 text-amber-600 shrink-0" />
                  Katalog Unit
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}