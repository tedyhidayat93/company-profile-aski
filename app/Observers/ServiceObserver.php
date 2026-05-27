<?php

namespace App\Observers;

use App\Models\Service;
use Illuminate\Support\Facades\Cache;

class ServiceObserver
{
    /*
    |--------------------------------------------------------------------------
    | CREATED
    |--------------------------------------------------------------------------
    */

    public function created(
        Service $service
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATED
    |--------------------------------------------------------------------------
    */

    public function updated(
        Service $service
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | DELETED
    |--------------------------------------------------------------------------
    */

    public function deleted(
        Service $service
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | RESTORED
    |--------------------------------------------------------------------------
    */

    public function restored(
        Service $service
    ): void {

        $this->clearCaches();
    }

    /*
    |--------------------------------------------------------------------------
    | FORCE DELETED
    |--------------------------------------------------------------------------
    */

    public function forceDeleted(
        Service $service
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
        Cache::forget('homepage.services');
        Cache::forget('shared.footer.services');
    }
}