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
  const page = usePage();
  const siteconfig = (page.props as any).siteconfig || {};

  // Clone children dan tambahkan siteConfig sebagai props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { siteconfig });
    }
    return child;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Head title={title} />
      <Header />
      <main className="grow bg-slate-50">
        {childrenWithProps}
      </main>
      <Footer siteConfig={siteconfig} />
    </div>
  );
}