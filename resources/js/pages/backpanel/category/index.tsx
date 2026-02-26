import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
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
  ToggleLeft,
  ToggleRight,
  FolderTree
} from 'lucide-react';

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

interface PaginatedCategories {
  data: Category[];
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
  categories: PaginatedCategories;
  parentCategories: Category[];
  filters: {
    search?: string;
    type?: string;
  };
}

export default function CategoryIndex({ categories, parentCategories, filters }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Categories',
      href: '/cpanel/cms/category',
    },
  ];

  const [search, setSearch] = React.useState(filters.search || '');
  const [typeFilter, setTypeFilter] = React.useState(filters.type || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/cms/category',
      { search: value, type: typeFilter },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    router.get(
      '/cpanel/cms/category',
      { search: search, type: value },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      router.delete(`/cpanel/cms/category/${id}`);
    }
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/category/${id}/toggle-status`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      

      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Kategori"
          description="Data kategori yang ada di website"
        >
          <Link href="/cpanel/cms/category/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.data.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {category.image && (
                          <img 
                            src={`/storage/${category.image}`} 
                            alt={category.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.type === 'product' ? 'default' : category.type === 'service' ? 'secondary' : 'outline'}>
                        {category.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {category.parent ? category.parent.name : '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(category.id)}
                        className="p-1"
                      >
                        {category.is_active ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString()}
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
                            <Link href={`/cpanel/cms/category/edit/${category.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {categories.data.length === 0 && (
              <div className="text-center py-8">
                <FolderTree className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No categories</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new category.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/category/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {categories.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Showing {((categories.current_page - 1) * categories.per_page) + 1} to{' '}
                  {Math.min(categories.current_page * categories.per_page, categories.total)} of{' '}
                  {categories.total} results
                </div>
                <div className="flex space-x-2">
                  {categories.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(categories.links.prev || '')}
                    >
                      Previous
                    </Button>
                  )}
                  {categories.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(categories.links.next || '')}
                    >
                      Next
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
