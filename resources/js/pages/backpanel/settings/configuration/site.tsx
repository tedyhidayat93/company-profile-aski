import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ConfigurationLayout from './layout';
import { Plus, Edit, Trash2, MoreHorizontal, Settings, Globe, Mail, Phone, MapPin } from 'lucide-react';

interface Configuration {
  id: number;
  label: string;
  description?: string;
  group: string;
  key: string;
  value: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  configurations: Configuration[];
  currentGroup: string;
}

export default function SiteConfiguration({ configurations, currentGroup }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    configurations: configurations.map(config => ({
      id: config.id,
      value: config.value
    }))
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    router.post(`/cpanel/settings/configuration/${currentGroup}`, data, {
      onSuccess: () => {
        // Success handled by flash messages
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus konfigurasi ini?')) {
      router.delete(`/cpanel/settings/configuration/${currentGroup}/${id}`);
    }
  };

  const renderInput = (config: Configuration, index: number) => {
    const baseName = `configurations.${index}.value`;
    
    switch (config.type) {
      case 'textarea':
        return (
          <Textarea
            name={baseName}
            value={data.configurations[index]?.value || ''}
            onChange={(e) => {
              const newConfigurations = [...data.configurations];
              newConfigurations[index] = { ...newConfigurations[index], value: e.target.value };
              setData('configurations', newConfigurations);
            }}
            placeholder={config.description || `Masukkan ${config.label.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Select
            value={data.configurations[index]?.value || ''}
            onValueChange={(value) => {
              const newConfigurations = [...data.configurations];
              newConfigurations[index] = { ...newConfigurations[index], value };
              setData('configurations', newConfigurations);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Pilih ${config.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Ya</SelectItem>
              <SelectItem value="no">Tidak</SelectItem>
              <SelectItem value="enabled">Aktif</SelectItem>
              <SelectItem value="disabled">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={baseName}
              checked={data.configurations[index]?.value === 'true'}
              onChange={(e) => {
                const newConfigurations = [...data.configurations];
                newConfigurations[index] = { ...newConfigurations[index], value: e.target.checked ? 'true' : 'false' };
                setData('configurations', newConfigurations);
              }}
              className="h-4 w-4"
            />
            <Label>{config.description || config.label}</Label>
          </div>
        );
      case 'file':
      case 'image':
        return (
          <div className="space-y-2">
            <Input
              type="file"
              accept={config.type === 'image' ? 'image/*' : '*'}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const newConfigurations = [...data.configurations];
                  newConfigurations[index] = { ...newConfigurations[index], value: file.name };
                  setData('configurations', newConfigurations);
                }
              }}
            />
            {data.configurations[index]?.value && (
              <p className="text-sm text-gray-500">File saat ini: {data.configurations[index]?.value}</p>
            )}
          </div>
        );
      default:
        return (
          <Input
            name={baseName}
            value={data.configurations[index]?.value || ''}
            onChange={(e) => {
              const newConfigurations = [...data.configurations];
              newConfigurations[index] = { ...newConfigurations[index], value: e.target.value };
              setData('configurations', newConfigurations);
            }}
            placeholder={config.description || `Masukkan ${config.label.toLowerCase()}`}
          />
        );
    }
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'site':
        return <Globe className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      case 'payment':
        return <Settings className="h-5 w-5" />;
      case 'shipping':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getGroupTitle = (group: string) => {
    switch (group) {
      case 'site':
        return 'Pengaturan Situs';
      case 'email':
        return 'Pengaturan Email';
      case 'system':
        return 'Pengaturan Sistem';
      case 'payment':
        return 'Pengaturan Pembayaran';
      case 'shipping':
        return 'Pengaturan Pengiriman';
      default:
        return 'Pengaturan Lainnya';
    }
  };

  return (
    <ConfigurationLayout>
      <Head title={`${getGroupTitle(currentGroup)} - Konfigurasi`} />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getGroupIcon(currentGroup)}
              <span>{getGroupTitle(currentGroup)}</span>
            </CardTitle>
            <CardDescription>
              Kelola pengaturan untuk {getGroupTitle(currentGroup).toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {configurations.map((config, index) => (
                <div key={config.id} className="space-y-2">
                  <Label htmlFor={`config-${config.id}`}>
                    {config.label}
                    <span className="text-gray-400 ml-2">({config.key})</span>
                  </Label>
                  {renderInput(config, index)}
                  {config.description && (
                    <p className="text-sm text-gray-500">{config.description}</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{config.type}</Badge>
                    <span className="text-xs text-gray-400">
                      Diperbarui: {new Date(config.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}

              {configurations.length === 0 && (
                <div className="text-center py-8">
                  <Settings className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada konfigurasi</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Mulai dengan menambah konfigurasi baru.
                  </p>
                </div>
              )}

              {configurations.length > 0 && (
                <div className="flex justify-end space-x-2">
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {configurations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Daftar Konfigurasi</CardTitle>
              <CardDescription>
                Lihat dan kelola semua konfigurasi {getGroupTitle(currentGroup).toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configurations.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell className="font-medium">{config.label}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                          {config.key}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{config.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {config.value}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                const element = document.getElementById(`config-${config.id}`);
                                element?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(config.id)}
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
            </CardContent>
          </Card>
        )}
      </div>
    </ConfigurationLayout>
  );
}
