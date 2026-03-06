<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Configuration;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Site Configuration
        $this->createSiteConfiguration();
        
        // Email/SMTP Configuration
        $this->createEmailConfiguration();
    }

    /**
     * Create site configuration settings
     */
    private function createSiteConfiguration(): void
    {
        $siteConfigs = [
            // Basic Site Info
            [
                'label' => 'Nama Situs',
                'description' => 'Nama utama website atau perusahaan',
                'group' => 'site',
                'key' => 'site_name',
                'value' => 'Company Profile ASKI',
                'type' => 'text',
            ],
            [
                'label' => 'Tagline',
                'description' => 'Tagline atau slogan website',
                'group' => 'site',
                'key' => 'site_tagline',
                'value' => 'Solusi Digital Terpercaya untuk Bisnis Anda',
                'type' => 'text',
            ],
            [
                'label' => 'Logo Website',
                'description' => 'Upload logo utama website',
                'group' => 'site',
                'key' => 'site_logo',
                'value' => '/assets/images/logo.png',
                'type' => 'image',
            ],
            [
                'label' => 'Favicon',
                'description' => 'Upload favicon website',
                'group' => 'site',
                'key' => 'site_favicon',
                'value' => '/assets/images/favicon.ico',
                'type' => 'image',
            ],
            
            // SEO Meta Configuration
            [
                'label' => 'Meta Keywords SEO',
                'description' => 'Kata kunci SEO untuk optimasi mesin pencari',
                'group' => 'site',
                'key' => 'meta_keywords',
                'value' => 'company profile, website development, digital solution, teknologi, bisnis online',
                'type' => 'textarea',
            ],
            [
                'label' => 'Meta Description SEO',
                'description' => 'Deskripsi meta untuk optimasi mesin pencari',
                'group' => 'site',
                'key' => 'meta_description',
                'value' => 'Company Profile ASKI - Solusi digital terpercaya untuk pengembangan website dan bisnis online Anda.',
                'type' => 'textarea',
            ],
            
            // Address Configuration
            [
                'label' => 'Alamat Lengkap',
                'description' => 'Alamat lengkap kantor atau bisnis',
                'group' => 'site',
                'key' => 'address',
                'value' => 'Jl. Contoh No. 123, Kelurahan Example, Kecamatan Sample, Kota Jakarta, DKI Jakarta 12345, Indonesia',
                'type' => 'textarea',
            ],
            [
                'label' => 'Embed Google Maps',
                'description' => 'Embed code atau URL Google Maps lokasi',
                'group' => 'site',
                'key' => 'google_maps_embed',
                'value' => 'https://maps.google.com/maps?q=Jakarta&output=embed',
                'type' => 'textarea',
            ],
            
            // Contact Configuration
            [
                'label' => 'Email Kontak',
                'description' => 'Email utama untuk kontak bisnis',
                'group' => 'site',
                'key' => 'contact_email',
                'value' => 'info@companyprofile-aski.com',
                'type' => 'text',
            ],
            [
                'label' => 'Nomor WhatsApp',
                'description' => 'Nomor WhatsApp untuk kontak',
                'group' => 'site',
                'key' => 'contact_whatsapp',
                'value' => '+6281234567890',
                'type' => 'text',
            ],
            [
                'label' => 'Nomor Telepon',
                'description' => 'Nomor telepon kantor',
                'group' => 'site',
                'key' => 'contact_phone',
                'value' => '+6221-12345678',
                'type' => 'text',
            ],
            
            // Social Media Configuration
            [
                'label' => 'Facebook',
                'description' => 'Link profil Facebook',
                'group' => 'site',
                'key' => 'social_facebook',
                'value' => 'https://facebook.com/companyprofileaski',
                'type' => 'text',
            ],
            [
                'label' => 'Twitter/X',
                'description' => 'Link profil Twitter/X',
                'group' => 'site',
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/companyprofileaski',
                'type' => 'text',
            ],
            [
                'label' => 'Instagram',
                'description' => 'Link profil Instagram',
                'group' => 'site',
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/companyprofileaski',
                'type' => 'text',
            ],
            [
                'label' => 'YouTube',
                'description' => 'Link channel YouTube',
                'group' => 'site',
                'key' => 'social_youtube',
                'value' => 'https://youtube.com/@companyprofileaski',
                'type' => 'text',
            ],
            [
                'label' => 'TikTok',
                'description' => 'Link profil TikTok',
                'group' => 'site',
                'key' => 'social_tiktok',
                'value' => 'https://tiktok.com/@companyprofileaski',
                'type' => 'text',
            ],
            
            // WhatsApp Message Configuration
            [
                'label' => 'Pesan WhatsApp Default',
                'description' => 'Template pesan default untuk WhatsApp direct message',
                'group' => 'site',
                'key' => 'whatsapp_message',
                'value' => 'Halo, saya tertarik dengan layanan Anda. Mohon informasikan lebih lanjut.',
                'type' => 'textarea',
            ],
        ];

        foreach ($siteConfigs as $config) {
            Configuration::create($config);
        }
    }

    /**
     * Create email/SMTP configuration settings
     */
    private function createEmailConfiguration(): void
    {
        $emailConfigs = [
            [
                'label' => 'SMTP Host',
                'description' => 'Server host untuk SMTP',
                'group' => 'email',
                'key' => 'smtp_host',
                'value' => 'smtp.gmail.com',
                'type' => 'text',
            ],
            [
                'label' => 'SMTP Port',
                'description' => 'Port untuk koneksi SMTP',
                'group' => 'email',
                'key' => 'smtp_port',
                'value' => '587',
                'type' => 'number',
            ],
            [
                'label' => 'SMTP Username',
                'description' => 'Username untuk autentikasi SMTP',
                'group' => 'email',
                'key' => 'smtp_username',
                'value' => 'noreply@companyprofile-aski.com',
                'type' => 'text',
            ],
            [
                'label' => 'SMTP Password',
                'description' => 'Password untuk autentikasi SMTP',
                'group' => 'email',
                'key' => 'smtp_password',
                'value' => 'your_app_password_here',
                'type' => 'text',
            ],
            [
                'label' => 'SMTP Encryption',
                'description' => 'Jenis enkripsi SMTP',
                'group' => 'email',
                'key' => 'smtp_encryption',
                'value' => 'tls',
                'type' => 'select',
            ],
            [
                'label' => 'Email From Address',
                'description' => 'Email pengirim default',
                'group' => 'email',
                'key' => 'mail_from_address',
                'value' => 'noreply@companyprofile-aski.com',
                'type' => 'text',
            ],
            [
                'label' => 'Email From Name',
                'description' => 'Nama pengirim default',
                'group' => 'email',
                'key' => 'mail_from_name',
                'value' => 'Company Profile ASKI',
                'type' => 'text',
            ],
        ];

        foreach ($emailConfigs as $config) {
            Configuration::create($config);
        }
    }
}
