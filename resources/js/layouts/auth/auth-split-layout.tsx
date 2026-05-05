import AppLogoIcon from '@/components/app-logo-icon';
import { homepage } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import BgHero from '@/assets/images/bg-hero.png';
import LogoMainSquare from '@/assets/images/logo-main-square.png';
import { handleImageError } from '@/utils/image';

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  const { name, quote, siteconfig } = usePage<SharedData>().props;

  // Get configuration values from database
  const getHomepageConfig = (key: string, defaultValue: string = '') => {
    const config = siteconfig?.find((c) => c.key === key && c.group === 'view_homepage');
    return config?.value || defaultValue;
  };

  const homepageLogo = getHomepageConfig('homepage_logo');
  const homepageLogoAlt = getHomepageConfig('homepage_logo_alt', 'Company Logo');
  const homepageBgImage = getHomepageConfig('homepage_bg_image');

  return (
    <div className="relative bg-white grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div 
        className={`relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r image-center bg-cover bg-center [background-image:url(${homepageBgImage ? `/storage/${homepageBgImage}` : BgHero})]`}>
        <div className="absolute inset-0 bg-zinc-900" />
        <Link href={homepage()} className="relative z-20 flex items-center text-lg font-medium">
          {name}
        </Link>
        {quote && (
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
              <footer className="text-sm text-neutral-300">{quote.author}</footer>
            </blockquote>
          </div>
        )}
      </div>
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
            href={homepage()}
            className="relative z-20 flex items-center justify-center"
          >
            {homepageLogo ? (
              <img src={`/storage/${homepageLogo}`} onError={handleImageError} className='size-20 object-contain' alt={homepageLogoAlt} />
            ) : (
              <img src={LogoMainSquare} onError={handleImageError} className='size-20 object-contain' alt="PT Alumoda Sinergi Kontainer Indonesia" />
            )}
          </Link>
          <div className="flex flex-col items-center gap-2 text-center!">
            <h1 className="text-2xl font-bold leading-tight">{title}</h1>
            <p className="text-muted-foreground text-xs leading-relaxed text-balance max-w-md text-center">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
