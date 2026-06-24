# Modul Patrol QR — Spesifikasi Fitur Tambahan E-Matelik

## 1. Nama Modul

**Modul Patrol QR**

---

## 2. Latar Belakang

E-Matelik saat ini sudah memiliki alur utama berupa:

* pelaporan gangguan telabah,
* verifikasi awal oleh Pekaseh,
* tracking status administratif,
* histori proses,
* dan closed-loop evidence.

Namun, sistem yang ada masih berfokus pada **saat gangguan sudah ditemukan dan dilaporkan**.
Belum ada mekanisme digital yang secara khusus mendukung aktivitas **patroli Matelik** di lapangan.

Padahal, dalam praktik Subak, patroli atau pengecekan rutin titik-titik saluran air merupakan bagian penting dari pengawasan. Karena itu, dibutuhkan modul tambahan yang mampu mengubah patroli manual menjadi patroli yang **tercatat, terstruktur, dan dapat dipantau**.

Modul Patrol QR hadir untuk menjawab kebutuhan tersebut.

---

## 3. Tujuan Modul

Modul Patrol QR bertujuan untuk:

1. mendigitalisasi aktivitas patroli Matelik,
2. menyediakan titik pemeriksaan patroli berbasis QR code,
3. mencatat titik-titik yang sudah diperiksa setiap hari,
4. memperkuat dokumentasi patroli lapangan,
5. menghubungkan patroli dengan modul laporan yang sudah ada,
6. dan membedakan secara jelas antara:

   * titik yang sudah diperiksa dan aman,
   * dengan titik yang bermasalah dan perlu dilaporkan.

---

## 4. Positioning Fitur

Modul Patrol QR **bukan** pengganti fitur laporan yang sudah ada.
Modul ini adalah **fitur tambahan** yang memperkuat E-Matelik dari sisi patroli lapangan.

### Posisi modul ini dalam sistem:

* **Fungsi utama:** dokumentasi patroli
* **Fungsi tambahan:** pintu masuk menuju laporan gangguan dari titik patroli
* **Bukan:** sistem IoT sensor air
* **Bukan:** sistem hidrologi otomatis
* **Bukan:** pengganti verifikasi Pekaseh

---

## 5. Konsep Utama Modul

### 5.1 Konsep Dasar

Setiap titik patroli di jaringan Subak diberi **QR code permanen**.
QR ini mewakili **titik pemeriksaan patroli**, bukan insiden.

Contoh titik:

* tembuku,
* telabah aya,
* telabah tempek,
* titik rawan penyumbatan,
* gorong-gorong,
* dan titik lain yang ditentukan oleh Pekaseh.

### 5.2 Logika Dasar Penggunaan

* Jika titik **aman**, Matelik melakukan **scan QR**
* Jika titik **rusak/bermasalah**, Matelik **tidak scan QR**, tetapi langsung menekan tombol **Laporkan Gangguan** pada titik tersebut

Dengan cara ini:

* scan QR = titik dianggap **sudah diperiksa dan aman**
* laporan gangguan = titik **tidak dianggap aman**, tetapi masuk ke alur laporan E-Matelik yang sudah ada

---

## 6. Role yang Terlibat

## 6.1 Role Baru

### `Matelik`

Role baru yang ditambahkan untuk menjalankan patroli lapangan.

### Hak akses utama Matelik:

* melihat daftar titik patroli milik Subaknya
* membuka detail titik patroli
* scan QR titik patroli
* melihat checklist patroli hari itu
* menekan tombol **Laporkan Gangguan** dari titik patroli

## 6.2 Role Existing yang Tetap Terlibat

### `Pekaseh`

Berwenang untuk:

* membuat titik patroli
* mengedit titik patroli
* menentukan urutan patroli
* mengaktifkan / menonaktifkan titik
* melihat hasil patroli
* tetap menjadi verifikator awal laporan

### `Admin`

Berwenang untuk:

* monitoring data sistem
* melihat relasi titik patroli dengan laporan
* membantu kebutuhan administratif dan pengelolaan data bila diperlukan

---

## 7. Ruang Lingkup MVP Awal

## 7.1 Yang Masuk MVP Awal

Fokus implementasi awal modul ini adalah:

