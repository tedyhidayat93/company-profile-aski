import { Link, usePage } from '@inertiajs/react';
import { Phone, Mail, Megaphone, X, AlignEndVerticalIcon, Heart, ShoppingCart, PhoneCall } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { CONTACT_INFO } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import Wishlist from '@/components/wishlist';
import { useConfig } from '@/utils/config';
import { handleImageError } from '@/utils/image';

import type { WishlistItem } from '@/hooks/useWishlist';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { auth } = usePage().props as any;
  const { getConfig } = useConfig();
  const siteLogo = getConfig('site_logo', '/images/logo-main.png');
  const logoImage = siteLogo.startsWith('configurations/') ? `/storage/${siteLogo}` : siteLogo;
  const { url } = usePage();
  const isHomepage = url === '/';
  const isCatalog = url === '/catalog';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (isHomepage) {
      // On homepage, scroll to section
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -70; // offset from top
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      // On other pages, navigate to homepage with hash
      window.location.href = `/#${id}`;
    }
  };

  const NAV_LINKS2 = [
    { name: 'Beranda', id: 'home', href: isHomepage ? '#' : '/' },
    { name: 'Layanan', id: 'services', href: isHomepage ? '#' : '/#services' },
    { name: 'Katalog Produk', id: 'products', href: isCatalog ? '#' : '/catalog' },
    { name: 'Artikel', id: 'article', href: isHomepage ? '#' : '/#article' },
    { name: 'Kontak', id: 'contact', href: isHomepage ? '#' : '/#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get wishlist state and actions from our custom hook
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Wishlist
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={removeFromWishlist}
      />
      
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
        {/* Top Bar */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex flex-nowrap min-w-full items-center space-x-4">
              <a href={`tel:${getConfig('contact_phone', CONTACT_INFO.phone).replace(/\D/g, '')}`} className="flex truncate items-center hover:text-yellow-300 transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                {getConfig('contact_phone', CONTACT_INFO.phone)}
              </a>
              <a href={`mailto:${getConfig('contact_email', CONTACT_INFO.email)}`} className="flex truncate items-center hover:text-yellow-300 transition-colors">
                <Mail className="h-4 w-4 mr-1" />
                {getConfig('contact_email', CONTACT_INFO.email)}
              </a>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4">{getConfig('topbar_message1', 'Layanan perbaikan kontainer tersedia 24/7')}</span>
                <span className="mx-4">{getConfig('topbar_message2', 'Menyediakan layanan purna jual yang profesional dan terpercaya')}</span>
                <span className="mx-4">{getConfig('topbar_message3', 'Kualitas terjamin, harga kompetitif di pasar')}</span>
                <span className="mx-4">{getConfig('topbar_message4', 'Pengiriman cepat ke seluruh Indonesia')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 dark:bg-gray-900 ${
          isScrolled ? 'shadow-md' : ''
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile First: Base Layout */}
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo - Responsive sizing */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/">
                  <img
                    src={logoImage}
                    alt={getConfig('site_name', '-')}
                    className="h-8 sm:h-10 lg:h-12 w-auto"
                    onError={(e) => handleImageError(e, '/images/logo-main.png', 'Site logo header')}
                  />
                </Link>
              </div>

              {/* Mobile & Tablet Navigation & Actions */}
              <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden">
                {/* Wishlist Button - Mobile/Tablet */}
                <button 
                  type="button" 
                  className="relative p-2 text-gray-700 hover:text-primary dark:text-white"
                  onClick={() => setIsWishlistOpen(true)}
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] sm:text-xs font-medium text-white">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                
                {/* Mobile Menu Toggle */}
                <button
                  type="button"
                  className="p-2 text-gray-700 hover:text-primary focus:outline-none dark:text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  ) : (
                    <AlignEndVerticalIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation - Hidden on mobile/tablet */}
              <div className="hidden lg:flex items-center justify-between flex-1 max-w-6xl mx-auto">
                {/* Navigation Links */}
                <nav className="flex items-center justify-center pl-2 md:pl-10 xl:pl-13 space-x-1 xl:space-x-2">
                  {NAV_LINKS2.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        scrollToSection(e, link.id);
                        setIsMenuOpen(false);
                      }}
                      className="rounded-md px-3 py-2 xl:px-4 text-sm xl:text-base text-gray-900 hover:text-primary font-medium hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                {/* Desktop Actions */}
                <div className="flex items-center space-x-2 xl:space-x-4 ml-4 xl:ml-8">
                  {/* Wishlist - Desktop */}
                  <button 
                    type="button" 
                    className="relative p-2 text-gray-700 hover:text-primary dark:text-white"
                    onClick={() => setIsWishlistOpen(true)}
                  >
                    <Heart className="h-5 w-5" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                  
                  {/* Auth Links - Desktop */}
                  {auth?.user ? (
                    <Link
                      href={dashboard()}
                      className="px-3 py-2 text-sm xl:text-base text-gray-700 hover:text-primary font-medium"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href={login()}
                      className="px-3 py-2 text-sm xl:text-base text-gray-700 hover:text-primary font-medium"
                    >
                      Masuk
                    </Link>
                  )}
                  
                  {/* CTA Button - Desktop */}
                  <a 
                    href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=Halo%20Alumoda%2C%20saya%20ingin%20bertanya`} 
                    className="cursor-pointer"
                  >
                    <Button className="text-sm xl:text-base px-4 xl:px-6 py-2">
                      <Phone className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Hubungi Kami</span>
                      <span className="sm:hidden">Hubungi</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu - Overlay */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                {/* Navigation Links - Mobile */}
                {NAV_LINKS2.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      scrollToSection(e, link.id);
                      setIsMenuOpen(false);
                    }}
                    className="block rounded-md px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                {/* Auth Links - Mobile */}
                {auth?.user ? (
                  <Link
                    href={dashboard()}
                    className="block rounded-md px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={login()}
                    className="block rounded-md px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Masuk / Daftar
                  </Link>
                )}
                
                {/* CTA Button - Mobile */}
                <div className="pt-2">
                  <a 
                    href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=Halo%20Alumoda%2C%20saya%20ingin%20bertanya`} 
                    className="block w-full"
                  >
                    <Button className="w-full text-base py-3">
                      <Phone className="mr-2 h-4 w-4" />
                      Hubungi Kami
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}