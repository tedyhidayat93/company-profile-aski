// resources/js/constants/navigation.ts
export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Layanan Kami', href: '/layanan' },
  { name: 'Katalog Produk', href: '/jual-sewa' },
  { name: 'Testimoni & Ulasan', href: '/testimonial' },
  { name: 'Artikel & Berita', href: '/info' },
  { name: 'Kontak Kami', href: '/kontak' },
  { name: 'Sitemap', href: '/sitemap' }
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'Facebook', href: '#' },
  { name: 'Instagram', icon: 'Instagram', href: '#' },
  { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
  { name: 'Twitter', icon: 'X', href: '#' }
];

export const CONTACT_INFO = {
  phone: '+62 123 4567 890',
  whatsapp: '6281282336464',
  email: 'info@company.com',
  address: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345'
};

export type NavLink = {
  name: string;
  href: string;
};

export type SocialLink = {
  name: string;
  icon: string;
  href: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
};