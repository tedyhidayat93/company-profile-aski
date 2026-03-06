import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Users, Shield } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  guard_name: string;
}

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

interface Props {
  user: User;
  roles: Role[];
}

export default function UserEdit({ user, roles }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Authorization', href: '/cpanel/authorization' },
    { title: 'User Management', href: '/cpanel/authorization/user-management' },
    { title: 'Edit', href: `/cpanel/authorization/user-management/edit/${user.id}` },
  ];

  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    is_active: user.is_active,
    roles: user.roles.map(r => r.name),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setData(name as keyof typeof data, checked);
    } else {
      setData(name as keyof typeof data, value);
    }
  };

  const handleRoleChange = (roleName: string, checked: boolean) => {
    if (checked) {
      setData('roles', [...data.roles, roleName]);
    } else {
      setData('roles', data.roles.filter(r => r !== roleName));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/cpanel/authorization/user-management/${user.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />
      
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/cpanel/authorization/user-management">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Users
            </Button>
          </Link>
          <div>
            <p className="text-muted-foreground">Edit user: {user.name}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Detail User
            </CardTitle>
            <CardDescription>Perbarui informasi user.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama *</Label>
                  <Input id="name" name="name" value={data.name} onChange={handleInputChange} placeholder="Nama user" required />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={data.email} onChange={handleInputChange} placeholder="email@example.com" required />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" value={data.password} onChange={handleInputChange} placeholder="Kosongkan jika tidak ingin mengubah" />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  <p className="text-xs text-gray-500">Biarkan kosong untuk tidak mengubah password</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                  <Input id="password_confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={handleInputChange} placeholder="Ulangi password baru" />
                  {errors.password_confirmation && <p className="text-sm text-red-600">{errors.password_confirmation}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={data.roles.includes(role.name)}
                        onCheckedChange={(checked) => handleRoleChange(role.name, checked as boolean)}
                      />
                      <Label htmlFor={`role-${role.id}`} className="text-sm font-medium cursor-pointer flex items-center">
                        <Shield className="mr-1 h-4 w-4 text-blue-500" />
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.roles && <p className="text-sm text-red-600">{errors.roles}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="is_active" name="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked as boolean)} />
                <Label htmlFor="is_active">User Aktif</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Link href="/cpanel/authorization/user-management">
                  <Button type="button" variant="outline">Batal</Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Memperbarui...' : 'Perbarui User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
