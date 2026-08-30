<?php

namespace App\Models;

use App\Support\Enums\GalleryModule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'galleries';

    protected $fillable = [
        'module',
        'parent_id',
        'image_path',
        'size',
        'mimetype',
        'title',
        'description',
        'sequence',
        'timestamp',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'module' => GalleryModule::class,
        'parent_id' => 'integer',
        'size' => 'integer',
        'sequence' => 'integer',
        'timestamp' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (Auth::check() && empty($model->created_by)) {
                $model->created_by = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });

        static::deleting(function ($model) {
            if (Auth::check() && method_exists($model, 'isForceDeleting') && !$model->isForceDeleting()) {
                $model->deleted_by = Auth::id();
                $model->save();
            }
        });
    }

    /**
     * Reusable method untuk menyimpan gambar galeri dari modul apa saja.
     *
     * @param UploadFile $file Berkas file dari request
     * @param GalleryModule|string $module Enum atau string modul (contoh: GalleryModule::BLOG)
     * @param int|null $parentId ID dari entitas terkait (misal: ID Article/Blog)
     * @param array $additionalData Data tambahan opsional (title, description, sequence, dll)
     * @return self
     */
    public static function storeImage(UploadedFile $file, GalleryModule|string $module, ?int $parentId = null, array $additionalData = []): self
    {
        // 1. Tentukan folder penyimpanan berdasarkan modul
        $moduleName = $module instanceof GalleryModule ? $module->value : $module;
        $folder = "galleries/{$moduleName}";

        // 2. Simpan file ke storage (public disk)
        $imagePath = $file->store($folder, 'public');

        // 3. Tentukan sequence otomatis jika tidak disediakan di additionalData
        $sequence = $additionalData['sequence'] ?? (self::where('module', $moduleName)
            ->when($parentId, fn($q) => $q->where('parent_id', $parentId))
            ->max('sequence') + 1);

        // 4. Masukkan data ke database
        return self::create([
            'module' => $moduleName,
            'parent_id' => $parentId,
            'image_path' => $imagePath,
            'size' => $file->getSize(),
            'mimetype' => $file->getMimeType(),
            'title' => $additionalData['title'] ?? $file->getClientOriginalName(),
            'description' => $additionalData['description'] ?? null,
            'sequence' => $sequence,
            'timestamp' => $additionalData['timestamp'] ?? now()->timestamp,
        ]);
    }

    // --- Relasi Opsional ---
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}