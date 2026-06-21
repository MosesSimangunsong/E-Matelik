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
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PelaporReportTest extends TestCase
{
    use RefreshDatabase;

    public function test_pelapor_can_create_a_report_with_photo_and_history(): void
    {
        Storage::fake('public');

        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Uma Lambing',
            'region' => 'Tabanan',
        ]);

        $category = Category::query()->create([
            'name' => 'Sumbatan Sampah / Limbah',
            'slug' => 'sumbatan-sampah-limbah',
            'is_active' => true,
        ]);

        $status = ReportStatus::query()->create([
            'name' => 'Menunggu Verifikasi',
            'slug' => ReportStatusSlug::PendingVerification->value,
        ]);

        $user = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('reports.store'), [
                'title' => 'Telabah tersumbat batu dan plastik',
                'category_id' => $category->id,
                'description' => 'Aliran air menyempit dan meluber ke pematang.',
                'latitude' => '-8.6500000',
                'longitude' => '115.2160000',
                'address_text' => 'Dekat saluran utama sisi timur.',
                'photos' => [
                    UploadedFile::fake()->image('bukti-1.jpg'),
                ],
                'photo_sources' => ['gallery'],
            ]);

        $report = Report::query()->first();

        $response->assertRedirect(route('reports.show', $report));

        $this->assertDatabaseHas('reports', [
            'id' => $report->id,
            'user_id' => $user->id,
            'subak_id' => $subak->id,
            'category_id' => $category->id,
            'status_id' => $status->id,
            'title' => 'Telabah tersumbat batu dan plastik',
        ]);

        $this->assertDatabaseHas('report_photos', [
            'report_id' => $report->id,
            'uploaded_by' => $user->id,
            'photo_role' => ReportPhotoRole::InitialEvidence->value,
            'captured_from' => 'gallery',
        ]);

        $this->assertNotNull($report->photos()->first()->file_hash);

        $this->assertDatabaseHas('report_histories', [
            'report_id' => $report->id,
            'user_id' => $user->id,
            'action' => 'created',
            'to_status_id' => $status->id,
        ]);

        Storage::disk('public')->assertExists($report->photos()->first()->photo_path);
    }

    public function test_pelapor_can_only_view_their_own_report_detail(): void
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
            'name' => 'Kerusakan Fisik / Jebol / Retak',
            'slug' => 'kerusakan-fisik-jebol-retak',
            'is_active' => true,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Anyar',
            'region' => 'Gianyar',
        ]);

        $owner = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        $otherUser = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        $report = Report::query()->create([
            'report_code' => 'RPT-20260621-ABCD',
            'user_id' => $owner->id,
            'subak_id' => $subak->id,
            'category_id' => $category->id,
            'status_id' => $status->id,
            'title' => 'Retakan pada dinding telabah',
            'description' => 'Retakan memanjang sekitar dua meter.',
            'latitude' => '-8.6400000',
            'longitude' => '115.2300000',
            'priority_level' => 'medium',
            'submitted_at' => now(),
        ]);

        $this->actingAs($otherUser)
            ->get(route('reports.show', $report))
            ->assertForbidden();
    }

    public function test_pelapor_report_submission_is_rate_limited(): void
    {
        Storage::fake('public');

        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Rate Limit',
            'region' => 'Gianyar',
        ]);

        $category = Category::query()->create([
            'name' => 'Gangguan Lainnya',
            'slug' => 'gangguan-lainnya',
            'is_active' => true,
        ]);

        ReportStatus::query()->create([
            'name' => 'Menunggu Verifikasi',
            'slug' => ReportStatusSlug::PendingVerification->value,
        ]);

        $user = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        for ($i = 1; $i <= 5; $i++) {
            $this->actingAs($user)
                ->post(route('reports.store'), [
                    'title' => "Laporan {$i}",
                    'category_id' => $category->id,
                    'description' => 'Laporan uji pembatasan kirim.',
                    'latitude' => '-8.6500000',
                    'longitude' => '115.2160000',
                    'address_text' => 'Titik uji rate limit.',
                    'photos' => [UploadedFile::fake()->image("bukti-{$i}.jpg")],
                ])
                ->assertRedirect();
        }

        $this->actingAs($user)
            ->post(route('reports.store'), [
                'title' => 'Laporan 6',
                'category_id' => $category->id,
                'description' => 'Laporan keenam harus tertahan.',
                'latitude' => '-8.6500000',
                'longitude' => '115.2160000',
                'address_text' => 'Titik uji rate limit.',
                'photos' => [UploadedFile::fake()->image('bukti-6.jpg')],
            ])
            ->assertStatus(429);
    }
}
