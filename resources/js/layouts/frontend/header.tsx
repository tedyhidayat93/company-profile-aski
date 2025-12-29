// resources/js/layouts/frontend/header.tsx
import { Link } from '@inertiajs/react';
import { Phone, Mail, Megaphone, X, AlignEndVerticalIcon, Heart, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import logoImage from '@/assets/images/logo-main.png';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/constants/navigation';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import { usePage } from '@inertiajs/react';
import Wishlist from '@/components/wishlist';

import type { WishlistItem } from '@/hooks/useWishlist';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { auth } = usePage().props as any;
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
    { name: 'Katalog', id: 'products', href: isCatalog ? '#' : '/catalog' },
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
              <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="flex items-center hover:text-yellow-300 transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}"`} className="flex items-center hover:text-yellow-300 transition-colors">
                <Mail className="h-4 w-4 mr-1" />
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4">Layanan perbaikan kontainer tersedia 24/7</span>
                <span className="mx-4">Menyediakan layanan purna jual yang profesional dan terpercaya</span>
                <span className="mx-4">Kualitas terjamin, harga kompetitif di pasar</span>
                <span className="mx-4">Pengiriman cepat ke seluruh Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 dark:bg-gray-900 ${
          isScrolled ? 'shadow-md' : ''
        }`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href="/">
                  <img
                    src={logoImage}
                    alt="PT. Alumoda Sinergi Kontainer Indonesia"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden space-x-4 md:flex items-center">
                {NAV_LINKS2.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      scrollToSection(e, link.id);
                      setIsMenuOpen(false);
                    }}
                    className="block rounded-md px-4 py-2 text-gray-900 hover:text-primary font-semibold hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  type="button" 
                  className="p-2 cursor-pointer text-gray-700 hover:text-primary relative"
                  onClick={() => setIsWishlistOpen(true)}
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                
                {auth?.user ? (
                  <Link
                    href={dashboard()}
                    className="text-gray-700 hover:text-primary px-3 py-2"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={login()}
                    className="text-gray-700 hover:text-primary px-3 py-2"
                  >
                    Masuk
                  </Link>
                )}
                
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} 
                  className="ml-2 cursor-pointer"
                >
                  <Button className="ml-2 cursor-pointer">
                    <Phone className="mr-1 h-4 w-4" />
                    Konsultasi Gratis
                  </Button>
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="p-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsWishlistOpen(true)}
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-3 right-12 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                
                <button
                  type="button"
                  className="p-2 text-gray-700 hover:text-primary focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <AlignEndVerticalIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {NAV_LINKS2.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    scrollToSection(e, link.id);
                    setIsMenuOpen(false);
                  }}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  {link.name}
                </a>
              ))}
              
              {auth?.user ? (
                <Link
                  href={dashboard()}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={login()}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk / Daftar
                </Link>
              )}
              
              <button className="w-full mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                <Megaphone className="mr-2 inline h-4 w-4" />
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}