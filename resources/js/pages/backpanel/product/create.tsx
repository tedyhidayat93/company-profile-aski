import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Package, Upload, Tag as TagIcon } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductCreate() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Produk',
      href: '/cpanel/cms/product',
    },
    {
      title: 'Buat',
      href: '/cpanel/cms/product/create',
    },
  ];

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    slug: '',
    type: 'physical',
    description: '',
    short_description: '',
    sku: '',
    price: '',
    compare_at_price: '',
    cost_per_item: '',
    track_quantity: true,
    quantity: '',
    barcode: '',
    status: 'draft',
    is_featured: false,
    is_bestseller: false,
    is_new: true,
    brand_id: '',
    category_id: '',
    meta_title: '',
    meta_description: '',
    tags: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(tags));
      } else {
        formData.append(key, value?.toString() || '');
      }
    });

    router.post('/cpanel/cms/product', formData, {
      onSuccess: () => {
        reset();
        setTags([]);
        setTagInput('');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Buat Produk" />
      
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/cpanel/cms/product">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Produk
            </Button>
          </Link>
          <div>
            <p className="text-muted-foreground">Buat produk baru untuk website Anda</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detail Produk</CardTitle>
            <CardDescription>
              Isi informasi untuk produk baru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Produk *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="Nama produk"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={data.slug}
                    onChange={handleInputChange}
                    placeholder="produk-slug"
                  />
                  {errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Produk *</Label>
                  <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Fisik</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={data.sku}
                    onChange={handleInputChange}
                    placeholder="SKU produk"
                  />
                  {errors.sku && <p className="text-sm text-red-600">{errors.sku}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Deskripsi Singkat</Label>
                <Textarea
                  id="short_description"
                  name="short_description"
                  value={data.short_description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat (maks 500 karakter)"
                  rows={2}
                  maxLength={500}
                />
                {errors.short_description && <p className="text-sm text-red-600">{errors.short_description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi lengkap produk"
                  rows={4}
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="compare_at_price">Harga Perbandingan</Label>
                  <Input
                    id="compare_at_price"
                    name="compare_at_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.compare_at_price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  {errors.compare_at_price && <p className="text-sm text-red-600">{errors.compare_at_price}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost_per_item">Biaya per Item</Label>
                  <Input
                    id="cost_per_item"
                    name="cost_per_item"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.cost_per_item}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  {errors.cost_per_item && <p className="text-sm text-red-600">{errors.cost_per_item}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Stok</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={data.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    value={data.barcode}
                    onChange={handleInputChange}
                    placeholder="Barcode produk"
                  />
                  {errors.barcode && <p className="text-sm text-red-600">{errors.barcode}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Diterbitkan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand_id">Merek</Label>
                  <Select value={data.brand_id} onValueChange={(value) => setData('brand_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih merek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tidak Ada</SelectItem>
                      {/* Brands will be populated from controller */}
                    </SelectContent>
                  </Select>
                  {errors.brand_id && <p className="text-sm text-red-600">{errors.brand_id}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category_id">Kategori</Label>
                  <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tidak Ada</SelectItem>
                      {/* Categories will be populated from controller */}
                    </SelectContent>
                  </Select>
                  {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  name="meta_title"
                  value={data.meta_title}
                  onChange={handleInputChange}
                  placeholder="SEO meta title"
                />
                {errors.meta_title && <p className="text-sm text-red-600">{errors.meta_title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  name="meta_description"
                  value={data.meta_description}
                  onChange={handleInputChange}
                  placeholder="SEO meta description"
                  rows={2}
                />
                {errors.meta_description && <p className="text-sm text-red-600">{errors.meta_description}</p>}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Tambah tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag}>
                    Tambah
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-xs text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="track_quantity"
                    checked={data.track_quantity}
                    onCheckedChange={(checked) => setData('track_quantity', checked as boolean)}
                  />
                  <Label htmlFor="track_quantity">Lacak Stok</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                  />
                  <Label htmlFor="is_featured">Unggulan</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_bestseller"
                    checked={data.is_bestseller}
                    onCheckedChange={(checked) => setData('is_bestseller', checked as boolean)}
                  />
                  <Label htmlFor="is_bestseller">Terlaris</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Link href="/cpanel/cms/product">
                  <Button type="button" variant="outline">
                    Batal
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Membuat...' : 'Buat Produk'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
