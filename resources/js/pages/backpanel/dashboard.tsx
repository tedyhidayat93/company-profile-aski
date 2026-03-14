import React from 'react';
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
  Plus,
  Edit,
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
import OrderStatusInfoModal from '@/components/order-status-info-modal';

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

interface Props {
  stats: Array<{
    name: string;
    value: number;
    icon: string;
    change: string;
    changeType: 'increase' | 'decrease';
  }>;
  orderStats: Array<{
    name: string;
    value: number;
    icon: string;
    color: string;
  }>;
  topSearchedProducts: Array<{
    id: number;
    name: string;
    searches: number;
    change: string;
  }>;
  latestProducts: Array<{
    id: number;
    name: string;
    sku: string;
    added: string;
    status: string;
    edit_url: string;
  }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    product: string;
    date: string;
    status: string;
    amount: string;
    view_url: string;
  }>;
  websiteTrafficData: WebsiteTrafficData;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

// Icon mapping
const iconMap: Record<string, any> = {
  Package,
  FileText,
  Users,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
};

// Status badge function
const getStatusBadge = (status: string) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-purple-100 text-purple-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels = {
    pending: 'Pesanan Baru',
    confirmed: 'Dikonfirmasi',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };

  return (
    <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </Badge>
  );
};

export default function Dashboard({
  stats,
  orderStats,
  topSearchedProducts,
  latestProducts,
  recentOrders,
  websiteTrafficData,
}: Props) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('thisMonth');

  const handleDateFilterChange = (value: string) => {
    // Type guard to ensure value is a valid DateFilter
    if (value === 'today' || value === 'thisMonth' || value === 'last3Months' || value === 'thisYear') {
      setDateFilter(value);
    }
  };

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
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Package;
            return (
              <Card className="shadow-card" key={stat.name}>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">{stat.name}</p>
                      <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                      {/* <p
                        className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change} dari bulan lalu
                      </p> */}
                    </div>
                    <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Website Traffic Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Trafik Kunjungan Website</CardTitle>
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
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
            <div className="flex gap-2 flex-wrap items-center justify-between">
              <CardTitle>Informasi Pemesanan</CardTitle>  
              <OrderStatusInfoModal />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {orderStats.map((stat) => {
                const Icon = iconMap[stat.icon] || Clock;
                return (
                  <Card key={stat.name} className='p-3 px-0'>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className={`rounded-full p-3 ${stat.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{stat.name}</p>
                          <p className="text-xl font-semibold">{stat.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell className="pr-6! font-medium">{order.amount}</TableCell>
                        <TableCell className="pr-6!">
                          <Link
                            href={order.view_url}
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
