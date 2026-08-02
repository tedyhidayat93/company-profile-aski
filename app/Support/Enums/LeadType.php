<?php

namespace App\Support\Enums;

enum LeadType: string
{
    case WHATSAPP = 'whatsapp';
    case CONTACT_FORM = 'contact_form';
    case BROCHURE_DOWNLOAD = 'brochure_download';
    case PRODUCT_INQUIRY = 'product_inquiry';
    case QUOTE_REQUEST = 'quote_request';

    /**
     * Label yang ramah dibaca untuk UI Dashboard
     */
    public function label(): string
    {
        return match($this) {
            self::WHATSAPP => 'Leads WhatsApp',
            self::CONTACT_FORM => 'Form Kontak',
            self::BROCHURE_DOWNLOAD => 'Unduh Brosur/Katalog',
            self::PRODUCT_INQUIRY => 'Pertanyaan Produk',
            self::QUOTE_REQUEST => 'Permintaan Penawaran (Quotation)',
        };
    }

    /**
     * Badge warna Tailwind untuk styling UI di frontend
     */
    public function badgeColor(): string
    {
        return match($this) {
            self::WHATSAPP => 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
            self::CONTACT_FORM => 'bg-blue-50 text-blue-700 border-blue-200/60',
            self::BROCHURE_DOWNLOAD => 'bg-amber-50 text-amber-700 border-amber-200/60',
            self::PRODUCT_INQUIRY => 'bg-purple-50 text-purple-700 border-purple-200/60',
            self::QUOTE_REQUEST => 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
        };
    }
}