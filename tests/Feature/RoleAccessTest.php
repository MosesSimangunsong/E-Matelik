<?php

namespace Tests\Feature;

use App\Enums\RoleSlug;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_pelapor_cannot_access_admin_routes(): void
    {
        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $pelapor = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => null,
        ]);

        $this->actingAs($pelapor)
            ->get(route('admin.reports.index'))
            ->assertForbidden();
    }

    public function test_admin_cannot_access_pekaseh_verification_routes(): void
    {
        $adminRole = Role::query()->create([
            'name' => 'Admin',
            'slug' => RoleSlug::Admin->value,
        ]);

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'subak_id' => null,
        ]);

        $this->actingAs($admin)
            ->get(route('verification.index'))
            ->assertForbidden();
    }
}
