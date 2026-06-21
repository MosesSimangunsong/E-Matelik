<?php

namespace Tests\Feature;

use App\Enums\ReportStatusSlug;
use App\Enums\RoleSlug;
use Inertia\Testing\AssertableInertia;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportStatus;
use App\Models\Role;
use App\Models\Subak;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MapPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_pelapor_can_open_map_page(): void
    {
        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $status = ReportStatus::query()->create([
            'name' => 'Menunggu Verifikasi',
            'slug' => ReportStatusSlug::PendingVerification->value,
        ]);

        $category = Category::query()->create([
            'name' => 'Timbunan Material Konstruksi',
            'slug' => 'timbunan-material-konstruksi',
            'is_active' => true,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Peta',
            'region' => 'Badung',
        ]);

        $user = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        Report::query()->create([
            'report_code' => 'RPT-20260621-MAP1',
            'user_id' => $user->id,
            'subak_id' => $subak->id,
            'category_id' => $category->id,
            'status_id' => $status->id,
            'title' => 'Material menutup alur',
            'description' => 'Ada timbunan pasir pada telabah.',
            'latitude' => '-8.61',
            'longitude' => '115.19',
            'priority_level' => 'medium',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get(route('map.index'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Map/Index')
                ->where('mapReports.0.reporter.scope', 'masked')
                ->where('mapReports.0.reporter.label', 'Pelapor terverifikasi')
            );
    }
}
