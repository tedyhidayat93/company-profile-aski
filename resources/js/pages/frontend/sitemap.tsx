import { Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { useConfig } from '@/utils/config';
import { Package, FileText, Home, Phone, Mail, MapPin, Layers } from 'lucide-react'; // Tambah ikon Layers
import SeoHead from '@/components/seo-head';

interface SitemapProps {
    services?: Array<{ // Tambah tipe data prop services
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
    products?: Array<{
        id: number;
        name: string;
        slug: string;
        created_at: string;
    }>;
    navigation?: Array<{
        name: string;
        href: string;
    }>;
}

export default function Sitemap({ services = [], articles = [], products = [], navigation = [] }: SitemapProps) {
    const { getConfig } = useConfig();
    
    return (
        <FrontendLayout title="Sitemap">
            <SeoHead 
                title={'Sitemap'} 
                description={`Sitemap lengkap untuk ${getConfig('site_name', 'Your site name')}. Temukan semua halaman, produk, dan artikel kami.`}
            />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Sitemap
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Temukan semua halaman, produk, dan informasi yang tersedia di website kami
                        </p>
                    </div>

                    {/* Mengubah col-grid agar pas menampung 4 box (Navigasi, Layanan, Produk, Artikel) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Navigation Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <Home className="h-6 w-6 text-amber-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Navigasi Utama
                                </h2>
                            </div>
                            <ul className="space-y-3">
                                {navigation && navigation.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-600 hover:text-amber-600 transition-colors flex items-center"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* --- NEW SECTION: Services Section --- */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <Layers className="h-6 w-6 text-amber-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Layanan Kami
                                </h2>
                            </div>
                            {services && services.length > 0 ? (
                                <ul className="space-y-2 max-h-96 overflow-y-auto">
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
                                <p className="text-gray-500 text-sm">
                                    Belum ada layanan tersedia
                                </p>
                            )}
                            <div className="mt-4 pt-4 border-t">
                                <Link
                                    href="/layanan"
                                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center"
                                >
                                    Lihat Semua Layanan →
                                </Link>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <Package className="h-6 w-6 text-amber-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Produk Kami
                                </h2>
                            </div>
                            {products && products.length > 0 ? (
                                <ul className="space-y-2 max-h-96 overflow-y-auto">
                                    {products.map((product) => (
                                        <li key={product.id}>
                                            <Link
                                                href={`/jual-sewa/${product.slug}`}
                                                className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5"
                                            >
                                                {product.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Belum ada produk tersedia
                                </p>
                            )}
                            <div className="mt-4 pt-4 border-t">
                                <Link
                                    href="/jual-sewa"
                                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center"
                                >
                                    Lihat Semua Produk →
                                </Link>
                            </div>
                        </div>

                        {/* Articles Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <FileText className="h-6 w-6 text-amber-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Artikel Terbaru
                                </h2>
                            </div>
                            {articles && articles.length > 0 ? (
                                <ul className="space-y-2 max-h-96 overflow-y-auto">
                                    {articles.map((article) => (
                                        <li key={article.id}>
                                            <Link
                                                href={`/${article.slug}`}
                                                className="text-gray-600 hover:text-amber-600 transition-colors text-sm block py-0.5"
                                            >
                                                {article.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Belum ada artikel tersedia
                                </p>
                            )}
                            <div className="mt-4 pt-4 border-t">
                                <Link
                                    href="/info"
                                    className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center"
                                >
                                    Lihat Semua Artikel →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Informasi Kontak
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-amber-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Telepon</p>
                                    <p className="font-medium text-gray-900">
                                        {getConfig('contact_phone', '+62 812-8233-6464')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-amber-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">
                                        {getConfig('contact_email', 'info@alumodasinergi.com')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center col-span-1 md:col-span-3">
                                <MapPin className="h-5 w-5 text-amber-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Alamat</p>
                                    <p className="font-medium text-gray-900">
                                        {getConfig('address', 'Jakarta, Indonesia')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="mt-12 bg-blue-50 rounded-lg p-6 sr-only">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">XML Sitemap</h3>
                                <a
                                    href="/sitemap.xml"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                                >
                                    Kunjungi Sitemap.xml →
                                </a>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Robots.txt</h3>
                                <a
                                    href="/robots.txt"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                                >
                                    Lihat Robots.txt →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            Site Map terakhir diperbarui: {new Date().toLocaleDateString('id-ID', {
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