<?php

namespace App\Http\Controllers\Pekaseh;

use App\Http\Controllers\Controller;
use App\Models\PatrolLog;
use App\Models\PatrolPoint;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class PatrolHistoryController extends Controller
{
    public function index(Request $request): Response
    {
        $subakId = $request->user()->subak_id;

        $points = collect();
        $logs = collect();
        $reports = collect();

        if ($subakId) {
            $points = PatrolPoint::query()
                ->with('subak:id,name,region')
                ->where('subak_id', $subakId)
                ->orderByRaw('COALESCE(patrol_order, 999999)')
                ->orderBy('point_code')
                ->get();

            $logs = PatrolLog::query()
                ->with(['user:id,name'])
                ->where('subak_id', $subakId)
                ->whereNotNull('patrol_date')
                ->orderByDesc('scanned_at')
                ->get();

            $reports = Report::query()
                ->with(['user:id,name'])
                ->where('subak_id', $subakId)
                ->whereNotNull('patrol_point_id')
                ->get();
        }

        $baseDates = collect(range(0, 3))
            ->map(fn ($offset) => Carbon::today()->subDays($offset)->toDateString());

        $dates = $baseDates
            ->merge($logs->map(fn ($log) => optional($log->patrol_date)->toDateString())->filter())
            ->merge($reports->map(fn ($report) => optional($report->submitted_at ?? $report->created_at)->toDateString())->filter())
            ->unique()
            ->sortDesc()
            ->values();

        $logsByDateAndPoint = $logs
            ->groupBy(fn ($log) => optional($log->patrol_date)->toDateString())
            ->map(fn (Collection $logsPerDate) => $logsPerDate->keyBy('patrol_point_id'));

        $reportsByDateAndPoint = $reports
            ->groupBy(fn ($report) => optional($report->submitted_at ?? $report->created_at)->toDateString())
            ->map(fn (Collection $reportsPerDate) => $reportsPerDate->keyBy('patrol_point_id'));

        $historyByDate = $dates->map(function ($date) use ($points, $logsByDateAndPoint, $reportsByDateAndPoint) {
            $rows = $points->map(function ($point) use ($date, $logsByDateAndPoint, $reportsByDateAndPoint) {
                $log = $logsByDateAndPoint->get($date)?->get($point->id);
                $report = $reportsByDateAndPoint->get($date)?->get($point->id);

                $inspectionStatus = 'Belum diperiksa';
                $condition = '-';
                $inspector = '-';
                $scannedAt = '-';
                $note = '-';

                if ($report && (! $log || $log->status === 'damaged')) {
                    $inspectionStatus = 'Sudah diperiksa';
                    $condition = 'Rusak';
                    $inspector = $log?->user?->name ?? $report->user?->name ?? '-';
                    $scannedAt = optional($log?->scanned_at ?? $report->created_at)->format('d M Y H:i') ?? '-';
                    $note = $log?->inspection_note ?: 'Terkait laporan '.$report->report_code;
                } elseif ($log) {
                    $inspectionStatus = 'Sudah diperiksa';
                    $inspector = $log->user?->name ?? '-';
                    $scannedAt = optional($log->scanned_at)->format('d M Y H:i') ?? '-';
                    $note = $log->inspection_note ?: '-';

                    if ($log->status === 'safe') {
                        $condition = 'Aman';
                    } elseif ($log->status === 'needs_attention') {
                        $condition = 'Perlu perhatian';
                    } elseif ($log->status === 'damaged') {
                        $condition = 'Rusak';
                    }
                }

                return [
                    'id' => $point->id.'-'.$date,
                    'point_code' => $point->point_code,
                    'name' => $point->name,
                    'point_type' => str($point->point_type)->replace('_', ' ')->title()->toString(),
                    'location' => trim(($point->subak?->name ? $point->subak->name.' - ' : '').$point->latitude.', '.$point->longitude),
                    'inspection_status' => $inspectionStatus,
                    'condition' => $condition,
                    'scanned_at' => $scannedAt,
                    'inspector' => $inspector,
                    'note' => $note,
                ];
            })->values();

            return [
                'date' => $date,
                'label' => $this->labelForDate($date),
                'summary' => [
                    'total_points' => $rows->count(),
                    'checked' => $rows->where('inspection_status', 'Sudah diperiksa')->count(),
                    'safe' => $rows->where('condition', 'Aman')->count(),
                    'needs_attention' => $rows->where('condition', 'Perlu perhatian')->count(),
                    'damaged' => $rows->where('condition', 'Rusak')->count(),
                    'unchecked' => $rows->where('inspection_status', 'Belum diperiksa')->count(),
                ],
                'rows' => $rows,
            ];
        })->values();

        return Inertia::render('Pekaseh/PatrolHistory/Index', [
            'historyByDate' => $historyByDate,
            'scope' => [
                'subak_id' => $subakId,
                'subak_name' => $request->user()->subak?->name,
            ],
        ]);
    }

    private function labelForDate(string $date): string
    {
        $target = Carbon::parse($date);
        $diff = Carbon::today()->diffInDays($target, false) * -1;

        return match ($diff) {
            0 => 'Hari ini',
            1 => 'Kemarin',
            2 => '2 hari lalu',
            3 => '3 hari lalu',
            default => $target->translatedFormat('d F Y'),
        };
    }
}
