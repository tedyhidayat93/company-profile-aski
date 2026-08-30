import HeaderTitle from '@/components/header-title';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Head, Link, usePage } from '@inertiajs/react';
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
  MessageSquare,
  TrendingDown,
  StarIcon,
  Calendar,
  User,
  ShoppingBag,
  Calendar1,
  ArrowRight,
  BookOpen,
  Globe,
  MapPin,
  Search,
} from 'lucide-react';
import { OrderStatusBadge } from '@/utils/order-status';
import { Button } from '@/components/ui/button';
import  { CountryData, RegionData } from '@/components/traffic-per-country-region';
import { formatCurrencyDisplay } from '@/utils/currency';
import { formatDate } from '@/lib/utils';
import TrafficVisitorCharts from '@/components/traffic-visitor-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

interface ArticleData {
  id: number;
  title: string;
  views?: number;
  published_time?: string;
  image: string | null;
  slug: string;
}

interface WhatsappLeadItem {
  id: number;
  ip_address: string;
  name: string;
  phone: string;
  country: string | null;
  region: string | null;
  action: string;
  action_label: string;
  page_url: string;
  page: string;
  message: string;
  time: string;
}

interface WhatsappLeadsData {
  total: number;
  latest: WhatsappLeadItem[];
}

interface Props {
  stats: Array<{
    name: string;
    value: number;
    icon: string;
    change: string;
    color: string;
    link?: string;
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
  topPopularArticles: ArticleData[];
  latestArticles: ArticleData[];
  whatsappLeads: WhatsappLeadsData;
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
  StarIcon,
  Calendar,
  MessageSquare,
  TrendingUp,
  TrendingDown,
};

export default function Dashboard({
  stats,
  orderStats,
  topSearchedProducts,
  latestProducts,
  websiteTrafficData,
  countryStats,
  regionStats,
  topPopularArticles = [],
  latestArticles = [],
  whatsappLeads = { total: 0, latest: [] },
}: Props) {

    const [recentOrdersStats, setRecentOrders] = useState<any[]>([]);
  
    useEffect(() => {
  
      const fetchRecentOrders = async () => {
  
        try {
  
          const response = await axios.get(
            '/cpanel/dashboard/recent-orders'
          );
  
          setRecentOrders(
            response.data.recentOrders || []
          );
  
        } catch (error) {
  
          console.error(
            'Failed fetch recent orders',
            error
          );
        }
      };
  
      fetchRecentOrders();
  
      const interval = setInterval(
        fetchRecentOrders,
        10000
      );
  
      return () => clearInterval(interval);
  
    }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="space-y-4 p-6 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <HeaderTitle
            title="Dashboard"
            description="Pantau performa aktivitas situs web hari ini."
          />
          <div className="flex items-center gap-2"></div>
        </div>

        {/* Top Stats Overview */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Package;

            return (
              <Link href={stat.link} key={stat.name}>
                <Card
                  className="
                    group relative h-full overflow-hidden
                    border border-slate-200/80
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  {/* Accent Line */}
                  <div
                    className={`
                      absolute left-0 top-0 bottom-0 w-1
                      ${stat.color}
                      opacity-80
                    `}
                  />

                  {/* Bubble Accent Layers */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Big Bubble */}
                    <div
                      className={`
                        absolute -right-10 -top-10
                        h-42 w-42 rounded-full
                        ${stat.color}
                        opacity-[0.08]
                        blur-xl
                        transition-all duration-700 ease-out
                        group-hover:scale-150
                        group-hover:-translate-y-2
                        group-hover:translate-x-2
                      `}
                    />

                    {/* Icon Bubble */}
                    <div
                      className={`
                        flex items-center justify-center
                        absolute top-4 right-4
                        rounded-2xl
                        h-8 w-8
                        ${stat.color} bg-opacity-10
                        transition-all duration-500 ease-out
                        group-hover:rotate-[12deg]
                        group-hover:scale-125
                      `}
                    >
                      <Icon
                        className={`
                          h-4 w-4
                          ${stat.color.replace('bg-', 'text-')}
                        `}
                      />
                    </div>

                    {/* Medium Bubble */}
                    <div
                      className={`
                        absolute right-6 bottom-4
                        h-20 w-20 rounded-full
                        ${stat.color}
                        opacity-[0.06]
                        blur-xl
                        transition-all duration-700 ease-out
                        group-hover:scale-150
                        group-hover:translate-y-3
                        group-hover:-translate-x-2
                      `}
                    />

                    {/* Small Bubble */}
                    <div
                      className={`
                        absolute top-1 right-1
                        h-24 w-24 rounded-full
                        ${stat.color}
                        opacity-[0.1]
                        blur-md
                        transition-all duration-700 ease-out
                        group-hover:scale-125
                        group-hover:translate-x-1
                      `}
                    />

                    {/* Tiny Bubble */}
                    <div
                      className={`
                        absolute -top-5 -right-8
                        h-24 w-24 rounded-full
                        ${stat.color}
                        opacity-[0.09]
                        transition-all duration-700 ease-out
                        group-hover:scale-140
                        group-hover:-translate-y-2
                      `}
                    />

                    {/* Extra Bubble */}
                    <div
                      className={`
                        absolute top-4 -right-8
                        h-32 w-32 rounded-full
                        ${stat.color}
                        opacity-[0.07]
                        transition-all duration-700 ease-out
                        group-hover:scale-125
                        group-hover:translate-x-2
                      `}
                    />
                  </div>

                  <CardContent className="relative z-10">
                    <div className="space-y-1">
                      <p
                        className="
                          line-clamp-2 min-h-[34px]
                          text-[10px] font-bold uppercase
                          tracking-[0.2em]
                          text-slate-500
                        "
                      >
                        {stat.name}
                      </p>

                      <h3
                        className="
                          text-2xl font-black
                          text-slate-900
                          sm:text-3xl
                          xl:text-4xl
                          transition-all duration-300
                          group-hover:tracking-tighter
                        "
                      >
                        {stat.value.toLocaleString()}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-4">
          <div className="lg:col-span-3">
            <TrafficVisitorCharts
              websiteTrafficData={websiteTrafficData}
              countryStats={countryStats}
              regionStats={regionStats}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          
          {/* KIRI: Tabs Pesanan Terbaru & Leads WhatsApp (Colspan 3) */}
          <div className="xl:col-span-4">
            <Tabs defaultValue="leads" className="w-full">
              <Card className="border-none gap-0 shadow-sm ring-1 ring-slate-200 min-h-[480px] p-0 overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 py-3.5 px-6 bg-slate-900/90 text-white">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <TabsList className="bg-slate-800 border border-slate-700/60 p-1">
                      <TabsTrigger 
                        value="leads" 
                        className="relative text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white hover:text-white cursor-pointer text-slate-300"
                      >
                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                        Leads WhatsApp
                        {whatsappLeads.total > 0 && (
                          <Badge className="ml-1.5 h-4 px-1.5 text-[10px] bg-amber-500 hover:bg-amber-600 text-white hover:text-white cursor-pointer border-none">
                            {whatsappLeads.total > 99 ? '99+' : whatsappLeads.total}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="orders" 
                        className="relative text-xs data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:text-white cursor-pointer text-slate-300"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                        Pesanan Terbaru
                        {recentOrdersStats.length > 0 && (
                          <Badge className="ml-1.5 h-4 px-1.5 text-[10px] bg-red-500 hover:bg-red-600 text-white border-none">
                            {recentOrdersStats.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Tombol Akses Halaman Detail Sesuai Tab */}
                  <div>
                    <TabsContent value="leads" className="mt-0 right">
                      <Button variant="outline" size="sm" className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white text-xs" asChild>
                        <Link href="/cpanel/crm/leads">Lihat Semua Leads <ArrowRight className="h-3.5 w-3.5 ml-1 inline-block" /></Link>
                      </Button>
                    </TabsContent>
                    <TabsContent value="orders" className="mt-0 right">
                      <Button variant="outline" size="sm" className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white text-xs" asChild>
                        <Link href="/cpanel/crm/orders">Lihat Semua Pesanan <ArrowRight className="h-3.5 w-3.5 ml-1 inline-block" /></Link>
                      </Button>
                    </TabsContent>
                  </div>
                </CardHeader>

                <CardContent className="p-3">
                  {/* TAB CONTENT 1: LEADS WHATSAPP */}
                  <TabsContent value="leads" className="m-0 border-none">
                    <div className="w-full overflow-x-auto">
                      <Table className="w-full min-w-[650px]">
                        <TableHeader className="bg-slate-900">
                          <TableRow>
                            <TableHead className="py-3 pl-6 text-xs uppercase tracking-wider font-semibold">Waktu</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Pengunjung & Kontak</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Pesan</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Lokasi / IP</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {whatsappLeads.latest.length > 0 ? (
                            whatsappLeads.latest.map((lead: any, index: number) => (
                              <TableRow key={index} className="group hover:bg-slate-50/80 transition-all border-b align-top text-xs">
                                <TableCell className="pl-6 py-3 whitespace-nowrap">
                                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-slate-400" /> {lead.time}
                                  </span>
                                </TableCell>

                                <TableCell className="py-3">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-slate-900">{lead.name}</span>
                                    <span className="text-slate-500 font-mono text-[11px]">{lead.phone}</span>
                                  </div>
                                  <span className="inline-flex items-center w-fit rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                    {lead.action_label}
                                  </span>
                                </TableCell>

                                <TableCell className="py-3 max-w-[200px]">
                                  <div className="flex flex-col gap-1">
                                    {lead.message && lead.message !== '-' && (
                                      <p className="text-slate-600 bg-slate-100/80 p-1 rounded border border-slate-200/50 text-wrap italic text-[11px] leading-relaxed" title={lead.message}>
                                        "{lead.message}"
                                      </p>
                                    )}
                                  </div>
                                </TableCell>

                                <TableCell className="py-3 whitespace-nowrap">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-slate-700 flex items-center gap-1 font-medium">
                                      <MapPin className="h-3 w-3 text-slate-400" /> {lead.region ? `${lead.region}, ` : ''} {lead.country || 'Unknown'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">{lead.ip_address}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center space-y-2 opacity-60">
                                  <div className="p-3 rounded-full bg-slate-100">
                                    <MessageSquare className="h-6 w-6 text-slate-400" />
                                  </div>
                                  <p className="text-sm font-semibold text-slate-900">Belum Ada Leads WhatsApp</p>
                                  <p className="text-xs text-slate-500">Interaksi tombol WhatsApp pengunjung akan tampil di sini.</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* TAB CONTENT 2: DAFTAR PESANAN TERBARU */}
                  <TabsContent value="orders" className="m-0 border-none">
                    <div className="w-full overflow-x-auto">
                      <Table className="w-full min-w-[650px]">
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className="py-3 pl-6 text-xs uppercase tracking-wider font-semibold">ID Pesanan</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Pelanggan</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Detail Produk</TableHead>
                            <TableHead className="py-3 text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                            <TableHead className="py-3 text-right pr-6 text-xs uppercase tracking-wider font-semibold">Total Nilai</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentOrdersStats.length > 0 ? (
                            recentOrdersStats.map((order: any) => (
                              <TableRow 
                                key={order.id} 
                                onClick={() => window.location.href = `/cpanel/crm/orders/${order.id}`} 
                                className="group hover:bg-slate-50/80 transition-all cursor-pointer border-b text-xs"
                              >
                                <TableCell className="pl-6 py-3 space-y-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 text-[11px]">
                                    #{order.order_number}
                                  </span>
                                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Calendar1 className="h-3 w-3" /> {formatDate(order.created_at)}
                                  </span>
                                </TableCell>

                                <TableCell className="py-3">
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-slate-900 leading-none mb-1">{order.company_name}</span>
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                                        <User className="h-3 w-3" /> {order.pic_name}
                                      </span>
                                      <span className="text-[10px] text-slate-400 font-mono">{order.phone}</span>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell className="py-3 max-w-[200px]">
                                  <div className="flex flex-col">
                                    <span className="font-medium text-slate-800 truncate">{order.product_name}</span>
                                    <span className="text-slate-500 text-[11px]">
                                      {order.quantity} Unit &times; {formatCurrencyDisplay(order.product_price)}
                                    </span>
                                  </div>
                                </TableCell>

                                <TableCell className="py-3">
                                  <OrderStatusBadge status={order.status} />
                                </TableCell>

                                <TableCell className="text-right py-3 pr-6">
                                  <span className="font-bold text-slate-900 text-sm">
                                    {formatCurrencyDisplay(order.total_price)}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center space-y-2 opacity-60">
                                  <div className="p-3 rounded-full bg-slate-100">
                                    <ShoppingBag className="h-6 w-6 text-slate-400" />
                                  </div>
                                  <p className="text-sm font-semibold text-slate-900">Belum Ada Pesanan</p>
                                  <p className="text-xs text-slate-500">Daftar transaksi pelanggan akan tampil di sini.</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>

          {/* KANAN: Produk Paling Banyak Dilihat (Colspan 2) */}
          <div className="lg:col-span-2">
            <Card className="border-none p-0 shadow-sm ring-1 ring-slate-200 h-full overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-orange-300 tracking-tight flex items-center gap-2">
                      <Search className="h-5 w-5 text-orange-300" /> Produk Paling Sering Dilihat
                    </h2>
                    <p className="text-xs text-zinc-100 mt-0.5">
                      Produk dengan jumlah interaksi pengunjung tertinggi
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-3 space-y-2 max-h-[420px] overflow-y-auto">
                  {topSearchedProducts.length > 0 ? (
                    topSearchedProducts.map((product: any) => (
                      <div 
                        onClick={() => window.location.href = `/cpanel/cms/product/${product.id}`} 
                        key={product.id} 
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-slate-200">
                          {product.image_path ? (
                            <img 
                              src={product.image_path} 
                              alt={product.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <span className="font-bold text-slate-400 text-[9px]">NO IMG</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-800 group-hover:text-orange-600 transition-colors truncate">
                            {product.name}
                          </p>
                          <span className="inline-block text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded mt-0.5">
                            {product.searches}x dilihat
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col min-h-[250px] items-center justify-center py-6 text-center opacity-60">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <Search className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Belum ada data pencarian</p>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </div>

        </div>

        {/* Dua Komponen Baru: Artikel Terpopuler & Artikel Terbaru */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Artikel Terpopuler */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200 pt-0 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-800">
              <div>
                <h2 className="text-lg font-bold text-orange-300 tracking-tight flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-orange-300" /> Artikel Terpopuler
                </h2>
                <p className="text-xs text-zinc-100 mt-0.5">
                  Artikel blog dengan akumulasi jumlah pembaca terbanyak
                </p>
              </div>
            </div>
            <CardContent className="space-y-3 min-h-lg">
              {topPopularArticles.length > 0 ? (
                topPopularArticles.map((article) => (
                  <div 
                    onClick={() => window.open(`/${article.slug}`, '_blank', 'noopener,noreferrer')}
                    key={article.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-300 shadow hover:border-orange-500/20 hover:bg-slate-50/50 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <FileText className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-500 transition-colors truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.published_time}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {article.views?.toLocaleString()} Dilihat
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col h-56 items-center justify-center text-center opacity-60">
                  <p className="text-sm text-slate-500 font-medium">Belum ada statistik artikel populer</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Artikel Terbaru */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200 pt-0 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-800">
              <div>
                <h2 className="text-lg font-bold text-orange-300 tracking-tight flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-300" /> Artikel Terbaru
                </h2>
                <p className="text-xs text-zinc-100 mt-0.5">
                  Rilisan publikasi artikel yang baru saja diterbitkan
                </p>
              </div>
            </div>
            <CardContent className="space-y-3 min-h-lg">
              {latestArticles.length > 0 ? (
                latestArticles.map((article) => (
                  <div 
                    onClick={() => window.open(`/${article.slug}`, '_blank', 'noopener,noreferrer')}
                    key={article.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-300 shadow hover:border-orange-500/20 hover:bg-slate-50/50 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <FileText className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-500 transition-colors truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.published_time}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {article.views?.toLocaleString()} Dilihat
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col h-56 items-center justify-center text-center opacity-60">
                  <p className="text-sm text-slate-500 font-medium">Belum ada artikel yang rilis</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

      </div>
    </AppLayout>
  );
}