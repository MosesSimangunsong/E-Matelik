<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReportStatusSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('report_statuses')->upsert([
            [
                'name' => 'Menunggu Verifikasi',
                'slug' => 'menunggu-verifikasi',
                'description' => 'Status awal laporan yang baru dikirim oleh pelapor.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Diverifikasi',
                'slug' => 'diverifikasi',
                'description' => 'Laporan telah diverifikasi oleh Pekaseh.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Perlu Klarifikasi',
                'slug' => 'perlu-klarifikasi',
                'description' => 'Laporan membutuhkan informasi tambahan sebelum diproses lebih lanjut.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Diekskalasi',
                'slug' => 'diekskalasi',
                'description' => 'Laporan diteruskan ke admin atau pihak terkait untuk penanganan lanjutan.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Diproses',
                'slug' => 'diproses',
                'description' => 'Laporan sedang ditindaklanjuti oleh admin atau pihak terkait.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Selesai',
                'slug' => 'selesai',
                'description' => 'Laporan telah selesai ditangani.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Ditolak',
                'slug' => 'ditolak',
                'description' => 'Laporan ditolak karena tidak valid atau tidak memenuhi kriteria.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['slug'], ['name', 'description', 'updated_at']);
    }
}
