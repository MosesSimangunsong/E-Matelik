<?php

namespace App\Http\Controllers\Pelapor;

use App\Enums\PriorityLevel;
use App\Enums\ReportPhotoRole;
use App\Enums\ReportStatusSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Models\Category;
use App\Models\PatrolLog;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\ReportStatus;
use App\Models\Subak;
use App\Support\ReportPhotoUploader;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        private readonly ReportPhotoUploader $photoUploader,
    ) {}

    public function index(Request $request): Response
    {
        $reports = $request->user()
            ->reports()
            ->with(['category:id,name', 'status:id,name,slug', 'photos:id,report_id,photo_path,photo_role'])
            ->withCount([
                'photos',
                'initialPhotos',
                'resolutionPhotos',
            ])
            ->latest('submitted_at')
            ->get()
            ->map(fn (Report $report) => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'category' => $report->category?->name,
                'status' => $report->status ? [
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                ] : null,
                'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'priority_level' => $report->priority_level?->value,
                'photos_count' => $report->photos_count,
                'initial_photos_count' => $report->initial_photos_count,
                'resolution_photos_count' => $report->resolution_photos_count,
                'has_complete_evidence' => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0,
            ]);

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
            'summary' => [
                'total' => $reports->count(),
                'pending' => $reports->where('status.slug', ReportStatusSlug::PendingVerification->value)->count(),
                'completed' => $reports->where('status.slug', ReportStatusSlug::Completed->value)->count(),
                'withCompleteEvidence' => $reports->where('has_complete_evidence', true)->count(),
                'latestReport' => $reports->first(),
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $prefillData = [
            'patrol_point_id' => $request->query('patrol_point_id'),
            'latitude' => $request->query('latitude'),
            'longitude' => $request->query('longitude'),
        ];

        return Inertia::render('Reports/Create', [
            'categories' => Category::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'description']),
            'subaks' => Subak::query()
                ->orderBy('name')
                ->get(['id', 'name', 'region', 'village', 'district']),
            'reportDefaults' => [
                'subakId' => $request->user()->subak_id,
                'subakName' => $request->user()->subak?->name,
            ],
            'prefill_data' => $prefillData,
        ]);
    }

    public function store(StoreReportRequest $request): RedirectResponse
    {
        $user = $request->user()->loadMissing('subak');
        $status = ReportStatus::query()
            ->where('slug', ReportStatusSlug::PendingVerification->value)
            ->firstOrFail();

        $validated = $request->validated();
        $subakId = $user->subak_id ?? (int) $request->integer('subak_id');
        $patrolPointId = $validated['patrol_point_id'] ?? null;

        $report = DB::transaction(function () use ($request, $user, $status, $subakId, $patrolPointId) {
            $report = Report::query()->create([
                'report_code' => $this->generateReportCode(),
                'user_id' => $user->id,
                'subak_id' => $subakId,
                'category_id' => $request->integer('category_id'),
                'status_id' => $status->id,
                'patrol_point_id' => $request->input('patrol_point_id'),
                'title' => $request->string('title')->toString(),
                'description' => $request->string('description')->toString(),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'address_text' => $request->filled('address_text')
                    ? $request->string('address_text')->toString()
                    : null,
                'priority_level' => PriorityLevel::Medium,
                'submitted_at' => now(),
            ]);

            if ($patrolPointId) {
                $report->forceFill([
                    'patrol_point_id' => $patrolPointId,
                ])->save();
            }

            $this->photoUploader->storeMany(
                $report,
                $request->file('photos', []),
                $request->input('photo_sources', []),
                $user->id,
                ReportPhotoRole::InitialEvidence,
            );

            $report->histories()->create([
                'user_id' => $user->id,
                'from_status_id' => null,
                'to_status_id' => $status->id,
                'action' => 'created',
                'note' => 'Laporan dibuat oleh pelapor.',
            ]);

            if ($patrolPointId) {
                PatrolLog::query()->create([
                    'patrol_point_id' => $patrolPointId,
                    'user_id' => $user->id,
                    'subak_id' => $subakId,
                    'report_id' => $report->id,
                    'status' => 'damaged',
                    'patrol_date' => Carbon::today(),
                    'scanned_at' => now(),
                ]);
            }

            return $report;
        });

        return redirect()
            ->route('reports.show', $report)
            ->with('success', 'Laporan berhasil dikirim dan menunggu verifikasi.');
    }

    public function show(Request $request, Report $report): Response
    {
        abort_unless($report->user_id === $request->user()->id, 403);

        $report->load([
            'user:id,name,email',
            'subak:id,name,region,village,district',
            'category:id,name,description',
            'status:id,name,slug,description',
            'photos:id,report_id,photo_path,original_name,mime_type,file_size,photo_role,file_hash,captured_from,created_at',
            'histories.user:id,name',
            'histories.fromStatus:id,name,slug',
            'histories.toStatus:id,name,slug',
        ]);

        return Inertia::render('Reports/Show', [
            'report' => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'description' => $report->description,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'address_text' => $report->address_text,
                'priority_level' => $report->priority_level?->value,
                'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                'category' => $report->category ? [
                    'name' => $report->category->name,
                    'description' => $report->category->description,
                ] : null,
                'status' => $report->status ? [
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                    'description' => $report->status->description,
                ] : null,
                'status_context' => 'Status pada sistem ini menunjukkan tahapan administratif penanganan, bukan keputusan sosial final.',
                'resolution_note' => $report->resolution_note,
                'resolved_at' => optional($report->resolved_at)->format('d M Y H:i'),
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
                    'mime_type' => $photo->mime_type,
                    'file_size' => $photo->file_size,
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
        ]);
    }

    private function generateReportCode(): string
    {
        do {
            $code = 'RPT-'.now()->format('Ymd').'-'.Str::upper(Str::random(4));
        } while (Report::query()->where('report_code', $code)->exists());

        return $code;
    }
}