<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('roles')->upsert([
            [
                'name' => 'Pelapor',
                'slug' => 'pelapor',
                'description' => 'Pelapor lapangan yang membuat laporan gangguan telabah.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Pekaseh',
                'slug' => 'pekaseh',
                'description' => 'Verifikator awal laporan pada lingkup Subak.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Pengelola sistem dan seluruh laporan.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['slug'], ['name', 'description', 'updated_at']);
    }
}
