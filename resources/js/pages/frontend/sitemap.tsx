import { useState } from 'react';
import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { useConfig } from '@/utils/config';
import { Package, FileText, Home, Phone, Mail, MapPin, Layers, FolderTree } from 'lucide-react'; 
import SeoHead from '@/components/seo-head';

interface SitemapProps {
    services?: Array<{ 
        id: number;
        name: string;
        slug: string;
        updated_at: string;
    }>;
    product_categories?: Array<{ // Tambah prop kategori produk
        id: number;
        name: string;
        slug: string;
        updated_at: string;
    }>;
    products?: Array<{
        id: number;
        name: string;
        slug: string;
        updated_at: string;
    }>;
    articles?: Array<{
        id: number;
        title: string;
        slug: string;
        published_at: string;
    }>;
    navigation?: Array<{
        name: string;
        href: string;
    }>;
}

export default function Sitemap({ 
    services = [], 
    product_categories = [], 
    products = [], 
    articles = [], 
    navigation = [] 
}: SitemapProps) {
    const { getConfig } = useConfig();
    
    return (
        <FrontendLayout title="Sitemap">
            <SeoHead 
                title={'Sitemap'} 
                description={`Sitemap lengkap untuk ${getConfig('site_name', 'Your site name')}. Temukan semua halaman, kategori produk, unit kontainer, dan artikel kami.`}
            />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Sitemap
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Temukan semua halaman, kategori, produk, dan informasi yang tersedia di website kami
                        </p>
                    </div>

                    {/* Mengubah col-grid agar seimbang menampung 5 Box Informasi Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        
                        {/* 1. Navigation Section */}
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Home className="h-5 w-5 text-amber-600 mr-2.5 shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Navigasi Utama
                                    </h2>
                                </div>
                                <ul className="space-y-2.5">
                                    {navigation && navigation.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 2. Services Section */}
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Layers className="h-5 w-5 text-amber-600 mr-2.5 shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Layanan Jasa
                                    </h2>
                                </div>
                                {services && services.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                        {services.map((service) => (
                                            <li key={service.id}>
                                                <Link
                                                    href={`/layanan/${service.slug}`}
                                                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5"
                                                >
                                                    {service.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">Belum ada layanan tersedia</p>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    href="/layanan"
                                    className="text-amber-600 hover:text-amber-700 font-semibold text-xs uppercase tracking-wider flex items-center"
                                >
                                    Semua Layanan →
                                </Link>
                            </div>
                        </div>

                        {/* 3. Product Categories Section */}
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <FolderTree className="h-5 w-5 text-amber-600 mr-2.5 shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Kategori Produk
                                    </h2>
                                </div>
                                {product_categories && product_categories.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                        {product_categories.map((category) => (
                                            <li key={category.id}>
                                                <Link
                                                    href={`/produk/${category.slug}`}
                                                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5"
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">Belum ada kategori tersedia</p>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    href="/produk"
                                    className="text-amber-600 hover:text-amber-700 font-semibold text-xs uppercase tracking-wider flex items-center"
                                >
                                    Index Katalog →
                                </Link>
                            </div>
                        </div>

                        {/* 4. Products Section (Diselaraskan ke rute /produk/{slug}) */}
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Package className="h-5 w-5 text-amber-600 mr-2.5 shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Daftar Unit
                                    </h2>
                                </div>
                                {products && products.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                        {products.map((product) => (
                                            <li key={product.id}>
                                                <Link
                                                    href={`/katalog/${product.slug}`}
                                                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5"
                                                >
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">Belum ada unit produk tersedia</p>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    href="/katalog"
                                    className="text-amber-600 hover:text-amber-700 font-semibold text-xs uppercase tracking-wider flex items-center"
                                >
                                    Semua Produk Ready →
                                </Link>
                            </div>
                        </div>

                        {/* 5. Articles Section (Mengikuti catch-all rute root /{slug}) */}
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <FileText className="h-5 w-5 text-amber-600 mr-2.5 shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Artikel & Info
                                    </h2>
                                </div>
                                {articles && articles.length > 0 ? (
                                    <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                        {articles.map((article) => (
                                            <li key={article.id}>
                                                <Link
                                                    href={`/${article.slug}`}
                                                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5 line-clamp-2"
                                                >
                                                    {article.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-xs italic">Belum ada artikel tersedia</p>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    href="/info"
                                    className="text-amber-600 hover:text-amber-700 font-semibold text-xs uppercase tracking-wider flex items-center"
                                >
                                    Lihat Berita Info →
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Contact Information */}
                    <div className="mt-10 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Informasi Kontak Perusahaan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-amber-600 mr-3 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Telepon / WhatsApp</p>
                                    <p className="font-semibold text-sm text-gray-900">
                                        {getConfig('contact_phone', '+62 812-8233-6464')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-amber-600 mr-3 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Email Korespondensi</p>
                                    <p className="font-semibold text-sm text-gray-900">
                                        {getConfig('contact_email', 'info@alumodasinergi.com')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-amber-600 mr-3 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Kantor & Depot</p>
                                    <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                                        {getConfig('address', 'Jakarta, Indonesia')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-8 text-center text-xs text-gray-400 font-medium">
                        <p>
                            Site Map sistem otomatis diperbarui: {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}