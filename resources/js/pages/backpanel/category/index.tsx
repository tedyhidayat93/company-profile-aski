import React from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination-custom';
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
  FolderTree,
  Table as TableIcon,
  ChevronDown,
  ChevronRight
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

// CategoryTree Component
interface CategoryTreeProps {
  categories: Category[];
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  level?: number;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ 
  categories, 
  onToggleStatus, 
  onEdit, 
  onDelete, 
  level = 0 
}) => {
  const [collapsedCategories, setCollapsedCategories] = React.useState<Set<number>>(new Set());

  const toggleCollapse = (categoryId: number) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getTotalDescendants = (category: Category): number => {
    if (!category.children || category.children.length === 0) return 0;
    
    let total = category.children.length;
    category.children.forEach(child => {
      total += getTotalDescendants(child);
    });
    return total;
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => {
        const isCollapsed = collapsedCategories.has(category.id);
        const totalDescendants = getTotalDescendants(category);
        const hasChildren = category.children && category.children.length > 0;
        
        return (
          <div key={category.id} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                {level > 0 && (
                  <div className="flex items-center">
                    {Array.from({ length: level }).map((_, i) => (
                      <div key={i} className="w-4 h-0.5 bg-gray-300 mr-2" />
                    ))}
                  </div>
                )}
                {category.image && (
                  <img 
                    src={`/storage/${category.image}`} 
                    alt={category.name}
                    className="h-8 w-8 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-gray-500">{category.slug}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={category.type === 'product' ? 'default' : category.type === 'service' ? 'secondary' : 'outline'}>
                      {category.type === 'product' ? 'Produk' : category.type === 'service' ? 'Layanan' : 'Blog'}
                    </Badge>
                    {hasChildren && (
                      <span className="text-xs text-gray-500">
                        {totalDescendants + 1} total ({category.children?.length || 0} langsung)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCollapse(category.id)}
                    className="p-1 mr-2"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleStatus(category.id)}
                  className="p-1"
                >
                  {category.is_active ? (
                    <ToggleRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(category.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Ubah
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(category.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {hasChildren && !isCollapsed && category.children && (
              <div className="mt-4 ml-8">
                <CategoryTree 
                  categories={category.children}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function CategoryIndex({ categories, parentCategories, filters }: Props) {
  const { props } = usePage();
  const flash = props.flash as { success?: string; error?: string } || { success: '', error: '' };
  
  // Tampilkan flash messages
  React.useEffect(() => {
    if (flash.success) {
      // Bisa menggunakan toast, alert, atau notification library
      console.log('Success:', flash.success);
      // Atau bisa menggunakan alert sederhana:
      alert(flash.success);
    }
    if (flash.error) {
      console.log('Error:', flash.error);
      alert(flash.error);
    }
  }, [flash]);

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
  const [viewMode, setViewMode] = React.useState<'table' | 'tree'>('table');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/cms/category',
      { search: value, type: typeFilter, view: viewMode },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    const params: { search: string; type?: string; view?: string } = { search: search, view: viewMode };
    if (value && value !== 'all') {
      params.type = value;
    }
    router.get(
      '/cpanel/cms/category',
      params,
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleViewModeChange = (mode: 'table' | 'tree') => {
    setViewMode(mode);
    const params: { search?: string; type?: string; view: string } = { view: mode };
    if (search) params.search = search;
    if (typeFilter && typeFilter !== 'all') params.type = typeFilter;
    router.get(
      '/cpanel/cms/category',
      params,
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      router.delete(`/cpanel/cms/category/${id}`);
    }
  };

  // Filter categories for tree view based on type
  const getFilteredParentCategories = () => {
    if (!typeFilter || typeFilter === 'all') {
      return parentCategories;
    }
    
    const filterCategory = (categories: Category[]): Category[] => {
      return categories.filter(category => {
        // Include if category matches type
        if (category.type === typeFilter) {
          return true;
        }
        // Include if any child matches type
        if (category.children) {
          const filteredChildren = filterCategory(category.children);
          return filteredChildren.length > 0;
        }
        return false;
      }).map(category => {
        // Recursively filter children
        if (category.children) {
          return {
            ...category,
            children: filterCategory(category.children)
          };
        }
        return category;
      });
    };
    
    return filterCategory(parentCategories);
  };

  const filteredParentCategories = getFilteredParentCategories();

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
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewModeChange('table')}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'tree' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewModeChange('tree')}
            >
              <FolderTree className="h-4 w-4" />
            </Button>
            <Link href="/cpanel/cms/category/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kategori
              </Button>
            </Link>
          </div>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari kategori..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter berdasarkan tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="product">Produk</SelectItem>
                  <SelectItem value="service">Layanan</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === 'table' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Induk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
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
                        {category.type === 'product' ? 'Produk' : category.type === 'service' ? 'Layanan' : 'Blog'}
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
                              Ubah
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(category.id)}
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
          ) : (
            <CategoryTree 
              categories={filteredParentCategories} 
              onToggleStatus={handleToggleStatus}
              onEdit={(id) => router.get(`/cpanel/cms/category/edit/${id}`)}
              onDelete={handleDelete}
            />
          )}

            {viewMode === 'table' && categories.data.length === 0 && (
              <div className="text-center py-8">
                <FolderTree className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada kategori</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan membuat kategori baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/category/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Kategori
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {viewMode === 'tree' && filteredParentCategories.length === 0 && (
              <div className="text-center py-8">
                <FolderTree className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada kategori</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan membuat kategori baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/category/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Kategori
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {viewMode === 'table' && categories.last_page > 1 && (
              <Pagination
                currentPage={categories.current_page}
                totalPages={categories.last_page}
                total={categories.total}
                perPage={categories.per_page}
                onPageChange={(page) => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('page', page.toString());
                  router.get(url.toString());
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
