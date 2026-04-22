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
import { OrderStatusBadge } from '@/utils/order-status';
import { Button } from '@/components/ui/button';
import TrafficDashboard from '@/components/traffic-dashboard';
import TrafficPerCountryRegion, { CountryData, RegionData } from '@/components/traffic-per-country-region';

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
    color: string;
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
    image_path: string | null;
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
    order_number: string;
    customer: string;
    product: string;
    date: string;
    status: string;
    amount: string;
    view_url: string;
  }>;
  websiteTrafficData: WebsiteTrafficData;
  countryStats: CountryData[];
  regionStats: RegionData[];
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

export default function Dashboard({
  stats,
  orderStats,
  topSearchedProducts,
  latestProducts,
  recentOrders,
  websiteTrafficData,
  countryStats,
  regionStats,
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

      <div className="space-y-8 p-6 bg-slate-50/50 min-h-screen">
        {/* Header Section dengan Aksi Cepat */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <HeaderTitle
            title="Dashboard"
            description="Pantau performa aktivitas bisnis Anda hari ini."
          />
          <div className="flex items-center gap-2">
            {/* Tambahkan button aksi global jika perlu, misal: Export Report */}
          </div>
        </div>

        {/* Top Stats Overview - Lebih Bersih */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Package;
            const colorClass = stat.color.replace('bg-', ''); // mengambil nama warna (misal: 'blue-500')

            return (
              <Card 
                key={stat.name} 
                className={`border-t-4 border-b-0 border-l-0 border-r-0 border-${colorClass} group relative overflow-hidden bg-white/50 backdrop-blur-sm transition-all duration-500 hover:bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/60`}
              >
                {/* Glow Effect Background - Sangat Halus */}
                <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-${colorClass} opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08] blur-2xl`} />
                
                <CardContent className="">
                  <div className="flex flex-col gap-4">
                    {/* Header: Icon & Label */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg bg-${colorClass}/10 transition-colors duration-300 group-hover:bg-${colorClass} group-hover:text-white`}>
                        <Icon className={`h-5 w-5 text-${colorClass} transition-colors duration-300 group-hover:text-white`} />
                      </div>
                      {/* Dot Indicator */}
                      <div className={`h-1.5 w-1.5 rounded-full bg-${colorClass} animate-pulse`} />
                    </div>

                    {/* Content: Value & Name */}
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
                        {stat.name}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <h3 className="text-4xl font-bold tracking-tight text-slate-800 transition-all duration-300 group-hover:scale-[1.02] origin-left">
                          {stat.value.toLocaleString()}
                        </h3>
                      </div>
                    </div>

                    {/* Footer: Simple Progress Bar atau Tren Kecil */}
                    <div className="pt-2">
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${colorClass} opacity-60 transition-all duration-1000 group-hover:opacity-100`} 
                          style={{ width: '65%' }} // Ini bisa dinamis berdasarkan target
                        />
                      </div>
                      <p className="text-[10px] mt-1.5 text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Data diperbarui berkala
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Table Section (Lebih Lebar) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-slate-200 min-h-[370px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold">Pesanan Terbaru</CardTitle>
                  <p className="text-sm text-muted-foreground">5 transaksi terakhir bulan ini</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/cpanel/crm/orders">Lihat Semua</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="py-3 pl-6">ID Pesanan</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <TableRow key={order.id} className="group transition-colors">
                          <TableCell className="pl-6 font-medium text-blue-600">#{order.order_number}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">{order.customer}</span>
                              <span className="text-xs text-muted-foreground">{order.product}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right pr-6 font-bold">
                            {order.amount}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-52 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Belum ada pesanan</p>
                              <p className="text-xs">Pesanan akan muncul di sini</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content: Top Searched & Latest */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle className="text-base font-bold">Produk Paling Banyak Dicari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 min-h-67">
                {topSearchedProducts.length > 0 ? (
                  topSearchedProducts.map((product) => (
                    <div onClick={() => window.location.href = `/cpanel/cms/product/${product.id}`} key={product.id} className="flex items-center justify-between group pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center overflow-hidden">
                          {product.image_path ? (
                            <img 
                              src={product.image_path} 
                              alt={product.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          ) : (
                            <span className="font-bold text-slate-400 text-xs">IMG</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold group-hover:text-primary transition-colors cursor-pointer">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{product.searches} Dilihat</p>
                        </div>
                      </div>
                      {/* <div className={`text-xs font-bold ${product.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {product.change}
                      </div> */}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col min-h-52 items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Belum ada data pencarian</p>
                    <p className="text-xs text-slate-400 mt-1">Produk yang dicari akan muncul di sini</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>

        {/* traffic Dashboard */}
        <TrafficDashboard websiteTrafficData={websiteTrafficData} />

        {/* Traffic per country & region */}
        <TrafficPerCountryRegion 
          countryStats={countryStats}
          regionStats={regionStats}
        />

      </div>
    </AppLayout>
  );
}
