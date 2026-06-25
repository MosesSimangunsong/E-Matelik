# Roadmap Pengembangan - E-Matelik

## Horizon Roadmap

Roadmap ini dibagi ke dalam tiga horizon:

* jangka pendek,
* jangka menengah,
* jangka panjang.

Prioritas disusun berdasarkan sistem yang saat ini sudah aktif di repo.

---

## Fase 1 - Stabilisasi MVP

Target:

* memastikan flow inti stabil,
* memperkuat kualitas data,
* dan menutup celah integritas patroli.

Ruang lingkup:

* penyempurnaan Patrol QR
* preview foto dan gallery bukti
* statistik dashboard per role
* geolocation di form laporan dan checkpoint
* validasi akses per Subak
* hardening closed-loop evidence

Status:

* sebagian besar sudah diimplementasikan.

---

## Fase 2 - Operasional Pilot

Target:

* membuat sistem nyaman dipakai dalam operasi lapangan nyata.

Ruang lingkup:

* notifikasi status laporan
* filter laporan yang lebih kaya
* export ringkasan laporan
* pencarian checkpoint patroli
* upload foto referensi untuk patrol point
* indikator kepatuhan patroli harian
* peningkatan UX mobile untuk scan dan form lapangan

Prioritas:

* tinggi

---

## Fase 3 - Transparansi dan Akuntabilitas

Target:

* meningkatkan keterbacaan proses oleh pihak internal dan publik terbatas.

Ruang lingkup:

* kapsul bukti yang lebih lengkap
* template laporan PDF
* ringkasan histori per kasus
* dashboard tren laporan antar periode
* visualisasi hotspot gangguan

Prioritas:

* menengah

---

## Fase 4 - Ekspansi Domain Subak

Target:

* memperluas nilai sistem di luar pelaporan titik insiden.

Ruang lingkup:

* line/polyline telabah
* segmentasi jaringan irigasi
* relasi titik patroli dengan ruas telabah
* pengelompokan masalah per wilayah rawan
* penjadwalan patroli berkala

Prioritas:

* menengah

---

## Fase 5 - Integrasi Lanjutan

Target:

* menyiapkan sistem untuk skala institusional lebih besar.

Ruang lingkup:

* object storage produksi
* audit trail lebih kuat
* integrasi WA/email notifikasi
* dashboard lintas Subak untuk pemangku kepentingan
* role viewer atau instansi pendamping
* API integrasi eksternal

Prioritas:

* jangka panjang

---

## Backlog Rekomendasi Teknis

* refactor transform data foto ke presenter bersama
* konsolidasi field `status` vs `condition_status` pada `patrol_logs`
* penambahan test feature untuk flow Patrol QR
* penambahan test upload foto dan verifikasi
* standardisasi encoding dokumen dan label UI

---

## Indikator Keberhasilan Roadmap

1. Laporan lebih cepat dibuat dan diverifikasi.
2. Patroli harian lebih sulit dimanipulasi.
3. Bukti foto lebih mudah ditinjau.
4. Backlog verifikasi lebih terlihat.
5. Transparansi proses meningkat tanpa mengubah struktur sosial Subak.
