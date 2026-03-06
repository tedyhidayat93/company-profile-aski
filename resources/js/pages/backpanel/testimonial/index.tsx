import React from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
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
  Star,
  User
} from 'lucide-react';

interface Testimonial {
  id: number;
  nama: string;
  keterangan?: string;
  perusahaan?: string;
  foto_avatar?: string;
  rate_star: number;
  testimoni: string;
  is_show_public: boolean;
  sequence: number;
  created_at: string;
  updated_at: string;
}

interface PaginatedTestimonials {
  data: Testimonial[];
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
  testimonials: PaginatedTestimonials;
  filters: {
    search?: string;
    public?: string;
    rating?: string;
  };
}

export default function TestimonialIndex({ testimonials, filters }: Props) {
  const { props } = usePage();
  const flash = props.flash as { success?: string; error?: string } || { success: '', error: '' };
  
  // Tampilkan flash messages
  React.useEffect(() => {
    if (flash.success) {
      console.log('Success:', flash.success);
      alert(flash.success);
    }
    if (flash.error) {
      console.log('Error:', flash.error);
      alert(flash.error);
    }
  }, [flash]);

  const [search, setSearch] = React.useState(filters.search || '');
  const [publicFilter, setPublicFilter] = React.useState(filters.public || 'all');
  const [ratingFilter, setRatingFilter] = React.useState(filters.rating || 'all');

  const handleSearch = (value: string) => {
    setSearch(value);
    const params: { search?: string; public?: string; rating?: string } = { search: value };
    if (publicFilter !== 'all') params.public = publicFilter;
    if (ratingFilter !== 'all') params.rating = ratingFilter;
    router.get('/cpanel/cms/testimonial', params, { preserveState: true });
  };

  const handlePublicFilter = (value: string) => {
    setPublicFilter(value);
    const params: { search?: string; public?: string; rating?: string } = { search: search };
    if (value !== 'all') params.public = value;
    if (ratingFilter !== 'all') params.rating = ratingFilter;
    router.get('/cpanel/cms/testimonial', params, { preserveState: true });
  };

  const handleRatingFilter = (value: string) => {
    setRatingFilter(value);
    const params: { search?: string; public?: string; rating?: string } = { search: search };
    if (publicFilter !== 'all') params.public = publicFilter;
    if (value !== 'all') params.rating = value;
    router.get('/cpanel/cms/testimonial', params, { preserveState: true });
  };

  const handleToggleStatus = (id: number) => {
    router.patch(`/cpanel/cms/testimonial/${id}/toggle-status`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
      router.delete(`/cpanel/cms/testimonial/${id}`);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Testimonial',
      href: '/cpanel/cms/testimonial',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Testimonials" />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Data Testimonial"
          description="Data testimonial yang ada di website"
        >
          <Link href="/cpanel/cms/testimonial/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Testimonial
            </Button>
          </Link>
        </HeaderTitle>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari testimonial..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={publicFilter} onValueChange={handlePublicFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="true">Publik</SelectItem>
                  <SelectItem value="false">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={handleRatingFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Rating</SelectItem>
                  <SelectItem value="5">5 Bintang</SelectItem>
                  <SelectItem value="4">4 Bintang</SelectItem>
                  <SelectItem value="3">3 Bintang</SelectItem>
                  <SelectItem value="2">2 Bintang</SelectItem>
                  <SelectItem value="1">1 Bintang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.data.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {testimonial.foto_avatar ? (
                          <img 
                            src={`/storage/${testimonial.foto_avatar}`} 
                            alt={testimonial.nama}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{testimonial.nama}</div>
                          {testimonial.keterangan && (
                            <div className="text-sm text-gray-500">{testimonial.keterangan}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {testimonial.perusahaan || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(testimonial.rate_star)}
                        <span className="text-sm text-gray-500 ml-1">({testimonial.rate_star})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(testimonial.id)}
                        className="p-1"
                      >
                        {testimonial.is_show_public ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(testimonial.created_at).toLocaleDateString()}
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
                            <Link href={`/cpanel/cms/testimonial/${testimonial.id}`}>
                              <User className="mr-2 h-4 w-4" />
                              Lihat
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/cpanel/cms/testimonial/edit/${testimonial.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Ubah
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(testimonial.id)}
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

            {testimonials.data.length === 0 && (
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada testimonial</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mulai dengan membuat testimonial baru.
                </p>
                <div className="mt-6">
                  <Link href="/cpanel/cms/testimonial/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Testimonial
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {testimonials.last_page > 1 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-700">
                  Showing {((testimonials.current_page - 1) * testimonials.per_page) + 1} to{' '}
                  {Math.min(testimonials.current_page * testimonials.per_page, testimonials.total)} of{' '}
                  {testimonials.total} results
                </div>
                <div className="flex space-x-2">
                  {testimonials.links.prev && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(testimonials.links.prev || '')}
                    >
                      Previous
                    </Button>
                  )}
                  {testimonials.links.next && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.get(testimonials.links.next || '')}
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
