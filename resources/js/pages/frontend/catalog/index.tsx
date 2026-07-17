import { Link, router, usePage } from '@inertiajs/react';
import { Filter, Search, ArrowUpDown, ChevronDown, X, ArrowRight, ArrowLeft, HandHeartIcon, LayoutDashboard, RotateCcw, SlidersHorizontal, Layers, ChevronRight, CircleDollarSign, CheckIcon, Check, FilterIcon, SearchIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useConfig } from '@/utils/config';
import type { Product } from '@/types';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import CatalogHeroBanner from '@/components/catalog-hero-banner';

interface CategoryOption {
    label: string;
    value: string;
    subcategories?: CategoryOption[];
}

export interface PaginationInfo {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from?: number;
    to?: number;
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


interface SidebarProps {
  categories: any[];
  currentFilters: {
    search?: string;
    type?: string;
    category?: string; // string berisi koma: "cat-1,cat-2"
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
  facets: {
    categories: Record<number | string, number>; // id/slug => total_product
    price_ranges: Array<{ label: string; min: number; max: number; count: number }>;
  };
  products: any; // Untuk mengambil total records jika diperlukan
}

interface CatalogProps {
    products: ApiResponse<Product>;
    bestSellerProducts: Product[];
    categories: CategoryOption[];
    types: string[];
    seo: SeoHeadProps;
    filters: {
        search?: string;
        type?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        perPage?: string | number;
    };
    facets: {
        categories: Record<string | number, number>; // Format: { "slug-kategori": total_produk } atau { id: total_produk }
        price_ranges: Array<{
            label: string;
            min: number;
            max: number;
            count: number;
        }>;
    };
}

interface FeaturedProductsBannerProps {
    products: Product[];
    autoScroll?: boolean;
}

export const FeaturedProductsBanner = ({
    products,
    autoScroll = true,
}: FeaturedProductsBannerProps) => {
    const featuredProducts = products.filter(
        (product) => product.is_featured
    );

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    // ⏱️ State penanda apakah jeda awal 3 detik sudah selesai
    const [isReady, setIsReady] = useState(false);

    // Lebar card produk (w-60 = 240px) + Gap (gap-4 = 16px) = 256px
    const cardStepWidth = 150; 

    // 1. EFEK JEDA AWAL (Delay 3 detik sebelum autoscroll aktif)
    useEffect(() => {
        // Jika autoscroll mati atau sedang di-hover, reset status ready ke false
        if (!autoScroll || isHovered) {
            setIsReady(false);
            return;
        }

        // Berikan jeda 3 detik sebelum mengizinkan interval berjalan
        const delayTimeout = setTimeout(() => {
            setIsReady(true);
        }, 5000);

        return () => clearTimeout(delayTimeout);
    }, [isHovered, autoScroll]);

    // 2. EFEK AUTOMATIC SLIDE (Hanya jalan jika isReady bernilai true)
    useEffect(() => {
        if (!isReady || featuredProducts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex >= featuredProducts.length - 1 ? 0 : prevIndex + 1;
                
                scrollContainerRef.current?.scrollTo({
                    left: nextIndex * cardStepWidth,
                    behavior: 'smooth'
                });

                return nextIndex;
            });
        }, 5000); // Interval perpindahan antar slide (3 detik)

