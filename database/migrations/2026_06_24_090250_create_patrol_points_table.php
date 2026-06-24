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
        Schema::create('patrol_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subak_id')->constrained('subaks')->restrictOnDelete();
            $table->foreignId('created_by')->constrained('users')->restrictOnDelete();
            
            $table->string('point_code')->unique();
            $table->string('name');
            $table->string('point_type');
            $table->text('description')->nullable();
            
            // Presisi 10 total digit, 7 di belakang koma untuk akurasi GPS tinggi
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            
            $table->string('reference_photo_path')->nullable();
            $table->string('qr_token')->unique();
            $table->integer('patrol_order')->nullable();
            $table->boolean('is_active')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patrol_points');
    }
};