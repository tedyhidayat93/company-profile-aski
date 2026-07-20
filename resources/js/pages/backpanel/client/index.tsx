import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination-custom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/lib/utils';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Filter,
  ToggleLeft,
  ToggleRight,
  Globe,
  Phone,
  Mail,
  MapPin,
  User,
  Image as ImageIcon,
  Eye,
  Pin,    // 👈 Icon Baru
  PinOff  // 👈 Icon Baru
} from 'lucide-react';
import { handleImageError } from '@/utils/image';

interface Client {
  id: number;
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  pic?: string;
  image?: string;
  is_active: boolean;
  is_pinned: boolean; // 👈 Tambah properti baru
  sequence: number;
  created_at: string;
  updated_at: string;
}

interface PaginatedClients {
  data: Client[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  clients: PaginatedClients;
  filters: {
    search?: string;
    active?: string;
    pinned?: string; // 👈 Tambah filter baru
  };
}

export default function ClientIndex({ clients, filters }: Props) {

  const [search, setSearch] = React.useState(filters.search || '');
  const [activeFilter, setActiveFilter] = React.useState(filters.active || 'all');
  const [pinnedFilter, setPinnedFilter] = React.useState(filters.pinned || 'all'); // 👈 State filter baru

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.get(`/cpanel/cms/client?${params.toString()}`, {}, { preserveState: true });
  };

  const handleActiveFilter = (value: string) => {
    setActiveFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== 'all') {
      params.set('active', value);
    } else {
      params.delete('active');
    }
    router.get(`/cpanel/cms/client?${params.toString()}`, {}, { preserveState: true });
  };

  // 🚀 Handler Baru untuk filter Pinned
  const handlePinnedFilter = (value: string) => {
    setPinnedFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== 'all') {
      params.set('pinned', value);
    } else {
      params.delete('pinned');
    }
    router.get(`/cpanel/cms/client?${params.toString()}`, {}, { preserveState: true });
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/client/${id}/toggle-status`);
  };

  // 🚀 Handler Baru untuk Toggle status Pin
  const handleTogglePinned = (id: number) => {
    router.patch(`/cpanel/cms/client/${id}/toggle-pinned`, {}, {
        preserveScroll: true,
    });
    };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      router.delete(`/cpanel/cms/client/${id}`);
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Clients',
      href: '/cpanel/cms/client',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Data Klien" />
        <div className="space-y-6 p-6">
            <HeaderTitle
                title="Data Klien"
                description="Data klien yang tersedia di website"
            >
                <Link href="/cpanel/cms/client/create">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Klien
                </Button>
                </Link>
            </HeaderTitle>

            <Card>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-4"> {/* Ubah md:grid-cols-3 jadi md:grid-cols-4 */}
                        {/* Search */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-medium text-gray-600">
                            Cari
                            </label>

                            <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

                            <Input
                                placeholder="Cari client..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10"
                            />
                            </div>
                        </div>

                        {/* Status Active */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600">
                            Status Aktif
                            </label>

                            <Select
                            value={activeFilter}
                            onValueChange={handleActiveFilter}
                            >
                            <SelectTrigger className="w-full">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="true">Aktif</SelectItem>
                                <SelectItem value="false">Tidak Aktif</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>

                        {/* 🚀 Filter Baru: Status Pin */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600">
                            Status Pin (Hero)
                            </label>

                            <Select
                            value={pinnedFilter}
                            onValueChange={handlePinnedFilter}
                            >
                            <SelectTrigger className="w-full">
                                <Pin className="mr-2 h-4 w-4 text-gray-500" />
                                <SelectValue placeholder="Pinned" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="true">Di-pin</SelectItem>
                                <SelectItem value="false">Tidak Di-pin</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Gambar</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>PIC</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Hero Pin</TableHead> {/* 👈 Header Kolom Baru */}
                            <TableHead>Dibuat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {clients.data.map((client) => (
                            <TableRow key={client.id}>
                            <TableCell>
                                {client.image ? (
                                <img
                                    src={`/storage/${client.image}`}
                                    alt={client.name}
                                    onError={handleImageError}
                                    className="h-12 w-12 object-cover rounded-md"
                                />
                                ) : (
                                <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                                    <ImageIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <div>
                                <div className="font-medium">
                                    <Link 
                                        href={`/cpanel/cms/client/${client.id}`}
                                        className="hover:text-blue-600"
                                    >
                                        {client.name}
                                    </Link>
                                </div>
                                {client.website && (
                                    <div className="text-sm text-gray-500 flex items-center">
                                    <Globe className="h-3 w-3 mr-1" />
                                    <a 
                                        href={client.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-600"
                                    >
                                        {client.website}
                                    </a>
                                    </div>
                                )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                {client.email && (
                                    <div className="text-sm text-gray-600 flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {client.email}
                                    </div>
                                )}
                                {client.phone && (
                                    <div className="text-sm text-gray-600 flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {client.phone}
                                    </div>
                                )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm text-gray-600">
                                {client.pic || '-'}
                                </div>
                            </TableCell>
                            <TableCell>
                                <button 
                                  onClick={() => handleToggleStatus(client.id)}
                                  className="focus:outline-none"
                                  title="Klik untuk mengubah status"
                                >
                                  {client.is_active ? (
                                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">Aktif</Badge>
                                  ) : (
                                    <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">Tidak Aktif</Badge>
                                  )}
                                </button>
                            </TableCell>
                            
                            {/* 🚀 Kolom Baru: Status Pin Hero */}
                            <TableCell>
                                <button
                                  onClick={() => handleTogglePinned(client.id)}
                                  className="focus:outline-none"
                                  title="Klik untuk mengubah status pin"
                                >
                                  {client.is_pinned ? (
                                    <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer flex items-center w-fit gap-1">
                                      <Pin className="h-3 w-3 fill-current" /> Di-pin
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-gray-400 border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center w-fit gap-1">
                                      <PinOff className="h-3 w-3" /> Biasa
                                    </Badge>
                                  )}
                                </button>
                            </TableCell>

                            <TableCell>
                                <div className="text-sm text-gray-600">
                                {formatDate(client.created_at)}
                                </div>
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
                                    <Link href={`/cpanel/cms/client/${client.id}`}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                    <Link href={`/cpanel/cms/client/edit/${client.id}`}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                    </DropdownMenuItem>
                                    
                                    {/* 🚀 Opsi Tambahan Baru di Dropdown Menu Action */}
                                    <DropdownMenuItem onClick={() => handleTogglePinned(client.id)}>
                                      {client.is_pinned ? (
                                        <>
                                          <PinOff className="mr-2 h-4 w-4 text-orange-500" />
                                          Lepas Pin
                                        </>
                                      ) : (
                                        <>
                                          <Pin className="mr-2 h-4 w-4 text-blue-500" />
                                          Sematkan Pin
                                        </>
                                      )}
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                    onClick={() => handleDelete(client.id)}
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

                    {clients.data.length === 0 && (
                        <div className="text-center py-8">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada klien</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Mulai dengan membuat klien baru.
                            </p>
                            <div className="mt-6">
                                <Link href="/cpanel/cms/client/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Klien
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}


                    {clients.last_page > 1 && (
                        <Pagination
                        currentPage={clients.current_page}
                        totalPages={clients.last_page}
                        total={clients.total}
                        perPage={clients.per_page}
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