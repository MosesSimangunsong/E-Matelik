# Patrol QR Scan Flow — Smart Matelik Checkpoint

## 1. Tujuan Dokumen

Dokumen ini menjelaskan kebutuhan fitur **scan QR checkpoint** pada sistem E-Matelik.

Fitur ini dibuat agar setiap titik telabah yang sudah didaftarkan di sistem dapat memiliki kode unik dan URL scan. URL tersebut akan dijadikan QR code secara manual oleh pengembang/pengurus sistem. Ketika QR code ditempel di titik telabah dan dipindai saat kegiatan Matelik, sistem akan mencatat bahwa titik tersebut sudah diperiksa.

Fitur ini bukan sensor air otomatis. QR code hanya berfungsi sebagai **penanda fisik-digital** untuk membantu pencatatan patroli Matelik.

---

## 2. Konsep Utama

Setiap titik telabah yang didaftarkan ke sistem disebut sebagai **Patrol Point** atau titik patroli.

Contoh titik yang dapat didaftarkan:

* Tembuku
* Telabah Aya
* Telabah Tempek
* Titik rawan penyumbatan
* Titik rawan penimbunan material proyek
* Titik rawan kerusakan dinding saluran
* Titik yang sering menjadi lokasi gangguan

Setiap Patrol Point harus memiliki:

* nama titik
* jenis titik
* Subak terkait
* koordinat latitude dan longitude
* kode titik unik
* token QR unik
* URL scan
* status aktif atau tidak aktif

---

## 3. Perbedaan `point_code`, `qr_token`, dan `scan_url`

### 3.1 `point_code`

`point_code` adalah kode manusiawi yang mudah dibaca.

Contoh:

```text
TLB-AYA-001
TMBK-001
TRS-003
```

Kode ini dipakai untuk identifikasi visual di dashboard, daftar titik, dan label fisik.

### 3.2 `qr_token`

`qr_token` adalah token unik yang sulit ditebak.

Contoh:

```text
a8f92c1e7b4d4b7fa92c19b8e1
```

Token ini dipakai di URL scan agar orang tidak mudah menebak link titik patroli lain.

### 3.3 `scan_url`

`scan_url` adalah URL yang akan dijadikan QR code.

Contoh:

```text
https://domain-e-matelik.com/patrol/scan/a8f92c1e7b4d4b7fa92c19b8e1
```

QR code sebaiknya dibuat dari `scan_url`, bukan hanya dari `point_code`.

Jika QR hanya berisi `point_code`, kamera HP hanya akan menampilkan teks dan tidak otomatis membuka sistem. Karena itu QR harus berisi URL scan.

---

## 4. Alur Pendaftaran Titik Telabah

1. Pekaseh atau admin/pengurus sistem membuka halaman kelola titik patroli.
2. Pengguna mengisi data titik telabah:

   * nama titik
   * jenis titik
   * deskripsi
   * koordinat
   * urutan patroli jika diperlukan
3. Sistem menyimpan data titik.
4. Sistem otomatis membuat:

   * `point_code`
   * `qr_token`
   * `scan_url`
5. Pengurus sistem menyalin `scan_url`.
6. Pengurus membuat QR code secara manual dari `scan_url`.
7. QR code dicetak dan ditempel pada titik telabah yang sesuai.

---

## 5. Alur Scan QR Saat Matelik

1. Petugas/krama yang melakukan Matelik datang ke titik telabah.
2. Petugas memindai QR code yang ditempel di titik tersebut.
3. QR membuka URL scan, misalnya:

```text
/patrol/scan/{qr_token}
```

4. Sistem mengecek apakah user sudah login.
5. Jika belum login, user diarahkan ke login terlebih dahulu.
6. Setelah login, sistem membaca `qr_token`.
7. Sistem mencari Patrol Point yang sesuai dengan `qr_token`.
8. Jika token valid dan titik aktif, sistem menampilkan halaman detail scan titik.
9. Petugas memilih kondisi titik:

   * aman
   * perlu perhatian
   * rusak / terganggu
