import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield, RefreshCw, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useWishlist } from '@/hooks/useWishlist';
import FrontendLayout from '@/layouts/frontend-layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

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
    type: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    specifications: Specification;
    features: string[];
}

interface RelatedProduct {
    id: number;
    name: string;
    type: string;
    price: number;
    stock: number | null;
    image: string;
    description: string;
}

interface DetailProps {
    product: Product;
    relatedProducts: RelatedProduct[];
}

export default function Detail({ product, relatedProducts }: DetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    
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
        // Here you would typically send the order to your backend
        console.log('Order submitted:', {
            ...formData,
            productId: product.id,
            productName: product.name,
            quantity,
            totalPrice: product.price * quantity
        });
        
        // Show success modal
        setIsOrderModalOpen(false);
        setIsSuccessModalOpen(true);
        // Reset form
        setFormData({
            companyName: '',
            picName: '',
            phone: '',
            email: '',
            notes: ''
        });
    };
    
    // Get wishlist state and actions
    const { isInWishlist, toggleWishlistItem } = useWishlist();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value;
        if (newQuantity > 0 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    return (
        <FrontendLayout title={product.name}>
            <Head title={product.name} />
            
            <div className="bg-white">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
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
                    <div className="lg:flex lg:space-x-8">
                        {/* Product Images */}
                        <div className="lg:w-1/2">
                            <div className="mb-4 h-96 overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[product.image, product.image, product.image, product.image].map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`h-20 overflow-hidden rounded-md border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="mt-6 lg:mt-0 lg:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            
                            <div className="mt-2 flex items-center">
                                <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                    {product.type === 'sewa' ? 'Sewa' : 'Beli'}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">Stok: {product.stock} unit</span>
                            </div>

                            <div className="mt-4">
                                <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                                {product.type === 'sewa' && <span className="text-sm text-gray-500">/bulan</span>}
                            </div>

                            <div className="mt-6">
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            {/* Features */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Deskripsi</h3>
                                <ul className="mt-2 space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span className="ml-2 text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mt-6">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Jumlah
                                </label>
                                <div className="mt-1 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(-1)}
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        className="h-10 w-16 rounded-none! border-t border-b border-gray-300 text-center text-gray-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(1)}
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-md border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOrderModalOpen(true)}
                                    className="flex-1 cursor-pointer font-bold rounded-md bg-primary px-6 py-3 text-sm text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    <ShoppingCart className="mr-2 inline h-5 w-5" />
                                    Buat Pesanan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleWishlistItem({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image
                                    })}
                                    className="inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white p-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    <Heart
                                        className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Product Meta */}
                            {/* <div className="mt-6 border-t border-gray-200 pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Truck className="h-5 w-5 text-gray-400" />
                                        <span className="ml-2 text-sm text-gray-500">
                                            Gratis pengiriman untuk seluruh Indonesia
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Shield className="h-5 w-5 text-gray-400" />
                                        <span className="ml-2 text-sm text-gray-500">
                                            Garansi kualitas terbaik
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <RefreshCw className="h-5 w-5 text-gray-400" />
                                        <span className="ml-2 text-sm text-gray-500">
                                            {product.type === 'sewa' 
                                                ? 'Fleksibel, bisa perpanjangan sewaktu-waktu' 
                                                : 'Garansi 1 tahun untuk pembelian'}
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-gray-900">Spesifikasi Produk</h2>
                        <div className="mt-6 overflow-hidden border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-xl font-bold text-gray-900">Produk Terkait</h2>
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <DialogTitle className="text-xl font-bold text-gray-900">Form Pemesanan</DialogTitle>
                            <button 
                                onClick={() => setIsOrderModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Form submitted with data:', formData);
                            // Panggil fungsi onSubmit yang sudah ada
                            onSubmit(e);
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detail Produk</h3>
                                    <div className="flex flex-col items-start space-x-4 gap-3 p-4 border rounded-lg">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="h-auto w-full shrink-0 rounded-md object-cover"
                                        />
                                        <div className="flex-1 w-full">
                                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                                            <p className="text-sm text-gray-500">{product.category}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleQuantityChange(-1)}
                                                        className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 font-bold text-black text-center">{quantity}</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleQuantityChange(1)}
                                                        className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-2 p-3 font-bold rounded-lg bg-slate-50 w-full">
                                                Total: &nbsp;
                                                <span>{formatPrice(product.price * quantity)}</span>
                                            </div>

                                            <div className="mt-2 p-3 rounded-lg bg-slate-50 w-full">
                                                <span className="font-medium text-xs text-black">Note</span>
                                                <p className="mt-2 text-xs">
                                                    <ol className="list-decimal px-3">
                                                        <li>Total harga hanya mejadi patokan estimasi saja, biaya dapat berubah sesuai dengan ketersediaan stok.</li>                        
                                                        <li>Kami akan menghubungi anda untuk konfirmasi pemesanan.</li>
                                                    </ol>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 ">Data Pemesan</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                                Nama Perusahaan/Instansi/Pribadi <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="picName" className="block text-sm font-medium text-gray-700">
                                                Nama PIC <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="picName"
                                                name="picName"
                                                value={formData.picName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                pattern="[0-9+\-\s()]*"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                                Catatan (Opsional)
                                            </label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                rows={7}
                                                value={formData.notes || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                placeholder="Catatan tambahan (opsional)"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => setIsOrderModalOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Kirim Pesanan
                                </Button>
                            </div>
                        </form>
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
                            <DialogTitle className="text-lg font-medium text-gray-900">Pesanan Berhasil Dikirim!</DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Terima kasih atas pemesanan Anda. Kami akan segera menghubungi Anda melalui WhatsApp, telepon, atau email untuk informasi lebih lanjut.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={() => setIsSuccessModalOpen(false)}
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