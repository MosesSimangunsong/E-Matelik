<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('patrol_logs', 'report_id')) {
            Schema::table('patrol_logs', function (Blueprint $table) {
                $table->foreignId('report_id')
                    ->nullable()
                    ->constrained('reports')
                    ->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('patrol_logs', 'report_id')) {
            Schema::table('patrol_logs', function (Blueprint $table) {
                $table->dropConstrainedForeignId('report_id');
            });
        }
    }
};