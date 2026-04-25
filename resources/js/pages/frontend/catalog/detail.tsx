import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield, RefreshCw, X, Phone, AlertCircle, Info, Building2, User, Mail, Clock, InfoIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useWishlist } from '@/hooks/useWishlist';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { handleImageError } from '@/utils/image';
import { formatPrice } from '@/utils/currency';
import { useConfig } from '@/utils/config';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SingleGalleryPreview from '@/components/single-gallery-preview';

type OrderFormData = {
  companyName: string;
  picName: string;
  phone: string;
  email: string;
  notes?: string;
};

interface Specification {
    [key: string]: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    category: string;
    brand?: string;
    price: number;
    show_price: boolean;
    compare_at_price?: number;
    stock: number | null;
    image: string;
    description: string;
    short_description?: string;
    sku?: string;
    barcode?: string;
    is_bestseller?: boolean;
    is_new?: boolean;
    is_featured?: boolean;
    is_for_sell?: boolean;
    is_rent?: boolean;
    images: ProductImage[];
    tags: string[];
}

interface ProductImage {
    id: number;
    path: string;
    is_cover: boolean;
    position: number;
}

interface RelatedProduct {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: number;
    show_price: boolean;
    stock: number | null;
    image: string;
    description: string;
    is_bestseller?: boolean;
    is_new?: boolean;
    is_for_sell?: boolean;
    is_rent?: boolean;
}

interface DetailProps {
    product: Product;
    relatedProducts: RelatedProduct[];
    siteconfig: any;
}

interface ImagesGalleryPreview {
    original: string;
    thumbnail: string;
}

