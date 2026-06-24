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
            // Gunakan Schema::hasColumn() agar aman dari error duplicate column
            if (!Schema::hasColumn('patrol_logs', 'patrol_date')) {
                $table->date('patrol_date')->nullable();
            }
            
            if (!Schema::hasColumn('patrol_logs', 'scanned_at')) {
                $table->timestamp('scanned_at')->nullable();
            }
            
            if (!Schema::hasColumn('patrol_logs', 'gps_latitude')) {
                $table->decimal('gps_latitude', 10, 7)->nullable();
            }
            
            if (!Schema::hasColumn('patrol_logs', 'gps_longitude')) {
                $table->decimal('gps_longitude', 11, 7)->nullable();
            }
            
            if (!Schema::hasColumn('patrol_logs', 'inspection_note')) {
                $table->text('inspection_note')->nullable();
            }

            // Opsional: Pastikan kolom status juga ada jika sebelumnya belum terbuat
            if (!Schema::hasColumn('patrol_logs', 'status')) {
                $table->string('status')->default('safe');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patrol_logs', function (Blueprint $table) {
            if (Schema::hasColumn('patrol_logs', 'patrol_date')) {
                $table->dropColumn('patrol_date');
            }
            if (Schema::hasColumn('patrol_logs', 'scanned_at')) {
                $table->dropColumn('scanned_at');
            }
            if (Schema::hasColumn('patrol_logs', 'gps_latitude')) {
                $table->dropColumn('gps_latitude');
            }
            if (Schema::hasColumn('patrol_logs', 'gps_longitude')) {
                $table->dropColumn('gps_longitude');
            }
            if (Schema::hasColumn('patrol_logs', 'inspection_note')) {
                $table->dropColumn('inspection_note');
            }
            if (Schema::hasColumn('patrol_logs', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};