        return () => clearInterval(interval);
    }, [isReady, featuredProducts.length]);

    // 3. Handler untuk mendeteksi perubahan index saat di-scroll MANUAL
    const handleScrollEvent = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrolledPosition = container.scrollLeft;
        const calculatedIndex = Math.round(scrolledPosition / cardStepWidth);
        
        if (calculatedIndex !== currentIndex && calculatedIndex < featuredProducts.length) {
            setCurrentIndex(calculatedIndex);
        }
    };

    // 4. Handler saat indikator dot diklik manual
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        scrollContainerRef.current?.scrollTo({
            left: index * cardStepWidth,
            behavior: 'smooth'
        });
    };

    if (featuredProducts.length === 0) {
        return null;
    }

    return (
        <div 
            className="overflow-hidden rounded-3xl transition-all duration-300 p-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* HEADER */}
            <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 select-none">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-tr animate-pulse from-orange-500 to-amber-400 p-2.5 text-white shadow-md shadow-orange-500/20">
                        <HandHeartIcon className="h-5 w-5" />
                    </div>

                    <div className="select-none">
                        <h3 className="text-sm 2xl:text-lg font-extrabold text-slate-100 mix-blend-difference">
                            Direkomendasikan Untukmu
                        </h3>
                        <p className="text-xs font-semibold text-slate-300 mix-blend-difference">
                            Unit terbaik yang dipilih khusus untuk Anda
                        </p>
                    </div>
                </div>

                {/* Indikator Dots */}
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {featuredProducts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    currentIndex === index ? 'w-4 bg-orange-500' : 'w-1.5 bg-slate-600'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1.5 text-xs font-semibold text-orange-600 backdrop-blur-sm">
                        {featuredProducts.length} Pilihan
                    </div>
                </div>
            </div>

            {/* SLIDER WRAPPER */}
            <div className="px-5 pb-5 pt-2">
                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScrollEvent}
                    className="flex gap-4 overflow-x-auto snap-x custom-scrollbar snap-mandatory scroll-smooth no-scrollbar"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="w-60 flex-shrink-0 snap-start transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-xl pb-2"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full px-5 justify-end pb-5">
                <Link className="text-xs font-bold hover:underline" href="/katalog">
                    Lihat Unit Lainnya
                </Link>
            </div>
        </div>
    );
};

