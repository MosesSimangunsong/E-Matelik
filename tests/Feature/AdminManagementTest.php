<?php

namespace Tests\Feature;

use App\Enums\ReportStatusSlug;
use App\Enums\RoleSlug;
use App\Enums\ReportPhotoRole;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportStatus;
use App\Models\Role;
use App\Models\Subak;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_report_status_and_history_is_recorded(): void
    {
        Storage::fake('public');

        [$admin, $report, $verifiedStatus, $completedStatus] = $this->seedAdminContext();

        $response = $this->actingAs($admin)
            ->patch(route('admin.reports.update-status', $report), [
                'status_id' => $completedStatus->id,
                'note' => 'Penanganan lapangan telah selesai dan laporan ditutup.',
                'resolution_note' => 'Saluran sudah dibersihkan dan aliran air kembali normal.',
                'resolution_photos' => [
                    UploadedFile::fake()->image('after-admin.jpg'),
                ],
                'resolution_photo_sources' => ['gallery'],
            ]);

        $response->assertRedirect(route('admin.reports.show', $report));

        $report->refresh();

        $this->assertSame($completedStatus->id, $report->status_id);
        $this->assertSame($admin->id, $report->resolved_by);
        $this->assertNotNull($report->resolved_at);
        $this->assertSame('Saluran sudah dibersihkan dan aliran air kembali normal.', $report->resolution_note);

        $this->assertDatabaseHas('report_histories', [
            'report_id' => $report->id,
            'user_id' => $admin->id,
            'from_status_id' => $verifiedStatus->id,
            'to_status_id' => $completedStatus->id,
            'action' => 'completed',
        ]);

        $this->assertDatabaseHas('report_photos', [
            'report_id' => $report->id,
            'uploaded_by' => $admin->id,
            'photo_role' => ReportPhotoRole::ResolutionEvidence->value,
            'captured_from' => 'gallery',
        ]);
    }

    public function test_admin_can_create_and_update_category(): void
    {
        [$admin] = $this->seedAdminContext();

        $this->actingAs($admin)
            ->post(route('admin.categories.store'), [
                'name' => 'Kategori Baru',
                'slug' => 'kategori-baru',
                'description' => 'Kategori untuk uji admin.',
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.categories.index'));

        $category = Category::query()->where('slug', 'kategori-baru')->firstOrFail();

        $this->actingAs($admin)
            ->patch(route('admin.categories.update', $category), [
                'name' => 'Kategori Baru Revisi',
                'slug' => 'kategori-baru',
                'description' => 'Revisi kategori admin.',
                'is_active' => false,
            ])
            ->assertRedirect(route('admin.categories.index'));

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Kategori Baru Revisi',
            'is_active' => false,
        ]);
    }

    public function test_admin_can_create_and_deactivate_user(): void
    {
        [$admin] = $this->seedAdminContext();

        $pelaporRole = Role::query()->where('slug', RoleSlug::Pelapor->value)->firstOrFail();
        $subak = Subak::query()->firstOrFail();

        $this->actingAs($admin)
            ->post(route('admin.users.store'), [
                'name' => 'User Baru',
                'email' => 'userbaru@example.com',
                'phone' => '08123456789',
                'role_id' => $pelaporRole->id,
                'subak_id' => $subak->id,
                'is_active' => true,
                'password' => 'password123',
            ])
            ->assertRedirect(route('admin.users.index'));

        $managedUser = User::query()->where('email', 'userbaru@example.com')->firstOrFail();

        $this->actingAs($admin)
            ->patch(route('admin.users.update', $managedUser), [
                'name' => 'User Baru',
                'email' => 'userbaru@example.com',
                'phone' => '08123456789',
                'role_id' => $pelaporRole->id,
                'subak_id' => $subak->id,
                'is_active' => false,
                'password' => '',
            ])
            ->assertRedirect(route('admin.users.index'));

        $this->assertDatabaseHas('users', [
            'id' => $managedUser->id,
            'is_active' => false,
        ]);
    }

    public function test_admin_cannot_create_pelapor_without_subak(): void
    {
        [$admin] = $this->seedAdminContext();

        $pelaporRole = Role::query()->where('slug', RoleSlug::Pelapor->value)->firstOrFail();

        $this->actingAs($admin)
            ->post(route('admin.users.store'), [
                'name' => 'Pelapor Tanpa Subak',
                'email' => 'tanpasubak@example.com',
                'phone' => '0811111111',
                'role_id' => $pelaporRole->id,
                'subak_id' => '',
                'is_active' => true,
                'password' => 'password123',
            ])
            ->assertSessionHasErrors('subak_id');
    }

    private function seedAdminContext(): array
    {
        $adminRole = Role::query()->create([
            'name' => 'Admin',
            'slug' => RoleSlug::Admin->value,
        ]);

        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Admin',
            'region' => 'Tabanan',
        ]);

        $category = Category::query()->create([
            'name' => 'Sumbatan Sampah / Limbah',
            'slug' => 'sumbatan-sampah-limbah',
            'is_active' => true,
        ]);

        $verifiedStatus = ReportStatus::query()->create([
            'name' => 'Diverifikasi',
            'slug' => ReportStatusSlug::Verified->value,
        ]);

        $completedStatus = ReportStatus::query()->create([
            'name' => 'Selesai',
            'slug' => ReportStatusSlug::Completed->value,
        ]);

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'subak_id' => null,
        ]);

        $pelapor = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        $report = Report::query()->create([
            'report_code' => 'RPT-20260621-ADMN',
            'user_id' => $pelapor->id,
            'subak_id' => $subak->id,
            'category_id' => $category->id,
            'status_id' => $verifiedStatus->id,
            'title' => 'Laporan untuk admin',
            'description' => 'Butuh update status dari admin.',
            'latitude' => '-8.60',
            'longitude' => '115.20',
            'priority_level' => 'medium',
            'submitted_at' => now(),
        ]);

        return [$admin, $report, $verifiedStatus, $completedStatus];
    }
}
