// resources/js/layouts/frontend-layout.tsx

import { Head } from '@inertiajs/react';
import React, { ReactNode, useEffect } from 'react';
import Header from '@/layouts/frontend/header';
import Footer from '@/layouts/frontend/footer';
import { Toaster } from "@/components/ui/sonner";
import FloatingWhatsAppCTA from '@/components/floating-whatsapp-cta';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
    dataLayer: any[];
  }
}

interface FrontendLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function FrontendLayout({
  children,
  title,
}: FrontendLayoutProps) {

  useEffect(() => {
    // -----------------------------------------------------------------
    // 1. Injeksi Google Translate (Aman dari Duplikasi)
    // -----------------------------------------------------------------
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'id',
            includedLanguages: 'id,en,zh-CN,ja,ko,ar',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };

      const translateScript = document.createElement('script');
      translateScript.id = 'google-translate-script';
      translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      translateScript.async = true;
      document.body.appendChild(translateScript);
    }

    // -----------------------------------------------------------------
    // 2. Injeksi Google Analytics G-Tag (Dipindahkan dari JSX ke useEffect)
    // -----------------------------------------------------------------
    if (!document.getElementById('google-tag-manager-script')) {
      // Injeksi file library Gtag
      const gTagLib = document.createElement('script');
      gTagLib.id = 'google-tag-manager-script';
      gTagLib.src = 'https://www.googletagmanager.com/gtag/js?id=G-BC4R74R2S8';
      gTagLib.async = true;
      document.body.appendChild(gTagLib);

      // Injeksi konfigurasi Gtag internal
      const gTagConfig = document.createElement('script');
      gTagConfig.id = 'google-tag-config';
      gTagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BC4R74R2S8');
      `;
      document.body.appendChild(gTagConfig);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Head title={title} />

      <Header />

      <Toaster />

      <main className="grow bg-white">
        {children}
      </main>

      <FloatingWhatsAppCTA />

      <Footer />
    </div>
  );
}