export default function Detail({ product, relatedProducts, siteconfig }: DetailProps) {
    const { getConfig } = useConfig();
    const [quantity, setQuantity] = useState(1);
    const [productImages, setProductImages] = useState<ImagesGalleryPreview[]>([]);
    const [selectedImage, setSelectedImage] = useState(
        product.images.find(img => img.is_cover)?.path || product.images[0]?.path || product.image
    );
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    const [imageSrc, setImageSrc] = useState(
        product.images.find(img => img.is_cover)?.path || product.images[0]?.path || product.image
    );

    // Effect untuk mengolah product images dari database
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            const formattedImages = product.images.map(img => ({
                original: img.path,
                thumbnail: img.path
            }));
            setProductImages(formattedImages);
        } else if (product.image) {
            // Fallback jika tidak ada images array tapi ada single image
            setProductImages([{
                original: product.image,
                thumbnail: product.image
            }]);
        }
    }, [product.images, product.image]);


    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState<OrderFormData>({
        companyName: '',
        picName: '',
        phone: '',
        email: '',
        notes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Frontend validation
        if (!formData.companyName.trim()) {
            alert('Nama Perusahaan/Instansi/Pribadi wajib diisi');
            return;
        }
        if (!formData.picName.trim()) {
            alert('Nama PIC wajib diisi');
            return;
        }
        if (!formData.phone.trim()) {
            alert('Nomor Telepon/WhatsApp wajib diisi');
            return;
        }
        if (!formData.email.trim()) {
            alert('Email wajib diisi');
            return;
        }
        if (quantity < 1) {
            alert('Jumlah pesanan minimal 1');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await axios.post('/catalog/order', {
                company_name: formData.companyName || '',
                pic_name: formData.picName || '',
                phone: formData.phone || '',
                email: formData.email || '',
                notes: formData.notes || '',
                product_id: product.id,
                quantity: quantity,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (window as any).csrfToken || '',
                },
            });

            if (response.data.success) {
                // Show success modal
                // Reset form
                setQuantity(1);
                setIsOrderModalOpen(false);
                setIsSuccessModalOpen(true);
                
                setFormData({
                    companyName: '',
                    picName: '',
                    phone: '',
                    email: '',
                    notes: ''
                });
            } else {
                throw new Error(response.data.message || 'Failed to submit order');
            }
        } catch (error) {
            console.error('Order submission error:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    // Handle validation errors
                    const errors = error.response.data.errors;
                    let errorMessage = 'Validasi gagal:\n';
                    Object.entries(errors).forEach(([field, messages]) => {
                        errorMessage += `- ${Array.isArray(messages) ? messages.join(', ') : messages}\n`;
                    });
                    alert(errorMessage);
                } else {
                    alert(error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.');
                }
            } else {
                alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.');
            }
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 2000);
        }
    };
    
    // Get wishlist state and actions
    const { isInWishlist, toggleWishlistItem, wishlist } = useWishlist();

    useEffect(() => {
        setImageSrc(selectedImage);
        setIsImageLoaded(false);
        
        const img = new Image();
        img.src = selectedImage;
        
        const onLoad = () => setIsImageLoaded(true);
        const onError = () => handleImageError({ target: img } as any, '/images/placeholder.png', product.name);
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        
        return () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
    }, [selectedImage, product.name]);

    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value;
        // Only check stock limit if track_quantity is enabled (stock is not null)
        if (newQuantity > 0 && (product.stock === null || newQuantity <= product.stock)) {
            setQuantity(newQuantity);
        }
    };

    return (
        <FrontendLayout title={product.name}>

            <Head title={`${product.name} - ${getConfig('site_name', 'Alumoda Sinergi Kontainer')}`}>
                {/* 1. Meta Tag Dasar */}
                <meta name="description" content={product.description || getConfig('meta_description', 'Jual & Sewa Kontainer kualitas terbaik di PT. Alumoda Sinergi Kontainer Indonesia.')} />
                <meta name="keywords" content={`${product.name}, jual kontainer, sewa kontainer, ${getConfig('meta_keywords')}`} />
                <meta name="author" content={getConfig('site_name', 'Alumoda Sinergi Kontainer')} />
                
                {/* 2. Canonical (Sangat Penting agar tidak dianggap konten duplikat) */}
                <link rel="canonical" href={`https://alumodasinergi.com/catalog/${product.slug}`} />

                {/* 3. Open Graph / Facebook (Agar tampil bagus saat di-share di WA/FB) */}
                <meta property="og:type" content="product" />
                <meta property="og:title" content={`${product.name} - Alumoda Sinergi Kontainer`} />
                <meta property="og:description" content={product.short_description || "Dapatkan penawaran harga terbaik untuk unit kontainer ini."} />
                <meta property="og:image" content={imageSrc || '/default-share-image.jpg'} />
                <meta property="og:url" content={`https://alumodasinergi.com/catalog/${product.slug}`} />

                {/* 4. Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.name} />
                <meta name="twitter:image" content={imageSrc} />

                {/* 5. Robots Tag */}
                <meta name="robots" content="index, follow" />
            </Head>
            
            <div className='dark:bg-gray-800'>
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex max-w-xl md:max-w-full overflow-auto" aria-label="Breadcrumb">
                        <ol className="inline-flex flex-nowrap text-nowrap items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-700 hover:text-primary">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-500">/</span>
                                    <Link href="/catalog" className="text-gray-700 hover:text-primary">
                                        Katalog
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-500">/</span>
                                    <span className="text-gray-500">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    {/* Product Section */}
                    <div className="lg:flex lg:gap-12">
                        {/* Product Images - Sticky on scroll for better UX */}
                        <div className="lg:w-1/2 lg:sticky lg:top-8 h-fit">
                            <SingleGalleryPreview images={productImages} />
                        </div>

                        {/* Product Info */}
                        <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col">
                            {/* Header: Badge & Title */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {product.is_new && (
                                        <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Baru</span>
                                    )}
                                    {product.is_bestseller && (
                                        <span className="bg-orange-100 text-orange-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Terlaris</span>
                                    )}
                                </div>
                                
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                                    {product.name}
                                </h1>
                                
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                        {product.is_for_sell && product.is_rent ? 'Jual & Sewa' : product.is_rent ? 'Hanya Sewa' : 'Dijual'}
                                    </span>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                    <span className={`text-sm ${product.stock && product.stock > 0 ? 'text-gray-500' : 'text-red-500 font-medium'}`}>
                                        {product.stock !== null ? `Tersedia ${product.stock} unit` : 'Stok Tersedia'}
                                    </span>
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                {product.show_price ? (
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900 mb-1">Harga Terbaik</span>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-black text-primary dark:text-orange-400">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && (
                                                <span className="text-lg text-gray-400 line-through decoration-red-400">
                                                    {formatPrice(product.compare_at_price)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-start gap-2 text-gray-500 dark:text-gray-400">
                                            <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
                                            <p className="text-xs leading-normal">
                                                Harga tidak mengikat. Dapatkan estimasi biaya resmi dan jadwal ketersediaan dengan mengeklik <span className="text-primary font-semibold italic">"Pesan Sekarang"</span>.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <Phone className="h-5 w-5" />
                                        <span className="text-lg font-bold">Hubungi kami untuk penawaran</span>
                                    </div>
                                )}
                            </div>

                            {/* Short Description */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Deskripsi Singkat</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {product.short_description || product.description}
                                </p>
                            </div>

                            {/* Selection & Actions */}
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                                    {/* Quantity */}
                                    <div className="w-32">
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Jumlah</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                                            <button 
                                                onClick={() => handleQuantityChange(-1)}
                                                className="w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                                            >-</button>
                                            <input 
                                                type="text" 
                                                value={quantity} 
                                                readOnly 
                                                className="w-12 h-10 border-x border-gray-300 text-center font-bold text-gray-900 bg-white"
                                            />
                                            <button 
                                                onClick={() => handleQuantityChange(1)}
                                                className="w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* Primary Buttons */}
                                    <div className="flex-1 flex gap-3">
                                        <button
                                            onClick={() => setIsOrderModalOpen(true)}
                                            className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            Pesan Sekarang
                                        </button>
                                        <button
                                            onClick={() => toggleWishlistItem({ 
                                            id: product.id, 
                                            name: product.name, 
                                            price: product.price, 
                                            image: imageSrc, 
                                            slug: product.slug 
                                        })}
                                            className="h-12 w-12 flex items-center justify-center rounded-lg border-2 border-gray-100 hover:bg-red-50 hover:border-red-100 transition-all group"
                                        >
                                            <Heart
                                                className={`h-6 w-6 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tags/Keywords */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="text-[11px] font-medium px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 cursor-default transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detail Produk</h2>
                        <div className="mt-6 overflow-hidden border-t border-gray-200 dark:border-gray-600">
                            <dl className="divide-y divide-gray-200 dark:divide-gray-600">
                                {product.brand && (
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Merek</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                            {product.brand}
                                        </dd>
                                    </div>
                                )}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                        {product.is_for_sell && product.is_rent ? 'Dijual & Disewakan' : product.is_for_sell ? 'Dijual' : product.is_rent ? 'Disewakan' : '-'}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                        {product.category}
                                    </dd>
                                </div>
                            </dl>

                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Deskripsi Produk</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Produk Terkait</h2>
                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Order Modal */}
            <Dialog open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} className="relative z-50">
                {/* Backdrop dengan blur lebih halus */}
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh]">
                        
                        {/* SISI KIRI: Ringkasan Produk (Review) */}
                        <div className="w-full md:w-5/12 bg-slate-50 dark:bg-gray-800/50 p-6 md:p-8 border-r border-gray-100 dark:border-gray-800 overflow-y-auto">
                            <div className="sticky top-0">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
                                    Detail Pesanan
                                </h3>
                                
                                <div className="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-2 mb-6">
                                    <img 
                                        src={imageSrc} 
                                        alt={product.name} 
                                        className="w-full h-48 object-cover rounded-lg"
                                        onError={(e) => handleImageError(e, '/images/placeholder-product.svg', product.name)}
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h4>
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded shadow-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Pricing Display */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Harga Satuan</span>
                                        <span className="font-medium dark:text-gray-300">{product.show_price ? formatPrice(product.price) : 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Jumlah</span>
                                        <span className="font-medium dark:text-gray-300">x {quantity}</span>
                                    </div>
                                    <div className="pt-3 border-t border-dashed border-gray-300 dark:border-gray-700">
                                        {product.show_price ? (
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-900 dark:text-white text-lg">Total Estimasi</span>
                                                <span className="text-xl font-black text-primary dark:text-orange-400">
                                                    {formatPrice(product.price * quantity)}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs leading-relaxed flex gap-2">
                                                <Info className="h-4 w-4 shrink-0" />
                                                <span>Harga final akan dikonfirmasi via WhatsApp oleh tim kami.</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Policy Note */}
                                <div className="mt-8 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                                    <span className="flex items-center gap-2 font-bold text-xs text-orange-700 dark:text-orange-400 mb-2 italic">
                                        <AlertCircle className="h-3 w-3" /> Informasi Penting
                                    </span>
                                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-orange-800/80 dark:text-orange-300/70">
                                        <li>Harga dapat berubah sewaktu-waktu mengikuti stok.</li>
                                        <li>Pemesanan ini bersifat pengajuan (order request).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* SISI KANAN: Form Input */}
                        <div className="w-full md:w-7/12 p-6 md:p-8 bg-white dark:bg-gray-900 overflow-y-auto relative">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">Formulir Kontak</DialogTitle>
                                    <p className="text-sm text-gray-500 mt-1">Lengkapi data untuk memproses pesanan Anda.</p>
                                </div>
                                <button 
                                    onClick={() => setIsOrderModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                            
                            <form onSubmit={(e) => { e.preventDefault(); onSubmit(e); }} className="space-y-5">
                                {/* Quantity Selector Modern */}
                                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-700">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tentukan Jumlah</label>
                                    <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden">
                                        <button type="button" onClick={() => handleQuantityChange(-1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">-</button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-12 text-center text-sm font-bold border-x border-gray-200 dark:border-gray-700 bg-transparent dark:text-white focus:outline-none"
                                        />
                                        <button type="button" onClick={() => handleQuantityChange(1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">+</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-5">
                                        {/* Nama Instansi */}
                                        <div className="space-y-2">
                                            <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Nama Instansi / Pribadi *
                                            </Label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input 
                                                    id="companyName"
                                                    name="companyName"
                                                    placeholder="Contoh: PT. Maju Bersama"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="pl-10 focus-visible:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Nama PIC */}
                                            <div className="space-y-2">
                                                <Label htmlFor="picName" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Nama PIC *
                                                </Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input 
                                                        id="picName"
                                                        name="picName"
                                                        placeholder="Nama lengkap Anda"
                                                        value={formData.picName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="pl-10 focus-visible:ring-primary"
                                                    />
                                                </div>
                                            </div>

                                            {/* WhatsApp / HP */}
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    WhatsApp / HP *
                                                </Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input 
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="0812xxxx"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="pl-10 focus-visible:ring-primary"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Alamat Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Alamat Email *
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input 
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="nama@email.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="pl-10 focus-visible:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="notes" className="block text-[12px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes || ''}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm transition-all shadow-sm"
                                            placeholder="Spesifikasi khusus, instruksi pengiriman, dll."
                                        />
                                    </div>
                                </div>
                                
                                <div className="pt-4 flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        className="w-full py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Memproses...' : 'Konfirmasi & Buat Pesanan'}
                                    </Button>
                                    <p className="text-[10px] text-center text-gray-400 italic">
                                        Dengan menekan tombol, Anda setuju untuk dihubungi oleh tim sales kami.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3">
                            <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">Pesanan Berhasil Dikirim!</DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Terima kasih atas pemesanan Anda. Kami akan segera menghubungi Anda melalui WhatsApp, telepon, atau email untuk informasi lebih lanjut.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSuccessModalOpen(false);
                                    window.location.href = '/catalog';
                                }}
                                className="rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Tutup
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </FrontendLayout>
    );
}