// resources/js/layouts/frontend-layout.tsx
import { Head } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import Header from '@/layouts/frontend/header';
import Footer from '@/layouts/frontend/footer';
import { usePage } from '@inertiajs/react';

// Di FrontendLayout
interface FrontendLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function FrontendLayout({ children, title }: FrontendLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head title={title} />
      <Header />
      <main className="grow bg-white dark:bg-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
}