import LogoMain from '@/assets/images/logo-main-square.png';

export default function AppLogo() {
  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md bg-white">
        <img src={LogoMain} className="size-9 fill-current text-white dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">Kontrol Panel ASKI</span>
        <span className="text-muted-foreground truncate text-xs">
          PT. Alumoda Sinergi Kontainer Indonesia
        </span>
      </div>
    </>
  );
}