1. master data titik patroli
2. QR code permanen untuk tiap titik
3. scan QR via kamera HP/browser
4. checklist patroli harian
5. status titik harian:

   * belum diperiksa
   * sudah diperiksa
6. tombol **Laporkan Gangguan** dari titik patroli
7. auto-fill data titik saat membuat laporan

## 7.2 Yang Belum Masuk MVP Awal

Fitur berikut tetap menjadi roadmap lanjutan:

* kapsul bukti administratif PDF
* QR pasca-perbaikan
* masa observasi pasca-perbaikan
* sinkron offline / sync belakangan
* riwayat kesehatan titik
* skor kerawanan titik
* flow patroli lanjutan yang lebih kompleks
* status patroli yang lebih kaya dari sekadar checklist harian

---

## 8. Flow Penggunaan

## 8.1 Flow Aman / Titik Normal

1. Matelik login ke sistem
2. Matelik membuka daftar titik patroli Subaknya
3. Matelik datang ke titik patroli
4. Matelik scan QR titik
5. Sistem mencatat:

   * titik patroli
   * waktu scan
   * akun yang scan
   * lokasi GPS saat scan
   * foto inspeksi
   * catatan kondisi
6. Sistem menandai titik tersebut sebagai **sudah diperiksa**
7. Checklist harian untuk titik itu berubah menjadi centang

## 8.2 Flow Jika Titik Bermasalah

1. Matelik membuka titik patroli
2. Matelik **tidak scan QR**
3. Matelik menekan tombol **Laporkan Gangguan**
4. Sistem membuka form laporan
5. Field berikut otomatis terisi:

   * titik patroli
   * nama titik
   * jenis titik
   * subak
   * koordinat
6. Matelik melanjutkan proses laporan seperti alur E-Matelik yang sudah ada
7. Laporan masuk ke status **Menunggu Verifikasi**
8. Pekaseh melakukan verifikasi seperti flow existing

---

## 9. Aturan Bisnis Utama

1. Satu titik patroli memiliki **satu QR permanen**
2. QR mewakili **titik patroli**, bukan kejadian
3. Satu titik bisa memiliki **banyak scan patroli**
4. Satu titik bisa memiliki **banyak laporan gangguan** dari waktu ke waktu
5. Status patroli harian dan status laporan adalah **dua hal yang terpisah**
6. Status patroli harian ditentukan oleh **scan terbaru pada hari itu**
7. Jika titik rusak, Matelik tidak melakukan scan aman
8. Laporan dari titik patroli dibuat melalui tombol **Laporkan Gangguan**
9. Data titik yang masuk ke laporan tidak boleh diedit manual pada tahap awal
10. Matelik hanya boleh patroli di titik milik **Subaknya sendiri**
11. Titik patroli ditentukan dan dikelola oleh **Pekaseh**
12. Akses ke modul Patrol QR hanya untuk pengguna login
13. Jika QR diakses pihak luar tanpa login, akses harus ditolak
14. Semua anggota Subak dapat melihat hasil checklist patroli sesuai akses yang diatur sistem
15. Checklist patroli bersifat **harian**

---

## 10. Struktur Data Baru yang Dibutuhkan

Untuk merealisasikan modul ini, dibutuhkan minimal dua tabel baru:

1. `patrol_points`
2. `patrol_logs`

---

## 11. Tabel 1 — `patrol_points`

Tabel ini menyimpan **master data titik patroli**.

## 11.1 Fungsi

* menyimpan titik pemeriksaan patroli
* menjadi sumber data untuk QR permanen
* menjadi referensi saat scan
* menjadi referensi saat membuat laporan dari titik patroli

## 11.2 Atribut yang Disarankan

| Kolom                  | Tipe             | Keterangan                                                                                       |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `id`                   | bigint           | primary key                                                                                      |
| `subak_id`             | foreignId        | relasi ke subaks                                                                                 |
| `created_by`           | foreignId        | user pembuat titik, umumnya Pekaseh                                                              |
| `point_code`           | string           | kode unik titik, misalnya `TBA-001`                                                              |
| `name`                 | string           | nama titik patroli                                                                               |
| `point_type`           | string / enum    | jenis titik, misalnya `tembuku`, `telabah_aya`, `telabah_tempek`, `gorong_gorong`, `titik_rawan` |
| `description`          | text nullable    | deskripsi lokasi / catatan tambahan                                                              |
| `latitude`             | decimal          | koordinat lintang                                                                                |
| `longitude`            | decimal          | koordinat bujur                                                                                  |
| `reference_photo_path` | string nullable  | foto referensi titik                                                                             |
| `qr_token`             | string unique    | token unik QR permanen                                                                           |
| `patrol_order`         | integer nullable | urutan patroli                                                                                   |
| `is_active`            | boolean          | status aktif/nonaktif                                                                            |
| `created_at`           | timestamp        | waktu dibuat                                                                                     |
| `updated_at`           | timestamp        | waktu diubah                                                                                     |

