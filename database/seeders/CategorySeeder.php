<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('categories')->upsert([
            [
                'name' => 'Okupasi / Penutupan Saluran Ilegal',
                'slug' => 'okupasi-penutupan-saluran-ilegal',
                'description' => 'Gangguan berupa okupasi atau penutupan telabah tanpa kewenangan.',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Timbunan Material Konstruksi',
                'slug' => 'timbunan-material-konstruksi',
                'description' => 'Gangguan aliran akibat material konstruksi yang menutup atau menghambat saluran.',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Sumbatan Sampah / Limbah',
                'slug' => 'sumbatan-sampah-limbah',
                'description' => 'Penyumbatan oleh sampah, limbah, atau endapan sejenis.',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Kerusakan Fisik / Jebol / Retak',
                'slug' => 'kerusakan-fisik-jebol-retak',
                'description' => 'Kerusakan struktur fisik telabah seperti jebol, retak, atau longsor kecil.',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Cacat Proyek / Kualitas Pengerjaan Buruk',
                'slug' => 'cacat-proyek-kualitas-pengerjaan-buruk',
                'description' => 'Gangguan akibat kualitas pengerjaan proyek yang buruk atau tidak sesuai.',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['slug'], ['name', 'description', 'is_active', 'updated_at']);
    }
}
