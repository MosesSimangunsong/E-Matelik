<?php

namespace App\Http\Controllers;

use App\Enums\RoleSlug;
use App\Enums\ReportStatusSlug;
use App\Models\PatrolLog;
use App\Models\PatrolPoint;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->isPekaseh()) {
            return redirect()->route('pekaseh.dashboard');
        }

        return redirect()->route('pelapor.dashboard');
    }

    public function pelapor(Request $request): Response
    {
        $reportsQuery = Report::query()
            ->where('user_id', $request->user()->id)
            ->with('status:id,name,slug')
            ->withCount(['initialPhotos', 'resolutionPhotos'])
            ->latest('submitted_at')
            ->limit(5);

        $reports = $reportsQuery->get();
        $allReports = $request->user()->reports()
            ->with('status:id,name,slug')
            ->withCount(['initialPhotos', 'resolutionPhotos'])
            ->latest('submitted_at')
            ->get();

        return Inertia::render('Dashboards/PelaporDashboard', [
            'dashboard' => [
                'title' => 'Dashboard Pelapor',
                'role' => RoleSlug::Pelapor->value,
                'summary' => [
                    'headline' => 'Laporkan gangguan telabah dan pantau status tindak lanjutnya.',
                    'primaryAction' => 'Buat Laporan',
                    'secondaryAction' => 'Laporan Saya',
                ],
                'stats' => [
                    'totalReports' => $allReports->count(),
                    'pendingReports' => $allReports->where('status.slug', ReportStatusSlug::PendingVerification->value)->count(),
                    'completedReports' => $allReports->where('status.slug', ReportStatusSlug::Completed->value)->count(),
                    'withCompleteEvidence' => $allReports
                        ->filter(fn (Report $report) => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0)
                        ->count(),
                ],
                'recentReports' => $reports->map(fn (Report $report) => [
                    'id' => $report->id,
                    'title' => $report->title,
                    'report_code' => $report->report_code,
                    'status' => $report->status?->name,
                    'status_slug' => $report->status?->slug,
                    'priority_level' => $report->priority_level?->value,
                    'has_complete_evidence' => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0,
                ]),
            ],
        ]);
    }

    public function pekaseh(Request $request): Response
    {
        $user = $request->user()->loadMissing('subak');
        $today = Carbon::today();

        $pendingReports = collect();
        $overdueThreshold = now()->subDay();
        $statistics = [
            'total' => 0,
            'checked' => 0,
            'safe' => 0,
            'needs_attention' => 0,
            'damaged' => 0,
            'unchecked' => 0,
        ];

        if ($user->subak_id) {
            $pendingReports = Report::query()
                ->where('subak_id', $user->subak_id)
                ->whereHas('status', fn ($query) => $query->where('slug', ReportStatusSlug::PendingVerification->value))
                ->with(['category:id,name'])
                ->latest('submitted_at')
                ->limit(3)
                ->get();

            $rawPoints = PatrolPoint::query()
                ->where('subak_id', $user->subak_id)
                ->where('is_active', true)
                ->get(['id']);

            $statistics['total'] = $rawPoints->count();

            foreach ($rawPoints as $point) {
                $hasDamageReportToday = Report::query()
                    ->where('patrol_point_id', $point->id)
                    ->whereDate('created_at', $today)
                    ->exists();

                if ($hasDamageReportToday) {
                    $statistics['damaged']++;
                    $statistics['checked']++;

                    continue;
                }

                $logToday = PatrolLog::query()
                    ->where('patrol_point_id', $point->id)
                    ->whereDate('patrol_date', $today)
                    ->latest('scanned_at')
                    ->first(['status']);

                if (! $logToday) {
                    $statistics['unchecked']++;

                    continue;
                }

                $statistics['checked']++;

                if ($logToday->status === 'safe') {
                    $statistics['safe']++;
                } elseif ($logToday->status === 'needs_attention') {
                    $statistics['needs_attention']++;
                } elseif ($logToday->status === 'damaged') {
                    $statistics['damaged']++;
                }
            }
        }

        $overduePendingCount = $user->subak_id
            ? Report::query()
                ->where('subak_id', $user->subak_id)
                ->whereHas('status', fn ($query) => $query->where('slug', ReportStatusSlug::PendingVerification->value))
                ->where('submitted_at', '<', $overdueThreshold)
                ->count()
            : 0;

        return Inertia::render('Dashboards/PekasehDashboard', [
            'dashboard' => [
                'title' => 'Dashboard Pekaseh',
                'role' => RoleSlug::Pekaseh->value,
                'summary' => [
                    'headline' => 'Verifikasi laporan masuk pada lingkup Subak Anda dengan jejak keputusan yang jelas.',
                    'primaryAction' => 'Verifikasi Laporan',
                    'secondaryAction' => 'Peta',
                ],
                'subak' => $user->subak ? [
                    'name' => $user->subak->name,
                    'region' => $user->subak->region,
                ] : null,
                'stats' => [
                    'pendingReports' => $pendingReports->count(),
                    'overdueReports' => $overduePendingCount,
                ],
                'processGuidance' => [
                    'headline' => 'Laporan berfungsi sebagai sinyal awal yang perlu diverifikasi.',
                    'fallbackNote' => 'Jika ada laporan yang tertahan terlalu lama, itu menjadi penanda backlog untuk koordinasi atau pendampingan proses berikutnya.',
                ],
                'statistics' => $statistics,
                'recentReports' => $pendingReports->map(fn (Report $report) => [
                    'id' => $report->id,
                    'title' => $report->title,
                    'report_code' => $report->report_code,
                    'category' => $report->category?->name,
                    'is_overdue' => optional($report->submitted_at)->lt($overdueThreshold) ?? false,
                ]),
            ],
            'statistics' => $statistics,
        ]);
    }

    public function admin(Request $request): Response
    {
        $reports = Report::query()
            ->with(['status:id,name,slug', 'category:id,name'])
            ->withCount(['initialPhotos', 'resolutionPhotos'])
            ->latest('submitted_at')
            ->limit(5)
            ->get();

        $allReports = Report::query()
            ->with(['status:id,name,slug'])
            ->withCount(['initialPhotos', 'resolutionPhotos'])
            ->latest('submitted_at')
            ->get();

        return Inertia::render('Dashboards/AdminDashboard', [
            'dashboard' => [
                'title' => 'Dashboard Admin',
                'role' => RoleSlug::Admin->value,
                'summary' => [
                    'headline' => 'Pantau laporan, kelola data master, dan awasi tindak lanjut.',
                    'primaryAction' => 'Semua Laporan',
                    'secondaryAction' => 'Kelola User',
                ],
                'stats' => [
                    'totalReports' => $allReports->count(),
                    'pendingReports' => $allReports->where('status.slug', ReportStatusSlug::PendingVerification->value)->count(),
                    'resolvedReports' => $allReports->where('status.slug', ReportStatusSlug::Completed->value)->count(),
                    'verifiedReports' => $allReports->where('status.slug', ReportStatusSlug::Verified->value)->count(),
                    'withCompleteEvidence' => $allReports
                        ->filter(fn (Report $report) => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0)
                        ->count(),
                ],
                'recentReports' => $reports->map(fn (Report $report) => [
                    'id' => $report->id,
                    'title' => $report->title,
                    'report_code' => $report->report_code,
                    'status' => $report->status?->name,
                    'status_slug' => $report->status?->slug,
                    'category' => $report->category?->name,
                    'priority_level' => $report->priority_level?->value,
                    'has_complete_evidence' => $report->initial_photos_count > 0 && $report->resolution_photos_count > 0,
                ]),
            ],
        ]);
    }
}