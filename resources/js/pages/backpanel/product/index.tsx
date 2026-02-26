import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Filter,
  Package,
  Star,
  TrendingUp,
  GripVertical
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string;
  short_description?: string;
  sku?: string;
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
  brand_id?: number;
  category_id?: number;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  brand?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface PaginatedProducts {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

interface Props {
  products: PaginatedProducts;
  brands: Array<{ id: number; name: string }>;
  categories: Array<{ id: number; name: string }>;
  filters: {
    search?: string;
    type?: string;
    brand?: string;
    category?: string;
    status?: string;
    featured?: string;
    bestseller?: string;
  };
}

export default function ProductIndex({ products, brands, categories, filters }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Produk',
      href: '/cpanel/cms/product',
    },
  ];

  const [search, setSearch] = React.useState(filters.search || '');
  const [typeFilter, setTypeFilter] = React.useState(filters.type || '');
  const [brandFilter, setBrandFilter] = React.useState(filters.brand || '');
  const [categoryFilter, setCategoryFilter] = React.useState(filters.category || '');
  const [statusFilter, setStatusFilter] = React.useState(filters.status || '');
  const [featuredFilter, setFeaturedFilter] = React.useState(filters.featured || '');
  const [bestsellerFilter, setBestsellerFilter] = React.useState(filters.bestseller || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/cms/product',
      { 
        search: value, 
        type: typeFilter,
        brand: brandFilter,
        category: categoryFilter,
        status: statusFilter,
        featured: featuredFilter,
        bestseller: bestsellerFilter
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'type':
        setTypeFilter(value);
        break;
      case 'brand':
        setBrandFilter(value);
        break;
      case 'category':
        setCategoryFilter(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'featured':
        setFeaturedFilter(value);
        break;
      case 'bestseller':
        setBestsellerFilter(value);
        break;
    }

    router.get(
      '/cpanel/cms/product',
      { 
        search: search, 
        type: filterType === 'type' ? value : typeFilter,
        brand: filterType === 'brand' ? value : brandFilter,
        category: filterType === 'category' ? value : categoryFilter,
        status: filterType === 'status' ? value : statusFilter,
        featured: filterType === 'featured' ? value : featuredFilter,
        bestseller: filterType === 'bestseller' ? value : bestsellerFilter
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      router.delete(`/cpanel/cms/product/${id}`);
    }
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/product/${id}/toggle-status`);
  };

  const handleToggleFeatured = (id: number) => {
    router.patch(`/cpanel/cms/product/${id}/toggle-featured`);
  };

  const handleToggleBestseller = (id: number) => {
    router.patch(`/cpanel/cms/product/${id}/toggle-bestseller`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Diterbitkan</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Produk"
          description="Data produk yang tersedia di website"
        >
          <Link href="/cpanel/cms/product/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent className='space-y-3'>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Select value={typeFilter} onValueChange={(value) => handleFilterChange('type', value)}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="physical">Fisik</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                </SelectContent>
              </Select>
              <Select value={brandFilter} onValueChange={(value) => handleFilterChange('brand', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Merek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Merek</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Diterbitkan</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={featuredFilter} onValueChange={(value) => handleFilterChange('featured', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Unggulan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="true">Unggulan</SelectItem>
                  <SelectItem value="false">Tidak Unggulan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={bestsellerFilter} onValueChange={(value) => handleFilterChange('bestseller', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Terlaris" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="true">Terlaris</SelectItem>
                  <SelectItem value="false">Tidak Terlaris</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Pos</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fitur</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{product.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <div className="font-medium">{product.name}</div>
                        {product.short_description && (
                          <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                            {product.short_description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{product.sku || '-'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        Rp {product.price.toLocaleString()}
                        {product.compare_at_price && (
                          <span className="text-gray-400 line-through ml-2">
                            Rp {product.compare_at_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {product.is_featured && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                        {product.is_bestseller && (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        )}
                        {product.is_new && (
                          <Badge variant="secondary" className="text-xs">Baru</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(product.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/cms/product/edit/${product.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(product.id)}
                            className="text-blue-600"
                          >
                            <Package className="mr-2 h-4 w-4" />
                            Toggle Status
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleFeatured(product.id)}
                            className="text-yellow-600"
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Toggle Unggulan
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleBestseller(product.id)}
                            className="text-green-600"
                          >
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Toggle Terlaris
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {products.data.length === 0 && (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada produk</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan menambah produk baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/product/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Produk
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {products.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Menampilkan {((products.current_page - 1) * products.per_page) + 1} hingga{' '}
                  {Math.min(products.current_page * products.per_page, products.total)} dari{' '}
                  {products.total} hasil
                </div>
                <div className="flex space-x-2">
                  {products.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(products.links.prev || '')}
                    >
                      Sebelumnya
                    </Button>
                  )}
                  {products.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(products.links.next || '')}
                    >
                      Selanjutnya
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
