# ERD - E-Matelik MVP

## Entity Relationship Design

---

## 1. Tujuan ERD

ERD ini mendokumentasikan struktur data yang **benar-benar dipakai** oleh implementasi E-Matelik saat ini.

Fokusnya:

* autentikasi dan role,
* pelaporan insiden,
* verifikasi Pekaseh,
* tracking status,
* histori aktivitas,
* closed-loop evidence,
* dan metadata bukti administratif awal.

---

## 2. Entitas Utama

1. `roles`
2. `users`
3. `subaks`
4. `categories`
5. `report_statuses`
6. `reports`
7. `report_photos`
8. `report_histories`

---

## 3. Tabel dan Fungsi

### 3.1 `roles`

Menyimpan role aplikasi.

Kolom utama:

* `id`
* `name`
* `slug`
* `description`
* `created_at`
* `updated_at`

Role aktif saat ini:

* `pelapor`
* `pekaseh`
* `admin`

### 3.2 `users`

Menyimpan akun pengguna sistem.

Kolom utama:

* `id`
* `role_id`
* `subak_id`
* `name`
* `email`
* `password`
* `phone`
* `is_active`
* `email_verified_at`
* `remember_token`
* `created_at`
* `updated_at`

Catatan:

* pelapor terhubung ke satu Subak,
* Pekaseh terhubung ke satu Subak,
* admin dapat `subak_id = null`.

### 3.3 `subaks`

Menyimpan konteks Subak untuk user dan laporan.

Kolom utama:

* `id`
* `name`
* `region`
* `village`
* `district`
* `description`
* `created_at`
* `updated_at`

### 3.4 `categories`

Menyimpan kategori gangguan.

Kolom utama:

* `id`
* `name`
* `slug`
* `description`
* `is_active`
* `created_at`
* `updated_at`

### 3.5 `report_statuses`

Menyimpan daftar status sistem.

Kolom utama:

* `id`
* `name`
* `slug`
* `description`
* `created_at`
* `updated_at`

Status aktif:

* `menunggu-verifikasi`
* `diverifikasi`
* `perlu-klarifikasi`
* `diekskalasi`
* `diproses`
* `selesai`
* `ditolak`

### 3.6 `reports`

Tabel inti laporan.

Kolom utama:

* `id`
* `report_code`
* `user_id`
* `subak_id`
* `category_id`
* `status_id`
* `verified_by`
* `resolved_by`
* `title`
* `description`
* `latitude`
* `longitude`
* `address_text`
* `priority_level`
* `verification_note`
* `resolution_note`
* `verified_at`
* `resolved_at`
* `submitted_at`
* `created_at`
* `updated_at`

Catatan:

* `verified_by` dipakai untuk keputusan verifikasi Pekaseh,
* `resolved_by` dipakai saat ada penyelesaian,
* `resolution_note` dan `resolved_at` mendukung closed-loop evidence,
* geometri masih berupa point anchor (`latitude`, `longitude`).

### 3.7 `report_photos`

Menyimpan foto bukti laporan.

Kolom utama:

* `id`
* `report_id`
* `photo_path`
* `original_name`
* `mime_type`
* `file_size`
* `photo_role`
* `file_hash`
* `captured_from`
* `uploaded_by`
* `created_at`
* `updated_at`

Nilai `photo_role`:

* `initial_evidence`
* `resolution_evidence`

Nilai `captured_from`:

* `camera`
* `gallery`
* `unknown`

### 3.8 `report_histories`

Menyimpan histori perubahan laporan.

Kolom utama:

* `id`
* `report_id`
* `user_id`
* `from_status_id`
* `to_status_id`
* `action`
* `note`
* `created_at`
* `updated_at`

Contoh action yang sekarang dipakai:

* `created`
* `verified`
* `clarification_requested`
* `escalated`
* `status_updated`
* `completed`
* `completed_internal`

---

## 4. Relasi Antar Tabel

* `roles` 1 --- n `users`
* `subaks` 1 --- n `users`
* `subaks` 1 --- n `reports`
* `categories` 1 --- n `reports`
* `report_statuses` 1 --- n `reports`
* `users` 1 --- n `reports` sebagai pelapor
* `users` 1 --- n `reports` sebagai verifier melalui `verified_by`
* `users` 1 --- n `reports` sebagai resolver melalui `resolved_by`
* `reports` 1 --- n `report_photos`
* `users` 1 --- n `report_photos` melalui `uploaded_by`
* `reports` 1 --- n `report_histories`
* `users` 1 --- n `report_histories`
* `report_statuses` 1 --- n `report_histories` sebagai `from_status_id`
* `report_statuses` 1 --- n `report_histories` sebagai `to_status_id`

---

## 5. Relasi Eloquent yang Aktif

### `User`

* `belongsTo(Role::class)`
* `belongsTo(Subak::class)`
* `hasMany(Report::class)`
* `hasMany(Report::class, 'verified_by')`
* `hasMany(ReportPhoto::class, 'uploaded_by')`
* `hasMany(ReportHistory::class)`

### `Report`

* `belongsTo(User::class)`
* `belongsTo(Subak::class)`
* `belongsTo(Category::class)`
* `belongsTo(ReportStatus::class, 'status_id')`
* `belongsTo(User::class, 'verified_by')`
* `belongsTo(User::class, 'resolved_by')`
* `hasMany(ReportPhoto::class)`
* `hasMany(ReportHistory::class)`
* `hasMany(ReportPhoto::class)` terfilter sebagai `initialPhotos`
* `hasMany(ReportPhoto::class)` terfilter sebagai `resolutionPhotos`

### `ReportPhoto`

* `belongsTo(Report::class)`
* `belongsTo(User::class, 'uploaded_by')`

### `ReportHistory`

* `belongsTo(Report::class)`
* `belongsTo(User::class)`
* `belongsTo(ReportStatus::class, 'from_status_id')`
* `belongsTo(ReportStatus::class, 'to_status_id')`

---

## 6. Aturan Data Penting

1. Semua laporan wajib punya:
   * pelapor
   * subak
   * kategori
   * status
   * judul
   * deskripsi
   * latitude
   * longitude

2. Semua laporan baru otomatis memakai status `Menunggu Verifikasi`.

3. Semua laporan wajib memiliki minimal satu `report_photo` dengan `photo_role = initial_evidence`.

4. Laporan yang selesai idealnya memiliki:
   * `resolution_note`
   * `resolved_by`
   * `resolved_at`
   * minimal satu `resolution_evidence`

5. `Selesai Internal` tidak disimpan sebagai status baru, melainkan sebagai:
   * status akhir `selesai`
   * histori action `completed_internal`

---

## 7. Catatan Desain yang Relevan dengan Implementasi

* Metadata bukti sekarang lebih kuat daripada versi awal karena menyimpan `file_hash` dan `captured_from`.
* Struktur tetap sengaja hemat untuk MVP, sehingga belum ada tabel `report_resolutions` terpisah.
* Belum ada tabel khusus eskalasi, komentar, atau viewer eksternal.
* Belum ada representasi line/polyline untuk telabah.

---

## 8. Kesimpulan

ERD E-Matelik saat ini sudah mendukung alur:

**pelapor membuat laporan -> Pekaseh memverifikasi -> admin memperbarui status -> sistem menyimpan histori dan bukti penyelesaian**

Struktur ini sudah cukup untuk:

* role-based workflow,
* closed-loop evidence,
* privacy-aware reporting,
* KPI proses sederhana,
* dan demo MVP yang defensible.