function CatalogSidebarFacet({ categories = [], currentFilters, facets }: SidebarProps) {
    // 1. Ambil array kategori aktif dari string URL terpisah koma
    const activeCategories = currentFilters?.category 
        ? currentFilters.category.split(',').filter(Boolean) 
        : [];

    const activeMinPrice = currentFilters?.minPrice || '';
    const activeMaxPrice = currentFilters?.maxPrice || '';
    
    // 🔥 TAMBAHKAN INI: Tangkap query pencarian aktif dari filters backend atau parameter URL langsung
    const currentSearchQuery = currentFilters?.search || '';

    /* |--------------------------------------------------------------------------
    | SINKRONISASI REAKTIF: Paksa Filter Kategori Menyusut Mengikuti Search Query
    |--------------------------------------------------------------------------
    */
    const filteredCategories = categories.map((cat: any) => {
        // Saring sub-kategori
        const validSubcategories = (cat.subcategories || []).filter((child: any) => {
            const childCount = facets?.categories?.[child.value] || 0;
            const childIsChecked = activeCategories.includes(child.value);
            
            // Jika ada query search aktif, saring hanya yang count-nya > 0 atau sedang dicentang
            if (currentSearchQuery) {
                return childCount > 0 || childIsChecked;
            }
            return true; // Jika tidak ada search, tampilkan normal
        });

        const parentCount = facets?.categories?.[cat.value] || 0;
        const parentIsChecked = activeCategories.includes(cat.value);

        // Jika ada pencarian, bersihkan kategori induk yang kosong dari hasil filter
        if (currentSearchQuery) {
            if (parentCount > 0 || parentIsChecked || validSubcategories.length > 0) {
                return {
                    ...cat,
                    subcategories: validSubcategories
                };
            }
            return null;
        }

        // Kondisi default (tanpa search): Tampilkan seluruh struktur kategori utuh
        return {
            ...cat,
            subcategories: validSubcategories
        };
    }).filter(Boolean);

    // Handler Filter via Inertia URL state
    const handleCategoryCheck = (slug: string) => {
        const params = new URLSearchParams(window.location.search);
        let updatedCategories = [...activeCategories];

        if (updatedCategories.includes(slug)) {
            updatedCategories = updatedCategories.filter(item => item !== slug);
        } else {
            updatedCategories.push(slug);
        }

        if (updatedCategories.length > 0) {
            params.set('category', updatedCategories.join(','));
        } else {
            params.delete('category');
        }

        params.delete('page');

        // 🔥 TAMBAHKAN parameter search saat ini agar filter kategori tidak menghilangkan query pencarian
        const currentSearch = currentFilters?.search || params.get('search');
        if (currentSearch) {
            params.set('search', currentSearch);
        }

        router.get(`/katalog?${params.toString()}`, {}, { 
            preserveState: true, 
            replace: true,
            preserveScroll: true // Menjaga posisi scroll sidebar agar tidak melompat ke atas
        });
    };

    // Handler Filter Harga Tunggal
    const handlePriceFilter = (min: string, max: string) => {
        const params = new URLSearchParams(window.location.search);
        
        if (min) params.set('minPrice', min);
        else params.delete('minPrice');

        if (max) params.set('maxPrice', max);
        else params.delete('maxPrice');

        params.delete('page');

        // Pertahankan search query
        const currentSearch = currentFilters?.search || params.get('search');
        if (currentSearch) params.set('search', currentSearch);

        router.get(`/katalog?${params.toString()}`, {}, { preserveState: true, replace: true, preserveScroll: true });
    };

    return (
        <aside className="w-full bg-white border sticky top-24 border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-6 dark:bg-slate-800 dark:border-slate-700">
            
            {/* GROUP 1: LIST KATEGORI (CHECKLIST-BASED FACET) */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-700">
                    <Layers className="h-4 w-4 text-orange-500" />
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase">Kategori</h3>
                </div>

                <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
                    {/* Gunakan filteredCategories hasil saringan reaktif kita */}
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat: any, key: any) => {
                            const slug = cat.value;  
                            const name = cat.label;  
                            const isChecked = activeCategories.includes(slug);
                            const count = facets?.categories?.[slug] || 0;

                            return (
                                <div key={slug || key} className="flex flex-col gap-1">
                                    <label
                                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all select-none ${
                                            isChecked
                                                ? 'bg-orange-50/70 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                                                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 truncate pr-2">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleCategoryCheck(slug)}
                                                    className="sr-only"
                                                />
                                                <div className={`h-4 w-4 rounded-md border flex items-center justify-center transition-colors ${
                                                    isChecked 
                                                        ? 'bg-orange-500 border-orange-500 text-white' 
                                                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-orange-400'
                                                }`}>
                                                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                                                </div>
                                            </div>
                                            <span className="truncate">{name}</span>
                                        </div>
                                        
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            isChecked 
                                                ? 'bg-orange-500 text-white' 
                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                                        }`}>
                                            {count}
                                        </span>
                                    </label>

                                    {/* Render sub-kategori */}
                                    {cat.subcategories && cat.subcategories.length > 0 && (
                                        <div className="pl-2 flex flex-col gap-1 border-l border-slate-200 dark:border-slate-700 ml-5 mt-1 mb-2">
                                            {cat.subcategories.map((child: any, key2: any) => {
                                                const childSlug = child.value; 
                                                const childName = child.label; 
                                                const childIsChecked = activeCategories.includes(childSlug);
                                                const childCount = facets?.categories?.[childSlug] || 0;
                                                
                                                return (
                                                    <label 
                                                        key={childSlug || `${key}-${key2}`} 
                                                        className={`group flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] cursor-pointer transition-all ${
                                                            childIsChecked ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 truncate">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={childIsChecked} 
                                                                onChange={() => handleCategoryCheck(childSlug)} 
                                                                className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 h-3 w-3"
                                                            />
                                                            <span className="truncate text-xs font-medium pl-1">{childName}</span>
                                                        </div>
                                                        <span className="text-[11px] text-slate-400 font-bold">({childCount})</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-[11px] text-slate-400 text-center py-4 font-medium">
                            Tidak ada kategori yang cocok
                        </div>
                    )}
                </div>
            </div>

            {/* GROUP 2: LIST RANGE HARGA */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-700">
                    <CircleDollarSign className="h-4 w-4 text-orange-500" />
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase">Harga</h3>
                </div>

                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => handlePriceFilter('', '')}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                            activeMinPrice === '' && activeMaxPrice === ''
                                ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border-l-2 border-orange-500 rounded-l-none'
                                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                        }`}
                    >
                        <div className="flex items-center gap-2 truncate">
                            {activeMinPrice === '' && activeMaxPrice === '' ? (
                                <Check className="h-3 w-3 text-orange-500 stroke-[3]" />
                            ) : (
                                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 ml-1" />
                            )}
                            <span>Semua Harga</span>
                        </div>
                    </button>

                    {facets?.price_ranges?.map((range, index) => {
                        const minStr = Math.round(range.min).toString();
                        const maxStr = Math.round(range.max).toString();
                        const isSelected = activeMinPrice === minStr && activeMaxPrice === maxStr;

                        return (
                            <button
                                key={index}
                                disabled={range.count === 0}
                                onClick={() => handlePriceFilter(minStr, maxStr)}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all disabled:opacity-40 disabled:pointer-events-none ${
                                    isSelected
                                        ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border-l-2 border-orange-500 rounded-l-none'
                                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                                }`}
                            >
                                <div className="flex items-center gap-2 truncate pr-2">
                                    {isSelected ? (
                                        <Check className="h-3 w-3 shrink-0 text-orange-500 stroke-[3]" />
                                    ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 ml-1 shrink-0" />
                                    )}
                                    <div className="flex flex-col truncate">
                                        <span>{range.label}</span>
                                        <span className="text-[10px] text-slate-400 font-medium normal-case">
                                            Rp {Math.round(range.min).toLocaleString('id-ID')} - Rp {Math.round(range.max).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300 shrink-0">
                                    {range.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

        </aside>
    );
}

