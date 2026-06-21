<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Support\ReporterIdentityPresenter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    public function __construct(
        private readonly ReporterIdentityPresenter $reporterIdentityPresenter,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        $reportsQuery = Report::query()
            ->with(['category:id,name', 'status:id,name,slug', 'subak:id,name,region', 'user:id,name,email'])
            ->latest('submitted_at');

        if ($user->isPelapor()) {
            $reportsQuery->where('user_id', $user->id);
        } elseif ($user->isPekaseh() && $user->subak_id) {
            $reportsQuery->where('subak_id', $user->subak_id);
        }

        $reports = $reportsQuery
            ->limit(100)
            ->get()
            ->map(fn (Report $report) => [
                'id' => $report->id,
                'report_code' => $report->report_code,
                'title' => $report->title,
                'latitude' => (float) $report->latitude,
                'longitude' => (float) $report->longitude,
                'category' => $report->category?->name,
                'status' => $report->status ? [
                    'name' => $report->status->name,
                    'slug' => $report->status->slug,
                ] : null,
                'priority_level' => $report->priority_level?->value,
                'subak' => $report->subak ? [
                    'name' => $report->subak->name,
                    'region' => $report->subak->region,
                ] : null,
                'reporter' => $user->isAdmin() || $user->isPekaseh()
                    ? $this->reporterIdentityPresenter->forPrivileged($report->user ?? null)
                    : $this->reporterIdentityPresenter->forRestricted($report->user ?? null),
            ]);

        return Inertia::render('Map/Index', [
            'mapReports' => $reports,
            'mapContext' => [
                'role' => $user->role?->slug,
                'title' => 'Peta Insiden',
                'description' => 'Lihat persebaran laporan pada peta interaktif berbasis OpenStreetMap.',
            ],
        ]);
    }
}
