import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO, NavLink, SocialLink } from '@/constants/navigation';

const socialIcons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin,  // Changed from LinkedIn to match SOCIAL_LINKS
  X: Twitter
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-primary">PT. Alumoda Sinergi Kontainer Indonesia</h3>
            <p className="text-gray-400">
              Solusi terpercaya untuk kebutuhan kontainer Anda dengan layanan profesional dan
              berkualitas.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Tautan Cepat</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link: NavLink) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: {CONTACT_INFO.email}</li>
              <li>Telepon: {CONTACT_INFO.phone}</li>
              <li>Alamat: {CONTACT_INFO.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social: SocialLink) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    className="text-gray-400 transition-colors hover:text-white" 
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
            
            {/* Google Maps Section */}
            <div className="mt-6">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81917551529447!3d-6.194981395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x7c4d63b8f3f1c3d8!2sJl.%20Contoh%20No.123%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1640000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Lokasi PT. Alumoda Sinergi Kontainer Indonesia"
                  className="w-full h-48 rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} PT. Alumoda Sinergi Kontainer Indonesia. Semua hak
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}