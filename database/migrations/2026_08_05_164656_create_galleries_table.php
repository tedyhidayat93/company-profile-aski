<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Support\Enums\GalleryModule;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            
            // Kolom module menggunakan enum values
            $table->enum('module', GalleryModule::values());
            
            // parent_id mengarah ke ID dari module terkait (nullable jika galeri berdiri sendiri)
            $table->unsignedBigInteger('parent_id')->nullable();
            
            // Informasi File Media
            $table->string('image_path');
            $table->unsignedBigInteger('size')->nullable(); // Ukuran file dalam bytes
            $table->string('mimetype')->nullable();        // Contoh: image/jpeg, image/png
            
            // Metadata Gambar
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('sequence')->default(0);       // Untuk keperluan urutan/sorting
            $table->bigInteger('timestamp')->nullable();   // Custom timestamp jika diperlukan
            
            // Audit Trail Kolom
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes(); // Menambahkan deleted_at

            // Indexes untuk performa pencarian relasi polymorphic-like
            $table->index(['module', 'parent_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};