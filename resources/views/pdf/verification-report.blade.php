<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Laporan {{ $report['report_code'] }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #1f2937; }
        h1, h2, h3 { margin: 0; }
        .header { border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 18px; }
        .muted { color: #6b7280; }
        .section { margin-bottom: 18px; }
        .grid { width: 100%; border-collapse: collapse; }
        .grid td, .grid th { border: 1px solid #d1d5db; padding: 8px; vertical-align: top; }
        .badge { display: inline-block; padding: 4px 8px; background: #ecfdf5; color: #065f46; border-radius: 999px; font-size: 11px; }
        .photo { width: 220px; height: 150px; object-fit: cover; border: 1px solid #d1d5db; margin-bottom: 6px; }
        .disclaimer { margin-top: 24px; font-size: 11px; color: #4b5563; border-top: 1px solid #d1d5db; padding-top: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>E-Matelik</h1>
        <p class="muted">Ringkasan Administratif Laporan</p>
        <p class="muted">Dihasilkan pada {{ $generatedAt }}</p>
    </div>

    <div class="section">
        <h2>{{ $report['title'] }}</h2>
        <p class="muted">Kode laporan: {{ $report['report_code'] }}</p>
        <p style="margin-top:8px;">
            <span class="badge">{{ $report['status']['name'] ?? '-' }}</span>
        </p>
    </div>

    <div class="section">
        <table class="grid">
            <tr><th width="28%">Nama pelapor</th><td>{{ $report['reporter']['display_name'] ?? '-' }}</td></tr>
            <tr><th>Email pelapor</th><td>{{ $report['reporter']['display_email'] ?? '-' }}</td></tr>
            <tr><th>Kategori</th><td>{{ $report['category']['name'] ?? '-' }}</td></tr>
            <tr><th>Tanggal laporan</th><td>{{ $report['submitted_at'] ?? '-' }}</td></tr>
            <tr><th>Lokasi / koordinat</th><td>{{ $report['latitude'] }}, {{ $report['longitude'] }}</td></tr>
            <tr><th>Keterangan lokasi</th><td>{{ $report['address_text'] ?: '-' }}</td></tr>
            <tr><th>Subak</th><td>{{ $report['subak']['name'] ?? '-' }} - {{ $report['subak']['village'] ?? '-' }}, {{ $report['subak']['district'] ?? '-' }}</td></tr>
            <tr><th>Deskripsi</th><td>{{ $report['description'] }}</td></tr>
            <tr><th>Catatan verifikasi Pekaseh</th><td>{{ $report['verification_note'] ?: '-' }}</td></tr>
            <tr><th>Catatan penyelesaian</th><td>{{ $report['resolution_note'] ?: '-' }}</td></tr>
        </table>
    </div>

    <div class="section">
        <h3>Bukti Awal</h3>
        @if(count($report['initial_photos']) > 0)
            @foreach($report['initial_photos'] as $photo)
                <div style="margin-top:10px; margin-bottom:14px;">
                    @if(!empty($photo['absolute_path']))
                        <img src="{{ $photo['absolute_path'] }}" alt="{{ $photo['original_name'] }}" class="photo">
                    @endif
                    <div><strong>Nama file:</strong> {{ $photo['original_name'] }}</div>
                    <div><strong>Sumber:</strong> {{ $photo['captured_from'] ?: '-' }}</div>
                    <div><strong>Waktu upload:</strong> {{ $photo['uploaded_at'] ?: '-' }}</div>
                    <div><strong>Jenis bukti:</strong> {{ $photo['photo_role'] ?: '-' }}</div>
                </div>
            @endforeach
        @else
            <p>Tidak ada bukti awal.</p>
        @endif
    </div>

    <div class="section">
        <h3>Bukti Penyelesaian</h3>
        @if(count($report['resolution_photos']) > 0)
            @foreach($report['resolution_photos'] as $photo)
                <div style="margin-top:10px; margin-bottom:14px;">
                    @if(!empty($photo['absolute_path']))
                        <img src="{{ $photo['absolute_path'] }}" alt="{{ $photo['original_name'] }}" class="photo">
                    @endif
                    <div><strong>Nama file:</strong> {{ $photo['original_name'] }}</div>
                    <div><strong>Sumber:</strong> {{ $photo['captured_from'] ?: '-' }}</div>
                    <div><strong>Waktu upload:</strong> {{ $photo['uploaded_at'] ?: '-' }}</div>
                    <div><strong>Jenis bukti:</strong> {{ $photo['photo_role'] ?: '-' }}</div>
                </div>
            @endforeach
        @else
            <p>Tidak ada bukti penyelesaian.</p>
        @endif
    </div>

    <div class="section">
        <h3>Histori Laporan</h3>
        <table class="grid">
            <thead>
                <tr>
                    <th>Waktu</th>
                    <th>Aktor</th>
                    <th>Aksi</th>
                    <th>Status Baru</th>
                    <th>Catatan</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['history'] as $history)
                    <tr>
                        <td>{{ $history['created_at'] }}</td>
                        <td>{{ $history['actor'] ?: '-' }}</td>
                        <td>{{ $history['action'] }}</td>
                        <td>{{ $history['to_status'] ?: '-' }}</td>
                        <td>{{ $history['note'] ?: '-' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5">Belum ada histori laporan.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="disclaimer">
        Dokumen ini merupakan ringkasan administratif laporan E-Matelik dan bukan bukti forensik final.
    </div>
</body>
</html>
