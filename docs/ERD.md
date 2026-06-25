# ERD - E-Matelik

## Tujuan

ERD ini mendeskripsikan struktur data aktual E-Matelik setelah integrasi:

* modul laporan,
* verifikasi Pekaseh,
* bukti foto,
* titik patroli QR,
* dan log patroli harian.

---

## Entitas Utama

1. `roles`
2. `users`
3. `subaks`
4. `categories`
5. `report_statuses`
6. `reports`
7. `report_photos`
8. `report_histories`
9. `patrol_points`
10. `patrol_logs`

---

## Ringkasan Tabel

### `roles`

Menyimpan role aplikasi:

* `admin`
* `pekaseh`
* `pelapor`

### `users`

Menyimpan akun pengguna.

Kolom penting:

* `role_id`
* `subak_id`
* `name`
* `email`
* `phone`
* `password`
* `is_active`

### `subaks`

Menyimpan identitas wilayah Subak.

Kolom penting:

* `name`
* `region`
* `village`
* `district`
* `description`

### `categories`

Menyimpan kategori gangguan.

Kolom penting:

* `name`
* `slug`
* `description`
* `is_active`

### `report_statuses`

Menyimpan status administratif laporan.

Status aktif:

* `menunggu-verifikasi`
* `diverifikasi`
* `perlu-klarifikasi`
* `diekskalasi`
* `diproses`
* `selesai`
* `ditolak`

### `reports`

Entitas inti laporan gangguan.

Kolom penting:

* `report_code`
* `user_id`
* `subak_id`
* `category_id`
* `status_id`
* `patrol_point_id`
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

### `report_photos`

Menyimpan foto laporan.

Kolom penting:

* `report_id`
* `photo_path`
* `original_name`
* `mime_type`
* `file_size`
* `uploaded_by`
* `photo_role`
* `file_hash`
* `captured_from`

Nilai `photo_role`:

* `initial_evidence`
* `resolution_evidence`

### `report_histories`

Menyimpan jejak perubahan status dan keputusan.

Kolom penting:

* `report_id`
* `user_id`
* `from_status_id`
* `to_status_id`
* `action`
* `note`

### `patrol_points`

Menyimpan checkpoint patrol QR.

Kolom penting:

* `subak_id`
* `created_by`
* `point_code`
* `name`
* `point_type`
* `description`
* `latitude`
* `longitude`
* `reference_photo_path`
* `qr_token`
* `patrol_order`
* `is_active`

### `patrol_logs`

Menyimpan hasil patroli harian per checkpoint.

Kolom penting:

* `patrol_point_id`
* `user_id`
* `subak_id`
* `report_id`
* `status`
* `patrol_date`
* `scanned_at`
* `gps_latitude`
* `gps_longitude`
* `inspection_note`

---

## Relasi Antar Entitas

* `roles` 1 --- n `users`
* `subaks` 1 --- n `users`
* `subaks` 1 --- n `reports`
* `subaks` 1 --- n `patrol_points`
* `subaks` 1 --- n `patrol_logs`
* `categories` 1 --- n `reports`
* `report_statuses` 1 --- n `reports`
* `users` 1 --- n `reports` sebagai pelapor
* `users` 1 --- n `reports` sebagai verifier melalui `verified_by`
* `users` 1 --- n `reports` sebagai resolver melalui `resolved_by`
* `reports` 1 --- n `report_photos`
* `reports` 1 --- n `report_histories`
* `reports` 0..1 --- 1 `patrol_points` sebagai sumber laporan patrol QR
* `reports` 0..1 --- n `patrol_logs` saat laporan berasal dari checkpoint rusak
* `users` 1 --- n `report_photos`
* `users` 1 --- n `report_histories`
* `users` 1 --- n `patrol_points` sebagai pembuat checkpoint
* `users` 1 --- n `patrol_logs` sebagai petugas patroli
* `patrol_points` 1 --- n `patrol_logs`
* `patrol_points` 1 --- n `reports`

---

## Aturan Data Penting

1. Setiap laporan wajib punya `latitude`, `longitude`, kategori, pelapor, dan status.
2. Setiap laporan baru wajib punya minimal satu `initial_evidence`.
3. Laporan dari QR menyimpan `patrol_point_id`.
4. Jika laporan dibuat dari scan QR rusak, sistem juga membuat `patrol_logs` status `damaged`.
5. `Selesai Internal` tetap dipetakan ke status `selesai`, bukan status tabel baru.
6. `patrol_points` hanya relevan untuk role Pekaseh dan Pelapor patroli.

---

## Ringkasan Proses Data

**Pekaseh membuat `patrol_points` -> Pelapor membuat `patrol_logs` dari scan -> jika rusak, Pelapor membuat `reports` yang tertaut ke `patrol_point_id` -> foto masuk ke `report_photos` -> keputusan proses masuk ke `report_histories`**
