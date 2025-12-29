// resources/js/constants/navigation.ts
export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Produk', href: '/produk' },
  { name: 'Artikel', href: '/artikel' },
  { name: 'Kontak', href: '/kontak' }
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'Facebook', href: '#' },
  { name: 'Instagram', icon: 'Instagram', href: '#' },
  { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
  { name: 'Twitter', icon: 'X', href: '#' }
];

export const CONTACT_INFO = {
  phone: '+62 123 4567 890',
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