function Catalog({products: initialProducts, bestSellerProducts, categories, types, seo, facets, ...props }: CatalogProps) {
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
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] =
    useState(false);

    const { getConfig } = useConfig();

    // Product Skeleton Component
    const ProductSkeleton = () => (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
            <div className="aspect-square w-full rounded-md bg-gray-200 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                </div>
            </div>
        </div>
    );
    
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

    // Reset loading state when products are updated
    useEffect(() => {
        if (products && products.length >= 0) {
            setIsLoading(false);
        }
    }, [products]);

    const applyFilters = () => {
        setIsLoading(true); // Show skeleton loading
        // Update URL with new filters
        const params = new URLSearchParams();
        
        // Only include valid filter values in the URL
        Object.entries(filters).forEach(([key, val]) => {
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
        
        setHasChanges(false);
        router.get(`/katalog?${params.toString()}`, {}, {
            preserveState: true,
            only: ['products', 'filters', 'categories', 'facets'],
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
        setHasChanges(false);
        router.get('/katalog');
    };

    const renderDesktopFilters = () => {
        const [isSticky, setIsSticky] = useState(true);
        const observerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setIsSticky(!entry.isIntersecting);
                },
                { 
                    rootMargin: '-80px 0px 0px 0px', 
                    threshold: [1] 
                }
            );

            if (observerRef.current) {
                observer.observe(observerRef.current);
            }

            return () => {
                if (observerRef.current) {
                    observer.unobserve(observerRef.current);
                }
            };
        }, []);
        return (
            <>
                {/* Element Sentinel kecil untuk memicu deteksi Intersection Observer */}
                <div className={`fixed w-full z-40 -top-2 hidden border bg-white p-5 shadow-sm transition-all duration-300 lg:block
                    ${isSticky 
                        ? 'border-slate-200 bg-white/90 backdrop-blur-md shadow-md rounded-t-none border-t-0' 
                        : 'border-slate-300/40 hover:shadow-md'
                    }`}
                >
                    {/* DEFAULT VIEW (TOP BAR) */}
                    <div className="flex items-center gap-4">
                        
                        {/* TEXT KATALOG: Muncul otomatis dengan animasi transisi yang mulus hanya saat Sticky */}
                        <div className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                            isSticky ? 'w-35 opacity-100' : 'w-0 opacity-0'
                        }`}>
                            <span className="text-lg font-black tracking-tight text-slate-800 uppercase border-r-2 border-orange-500 pr-3">
                                ASKI Katalog
                            </span>
                        </div>
                        
                        {/* SEARCH BAR (Mengambil space terbesar) */}
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-orange-500" />
                            <input
                                type="text"
                                placeholder="Cari kontainer di sini..."
                                value={filters.search}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        applyFilters();
                                    }
                                }}
                                onChange={(e) => {
                                    setFilters(prev => ({ ...prev, search: e.target.value }));
                                    setHasChanges(true);
                                }}
                                className="h-11 w-full rounded-xl border-2 border-slate-300 bg-slate-50/50 pl-11 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            />
                        </div>

                        {/* Tombol Terapkan */}
                        {
                            (filters.category || 
                            filters.type || 
                            filters.minPrice || 
                            filters.maxPrice) && (
                                <button
                                    onClick={applyFilters}
                                    disabled={!hasChanges}
                                    className={`inline-flex h-10 items-center rounded-xl px-6 text-sm font-bold transition-all duration-200 shadow-sm ${
                                        hasChanges
                                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-95 hover:shadow-md hover:shadow-orange-500/10'
                                            : 'cursor-not-allowed bg-orange-300 text-orange-500 shadow-none'
                                    }`}
                                >
                                    <SearchIcon className="h-4 w-4 mr-1" /> Terapkan Filter
                                </button>
                            )
                        }

                        {/* RESET BUTTON */}
                        {
                            (filters.search || 
                            filters.category || 
                            filters.type || 
                            filters.minPrice || 
                            filters.maxPrice) && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex h-11 w-auto px-5 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition-colors hover:bg-red-100 active:scale-95 text-sm"
                                    title="Reset Filter"
                                >
                                    <RotateCcw className="h-4 w-4 mr-1" /> Reset
                                </button>
                            )
                        }

                        {/* CONTROLLER ACTION BUTTONS */}
                        <div className="flex items-center gap-2 border-l border-slate-300 pl-4">
                            {/* Tombol Toggle Advance Filter */}
                            <button
                                type="button"
                                onClick={() => setIsFiltersOpen(prev => !prev)}
                                className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 ${
                                    isFiltersOpen 
                                        ? 'border-orange-200 bg-orange-50 text-orange-600' 
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <FilterIcon className="h-4 w-4" />
                                <span></span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* ADVANCED FILTER PANEL (COLLAPSIBLE) */}
                    {isFiltersOpen && (
                        <div className="mt-5 animate-fadeIn border-t border-slate-100 pt-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

                                {/* ADVANCED: TYPE */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipe</label>
                                    <select
                                        value={filters.type || ''}
                                        onChange={(e) => {
                                            setFilters(prev => ({ ...prev, type: e.target.value }));
                                            setHasChanges(true);
                                        }}
                                        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                                    >
                                        <option value="">Semua Tipe</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type === 'rent' ? '🏢 Disewakan' : type === 'sell' ? '🏷️ Dijual' : '🔄 Disewakan & Dijual'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ADVANCED: SORT */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Urutkan</label>
                                    <div className="relative">
                                        <select
                                            value={filters.sort || 'price-asc'}
                                            onChange={(e) => {
                                                setFilters(prev => ({ ...prev, sort: e.target.value }));
                                                setHasChanges(true);
                                            }}
                                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                                        >
                                            <option value="price-asc">Harga Terendah</option>
                                            <option value="price-desc">Harga Tertinggi</option>
                                            <option value="name-asc">Nama A-Z</option>
                                            <option value="name-desc">Nama Z-A</option>
                                        </select>
                                        <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </div>

                                {/* ADVANCED: MIN PRICE */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga Minimum</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Rp</span>
                                        <input
                                            type="number"
                                            value={filters.minPrice}
                                            onChange={(e) => {
                                                setFilters(prev => ({ ...prev, minPrice: e.target.value }));
                                                setHasChanges(true);
                                            }}
                                            placeholder="0"
                                            className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                                        />
                                    </div>
                                </div>

                                {/* ADVANCED: MAX PRICE */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga Maksimum</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Rp</span>
                                        <input
                                            type="number"
                                            value={filters.maxPrice}
                                            onChange={(e) => {
                                                setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
                                                setHasChanges(true);
                                            }}
                                            placeholder="Tak terbatas"
                                            className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                                        />
                                    </div>
                                </div>

                                {/* ADVANCED: PER PAGE & RESET */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tampilkan</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={String(filters.perPage || '12')}
                                            onChange={(e) => {
                                                setFilters(prev => ({ ...prev, perPage: e.target.value }));
                                                setHasChanges(true);
                                            }}
                                            className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 outline-none transition focus:border-orange-400"
                                        >
                                            <option value="12">12 Item</option>
                                            <option value="24">24 Item</option>
                                            <option value="48">48 Item</option>
                                            <option value="100">100 Item</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    };

    const renderMobileFilters = () => {
        return (
            <>
                {/* STICKY CONTAINER FOR MOBILE ACTIVE CONTROLS */}
                <div className="fixed top-0 z-40 w-full bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 lg:hidden flex items-center gap-3 transition-all duration-300">
                    
                    {/* 1. SEARCH FORM (Mengambil sisa ruang horizontal yang ada) */}
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            applyFilters();
                        }}
                        className="flex flex-1 gap-2"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                            <input
                                type="text"
                                placeholder="Cari unit kontainer, tipe..."
                                value={filters.search}
                                onChange={(e) => {
                                    setFilters(prev => ({ ...prev, search: e.target.value }));
                                    setHasChanges(true);
                                }}
                                className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-2xs"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!filters.search && !hasChanges}
                            className={`h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center gap-1.5 shrink-0 ${
                                filters.search || hasChanges
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            <span><SearchIcon className='w-4 h-4'/></span>
                        </button>
                    </form>

                    {/* 2. VERTICAL DIVIDER (Garis pembatas halus di tengah) */}
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

                    {/* 3. FILTER BUTTON TOGGLE (Tetap proporsional di sisi kanan) */}
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs active:scale-95 transition-all shrink-0"
                        aria-label="Buka Filter"
                    >
                        <Filter className="h-4 w-4 text-orange-500" />
                    </button>
                    
                </div>

                {/* DRAWER / SIDEBAR MOBILE */}
                <div
                    className={`fixed inset-0 z-50 lg:hidden ${
                        isMobileFilterOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                >
                    {/* OVERLAY */}
                    <div
                        onClick={() => setIsMobileFilterOpen(false)}
                        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
                            isMobileFilterOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    />

                    {/* CONTENT SIDEBAR */}
                    <div
                        className={`absolute right-0 top-0 flex h-full w-[85%] max-w-[360px] flex-col bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-out ${
                            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        {/* HEADER (Fixed Top Inside Drawer) */}
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white">Filter Lanjutan</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Sesuaikan spesifikasi kriteria</p>
                            </div>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* SCROLLABLE FILTER FORM */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
                            
                            {/* 1. CATEGORY FILTER */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kategori Unit</label>
                                <CategoryFilter
                                    categories={categories}
                                    selectedCategory={filters.category}
                                    onCategoryChange={(value) => {
                                        setFilters(prev => ({ ...prev, category: value }));
                                        setHasChanges(true);
                                    }}
                                    placeholder="Semua Kategori"
                                />
                            </div>

                            {/* 2. TYPE FILTER */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tipe Transaksi</label>
                                <select
                                    value={filters.type || ''}
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, type: e.target.value }));
                                        setHasChanges(true);
                                    }}
                                    className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-orange-500"
                                >
                                    <option value="">Semua Tipe</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type === 'rent' ? '🏢 Disewakan / Rent' : type === 'sell' ? '🏷️ Dijual / Outright Sale' : '🔄 Disewakan & Dijual'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 3. SORT FILTER */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Urutan Tampilan</label>
                                <div className="relative">
                                    <select
                                        value={filters.sort || 'price-asc'}
                                        onChange={(e) => {
                                            setFilters(prev => ({ ...prev, sort: e.target.value }));
                                            setHasChanges(true);
                                        }}
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-orange-500"
                                    >
                                        <option value="price-asc">Harga Terendah</option>
                                        <option value="price-desc">Harga Tertinggi</option>
                                        <option value="name-asc">Nama A-Z</option>
                                        <option value="name-desc">Nama Z-A</option>
                                    </select>
                                    <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                </div>
                            </div>

                            {/* 4. PRICE RANGE (MIN - MAX) */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Rentang Budget (Rp)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        value={filters.minPrice}
                                        onChange={(e) => {
                                            setFilters(prev => ({ ...prev, minPrice: e.target.value }));
                                            setHasChanges(true);
                                        }}
                                        placeholder="Minimal"
                                        className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm font-medium outline-none focus:border-orange-400 dark:text-white"
                                    />
                                    <input
                                        type="number"
                                        value={filters.maxPrice}
                                        onChange={(e) => {
                                            setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
                                            setHasChanges(true);
                                        }}
                                        placeholder="Maksimal"
                                        className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm font-medium outline-none focus:border-orange-400 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* 5. PER PAGE */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Limit Muat Produk</label>
                                <select
                                    value={String(filters.perPage || '12')}
                                    onChange={(e) => {
                                        setFilters(prev => ({ ...prev, perPage: e.target.value }));
                                        setHasChanges(true);
                                    }}
                                    className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-orange-500"
                                >
                                    <option value="12">Muat 12 Unit</option>
                                    <option value="24">Muat 24 Unit</option>
                                    <option value="48">Muat 48 Unit</option>
                                </select>
                            </div>
                        </div>

                        {/* STICKY BOTTOM ACTIONS */}
                        <div className="absolute bottom-0 left-0 flex w-full gap-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                            <button
                                type="button"
                                onClick={() => {
                                    resetFilters();
                                    setIsMobileFilterOpen(false);
                                }}
                                className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 text-red-500 active:bg-red-100 dark:active:bg-red-950/40 transition-colors"
                                title="Reset Semua"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => {
                                    applyFilters();
                                    setIsMobileFilterOpen(false);
                                }}
                                disabled={!hasChanges}
                                className={`flex-1 h-12 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-[0.98] ${
                                    hasChanges
                                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                                        : 'cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                                }`}
                            >
                                Terapkan Pencarian
                            </button>
                        </div>
                    </div>
                </div>
            </>    
        )
    };

    return (
        <div className="relative bg-white relative dark:bg-gray-800 mx-auto pb-7">
            
            {renderDesktopFilters()}

            {/* --- HERO HEADER SECTION --- */}
            <div className="relative my-3 mx-2 overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 md:rounded-3xl md:p-10 lg:p-16">
                {/* Dekorasi Grid Halus di Background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* 
                    CONDITIONAL GRID WRAPPER
                    Jika ada best seller: gunakan grid 10 kolom di layar desktop (3 kolom untuk teks = 30%, 70% sisanya untuk banner)
                    Jika tidak ada: biarkan flex/block biasa agar teks otomatis mengambil space 100%
                */}
                <div className={`relative z-10 w-full ${
                    bestSellerProducts.length > 0 
                        ? 'grid grid-cols-1 gap-8 lg:grid-cols-10 lg:items-center lg:gap-12' 
                        : 'block'
                }`}>
                    
                    {/* Konten Utama Header 
                        Jika ada banner: mengambil 3 dari 10 kolom (30%)
                        Jika tidak ada banner: mengambil 10 kolom penuh (100%)
                    */}
                    <div className={bestSellerProducts.length > 0 ? 'lg:col-span-4' : 'w-full max-w-4xl'}>
                        <span className="inline-block text-xs xl:text-sm font-semibold tracking-wider text-orange-400 uppercase mb-3 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                            {getConfig('site_name', 'Alumoda Sinergi Kontainer Indonesia')}
                        </span>
                        
                        <h1 className="text-2xl md:text-3xl xl:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-sm leading-tight">
                            {getConfig('catalog_meta_title', 'Katalog Jual, Sewa & Custom Kontainer')}
                        </h1>
                        
                        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mb-4"></div>
                        
                        <p className="text-xs md:text-sm lg:text-base text-slate-300 font-medium leading-relaxed">
                            {getConfig('catalog_meta_description', 'Menyediakan berbagai unit kontainer berkualitas tinggi dari bermacam grade untuk kebutuhan bisnis, logistik, dan ruang modular Anda.')}
                        </p>
                    </div>

                    {/* BANNER PRODUK UNGGULAN 
                        Mengambil 7 dari 10 kolom sisanya (70%)
                    */}
                    {bestSellerProducts.length > 0 && (
                        <div className="w-full lg:col-span-6">
                            <FeaturedProductsBanner products={bestSellerProducts} />
                        </div>
                    )}
                    
                </div>
                
                {/* Efek Cahaya Dekoratif di Sudut Kanan Atas */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Filter Drawer Khusus Mobile */}
            {renderMobileFilters()}

            <CatalogHeroBanner/>
            
            {/* CORE LAYOUT: SIDEBAR (KIRI) & GRID PRODUK (KANAN) */}
            <div className="flex px-2 flex-col lg:flex-row gap-4 items-start mt-3">
                
                {/* 1. SIDEBAR FACADE (Hanya muncul di Desktop) */}
                <div className="hidden lg:block w-72 shrink-0">
                    <CatalogSidebarFacet 
                        categories={categories}
                        currentFilters={filters}
                        facets={facets}
                        products={products}
                    />
                </div>
                
                {/* 2. AREA GRID PRODUK */}
                <div className="flex-1 w-full" id="catalog-product-list">

                    {/* META BAR: INFORMASI STOK & DROPDOWN PER PAGE */}
                        
                    <div className="mb-6 flex flex-col md:flex-row gap-2 items-center justify-between bg-slate-50 border border-slate-100 rounded-xl p-4 dark:bg-slate-900/50 dark:border-slate-700">
                        <p className="text-gray-600 dark:text-gray-200 text-xs md:text-sm font-medium">
                            Menampilkan <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> dari <span className="font-bold text-slate-900 dark:text-white">{pagination.total}</span> produk
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tampilkan per halaman:</span>
                            <select 
                                className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                                value={String(filters.perPage || '12')}
                                onChange={(e) => {
                                    const nextPerPage = e.target.value;
                                    const newFilters = { ...filters, perPage: nextPerPage };
                                    setFilters(newFilters);
                                    setIsLoading(true);
                                    
                                    const params = new URLSearchParams();
                                    Object.entries(newFilters).forEach(([k, v]) => {
                                        if (v) params.append(k, String(v));
                                    });
                                    
                                    router.get(`/katalog?${params.toString()}`, {}, {
                                        preserveState: true,
                                        only: ['products', 'filters']
                                    });
                                }}
                            >
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>

                    {/* CONDITION: VIEW DATA GRID / SKELETON */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: parseInt(filters.perPage) || 12 }).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="rounded-2xl bg-white border-2 border-dashed border-slate-200 p-12 min-h-[50vh] flex items-center justify-center flex-col text-center dark:bg-slate-900/20 dark:border-slate-700">
                            <LayoutDashboard className="mx-auto mb-4 h-16 w-16 text-orange-400" />
                            <h3 className="mb-2 text-lg font-bold">Produk tidak ditemukan</h3>
                            <p className="mb-4 text-sm text-gray-500 max-w-xs">Coba ubah kata kunci atau setelan filter pada sidebar Anda</p>
                            <button
                                onClick={resetFilters}
                                className="rounded-xl bg-orange-500 px-5 py-2 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
                            >
                                Reset Filter
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard key={product.slug} product={product} />
                                ))}
                            </div>

                            {/* NAVIGASI PAGINATION */}
                            {pagination.total > 0 && (
                                <div className="mt-10 flex items-center justify-center">
                                    <nav className="flex items-center space-x-1">
                                        <button
                                            onClick={() => {
                                                const prevPage = Math.max(1, pagination.current_page - 1);
                                                if (prevPage !== pagination.current_page) {
                                                    router.get(`/katalog?page=${prevPage}`, {}, {
                                                        preserveState: true,
                                                        only: ['products', 'filters']
                                                    });
                                                }
                                            }}
                                            disabled={pagination.current_page === 1}
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                                                pagination.current_page === 1
                                                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700'
                                                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                        </button>
                                        
                                        <span className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Halaman {pagination.current_page}
                                        </span>
                                        
                                        <button
                                            onClick={() => {
                                                const nextPage = pagination.current_page + 1;
                                                router.get(`/katalog?page=${nextPage}`, {}, {
                                                    preserveState: true,
                                                    only: ['products', 'filters']
                                                });
                                            }}
                                            disabled={products.length < pagination.per_page}
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                                                products.length < pagination.per_page
                                                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700'
                                                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage({ products, bestSellerProducts, categories, types, filters, seo, facets }: CatalogProps) {
    return (
        <FrontendLayout>
            <SeoHead
                title={seo?.title}
                description={seo?.description}
                image={seo?.image}   
                keywords={seo?.keywords}
                contentType={seo.contentType || 'website'}
            />

            {/* --- CORE CATALOG SECTION --- */}
            <Catalog 
                products={products} 
                bestSellerProducts={bestSellerProducts} 
                categories={categories} 
                types={types} 
                filters={filters} 
                seo={seo}
                facets={facets}
            />
        </FrontendLayout>
    );
}