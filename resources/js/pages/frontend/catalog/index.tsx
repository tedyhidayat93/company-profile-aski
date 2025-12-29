import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Search, ArrowUpDown, ChevronDown, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';

export interface Product {
    id: number;
    name: string;
    type: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
}

export interface PaginationInfo {
    current_page: number;
    per_page: number;
    total: number;
}

export interface LoadInfo {
    request_time: number;
    timestamp: number;
    formatted: string;
    timezone: string;
    microtime: number;
    load_time: number;
    memory_usage: string;
}

export interface ApiResponse<T> {
    status: string;
    data: T[];
    pagination: PaginationInfo;
    load_info: LoadInfo;
}

interface CatalogProps {
    products: ApiResponse<Product>;
    categories: string[];
    types: string[];
    filters: {
        search?: string;
        type?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        perPage?: string | number;
    };
}

function Catalog({ products: initialProducts, categories, types, filters: initialPropsFilters }: CatalogProps) {
    const { filters: initialFilters } = usePage().props as any;
    
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        type: initialFilters?.type || '',
        category: initialFilters?.category || '',
        perPage: initialFilters?.perPage || '12',
        minPrice: initialFilters?.minPrice || '',
        maxPrice: initialFilters?.maxPrice || '',
        sort: initialFilters?.sort?.toString() || 'price-asc',
    });
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);
    
    // Extract products and pagination from the API response
    const { data: products, pagination } = initialProducts;

    // Update local state when filters from server change
    useEffect(() => {
        setFilters({
            search: initialFilters?.search || '',
            type: initialFilters?.type || '',
            category: initialFilters?.category || '',
            perPage: initialFilters?.perPage || '12',
            minPrice: initialFilters?.minPrice || '',
            maxPrice: initialFilters?.maxPrice || '',
            sort: initialFilters?.sort?.toString() || 'price-asc',
        });
    }, [initialFilters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        
        // Update URL with new filters
        const params = new URLSearchParams();
        
        // Only include valid filter values in the URL
        Object.entries(newFilters).forEach(([key, val]) => {
            // Skip functions and empty values
            if (typeof val === 'function' || val === null || val === undefined) return;
            // Convert to string and trim whitespace
            const stringValue = String(val).trim();
            if (stringValue) {
                params.set(key, stringValue);
            }
        });
        
        // Ensure sort has a valid value
        const validSortValues = ['price-asc', 'price-desc', 'name-asc', 'name-desc'];
        if (params.has('sort') && !validSortValues.includes(params.get('sort')!)) {
            params.set('sort', 'price-asc');
        }
        
        router.get(`/catalog?${params.toString()}`, {}, {
            preserveState: true,
            only: ['products', 'filters']
        });
    };

    const resetFilters = () => {
        const resetFilters = {
            search: '',
            type: '',
            category: '',
            perPage: '12',
            minPrice: '',
            maxPrice: '',
            sort: 'price-asc',
        };
        
        setFilters(resetFilters);
        router.get('/catalog');
    };

    return (
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-7 py-7">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
                <div className={`rounded-lg bg-white p-6 shadow-md sticky top-32`}>
                    <div className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                        <h2 className="text-lg font-semibold">Filter</h2>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={resetFilters}
                                className="text-sm text-amber-600 hover:text-amber-700"
                            >
                                Reset
                            </button>
                            <ChevronDown className={`w-5 h-5 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
    
                    {/* Search */}
                    <div className="relative mt-3">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Cari produk..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        />
                    </div>

                    <div className={`space-y-6 pt-5 ${isFiltersOpen ? 'block' : 'hidden'}`}>
        
                        {/* Type Filter */}
                        <div>
                            <h3 className="mb-2 font-medium text-sm">Sewa/Jual</h3>
                            <select
                                name="type"
                                value={filters.type || ''}
                                onChange={handleFilterChange}
                                className="w-full rounded-lg border border-gray-300 p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            >
                                <option value="">Semua</option>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'sewa' ? 'Disewakan' : type === 'jual' ? 'Dijual' : 'Disewakan & Dijual'}
                                    </option>
                                ))}
                            </select>
                        </div>
        
                        {/* Category Filter */}
                        <div>
                            <h3 className="mb-2 font-medium text-sm">Kategori</h3>
                            <select
                                name="category"
                                value={filters.category || ''}
                                onChange={handleFilterChange}
                                className="w-full rounded-lg border border-gray-300 p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            >
                            <option value="">Semua Kategori</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                {category}
                                </option>
                            ))}
                            </select>
                        </div>
        
                        {/* Price Range */}
                        <div>
                            <h3 className="mb-2 font-medium text-sm">Rentang Harga</h3>
                            <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Min</label>
                                <input
                                type="number"
                                name="minPrice"
                                placeholder="Min"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="w-full rounded-lg border border-gray-300 p-2"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Max</label>
                                <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="w-full rounded-lg border border-gray-300 p-2"
                                />
                            </div>
                            </div>
                        </div>
        
                        {/* Sorting */}
                        <div>
                            <h3 className="mb-2 font-medium text-sm">Urutkan</h3>
                            <div className="relative">
                            <select
                                name="sort"
                                value={filters.sort || 'price-asc'}
                                onChange={handleFilterChange}
                                className="w-full rounded-lg border border-gray-300 p-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            >
                                <option value="price-asc">Harga Terendah</option>
                                <option value="price-desc">Harga Tertinggi</option>
                                <option value="name-asc">Nama A-Z</option>
                                <option value="name-desc">Nama Z-A</option>
                            </select>
                            <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Product Grid */}
            <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-600">
                        Menampilkan {products.length} dari {pagination.total} produk
                    </p>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Tampilkan per halaman:</span>
                        <select 
                            className="rounded-lg border border-gray-300 p-1.5 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                            value={String(filters.perPage || '12')}
                            onChange={(e) => handleFilterChange({
                                target: { name: 'perPage', value: e.target.value }
                            } as any)}
                        >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="48">48</option>
                        </select>
                    </div>
                </div>
    
                {products.length === 0 ? (
                    <div className="rounded-lg bg-white p-12 text-center shadow">
                        <h3 className="mb-2 text-lg font-medium">Produk tidak ditemukan</h3>
                        <p className="mb-4 text-gray-600">Coba ubah filter pencarian Anda</p>
                        <button
                            onClick={resetFilters}
                            className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.total > 0 && (
                            <div className="mt-8 flex items-center justify-center">
                                <nav className="flex items-center space-x-1">
                                    <button
                                        onClick={() => {
                                            const prevPage = Math.max(1, pagination.current_page - 1);
                                            if (prevPage !== pagination.current_page) {
                                                router.get(`/catalog?page=${prevPage}`, {}, {
                                                    preserveState: true,
                                                    only: ['products', 'filters']
                                                });
                                            }
                                        }}
                                        disabled={pagination.current_page === 1}
                                        className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                                            pagination.current_page === 1
                                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        &larr;
                                    </button>
                                    
                                    <span className="px-4 text-sm text-gray-500">
                                        Halaman {pagination.current_page}
                                    </span>
                                    
                                    <button
                                        onClick={() => {
                                            const nextPage = pagination.current_page + 1;
                                            router.get(`/catalog?page=${nextPage}`, {}, {
                                                preserveState: true,
                                                only: ['products', 'filters']
                                            });
                                        }}
                                        disabled={products.length < pagination.per_page}
                                        className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                                            products.length < pagination.per_page
                                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        &rarr;
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div> 
        </div>
    );
}

export default function CatalogPage({ products, categories, types, filters }: CatalogProps) {
    return (
        <FrontendLayout title="Katalog Produk">
            <Catalog products={products} categories={categories} types={types} filters={filters} />
        </FrontendLayout>
    );
}