<?php

namespace App\Http\Controllers\Pekaseh;

use App\Enums\ReportStatusSlug;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportStatus;
use App\Support\ReporterIdentityPresenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PekasehReportController extends Controller
{
    public function __construct(
        private readonly ReporterIdentityPresenter $reporterIdentityPresenter,
    ) {}

    public function index(Request $request): Response
    {
        $subakId = $request->user()->subak_id;

        $filters = [
            'status' => $request->string('status')->toString(),
            'category' => $request->string('category')->toString(),
            'priority' => $request->string('priority')->toString(),
        ];

        $reports = collect();

        if ($subakId) {
            $reports = Report::query()
                ->with(['user:id,name', 'category:id,name', 'status:id,name,slug', 'subak:id,name'])
                ->withCount(['initialPhotos', 'resolutionPhotos'])
                ->where('subak_id', $subakId)
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
                    'latitude' => (float) $report->latitude,
                    'longitude' => (float) $report->longitude,
                    'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                    'initial_photos_count' => $report->initial_photos_count,
                    'resolution_photos_count' => $report->resolution_photos_count,
                    'has_complete_evidence' => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0,
                ])
                ->values();
        }

        return Inertia::render('Pekaseh/Reports/Index', [
            'reports' => $reports,
            'filters' => $filters,
            'summary' => [
                'total' => $reports->count(),
                'attention' => $reports->whereIn('status.slug', [
                    ReportStatusSlug::PendingVerification->value,
                    ReportStatusSlug::NeedsClarification->value,
                    ReportStatusSlug::Escalated->value,
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
            'scope' => [
                'subak_id' => $subakId,
                'subak_name' => $request->user()->subak?->name,
            ],
        ]);
    }
}
