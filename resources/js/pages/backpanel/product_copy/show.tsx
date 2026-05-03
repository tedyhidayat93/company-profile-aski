import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { formatPrice } from '@/utils/currency';
import { ArrowLeft, Edit, Package, Calendar, Eye, EyeOff, Star, TrendingUp, Sparkles, Globe, Barcode } from 'lucide-react';

interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  is_cover: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

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
  is_for_sell: boolean;
  is_rent: boolean;
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
  images: ProductImage[];
}

interface Props {
  product: Product;
}

export default function ProductShow({ product }: Props) {
  const { props } = usePage();
  const flash = props.flash as { success?: string; error?: string } || { success: '', error: '' };
  
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const coverImage = product.images.find(img => img.is_cover) || product.images[0];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Produk',
      href: '/cpanel/cms/product',
    },
    {
      title: product.name,
      href: `/cpanel/cms/product/${product.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Produk: ${product.name}`} />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Detail Produk"
          description={`Informasi lengkap produk ${product.name}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Produk</CardTitle>
                <CardDescription>
                  Detail informasi produk {product.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'Tidak ada deskripsi'}
                  </p>
                  {product.short_description && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Deskripsi Singkat</h4>
                      <p className="text-gray-600">{product.short_description}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Informasi Dasar</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          <span className="font-medium">Nama:</span> {product.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          <span className="font-medium">Slug:</span> {product.slug}
                        </span>
                      </div>
                      {product.sku && (
                        <div className="flex items-center space-x-2">
                          <Barcode className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            <span className="font-medium">SKU:</span> {product.sku}
                          </span>
                        </div>
                      )}
                      {product.barcode && (
                        <div className="flex items-center space-x-2">
                          <Barcode className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            <span className="font-medium">Barcode:</span> {product.barcode}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          <span className="font-medium">Tipe:</span> {product.type === 'physical' ? 'Fisik' : 'Digital'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                          {product.status === 'published' ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Diterbitkan
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Draft
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
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
                        {product.is_for_sell && (
                          <Badge variant="secondary">
                            <Package className="h-3 w-3 mr-1" />
                            Dijual
                          </Badge>
                        )}
                        {product.is_rent && (
                          <Badge variant="secondary">
                            <Globe className="h-3 w-3 mr-1" />
                            Disewakan
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Harga</h4>
                    <div className="space-y-2">
                      <div className="text-lg font-semibold text-green-600">
                        {formatPrice(product.price)}
                      </div>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.compare_at_price)}
                        </div>
                      )}
                      {product.cost_per_item && (
                        <div className="text-sm text-gray-500">
                          Biaya per item: {formatPrice(product.cost_per_item)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Stok</h4>
                    <div className="space-y-2">
                      {product.track_quantity ? (
                        <div className="text-lg font-semibold">
                          {product.quantity || 0} item
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Tidak dilacak
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(product.brand || product.category) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Kategori & Merek</h4>
                      <div className="space-y-2">
                        {product.brand && (
                          <div className="text-sm">
                            <span className="font-medium">Merek:</span> {product.brand.name}
                          </div>
                        )}
                        {product.category && (
                          <div className="text-sm">
                            <span className="font-medium">Kategori:</span> {product.category.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gambar Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    {coverImage ? (
                      <img
                        src={`/storage/${coverImage.image_path}`}
                        alt={product.name}
                        className="h-48 w-full object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="h-48 w-full bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Package className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    {product.images.length > 1 && (
                      <p className="text-xs text-gray-500">
                        {product.images.length} gambar total
                      </p>
                    )}
                  </div>

                  {product.images.length > 1 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Semua Gambar</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {product.images.map((image, index) => (
                          <div key={image.id} className="relative">
                            <img
                              src={`/storage/${image.image_path}`}
                              alt={`Image ${index + 1}`}
                              className="h-16 w-16 object-cover rounded border-2 border-gray-200"
                            />
                            {image.is_cover && (
                              <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                                Cover
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Meta Title</p>
                  <p className="text-sm font-medium">
                    {product.meta_title || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Meta Description</p>
                  <p className="text-sm font-medium">
                    {product.meta_description || '-'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Waktu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Dibuat</p>
                    <p className="text-sm font-medium">{formatDate(product.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Diperbarui</p>
                    <p className="text-sm font-medium">{formatDate(product.updated_at)}</p>
                  </div>
                </div>
                {product.published_at && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Diterbitkan</p>
                      <p className="text-sm font-medium">{formatDate(product.published_at)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/cpanel/cms/product/edit/${product.id}`}>
                  <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Ubah Produk
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
