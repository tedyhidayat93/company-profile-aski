import HeaderTitle from '@/components/header-title';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Chart } from '@/components/ui/chart';
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
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useState } from 'react';

// Type definitions
interface TrafficData {
  time?: string;
  date?: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
}

interface WebsiteTrafficData {
  today: TrafficData[];
  thisMonth: TrafficData[];
  last3Months: TrafficData[];
  thisYear: TrafficData[];
}

type DateFilter = 'today' | 'thisMonth' | 'last3Months' | 'thisYear';

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
  { name: 'Total Pelanggan', value: '5,678', icon: Users, change: '+8.2%', changeType: 'increase' },
  {
    name: 'Total Pesanan',
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

// Website traffic data for different time periods
const websiteTrafficData: WebsiteTrafficData = {
  today: [
    { time: '00:00', visitors: 45, pageViews: 120, bounceRate: 52 },
    { time: '04:00', visitors: 23, pageViews: 58, bounceRate: 61 },
    { time: '08:00', visitors: 156, pageViews: 420, bounceRate: 38 },
    { time: '12:00', visitors: 234, pageViews: 580, bounceRate: 32 },
    { time: '16:00', visitors: 189, pageViews: 490, bounceRate: 35 },
    { time: '20:00', visitors: 98, pageViews: 245, bounceRate: 42 },
  ],
  thisMonth: [
    { date: '1 Jan', visitors: 1200, pageViews: 3200, bounceRate: 45 },
    { date: '5 Jan', visitors: 1450, pageViews: 3800, bounceRate: 42 },
    { date: '10 Jan', visitors: 1650, pageViews: 4200, bounceRate: 40 },
    { date: '15 Jan', visitors: 1890, pageViews: 4800, bounceRate: 38 },
    { date: '20 Jan', visitors: 2100, pageViews: 5200, bounceRate: 35 },
    { date: '25 Jan', visitors: 1950, pageViews: 4900, bounceRate: 37 },
    { date: '30 Jan', visitors: 2200, pageViews: 5500, bounceRate: 33 },
  ],
  last3Months: [
    { date: 'Nov', visitors: 28000, pageViews: 72000, bounceRate: 38 },
    { date: 'Des', visitors: 32000, pageViews: 85000, bounceRate: 35 },
    { date: 'Jan', visitors: 35000, pageViews: 92000, bounceRate: 32 },
  ],
  thisYear: [
    { date: 'Jan', visitors: 35000, pageViews: 92000, bounceRate: 32 },
    { date: 'Feb', visitors: 33000, pageViews: 88000, bounceRate: 34 },
    { date: 'Mar', visitors: 38000, pageViews: 98000, bounceRate: 30 },
    { date: 'Apr', visitors: 42000, pageViews: 110000, bounceRate: 28 },
    { date: 'Mei', visitors: 45000, pageViews: 118000, bounceRate: 26 },
    { date: 'Jun', visitors: 48000, pageViews: 125000, bounceRate: 25 },
    { date: 'Jul', visitors: 46000, pageViews: 120000, bounceRate: 27 },
    { date: 'Agu', visitors: 44000, pageViews: 115000, bounceRate: 29 },
    { date: 'Sep', visitors: 41000, pageViews: 108000, bounceRate: 31 },
    { date: 'Okt', visitors: 39000, pageViews: 102000, bounceRate: 33 },
    { date: 'Nov', visitors: 37000, pageViews: 97000, bounceRate: 36 },
    { date: 'Des', visitors: 40000, pageViews: 105000, bounceRate: 34 },
  ],
};

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('thisMonth');

  const getCurrentData = (): TrafficData[] => {
    return websiteTrafficData[dateFilter] || websiteTrafficData.thisMonth;
  };

  const getDataKey = (): string => {
    switch (dateFilter) {
      case 'today':
        return 'time';
      case 'thisMonth':
      case 'last3Months':
      case 'thisYear':
        return 'date';
      default:
        return 'date';
    }
  };

  const currentData = getCurrentData();
  const dataKey = getDataKey();

  const calculateStats = () => {
    const totalVisitors = currentData.reduce((sum: number, item: TrafficData) => sum + item.visitors, 0);
    const totalPages = currentData.reduce((sum: number, item: TrafficData) => sum + item.pageViews, 0);
    const avgBounceRate = (currentData.reduce((sum: number, item: TrafficData) => sum + item.bounceRate, 0) / currentData.length).toFixed(1);
    
    return { totalVisitors, totalPages, avgBounceRate };
  };

  const { totalVisitors, totalPages, avgBounceRate } = calculateStats();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Dashboard"
          description='Realtime monitoring activity'
        />
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card className="shadow-card" key={stat.name}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {/* <p
                      className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {stat.change} dari bulan lalu
                    </p> */}
                  </div>
                  <div className="bg-primary/10 rounded-lg p-2">
                    <stat.icon className="text-primary h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Website Traffic Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Trafik Kunjungan Website</CardTitle>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="thisMonth">Bulan Ini</SelectItem>
                  <SelectItem value="last3Months">3 Bulan Terakhir</SelectItem>
                  <SelectItem value="thisYear">Tahun Ini</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Pengunjung</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Halaman Dilihat</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">Bounce Rate (%)</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBounceRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey={dataKey} 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                    strokeWidth={2}
                    name="Pengunjung"
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorPageViews)"
                    strokeWidth={2}
                    name="Halaman Dilihat"
                  />
                  <Area
                    type="monotone"
                    dataKey="bounceRate"
                    stroke="#f97316"
                    fillOpacity={1}
                    fill="url(#colorBounceRate)"
                    strokeWidth={2}
                    name="Bounce Rate (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Total Pengunjung</span>
                <span className="font-semibold text-blue-900">
                  {totalVisitors.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Total Halaman</span>
                <span className="font-semibold text-green-900">
                  {totalPages.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700">Avg Bounce Rate</span>
                <span className="font-semibold text-orange-900">
                  {avgBounceRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Top Searched Products */}
          <Card className="shadow-card">
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
          <Card className="shadow-card">
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

        {/* Order Status Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Informasi Pemesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
            {/* Recent Orders */}
            <Card className="shadow-card">
              <CardHeader className="mb-0! flex flex-row items-center justify-between border-b">
                <CardTitle>5 Pesanan Terbaru</CardTitle>
                <Link href="/cpanel/crm/orders" className="text-primary text-sm hover:underline">
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
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
