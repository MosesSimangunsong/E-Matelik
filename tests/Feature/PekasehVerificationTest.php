<?php

namespace Tests\Feature;

use App\Enums\PekasehVerdict;
use App\Enums\ReportPhotoRole;
use App\Enums\ReportStatusSlug;
use App\Enums\RoleSlug;
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

class PekasehVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_pekaseh_can_complete_report_internally_without_creating_new_status(): void
    {
        Storage::fake('public');

        [$pekaseh, $report, $pendingStatus, $completedStatus] = $this->seedVerificationContext();

        $response = $this->actingAs($pekaseh)
            ->patch(route('verification.update', $report), [
                'verdict' => PekasehVerdict::CompletedInternal->value,
                'verification_note' => 'Masalah sudah diselesaikan lewat kerja bakti internal Subak.',
                'resolution_photos' => [
                    UploadedFile::fake()->image('after-internal.jpg'),
                ],
                'resolution_photo_sources' => ['camera'],
            ]);

        $response->assertRedirect(route('verification.index'));

        $report->refresh();

        $this->assertSame($completedStatus->id, $report->status_id);
        $this->assertSame($pekaseh->id, $report->verified_by);
        $this->assertSame($pekaseh->id, $report->resolved_by);
        $this->assertNotNull($report->verified_at);
        $this->assertNotNull($report->resolved_at);
        $this->assertSame('Masalah sudah diselesaikan lewat kerja bakti internal Subak.', $report->verification_note);
        $this->assertSame('Masalah sudah diselesaikan lewat kerja bakti internal Subak.', $report->resolution_note);

        $this->assertDatabaseHas('report_histories', [
            'report_id' => $report->id,
            'user_id' => $pekaseh->id,
            'from_status_id' => $pendingStatus->id,
            'to_status_id' => $completedStatus->id,
            'action' => 'completed_internal',
        ]);

        $this->assertDatabaseHas('report_photos', [
            'report_id' => $report->id,
            'uploaded_by' => $pekaseh->id,
            'photo_role' => ReportPhotoRole::ResolutionEvidence->value,
            'captured_from' => 'camera',
        ]);
    }

    public function test_pekaseh_can_only_verify_report_in_same_subak(): void
    {
        [$pekaseh, $report] = $this->seedVerificationContext();

        $otherSubak = Subak::query()->create([
            'name' => 'Subak Lain',
            'region' => 'Karangasem',
        ]);

        $report->update(['subak_id' => $otherSubak->id]);

        $this->actingAs($pekaseh)
            ->patch(route('verification.update', $report), [
                'verdict' => PekasehVerdict::Valid->value,
                'verification_note' => 'Tidak boleh lolos karena beda Subak.',
            ])
            ->assertForbidden();
    }

    public function test_pekaseh_can_view_full_reporter_identity_on_verification_pages(): void
    {
        [$pekaseh, $report] = $this->seedVerificationContext();

        $this->actingAs($pekaseh)
            ->get(route('verification.show', $report))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Verification/Show')
                ->where('report.reporter.scope', 'full')
                ->where('report.reporter.label', 'Pelapor terverifikasi')
            );
    }

    private function seedVerificationContext(): array
    {
        $pelaporRole = Role::query()->create([
            'name' => 'Pelapor',
            'slug' => RoleSlug::Pelapor->value,
        ]);

        $pekasehRole = Role::query()->create([
            'name' => 'Pekaseh',
            'slug' => RoleSlug::Pekaseh->value,
        ]);

        $subak = Subak::query()->create([
            'name' => 'Subak Pekaseh',
            'region' => 'Bangli',
        ]);

        $category = Category::query()->create([
            'name' => 'Okupasi / Penutupan Saluran Ilegal',
            'slug' => 'okupasi-penutupan-saluran-ilegal',
            'is_active' => true,
        ]);

        $pendingStatus = ReportStatus::query()->create([
            'name' => 'Menunggu Verifikasi',
            'slug' => ReportStatusSlug::PendingVerification->value,
        ]);

        ReportStatus::query()->create([
            'name' => 'Diverifikasi',
            'slug' => ReportStatusSlug::Verified->value,
        ]);

        ReportStatus::query()->create([
            'name' => 'Perlu Klarifikasi',
            'slug' => ReportStatusSlug::NeedsClarification->value,
        ]);

        ReportStatus::query()->create([
            'name' => 'Diekskalasi',
            'slug' => ReportStatusSlug::Escalated->value,
        ]);

        $completedStatus = ReportStatus::query()->create([
            'name' => 'Selesai',
            'slug' => ReportStatusSlug::Completed->value,
        ]);

        $pelapor = User::factory()->create([
            'role_id' => $pelaporRole->id,
            'subak_id' => $subak->id,
        ]);

        $pekaseh = User::factory()->create([
            'role_id' => $pekasehRole->id,
            'subak_id' => $subak->id,
        ]);

        $report = Report::query()->create([
            'report_code' => 'RPT-20260621-PEKA',
            'user_id' => $pelapor->id,
            'subak_id' => $subak->id,
            'category_id' => $category->id,
            'status_id' => $pendingStatus->id,
            'title' => 'Gangguan pada saluran utama',
            'description' => 'Ada penutupan saluran oleh material bangunan.',
            'latitude' => '-8.55',
            'longitude' => '115.35',
            'priority_level' => 'medium',
            'submitted_at' => now(),
        ]);

        return [$pekaseh, $report, $pendingStatus, $completedStatus];
    }
}
