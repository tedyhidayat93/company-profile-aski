// resources/js/layouts/frontend-layout.tsx
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import Header from '@/layouts/frontend/header';
import Footer from '@/layouts/frontend/footer';

interface FrontendLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function FrontendLayout({ children, title }: FrontendLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head title={title} />
      <Header />
      <main className="grow bg-slate-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}