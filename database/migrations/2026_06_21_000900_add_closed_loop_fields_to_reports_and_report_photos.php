<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->foreignId('resolved_by')->nullable()->after('verified_by')->constrained('users')->nullOnDelete();
            $table->text('resolution_note')->nullable()->after('verification_note');
            $table->timestamp('resolved_at')->nullable()->after('verified_at');
        });

        Schema::table('report_photos', function (Blueprint $table) {
            $table->string('photo_role')->default('initial_evidence')->after('file_size');
            $table->string('file_hash', 64)->nullable()->after('photo_role');
            $table->string('captured_from')->default('unknown')->after('file_hash');
        });
    }

    public function down(): void
    {
        Schema::table('report_photos', function (Blueprint $table) {
            $table->dropColumn(['photo_role', 'file_hash', 'captured_from']);
        });

        Schema::table('reports', function (Blueprint $table) {
            $table->dropConstrainedForeignId('resolved_by');
            $table->dropColumn(['resolution_note', 'resolved_at']);
        });
    }
};
