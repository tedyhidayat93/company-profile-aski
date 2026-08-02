<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('type')->index();             // Menyimpan jenis/mode leads (contoh: 'whatsapp', 'contact_form', 'brochure_download')
            $table->string('name')->nullable();          // Nama calon customer
            $table->string('phone')->nullable();         // No telepon / WhatsApp
            $table->string('email')->nullable();         // Email (opsional jika dibutuhkan tipe lain)
            $table->text('message')->nullable();         // Pesan / Catatan
            $table->string('action')->nullable();        // Trigger action spesifik (opsional)
            $table->string('ip_address')->nullable();    // IP Address pengunjung
            $table->string('country')->nullable();       // Negara
            $table->string('region')->nullable();        // Wilayah/Kota
            $table->string('page_url')->nullable();      // URL halaman asal leads diambil
            $table->timestamp('timestamp')->useCurrent();// Waktu interaksi terjadi
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};