10. Petugas dapat menambahkan catatan singkat.
11. Sistem menyimpan catatan pemeriksaan.
12. Di dashboard patroli, titik tersebut berubah menjadi **sudah diperiksa / centang**.

---

## 6. Checklist Patroli Harian

Untuk MVP, status centang sebaiknya berlaku **per hari**, bukan permanen.

Artinya:

* Jika titik discan hari ini, titik tampil sebagai **sudah diperiksa** untuk hari ini.
* Besok, titik tersebut kembali menjadi **belum diperiksa** sampai discan lagi.
* Ini sesuai dengan logika patroli rutin, karena telabah perlu diperiksa berulang.

Contoh tampilan dashboard:

```text
Patroli Hari Ini

[✓] Tembuku Aya 01 — Aman
[✓] Telabah Aya 02 — Perlu perhatian
[ ] Titik Rawan Sumbatan 03 — Belum diperiksa
[!] Telabah Tempek 04 — Rusak, laporan dibuat
```

---

## 7. Data yang Perlu Disimpan Saat Scan

Setiap scan/check-in harus disimpan sebagai record baru.

Nama tabel yang disarankan:

```text
patrol_point_checks
```

atau:

```text
patrol_scans
```

Field yang disarankan:

```text
id
patrol_point_id
checked_by
checked_at
condition_status
note
scan_latitude
scan_longitude
report_id
created_at
updated_at
```

Penjelasan field:

* `patrol_point_id`: titik telabah yang diperiksa.
* `checked_by`: user yang melakukan scan.
* `checked_at`: waktu scan berdasarkan server timestamp.
* `condition_status`: status kondisi titik, misalnya aman, perlu perhatian, atau rusak.
* `note`: catatan opsional dari petugas.
* `scan_latitude`: lokasi GPS petugas saat scan jika tersedia.
* `scan_longitude`: lokasi GPS petugas saat scan jika tersedia.
* `report_id`: terisi jika scan menghasilkan laporan gangguan.
* `created_at` dan `updated_at`: timestamp standar Laravel.

---

## 8. Status Kondisi Titik Saat Scan

Status kondisi yang disarankan untuk MVP:

```text
safe
needs_attention
damaged
```

Makna status:

### 8.1 `safe`

Titik sudah diperiksa dan tidak ditemukan gangguan.

Label UI:

```text
Aman
```

### 8.2 `needs_attention`

Titik sudah diperiksa, tetapi ada kondisi yang perlu dipantau.

Contoh:

* sedimentasi mulai menumpuk
* ada sampah ringan
* aliran mulai mengecil
* ada retakan kecil

Label UI:

```text
Perlu Perhatian
```

### 8.3 `damaged`

Titik sudah diperiksa dan ditemukan gangguan yang perlu dilaporkan.

Contoh:

* telabah tertimbun
* saluran tersumbat berat
* dinding saluran jebol
* ada material proyek
* ada penutupan saluran

Label UI:

```text
Rusak / Terganggu
```

---

## 9. Alur Jika Titik Aman

1. Petugas scan QR.
2. Sistem membuka halaman scan titik.
3. Petugas memilih status `Aman`.
4. Petugas menekan tombol simpan pemeriksaan.
5. Sistem menyimpan record pemeriksaan.
6. Dashboard menampilkan titik tersebut sebagai sudah diperiksa.
7. Tidak ada laporan baru yang dibuat.

---

## 10. Alur Jika Titik Perlu Perhatian

1. Petugas scan QR.
2. Sistem membuka halaman scan titik.
3. Petugas memilih status `Perlu Perhatian`.
4. Petugas mengisi catatan singkat.
5. Sistem menyimpan record pemeriksaan.
6. Dashboard menampilkan titik tersebut sebagai sudah diperiksa, tetapi diberi badge `Perlu Perhatian`.
7. Belum wajib membuat laporan gangguan.
8. Pekaseh/admin dapat melihat titik yang perlu perhatian sebagai bahan pemantauan.

