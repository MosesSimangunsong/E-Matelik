<?php

namespace App\Http\Controllers\Evidence;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
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
        // Cari data Report berdasarkan report_code beserta relasi yang diizinkan untuk publik
        // Perhatikan kita TIDAK me-load relasi 'user' demi privasi.
        $report = Report::query()
            ->where('report_code', $report_code)
            ->with([
                'subak:id,name,region,village,district',
                'category:id,name',
                'status:id,name,slug',
                'photos:id,report_id,photo_path,photo_role,created_at'
            ])
            ->firstOrFail();

        // Menyaring (Sanitize) dan memformat data sebelum dikirim ke Frontend
        $sanitizedReport = [
            'report_code' => $report->report_code,
            'title' => $report->title,
            'description' => $report->description,
            'submitted_at' => optional($report->submitted_at)->format('d M Y H:i'),
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
            
            // Mapping Foto Bukti Awal
            'initial_photos' => $report->photos
                ->filter(fn ($photo) => $photo->photo_role?->value === 'initial_evidence')
                ->values()
                ->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ]),
                
            // Mapping Foto Bukti Penyelesaian
            'resolution_photos' => $report->photos
                ->filter(fn ($photo) => $photo->photo_role?->value === 'resolution_evidence')
                ->values()
                ->map(fn ($photo) => [
                    'id' => $photo->id,
                    'url' => Storage::disk('public')->url($photo->photo_path),
                    'uploaded_at' => optional($photo->created_at)->format('d M Y H:i'),
                ]),
        ];

        return Inertia::render('EvidenceCapsule/Show', [
            'report' => $sanitizedReport
        ]);
    }
}