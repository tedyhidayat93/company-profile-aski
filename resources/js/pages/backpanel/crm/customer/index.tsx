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
  Users,
  ToggleLeft,
  ToggleRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PaginatedCustomers {
  data: Customer[];
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
  customers: PaginatedCustomers;
  filters: {
    search?: string;
    active?: string;
  };
}

export default function CustomerIndex({ customers, filters }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CRM',
      href: '/cpanel/crm',
    },
    {
      title: 'Pelanggan',
      href: '/cpanel/crm/customer',
    },
  ];

  const [search, setSearch] = React.useState(filters.search || '');
  const [activeFilter, setActiveFilter] = React.useState(filters.active || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/crm/customer',
      { 
        search: value, 
        active: activeFilter
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleActiveFilter = (value: string) => {
    setActiveFilter(value);
    router.get(
      '/cpanel/crm/customer',
      { 
        search: search, 
        active: value
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
      router.delete(`/cpanel/crm/customer/${id}`);
    }
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/crm/customer/${id}/toggle-status`);
  };

  const getActiveBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default">Aktif</Badge>
    ) : (
      <Badge variant="secondary">Tidak Aktif</Badge>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pelanggan" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Pelanggan"
          description="Data pelanggan yang terdaftar"
        >
          <Link href="/cpanel/crm/customer/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pelanggan
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari pelanggan..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={activeFilter} onValueChange={handleActiveFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="true">Aktif</SelectItem>
                  <SelectItem value="false">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.data.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          {customer.address && (
                            <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                              {customer.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.phone ? (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getActiveBadge(customer.is_active)}
                    </TableCell>
                    <TableCell>
                      {new Date(customer.created_at).toLocaleDateString()}
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
                            <Link href={`/cpanel/crm/customer/edit/${customer.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(customer.id)}
                            className="text-blue-600"
                          >
                            {customer.is_active ? (
                              <ToggleLeft className="mr-2 h-4 w-4" />
                            ) : (
                              <ToggleRight className="mr-2 h-4 w-4" />
                            )}
                            Toggle Status
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(customer.id)}
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

            {customers.data.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada pelanggan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan menambah pelanggan baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/crm/customer/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Pelanggan
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {customers.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Menampilkan {((customers.current_page - 1) * customers.per_page) + 1} hingga{' '}
                  {Math.min(customers.current_page * customers.per_page, customers.total)} dari{' '}
                  {customers.total} hasil
                </div>
                <div className="flex space-x-2">
                  {customers.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(customers.links.prev || '')}
                    >
                      Sebelumnya
                    </Button>
                  )}
                  {customers.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(customers.links.next || '')}
                    >
                      Selanjutnya
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
