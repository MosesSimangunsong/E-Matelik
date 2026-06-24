<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patrol_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patrol_point_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // checked_by
            
            // Status kondisi sesuai PRD baru
            $table->enum('condition_status', ['safe', 'needs_attention', 'damaged'])->default('safe');
            $table->text('inspection_note')->nullable();
            
            // Lokasi GPS saat scan dilakukan
            $table->decimal('gps_latitude', 10, 8)->nullable();
            $table->decimal('gps_longitude', 11, 8)->nullable();
            
            // Terhubung ke tabel reports jika kondisi "damaged" dan pelapor membuat laporan
            $table->foreignId('report_id')->nullable()->constrained('reports')->nullOnDelete();
            
            $table->timestamps(); // created_at akan bertindak sebagai checked_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patrol_logs');
    }
};