# Tabel Perbandingan E-Matelik dengan Sistem Eksisting

## Asumsi Sistem Eksisting

Tabel ini membandingkan E-Matelik dengan pola kerja eksisting yang umum terjadi sebelum digitalisasi penuh:

* laporan verbal atau chat personal,
* pencatatan manual,
* dokumentasi foto yang tersebar,
* dan patroli tanpa checkpoint QR.

## Tabel Perbandingan

| Aspek | Sistem Eksisting | E-Matelik |
|---|---|---|
| Kanal laporan | Verbal, chat, atau catatan terpisah | Form laporan terstruktur berbasis web |
| Lokasi kejadian | Sering deskriptif dan tidak presisi | Latitude-longitude + peta interaktif + geolocation |
| Bukti foto | Tersebar di galeri/chat | Tersimpan per laporan dengan metadata |
| Verifikasi | Tidak selalu terdokumentasi | Ada verdict Pekaseh dan histori |
| Status penanganan | Sulit ditelusuri | Status administratif terstruktur |
| Histori aktivitas | Rentan hilang | Tercatat di `report_histories` |
| Patroli lapangan | Bergantung kehadiran dan ingatan petugas | Checklist harian berbasis QR checkpoint |
| Validitas patroli | Mudah dimanipulasi | Scan QR fisik, tanpa akses manual dari daftar titik |
| Keterkaitan patroli-laporan | Terputus | Laporan rusak bisa tertaut ke checkpoint dan patrol log |
| Monitoring Subak | Tidak real-time | Dashboard Pekaseh dan Pelapor |
| Transparansi bukti penyelesaian | Tidak konsisten | Bukti awal dan bukti penyelesaian terpisah |
| Akses publik | Tidak ada format standar | Kapsul bukti administratif |

---

## Nilai Tambah Utama E-Matelik

1. Dokumentasi lebih terstruktur.
2. Lokasi kejadian lebih presisi.
3. Bukti visual lebih mudah diverifikasi.
4. Patroli lapangan memiliki jejak digital.
5. Proses penanganan lebih mudah dipantau oleh role terkait.

---

## Keterbatasan yang Masih Ada

1. Sistem masih berbasis point location, belum polyline telabah.
2. Bukti foto masih bergantung pada kejujuran pengguna dan belum forensik penuh.
3. Belum ada integrasi notifikasi lintas kanal.
4. Belum ada analitik hidrologi atau prediksi dampak.
