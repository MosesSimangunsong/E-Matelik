<?php

namespace App\Http\Controllers\Pelapor;

use App\Http\Controllers\Controller;
use App\Models\PatrolPoint;
use App\Models\PatrolLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PatrolController extends Controller
{
    /**
     * Menampilkan dashboard patroli (checklist harian).
     */
    public function dashboard(Request $request): Response
    {
        $user = $request->user();
        
        // Ambil titik patroli yang aktif di subak user ini
        $points = PatrolPoint::query()
            ->where('subak_id', $user->subak_id)
            ->where('is_active', true)
            ->get()
            ->map(function ($point) {
                // Cek apakah hari ini sudah ada log patroli untuk titik ini
                $isCheckedToday = PatrolLog::query()
                    ->where('patrol_point_id', $point->id)
                    ->whereDate('created_at', Carbon::today())
                    ->exists();

                return [
                    'id' => $point->id,
                    'name' => $point->name,
                    'point_type' => $point->point_type,
                    'qr_token' => $point->qr_token,
                    'is_checked_today' => $isCheckedToday,
                ];
            });

        return Inertia::render('Pelapor/Patrol/Dashboard', [
            'points' => $points
        ]);
    }

    /**
     * Menampilkan halaman scan/verifikasi QR titik patroli.
     */
    public function scanPage(Request $request, $qr_token): Response
    {
        // Cari titik patroli berdasarkan QR token yang valid dan aktif
        $patrolPoint = PatrolPoint::query()
            ->where('qr_token', $qr_token)
            ->where('is_active', true)
            ->firstOrFail();

        // Keamanan: Pastikan titik ini milik subak user yang sedang login
        abort_unless(
            $patrolPoint->subak_id === $request->user()->subak_id, 
            403, 
            'Anda tidak memiliki akses untuk memindai titik patroli di subak ini.'
        );

        return Inertia::render('Pelapor/Patrol/Scan', [
            'patrolPoint' => $patrolPoint
        ]);
    }

    /**
     * Menyimpan data hasil scan (Tandai Aman).
     */
    public function storeScan(Request $request, PatrolPoint $patrolPoint): RedirectResponse
    {
        // Validasi keamanan ulang saat post
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        $validated = $request->validate([
            'gps_latitude' => ['required', 'numeric'],
            'gps_longitude' => ['required', 'numeric'],
            'inspection_note' => ['nullable', 'string', 'max:500'],
        ]);

        // Simpan log patroli ke database
        PatrolLog::create([
            'patrol_point_id' => $patrolPoint->id,
            'user_id' => $request->user()->id,
            'status' => 'safe', // Karena lewat rute ini berarti ditandai aman. Jika rusak, masuknya ke create report.
            'gps_latitude' => $validated['gps_latitude'],
            'gps_longitude' => $validated['gps_longitude'],
            'inspection_note' => $validated['inspection_note'],
        ]);

        return redirect()->route('pelapor.patrol.dashboard')
            ->with('success', "Titik {$patrolPoint->name} berhasil ditandai aman.");
    }
}   