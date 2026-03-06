import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Shield, Key, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  group_name?: string;
  description?: string;
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  description?: string;
  is_active: boolean;
  permissions: Permission[];
}

interface Props {
  role: Role;
  permissions: Record<string, Permission[]>;
}

export default function RolePermissions({ role, permissions }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Authorization',
      href: '/cpanel/authorization',
    },
    {
      title: 'Roles',
      href: '/cpanel/authorization/roles',
    },
    {
      title: 'Permissions',
      href: `/cpanel/authorization/roles/${role.id}/permissions`,
    },
  ];

  const { data, setData, put, processing } = useForm({
    permissions: role.permissions.map(p => p.id),
  });

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    if (checked) {
      setData('permissions', [...data.permissions, permissionId]);
    } else {
      setData('permissions', data.permissions.filter(id => id !== permissionId));
    }
  };

  const handleSelectAllInGroup = (groupName: string, checked: boolean) => {
    const groupPermissions = permissions[groupName] || [];
    const groupPermissionIds = groupPermissions.map(p => p.id);
    
    if (checked) {
      const newPermissions = [...new Set([...data.permissions, ...groupPermissionIds])];
      setData('permissions', newPermissions);
    } else {
      const newPermissions = data.permissions.filter(id => !groupPermissionIds.includes(id));
      setData('permissions', newPermissions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    put(`/cpanel/authorization/roles/${role.id}/permissions`);
  };

  const isGroupFullySelected = (groupName: string) => {
    const groupPermissions = permissions[groupName] || [];
    return groupPermissions.every(p => data.permissions.includes(p.id));
  };

  const isGroupPartiallySelected = (groupName: string) => {
    const groupPermissions = permissions[groupName] || [];
    const selectedCount = groupPermissions.filter(p => data.permissions.includes(p.id)).length;
    return selectedCount > 0 && selectedCount < groupPermissions.length;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Permissions - ${role.name}`} />
      
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/cpanel/authorization/roles">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Roles
            </Button>
          </Link>
          <div>
            <p className="text-muted-foreground">Kelola permissions untuk role: {role.name}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              {role.name} - Permissions
            </CardTitle>
            <CardDescription>
              Pilih permissions yang akan diberikan kepada role ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(permissions).map(([groupName, groupPermissions]) => (
                <div key={groupName} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{groupName}</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`select-all-${groupName}`}
                        checked={isGroupFullySelected(groupName)}
                        onCheckedChange={(checked) => handleSelectAllInGroup(groupName, checked as boolean)}
                      />
                      <Label htmlFor={`select-all-${groupName}`} className="text-sm">
                        Pilih Semua
                      </Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          checked={data.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={`permission-${permission.id}`} className="text-sm font-medium cursor-pointer">
                            <div className="flex items-center space-x-2">
                              <Key className="h-4 w-4 text-blue-500" />
                              <span>{permission.name}</span>
                              {data.permissions.includes(permission.id) && (
                                <Check className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                          </Label>
                          {permission.description && (
                            <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Link href="/cpanel/authorization/roles">
                  <Button type="button" variant="outline">
                    Batal
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Menyimpan...' : 'Simpan Permissions'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.permissions.length}</div>
                <div className="text-sm text-gray-500">Permissions Dipilih</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {Object.values(permissions).flat().length}
                </div>
                <div className="text-sm text-gray-500">Total Permissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.keys(permissions).length}
                </div>
                <div className="text-sm text-gray-500">Group Permissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((data.permissions.length / Object.values(permissions).flat().length) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
