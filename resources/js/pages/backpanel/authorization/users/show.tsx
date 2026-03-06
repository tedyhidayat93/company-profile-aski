import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Edit, Users, Shield, Key, Calendar, Hash, Mail, ToggleLeft, ToggleRight } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  guard_name: string;
}

interface Permission {
  id: number;
  name: string;
  group_name: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: Permission[];
}

interface Props {
  user: User;
}

export default function UserShow({ user }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Authorization', href: '/cpanel/authorization' },
    { title: 'User Management', href: '/cpanel/authorization/user-management' },
    { title: 'Detail', href: `/cpanel/authorization/user-management/${user.id}` },
  ];

  const getActiveBadge = (isActive: boolean) => {
    return isActive ? <Badge variant="default">Aktif</Badge> : <Badge variant="secondary">Tidak Aktif</Badge>;
  };

  const getVerifiedBadge = (verifiedAt: string | null) => {
    return verifiedAt ? <Badge variant="default">Terverifikasi</Badge> : <Badge variant="destructive">Belum Terverifikasi</Badge>;
  };

  const getPermissionGroups = (permissions: Permission[]) => {
    const groups: { [key: string]: Permission[] } = {};
    permissions.forEach(permission => {
      const group = permission.group_name || 'General';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(permission);
    });
    return groups;
  };

  const permissionGroups = getPermissionGroups(user.permissions);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`User: ${user.name}`} />
      
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/cpanel/authorization/user-management">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Users
              </Button>
            </Link>
            <div>
              <h2 className="text-lg font-semibold">Detail User</h2>
              <p className="text-muted-foreground">Informasi lengkap user</p>
            </div>
          </div>
          <Link href={`/cpanel/authorization/user-management/edit/${user.id}`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  Informasi User
                </CardTitle>
                <CardDescription>Detail informasi user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">ID</label>
                    <div className="flex items-center mt-1">
                      <Hash className="mr-1 h-4 w-4 text-gray-400" />
                      <span className="font-mono">{user.id}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="flex items-center mt-1 space-x-2">
                      {getActiveBadge(user.is_active)}
                      {user.is_active ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Nama</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <span className="font-semibold text-green-600">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-1 flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="font-mono">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Email Verification</label>
                  <div className="flex items-center mt-1 space-x-2">
                    {getVerifiedBadge(user.email_verified_at)}
                    {user.email_verified_at && (
                      <span className="text-xs text-gray-500">
                        {new Date(user.email_verified_at).toLocaleDateString('id-ID')}
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dibuat</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(user.created_at).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Diperbarui</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(user.updated_at).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5 text-blue-500" />
                  Permissions ({user.permissions.length})
                </CardTitle>
                <CardDescription>Semua permissions yang dimiliki user ini (dari roles)</CardDescription>
              </CardHeader>
              <CardContent>
                {user.permissions.length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(permissionGroups).map(([groupName, permissions]) => (
                      <div key={groupName}>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">{groupName}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center p-2 border rounded-md">
                              <Key className="mr-2 h-3 w-3 text-blue-500" />
                              <span className="text-xs font-mono">{permission.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Key className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">User ini tidak memiliki permission</p>
                    <p className="text-xs text-gray-400 mt-1">Assign role terlebih dahulu untuk mendapatkan permissions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-purple-500" />
                  Roles ({user.roles.length})
                </CardTitle>
                <CardDescription>Roles yang dimiliki user ini</CardDescription>
              </CardHeader>
              <CardContent>
                {user.roles.length > 0 ? (
                  <div className="space-y-2">
                    {user.roles.map((role) => (
                      <div key={role.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-purple-500" />
                          <span className="font-medium">{role.name}</span>
                        </div>
                        <Badge variant="outline">ID: {role.id}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Shield className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">User ini tidak memiliki role</p>
                    <div className="mt-4">
                      <Link href={`/cpanel/authorization/user-management/edit/${user.id}`}>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Assign Role
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  Statistik
                </CardTitle>
                <CardDescription>Ringkasan statistik user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Roles</span>
                  <Badge variant="secondary">{user.roles.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Permissions</span>
                  <Badge variant="secondary">{user.permissions.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Permission Groups</span>
                  <Badge variant="secondary">{Object.keys(permissionGroups).length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status Akun</span>
                  {getActiveBadge(user.is_active)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email Verification</span>
                  {getVerifiedBadge(user.email_verified_at)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
