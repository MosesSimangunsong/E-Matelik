<?php

namespace App\Http\Controllers\Pekaseh;

use App\Http\Controllers\Controller;
use App\Models\PatrolPoint;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PatrolPointController extends Controller
{
    public function index(Request $request): Response
    {
        $patrolPoints = PatrolPoint::query()
            ->where('subak_id', $request->user()->subak_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Pekaseh/PatrolPoints/Index', [
            'patrolPoints' => $patrolPoints
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Pekaseh/PatrolPoints/CreateEdit');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'point_code' => ['required', 'string', 'max:50', 'unique:patrol_points,point_code'],
            'name' => ['required', 'string', 'max:255'],
            'point_type' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'patrol_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        // Tambahkan relasi otomatis
        $validated['subak_id'] = $request->user()->subak_id;
        $validated['created_by'] = $request->user()->id;
        
        // qr_token otomatis di-generate oleh model PatrolPoint (boot)
        PatrolPoint::create($validated);

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil ditambahkan.');
    }

    public function edit(Request $request, PatrolPoint $patrolPoint): Response
    {
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);

        return Inertia::render('Pekaseh/PatrolPoints/CreateEdit', [
            'patrolPoint' => $patrolPoint
        ]);
    }

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
            'patrol_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        $patrolPoint->update($validated);

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil diperbarui.');
    }

    public function destroy(Request $request, PatrolPoint $patrolPoint): RedirectResponse
    {
        abort_unless($patrolPoint->subak_id === $request->user()->subak_id, 403);
        $patrolPoint->delete();

        return redirect()->route('pekaseh.patrol-points.index')
            ->with('success', 'Titik patroli berhasil dihapus.');
    }
}