## 11.3 Catatan

* `point_code` adalah kode manusiawi yang mudah dibaca
* `qr_token` adalah identitas teknis yang dipakai QR
* `reference_photo_path` dipakai untuk menunjukkan kondisi normal titik

---

## 12. Tabel 2 — `patrol_logs`

Tabel ini menyimpan **log hasil patroli** dari scan QR.

## 12.1 Fungsi

* mencatat titik yang sudah diperiksa
* membentuk checklist patroli harian
* menyimpan jejak patroli lapangan
* menjadi dasar status `belum diperiksa / sudah diperiksa`

## 12.2 Atribut yang Disarankan

| Kolom                   | Tipe             | Keterangan                                |
| ----------------------- | ---------------- | ----------------------------------------- |
| `id`                    | bigint           | primary key                               |
| `patrol_point_id`       | foreignId        | relasi ke titik patroli                   |
| `user_id`               | foreignId        | Matelik yang melakukan scan               |
| `subak_id`              | foreignId        | subak terkait, untuk memudahkan filtering |
| `patrol_date`           | date             | tanggal patroli                           |
| `scanned_at`            | timestamp        | waktu scan terbaru                        |
| `gps_latitude`          | decimal nullable | GPS saat scan                             |
| `gps_longitude`         | decimal nullable | GPS saat scan                             |
| `inspection_photo_path` | string nullable  | foto saat inspeksi                        |
| `inspection_note`       | text nullable    | catatan kondisi                           |
| `status`                | enum             | `checked`                                 |
| `created_at`            | timestamp        | waktu dibuat                              |
| `updated_at`            | timestamp        | waktu diperbarui                          |

## 12.3 Catatan Penting

* Karena status harian memakai **scan terbaru**, maka satu titik idealnya hanya punya **satu status aktif per hari**
* Implementasi teknis bisa memakai:

  * satu row per titik per hari yang di-update saat scan terbaru, atau
  * banyak row log mentah, lalu sistem membaca log terakhir per hari

Untuk MVP, pendekatan paling sederhana adalah:

> **satu titik = satu log aktif per hari = di-update oleh scan terbaru**

---

## 13. Relasi Data

## 13.1 Relasi Baru

* `subaks` 1 --- n `patrol_points`
* `users` 1 --- n `patrol_points` sebagai pembuat (`created_by`)
* `patrol_points` 1 --- n `patrol_logs`
* `users` 1 --- n `patrol_logs` sebagai Matelik
* `subaks` 1 --- n `patrol_logs`

## 13.2 Relasi dengan Laporan Existing

Tabel `reports` sebaiknya diperluas dengan kolom tambahan opsional:

| Kolom             | Tipe               | Keterangan                              |
| ----------------- | ------------------ | --------------------------------------- |
| `patrol_point_id` | foreignId nullable | referensi ke titik patroli asal laporan |

### Tujuan:

* menghubungkan laporan dengan titik patroli
* memudahkan histori insiden per titik
* memudahkan pelacakan titik mana yang sering memunculkan laporan

---

## 14. Perubahan pada Tabel Existing

## 14.1 `users`

Karena ada role baru, maka `roles` harus ditambah:

* `matelik`

## 14.2 `reports`

Tambahkan:

* `patrol_point_id` nullable

### Fungsi:

* menandakan bahwa laporan berasal dari titik patroli tertentu

---

## 15. Status Sistem Patrol QR

## 15.1 Status Master Titik

Ini status dari data titik patroli:

* aktif
* nonaktif

## 15.2 Status Checklist Harian

Ini status hasil patroli harian:

* belum diperiksa
* sudah diperiksa

### Catatan:

Status checklist harian **bukan** status tetap di tabel master titik, melainkan hasil pembacaan dari log patroli pada tanggal tertentu.

