import { useConfig } from '@/utils/config';

export default function AppLogo() {
  const { getConfig } = useConfig();
  const siteLogo = getConfig('site_logo', '/assets/images/logo-main-square.png');
  const siteName = getConfig('site_name', 'Alumoda Sinergi Kontainer Indonesia');

  // Add storage prefix if it's a stored file
  const logoSrc = siteLogo.startsWith('configurations/') ? `/storage/${siteLogo}` : siteLogo;

  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md bg-white">
        <img src={logoSrc} className="size-9 fill-current text-white dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">Admin Panel</span>
        <span className="text-muted-foreground truncate text-xs">
          {siteName}
        </span>
      </div>
    </>
  );
}
