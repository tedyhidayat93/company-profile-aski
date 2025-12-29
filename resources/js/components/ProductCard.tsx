import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { handleImageError } from '@/utils/image';
import PlaceholderImage from '@/assets/images/placeholder.png';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        type: string;
        price: number;
        stock: number | null;
        image: string;
        description: string;
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
                    onError={(e) => handleImageError(e, '/images/placeholder-product.jpg', product.name)}
                />
            </div>
            <div className="p-3">
                <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                        {product.type === 'sewa' ? 'Sewa' : product.type === 'jual' ? 'Dijual' : 'Sewa/Jual'}
                    </span>
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
                        Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <Link
                        href={`/catalog/${product.id}`}
                        className="btn btn-primary w-full px-4 py-2 text-center whitespace-nowrap"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