---

## 16. Tampilan UI yang Dibutuhkan

## 16.1 Halaman Pekaseh

Pekaseh membutuhkan:

* daftar titik patroli
* form tambah titik patroli
* edit titik patroli
* generate / lihat QR titik
* atur urutan patroli
* aktif/nonaktif titik
* ringkasan checklist harian

## 16.2 Halaman Matelik

Matelik membutuhkan:

* daftar titik patroli Subaknya
* daftar titik dengan status:

  * belum diperiksa
  * sudah diperiksa
* halaman scan QR
* detail titik patroli
* tombol **Laporkan Gangguan**

## 16.3 Kebutuhan Mobile

Karena fitur ini dipakai di lapangan, UI harus:

* mobile friendly
* tombol besar
* label sederhana
* cepat dibuka
* scan via kamera browser
* mudah dipakai oleh pengguna lapangan / orang tua

---

## 17. Kebutuhan QR

Setiap titik patroli memiliki:

* QR permanen
* QR mengarah ke endpoint / halaman scan titik
* akses QR harus memerlukan login

### Perilaku saat QR dibuka:

* jika belum login → diarahkan ke login
* jika login tetapi bukan Matelik/Subak terkait → ditolak
* jika login valid → masuk ke halaman titik patroli untuk scan

---

## 18. Integrasi dengan Sistem Existing

Modul Patrol QR tidak mengganti modul existing, tetapi menambah satu layer baru sebelum laporan.

### Integrasi yang terjadi:

* Patrol QR menambah data titik patroli
* Patrol QR menambah data log patroli
* Patrol QR bisa menghasilkan laporan ke `reports`
* Flow verifikasi Pekaseh tetap memakai modul existing
* Histori laporan tetap memakai struktur existing
* Closed-loop evidence tetap memakai flow existing

Dengan demikian, Patrol QR menjadi:

> **modul patroli dan checkpoint**, sedangkan E-Matelik existing tetap menjadi **modul laporan dan tracking insiden**.

---

## 19. Manfaat Fitur

### 19.1 Manfaat Operasional

* patroli menjadi tercatat
* titik yang sudah diperiksa mudah dipantau
* Pekaseh bisa melihat cakupan patroli harian
* titik patroli menjadi lebih terstruktur

### 19.2 Manfaat Administratif

* ada jejak siapa memeriksa titik
* ada jejak kapan titik diperiksa
* laporan menjadi lebih kuat karena berasal dari titik patroli yang terdaftar

### 19.3 Manfaat Strategis

* memperkuat unsur **Matelik** dalam sistem
* membuat E-Matelik lebih berbeda dari aplikasi aduan biasa
* memperkuat positioning sebagai inovasi tata kelola pertanian, bukan sekadar pelaporan digital

---

## 20. Batasan MVP Modul Patrol QR

Agar implementasi tetap realistis, modul ini pada tahap awal **tidak** mencakup:

* sinkron offline
* status inspeksi yang kompleks
* QR pasca-perbaikan
* PDF kapsul bukti administratif
* riwayat kesehatan titik
* skor kerawanan titik
* analisis otomatis pola kerusakan titik
* integrasi pemerintah penuh dari modul patroli

---

## 21. Kesimpulan

Modul Patrol QR adalah fitur tambahan E-Matelik yang berfungsi untuk mendigitalisasi patroli Matelik melalui QR code permanen pada titik pemeriksaan.

Fitur ini membuat E-Matelik tidak hanya menjadi sistem pelaporan gangguan, tetapi juga menjadi sistem patroli digital yang:

* mencatat titik yang sudah diperiksa,
* memperjelas checklist harian,
* menghubungkan patroli dengan laporan gangguan,
* dan memperkuat dokumentasi operasional pengawasan telabah.

Untuk MVP awal, implementasi paling realistis adalah:

* role baru `Matelik`
* master data titik patroli
* QR permanen per titik
* scan QR untuk checklist harian
* tombol **Laporkan Gangguan** dari titik patroli
* integrasi titik patroli ke laporan existing

Dengan batasan tersebut, fitur ini tetap berada dalam scope yang rasional, tetapi sudah cukup kuat untuk memperluas nilai E-Matelik sebagai inovasi tata kelola pertanian berbasis patroli terdokumentasi.
