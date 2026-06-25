# User Flow - E-Matelik

## Tujuan

Dokumen ini memetakan alur penggunaan sistem E-Matelik berdasarkan implementasi yang aktif saat ini:

* pelaporan manual berbasis peta,
* patroli QR harian,
* verifikasi Pekaseh,
* tindak lanjut admin,
* dan publikasi kapsul bukti.

---

## Role yang Aktif

1. `Pelapor / Krama / Matelik`
2. `Pekaseh`
3. `Admin`

---

## Navigasi Utama

### Publik

* `/`
* `/login`
* `/kapsul-bukti/{report_code}`

### Pelapor

* `/pelapor/dashboard`
* `/reports`
* `/reports/create`
* `/reports/{id}`
* `/pelapor/patrol/scan/{qr_token}`
* `/map`

### Pekaseh

* `/pekaseh/dashboard`
* `/verification`
* `/verification/{id}`
* `/pekaseh/patrol-points`
* `/pekaseh/patrol-points/create`
* `/pekaseh/patrol-points/{id}/edit`
* `/map`

### Admin

* `/admin/dashboard`
* `/admin/reports`
* `/admin/reports/{id}`
* `/admin/categories`
* `/admin/users`
* `/admin/history`

---

## Alur Pelapor

### A. Login dan Masuk Dashboard

1. Pelapor login.
2. Sistem memeriksa role.
3. Sistem mengarahkan ke `/pelapor/dashboard`.
4. Pelapor melihat statistik patroli hari ini dan daftar checkpoint Subaknya.

### B. Patroli QR Harian

1. Pelapor menekan tombol `Scan QR Patroli`.
2. Browser meminta izin kamera.
3. Jika izin ditolak, sistem menampilkan error visual.
4. Jika QR valid, sistem membuka halaman inspeksi checkpoint.
5. Sistem mengambil GPS perangkat.
6. Pelapor memilih kondisi titik:
   * `safe`
   * `needs_attention`
7. Pelapor menyimpan checklist.
8. Sistem membuat `patrol_logs` untuk hari tersebut.

### C. Lapor Kerusakan dari Scan QR

1. Dari halaman scan checkpoint, Pelapor menekan `Ada Kerusakan? Buat Laporan`.
2. Sistem membuka form laporan dengan `prefill_data`:
   * `patrol_point_id`
   * `latitude`
   * `longitude`
3. Koordinat QR dikunci dan map picker disembunyikan.
4. Pelapor mengisi judul, kategori, deskripsi, dan foto.
5. Setelah submit:
   * laporan dibuat,
   * status awal `Menunggu Verifikasi`,
   * histori `created` disimpan,
   * `patrol_logs` otomatis dibuat dengan status `damaged`.

### D. Laporan Manual Biasa

1. Pelapor membuka `/reports/create`.
2. Pelapor memilih titik di peta atau memakai tombol `Gunakan Lokasi Saat Ini`.
3. Sistem mengisi latitude-longitude.
4. Pelapor mengunggah satu atau lebih foto.
5. Sistem menampilkan preview foto sebelum submit.
6. Pelapor mengirim laporan.
7. Sistem menyimpan laporan dan foto bukti awal.

### E. Monitoring Laporan

1. Pelapor membuka `Laporan Saya`.
2. Pelapor melihat status administratif, prioritas, dan jumlah bukti.
3. Pelapor membuka detail laporan.
4. Sistem menampilkan:
   * metadata laporan,
   * peta lokasi,
   * bukti awal,
   * bukti penyelesaian,
   * histori.

---

## Alur Pekaseh

### A. Dashboard dan Monitoring Patroli

1. Pekaseh login.
2. Sistem mengarahkan ke `/pekaseh/dashboard`.
3. Pekaseh melihat:
   * total titik patroli,
   * titik aman,
   * titik atensi,
   * titik rusak,
   * laporan pending,
   * backlog verifikasi.

### B. Kelola Titik Patroli

1. Pekaseh membuka modul `Patrol Points`.
2. Pekaseh menambah titik patroli baru.
3. Pekaseh memilih lokasi di peta atau memakai `Gunakan Lokasi Saat Ini`.
4. Sistem mengisi latitude-longitude dan menggeser marker.
5. Data titik disimpan dengan QR token unik.

### C. Verifikasi Laporan

1. Pekaseh membuka daftar laporan Subaknya.
2. Pekaseh memilih satu laporan.
3. Sistem menampilkan:
   * identitas pelapor,
   * peta lokasi,
   * foto bukti awal,
   * foto penyelesaian jika ada,
   * histori.
4. Pekaseh memilih verdict:
   * `Valid`
   * `Perlu Klarifikasi`
   * `Eskalasi Administratif Lanjutan`
   * `Selesai Internal`
5. Pekaseh menyimpan catatan verifikasi.
6. Jika verdict selesai internal, Pekaseh dapat menambah bukti penyelesaian.
7. Sistem memperbarui status dan histori.

---

## Alur Admin

### A. Monitoring Global

1. Admin login.
2. Sistem mengarahkan ke `/admin/dashboard`.
3. Admin melihat statistik seluruh laporan.
4. Admin membuka daftar laporan dan memakai filter status, kategori, prioritas.

### B. Tindak Lanjut dan Penutupan

1. Admin membuka detail laporan.
2. Admin melihat bukti awal dan penyelesaian.
3. Admin mengubah status sesuai progres administratif.
4. Admin dapat menambah catatan penyelesaian dan foto penyelesaian.
5. Sistem menyimpan histori `status_updated` atau `completed`.

---

## Alur Publik Kapsul Bukti

1. Pengguna membuka tautan `/kapsul-bukti/{report_code}`.
2. Sistem menampilkan laporan terpilih tanpa perlu login.
3. Halaman memuat:
   * identitas laporan,
   * bukti awal,
   * bukti penyelesaian,
   * konteks administratif.

---

## Catatan UX Penting

* Pelapor tidak bisa membuka scan checkpoint manual dari daftar titik.
* Kamera harus diizinkan untuk patroli QR.
* Geolocation membantu akurasi marker, tetapi pengguna tetap bisa memilih titik manual.
* Status yang tampil adalah status administratif proses, bukan keputusan sosial final.

---

## Ringkasan End-to-End

**Pekaseh membuat checkpoint -> Pelapor patroli QR -> Pelapor menandai aman/atensi atau membuat laporan rusak -> Pekaseh memverifikasi -> Admin menindaklanjuti -> Bukti penyelesaian ditampilkan -> Kapsul bukti dapat dibuka**
