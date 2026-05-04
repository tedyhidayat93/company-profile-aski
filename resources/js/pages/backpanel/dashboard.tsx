import HeaderTitle from '@/components/header-title';
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
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  ShoppingBag,
  Calendar1,
} from 'lucide-react';
import { OrderStatusBadge } from '@/utils/order-status';
import { Button } from '@/components/ui/button';
import TrafficDashboard from '@/components/traffic-dashboard';
import TrafficPerCountryRegion, { CountryData, RegionData } from '@/components/traffic-per-country-region';
import { formatCurrencyDisplay } from '@/utils/currency';
import { formatDate } from '@/lib/utils';
import TrafficVisitorCharts from '@/components/traffic-visitor-charts';

// Type definitions
interface TrafficData {
  time?: string;
  date?: string;
  visitors: number;
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
  recentOrders: any[];
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

  // Count new orders (pending status)
  const newOrdersCount = recentOrders.filter(order => order.status === 'pending').length;

  return (
    <AppLayout breadcrumbs={breadcrumbs} recentOrders={recentOrders}>
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
            return (
              <Card 
                key={stat.name} 
                className={`group relative overflow-hidden bg-white border-none shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Aksentuasi Warna: Garis Vertikal di Sisi Kiri saat Hover */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${stat.color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                
                <CardContent className="px-6">
                  <div className="relative z-10 flex flex-col">
                    
                    {/* Top Row: Icon & Badge Tren */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${stat.color.replace('bg-', 'bg-')}/10 text-white transition-transform duration-500 group-hover:rotate-[10deg]`}>
                        <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                      </div>
                      {/* Badge Persentase (Opsional/Statis) - Menambah kesan profesional */}
                      <span className={`text-[10px] px-2 h-5 animate-pulse flex items-center justify-center font-bold rounded-full bg-red-50 text-red-600 ring-1 ring-red-100 ${stat.name === 'Total Seluruh Pesanan' ? '' : 'hidden'}`}>
                        {stat.name === 'Total Seluruh Pesanan' && (
                          <span> {newOrdersCount} Pesanan Baru</span>
                        )}
                      </span>
                    </div>

                    {/* Main Content: Value & Label */}
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {stat.name}
                      </p>
                      <div className="flex items-baseline">
                        <h3 className="text-5xl font-black tracking-tighter text-slate-900 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600">
                          {stat.value.toLocaleString()}
                        </h3>
                      </div>
                    </div>

                    {/* Footer: Visual Subtil */}
                    <div className="mt-6 flex items-center gap-2">
                      <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} w-2/3 opacity-30 group-hover:opacity-100 transition-all duration-700`} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        Live Stats
                      </span>
                    </div>
                  </div>

                  {/* Background Decorative Number - Membuat tampilan sangat modern */}
                  <div className="absolute -bottom-2 -right-2 text-8xl font-black text-slate-50 select-none pointer-events-none group-hover:text-slate-100/50 transition-colors duration-300">
                    {stat.value.toString().slice(-1)}
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
                  <CardTitle className="text-lg font-bold">Daftar Pesanan</CardTitle>
                  <p className="text-sm text-muted-foreground">Pesanan terbaru yang menunggu diproses</p>
                </div>
                <div className="relative">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/cpanel/crm/orders">Lihat Semua</Link>
                </Button>
                {newOrdersCount > 0 && (
                  <Badge className="absolute animate-pulse -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600">
                    {newOrdersCount}
                  </Badge>
                )}
              </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="py-4 pl-6 text-xs uppercase tracking-wider font-semibold">ID Pesanan</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-semibold">Pelanggan</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-semibold">Detail Produk</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                      <TableHead className="text-right pr-6 text-xs uppercase tracking-wider font-semibold">Total Nilai</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <TableRow 
                          key={order.id} 
                          onClick={() => window.location.href = `/cpanel/crm/orders/${order.id}`} 
                          className="group hover:bg-slate-50/80 transition-all cursor-pointer border-b"
                        >
                          {/* ID Pesanan */}
                          <TableCell className="pl-6 space-y-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700">
                              #{order.order_number}
                            </span>
                            <span className="text-xs pl-1 text-slate-400 flex items-center gap-1">
                              <Calendar1 className="h-3 w-3 ml-1" /> {formatDate(order.created_at)}
                            </span>
                          </TableCell>

                          {/* Pelanggan */}
                          <TableCell>
                            <div className="flex items-start gap-3">
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 leading-none mb-1">{order.company_name}</span>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <User className="h-3 w-3" /> {order.pic_name}
                                  </span>
                                  <span className="text-[11px] text-slate-400 italic font-light">{order.phone}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          {/* Produk & Catatan */}
                          <TableCell className="max-w-[250px]">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-800">{order.product_name}</span>
                              <span className="text-xs text-slate-500">
                                {order.quantity} Unit &times; {formatCurrencyDisplay(order.product_price)}
                              </span>
                              
                              {order.notes && (
                                <div className="mt-2 p-1 bg-amber-50/50 border-l-2 border-amber-200 rounded text-[11px] text-amber-800 leading-relaxed italic">
                                  &ldquo;{order.notes}&rdquo;
                                </div>
                              )}
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>

                          {/* Total Harga */}
                          <TableCell className="text-right pr-6">
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-slate-900 text-base">
                                {formatCurrencyDisplay(order.total_price)}
                              </span>
                              {/* <span className="text-[10px] text-slate-400 uppercase font-medium">Pembayaran Selesai</span> */}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center space-y-3 opacity-60">
                            <div className="p-4 rounded-full bg-slate-50">
                              <ShoppingBag className="h-8 w-8 text-slate-300" />
                            </div>
                            <div>
                              <p className="text-base font-semibold text-slate-900">Belum Ada Pesanan</p>
                              <p className="text-sm text-slate-500">Daftar transaksi pelanggan akan tampil di sini.</p>
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

        {/* traffic Visitors */}
        <TrafficVisitorCharts
          websiteTrafficData={websiteTrafficData}
          countryStats={countryStats}
          regionStats={regionStats}
        />
      </div>
    </AppLayout>
  );
}
