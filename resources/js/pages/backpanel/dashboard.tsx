import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Package,
  ShoppingCart,
  Users,
  XCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

// Dummy data
const stats = [
  { name: 'Total Produk', value: '1,234', icon: Package, change: '+12%', changeType: 'increase' },
  { name: 'Total Artikel', value: '89', icon: FileText, change: '+5%', changeType: 'increase' },
  { name: 'Total Customer', value: '5,678', icon: Users, change: '+8.2%', changeType: 'increase' },
  {
    name: 'Total Order',
    value: '3,456',
    icon: ShoppingCart,
    change: '-2.1%',
    changeType: 'decrease',
  },
];

const orderStats = [
  { name: 'Menunggu', value: '124', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Diproses', value: '45', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  { name: 'Selesai', value: '2,890', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  { name: 'Dibatalkan', value: '397', icon: XCircle, color: 'bg-red-100 text-red-800' },
];

const topSearchedProducts = [
  { id: 1, name: 'Container 20 Feet', searches: 1245, change: '+12%' },
  { id: 2, name: 'Container 40 Feet', searches: 987, change: '+5%' },
  { id: 3, name: 'Container Reefer', searches: 756, change: '+8%' },
  { id: 4, name: 'Container Open Top', searches: 543, change: '-2%' },
  { id: 5, name: 'Container Flat Rack', searches: 432, change: '+3%' },
];

const latestProducts = [
  {
    id: 101,
    name: 'Container 20 Feet High Cube',
    sku: 'CONT-20HC-001',
    added: '2 jam lalu',
    status: 'active',
  },
  {
    id: 102,
    name: 'Container 40 Feet High Cube',
    sku: 'CONT-40HC-001',
    added: '5 jam lalu',
    status: 'active',
  },
  { id: 103, name: 'Container 10 Feet', sku: 'CONT-10-001', added: '1 hari lalu', status: 'draft' },
  {
    id: 104,
    name: 'Container 40 Feet Open Top',
    sku: 'CONT-40OT-001',
    added: '1 hari lalu',
    status: 'active',
  },
  {
    id: 105,
    name: 'Container 20 Feet Reefer',
    sku: 'CONT-20RF-001',
    added: '2 hari lalu',
    status: 'active',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'PT. Maju Jaya',
    product: 'Container 40 Feet',
    date: '21 Des 2023',
    status: 'completed',
    amount: 'Rp 125.000.000',
  },
  {
    id: 'ORD-002',
    customer: 'CV. Sejahtera Abadi',
    product: 'Container 20 Feet',
    date: '21 Des 2023',
    status: 'processing',
    amount: 'Rp 85.000.000',
  },
  {
    id: 'ORD-003',
    customer: 'PT. Makmur Sentosa',
    product: 'Container Reefer',
    date: '20 Des 2023',
    status: 'pending',
    amount: 'Rp 210.000.000',
  },
  {
    id: 'ORD-004',
    customer: 'UD. Barokah Jaya',
    product: 'Container Open Top',
    date: '20 Des 2023',
    status: 'processing',
    amount: 'Rp 145.000.000',
  },
  {
    id: 'ORD-005',
    customer: 'PT. Anugrah Sejahtera',
    product: 'Container 40 Feet',
    date: '19 Des 2023',
    status: 'completed',
    amount: 'Rp 125.000.000',
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-4 flex-wrap p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="space-y-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {stat.change} dari bulan lalu
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <stat.icon className="text-primary h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Status Pemesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {orderStats.map((stat) => (
                <Card key={stat.name}>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{stat.name}</p>
                        <p className="text-xl font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Top Searched Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle>Produk Paling Banyak Dicari</CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-0">
              {topSearchedProducts.map((product) => (
                <div
                  key={product.id}
                  className="hover:bg-muted/50 flex items-center justify-between rounded p-3"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-xs">{product.searches} pencarian</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${product.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {product.change}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Latest Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle>Produk Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-0">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="hover:bg-muted/50 flex items-center justify-between rounded p-3"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span>{product.sku}</span>
                      <span>•</span>
                      <span>{product.added}</span>
                    </div>
                  </div>
                  <Badge
                    variant={product.status === 'active' ? 'default' : 'outline'}
                    className="shrink-0"
                  >
                    {product.status === 'active' ? 'Aktif' : 'Draft'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="pb-0!">
          <CardHeader className="mb-0! flex flex-row items-center justify-between border-b">
            <CardTitle>5 Pesanan Terbaru</CardTitle>
            <Link href="/backpanel/orders" className="text-primary text-sm hover:underline">
              Lihat Semua Pesanan
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6!">ID Pesanan</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="pr-6! text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="pl-6 font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'processing'
                              ? 'secondary'
                              : 'outline'
                        }
                        className="whitespace-nowrap"
                      >
                        {order.status === 'completed'
                          ? 'Selesai'
                          : order.status === 'processing'
                            ? 'Diproses'
                            : 'Menunggu'}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6! font-medium">{order.amount}</TableCell>
                    <TableCell className="pr-6!">
                      <Link
                        href="#"
                        className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        <Eye className="h-4 w-4" />
                        Detail
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
