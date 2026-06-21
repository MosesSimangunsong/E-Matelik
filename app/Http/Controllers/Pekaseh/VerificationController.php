<?php

namespace App\Http\Controllers\Pekaseh;

use App\Enums\ReportPhotoRole;
use App\Enums\PekasehVerdict;
use App\Enums\ReportStatusSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyReportRequest;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\ReportStatus;
use App\Support\ReportPhotoUploader;
use App\Support\ReporterIdentityPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    public function __construct(
        private readonly ReportPhotoUploader $photoUploader,
        private readonly ReporterIdentityPresenter $reporterIdentityPresenter,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user()->loadMissing('subak');

        $pendingReports = collect();

        if ($user->subak_id) {
            $pendingReports = Report::query()
                ->with(['category:id,name', 'status:id,name,slug', 'user:id,name'])
                ->where('subak_id', $user->subak_id)
                ->whereHas('status', fn ($query) => $query->where('slug', ReportStatusSlug::PendingVerification->value))
                ->latest('submitted_at')
                ->get()
                ->map(fn (Report $report) => [
                    'id' => $report->id,
                    'report_code' => $report->report_code,
                    'title' => $report->title,
                    'category' => $report->category?->name,
                    'status' => $report->status?->name,
                    'priority_level' => $report->priority_level?->value,
                    'reporter' => $this->reporterIdentityPresenter->forPrivileged($report->user),
                    'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                    'latitude' => $report->latitude,
                    'longitude' => $report->longitude,
                    'is_overdue' => optional($report->submitted_at)->lt(now()->subDay()) ?? false,
                    'pending_hours' => optional($report->submitted_at)->diffInHours(now()),
                ]);
        }

        return Inertia::render('Verification/Index', [
            'verification' => [
                'hasSubakAssignment' => (bool) $user->subak_id,
                'subak' => $user->subak ? [
                    'name' => $user->subak->name,
                    'region' => $user->subak->region,
                ] : null,
                'pendingReports' => $pendingReports,
                'stats' => [
                    'pendingCount' => $pendingReports->count(),
                    'overdueCount' => $pendingReports->where('is_overdue', true)->count(),
                ],
                'processGuidance' => [
                    'headline' => 'Laporan adalah sinyal awal yang perlu diverifikasi, bukan kebenaran final.',
                    'escalationNote' => 'Eskalasi di sini berarti kesiapan untuk koordinasi administratif lanjutan, bukan pemotongan struktur adat secara otomatis.',
                    'fallbackNote' => 'Jika laporan tertahan terlalu lama, ini menjadi penanda backlog untuk koordinasi atau pendampingan proses berikutnya.',
                ],
            ],
        ]);
    }

    public function show(Request $request, Report $report): Response
    {
        $this->ensureReportBelongsToPekasehSubak($request, $report);

        $report->load([
            'user:id,name,email',
            'subak:id,name,region,village,district',
            'category:id,name,description',
            'status:id,name,slug,description',
            'resolver:id,name',
            'photos:id,report_id,photo_path,original_name,mime_type,file_size,photo_role,file_hash,captured_from,created_at',
            'histories.user:id,name',
            'histories.fromStatus:id,name',
            'histories.toStatus:id,name',
        ]);

        return Inertia::render('Verification/Show', [
            'report' => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'description' => $report->description,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'address_text' => $report->address_text,
                'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                'verification_note' => $report->verification_note,
                'resolution_note' => $report->resolution_note,
                'resolved_at' => optional($report->resolved_at)->format('d M Y H:i'),
                'resolver' => $report->resolver?->name,
                'category' => $report->category ? [
                    'name' => $report->category->name,
                    'description' => $report->category->description,
                ] : null,
                'status' => $report->status ? [
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                    'description' => $report->status->description,
                ] : null,
                'status_context' => 'Status di halaman ini merekam tahapan administratif verifikasi dan tindak lanjut, bukan keputusan sosial final.',
                'priority_level' => $report->priority_level?->value,
                'reporter' => $this->reporterIdentityPresenter->forPrivileged($report->user),
                'subak' => $report->subak ? [
                    'name' => $report->subak->name,
                    'region' => $report->subak->region,
                    'village' => $report->subak->village,
                    'district' => $report->subak->district,
                ] : null,
                'photos' => $report->photos->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'name' => $photo->original_name,
                    'photo_role' => $photo->photo_role?->value,
                    'captured_from' => $photo->captured_from?->value,
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ])->values(),
                'initial_photos' => $report->photos
                    ->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')
                    ->values()
                    ->map(fn ($photo) => [
                        'id' => $photo->id,
                        'url' => Storage::disk('public')->url($photo->photo_path),
                        'name' => $photo->original_name,
                        'captured_from' => $photo->captured_from?->value,
                        'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                    ]),
                'resolution_photos' => $report->photos
                    ->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')
                    ->values()
                    ->map(fn ($photo) => [
                        'id' => $photo->id,
                        'url' => Storage::disk('public')->url($photo->photo_path),
                        'name' => $photo->original_name,
                        'captured_from' => $photo->captured_from?->value,
                        'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                    ]),
                'evidence' => [
                    'initial_count' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')->count(),
                    'resolution_count' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')->count(),
                    'has_complete_evidence' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')->count() > 0
                        && $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')->count() > 0,
                ],
                'history' => $report->histories
                    ->sortByDesc('created_at')
                    ->values()
                    ->map(fn (ReportHistory $history) => [
                        'id' => $history->id,
                        'action' => $history->action,
                        'note' => $history->note,
                        'from_status' => $history->fromStatus?->name,
                        'to_status' => $history->toStatus?->name,
                        'actor' => $history->user?->name,
                        'created_at' => optional($history->created_at)->format('d M Y H:i'),
                    ]),
            ],
            'verdictOptions' => [
                ['value' => PekasehVerdict::Valid->value, 'label' => 'Valid', 'mapsTo' => 'Diverifikasi'],
                ['value' => PekasehVerdict::NeedsClarification->value, 'label' => 'Perlu Klarifikasi', 'mapsTo' => 'Perlu Klarifikasi'],
                ['value' => PekasehVerdict::Escalate->value, 'label' => 'Eskalasi Administratif Lanjutan', 'mapsTo' => 'Diekskalasi'],
                ['value' => PekasehVerdict::CompletedInternal->value, 'label' => 'Selesai Internal', 'mapsTo' => 'Selesai'],
            ],
            'verificationGuidance' => [
                'headline' => 'Keputusan Pekaseh menyimpan jejak administratif awal.',
                'clarificationNote' => 'Gunakan klarifikasi bila informasi lapangan belum cukup atau perlu konfirmasi tambahan.',
                'escalationNote' => 'Gunakan eskalasi bila kasus siap dibawa ke koordinasi administratif lanjutan sesuai konteks kelembagaan.',
            ],
        ]);
    }

    public function update(VerifyReportRequest $request, Report $report): RedirectResponse
    {
        $this->ensureReportBelongsToPekasehSubak($request, $report);

        $verdict = PekasehVerdict::from($request->string('verdict')->toString());
        $targetStatus = ReportStatus::query()
            ->where('slug', $verdict->targetStatusSlug()->value)
            ->firstOrFail();

        DB::transaction(function () use ($request, $report, $verdict, $targetStatus) {
            $fromStatusId = $report->status_id;
            $verificationNote = $request->string('verification_note')->toString();

            $payload = [
                'status_id' => $targetStatus->id,
                'verified_by' => $request->user()->id,
                'verified_at' => now(),
                'verification_note' => $verificationNote,
            ];

            if ($verdict === PekasehVerdict::CompletedInternal) {
                $payload['resolved_by'] = $request->user()->id;
                $payload['resolved_at'] = now();
                $payload['resolution_note'] = $verificationNote;
            }

            $report->update($payload);

            if ($verdict === PekasehVerdict::CompletedInternal) {
                $this->photoUploader->storeMany(
                    $report,
                    $request->file('resolution_photos', []),
                    $request->input('resolution_photo_sources', []),
                    $request->user()->id,
                    ReportPhotoRole::ResolutionEvidence,
                );
            }

            $note = $verificationNote;

            if ($verdict === PekasehVerdict::CompletedInternal) {
                $note = "Diselesaikan secara internal oleh Pekaseh. {$note}";
            }

            $report->histories()->create([
                'user_id' => $request->user()->id,
                'from_status_id' => $fromStatusId,
                'to_status_id' => $targetStatus->id,
                'action' => $verdict->action(),
                'note' => $note,
            ]);
        });

        return redirect()
            ->route('verification.index')
            ->with('success', 'Keputusan verifikasi berhasil disimpan.');
    }

    private function ensureReportBelongsToPekasehSubak(Request $request, Report $report): void
    {
        $user = $request->user();

        abort_unless($user->subak_id && $report->subak_id === $user->subak_id, 403);
    }
}
