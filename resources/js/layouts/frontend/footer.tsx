import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, SquarePlay, Phone, MapPin, Mail, MessageCircle, FileText, Clock } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO, NavLink } from '@/constants/navigation';
import { useConfig } from '@/utils/config';
import { usePage } from '@inertiajs/react';
import { cleanHtml } from '@/utils/stringHelper';
import { handleImageError } from '@/utils/image';
import { MenuCategory } from './header';
import axios from 'axios';

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin, 
  X: Twitter,
  Youtube: Youtube,
  Tiktok: SquarePlay
};

export default function Footer() {
  const { getConfig } = useConfig();
  const { props } = usePage();
  const { footerServices = [], productCategories = [], footerProducts = [] } = props as any as {
    footerServices: any[],
    productCategories: MenuCategory[],
    footerProducts: any[],
  };

  const logoImage = getConfig('site_logo', '') ? `/storage/${getConfig('site_logo', '')}` : '/images/logo-main.png';

  // 1. Ambil properti global props dari Inertia & ambil data rute saat ini
  const { visitorActions = {}, appPages = {} } = usePage().props as any;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // 2. Fungsi Deteksi Halaman Otomatis Berdasarkan URL Path
  const detectPageName = (): string => {
      if (typeof window === 'undefined') return appPages.UNKNOWN || 'unknown_page';

      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);

      switch (true) {
          case (path === '/' || path === ''): return appPages.HOMEPAGE;
          case (path === '/kontak'): return appPages.CONTACT_US;
          case (path === '/tentang-kami'): return appPages.ABOUT_US;
          case (path === '/sitemap' || path === '/sitemap.xml'): return appPages.SITEMAP;
          case (path === '/layanan'): return appPages.SERVICE_INDEX;
          case (path.startsWith('/layanan/')): return appPages.SERVICE_SHOW;
          case (path === '/produk'): return appPages.PRODUCT_INDEX;
          case (path.startsWith('/produk/')): return appPages.PRODUCT_DETAIL;
          case (path === '/katalog' || path === '/katalog/'): return appPages.CATALOG_INDEX;
          case (path.startsWith('/katalog/kategori/')): return appPages.CATALOG_CATEGORY;
          case (path.startsWith('/katalog/')): return appPages.CATALOG_SHOW;
          case (path === '/testimonial' || path === '/testimonial/'): return appPages.TESTIMONIAL_INDEX;
          case (path === '/testimonial/maps'): return appPages.TESTIMONIAL_MAPS;
          case (path === '/info' || path === '/info/'): return appPages.BLOG_INDEX;
          case (path.startsWith('/info/kategori/')): return appPages.BLOG_CATEGORY;
          case (path.startsWith('/info/tag/')): return appPages.BLOG_TAG;
          case (segments.length === 1): return appPages.BLOG_DETAIL;
          default: return appPages.UNKNOWN || 'unknown_page';
      }
  };

  const pageName = detectPageName();

  const handleFooterWaClick = async () => {
      const cleanPhone = getConfig('contact_whatsapp', CONTACT_INFO.whatsapp).replace(/[^0-9]/g, '');
      
      const openWhatsApp = () => {
          const defaultMessage = getConfig('whatsapp_message', 'Halo Alumoda, saya ingin bertanya');
          const trackingText = `\n\n_(Dikirim via: Footer - ${pageName})_\n_(URL: ${currentUrl})_`;
          const fullWaLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage + trackingText)}`;
          
          window.open(fullWaLink, '_blank', 'noopener,noreferrer');
      };

      try {
          // Kirim analitik ke backend (Aksi: whatsapp_footer_direct_click)
          await axios.post('/api/visitor-logs/leads', {
              name: 'Visitor Footer Click',
              message: `Melakukan klik tombol WhatsApp pada bagian footer website.`,
              source_page: pageName,
              source_url: currentUrl,
              action_type: visitorActions.WA_FOOTER_DIRECT_CLICK || 'whatsapp_footer_direct_click'
          });

          // Buka tautan chat WhatsApp secara instan
          openWhatsApp();
      } catch (error) {
          console.error('Gagal merekam analitik footer, langsung mengalihkan ke WhatsApp:', error);
          // Fallback jika API backend bermasalah agar user experience tidak terputus
          openWhatsApp();
      }
  };

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-14">

        {/* Top Section: Brand & Socials */}
        <div className="flex flex-col gap-8 border-b border-gray-800 pb-10 md:flex-row md:items-start md:justify-between">
          
          {/* Brand Info */}
          <div className="max-w-2xl">
            <Link href="/" className="inline-block h-12 w-auto">
              <img
                src={logoImage}
                alt={getConfig('site_name', 'Alumoda Sinergi Kontainer Indonesia')}
                className="max-h-full max-w-72 object-contain"
                onError={(e) => handleImageError(e, '/images/logo-main.png', 'Logo')}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {getConfig(
                'meta_description',
                'Solusi terpercaya untuk kebutuhan kontainer Anda dengan layanan profesional dan berkualitas.'
              )}
            </p>
          </div>

          {/* Social Media & Company Profile */}
          <div className="flex flex-col gap-4 sm:min-w-[300px]">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Ikuti Kami</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Facebook', icon: 'Facebook', href: getConfig('social_facebook', '') },
                  { name: 'Twitter', icon: 'X', href: getConfig('social_twitter', '') },
                  { name: 'Instagram', icon: 'Instagram', href: getConfig('social_instagram', '') },
                  { name: 'YouTube', icon: 'Youtube', href: getConfig('social_youtube', '') },
                  { name: 'TikTok', icon: 'Tiktok', href: getConfig('social_tiktok', '') }
                ]
                  .filter((social) => social.href)
                  .map((social) => {
                    const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="flex h-9 w-auto px-3 text-xs gap-2 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-600 hover:text-white"
                      >
                        <Icon className="h-3.5 w-3.5" /> {social.name}
                      </a>
                    );
                  })}
              </div>
            </div>

            {getConfig('company_profile_pdf') && (
              <div className="mt-2">
                <a 
                  href={`/storage/${getConfig('company_profile_pdf')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center items-center gap-2 text-xs font-semibold text-gray-300 hover:text-orange-400 bg-gray-900 border border-gray-800 hover:border-orange-500/50 px-3 py-2 rounded-lg transition duration-300"
                >
                  <FileText className="h-3.5 w-3.5 text-orange-500" />
                  Unduh Company Profile (PDF)
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Grid: Sekarang Pas 4 Kolom */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

          {/* Kolom 1: Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Informasi Perusahaan
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link: NavLink) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 2: Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Layanan Kami
            </h3>
            <ul className="space-y-2.5">
              {footerServices.map((service: any) => (
                <li key={service.id}>
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-orange-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Catalog */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Daftar Unit Container
            </h3>
            <ul className="space-y-2.5">
              {productCategories
                .filter((cat) => cat.slug === 'container')
                .map((cat) => 
                  // Menggunakan React.Fragment atau fragment kosong agar struktur DOM tetap rapi
                  // dan langsung me-looping sub-item (items) di dalamnya
                  cat.items?.map((item: any, i: number) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 transition-colors hover:text-orange-400 block truncate"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                )}
            </ul>
          </div>

          {/* Kolom 4: Contact & Maps */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Kontak & Alamat
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  {cleanHtml(getConfig("address", CONTACT_INFO.address), ['p'])}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href={`mailto:${getConfig("contact_email", CONTACT_INFO.email)}`} className="hover:text-orange-400 transition-colors truncate text-xs">
                  {getConfig("contact_email", CONTACT_INFO.email)}
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href={`tel:${getConfig('contact_phone', CONTACT_INFO.phone)}`} className="hover:text-orange-400 transition-colors text-xs">
                  {getConfig('contact_phone', CONTACT_INFO.phone)}
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Clock className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: getConfig('site_operational_hour', 'Senin - Jumat | 09:00 - 17:00 WIB')
                  }}
                  className="text-xs"
                />
              </li>
              <li className="pt-1">
                <button
                    type="button"
                    onClick={handleFooterWaClick}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-lg transition-colors w-full justify-center cursor-pointer active:scale-[0.98]"
                >
                    <MessageCircle className="h-4 w-4" />
                    Hubungi via WhatsApp
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-14 flex flex-col gap-4 border-t border-gray-900 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <div className="order-2 md:order-1 space-y-1">
            <p className="text-gray-400 font-medium">
              © {new Date().getFullYear()} <span className="text-orange-500">{getConfig('site_name', 'Your Company')}</span>. All Rights Reserved.
            </p>
            <p className="text-[11px] text-gray-600 max-w-xl leading-relaxed">
              Situs ini dilindungi oleh reCAPTCHA. Hubungan keamanan latar belakang tunduk pada{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 underline transition-colors">Kebijakan Privasi</a>
              {' '}dan{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 underline transition-colors">Persyaratan Layanan</a> Google.
            </p>
          </div>

          <p className="text-gray-400 font-medium order-1 md:order-2 italic">
            {getConfig('site_tagline', '')}
          </p>
        </div>

      </div>
    </footer>
  );
}