---

## 11. Alur Jika Titik Rusak atau Terganggu

1. Petugas scan QR.
2. Sistem membuka halaman scan titik.
3. Petugas memilih status `Rusak / Terganggu`.
4. Sistem menampilkan tombol:

```text
Buat Laporan dari Titik Ini
```

5. Ketika tombol ditekan, sistem membuka form laporan.
6. Data berikut otomatis terisi dari Patrol Point:

   * Subak
   * koordinat latitude
   * koordinat longitude
   * keterangan lokasi
   * titik telabah terkait
7. Petugas tetap mengisi:

   * judul laporan
   * kategori gangguan
   * deskripsi
   * foto bukti awal
8. Setelah laporan dikirim, sistem menyimpan laporan seperti flow pelaporan E-Matelik biasa.
9. Record scan/check-in dapat menyimpan `report_id` agar pemeriksaan terhubung dengan laporan.

---

## 12. Hubungan dengan Flow Laporan Lama

Fitur scan QR tidak boleh merusak flow laporan lama.

Flow lama tetap berlaku:

* pelapor dapat membuat laporan manual dari peta
* lokasi bisa dipilih manual
* foto bukti tetap wajib
* laporan masuk ke Pekaseh untuk verifikasi
* status tetap administratif
* histori tetap dicatat
* closed-loop evidence tetap berlaku

Fitur scan QR hanya menambahkan jalur baru:

```text
Scan QR titik telabah -> pemeriksaan titik -> jika rusak -> buat laporan dari titik tersebut
```

Jadi laporan dari QR tetap harus masuk ke alur verifikasi Pekaseh yang sama.

---

## 13. Kapsul Bukti Administratif Ber-QR

Setelah laporan yang berasal dari titik QR diverifikasi, sistem dapat menghasilkan kapsul bukti administratif.

Isi kapsul bukti:

* kode laporan
* kode titik telabah
* nama titik telabah
* jenis titik telabah
* koordinat
* foto bukti awal
* timestamp server
* kategori gangguan
* status administratif
* catatan/verdict Pekaseh
* histori proses
* bukti penyelesaian jika ada

Kapsul bukti memiliki URL publik terbatas.

Contoh:

```text
/kapsul-bukti/{report_code}
```

Halaman kapsul bukti harus menyamarkan identitas pelapor.

Kapsul bukti bukan bukti hukum final. Kapsul bukti hanya merupakan **bukti administratif geospasial awal** untuk mendukung koordinasi lanjutan.

---

## 14. Role dan Akses

Untuk MVP, Matelik sebaiknya dipahami sebagai aktivitas patroli, bukan role baru.

Role aktif yang tetap digunakan:

* Pelapor
* Pekaseh
* Admin

Rekomendasi akses:

### Pelapor / Krama

Dapat:

* scan QR titik patroli
* mencatat kondisi titik
* membuat laporan dari titik QR

### Pekaseh

Dapat:

* melihat titik patroli di Subaknya
* mengelola titik patroli
* melihat hasil pemeriksaan
* memverifikasi laporan yang masuk

### Admin / Pengurus Sistem

Dapat:

* melihat semua titik
* membantu pengelolaan data titik
* melihat histori pemeriksaan
* membantu monitoring sistem

Jangan menambahkan role `matelik` kecuali benar-benar dibutuhkan dan sudah diputuskan untuk menambah role baru di database, seeder, middleware, dan user flow.

---

## 15. Route yang Diharapkan

Contoh route yang mungkin diperlukan:

```text
GET /patrol/checkpoints
GET /patrol/scan/{qr_token}
POST /patrol/scan/{patrolPoint}
GET /reports/create?patrol_point_id={id}
GET /kapsul-bukti/{report_code}
```

Catatan:

* Route scan harus membaca `qr_token`.
* Route simpan scan dapat memakai `patrolPoint` atau ID titik.
* Route buat laporan dari titik dapat membawa `patrol_point_id`.
* Halaman kapsul bukti harus read-only.

