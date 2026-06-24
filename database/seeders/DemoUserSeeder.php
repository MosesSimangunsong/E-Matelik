<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Subak;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('slug', 'admin')->first();
        $pekasehRole = Role::where('slug', 'pekaseh')->first();
        $pelaporRole = Role::where('slug', 'pelapor')->first();

        $subak = Subak::first();

        if (! $adminRole || ! $pekasehRole || ! $pelaporRole || ! $subak) {
            throw new \Exception('Role admin/pekaseh/pelapor atau data subak belum tersedia. Pastikan RoleSeeder dan SubakSeeder berjalan sebelum DemoUserSeeder.');
        }

        User::updateOrCreate(
            ['email' => 'admin@ematelik.test'],
            [
                'name' => 'Admin E-Matelik',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'subak_id' => $subak->id,
            ]
        );

        User::updateOrCreate(
            ['email' => 'pekaseh@ematelik.test'],
            [
                'name' => 'Pekaseh Demo',
                'password' => Hash::make('password'),
                'role_id' => $pekasehRole->id,
                'subak_id' => $subak->id,
            ]
        );

        User::updateOrCreate(
            ['email' => 'pelapor@ematelik.test'],
            [
                'name' => 'Pelapor Demo',
                'password' => Hash::make('password'),
                'role_id' => $pelaporRole->id,
                'subak_id' => $subak->id,
            ]
        );
    }
}