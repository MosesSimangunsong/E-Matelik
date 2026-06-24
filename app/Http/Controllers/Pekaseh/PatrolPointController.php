<?php

namespace App\Http\Controllers\Pekaseh;

use App\Http\Controllers\Controller;
use App\Models\PatrolPoint;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PatrolPointController extends Controller
{
    /**
     * Menampilkan daftar titik patroli untuk subak Pekaseh.
     */
    public function index(Request $request): Response
    {
        $subakId = $request->user()->subak_id;

        $patrolPoints = PatrolPoint::query()
            ->where('subak_id', $subakId)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Pekaseh/PatrolPoints/Index', [
            'patrolPoints' => $patrolPoints
        ]);
    }

    /**
     * Menampilkan form untuk membuat titik patroli baru.
     */
    public function create(): Response
    {
        return Inertia::render('Pekaseh/PatrolPoints/CreateEdit');
    }

    /**
     * Menyimpan data titik patroli baru ke database.
     */
    public function store(Request $request): RedirectResponse
    {
        $subakId = $request->user()->subak_id;

        $validated = $request->validate([
            'point_code' => ['required', 'string', 'max:50', 'unique:patrol_points,point_code'],
            'name' => ['required', 'string', 'max:255'],
            'point_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);

        PatrolPoint::create([
            'subak_id' => $subakId,
            'point_code' => $validated['point_code'],
            'name' => $validated['name'],
            'point_type' => $validated['point_type'],
            'description' => $validated['description'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'qr_token' => Str::random(32), // Generate token unik untuk QR
            'is_active' => true,
        ]);

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil ditambahkan.');
    }

    /**
     * Menampilkan form untuk mengedit titik patroli.
     */
    public function edit(Request $request, PatrolPoint $patrolPoint): Response
    {
        // Pastikan Pekaseh hanya bisa mengedit titik di subaknya sendiri
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        return Inertia::render('Pekaseh/PatrolPoints/CreateEdit', [
            'patrolPoint' => $patrolPoint
        ]);
    }

    /**
     * Memperbarui data titik patroli di database.
     */
    public function update(Request $request, PatrolPoint $patrolPoint): RedirectResponse
    {
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        $validated = $request->validate([
            'point_code' => ['required', 'string', 'max:50', 'unique:patrol_points,point_code,' . $patrolPoint->id],
            'name' => ['required', 'string', 'max:255'],
            'point_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'is_active' => ['boolean'],
        ]);

        $patrolPoint->update($validated);

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil diperbarui.');
    }

    /**
     * Menghapus titik patroli.
     */
    public function destroy(Request $request, PatrolPoint $patrolPoint): RedirectResponse
    {
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        // Sebagai MVP, kita hapus langsung. Bisa juga diubah menjadi soft delete
        // atau menonaktifkan dengan set is_active = false jika ada relasi log.
        $patrolPoint->delete();

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil dihapus.');
    }
}