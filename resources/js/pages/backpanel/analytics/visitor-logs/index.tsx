import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination-custom';
import { type BreadcrumbItem } from '@/types';
import { formatDate, cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import DateRangePicker from '@/components/ui/date-range-picker';
import { type DateRange } from 'react-day-picker';
import { setDateParam } from '@/utils/date';
import { subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

import { 
  Search, 
  Eye,  
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet,
  MapPin,
  Clock,
  Activity,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  MousePointerClick,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';

interface LogVisitor {
  id: number;
  action: string;
  page: string;
  message: string;
  ip_address: string;
  provider: string;
  device: string;
  user_agent: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  region: string | null;
  country: string | null;
  url_path: string;
  http_method: string;
  created_at: string;
  updated_at: string;
  device_label: string;
  full_location: string;
}

interface Props {
  visitorLogs: {
    data: LogVisitor[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  actionOptions: Array<{ label: string; value: string }>;
  filters: {
    search?: string;
    device?: string;
    action?: string;
    date_from?: string;
    date_to?: string;
    per_page?: string;
  };
  statistics: {
    total_all_row: number;
    total_unique_ip: number; // Dipasangkan sesuai kebutuhan matrix baru
    leaderboard: {
      top_country: string;
      top_page: string;
      top_device: string;
    };
    by_device: { phone: number; tablet: number; pc: number };
    by_action: Record<string, { label: string; count: number }>;
    whatsapp_stats: { 
      total: number; 
      quotation_total: number; // Form Quotation WA spesifik
      breakdown: Record<string, { label: string; count: number }> 
    };
    by_country_region: Array<{ country: string; region: string; count: number }>;
    by_page: Array<{ page: string; count: number }>;
    trendline: Array<{ date: string; date_label: string; count: number }>;
    whatsapp_trendline?: Array<{ date_label: string; [key: string]: any }>; // Tren kategori WA
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Analitik', href: '/cpanel/analytics/visitor-logs' },
  { title: 'Dashboard', href: '/cpanel/analytics/visitor-logs' },
];

const NAVY_PRIMARY = '#1e3a8a';
const ORANGE_ACCENT = '#f97316';
const SLATE_NEUTRAL = '#64748b';
const CHART_PALETTE = ['#f97316', '#1e3a8a', '#10b981', '#8b5cf6', '#64748b'];

const getDeviceIcon = (device: string) => {
  switch (device?.toLowerCase()) {
    case 'phone': return <Smartphone className="h-4 w-4 text-orange-500" />;
    case 'tablet': return <Tablet className="h-4 w-4 text-slate-500" />;
    case 'pc': return <Monitor className="h-4 w-4 text-blue-900" />;
    default: return <Monitor className="h-4 w-4 text-slate-500" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'visit': return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'click': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'submit':
    case 'contact_page_submit':
      return 'bg-orange-50 text-orange-700 border border-orange-200';
    case 'whatsapp_quote_request':
      return 'bg-amber-50 text-amber-800 border border-amber-200';
    default: return 'bg-slate-50 text-slate-700 border border-slate-200';
  }
};

export default function VisitorLogIndex({ visitorLogs, actionOptions, filters, statistics }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPageRankOpen, setIsPageRankOpen] = useState(false);
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: filters.date_from ? new Date(filters.date_from) : undefined,
    to: filters.date_to ? new Date(filters.date_to) : undefined,
  });

  const { data, setData } = useForm({
    search: filters.search || '',
    device: filters.device || 'all',
    action: filters.action || 'all',
    per_page: filters.per_page || '10',
  });

  const applyFilters = (updatedData = data, updatedRange = dateRange) => {
    const params = new URLSearchParams();
    if (updatedData.search) params.set('search', updatedData.search);
    if (updatedData.device && updatedData.device !== 'all') params.set('device', updatedData.device);
    if (updatedData.action && updatedData.action !== 'all') params.set('action', updatedData.action);
    setDateParam(params, 'date_from', updatedRange.from);
    setDateParam(params, 'date_to', updatedRange.to);
    if (updatedData.per_page && updatedData.per_page !== '10') params.set('per_page', updatedData.per_page);
    
    router.get(`/cpanel/analytics/visitor-logs?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePeriodPreset = (preset: string) => {
    const today = new Date();
    let from: Date | undefined = today;
    let to: Date | undefined = today;

    switch (preset) {
      case 'today': from = today; to = today; break;
      case 'this_week': from = subDays(today, 7); to = today; break;
      case 'this_month': from = startOfMonth(today); to = endOfMonth(today); break;
      case 'this_year': from = startOfYear(today); to = today; break;
      default: return;
    }

    const newRange = { from, to };
    setDateRange(newRange);
    applyFilters(data, newRange);
  };

  const getActionLabel = (actionValue: string) => {
    const found = actionOptions.find((opt) => opt.value === actionValue);
    return found ? found.label : actionValue.replace(/_/g, ' ');
  };

  // Parsing Chart Data
  const devicePieData = Object.entries(statistics.by_device || {}).map(([key, val]) => ({
    name: key === 'pc' ? 'Laptop/PC' : key === 'phone' ? 'Smartphone' : 'Tablet',
    value: val
  }));

  const waDistributionData = Object.values(statistics.whatsapp_stats?.breakdown || {}).map((item: any) => ({
    name: item.label,
    Total: item.count
  }));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Analytics Dashboard" />

      <div className="space-y-6 p-6 bg-[#fafbfc] min-h-screen text-slate-800">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Analitik Web & Interaksi</h1>
            <p className="text-xs text-slate-500">Monitor performa traffic, logs aktivitas visitor, dan conversion funnel secara komprehensif.</p>
          </div>
        </div>

        {/* --- BLOCK 1: COLLAPSIBLE FILTER CONTROLS --- */}
        <Card className="shadow-sm border-slate-200 gap-0 bg-white rounded-xl p-0 overflow-hidden">
          <div 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-3 bg-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>
                  {filters.date_from ? formatDate(filters.date_from) : 'Awal'} s/d {filters.date_to ? formatDate(filters.date_to) : 'Akhir'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 p-1 border border-slate-200 rounded-lg">
                <button onClick={() => handlePeriodPreset('today')} className="px-2.5 py-1 rounded-md hover:bg-white hover:text-orange-600 transition-all">Hari Ini</button>
                <button onClick={() => handlePeriodPreset('this_week')} className="px-2.5 py-1 rounded-md hover:bg-white hover:text-orange-600 transition-all">1 Minggu</button>
                <button onClick={() => handlePeriodPreset('this_month')} className="px-2.5 py-1 rounded-md hover:bg-white hover:text-orange-600 transition-all">1 Bulan</button>
                <button onClick={() => handlePeriodPreset('this_year')} className="px-2.5 py-1 rounded-md hover:bg-white hover:text-orange-600 transition-all">1 Tahun</button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)} className="h-8 text-slate-500 px-2">
                {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {isFilterOpen && (
            <CardContent className="p-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50/20">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600">Pencarian Kata Kunci</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <Input 
                    placeholder="Cari URL, IP, atau pesan log..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="pl-9 h-8.5 text-xs bg-white border-slate-200"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600">Perangkat</Label>
                <Select value={data.device} onValueChange={(v) => setData('device', v)}>
                  <SelectTrigger className="h-8.5 text-xs bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Device</SelectItem>
                    <SelectItem value="pc">Laptop / PC</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="phone">Smartphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600">Jenis Aktivitas</Label>
                <Select value={data.action} onValueChange={(v) => setData('action', v)}>
                  <SelectTrigger className="h-8.5 text-xs bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Aktivitas</SelectItem>
                    {actionOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 flex flex-col justify-end items-end">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <DateRangePicker 
                      {...{
                        date: dateRange,
                        setDate: (range: any) => { if(range) setDateRange(range) }
                      } as any}
                      className="w-full" 
                    />
                  </div>
                  <Button onClick={() => applyFilters()} className="text-xs mt-5 bg-orange-600 hover:bg-orange-500 font-semibold px-4 text-white rounded-lg shadow-sm">
                    Filter Data
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* --- BLOCK 2: CARD MATRIX TOTAL ANGKA --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Aktivitas Log */}
          <Card className="relative overflow-hidden shadow-sm border-slate-200 bg-white p-5 flex flex-col justify-between rounded-xl">
            {/* Aksen Bulan Lebih Tegas */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-500/10 pointer-events-none" />
            <div className="absolute right-4 top-10 w-12 h-12 rounded-full bg-blue-600/7 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Aktivitas Log</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-4xl font-black text-slate-900">{statistics.total_all_row?.toLocaleString() || 0}</span>
                <span className="text-xs text-slate-400 font-normal">Hits</span>
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-slate-400 mt-3 flex items-center gap-1 border-t border-slate-50 pt-2">
              <Activity className="w-3 h-3 text-blue-900" /> Log aktivitas keseluruhan
            </div>
          </Card>

          {/* Card 2: Total IP Unik */}
          <Card className="relative overflow-hidden shadow-sm border-slate-200 bg-white p-5 flex flex-col justify-between rounded-xl">
            {/* Aksen Bulan Lebih Tegas */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-orange-500/10 pointer-events-none" />
            <div className="absolute right-4 top-10 w-12 h-12 rounded-full bg-orange-600/7 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total IP Unik</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-4xl font-black text-slate-900">{statistics.total_unique_ip?.toLocaleString() || 0}</span>
                <span className="text-xs text-slate-400 font-normal">Visitor</span>
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-slate-400 mt-3 flex items-center gap-1 border-t border-slate-50 pt-2">
              <Globe className="w-3 h-3 text-orange-500" /> Berdasarkan IP Address unik
            </div>
          </Card>

          {/* Card 3: Total Klik WhatsApp */}
          <Card className="relative overflow-hidden shadow-sm border-slate-200 bg-white p-5 flex flex-col justify-between rounded-xl">
            {/* Aksen Bulan Lebih Tegas */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-500/10 pointer-events-none" />
            <div className="absolute right-4 top-10 w-12 h-12 rounded-full bg-emerald-600/7 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Klik WhatsApp</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-4xl font-black text-slate-900">{statistics.whatsapp_stats?.total || 0}</span>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Agregat</span>
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-slate-400 mt-3 flex items-center gap-1 border-t border-slate-50 pt-2">
              <MousePointerClick className="w-3 h-3 text-emerald-500" /> Seluruh aksi trigger WA
            </div>
          </Card>

          {/* Card 4: Quotation Form WA */}
          <Card className="relative overflow-hidden shadow-sm border-slate-200 bg-white p-5 flex flex-col justify-between rounded-xl">
            {/* Aksen Bulan Lebih Tegas */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-500/10 pointer-events-none" />
            <div className="absolute right-4 top-10 w-12 h-12 rounded-full bg-amber-600/7 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quotation Form WA</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-4xl font-black text-orange-600">{statistics.whatsapp_stats?.quotation_total || 0}</span>
                <span className="text-xs text-slate-400 font-normal">Submits</span>
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-slate-400 mt-3 flex items-center gap-1 border-t border-slate-50 pt-2">
              <FileSpreadsheet className="w-3 h-3 text-orange-500" /> Formulir Quotation Spesifik
            </div>
          </Card>
        </div>

        {/* --- BLOCK 3: TRENDLINE PERFORMA & PIE CHART DEVICE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border-slate-200 bg-white rounded-xl p-5">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800">Tren Performa Harian</h3>
              <p className="text-xs text-slate-400">Frekuensi intensitas traffic log utama website</p>
            </div>
            <div className="h-60 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statistics.trendline || []} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date_label" stroke="#94a3b8" className="text-[10px]" />
                  <YAxis stroke="#94a3b8" className="text-[10px]" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="count" name="Total Hits" stroke={NAVY_PRIMARY} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Total per Perangkat</h3>
              <p className="text-xs text-slate-400">Rasio platform hardware visitor</p>
            </div>
            <div className="h-40 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={devicePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={65} paddingAngle={3} dataKey="value">
                    <Cell fill={ORANGE_ACCENT} />
                    <Cell fill={NAVY_PRIMARY} />
                    <Cell fill="#64748b" />
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 text-center border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-orange-500" /> HP</span>
                <span className="font-bold text-slate-900 mt-0.5">{statistics.by_device?.phone || 0}</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-100">
                <span className="flex items-center gap-1"><Monitor className="w-3 h-3 text-blue-900" /> PC</span>
                <span className="font-bold text-slate-900 mt-0.5">{statistics.by_device?.pc || 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-1"><Tablet className="w-3 h-3 text-slate-500" /> Tablet</span>
                <span className="font-bold text-slate-900 mt-0.5">{statistics.by_device?.tablet || 0}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* --- BLOCK 4: SEKTOR DETAIL KONVERSI WHATSAPP --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border-slate-200 bg-white rounded-xl p-5">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800">Tren Klik WhatsApp</h3>
              <p className="text-xs text-slate-400">Grafik perbandingan performa interaksi fitur WA berdasarkan lini waktu harian/bulanan</p>
            </div>
            <div className="h-56 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statistics.whatsapp_trendline || statistics.trendline || []} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date_label" stroke="#94a3b8" className="text-[10px]" />
                  <YAxis stroke="#94a3b8" className="text-[10px]" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  {/* Dinamis render garis berdasarkan kategori pecahan WA yang ada */}
                  <Line type="monotone" dataKey="count" name="Interaksi Klik" stroke={ORANGE_ACCENT} strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Distribusi Aksi Visitor WA</h3>
              <p className="text-xs text-slate-400">Komparasi kuantitas item per sub-action</p>
            </div>
            <div className="h-44 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waDistributionData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" className="text-[9px]" tickLine={false} />
                  <YAxis stroke="#94a3b8" className="text-[10px]" tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="Total" fill={NAVY_PRIMARY} radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="border-t border-slate-50 pt-2.5 max-h-[110px] overflow-y-auto space-y-1.5 pr-1">
              {Object.entries(statistics.whatsapp_stats?.breakdown || {}).map(([key, item]: any) => (
                <div key={key} className="flex justify-between text-[11px] text-slate-600 font-medium">
                  <span className="truncate flex items-center gap-1"><MessageSquare className="w-3 h-3 text-emerald-500 shrink-0" /> {item.label}</span>
                  <span className="font-bold text-slate-900">{item.count} klik</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* --- BLOCK 5: 1 CARD INTEGRATED RANK & DEMOGRAFI NEGARA --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Integrated Rank Card */}
          <Card className="shadow-sm border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Halaman & Platform Rank</h3>
                <Badge className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] shadow-none">Top Rank</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Rangking interaksi paling dominan</p>

              <div className="mt-4 space-y-4">
                {/* Halaman Paling Sering Dikunjungi (Collapsible/Dropdown internal) */}
                <div className="space-y-1.5">
                  <button 
                    onClick={() => setIsPageRankOpen(!isPageRankOpen)} 
                    className="w-full flex justify-between items-center bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Halaman Terpopuler</span>
                      <span className="text-xs font-mono font-bold text-slate-800 block truncate max-w-[190px] mt-0.5">
                        {statistics.leaderboard?.top_page || '-'}
                      </span>
                    </div>
                    {isPageRankOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>

                  {isPageRankOpen && (
                    <div className="bg-slate-50/50 border border-t-0 border-slate-100 rounded-b-lg p-2 max-h-[140px] overflow-y-auto space-y-1.5 text-[11px] shadow-inner">
                      {statistics.by_page?.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-slate-600 border-b border-slate-100/60 pb-1 last:border-0 last:pb-0">
                          <span className="truncate font-mono max-w-[160px]">{item.page}</span>
                          <span className="font-bold text-orange-600">{item.count}x</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Device Paling Banyak Mengakses */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Device Paling Aktif</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    {getDeviceIcon(statistics.leaderboard?.top_device)}
                    <span className="text-sm font-bold text-slate-800 capitalize">{statistics.leaderboard?.top_device || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 mt-4 border-t border-slate-50 pt-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-900" /> Akumulasi performa teratas
            </div>
          </Card>

          {/* Chart Jumlah Per Negara & Wilayah */}
          <Card className="md:col-span-2 shadow-sm border-slate-200 bg-white rounded-xl p-5">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-800">Geografi & Wilayah Kunjungan</h3>
              <p className="text-xs text-slate-400">Demografi sebaran log berdasarkan pemetaan regional</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statistics.by_country_region?.slice(0, 5) || []} layout="vertical" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" className="text-[10px]" />
                    <YAxis type="category" dataKey="region" stroke="#94a3b8" className="text-[10px]" width={60} hide />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Bar dataKey="count" name="Hits" fill={ORANGE_ACCENT} radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="max-h-[170px] overflow-y-auto space-y-2 pr-1 border-l border-slate-50 pl-2">
                {statistics.by_country_region?.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className="text-slate-600 flex items-center gap-1.5 font-medium truncate max-w-[130px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {item.region || 'Unknown'}, <span className="text-slate-400 font-normal text-[10px]">{item.country}</span>
                    </span>
                    <Badge className="bg-slate-100 text-slate-800 shadow-none font-bold text-[10px]">{item.count} hits</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* --- BLOCK 6: DATA TABLE LIST & PAGINATION (Card Padding Disesuaikan Kompak) --- */}
        <Card className="shadow-sm border-slate-200 bg-white rounded-xl gap-0 p-0 overflow-hidden">
          <CardHeader className="border-b pt-5 border-slate-100 bg-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-800">Rincian Baris Tabel Log Aktivitas ({visitorLogs.total})</CardTitle>
                <CardDescription className="text-xs">Daftar records lengkap historis navigasi visitor</CardDescription>
              </div>
              <div>
                <Select 
                  value={String(data.per_page || '10')} 
                  onValueChange={(value) => { 
                    setData('per_page', value); 
                    setTimeout(() => applyFilters({ ...data, per_page: value }), 10); 
                  }}
                >
                  <SelectTrigger className="h-8 text-xs w-[110px] bg-slate-50 border-slate-200">
                    <SelectValue placeholder="50 Baris" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Baris</SelectItem>
                    <SelectItem value="25">25 Baris</SelectItem>
                    <SelectItem value="50">50 Baris</SelectItem>
                    <SelectItem value="100">100 Baris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-white shadow-inner">
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Waktu</TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Alamat IP</TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Device</TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Aktivitas</TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Halaman Target</TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs py-3">Negara & Kota</TableHead>
                    <TableHead className="text-right font-bold text-slate-700 text-xs py-3">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitorLogs.data.length > 0 ? (
                    visitorLogs.data.map((log) => (
                      <TableRow key={log.id} className="hover:bg-slate-50/40 transition-colors">
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="text-xs font-medium whitespace-nowrap">{formatDate(log.created_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <code className="text-[11px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
                            {log.ip_address}
                          </code>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                            {getDeviceIcon(log.device)}
                            <span className="capitalize text-[11px]">{log.device}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge className={cn("normal-case shadow-none font-semibold text-center text-[10px] px-2 py-0.5", getActionColor(log.action))}>
                            {getActionLabel(log.action)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="max-w-xs truncate text-xs font-medium text-slate-800" title={log.page}>
                            {log.page}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <MapPin className="h-3 w-3 text-rose-400 shrink-0" />
                            <span className="truncate max-w-[160px] text-[11px]">{log.full_location || `${log.city ?? ''}, ${log.country ?? 'Unknown'}`}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-2.5">
                          <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-blue-600 hover:bg-blue-50 px-2.5">
                            <Link href={`/cpanel/analytics/visitor-logs/${log.id}`}>
                              <Eye className="h-3.5 w-3.5 mr-1" /> Lihat
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-slate-400 text-xs">
                        Tidak ada kecocokan log visitor untuk filter saat ini.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination custom */}
            {visitorLogs.last_page > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={visitorLogs.current_page}
                  totalPages={visitorLogs.last_page}
                  total={visitorLogs.total}
                  perPage={visitorLogs.per_page}
                  onPageChange={(page: number) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('page', page.toString());
                    router.get(url.toString(), {}, { preserveScroll: true, preserveState: true });
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}