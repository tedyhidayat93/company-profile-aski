import { Link } from '@inertiajs/react';
import { 
    ShoppingCart,
    Heart,
    Share2,
    Check,
    X,
    Phone,
    AlertCircle,
    Info,
    Building2,
    User,
    Mail,
    InfoIcon,
    MessageCircle,
    ChevronDown, 
    ChevronUp,
    Facebook,
    Twitter,
    Link2,
    Instagram,
    BadgeInfo,
    MessageSquare,
    Send,
    Container,
    FileText
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useWishlist } from '@/hooks/useWishlist';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { handleImageError } from '@/utils/image';
import { formatPrice } from '@/utils/currency';
import { getProductTypeText } from '@/utils/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SingleGalleryPreview from '@/components/single-gallery-preview';
import { Product } from '@/types';
import { generateRecaptcha } from '@/utils/google-recaptcha';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfig } from '@/utils/config';


type OrderFormData = {
  companyName: string;
  picName: string;
  phone: string;
  email: string;
  notes?: string;
};


interface DetailProps {
    product: Product;
    relatedProducts: Product[];
    seo: SeoHeadProps;
}

interface ImagesGalleryPreview {
    original: string;
    thumbnail: string;
}

export default function Detail({ product, relatedProducts, seo }: DetailProps) {
    const { getConfig } = useConfig();
    const [quantity, setQuantity] = useState(1);
    const [productImages, setProductImages] = useState<ImagesGalleryPreview[]>([]);
    const [activeTab, setActiveTab] = useState<'deskripsi' | 'spesifikasi'>('deskripsi');
    const hasSpecsData = !!((product.specific_specs && product.specific_specs.length > 0));
    const [imageSrc, setImageSrc] = useState(() => {
        if (product.images && product.images.length > 0) {
            const coverImage = product.images.find(img => img.is_cover);
            return coverImage?.path || product.images[0].path;
        }
        return product.image_path || '';
    });

    // Effect untuk mengolah product images dari database
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            // Map all images to gallery format
            const galleryImages = product.images.map(img => ({
                original: img.path,
                thumbnail: img.path
            }));
            setProductImages(galleryImages);
        } else if (product.image_path) {
            // Fallback jika tidak ada images tapi ada single image
            setProductImages([{
                original: product.image_path,
                thumbnail: product.image_path
            }]);
        }
    }, [product.images]);


    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
    const descRef = useRef<HTMLDivElement>(null);

    // Effect untuk memantau apakah teks melebihi batas 200px
    useEffect(() => {
        if (descRef.current) {
            // Jika tinggi asli element lebih besar dari 200px, set true
            const hasOverflow = descRef.current.scrollHeight > 200;
            setIsOverflowing(hasOverflow);
        }
    }, [product.description, activeTab]);
    
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
            
            const recaptchaToken = await generateRecaptcha(
                'product_order'
            );

            const response = await axios.post('/katalog/order', {
                company_name: formData.companyName || '',
                pic_name: formData.picName || '',
                phone: formData.phone || '',
                email: formData.email || '',
                notes: formData.notes || '',
                product_id: product.id,
                quantity: quantity,
                recaptcha_token: recaptchaToken,
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

                toast.success("Berhasil membuat pesanan.",{
                    description: 'Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.'
                });
                
                setFormData({
                    companyName: '',
                    picName: '',
                    phone: '',
                    email: '',
                    notes: ''
                });
            } else {
                toast.error("Gagal membuat pesanan.",{
                    description: response.data.message || 'Silakan coba lagi untuk membuat pesanan.'
                });
                throw new Error(response.data.message || 'Gagal membuat pesanan.');
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
                    toast.error("Gagal membuat pesanan.",{
                        description: error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.'
                    });
                }
            } else {
                toast.error("Gagal membuat pesanan.",{
                    description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.'
                });
            }
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 2000);
        }
    };

    // // State untuk Form Penawaran Baru
    const [quoteForm, setQuoteForm] = useState({
        name: '',
        contact: '',
        message: ''
    });

    const handleQuoteSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        const cleanPhone = getConfig('contact_whatsapp', '6281282336464').replace(/[^0-9]/g, '');
        
        // Format teks WhatsApp otomatis rapi
        const waMessage = encodeURIComponent(
            `Halo Sales, saya ingin meminta Penawaran Resmi untuk produk berikut:\n\n` +
            `*PRODUK:* ${product.name}\n` +
            `*Link:* ${window.location.href}\n\n` +
            `*DATA PEMOHON:*\n` +
            `• Nama: ${quoteForm.name}\n` +
            `• Kontak (WA/Email): ${quoteForm.contact}\n` +
            `• Detail Pesanan: ${quoteForm.message}\n\n` +
            `Mohon segera kirimkan estimasi harga dan ketersediaan unitnya. Terima kasih.`
        );

        window.open(`https://wa.me/${cleanPhone}?text=${waMessage}`, '_blank');
    };
    
    // Get wishlist state and actions
    const { isInWishlist, toggleWishlistItem } = useWishlist();
    const handleWishlistItem = (product: Product) => {
        const added = toggleWishlistItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: imageSrc || '/images/placeholder-product.svg',
            slug: product.slug
        });

        if (added) {
            toast.success("Berhasil menambahkan ke wishlist ❤️", {
                description: product.name + ' telah ditambahkan ke dalam wishlist',
            });
        } else {
            toast.success("Berhasil menghapus wishlist.", {
                description: product.name + ' telah dihapus dari wishlist',
            });
        }

        return added;
    };

    const handleQuantityChange = (value: number) => {
        const newQty = quantity + value;
        
        // Tentukan batas atas (max): jika show_stock true, batasnya adalah product.stock, jika tidak, unlimited (Infinity)
        const maxLimit = product.show_stock ? (product.stock ?? Infinity) : Infinity;

        // Pastikan qty tidak kurang dari 1 dan tidak melebihi limit
        if (newQty >= 1 && newQty <= maxLimit) {
            setQuantity(newQty);
        }
    };

    return (
        <FrontendLayout>

            <SeoHead
                title={seo.title}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                robots={seo.robots || 'index,follow'}
                contentType={seo.contentType || 'website'}
                publishedAt={product.published_at} 
                updatedAt={product.updated_at}
            />

            <div className='dark:bg-zinc-950 bg-white min-h-screen antialiased transition-colors duration-200'>
                <div className="container mx-auto px-4 py-8">
                    
                    {/* 🗺️ Breadcrumb */}
                    <nav className="mb-6 flex max-w-xl md:max-w-full overflow-auto" aria-label="Breadcrumb">
                        <ol className="inline-flex flex-nowrap text-nowrap items-center space-x-1 md:space-x-2 text-sm font-medium">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-zinc-600 hover:text-orange-500 dark:text-zinc-400">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2 text-zinc-400 dark:text-zinc-600">/</span>
                                    <Link href="/katalog" className="text-zinc-600 hover:text-orange-500 dark:text-zinc-400">
                                        Katalog
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-zinc-400 dark:text-zinc-600">/</span>
                                    <span className="text-zinc-500 dark:text-zinc-400">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    {/* Layout Awal: 2 Kolom Kiri Kanan */}
                    <div className="lg:flex items-start lg:gap-12">
                        
                        {/* KOLOM KIRI: Galeri Gambar */}
                        <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit sticky top-10 space-y-4">
                            <SingleGalleryPreview images={productImages} />
                            
                            {/* Hubungi Sales Kontak Bar Cepat */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-xl dark:bg-zinc-900/40 dark:border-zinc-800">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400 shrink-0">
                                        <Phone className="h-5 w-5 animate-pulse" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                            Punya Pertanyaan Mengenai Unit Ini?
                                        </span>
                                        <span className="text-sm font-extrabold text-zinc-700 dark:text-zinc-200 tracking-wide">
                                            {getConfig('contact_phone', '081282336464')}
                                        </span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => {
                                        const cleanPhone = getConfig('contact_whatsapp', '6281282336464').replace(/[^0-9]/g, '');
                                        const message = encodeURIComponent(`Halo Sales, saya tertarik dengan produk kontainer ini:\n\n*${product.name}*\nLink: ${window.location.href}\n\nMohon informasi ketersediaan unit dan penawaran harganya.`);
                                        window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
                                    }}
                                    className="w-full sm:w-auto h-10 px-4 cursor-pointer inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-[0.98]"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Tanya Sales via WA
                                </button>
                            </div>
                        </div>

                        {/* KOLOM KANAN: Detail & Informasi Bisnis */}
                        <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col space-y-6">
                            
                            {/* Header Badge & Judul */}
                            <div className="space-y-3">
                                <h1 className="text-2xl xl:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                                    {product.name}
                                </h1>
                                
                                <div className="flex items-center gap-2">
                                    {product.is_new && (
                                        <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400">
                                            Baru
                                        </span>
                                    )}
                                    {product.is_bestseller && (
                                        <span className="rounded-full bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 px-2.5 py-0.5 text-[10px] font-bold text-orange-800 dark:text-orange-400">
                                            Terlaris
                                            </span>
                                    )}
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                                        {getProductTypeText({
                                            is_for_sell: product.is_for_sell || false,
                                            is_rent: product.is_rent || false
                                        })}
                                    </span> 
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                {product.show_price ? (
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">Harga Terbaik</span>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-xl xl:text-2xl font-black text-orange-600 dark:text-orange-400">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && (
                                                <span className="text-lg text-zinc-400 line-through decoration-red-400">
                                                    {formatPrice(product.compare_at_price)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-start gap-2 text-zinc-500 dark:text-zinc-400">
                                            <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
                                            <p className="text-xs leading-normal">
                                                Harga tidak mengikat. Dapatkan estimasi biaya resmi dan jadwal ketersediaan dengan mengeklik <span className="text-orange-600 font-semibold italic">"Pesan Sekarang"</span>.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
                                        <span className="text-base font-bold text-zinc-900 dark:text-white">
                                            Hubungi Tim Sales untuk Harga Terbaik
                                        </span>
                                        <p className="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                            Klik <span className="font-semibold text-orange-600">"Pesan Sekarang"</span> untuk mendapatkan penawaran harga, ketersediaan unit, dan konsultasi langsung dari tim kami.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Selection & Actions */}
                            <div className="space-y-4">
                                {/* Quantity */}
                                <div className="flex gap-3 items-center">
                                    <div className="w-32">
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Jumlah</label>
                                        <div className="flex bg-white dark:bg-zinc-900 items-center border border-zinc-300 dark:border-zinc-800 rounded-lg overflow-hidden">
                                            <button 
                                                onClick={() => handleQuantityChange(-1)}
                                                className="w-10 h-10 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors font-bold"
                                            >-</button>
                                            <input 
                                                type="text" 
                                                value={quantity} 
                                                readOnly 
                                                className="w-12 h-10 border-x border-zinc-300 dark:border-zinc-800 text-center font-bold text-zinc-900 dark:text-white bg-transparent"
                                            />
                                            <button 
                                                onClick={() => handleQuantityChange(1)}
                                                className="w-10 h-10 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors font-bold"
                                            >+</button>
                                        </div>
                                    </div>
                                    {product.show_stock && (
                                        <span className={`text-sm mt-6 font-semibold ${product.stock > 0 ? 'text-zinc-600 dark:text-zinc-400' : 'text-red-500'}`}>
                                            {product.stock > 0 ? `Stok: ${product.stock} unit` : 'Stok Habis'}
                                        </span>
                                    )}
                                </div>

                                {/* BARIS UTAMA UTK TOMBOL CTA (Sampingan) */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full">
                                    <button
                                        onClick={() => setIsOrderModalOpen(true)}
                                        className="flex-1 h-12 cursor-pointer flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98] text-sm uppercase tracking-wider"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Pesan Sekarang
                                    </button>
                                    
                                    {/* ✨ NEW BUTTON: Dapatkan Penawaran Toggle */}
                                    <button
                                        onClick={() => setIsQuoteFormOpen(!isQuoteFormOpen)}
                                        className={`flex-1 h-12 cursor-pointer flex items-center justify-center gap-2 font-bold rounded-lg transition-all active:scale-[0.98] text-sm uppercase tracking-wider border-2 ${
                                            isQuoteFormOpen 
                                            ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-800 dark:border-zinc-800' 
                                            : 'bg-white border-orange-600 text-orange-600 hover:bg-orange-50 dark:bg-transparent dark:hover:bg-zinc-900'
                                        }`}
                                    >
                                        <FileText className="h-5 w-5" />
                                        {isQuoteFormOpen ? 'Tutup Formulir' : 'Dapatkan Penawaran'}
                                    </button>
                                    
                                    {/* Wishlist & Share */}
                                    <div className="flex gap-2 justify-end sm:justify-start">
                                        <button
                                            onClick={() => handleWishlistItem(product)}
                                            className="h-12 w-12 shrink-0 cursor-pointer flex items-center justify-center rounded-lg border-2 border-zinc-200 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all group"
                                        >
                                            <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
                                        </button>
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-12 w-12 shrink-0 cursor-pointer flex items-center justify-center rounded-lg border-2 border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                                                    <Share2 className="h-5 w-5 text-zinc-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-52">
                                                <DropdownMenuItem onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Lihat produk ${product.name}\n${window.location.href}`)}`, '_blank')} className="cursor-pointer">
                                                    <MessageCircle className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="cursor-pointer">
                                                    <Facebook className="mr-2 h-4 w-4 text-blue-600" /> Facebook
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Lihat produk ${product.name}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')} className="cursor-pointer">
                                                    <Twitter className="mr-2 h-4 w-4 text-sky-500" /> Twitter / X
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={async () => { await navigator.clipboard.writeText(window.location.href); toast.success("Link disalin"); }} className="cursor-pointer">
                                                    <Instagram className="mr-2 h-4 w-4 text-pink-500" /> Instagram
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={async () => { await navigator.clipboard.writeText(window.location.href); toast.success("Link disalin"); }} className="cursor-pointer border-t mt-1">
                                                    <Link2 className="mr-2 h-4 w-4" /> Salin Link
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>

                            {/* ===================================================
                                🔥 ACCORDION-STYLE SEAMLESS SLATE-900 FORM SECTION
                            =================================================== */}
                            {isQuoteFormOpen && (
                                <div className="bg-slate-900 dark:bg-zinc-900 rounded-xl p-6 border border-slate-800 dark:border-zinc-800 shadow-xl space-y-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
                                    <div className="space-y-2 border-b border-slate-800 dark:border-zinc-800 pb-4">
                                        <div className="flex items-center gap-2 text-orange-500">
                                            <Container className="w-5 h-5 animate-bounce" />
                                            <span className="text-xs font-black tracking-widest uppercase text-orange-600 dark:text-orange-400">
                                                Dapatkan Penawaran
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-white dark:text-white tracking-tight">
                                            Konsultasi & Cek Harga Kontainer
                                        </h3>
                                        <p className="text-slate-300 dark:text-zinc-300 text-sm leading-relaxed">
                                            Ingin <strong>jual, beli, sewa, atau modifikasi container</strong>? Hubungi marketing kami sekarang untuk mendapatkan penawaran harga terbaik kami.
                                        </p>
                                    </div>
                                    
                                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                                                Nama Lengkap Anda
                                            </label>
                                            <input 
                                                type="text" required value={quoteForm.name}
                                                onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                                                className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                                                placeholder="Contoh: Bpk. Bambang"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                                                Nomor WhatsApp / Email
                                            </label>
                                            <input 
                                                type="text" required value={quoteForm.contact}
                                                onChange={e => setQuoteForm({...quoteForm, contact: e.target.value})}
                                                className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition font-medium" 
                                                placeholder="Contoh: 081234xxxx / nama@email.com"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                                                Rencana Penggunaan / Spesifikasi Kustom
                                            </label>
                                            <textarea 
                                                rows={3} required value={quoteForm.message}
                                                onChange={e => setQuoteForm({...quoteForm, message: e.target.value})}
                                                className="w-full bg-slate-950 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition resize-none leading-relaxed font-medium" 
                                                placeholder="Contoh: Pasang AC 1 PK, sekat partisi triplek, jendela geser..."
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm uppercase tracking-wide mt-3 active:scale-95"
                                        >
                                            <Send className="w-4 h-4" /> Permintaan Penawaran
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Tabs Content Area */}
                            <div className="mt-4 space-y-4">
                                <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('deskripsi')}
                                        className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                                            activeTab === 'deskripsi'
                                                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                                                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                        }`}
                                    >
                                        Deskripsi Produk
                                    </button>
                                    {hasSpecsData && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('spesifikasi')}
                                            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                                                activeTab === 'spesifikasi'
                                                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                                                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                            }`}
                                        >
                                            Spesifikasi
                                        </button>
                                    )}
                                </div>

                                <div className="py-2">
                                    {activeTab === 'deskripsi' && (
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <div 
                                                    ref={descRef}
                                                    className="tinymce-content transition-all duration-300 overflow-hidden text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                                                    style={{ maxHeight: isOverflowing && !isDescExpanded ? '200px' : '9999px' }}
                                                    dangerouslySetInnerHTML={{ __html: product.description }} 
                                                />
                                                {isOverflowing && !isDescExpanded && (
                                                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
                                                )}
                                            </div>
                                            {isOverflowing && (
                                                <div className="flex justify-center pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition"
                                                    >
                                                        <span>{isDescExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}</span>
                                                        {isDescExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'spesifikasi' && hasSpecsData && (
                                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-transparent">
                                            <table className="w-full text-sm border-collapse">
                                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                                    {product?.specific_specs?.map((spec, index) => (
                                                        <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                                                            <td className="px-5 py-3.5 text-zinc-500 dark:text-zinc-400 w-1/3">{spec.label}</td>
                                                            <td className="px-5 py-3.5 font-semibold text-zinc-900 dark:text-white">
                                                                <div>{spec.value}</div>
                                                                {spec.note && (
                                                                    <div className="mt-1 text-xs font-medium text-zinc-400 dark:text-zinc-500 italic">*{spec.note}</div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="text-[11px] font-medium px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Produk Terkait</h2>
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
                        
                        {/* SISI KIRI: Ringkasan (Review) */}
                        <div className="w-full md:w-5/12 bg-slate-800 dark:bg-gray-800/50 p-6 md:p-8 border-r border-gray-100 dark:border-gray-800 overflow-y-auto">
                            <div className="sticky top-0">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 dark:text-gray-400 mb-6">
                                    <BadgeInfo className="mr-2 h-4 w-4 inline-block" />
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
                                        {product.category && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded shadow-sm">
                                                {product.category?.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Pricing Display */}
                                <div className="space-y-3">
                                    {
                                        product.show_price && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-200">Harga Satuan</span>
                                                <span className="font-medium dark:text-gray-300">{product.show_price ? formatPrice(product.price) : ''}</span>
                                            </div>
                                        )
                                    }
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-200">Jumlah</span>
                                        <span className="font-medium dark:text-gray-300">x {quantity}</span>
                                    </div>
                                    <div className="pt-3 border-t border-dashed border-gray-300 dark:border-gray-700">
                                        {product.show_price ? (
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-100 dark:text-white text-lg">Total Estimasi</span>
                                                <span className="text-xl font-black text-primary dark:text-orange-400">
                                                    {formatPrice(product.price * quantity)}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs leading-relaxed flex gap-2">
                                                <Info className="h-4 w-4 shrink-0" />
                                                <span>Harga final akan dikonfirmasi via WhatsApp/Email oleh tim kami.</span>
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
                                    <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">Formulir Pemesanan</DialogTitle>
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
                                <div className="p-4 bg-slate-200/90 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-700">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tentukan Jumlah</label>
                                    <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden">
                                        <button type="button" onClick={() => handleQuantityChange(-1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">-</button>
                                        <input
                                            type="text"
                                            readOnly
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
                                            <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                                Nama Instansi / Pribadi <span className="text-red-500">*</span>
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
                                                <Label htmlFor="picName" className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                                    Nama PIC <span className="text-red-500">*</span>
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
                                                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                                    WhatsApp / HP <span className="text-red-500">*</span>
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
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                                Alamat Email <span className="text-red-500">*</span>
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
                                        <label htmlFor="notes" className="block text-[12px] font-bold uppercase tracking-widest text-gray-700 mb-2">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes || ''}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm transition-all shadow-sm"
                                            placeholder="Informasikan kebutuhanmu seperti spesifikasi khusus, instruksi pengiriman, dll."
                                        />
                                    </div>
                                </div>
                                
                                <div className="pt-4 flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        className={`w-full py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-lg ${
                                            isSubmitting ? 'animate-pulse bg-primary/90' : ''
                                        }`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                                <span className="animate-pulse">Memproses...</span>
                                            </span>
                                        ) : (
                                            'Konfirmasi & Buat Pesanan'
                                        )}
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
                            <DialogTitle className="text-xl font-medium text-gray-900 dark:text-white">Pesanan Berhasil Dikirim!</DialogTitle>
                            <div className="mt-2">
                                <p className="text-base text-gray-500">
                                    Terima kasih atas pesanan Anda 🙏 Kami akan segera menghubungi Anda melalui WhatsApp, telepon, atau email untuk memberikan informasi lebih lanjut.
                                </p>

                                <p className="text-base text-gray-500 mt-2">
                                    Kami juga ingin mendengar pengalaman Anda berbelanja di Alumoda. 
                                    Bagikan cerita Anda{' '}
                                    <a 
                                    href="/testimonial/send-your-testimoni" 
                                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                                    >
                                    di sini
                                    </a>
                                    {' '}— ulasan Anda dapat membantu pelanggan lain membuat keputusan yang tepat.
                                </p>
                                </div>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSuccessModalOpen(false);
                                    window.location.href = '/katalog';
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