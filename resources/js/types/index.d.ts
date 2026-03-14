import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavGroupItem {
  group: NavGroup;
}

export interface NavItem {
  title: string;
  href: NonNullable<InertiaLinkProps['href']>;
  icon?: LucideIcon | null;
  isActive?: boolean;
  items?: NavItem[];
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  two_factor_enabled?: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  short_description?: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  cost_per_item?: number;
  track_quantity: boolean;
  quantity?: number;
  barcode?: string;
  status: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_for_sell: boolean;
  is_rent: boolean;
  position?: number;
  brand_id?: number;
  category_id?: number;
  image_path?: string; // Processed image path with /storage/ prefix
  coverImage?: {
    id: number;
    image_path: string;
    is_cover: boolean;
    position: number;
  };
  brand?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  tags: string[];
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
