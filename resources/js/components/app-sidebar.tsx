import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavGroupItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  Activity,
  BarChart,
  BookOpen,
  FileText,
  Folder,
  HandHeart,
  LayoutGrid,
  ListOrdered,
  Lock,
  Shield,
  Tag,
  Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavGroups: NavGroupItem[] = [
  {
    group: {
      title: '',
      items: [
        {
          title: 'Dashboard',
          href: '/cpanel',
          icon: LayoutGrid,
        },
      ],
    },
  },
  {
    group: {
      title: 'CMS',
      items: [
        {
          title: 'Katalog Produk',
          href: '/cms/catalog',
          icon: LayoutGrid,
        },
        {
          title: 'Artikel/Berita',
          href: '/cms/articles',
          icon: FileText,
        },
        {
          title: 'Merek',
          href: '/cms/brands',
          icon: Tag,
        },
        {
          title: 'Layanan',
          href: '/cms/services',
          icon: HandHeart,
        },
        {
          title: 'Kategori',
          href: '/cms/categories',
          icon: Folder,
        },
        {
          title: 'Tag',
          href: '/cms/tags',
          icon: Tag,
        },
      ],
    },
  },
  {
    group: {
      title: 'CRM',
      items: [
        {
          title: 'Pelanggan',
          href: '/crm/customers',
          icon: Users,
        },
        {
          title: 'Daftar Pesanan',
          href: '/crm/orders',
          icon: ListOrdered,
        },
        {
          title: 'Faktur',
          href: '/crm/invoices',
          icon: FileText,
        },
        {
          title: 'Laporan',
          href: '/crm/reports',
          icon: BarChart,
        },
      ],
    },
  },
  {
    group: {
      title: 'SISTEM',
      items: [
        {
          title: 'Role',
          href: '/system/roles',
          icon: Shield,
        },
        {
          title: 'Hak Akses',
          href: '/system/permissions',
          icon: Lock,
        },
        {
          title: 'Aktivitas',
          href: '/system/activity-logs',
          icon: Activity,
        },
        {
          title: 'Pengguna',
          href: '/system/users',
          icon: Users,
        },
      ],
    },
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="-space-y-2!">
        {mainNavGroups.map(({ group }, index) => (
          <NavMain key={index} items={group.items} groupTitle={group.title} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
