<?php

namespace App\Support\Enums;

enum GalleryModule: string
{
    case BLOG = 'blog';
    case PRODUCT = 'product';
    case SERVICE = 'service';
    case GALLERY = 'gallery';
    case PORTFOLIO = 'portfolio';

    // Helper untuk mengambil seluruh nilai string (berguna untuk validasi migration/request)
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}