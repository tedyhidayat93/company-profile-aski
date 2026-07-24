<?php

namespace App\Support\Enums;

enum VisitorAction: string
{
    case ALL = 'all';
    case VISIT = 'visit';
    case WA_QUOTE_CATALOG_DETAIL = 'whatsapp_quote_catalog_detail';
    case WA_CONTACT_PAGE_SUBMIT = 'whatsapp_contact_page_submit';
    case WA_MINI_FORM_QUOTE_REQUEST = 'whatsapp_mini_form_quote_request';
    case WA_ONPAGE_DIRECT_CLICK = 'whatsapp_onpage_direct_click';
    case WA_TOP_NAVBAR_DIRECT_CLICK = 'whatsapp_top_navbar_direct_click';
    case WA_FOOTER_DIRECT_CLICK = 'whatsapp_footer_direct_click';
    case WA_GLOBAL_FLOATING = 'whatsapp_global_floating';

    /**
     * Mengambil label deskriptif untuk Panel Admin / Log Interaksi.
     */
    public function label(): string
    {
        return match ($this) {
            self::ALL                        => 'Semua Aksi',
            self::VISIT                      => 'Kunjungan Halaman',
            self::WA_QUOTE_CATALOG_DETAIL    => '(WhatsApp) Form Detail Katalog',
            self::WA_CONTACT_PAGE_SUBMIT     => '(WhatsApp) Form Halaman Kontak',
            self::WA_MINI_FORM_QUOTE_REQUEST => '(WhatsApp) Form Mini Penawaran',
            self::WA_ONPAGE_DIRECT_CLICK     => '(WhatsApp) Klik Langsung Konten Halaman', // <- Sudah Diperbaiki & Disamakan
            self::WA_GLOBAL_FLOATING         => '(WhatsApp) Klik Widget Melayang Global', 
            self::WA_TOP_NAVBAR_DIRECT_CLICK => '(WhatsApp) Klik Navigasi Atas', 
            self::WA_FOOTER_DIRECT_CLICK     => '(WhatsApp) Klik Bagian Bawah (Footer)', 
        };
    }

    /**
     * Generate otomatis opsi dropdown untuk filter di dashboard admin.
     */
    public static function getOptions(): array
    {
        return array_map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ], self::cases());
    }

    /**
     * Generate otomatis objek KEY => VALUE untuk dikonsumsi frontend (React Shorthand).
     */
    public static function getShorthandActions(): array
    {
        return array_combine(
            array_map(fn ($case) => $case->name, self::cases()),
            array_map(fn ($case) => $case->value, self::cases())
        );
    }
}