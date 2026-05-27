<?php

namespace App\Observers;

use App\Models\Testimonial;
use Illuminate\Support\Facades\Cache;

class TestimonialObserver
{
    /*
    |--------------------------------------------------------------------------
    | CREATED
    |--------------------------------------------------------------------------
    */

    public function created(
        Testimonial $testimonial
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATED
    |--------------------------------------------------------------------------
    */

    public function updated(
        Testimonial $testimonial
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | DELETED
    |--------------------------------------------------------------------------
    */

    public function deleted(
        Testimonial $testimonial
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | RESTORED
    |--------------------------------------------------------------------------
    */

    public function restored(
        Testimonial $testimonial
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | FORCE DELETED
    |--------------------------------------------------------------------------
    */

    public function forceDeleted(
        Testimonial $testimonial
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | CLEAR CACHE
    |--------------------------------------------------------------------------
    */

    private function clearCaches(): void
    {
        Cache::forget('homepage.testimonials');
    }
}