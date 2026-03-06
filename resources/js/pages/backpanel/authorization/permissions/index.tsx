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
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Filter,
  Key,
  Shield,
  Users,
  Tag
} from 'lucide-react';

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  group_name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
  users_count?: number;
}

interface PaginatedPermissions {
  data: Permission[];
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
  permissions: PaginatedPermissions;
  groups: string[];
  filters: {
    search?: string;
    group?: string;
  };
}

export default function PermissionIndex({ permissions, groups, filters }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Authorization',
      href: '/cpanel/authorization',
    },
    {
      title: 'Permissions',
      href: '/cpanel/authorization/permissions',
    },
  ];

  const [search, setSearch] = React.useState(filters.search || '');
  const [groupFilter, setGroupFilter] = React.useState(filters.group || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/authorization/permissions',
      { 
        search: value, 
        group: groupFilter
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleGroupFilter = (value: string) => {
    setGroupFilter(value);
    router.get(
      '/cpanel/authorization/permissions',
      { 
        search: search, 
        group: value
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus permission "${name}"?`)) {
      router.delete(`/cpanel/authorization/permissions/${id}`);
    }
  };

  const getGroupBadge = (groupName?: string) => {
    if (!groupName) {
      return <Badge variant="outline">General</Badge>;
    }
    return <Badge variant="secondary">{groupName}</Badge>;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Permission Management" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Manajemen Permissions"
          description="Kelola permissions dan hak akses sistem"
        >
          <Link href="/cpanel/authorization/permissions/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Permission
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari permission..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={groupFilter} onValueChange={handleGroupFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Group</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Permission</TableHead>
                  <TableHead>Guard</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.data.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">{permission.name}</div>
                          <div className="text-sm text-gray-500">ID: {permission.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{permission.guard_name}</Badge>
                    </TableCell>
                    <TableCell>
                      {getGroupBadge(permission.group_name)}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {permission.description || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="flex items-center">
                          <Shield className="mr-1 h-3 w-3" />
                          {permission.roles?.length || 0}
                        </Badge>
                        {permission.users_count !== undefined && (
                          <Badge variant="outline" className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {permission.users_count}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(permission.created_at).toLocaleDateString()}
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
                            <Link href={`/cpanel/authorization/permissions/${permission.id}`}>
                              <Key className="mr-2 h-4 w-4" />
                              Detail
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/authorization/permissions/edit/${permission.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(permission.id, permission.name)}
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

            {permissions.data.length === 0 && (
              <div className="text-center py-8">
                <Key className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada permission</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan membuat permission baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/authorization/permissions/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Permission
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {permissions.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Menampilkan {((permissions.current_page - 1) * permissions.per_page) + 1} hingga{' '}
                  {Math.min(permissions.current_page * permissions.per_page, permissions.total)} dari{' '}
                  {permissions.total} hasil
                </div>
                <div className="flex space-x-2">
                  {permissions.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(permissions.links.prev || '')}
                    >
                      Sebelumnya
                    </Button>
                  )}
                  {permissions.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(permissions.links.next || '')}
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
