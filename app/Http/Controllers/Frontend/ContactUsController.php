<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache; // Pastikan Cache di-import
use Inertia\Inertia;
use App\Traits\TracksVisitors;

class ContactUsController extends Controller
{
    use TracksVisitors;

    public function index(Request $request)
    {
        $this->trackPageVisit($request, 'Contact Us Index');
        
        $getConfigs = Configuration::query()
            ->pluck('value', 'key');

        $seo = [
            'title'       => $getConfigs['site_name'] ?? 'Contact Us',
            'description' => $getConfigs['meta_description'] ?? 'Layanan terbaik dari Alumoda Sinergi Kontainer Indonesia.',
            'keywords'    => $getConfigs['meta_keywords'] ?? 'service container, modifikasi container',
            'image'       => !empty($getConfigs['homepage_meta_image'])
                ? asset('storage/' . $getConfigs['homepage_meta_image'])
                : asset('images/placeholder.png'),
            'type'        => 'website',
        ];

        $data = [
            'site_name' => '',
            'about_us' => [
                'about' => $getConfigs['about_detail'],
                'tagline' => $getConfigs['site_tagline'],
                'video_profile' => $getConfigs['video_profile'],
                'vision' => $getConfigs['about_vision'],
                'mission' => $getConfigs['about_mission'],
                'office_branch' => $getConfigs['office_branch'],
                'site_operational_hour' => $getConfigs['site_operational_hour'],
                'company_profile_pdf' => $getConfigs['company_profile_pdf'],
            ],
            'contact' => [
                'email' => $getConfigs['contact_email'],
                'whatsapp' => $getConfigs['contact_whatsapp'],
                'phone' => $getConfigs['contact_phone'],
            ],
            'social_media' => [
                'tiktok' => $getConfigs['social_tiktok'],
                'instagram' => $getConfigs['social_instagram'],
                'x' => $getConfigs['social_twitter'],
                'facebook' => $getConfigs['social_facebook'],
                'youtube' => $getConfigs['social_youtube'],
            ],
            'google_maps_embed' => $getConfigs['google_maps_embed'],
        ];

        return Inertia::render('frontend/contact_us', [
            'seo'      => $seo,
            'data'   => $data,
        ]);
    }

    public function about(Request $request)
    {
        // Catatan: sesuaikan string tracking jika ini memang halaman About Us
        $this->trackPageVisit($request, 'About Us Index');
        
        $getConfigs = Configuration::query()
            ->pluck('value', 'key');

        /*
        |--------------------------------------------------------------------------
        | SEO & Fallback Configuration for About Us Page
        |--------------------------------------------------------------------------
        */
        $seo = [
            'title' => !empty($getConfigs['about_us_meta_title']) 
                ? strip_tags($getConfigs['about_us_meta_title']) 
                : (!empty($getConfigs['site_name']) ? strip_tags($getConfigs['site_name']) . ' | Tentang Kami' : 'Tentang Kami | Alumoda Sinergi Kontainer Indonesia'),

            'description' => !empty($getConfigs['about_us_meta_description']) 
                ? strip_tags($getConfigs['about_us_meta_description']) 
                : (!empty($getConfigs['meta_description']) ? strip_tags($getConfigs['meta_description']) : 'Pelajari profil Alumoda Sinergi Kontainer Indonesia, penyedia layanan jual, beli, sewa, dan repair kontainer terbaik.'),

            'keywords' => !empty($getConfigs['meta_keywords']) 
                ? strip_tags($getConfigs['meta_keywords']) 
                : 'jual kontainer, sewa kontainer, beli kontainer, repair kontainer, modifikasi kontainer, alumoda',

            'image' => match (true) {
                !empty($getConfigs['about_us_meta_image']) => asset(
                    str_starts_with($getConfigs['about_us_meta_image'], 'configurations/') || str_starts_with($getConfigs['about_us_meta_image'], 'seo/')
                        ? 'storage/' . $getConfigs['about_us_meta_image']
                        : $getConfigs['about_us_meta_image']
                ),
                
                !empty($getConfigs['homepage_meta_image']) => asset('storage/' . $getConfigs['homepage_meta_image']),
                
                default => asset('images/logo-main.png'),
            },

            'type' => 'website',
        ];

        $data = [
            'site_name' => $getConfigs['site_name'] ?? '',
            'site_tagline' => $getConfigs['site_tagline'] ?? '',
            'site_tagline' => $getConfigs['site_tagline'] ?? '',
            'meta_description' => $getConfigs['meta_description'] ?? '',
            'about_us' => [
                'about' => $getConfigs['about_detail'] ?? '',
                'tagline' => $getConfigs['site_tagline'] ?? '',
                'video_profile' => $getConfigs['video_profile'] ?? '',
                'vision' => $getConfigs['about_vision'] ?? '',
                'mission' => $getConfigs['about_mission'] ?? '',
                'office_branch' => $getConfigs['office_branch'] ?? '',
                'site_operational_hour' => $getConfigs['site_operational_hour'] ?? '',
                'company_profile_pdf' => $getConfigs['company_profile_pdf'] ?? '',
            ],
            'contact' => [
                'email' => $getConfigs['contact_email'] ?? '',
                'whatsapp' => $getConfigs['contact_whatsapp'] ?? '',
                'phone' => $getConfigs['contact_phone'] ?? '',
            ],
            'social_media' => [
                'tiktok' => $getConfigs['social_tiktok'] ?? '',
                'instagram' => $getConfigs['social_instagram'] ?? '',
                'x' => $getConfigs['social_twitter'] ?? '',
                'facebook' => $getConfigs['social_facebook'] ?? '',
                'youtube' => $getConfigs['social_youtube'] ?? '',
            ],
            'google_maps_embed' => $getConfigs['google_maps_embed'] ?? '',
        ];

        // Jika ini halaman About Us, pastikan path-nya benar (misal: 'frontend/about_us')
        return Inertia::render('frontend/about_us', [
            'seo'  => $seo,
            'data' => $data,
        ]);
    }
}