import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
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
import FlashMessage from '@/components/flash-message';
import { type BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Search, 
  Filter,
  FileText,
  User,
  Calendar,
  Eye,
  GripVertical,
  RefreshCw
} from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: string;
  published_at?: string;
  author_id: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  views_count: number;
  tags?: string[];
  position?: number;
  is_headline?: boolean;
  author?: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface PaginatedArticles {
  data: Article[];
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
  articles: PaginatedArticles;
  authors: Array<{ id: number; name: string }>;
  filters?: {
    search?: string;
    status?: string;
    author?: string;
    headline?: string;
    sort?: string;
  };
}

export default function ArticleIndex({ articles, authors, filters = {} }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Artikel',
      href: '/cpanel/cms/article',
    },
  ];

  const [search, setSearch] = useState(filters?.search ?? '');
  const [statusFilter, setStatusFilter] = useState(filters?.status ?? 'all');
  const [authorFilter, setAuthorFilter] = useState(filters?.author ?? 'all');
  const [headlineFilter, setHeadlineFilter] = useState(filters?.headline ?? 'all');
  const [sortFilter, setSortFilter] = useState('all');

  const handleSearch = (value: string) => {
    setSearch(value);
    const params: Record<string, any> = {
      search: value, 
      status: statusFilter,
      author: authorFilter,
      headline: headlineFilter,
      sort: sortFilter
    };
    
    // Remove undefined, null, empty string, and 'all' values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '' || params[key] === 'all') {
        delete params[key];
      }
    });
    
    router.get(
      '/cpanel/cms/article',
      params,
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleFilterChange = (filterType: string, value: string) => {
    // Update the specific filter state
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'author':
        setAuthorFilter(value);
        break;
      case 'headline':
        setHeadlineFilter(value);
        break;
      case 'sort':
        setSortFilter(value);
        break;
    }

    // Build params with current state values
    const newFilters: Record<string, any> = {
      search, 
      status: filterType === 'status' ? value : statusFilter,
      author: filterType === 'author' ? value : authorFilter,
      headline: filterType === 'headline' ? value : headlineFilter,
      sort: filterType === 'sort' ? value : sortFilter
    };

    // Remove undefined, null, empty string, and 'all' values
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] === undefined || newFilters[key] === null || newFilters[key] === '' || newFilters[key] === 'all') {
        delete newFilters[key];
      }
    });

    router.get(
      '/cpanel/cms/article',
      newFilters,
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setAuthorFilter('all');
    setHeadlineFilter('all');
    setSortFilter('all');
    
    router.get('/cpanel/cms/article', {}, { preserveState: true });
  };

  // Check if any filter is active
  const hasActiveFilters = search || 
    statusFilter !== 'all' || 
    authorFilter !== 'all' || 
    headlineFilter !== 'all' || 
    sortFilter !== 'all';

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      router.delete(`/cpanel/cms/article/${id}`);
    }
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/article/${id}/toggle-status`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Diterbitkan</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="destructive">Diarsipkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Artikel" />
      <FlashMessage />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Artikel"
          description="Data artikel yang tersedia di website"
        >
          <Link href="/cpanel/cms/article/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Artikel
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent className='space-y-3'>
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex gap-2">
                <div className="flex flex-1 flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Cari Artikel</Label>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari artikel..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                {hasActiveFilters && (
                    <div className="flex flex-col space-y-1">
                      <Label className="text-xs font-medium text-gray-600">&nbsp;</Label>
                      <Button 
                        type="button" 
                        size="sm"
                        variant="destructive" 
                        onClick={handleResetFilters}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Status</Label>
                  <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="published">Diterbitkan</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Diarsipkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Penulis</Label>
                  <Select value={authorFilter} onValueChange={(value) => handleFilterChange('author', value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Penulis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Penulis</SelectItem>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id.toString()}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Headline</Label>
                  <Select value={headlineFilter} onValueChange={(value) => handleFilterChange('headline', value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Headline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="true">Headline</SelectItem>
                      <SelectItem value="false">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-xs font-medium text-gray-600">Urutkan</Label>
                  <Select value={sortFilter} onValueChange={(value) => handleFilterChange('sort', value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="oldest">Terlama</SelectItem>
                      <SelectItem value="most_read">Terbanyak Dibaca</SelectItem>
                      <SelectItem value="least_read">Tersedikit Dibaca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Pos</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Headline</TableHead>
                  <TableHead>Dibaca</TableHead>
                  <TableHead>Diterbitkan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.data.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{article.position || article.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-52 truncate">
                        <div className="font-medium text-sm">{article.title}</div>

                        <a href={'https://alumodasinergi.com/'+article.slug} className="text-xs truncate max-w-10 text-blue-600 mt-1">
                          https://alumodasinergi.com/{article.slug}
                        </a>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                            {article.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{article.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{article.author?.name || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(article.status)}
                    </TableCell>
                    <TableCell>
                      {article.is_headline && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⭐ Headline
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{article.views_count}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {article.published_at ? (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {new Date(article.published_at).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
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
                            <Link href={`/cpanel/cms/article/edit/${article.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(article.id)}
                            className="text-blue-600"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Toggle Status
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(article.id)}
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

            {articles.data.length === 0 && (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada artikel</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan menambah artikel baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/article/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Artikel
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {articles.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Menampilkan {((articles.current_page - 1) * articles.per_page) + 1} hingga{' '}
                  {Math.min(articles.current_page * articles.per_page, articles.total)} dari{' '}
                  {articles.total} hasil
                </div>
                <div className="flex space-x-2">
                  {articles.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(articles.links.prev || '')}
                    >
                      Sebelumnya
                    </Button>
                  )}
                  {articles.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(articles.links.next || '')}
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
