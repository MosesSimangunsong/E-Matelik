<?php

namespace App\Http\Controllers\Pelapor;

use App\Http\Controllers\Controller;
use App\Models\PatrolPoint;
use App\Models\PatrolLog;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PatrolController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $user = $request->user();
        $today = Carbon::today();
        
        $rawPoints = PatrolPoint::query()
            ->where('subak_id', $user->subak_id)
            ->where('is_active', true)
            ->orderBy('patrol_order', 'asc')
            ->get();

        // 1. Inisialisasi variabel untuk menampung statistik
        $statistics = [
            'total' => $rawPoints->count(),
            'checked' => 0,
            'unchecked' => 0,
            'needs_attention' => 0,
            'damaged' => 0,
        ];

        // 2. Mapping data sekaligus menghitung statistik
        $points = $rawPoints->map(function ($point) use ($today, &$statistics) {
            
            $hasDamageReportToday = Report::query()
                ->where('patrol_point_id', $point->id)
                ->whereDate('created_at', $today)
                ->exists();

            if ($hasDamageReportToday) {
                $status = 'damaged'; 
                $statistics['damaged']++;
                $statistics['checked']++; // Dihitung sebagai sudah dicek
            } else {
                $logToday = PatrolLog::query()
                    ->where('patrol_point_id', $point->id)
                    ->whereDate('patrol_date', $today)
                    ->latest('scanned_at')
                    ->first();
                    
                if ($logToday) {
                    $status = $logToday->status; 
                    if ($status === 'needs_attention') {
                        $statistics['needs_attention']++;
                    }
                    $statistics['checked']++; // Dihitung sebagai sudah dicek
                } else {
                    $status = 'unchecked'; 
                    $statistics['unchecked']++; // Belum dicek
                }
            }

            return [
                'id' => $point->id,
                'point_code' => $point->point_code,
                'name' => $point->name,
                'point_type' => $point->point_type,
                'qr_token' => $point->qr_token,
                'status' => $status, 
            ];
        });

        // 3. Kirim data points dan statistics ke Frontend React
        return Inertia::render('Pelapor/Patrol/Dashboard', [
            'points' => $points,
            'statistics' => $statistics
        ]);
    }

    public function scanPage(Request $request, $qr_token): Response
    {
        $patrolPoint = PatrolPoint::query()
            ->where('qr_token', $qr_token)
            ->where('is_active', true)
            ->firstOrFail();

        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403, 'Anda tidak memiliki akses ke titik patroli ini.');

        return Inertia::render('Pelapor/Patrol/Scan', [
            'patrolPoint' => $patrolPoint
        ]);
    }

    public function storeScan(Request $request, PatrolPoint $patrolPoint): RedirectResponse
    {
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        $validated = $request->validate([
            'status' => ['required', 'in:safe,needs_attention'],
            'gps_latitude' => ['required', 'numeric'],
            'gps_longitude' => ['required', 'numeric'],
            'inspection_note' => ['nullable', 'string', 'max:500'],
        ]);

        PatrolLog::create([
            'patrol_point_id' => $patrolPoint->id,
            'user_id' => $request->user()->id,
            'subak_id' => $patrolPoint->subak_id,
            'status' => $validated['status'],
            'gps_latitude' => $validated['gps_latitude'],
            'gps_longitude' => $validated['gps_longitude'],
            'inspection_note' => $validated['inspection_note'],
            'patrol_date' => Carbon::today(),
            'scanned_at' => now(),
        ]);

        $msg = $validated['status'] === 'safe' 
            ? "Titik {$patrolPoint->name} berhasil ditandai aman."
            : "Catatan pengawasan untuk {$patrolPoint->name} berhasil disimpan.";

        // Diarahkan kembali ke pelapor.dashboard sesuai penyesuaian rute sebelumnya
        return redirect()->route('pelapor.dashboard')->with('success', $msg);
    }
}