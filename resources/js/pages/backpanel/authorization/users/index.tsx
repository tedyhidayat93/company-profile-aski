import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2, MoreHorizontal, Search, Filter, ToggleLeft, ToggleRight, Users, Shield } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
}

interface PaginatedUsers {
  data: User[];
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
  users: PaginatedUsers;
  roles: string[];
  filters: {
    search?: string;
    role?: string;
    status?: string;
  };
}

export default function UserIndex({ users, roles, filters }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Authorization',
      href: '/cpanel/authorization',
    },
    {
      title: 'User Management',
      href: '/cpanel/authorization/user-management',
    },
  ];

  const [search, setSearch] = React.useState(filters.search || '');
  const [roleFilter, setRoleFilter] = React.useState(filters.role || '');
  const [statusFilter, setStatusFilter] = React.useState(filters.status || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get('/cpanel/authorization/user-management', { search: value, role: roleFilter, status: statusFilter }, { preserveState: true, preserveScroll: true });
  };

  const handleRoleFilter = (value: string) => {
    setRoleFilter(value);
    router.get('/cpanel/authorization/user-management', { search: search, role: value, status: statusFilter }, { preserveState: true, preserveScroll: true });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    router.get('/cpanel/authorization/user-management', { search: search, role: roleFilter, status: value }, { preserveState: true, preserveScroll: true });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`)) {
      router.delete(`/cpanel/authorization/user-management/${id}`);
    }
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/authorization/user-management/${id}/toggle-status`);
  };

  const getActiveBadge = (isActive: boolean) => {
    return isActive ? <Badge variant="default">Aktif</Badge> : <Badge variant="secondary">Tidak Aktif</Badge>;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle title="management User" description="Kelola user dan hak akses sistem">
          <Link href="/cpanel/authorization/user-management/create">
            <Button><Plus className="mr-2 h-4 w-4" />Tambah User</Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Cari user..." value={search} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
              </div>
              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[140px]">
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

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role.id} variant="outline" className="flex items-center">
                            <Shield className="mr-1 h-3 w-3" />
                            {role.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getActiveBadge(user.is_active)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user.id)} className="p-1">
                        {user.is_active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/authorization/user-management/${user.id}`}>
                              <Users className="mr-2 h-4 w-4" />
                              Detail
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/authorization/user-management/edit/${user.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user.id, user.name)} className="text-red-600">
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

            {users.data.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada user</h3>
                <p className="mt-1 text-sm text-gray-500">Mulai dengan membuat user baru.</p>
                <div className="mt-6">
                  <Link href="/cpanel/authorization/user-management/create">
                    <Button><Plus className="mr-2 h-4 w-4" />Tambah User</Button>
                  </Link>
                </div>
              </div>
            )}

            {users.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Menampilkan {((users.current_page - 1) * users.per_page) + 1} hingga{' '}
                  {Math.min(users.current_page * users.per_page, users.total)} dari{' '}
                  {users.total} hasil
                </div>
                <div className="flex space-x-2">
                  {users.links.prev && (
                    <Button variant="outline" size="sm" onClick={() => router.get(users.links.prev || '')}>
                      Sebelumnya
                    </Button>
                  )}
                  {users.links.next && (
                    <Button variant="outline" size="sm" onClick={() => router.get(users.links.next || '')}>
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
