<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\TracksVisitors;

class TestimonialController extends Controller
{
    use TracksVisitors;
    public function index(Request $request): Response
    {
        // Track visitor
        $this->trackPageVisit($request, 'Testimonials');
        
        // Get all testimonials for listing page
        $testimonials = Testimonial::public()
            ->ordered()
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->nama,
                    'role' => $testimonial->keterangan,
                    'company' => $testimonial->perusahaan,
                    'content' => $testimonial->testimoni,
                    'avatar' => $testimonial->foto_avatar ?? '/images/avatar-placeholder.png',
                    'rating' => $testimonial->rate_star,
                    'created_at' => $testimonial->created_at->format('d M Y'),
                    'featured' => $testimonial->sequence === 1, // First testimonial is featured
                ];
            });

        // Get featured testimonial for hero section
        $featuredTestimonial = Testimonial::public()
            ->ordered()
            ->first();
            
        $featuredTestimonialData = null;
        if ($featuredTestimonial) {
            $featuredTestimonialData = [
                'id' => $featuredTestimonial->id,
                'name' => $featuredTestimonial->nama,
                'role' => $featuredTestimonial->keterangan,
                'company' => $featuredTestimonial->perusahaan,
                'content' => $featuredTestimonial->testimoni,
                'avatar' => $featuredTestimonial->foto_avatar ?? '/images/avatar-placeholder.png',
                'rating' => $featuredTestimonial->rate_star,
                'created_at' => $featuredTestimonial->created_at->format('d M Y'),
            ];
        }

        return Inertia::render('frontend/testimonial/index', [
            'testimonials' => $testimonials,
            'featuredTestimonial' => $featuredTestimonialData,
            'stats' => [
                'total_testimonials' => $testimonials->count(),
                'average_rating' => $testimonials->avg('rating'),
                'companies_served' => $testimonials->pluck('company')->filter()->unique()->count(),
            ]
        ]);
    }

    public function show(Request $request, $id): Response
    {
        // Track visitor
        $this->trackPageVisit($request, 'Testimonial Detail - ' . $id);
        
        $testimonial = Testimonial::public()
            ->findOrFail($id);

        $testimonialData = [
            'id' => $testimonial->id,
            'name' => $testimonial->nama,
            'role' => $testimonial->keterangan,
            'company' => $testimonial->perusahaan,
            'content' => $testimonial->testimoni,
            'avatar' => $testimonial->foto_avatar ?? '/images/avatar-placeholder.png',
            'rating' => $testimonial->rate_star,
            'created_at' => $testimonial->created_at->format('d M Y'),
            'updated_at' => $testimonial->updated_at->format('d M Y'),
        ];

        // Get related testimonials (excluding current one)
        $relatedTestimonials = Testimonial::public()
            ->where('id', '!=', $id)
            ->ordered()
            ->take(3)
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->nama,
                    'role' => $testimonial->keterangan,
                    'company' => $testimonial->perusahaan,
                    'content' => $testimonial->testimoni,
                    'avatar' => $testimonial->foto_avatar ?? '/images/avatar-placeholder.png',
                    'rating' => $testimonial->rate_star,
                    'created_at' => $testimonial->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('frontend/testimonial/show', [
            'testimonial' => $testimonialData,
            'relatedTestimonials' => $relatedTestimonials,
        ]);
    }
}