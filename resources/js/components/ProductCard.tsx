import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { handleImageError } from '@/utils/image';
import { formatPrice } from '@/utils/currency';
import PlaceholderImage from '@/assets/images/placeholder.png';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        type: string;
        price: number;
        show_price: boolean;
        compare_at_price?: number;
        stock: number | null;
        image: string;
        description: string;
        slug: string;
        is_bestseller?: boolean;
        is_new?: boolean;
        is_for_sell?: boolean;
        is_rent?: boolean;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(product.image);

    useEffect(() => {
        setImageSrc(product.image);
        setIsImageLoaded(false);
        
        const img = new Image();
        img.src = product.image;
        
        const onLoad = () => {
            setImageSrc(product.image);
            setIsImageLoaded(true);
        };
        
        const onError = () => {
            setImageSrc(PlaceholderImage);
            setIsImageLoaded(true);
        };
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        
        return () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
    }, [product.image]);

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
            <div className="h-52 relative overflow-hidden">
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img
                    src={imageSrc}
                    alt={product.name}
                    className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => handleImageError(e, '/images/placeholder.png', product.name)}
                />
            </div>
            <div className="p-3">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex gap-1">
                        {product.is_bestseller && (
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                Bestseller
                            </span>
                        )}
                        {product.is_new && (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                Baru
                            </span>
                        )}
                        {product.is_for_sell && product.is_rent ? (
                            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 mr-2">
                                Dijual & Disewakan
                            </span>
                        ) : (
                            <>
                                {product.is_for_sell && (
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 mr-2">
                                        Dijual
                                    </span>
                                )}
                                {product.is_rent && (
                                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 mr-2">
                                        Disewakan
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    <span className="text-sm text-gray-500">
                        Stok: {product.stock !== null && product.stock !== undefined ? product.stock : 'Tidak terbatas'}
                    </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold text-amber-600">
                         {product.show_price ? (
                            product.compare_at_price && Number(product.compare_at_price) > Number(product.price) ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-base font-bold text-red-600">{formatPrice(product.price)}</span>
                                    <span className="text-xs text-gray-500 line-through">
                                        {formatPrice(product.compare_at_price)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm font-bold text-green-600">{formatPrice(product.price)}</span>
                            )
                        ) : (
                            <span className="text-sm font-bold text-gray-900">Hubungi kami untuk harga</span>
                        )}
                    </span>
                    <Link
                        href={`/catalog/${product.slug}`}
                        className="btn btn-primary w-full px-4 py-2 text-center whitespace-nowrap"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
