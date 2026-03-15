import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination-custom';
import OrderStatusInfoModal from '@/components/order-status-info-modal';
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
  Eye,
  Package,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingCart
} from 'lucide-react';
import { orderStatusColors, orderStatusLabels, getOrderStatusBadgeProps, OrderStatusBadge } from '@/utils/order-status';
import { formatCurrencyDisplay } from '@/utils/currency';

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
  customer?: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

interface PaginatedOrders {
  data: Order[];
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
  orders: PaginatedOrders;
  filters: {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function OrderIndex({ orders, filters }: Props) {
  const { data, setData, get, processing } = useForm({
    search: filters.search || '',
    status: filters.status || '',
    date_from: filters.date_from || '',
    date_to: filters.date_to || '',
  });

  // Calculate order statistics
  const orderStats = [
    { 
      name: 'Total Semua Pesanan', 
      value: orders.total.toLocaleString(), 
      icon: ShoppingCart, 
      color: 'bg-blue-100 text-blue-800' 
    },
    { 
      name: orderStatusLabels.pending, 
      value: orders.data.filter(order => order.status === 'pending').length.toString(), 
      icon: Clock, 
      color: orderStatusColors.pending
    },
    { 
      name: orderStatusLabels.confirmed, 
      value: orders.data.filter(order => order.status === 'confirmed').length.toString(), 
      icon: CheckCircle, 
      color: orderStatusColors.confirmed
    },
    { 
      name: orderStatusLabels.processing, 
      value: orders.data.filter(order => order.status === 'processing').length.toString(), 
      icon: Clock, 
      color: orderStatusColors.processing
    },
    { 
      name: orderStatusLabels.shipped, 
      value: orders.data.filter(order => order.status === 'shipped').length.toString(), 
      icon: Package, 
      color: orderStatusColors.shipped
    },
    { 
      name: orderStatusLabels.completed, 
      value: orders.data.filter(order => order.status === 'completed').length.toString(), 
      icon: CheckCircle, 
      color: orderStatusColors.completed
    },
    { 
      name: orderStatusLabels.cancelled, 
      value: orders.data.filter(order => order.status === 'cancelled').length.toString(), 
      icon: XCircle, 
      color: orderStatusColors.cancelled
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    get('/cpanel/crm/orders', { preserveState: true });
  };

  const handleReset = () => {
    setData('search', '');
    setData('status', '');
    setData('date_from', '');
    setData('date_to', '');
    get('/cpanel/crm/orders', { preserveState: true });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CRM',
      href: '/cpanel/crm',
    },
    {
      title: 'Daftar Pesanan',
      href: '/cpanel/crm/orders',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Pesanan" />

      <div className="space-y-6 p-6">
        <HeaderTitle 
          title="Daftar Pesanan" 
          description="Kelola semua pesanan produk dari pelanggan"
        >
          <div className="flex items-center gap-2">
            <OrderStatusInfoModal />
            <Link href="/cpanel/crm/orders/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pesanan
              </Button>
            </Link>
          </div>
        </HeaderTitle>

        {/* Filters */}
        <Card className='gap-3 py-5 shadow-card'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-2">
                <div>
                  <Input
                    placeholder="Cari nomor pesanan, perusahaan, PIC..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="col-span-2">
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="pending">Pesanan Baru</SelectItem>
                      <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                      <SelectItem value="processing">Diproses</SelectItem>
                      <SelectItem value="shipped">Dikirim</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                      <SelectItem value="cancelled">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Dari tanggal (DD/MM/YYYY)"
                    value={data.date_from}
                    onChange={(e) => setData('date_from', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Sampai tanggal (DD/MM/YYYY)"
                    value={data.date_to}
                    onChange={(e) => setData('date_to', e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={processing}>
                    <Search className="h-4 w-4 mr-2" />
                    Cari
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="shadow-card">
          <CardContent className="space-y-4">
             {/* Order Stats Overview */}
              <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
                {orderStats.map((stat) => (
                  <Card className="rounded-sm py-3 px-0 shadow-none" key={stat.name}>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground text-xs font-medium">{stat.name}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`rounded-lg p-2 ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Pesanan</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-mono text-sm">{order.order_number}</div>
                        <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{order.company_name}</div>
                        <div className="text-sm text-gray-500">{order.pic_name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="h-3 w-3" />
                          {order.phone}
                        </div>
                        {order.email && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Mail className="h-3 w-3" />
                            {order.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{order.product_name}</div>
                        {/* <div className="text-sm text-gray-500">{order.product_category}</div> */}
                        <div className="text-xs text-gray-500">Qty: {order.quantity} x {formatCurrencyDisplay(order.product_price)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrencyDisplay(order.total_price)}
                      </div>
                    </TableCell>
                    <TableCell className='capitalize'>
                      <OrderStatusBadge status={order.status} />
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
                            <Link href={`/cpanel/crm/orders/${order.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Detail
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/crm/orders/edit/${order.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
                                router.delete(`/cpanel/crm/orders/${order.id}`);
                              }
                            }}
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

            {orders.data.length === 0 && (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada pesanan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Belum ada pesanan masuk.
                </p>
              </div>
            )}

            {orders.last_page > 1 && (
              <Pagination
                currentPage={orders.current_page}
                totalPages={orders.last_page}
                total={orders.total}
                perPage={orders.per_page}
                onPageChange={(page) => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('page', page.toString());
                  router.get(url.toString());
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
