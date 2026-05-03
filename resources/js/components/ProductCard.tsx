import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { formatPrice } from '@/utils/currency';
import { getProductTypeText } from '@/utils/product';
import PlaceholderImage from '@/assets/images/placeholder.png';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
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
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            
            {/* Image Container */}
            <Link href={`/catalog/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Badges Overlay - Menggunakan aksen Orange untuk Bestseller */}
                <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                    {product.is_new && (
                        <span className="rounded-lg bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                            Baru
                        </span>
                    )}
                    {product.is_bestseller && (
                        <span className="flex items-center gap-1 rounded-lg bg-orange-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                            <Star className="h-3 w-3 fill-white" /> Bestseller
                        </span>
                    )}
                </div>

                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                )}

                <img
                    src={imageSrc}
                    alt={product.name}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={handleImageError}
                    loading="lazy"
                />
                
                {/* Type Tag - Subtil dengan border orange saat hover */}
                {/* <div className="absolute top-2 right-2 z-10">
                    <div className="rounded-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-transparent group-hover:border-orange-400/50 transition-colors shadow-sm">
                        {getProductTypeText({
                            is_for_sell: product.is_for_sell || false,
                            is_rent: product.is_rent || false
                        })}
                    </div>
                </div> */}
            </Link>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-4 gap-1">
                {/* Title */}
                <Link href={`/catalog/${product.slug}`}>
                    <h3 className="text-lg font-bold leading-snug text-slate-800 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                    {product.description}
                </p>

                {/* Price & Stock */}
                <div className="mt-auto flex flex-col gap-2 pt-2">
                    
                    {/* Price Row */}
                    {product.show_price && (
                    <div className="flex items-end justify-between">
                        <div className="flex items-center  2xl:gap-2 flex-wrap">
                        <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                            {formatPrice(product.price)}
                        </span>
                        {product.compare_at_price && product.compare_at_price > product.price && (
                            <span className="text-[11px] italic text-rose-400 line-through">
                            {formatPrice(product.compare_at_price)}
                            </span>
                        )}
                        </div>

                        {/* Stock */}
                        {/* {product.show_stock && (
                        <span className={`text-[11px] font-semibold ${
                            product.quantity > 0 ? 'text-slate-400' : 'text-rose-500'
                        }`}>
                            Stok: {product.quantity}
                        </span>
                        )} */}
                    </div>
                    )}

                    {/* Divider halus */}
                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                    {/* CTA */}
                    <Link
                    href={`/catalog/${product.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98] shadow-md shadow-orange-200 dark:shadow-none"
                    >
                    <ShoppingBag className="h-4 w-4" />
                    Detail Produk
                    </Link>
                </div>
            </div>
        </div>
    );
}