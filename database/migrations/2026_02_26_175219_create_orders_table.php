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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->string('company_name');
            $table->string('pic_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->string('province');
            $table->string('regency');
            $table->string('district');
            $table->string('village');
            $table->string('postal_code');
            $table->text('notes')->nullable();
            
            // Product information
            $table->unsignedBigInteger('product_id');
            $table->string('product_name');
            $table->string('product_category');
            $table->string('product_image');
            $table->decimal('product_price', 12, 2);
            $table->integer('quantity');
            $table->decimal('total_price', 12, 2);
            
            // Order status
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'])->default('pending');
            $table->text('admin_notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['status', 'created_at']);
            $table->index('order_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