---

## 16. UI yang Diharapkan

### 16.1 Halaman Daftar Titik Patroli

Menampilkan:

* nama titik
* kode titik
* jenis titik
* status hari ini
* terakhir diperiksa
* tombol detail
* tombol salin URL scan

### 16.2 Halaman Scan Titik

Menampilkan:

* nama titik
* kode titik
* jenis titik
* lokasi
* status pemeriksaan hari ini
* pilihan kondisi:

  * Aman
  * Perlu Perhatian
  * Rusak / Terganggu
* catatan singkat
* tombol simpan pemeriksaan
* tombol buat laporan jika kondisi rusak

### 16.3 Dashboard Patroli

Menampilkan:

* jumlah titik total
* jumlah titik sudah diperiksa hari ini
* jumlah titik belum diperiksa
* jumlah titik perlu perhatian
* jumlah titik rusak
* daftar checklist harian

Contoh:

```text
Patroli Hari Ini
8 dari 12 titik sudah diperiksa
2 titik perlu perhatian
1 titik rusak dan sudah dibuatkan laporan
```

---

## 17. Prinsip Keamanan dan Validasi

Fitur scan QR harus memiliki validasi:

* QR token harus unik.
* QR token tidak boleh mudah ditebak.
* Titik harus aktif.
* User harus login untuk mencatat scan.
* Scan harus menyimpan timestamp server.
* Jika memungkinkan, sistem menyimpan GPS user saat scan.
* Jika GPS user terlalu jauh dari titik, sistem dapat memberi peringatan, tetapi jangan wajib untuk MVP jika belum stabil.
* Identitas pelapor tetap mengikuti aturan privasi role.

---

## 18. Batas Klaim

Fitur ini tidak boleh diklaim sebagai:

* sensor air otomatis
* IoT deteksi debit
* deteksi kerusakan otomatis
* bukti hukum final
* pengganti Matelik fisik
* pengganti Pekaseh
* pengganti paruman
* pengganti awig-awig

Fitur ini boleh diklaim sebagai:

* checkpoint fisik-digital untuk Matelik
* pencatatan patroli berbasis QR
* penguat dokumentasi titik telabah
* penghubung antara patroli fisik dan laporan digital
* alat bantu verifikasi awal Pekaseh
* bukti administratif geospasial awal
* audit trail ringan untuk proses pemeriksaan dan pelaporan

---

## 19. Acceptance Criteria

Fitur dianggap berhasil jika:

1. Setiap titik telabah dapat memiliki kode unik dan token QR.
2. Sistem dapat menampilkan URL scan untuk setiap titik.
3. Pengurus dapat membuat QR manual dari URL scan.
4. Saat QR dipindai, sistem membuka halaman scan titik.
5. User login dapat menyimpan pemeriksaan titik.
6. Titik yang sudah discan hari ini tampil sebagai centang / sudah diperiksa.
7. Titik yang belum discan hari ini tampil sebagai belum diperiksa.
8. Jika titik rusak, user dapat membuat laporan dari titik tersebut.
9. Laporan dari titik QR tetap masuk ke flow verifikasi Pekaseh.
10. Record scan terhubung dengan laporan jika laporan dibuat.
11. Kapsul bukti dapat menampilkan ringkasan laporan dengan identitas pelapor disamarkan.
12. Flow lama pelaporan manual tetap berjalan.

---

## 20. Ringkasan Maksud Fitur

Inti fitur ini adalah:

```text
Titik telabah didaftarkan -> sistem membuat scan_url -> scan_url dijadikan QR manual -> QR ditempel di lokasi -> petugas Matelik scan QR -> sistem mencatat titik sudah diperiksa -> jika rusak, laporan dibuat dari titik itu -> laporan diverifikasi Pekaseh -> kapsul bukti administratif dapat dibuat.
```

Fitur ini harus membuat E-Matelik tidak hanya menjadi sistem pelaporan, tetapi juga sistem pendukung patroli Matelik yang terdokumentasi.
  