<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            // Menambahkan kolom is_approve dengan tipe boolean (default false)
            if (!Schema::hasColumn('leads', 'is_approve_terms')) {
                $table->boolean('is_approve_terms')->default(false)->after('message');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_leads', function (Blueprint $table) {
            //
        });
    }
};
