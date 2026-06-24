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
        Schema::table('reports', function (Blueprint $table) {
            // Menambahkan kolom patrol_point_id setelah status_id agar rapi
            $table->foreignId('patrol_point_id')
                  ->nullable()
                  ->after('status_id')
                  ->constrained('patrol_points')
                  ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            // Drop foreign key terlebih dahulu, baru drop kolomnya
            $table->dropForeign(['patrol_point_id']);
            $table->dropColumn('patrol_point_id');
        });
    }
};