import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { formatPrice } from '@/utils/currency';
import { getProductTypeText } from '@/utils/product';
import PlaceholderImage from '@/assets/images/placeholder.png';
import { ShoppingBag, Star, ArrowRight, Tag } from 'lucide-react';
import type { Product } from '@/types';



interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>(product?.image || product?.image_path || product?.coverImage?.image_path || '');

    const handleImageError = () => {
        if (imageSrc !== PlaceholderImage) {
            setImageSrc(PlaceholderImage);
        }
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Image */}
            <Link
                href={`/catalog/${product.slug}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800"
            >
                {/* Badge */}
                <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                {product.is_new && (
                    <span className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
                    Baru
                    </span>
                )}
                {product.is_bestseller && (
                    <span className="rounded-md bg-orange-400 px-2 py-1 text-[10px] font-bold text-white">
                    Bestseller
                    </span>
                )}
                </div>

                {/* Skeleton */}
                {!isImageLoaded && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                )}

                {/* Image */}
                <img
                src={imageSrc}
                alt={product.name}
                className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                onError={handleImageError}
                loading="lazy"
                />

                {/* Type */}
                <div className="absolute top-2 right-2 z-10">
                <div className="rounded-md bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm">
                    {getProductTypeText({
                    is_for_sell: product.is_for_sell || false,
                    is_rent: product.is_rent || false
                    })}
                </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-3 gap-2">

                {/* Price */}
                {product.show_price && (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-orange-500">
                    {formatPrice(product.price)}
                    </span>

                    {product.compare_at_price &&
                    product.compare_at_price > product.price && (
                        <span className="text-[10px] text-slate-400 line-through">
                        {formatPrice(product.compare_at_price)}
                        </span>
                    )}
                </div>
                )}

                {/* Title */}
                <Link href={`/catalog/${product.slug}`}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                </h3>
                </Link>

                {/* Category */}
                {product.category && (
                <p className="text-[11px] text-slate-400">
                    {product.category?.name}
                </p>
                )}

                {/* Description */}
                {product.description && (
                <p className="text-xs text-slate-500 line-clamp-2">
                    {product.description}
                </p>
                )}

                {/* CTA */}
                <div className="mt-auto flex flex-col gap-2 pt-2">
                <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                <Link
                    href={`/catalog/${product.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-400 text-orange-500 px-3 py-2 text-sm font-semibold hover:bg-orange-50 transition active:scale-[0.98]"
                >
                    <ShoppingBag className="h-4 w-4" />
                    Detail Produk
                </Link>
                </div>

            </div>
            </div>
    );
}