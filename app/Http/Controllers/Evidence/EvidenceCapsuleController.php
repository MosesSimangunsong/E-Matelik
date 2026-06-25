<?php

namespace App\Http\Controllers\Evidence;

use App\Http\Controllers\Controller;
use App\Enums\ReportStatusSlug;
use App\Models\Report;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EvidenceCapsuleController extends Controller
{
    /**
     * Menampilkan halaman publik Kapsul Bukti Administratif ber-QR.
     *
     * @param string $report_code
     * @return Response
     */
    public function show($report_code): Response
    {
        $report = Report::query()
            ->where('report_code', $report_code)
            ->whereHas('status', fn ($query) => $query->whereIn('slug', [
                ReportStatusSlug::Verified->value,
                ReportStatusSlug::Escalated->value,
                ReportStatusSlug::Completed->value,
            ]))
            ->with([
                'user:id,name,email',
                'subak:id,name,region,village,district',
                'category:id,name',
                'status:id,name,slug',
                'photos:id,report_id,photo_path,photo_role,created_at'
            ])
            ->firstOrFail();

        $sanitizedReport = [
            'report_code' => $report->report_code,
            'title' => $report->title,
            'description' => $report->description,
            'latitude' => $report->latitude,
            'longitude' => $report->longitude,
            'priority_level' => $report->priority_level?->value ?? $report->priority_level,
            'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
            'reporter' => [
                'name' => $report->user?->name,
            ],
            'category' => $report->category ? [
                'name' => $report->category->name,
            ] : null,
            'status' => $report->status ? [
                'name' => $report->status->name,
                'slug' => $report->status->slug,
            ] : null,
            'subak' => $report->subak ? [
                'name' => $report->subak->name,
                'village' => $report->subak->village,
                'district' => $report->subak->district,
            ] : null,
            'initial_photos' => $report->photos
                ->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')
                ->values()
                ->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'photo_url' => Storage::disk('public')->url($photo->photo_path),
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ]),
            'resolution_photos' => $report->photos
                ->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')
                ->values()
                ->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'photo_url' => Storage::disk('public')->url($photo->photo_path),
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ]),
        ];

        return Inertia::render('EvidenceCapsule/Show', [
            'report' => $sanitizedReport
        ]);
    }
}
