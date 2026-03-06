import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Key } from 'lucide-react';

export default function PermissionCreate() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Authorization',
      href: '/cpanel/authorization',
    },
    {
      title: 'Permissions',
      href: '/cpanel/authorization/permissions',
    },
    {
      title: 'Buat',
      href: '/cpanel/authorization/permissions/create',
    },
  ];

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    guard_name: 'web',
    group_name: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post('/cpanel/authorization/permissions', {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Buat Permission" />
      
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/cpanel/authorization/permissions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Permissions
            </Button>
          </Link>
          <div>
            <p className="text-muted-foreground">Buat permission baru untuk sistem</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2 h-5 w-5" />
              Detail Permission
            </CardTitle>
            <CardDescription>
              Isi informasi untuk permission baru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Permission *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="contoh: user-create"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  <p className="text-xs text-gray-500">
                    Gunakan format: resource-action (contoh: user-create, article-edit)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guard_name">Guard Name *</Label>
                  <Input
                    id="guard_name"
                    name="guard_name"
                    value={data.guard_name}
                    onChange={handleInputChange}
                    placeholder="web"
                    required
                  />
                  {errors.guard_name && <p className="text-sm text-red-600">{errors.guard_name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group_name">Group Name</Label>
                  <Input
                    id="group_name"
                    name="group_name"
                    value={data.group_name}
                    onChange={handleInputChange}
                    placeholder="User Management"
                  />
                  {errors.group_name && <p className="text-sm text-red-600">{errors.group_name}</p>}
                  <p className="text-xs text-gray-500">
                    Digunakan untuk mengelompokkan permissions
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Contoh Group Names</Label>
                  <div className="flex flex-wrap gap-2">
                    {['User Management', 'Article Management', 'Product Management', 'Settings'].map((group) => (
                      <Button
                        key={group}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setData('group_name', group)}
                      >
                        {group}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi permission (maks 500 karakter)"
                  rows={3}
                  maxLength={500}
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Format Naming Convention:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Gunakan format: <code className="bg-gray-200 px-1 rounded">resource-action</code></p>
                  <p>• Contoh: <code className="bg-gray-200 px-1 rounded">user-create</code>, <code className="bg-gray-200 px-1 rounded">article-edit</code></p>
                  <p>• Actions yang umum: create, read, update, delete, list, show</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Link href="/cpanel/authorization/permissions">
                  <Button type="button" variant="outline">
                    Batal
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Membuat...' : 'Buat Permission'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
