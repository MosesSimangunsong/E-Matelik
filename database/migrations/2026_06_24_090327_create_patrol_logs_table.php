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
        Schema::create('patrol_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patrol_point_id')->constrained('patrol_points')->restrictOnDelete();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('subak_id')->constrained('subaks')->restrictOnDelete();
            
            $table->date('patrol_date');
            $table->timestamp('scanned_at')->useCurrent();
            
            $table->decimal('gps_latitude', 10, 7)->nullable();
            $table->decimal('gps_longitude', 10, 7)->nullable();
            
            $table->string('inspection_photo_path')->nullable();
            $table->text('inspection_note')->nullable();
            
            $table->string('status')->default('checked');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patrol_logs');
    }
};