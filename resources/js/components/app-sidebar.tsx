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
  MessageCircleQuestion,
  Shield,
  ShoppingCart,
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
        {
          title: 'Daftar Pesanan',
          href: '/cpanel/crm/orders',
          icon: ShoppingCart,
        },
        {
          title: 'Posting Artikel',
          href: '/cpanel/cms/article',
          icon: FileText,
        },
        {
          title: 'Produk',
          href: '/cpanel/cms/product',
          icon: LayoutGrid,
        },
        {
          title: 'Pelanggan',
          href: '/cpanel/crm/customer',
          icon: Users,
        },
        {
          title: 'Brand',
          href: '/cpanel/cms/brand',
          icon: Tag,
        },
        {
          title: 'Layanan',
          href: '/cpanel/cms/service',
          icon: HandHeart,
        },
        {
          title: 'Kategori',
          href: '/cpanel/cms/category',
          icon: Folder,
        },
        {
          title: 'Tag',
          href: '/cpanel/cms/tag',
          icon: Tag,
        },
        {
          title: 'FAQ',
          href: '/cpanel/cms/faq',
          icon: MessageCircleQuestion,
        }
      ],
    }
  }
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
