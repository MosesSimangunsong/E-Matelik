<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubakSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('subaks')->updateOrInsert(
            ['name' => 'Subak Demo E-Matelik'],
            [
                'region' => 'Tabanan',
                'village' => 'Demo Village',
                'district' => 'Demo District',
                'description' => 'Data bootstrap Subak untuk pengembangan dan demo MVP.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        );
    }
}
