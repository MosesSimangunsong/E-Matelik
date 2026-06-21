# E-Matelik

E-Matelik adalah aplikasi WebGIS untuk pelaporan, verifikasi, dan pemantauan gangguan telabah pada ekosistem Subak. Repositori ini menggunakan stack `Laravel + Inertia React + PostgreSQL` dan mengikuti source of truth pada folder [`docs/`](D:\Semester6\essay\E-Matelik\docs).

## Status Saat Ini

Proyek sedang mengikuti tahapan implementasi pada [`docs/Modular-Implementation.md`](D:\Semester6\essay\E-Matelik\docs\Modular-Implementation.md). Tahap aktif saat ini adalah:

- Tahap 1: Setup proyek dan fondasi teknis

## Dokumen Acuan

Sebelum mengubah arsitektur, flow, atau scope, selalu cocokkan dengan dokumen berikut:

- [`docs/E-Matelik.md`](D:\Semester6\essay\E-Matelik\docs\E-Matelik.md)
- [`docs/PRD.md`](D:\Semester6\essay\E-Matelik\docs\PRD.md)
- [`docs/UserFlow.md`](D:\Semester6\essay\E-Matelik\docs\UserFlow.md)
- [`docs/ERD.md`](D:\Semester6\essay\E-Matelik\docs\ERD.md)
- [`docs/⁠DesignSystem.md`](D:\Semester6\essay\E-Matelik\docs\⁠DesignSystem.md)
- [`docs/Modular-Implementation.md`](D:\Semester6\essay\E-Matelik\docs\Modular-Implementation.md)
- [`docs/mermaid/userflow.mmd`](D:\Semester6\essay\E-Matelik\docs\mermaid\userflow.mmd)
- [`docs/mermaid/erd-ematelik.mmd`](D:\Semester6\essay\E-Matelik\docs\mermaid\erd-ematelik.mmd)

## Setup Lokal

1. Pastikan PostgreSQL aktif dan database `db_ematelik` sudah tersedia.
2. Pastikan file `.env` mengarah ke koneksi PostgreSQL lokal.
3. Install dependency jika belum tersedia:

```bash
composer install
npm install
```

4. Jalankan server pengembangan:

```bash
composer run dev
```

## Catatan Tahap 1

- Aplikasi sudah berada di stack yang benar: Laravel + Inertia React.
- Koneksi database PostgreSQL sudah terdeteksi ke `db_ematelik`.
- Migration default Laravel belum dijalankan sebagai baseline final, karena Tahap 2 akan membangun struktur database berdasarkan ERD E-Matelik.
