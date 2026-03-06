import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Hash,
  DollarSign,
  FileText
} from 'lucide-react';

interface Order {
  id: number;
  order_number: string;
  company_name: string;
  pic_name: string;
  phone: string;
  email?: string;
  address: string;
  province: string;
  regency: string;
  district: string;
  village: string;
  postal_code: string;
  notes?: string;
  product_id: number;
  product_name: string;
  product_category: string;
  product_image: string;
  product_price: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  status_label: string;
  status_color: string;
}

interface Props {
  order: Order;
}

export default function OrderShow({ order }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CRM',
      href: '/cpanel/crm',
    },
    {
      title: 'Daftar Pesanan',
      href: '/cpanel/crm/orders',
    },
    {
      title: 'Detail',
      href: `/cpanel/crm/orders/${order.id}`,
    },
  ];

  const { data, setData, put, processing } = useForm({
    status: order.status as 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled',
    admin_notes: order.admin_notes || '',
  });

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/cpanel/crm/orders/${order.id}/status`, {
      preserveScroll: true,
    });
  };

  const getStatusBadge = (status: string, color: string) => {
    const colorClasses = {
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800',
      primary: 'bg-purple-100 text-purple-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      danger: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={colorClasses[color as keyof typeof colorClasses] || colorClasses.secondary}>
        {status}
      </Badge>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Detail Pesanan ${order.order_number}`} />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/cpanel/crm/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <HeaderTitle 
              title={`Detail Pesanan ${order.order_number}`} 
              description="Informasi lengkap pesanan pelanggan"
            />
          </div>
          <div className="flex gap-2">
            <Link href={`/cpanel/crm/orders/${order.id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
                  router.delete(`/cpanel/crm/orders/${order.id}`);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Pelanggan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Perusahaan/Instansi</div>
                    <div className="font-medium">{order.company_name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Nama PIC</div>
                    <div className="font-medium">{order.pic_name}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Telepon/WhatsApp</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {order.phone}
                    </div>
                  </div>
                  {order.email && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Email</div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {order.email}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Alamat Lengkap</div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div>
                      <div>{order.address}</div>
                      <div className="text-sm text-gray-600">
                        {order.village}, {order.district}, {order.regency}, {order.province} {order.postal_code}
                      </div>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Catatan Pelanggan</div>
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      {order.notes}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Informasi Produk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={order.product_image} 
                      alt={order.product_name}
                      className="h-24 w-24 object-cover rounded-md border"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-medium text-lg">{order.product_name}</div>
                      <div className="text-sm text-gray-500">{order.product_category}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Harga Satuan</div>
                        <div className="font-medium">
                          {/* Rp {order.product_price.toLocaleString('id-ID')} */}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Jumlah</div>
                        <div className="font-medium">{order.quantity}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Total Harga</div>
                        <div className="font-bold text-lg">
                          {/* Rp {order.total_price.toLocaleString('id-ID')} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Update Status Pesanan
                </CardTitle>
                <CardDescription>
                  Perbarui status dan catatan admin untuk pesanan ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status Pesanan
                      </label>
                      <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value as 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="pending">Menunggu Konfirmasi</option>
                        <option value="confirmed">Dikonfirmasi</option>
                        <option value="processing">Diproses</option>
                        <option value="shipped">Dikirim</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catatan Admin
                      </label>
                      <textarea
                        value={data.admin_notes}
                        onChange={(e) => setData('admin_notes', e.target.value)}
                        placeholder="Catatan untuk internal"
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Update Status'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Nomor Pesanan</div>
                  <div className="font-mono font-bold">{order.order_number}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1">
                    {getStatusBadge(order.status_label, order.status_color)}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium text-gray-500">Tanggal Pesanan</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {/* {new Date(order.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} */}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">Terakhir Diupdate</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {/* {new Date(order.updated_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} */}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium text-gray-500">Total Harga</div>
                  <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                    <DollarSign className="h-5 w-5" />
                    {/* Rp {order.total_price.toLocaleString('id-ID')} */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            {order.admin_notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Catatan Admin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-3 rounded-md text-sm">
                    {order.admin_notes}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
