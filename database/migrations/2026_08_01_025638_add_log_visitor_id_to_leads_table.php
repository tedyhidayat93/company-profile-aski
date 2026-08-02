<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            // Menambahkan foreign key atau kolom id ke log_visitors (sesuaikan nama tabel log visitor Anda)
            $table->unsignedBigInteger('log_visitor_id')->nullable()->after('id');
            
            // Jika tabel log visitor Anda bernama 'log_visitors':
            // $table->foreign('log_visitor_id')->references('id')->on('log_visitors')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn('log_visitor_id');
        });
    }
};