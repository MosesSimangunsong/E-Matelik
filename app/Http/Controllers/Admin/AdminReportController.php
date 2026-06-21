<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateReportStatusRequest;
use App\Models\ReportStatus;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Support\ReportPhotoUploader;
use App\Support\ReporterIdentityPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function __construct(
        private readonly ReportPhotoUploader $photoUploader,
        private readonly ReporterIdentityPresenter $reporterIdentityPresenter,
    ) {}

    public function index(Request $request): Response
    {
        $filters = [
            'status' => $request->string('status')->toString(),
            'category' => $request->string('category')->toString(),
            'priority' => $request->string('priority')->toString(),
        ];

        $reports = Report::query()
            ->with(['user:id,name', 'category:id,name', 'status:id,name,slug', 'subak:id,name'])
            ->withCount(['initialPhotos', 'resolutionPhotos'])
            ->when($filters['status'], fn ($query, $status) => $query->whereHas('status', fn ($statusQuery) => $statusQuery->where('slug', $status)))
            ->when($filters['category'], fn ($query, $category) => $query->where('category_id', $category))
            ->when($filters['priority'], fn ($query, $priority) => $query->where('priority_level', $priority))
            ->latest('submitted_at')
            ->get()
            ->map(fn (Report $report) => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'reporter' => $this->reporterIdentityPresenter->forPrivileged($report->user)['display_name'],
                'category' => $report->category?->name,
                'category_id' => $report->category_id,
                'status' => $report->status ? [
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                ] : null,
                'priority_level' => $report->priority_level?->value ?? $report->priority_level,
                'subak' => $report->subak?->name,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                'initial_photos_count' => $report->initial_photos_count,
                'resolution_photos_count' => $report->resolution_photos_count,
                'has_complete_evidence' => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0,
            ]);

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'filters' => $filters,
            'summary' => [
                'total' => $reports->count(),
                'attention' => $reports->whereIn('status.slug', [
                    \App\Enums\ReportStatusSlug::PendingVerification->value,
                    \App\Enums\ReportStatusSlug::NeedsClarification->value,
                    \App\Enums\ReportStatusSlug::Escalated->value,
                ])->count(),
                'withCompleteEvidence' => $reports->where('has_complete_evidence', true)->count(),
            ],
            'filterOptions' => [
                'statuses' => ReportStatus::query()->orderBy('id')->get(['slug', 'name']),
                'categories' => Category::query()->where('is_active', true)->orderBy('name')->get(['id', 'name']),
                'priorities' => [
                    ['value' => 'low', 'label' => 'Low'],
                    ['value' => 'medium', 'label' => 'Medium'],
                    ['value' => 'high', 'label' => 'High'],
                    ['value' => 'urgent', 'label' => 'Urgent'],
                ],
            ],
        ]);
    }

    public function show(Report $report): Response
    {
        $report->load([
            'user:id,name,email',
            'subak:id,name,region,village,district',
            'category:id,name,description',
            'status:id,name,slug,description',
            'verifier:id,name',
            'resolver:id,name',
            'photos:id,report_id,photo_path,original_name,photo_role,captured_from,created_at',
            'histories.user:id,name',
            'histories.fromStatus:id,name',
            'histories.toStatus:id,name',
        ]);

        return Inertia::render('Admin/Reports/Show', [
            'report' => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'description' => $report->description,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'address_text' => $report->address_text,
                'priority_level' => $report->priority_level?->value ?? $report->priority_level,
                'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                'verified_at' => optional($report->verified_at)->format('d M Y H:i'),
                'resolved_at' => optional($report->resolved_at)->format('d M Y H:i'),
                'verification_note' => $report->verification_note,
                'resolution_note' => $report->resolution_note,
                'reporter' => $this->reporterIdentityPresenter->forPrivileged($report->user),
                'verifier' => $report->verifier?->name,
                'resolver' => $report->resolver?->name,
                'subak' => $report->subak ? [
                    'name' => $report->subak->name,
                    'region' => $report->subak->region,
                    'village' => $report->subak->village,
                    'district' => $report->subak->district,
                ] : null,
                'category' => $report->category ? [
                    'name' => $report->category->name,
                    'description' => $report->category->description,
                ] : null,
                'status' => $report->status ? [
                    'id' => $report->status->id,
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                ] : null,
                'status_context' => 'Status di sistem menunjukkan tahapan administratif penanganan dan koordinasi, bukan keputusan sosial final.',
                'photos' => $report->photos->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'name' => $photo->original_name,
                    'photo_role' => $photo->photo_role?->value ?? $photo->photo_role,
                    'captured_from' => $photo->captured_from?->value ?? $photo->captured_from,
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ])->values(),
                'initial_photos' => $report->photos
                    ->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')
                    ->values()
                    ->map(fn ($photo) => [
                        'id' => $photo->id,
                        'url' => Storage::disk('public')->url($photo->photo_path),
                        'name' => $photo->original_name,
                        'captured_from' => $photo->captured_from?->value ?? $photo->captured_from,
                        'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                    ]),
                'resolution_photos' => $report->photos
                    ->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')
                    ->values()
                    ->map(fn ($photo) => [
                        'id' => $photo->id,
                        'url' => Storage::disk('public')->url($photo->photo_path),
                        'name' => $photo->original_name,
                        'captured_from' => $photo->captured_from?->value ?? $photo->captured_from,
                        'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                    ]),
                'evidence' => [
                    'initial_count' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')->count(),
                    'resolution_count' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')->count(),
                    'has_complete_evidence' => $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')->count() > 0
                        && $report->photos->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')->count() > 0,
                ],
                'history' => $report->histories->sortByDesc('created_at')->values()->map(fn (ReportHistory $history) => [
                    'id' => $history->id,
                    'created_at' => optional($history->created_at)->format('d M Y H:i'),
                    'actor' => $history->user?->name,
                    'action' => $history->action,
                    'from_status' => $history->fromStatus?->name,
                    'to_status' => $history->toStatus?->name,
                    'note' => $history->note,
                ]),
            ],
            'statusOptions' => ReportStatus::query()->orderBy('id')->get(['id', 'name', 'slug']),
        ]);
    }

    public function updateStatus(UpdateReportStatusRequest $request, Report $report): RedirectResponse
    {
        $targetStatus = ReportStatus::query()->findOrFail($request->integer('status_id'));

        DB::transaction(function () use ($request, $report, $targetStatus) {
            $fromStatusId = $report->status_id;
            $note = $request->string('note')->toString();
            $updates = [
                'status_id' => $targetStatus->id,
            ];

            if ($targetStatus->slug === \App\Enums\ReportStatusSlug::Completed->value) {
                $updates['resolved_by'] = $request->user()->id;
                $updates['resolved_at'] = now();
                $updates['resolution_note'] = $request->filled('resolution_note')
                    ? $request->string('resolution_note')->toString()
                    : $note;
            }

            $report->update($updates);

            if ($targetStatus->slug === \App\Enums\ReportStatusSlug::Completed->value) {
                $this->photoUploader->storeMany(
                    $report,
                    $request->file('resolution_photos', []),
                    $request->input('resolution_photo_sources', []),
                    $request->user()->id,
                    \App\Enums\ReportPhotoRole::ResolutionEvidence,
                );
            }

            $report->histories()->create([
                'user_id' => $request->user()->id,
                'from_status_id' => $fromStatusId,
                'to_status_id' => $targetStatus->id,
                'action' => $this->resolveHistoryAction($targetStatus),
                'note' => $note,
            ]);
        });

        return redirect()
            ->route('admin.reports.show', $report)
            ->with('success', 'Status laporan berhasil diperbarui.');
    }

    private function resolveHistoryAction(ReportStatus $targetStatus): string
    {
        return match ($targetStatus->slug) {
            \App\Enums\ReportStatusSlug::Completed->value => 'completed',
            \App\Enums\ReportStatusSlug::Escalated->value => 'escalated',
            default => 'status_updated',
        };
    }
}
