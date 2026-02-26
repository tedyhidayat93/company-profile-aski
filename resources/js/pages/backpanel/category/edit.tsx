import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  type: string;
  parent_id?: number;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  parent?: Category;
  children?: Category[];
  created_at: string;
  updated_at: string;
}

interface Props {
  category: Category;
  parentCategories: Category[];
}

export default function CategoryEdit({ category, parentCategories }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Categories',
      href: '/cpanel/cms/category',
    },
    {
      title: 'Edit',
      href: `/cpanel/cms/category/edit/${category.id}`,
    },
  ];

  const [imagePreview, setImagePreview] = useState<string>('');

  const { data, setData, put, processing, errors, reset } = useForm({
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    type: category.type,
    parent_id: category.parent_id?.toString() || '',
    is_active: category.is_active,
    meta_title: category.meta_title || '',
    meta_description: category.meta_description || '',
    image: null as File | null,
  });

  useEffect(() => {
    if (category.image) {
      setImagePreview(`/storage/${category.image}`);
    }
  }, [category.image]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else if (key !== 'image') {
        formData.append(key, value?.toString() || '');
      }
    });

    formData.append('_method', 'PUT');

    router.post(`/cpanel/cms/category/${category.id}`, formData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Category" />
      
      <div className="flex h-4 flex-wrap p-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/cpanel/cms/category">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <div>
            <p className="text-muted-foreground">Update the category information below</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>
              Modify the information for "{category.name}".
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="Category name"
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
                    placeholder="category-slug"
                  />
                  {errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parent_id">Parent Category</Label>
                  <Select value={data.parent_id} onValueChange={(value) => setData('parent_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (Root Category)</SelectItem>
                      {parentCategories
                        .filter(cat => cat.id !== category.id)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.parent_id && <p className="text-sm text-red-600">{errors.parent_id}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  placeholder="Category description"
                  rows={3}
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-32 w-32 object-cover rounded-md border"
                    />
                  </div>
                )}
                {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <Input
                    id="meta_description"
                    name="meta_description"
                    value={data.meta_description}
                    onChange={handleInputChange}
                    placeholder="SEO meta description"
                  />
                  {errors.meta_description && <p className="text-sm text-red-600">{errors.meta_description}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={data.is_active}
                  onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Link href="/cpanel/cms/category">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Updating...' : 'Update Category'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
