import React from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
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
import { formatPrice } from '@/utils/currency';
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
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Product {
  id: number;
  name: string;
  slug: string;
  type: 'physical' | 'digital';
  description?: string;
  short_description?: string;
  sku?: string;
  price: number;
  compare_at_price?: number;
  cost_per_item?: number;
  track_quantity: boolean;
  quantity?: number;
  barcode?: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  published_at?: string;
  position?: number;
  brand_id?: number;
  category_id?: number;
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  brand?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  coverImage?: {
    id: number;
    image_path: string;
    is_cover: boolean;
    position: number;
  };
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
  const { props } = usePage();
  const flash = props.flash as { success?: string; error?: string } || { success: '', error: '' };
  
  // Debug: Log first product data
  React.useEffect(() => {
    if (products.data.length > 0) {
      console.log('First product data:', products.data[0]);
      console.log('Cover image:', products.data[0].coverImage);
      console.log('Category:', products.data[0].category);
    }
  }, [products]);
  
  React.useEffect(() => {
    if (flash.success) {
      console.log('Success:', flash.success);
      alert(flash.success);
    }
    if (flash.error) {
      console.log('Error:', flash.error);
      alert(flash.error);
    }
  }, [flash]);

  const [search, setSearch] = React.useState(filters.search || '');
  const [typeFilter, setTypeFilter] = React.useState(filters.type || 'all');
  const [brandFilter, setBrandFilter] = React.useState(filters.brand || 'all');
  const [categoryFilter, setCategoryFilter] = React.useState(filters.category || 'all');
  const [statusFilter, setStatusFilter] = React.useState(filters.status || 'all');
  const [featuredFilter, setFeaturedFilter] = React.useState(filters.featured || 'all');
  const [bestsellerFilter, setBestsellerFilter] = React.useState(filters.bestseller || 'all');

  const handleSearch = (value: string) => {
    setSearch(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: value };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (value !== 'all') params.type = value;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleBrandFilter = (value: string) => {
    setBrandFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (value !== 'all') params.brand = value;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (value !== 'all') params.category = value;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (value !== 'all') params.status = value;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleFeaturedFilter = (value: string) => {
    setFeaturedFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (value !== 'all') params.featured = value;
    if (bestsellerFilter !== 'all') params.bestseller = bestsellerFilter;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleBestsellerFilter = (value: string) => {
    setBestsellerFilter(value);
    const params: { 
      search?: string; 
      type?: string; 
      brand?: string; 
      category?: string; 
      status?: string; 
      featured?: string; 
      bestseller?: string; 
    } = { search: search };
    
    if (typeFilter !== 'all') params.type = typeFilter;
    if (brandFilter !== 'all') params.brand = brandFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (featuredFilter !== 'all') params.featured = featuredFilter;
    if (value !== 'all') params.bestseller = value;
    
    router.get('/cpanel/cms/product', params, { preserveState: true });
  };

  const handleResetFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setBrandFilter('all');
    setCategoryFilter('all');
    setStatusFilter('all');
    setFeaturedFilter('all');
    setBestsellerFilter('all');
    
    router.get('/cpanel/cms/product', {}, { preserveState: true });
  };

  // Check if any filter is active
  const hasActiveFilters = search || 
    typeFilter !== 'all' || 
    brandFilter !== 'all' || 
    categoryFilter !== 'all' || 
    statusFilter !== 'all' || 
    featuredFilter !== 'all' || 
    bestsellerFilter !== 'all';

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/product/${id}/toggle-status`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      router.delete(`/cpanel/cms/product/${id}`);
    }
  };

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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Produk"
          description="Data produk yang ada di website"
        >
          <Link href="/cpanel/cms/product/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>

            <div className="flex flex-col gap-2 mb-3">
              <div className="flex gap-2">
                <div className="flex flex-1 flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Cari Produk</Label>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari produk..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                {hasActiveFilters && (
                    <div className="flex flex-col space-y-1">
                      <Label className="text-xs font-medium text-gray-600">&nbsp;</Label>
                      <Button 
                        type="button" 
                        size="sm"
                        variant="destructive" 
                        onClick={handleResetFilters}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Tipe</Label>
                  <Select value={typeFilter} onValueChange={handleTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="physical">Fisik</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Merek</Label>
                  <Select value={brandFilter} onValueChange={handleBrandFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Merek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Kategori</Label>
                  <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Status</Label>
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="published">Diterbitkan</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Unggulan</Label>
                  <Select value={featuredFilter} onValueChange={handleFeaturedFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Unggulan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="true">Unggulan</SelectItem>
                      <SelectItem value="false">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Terlaris</Label>
                  <Select value={bestsellerFilter} onValueChange={handleBestsellerFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Terlaris" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="true">Terlaris</SelectItem>
                      <SelectItem value="false">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {product.coverImage ? (
                          <img 
                            src={`/storage/${product.coverImage.image_path}`} 
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={product.type === 'physical' ? 'default' : 'secondary'}>
                              {product.type === 'physical' ? 'Fisik' : 'Digital'}
                            </Badge>
                            {product.is_featured && (
                              <Badge variant="secondary">
                                <Star className="h-3 w-3 mr-1" />
                                Unggulan
                              </Badge>
                            )}
                            {product.is_bestseller && (
                              <Badge variant="secondary">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Terlaris
                              </Badge>
                            )}
                            {product.is_new && (
                              <Badge variant="secondary">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Baru
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.category?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatPrice(product.price)}</div>
                        {product.compare_at_price && product.compare_at_price > product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compare_at_price)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.track_quantity ? (
                        <div>
                          <div className="font-medium">{product.quantity || 0}</div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(product.id)}
                        className="p-1 cursor-pointer"
                      >
                        <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                          {product.status === 'published' ? 'Diterbitkan' : 'Draft'}
                        </Badge>
                      </Button>
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
                            <Link href={`/cpanel/cms/product/${product.id}`}>
                              <Package className="mr-2 h-4 w-4" />
                              Lihat
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/cms/product/edit/${product.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Ubah
                            </Link>
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
                  Mulai dengan membuat produk baru.
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
                  Showing {((products.current_page - 1) * products.per_page) + 1} to{' '}
                  {Math.min(products.current_page * products.per_page, products.total)} of{' '}
                  {products.total} results
                </div>
                <div className="flex space-x-2">
                  {products.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(products.links.prev || '')}
                    >
                      Previous
                    </Button>
                  )}
                  {products.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(products.links.next || '')}
                    >
                      Next
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
