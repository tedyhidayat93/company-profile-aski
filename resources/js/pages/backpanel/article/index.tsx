import React from 'react';
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
import { type BreadcrumbItem } from '@/types';
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
  GripVertical
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
  filters: {
    search?: string;
    status?: string;
    author?: string;
    tag?: string;
  };
}

export default function ArticleIndex({ articles, authors, filters }: Props) {
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

  const [search, setSearch] = React.useState(filters.search || '');
  const [statusFilter, setStatusFilter] = React.useState(filters.status || '');
  const [authorFilter, setAuthorFilter] = React.useState(filters.author || '');
  const [tagFilter, setTagFilter] = React.useState(filters.tag || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      '/cpanel/cms/article',
      { 
        search: value, 
        status: statusFilter,
        author: authorFilter,
        tag: tagFilter
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = {
      search, 
      status: filterType === 'status' ? value : statusFilter,
      author: filterType === 'author' ? value : authorFilter,
      tag: filterType === 'tag' ? value : tagFilter
    };

    // Remove empty filters
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key as keyof typeof newFilters] === '' || newFilters[key as keyof typeof newFilters] === 'all') {
        delete newFilters[key as keyof typeof newFilters];
      }
    });

    router.get(
      '/cpanel/cms/article',
      newFilters,
      { preserveState: true, preserveScroll: true }
    );
  };

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Diterbitkan</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Diarsipkan</SelectItem>
                </SelectContent>
              </Select>
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
              <Select value={tagFilter} onValueChange={(value) => handleFilterChange('tag', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tag</SelectItem>
                  <SelectItem value="berita">Berita</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="tips">Tips</SelectItem>
                  <SelectItem value="announcement">Pengumuman</SelectItem>
                  <SelectItem value="teknologi">Teknologi</SelectItem>
                  <SelectItem value="bisnis">Bisnis</SelectItem>
                </SelectContent>
              </Select>
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
                      <div className="max-w-md">
                        <div className="font-medium">{article.title}</div>
                        {article.excerpt && (
                          <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                            {article.excerpt}
                          </div>
                        )}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
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
