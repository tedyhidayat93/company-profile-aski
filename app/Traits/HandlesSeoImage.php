<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

trait HandlesSeoImage
{
    protected function optimizeSeoImage(
        UploadedFile $file,
        string $directory = 'uploads',
        int $width = 1200,
        int $height = 630,
        int $quality = 82
    ): string {

        /*
        |--------------------------------------------------------------------------
        | Filename
        |--------------------------------------------------------------------------
        */

        $filename =
            uniqid('seo_')
            . '.webp';

        /*
        |--------------------------------------------------------------------------
        | Read Image
        |--------------------------------------------------------------------------
        */

        $image = Image::read(
            $file->getRealPath()
        );

        /*
        |--------------------------------------------------------------------------
        | Cover Resize
        |--------------------------------------------------------------------------
        */

        $image->cover(
            $width,
            $height
        );

        /*
        |--------------------------------------------------------------------------
        | Encode WebP
        |--------------------------------------------------------------------------
        */

        $encoded = $image->toWebp(
            $quality
        );

        /*
        |--------------------------------------------------------------------------
        | Save
        |--------------------------------------------------------------------------
        */

        $path =
            $directory
            . '/'
            . $filename;

        Storage::disk('public')->put(
            $path,
            (string) $encoded
        );

        return $path;
    }
}