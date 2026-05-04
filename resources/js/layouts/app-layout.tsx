import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  recentOrders?: any[];
}

export default ({ children, breadcrumbs, recentOrders, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} recentOrders={recentOrders} {...props}>
    {children}
  </AppLayoutTemplate>
);
