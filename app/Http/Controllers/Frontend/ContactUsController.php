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
                'vision' => $getConfigs['about_vision'],
                'mission' => $getConfigs['about_mission'],
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
}