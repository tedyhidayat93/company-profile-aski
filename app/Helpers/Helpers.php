<?php

if (! function_exists('resolve_image_path')) {
    /**
     * Resolve public asset URL for images with placeholder fallback.
     *
     * @param string|null $path
     * @return string
     */
    function resolve_image_path(?string $path): string
    {
        $baseUrl = rtrim(config('app.url'), '/');
        
        if (empty($path)) {
            return $baseUrl . '/images/placeholder.png';
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return $baseUrl . '/storage/' . ltrim($path, '/');
    }
}