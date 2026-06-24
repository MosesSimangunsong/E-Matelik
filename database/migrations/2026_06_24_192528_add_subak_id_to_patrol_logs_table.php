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
        Schema::table('patrol_logs', function (Blueprint $table) {
            // Cek apakah kolom belum ada sebelum menambahkan
            if (!Schema::hasColumn('patrol_logs', 'subak_id')) {
                // Menambahkan kolom subak_id dengan foreign key ke tabel subaks
                // Menggunakan nullable() agar aman terhadap data yang sudah ada di database
                $table->foreignId('subak_id')
                      ->nullable()
                      ->constrained('subaks')
                      ->cascadeOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patrol_logs', function (Blueprint $table) {
            if (Schema::hasColumn('patrol_logs', 'subak_id')) {
                // Drop foreign key constraint terlebih dahulu, lalu drop kolomnya
                $table->dropForeign(['subak_id']);
                $table->dropColumn('subak_id');
            }
        });
    }
};