import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination-custom';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/lib/utils';
import DateRangePicker from '@/components/ui/date-range-picker';
import { type DateRange } from 'react-day-picker';
import { 
  Eye, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Globe
} from 'lucide-react';

interface Lead {
  id: number;
  log_visitor_id?: number;
  type: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  is_approve_terms: boolean;
  action: string;
  ip_address?: string;
  country?: string;
  region?: string;
  page_url?: string;
  timestamp: string;
  visitor_log?: {
    page?: string;
    url_path?: string;
  };
}

interface PaginatedLeads {
  data: Lead[];
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

interface PageOption {
  value: string;
  label: string;
}

interface Props {
  leads: PaginatedLeads;
  filters?: {
    search?: string;
    type?: string;
    lead_category?: string;
    page_source?: string;
    date_from?: string;
    date_to?: string;
  };
  pageOptions?: PageOption[];
}

export default function LeadIndex({ leads, filters = {}, pageOptions = [] }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CRM',
      href: '/cpanel/crm',
    },
    {
      title: 'Leads & Interaksi',
      href: '/cpanel/crm/leads',
    },
  ];

  const [search, setSearch] = React.useState(filters?.search || '');
  const [typeFilter, setTypeFilter] = React.useState(filters?.type || 'all');
  const [leadCategoryFilter, setLeadCategoryFilter] = React.useState(filters?.lead_category || 'all');
  const [pageSourceFilter, setPageSourceFilter] = React.useState(filters?.page_source || 'all');
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: filters?.date_from ? new Date(filters.date_from) : undefined,
    to: filters?.date_to ? new Date(filters.date_to) : undefined,
  });

  const updateFilters = (newParams: Record<string, any>) => {
    const params: Record<string, any> = {
      search,
      type: typeFilter,
      lead_category: leadCategoryFilter,
      page_source: pageSourceFilter,
      date_from: dateRange.from ? dateRange.from.toISOString().split('T')[0] : undefined,
      date_to: dateRange.to ? dateRange.to.toISOString().split('T')[0] : undefined,
      ...newParams,
    };

    Object.keys(params).forEach((key) => {
      if (!params[key] || params[key] === 'all') {
        delete params[key];
      }
    });

    router.get('/cpanel/crm/leads', params, { preserveState: true, preserveScroll: true });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateFilters({ search: value });
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    updateFilters({ type: value });
  };

  const handleLeadCategoryFilter = (value: string) => {
    setLeadCategoryFilter(value);
    updateFilters({ lead_category: value });
  };

  const handlePageSourceFilter = (value: string) => {
    setPageSourceFilter(value);
    updateFilters({ page_source: value });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range || { from: undefined, to: undefined });
    updateFilters({
      date_from: range?.from ? range.from.toISOString().split('T')[0] : undefined,
      date_to: range?.to ? range.to.toISOString().split('T')[0] : undefined,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data lead ini?')) {
      router.delete(`/cpanel/crm/leads/${id}`);
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'whatsapp':
        return <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">WhatsApp</Badge>;
      case 'contact_form':
        return <Badge className="bg-blue-600 text-white hover:bg-blue-700">Contact Form</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Leads & Interaksi" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Leads & Interaksi"
          description="Daftar prospek dan log interaksi pengunjung website"
        />

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4 mb-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
                {/* Search */}
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Cari Prospek
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari nama, telepon, email, pesan..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-1">
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                  />
                </div>

                {/* Tipe Leads */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Tipe Leads
                  </label>
                  <Select value={typeFilter} onValueChange={handleTypeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="contact_form">Contact Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Kategori Kontak / Sumber Lead */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Kategori & Kontak Lead
                  </label>
                  <Select value={leadCategoryFilter} onValueChange={handleLeadCategoryFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="complete_contact">Memiliki Kontak Lengkap</SelectItem>
                      <SelectItem value="form_incomplete">Form (Kontak Tidak Lengkap)</SelectItem>
                      <SelectItem value="direct_click">Direct Click (Tanpa Form)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Halaman Website (PageList Enum) */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Halaman Asal Lead
                  </label>
                  <Select value={pageSourceFilter} onValueChange={handlePageSourceFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Halaman" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Halaman</SelectItem>
                      {pageOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <Table className="w-full min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-4 pl-6 text-xs uppercase tracking-wider font-semibold">Nama Kontak &amp; Detail</TableHead>
                    <TableHead className="py-4 text-xs uppercase tracking-wider font-semibold">Tipe &amp; Aksi</TableHead>
                    <TableHead className="py-4 text-xs uppercase tracking-wider font-semibold">Preview Pesan</TableHead>
                    <TableHead className="py-4 text-xs uppercase tracking-wider font-semibold">Lokasi</TableHead>
                    <TableHead className="py-4 text-xs uppercase tracking-wider font-semibold">Waktu</TableHead>
                    <TableHead className="py-4 text-right pr-6 text-xs uppercase tracking-wider font-semibold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.data.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-slate-50/80 align-top">
                      {/* 1. Nama Kontak & Detail Kontak */}
                      <TableCell className="py-3.5 pl-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm">{lead.name || 'Anonymous'}</span>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-slate-500">
                            {lead.phone ? (
                              <span className="flex items-center gap-1 font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                                <Phone className="h-3 w-3 text-slate-400" /> {lead.phone}
                              </span>
                            ) : (
                              <span className="text-amber-600 italic text-[11px]">No Phone</span>
                            )}
                            {lead.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-slate-400" /> {lead.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* 2. Tipe & Aksi */}
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          {getTypeBadge(lead.type)}
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit">
                            {lead.action}
                          </span>
                          {lead.visitor_log?.page && (
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded w-fit flex items-center gap-1">
                              <Globe className="h-2.5 w-2.5" /> {lead.visitor_log.page}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* 3. Preview Pesan */}
                      <TableCell className="py-3.5 max-w-[260px]">
                        {lead.message ? (
                          <p className="text-xs text-slate-600 bg-slate-50/80 p-2 rounded border border-slate-200/60 line-clamp-2 italic" title={lead.message}>
                            "{lead.message}"
                          </p>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Tanpa pesan</span>
                        )}
                      </TableCell>

                      {/* 4. Lokasi */}
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-700 flex items-center gap-1 font-medium">
                            <MapPin className="h-3 w-3 text-slate-400" /> {lead.region ? `${lead.region}, ` : ''} {lead.country || 'Unknown'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{lead.ip_address}</span>
                        </div>
                      </TableCell>

                      {/* 5. Waktu */}
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-50 px-2.5 py-1 rounded w-fit border border-slate-200/40">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {formatDate(lead.timestamp)}
                        </div>
                      </TableCell>

                      {/* 6. Aksi (Dropdown) */}
                      <TableCell className="py-3.5 text-right pr-6 whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/cpanel/crm/leads/${lead.id}`} className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                Lihat Detail
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(lead.id)}
                              className="text-red-600 cursor-pointer"
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
            </div>

            {leads.data.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">Belum Ada Data Leads</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Data prospek dan interaksi formulir/WhatsApp pengunjung akan muncul di sini.
                </p>
              </div>
            )}

            {leads.last_page > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={leads.current_page}
                  totalPages={leads.last_page}
                  total={leads.total}
                  perPage={leads.per_page}
                  onPageChange={(page: number) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('page', page.toString());
                    router.get(url.toString());
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