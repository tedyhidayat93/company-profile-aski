<?php

namespace App\Support\Enums;

enum PageList: string
{
    case HOMEPAGE = 'homepage';
    case ABOUT_US = 'about_us';
    case CONTACT_US = 'contact_us';
    case SITEMAP = 'sitemap';
    case SERVICE_INDEX = 'service_index';
    case SERVICE_SHOW = 'service_show';
    case PRODUCT_INDEX = 'product_index';
    case PRODUCT_DETAIL = 'product_detail';
    case CATALOG_INDEX = 'catalog_index';
    case CATALOG_SHOW = 'catalog_show';
    case PORTFOLIO_INDEX = 'portfolio_index';
    case PORTFOLIO_SHOW = 'portfolio_show';
    case CATALOG_CATEGORY = 'catalog_category';
    case TESTIMONIAL_INDEX = 'testimonial_index';
    case TESTIMONIAL_FORM = 'testimonial_form';
    case BLOG_INDEX = 'blog_index';
    case BLOG_CATEGORY = 'blog_category';
    case BLOG_TAG = 'blog_tag';
    case BLOG_DETAIL = 'blog_detail';
    case UNKNOWN = 'unknown_page';

    public function label(): string
    {
        return match($this) {
            self::HOMEPAGE => 'Halaman Utama',
            self::ABOUT_US => 'Tentang Kami',
            self::CONTACT_US => 'Hubungi Kami',
            self::SITEMAP => 'Sitemap',
            self::SERVICE_INDEX => 'Daftar Layanan',
            self::SERVICE_SHOW => 'Detail Layanan',
            self::PRODUCT_INDEX => 'Daftar Produk',
            self::PRODUCT_DETAIL => 'Detail Produk',
            self::CATALOG_INDEX => 'Katalog',
            self::CATALOG_SHOW => 'Detail Katalog',
            self::CATALOG_CATEGORY => 'Kategori Katalog',
            self::PORTFOLIO_INDEX => 'Portofolio',
            self::PORTFOLIO_SHOW => 'Detail Portofolio',
            self::TESTIMONIAL_INDEX => 'Testimonial',
            self::TESTIMONIAL_FORM => 'Form Testimonial',
            self::BLOG_INDEX => 'Blog / Info',
            self::BLOG_CATEGORY => 'Kategori Blog',
            self::BLOG_TAG => 'Tag Blog',
            self::BLOG_DETAIL => 'Detail Artikel Blog',
            self::UNKNOWN => 'Halaman Tidak Diketahui',
        };
    }

    public static function getShorthandPages(): array
    {
        return collect(self::cases())->pluck('value', 'name')->all();
    }
}