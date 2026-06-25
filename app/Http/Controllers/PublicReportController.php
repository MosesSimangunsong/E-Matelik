<?php

namespace App\Http\Controllers;

use App\Enums\ReportStatusSlug;
use App\Models\Report;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class PublicReportController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            ...$this->publicReportPayload(),
        ]);
    }

    public function index(): Response
    {
        return $this->home();
    }

    public function publicReportPayload(): array
    {
        $allowedStatuses = [
            ReportStatusSlug::Verified->value,
            ReportStatusSlug::Escalated->value,
            ReportStatusSlug::Completed->value,
        ];

        $reports = Report::query()
            ->with([
                'user:id,name',
                'category:id,name',
                'status:id,name,slug',
                'photos:id,report_id,photo_path,original_name,photo_role,created_at',
            ])
            ->whereHas('status', fn ($query) => $query->whereIn('slug', $allowedStatuses))
            ->latest('submitted_at')
            ->get()
            ->map(function (Report $report) {
                $initialPhoto = $report->photos
                    ->first(fn ($photo) => $photo->photo_role?->value === 'initial_evidence');

                return [
                    'id' => $report->id,
                    'report_code' => $report->report_code,
                    'title' => $report->title,
                    'reporter_name' => $report->user?->name,
                    'category' => $report->category?->name,
                    'status' => $report->status ? [
                        'name' => $report->status->name,
                        'slug' => $report->status->slug,
                    ] : null,
                    'priority_level' => $report->priority_level?->value ?? $report->priority_level,
                    'latitude' => (float) $report->latitude,
                    'longitude' => (float) $report->longitude,
                    'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
                    'initial_photo_url' => $initialPhoto
                        ? Storage::disk('public')->url($initialPhoto->photo_path)
                        : null,
                    'detail_url' => route('evidence.capsule', $report->report_code),
                ];
            })
            ->values();

        return [
            'reports' => $reports,
            'summary' => [
                'total' => $reports->count(),
                'verified' => $reports->where('status.slug', ReportStatusSlug::Verified->value)->count(),
                'escalated' => $reports->where('status.slug', ReportStatusSlug::Escalated->value)->count(),
                'completed' => $reports->where('status.slug', ReportStatusSlug::Completed->value)->count(),
            ],
        ];
    }
}
