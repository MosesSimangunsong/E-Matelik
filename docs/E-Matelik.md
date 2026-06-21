# Spesifikasi Sistem E-Matelik

## 1. Nama Sistem

**E-Matelik**  
**Electronic Matelik for Subak Irrigation Reporting and Spatial Monitoring**

---

## 2. Gambaran Umum Sistem

E-Matelik adalah **sistem WebGIS** untuk membantu pelaporan, verifikasi, dan pelacakan gangguan telabah pada ekosistem Subak.

Fokus implementasi saat ini adalah:

* pelaporan insiden berbasis titik lokasi,
* dokumentasi bukti lapangan,
* verifikasi awal oleh Pekaseh,
* tracking status administratif,
* closed-loop evidence sebelum laporan dianggap selesai,
* dan visibilitas proses melalui dashboard serta histori.

E-Matelik **bukan** pengganti tata kelola adat, musyawarah, atau mekanisme sosial Subak. Sistem ini diposisikan sebagai:

* alat dokumentasi digital,
* alat bantu patroli,
* alat bantu koordinasi,
* dan alat bantu akuntabilitas proses.

---

## 3. Positioning Masalah dan Solusi

### 3.1 Posisi Masalah

E-Matelik tidak diposisikan sebagai solusi tunggal atas ancaman makro seperti alih fungsi lahan atau tekanan pembangunan. Sistem ini fokus pada **gap operasional**:

* gangguan telabah terlambat didokumentasikan,
* bukti lapangan lemah,
* laporan sulit diverifikasi,
* status tindak lanjut mudah hilang,
* dan jejak penyelesaian tidak konsisten.

### 3.2 Posisi Solusi

E-Matelik memperkuat:

* visibilitas kasus,
* kualitas dokumentasi awal,
* keterlacakan tindakan,
* dan peluang tindak lanjut yang lebih tertib.

Sistem ini **tidak mengklaim**:

* pembuktian hukum final,
* simulasi hidrologi,
* atau penyelesaian otomatis masalah sosial dan kelembagaan.

---

## 4. Tujuan Sistem

### 4.1 Tujuan Utama

1. Mempermudah pelaporan gangguan telabah berbasis lokasi.
2. Memperkuat bukti administratif awal melalui foto, titik lokasi, timestamp server, identitas akun, dan histori.
3. Menempatkan Pekaseh sebagai verifikator utama pada tahap awal.
4. Menjaga tracking proses dari laporan dibuat sampai selesai.
5. Mendorong closed-loop reporting melalui bukti penyelesaian.

### 4.2 Tujuan Operasional MVP

* Pelapor dapat mengirim laporan secara terstruktur.
* Pekaseh dapat memberi keputusan verifikasi yang jelas.
* Admin dapat memantau, memperbarui status, dan menjaga histori.
* Dashboard dapat menunjukkan KPI proses sederhana dan realistis.

---

## 5. Role Sistem yang Aktif

### 5.1 Role Aktif di Implementasi

* **Pelapor**
* **Pekaseh**
* **Admin**

### 5.2 Role Konseptual yang Belum Diimplementasikan sebagai Akses Terpisah

* Kelihan Tempek
* Viewer / Instansi terkait

Role konseptual ini tetap relevan dalam narasi produk dan roadmap, tetapi belum menjadi role aplikasi terpisah pada MVP yang berjalan.

---

## 6. Prinsip Dasar Sistem

1. **Sensitif budaya**  
   Eskalasi dibingkai sebagai koordinasi administratif lanjutan, bukan bypass otomatis ke pemerintah.

2. **Berbasis bukti administratif awal**  
   Bukti laporan diperkuat, tetapi tidak diklaim sebagai bukti forensik final.

3. **Berbasis peran**  
   Akses data dan visibilitas identitas pelapor dibatasi sesuai kewenangan.

4. **Sederhana dan realistis**  
   MVP memakai anchor titik lokasi, bukan line geometry atau analisis spasial berat.

5. **Closed-loop**  
   Laporan selesai idealnya memiliki catatan penyelesaian dan bukti after-action.

---

## 7. Fitur yang Sudah Diimplementasikan

### 7.1 Autentikasi dan Role

* login
* logout
* redirect dashboard sesuai role
* proteksi route berbasis middleware role

### 7.2 Modul Pelapor

* dashboard pelapor
* daftar laporan milik sendiri
* form buat laporan
* pemilihan titik lokasi di peta
* upload minimal satu foto bukti
* detail laporan
* histori laporan

### 7.3 Modul Peta / WebGIS

* peta berbasis OpenStreetMap + Leaflet
* marker laporan
* marker dengan sinyal prioritas/status
* tampilan peta sesuai role

### 7.4 Modul Verifikasi Pekaseh

Pekaseh dapat:

* melihat daftar laporan Subaknya,
* melihat detail laporan,
* melihat identitas pelapor penuh,
* memberi verdict:
  * `Valid`
  * `Perlu Klarifikasi`
  * `Eskalasi Administratif Lanjutan`
  * `Selesai Internal`

### 7.5 Modul Admin

Admin dapat:

* melihat semua laporan,
* filter berdasarkan status, kategori, dan prioritas,
* melihat detail laporan,
* mengubah status,
* mengelola kategori,
* mengelola user,
* melihat histori aktivitas.

### 7.6 Closed-Loop Evidence

Sistem mendukung:

* bukti awal (`initial_evidence`)
* bukti penyelesaian (`resolution_evidence`)
* `resolution_note`
* `resolved_by`
* `resolved_at`

### 7.7 Histori dan Tracking

Histori mencatat:

* `created`
* `verified`
* `clarification_requested`
* `escalated`
* `status_updated`
* `completed`
* `completed_internal`

### 7.8 Mitigasi Penyalahgunaan Minimum

* laporan hanya bisa dibuat oleh akun login
* user pelapor terikat ke Subak
* rate limiting ringan untuk submit laporan
* laporan diposisikan sebagai sinyal awal, bukan kebenaran final

### 7.9 Privacy dan UI Defensif

* identitas pelapor tampil penuh untuk Pekaseh dan admin
* tampilan yang lebih luas memakai identitas tersamarkan / label “pelapor terverifikasi”
* status sistem dijelaskan sebagai status administratif

---

## 8. Batas Klaim Sistem

### 8.1 Yang Diklaim

* dokumentasi digital lebih rapi daripada laporan verbal
* pelacakan proses lebih jelas
* bukti awal lebih siap diverifikasi
* laporan lebih sulit “hilang” tanpa jejak

### 8.2 Yang Tidak Diklaim

* keaslian absolut foto
* chain-of-custody hukum penuh
* prediksi dampak hilir
* analisis hidrologi
* penyelesaian konflik kelembagaan secara otomatis

---

## 9. Struktur Data Inti yang Berlaku

### 9.1 Tabel Inti

* `roles`
* `users`
* `subaks`
* `categories`
* `report_statuses`
* `reports`
* `report_photos`
* `report_histories`

### 9.2 Data Penting pada `reports`

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

### 9.3 Data Penting pada `report_photos`

* `photo_role`
  * `initial_evidence`
  * `resolution_evidence`
* `file_hash`
* `captured_from`
  * `camera`
  * `gallery`
  * `unknown`

---

## 10. Status dan Verdict

### 10.1 Status Sistem

* Menunggu Verifikasi
* Diverifikasi
* Perlu Klarifikasi
* Diekskalasi
* Diproses
* Selesai
* Ditolak

### 10.2 Aturan Khusus Pekaseh

`Selesai Internal` **bukan** status database baru.

Pemetaan verdict:

* `Valid` → `Diverifikasi`
* `Perlu Klarifikasi` → `Perlu Klarifikasi`
* `Eskalasi` → `Diekskalasi`
* `Selesai Internal` → `Selesai`

Saat `Selesai Internal` dipilih:

* status laporan menjadi `Selesai`
* `verified_by` dan `verified_at` diisi
* `resolved_by` dan `resolved_at` diisi
* `resolution_note` diisi
* histori memakai action `completed_internal`

---

## 11. Navigasi yang Berlaku

### Pelapor

* `/pelapor/dashboard`
* `/reports`
* `/reports/create`
* `/reports/{id}`
* `/map`

### Pekaseh

* `/pekaseh/dashboard`
* `/verification`
* `/verification/{id}`
* `/map`

### Admin

* `/admin/dashboard`
* `/admin/reports`
* `/admin/reports/{id}`
* `/admin/categories`
* `/admin/users`
* `/admin/history`

---

## 12. KPI Proses yang Sudah Ditampilkan

Dashboard saat ini sudah mulai menampilkan KPI realistis seperti:

* jumlah laporan
* laporan menunggu verifikasi
* laporan selesai
* laporan diverifikasi
* laporan dengan bukti lengkap
* backlog verifikasi lewat 24 jam untuk Pekaseh

KPI ini diposisikan sebagai **indikator pilot**, bukan klaim dampak final.

---

## 13. Batasan Implementasi Saat Ini

* geometri masih point-based incident anchor
* belum ada line/polyline telabah
* belum ada object storage produksi
* belum ada OTP / nomor HP login
* belum ada simulasi dampak hilir
* belum ada export dossier bukti
* belum ada role viewer/instansi terpisah

---

## 14. Ringkasan Akhir

E-Matelik saat ini adalah MVP WebGIS yang berfungsi untuk melaporkan gangguan telabah berbasis lokasi, memverifikasinya melalui Pekaseh, memantau tindak lanjut administratif oleh admin, serta menjaga jejak bukti dan histori sampai tahap penyelesaian. Sistem ini sudah mengadopsi closed-loop evidence, kontrol privasi pelapor berbasis role, mitigasi spam minimum, urgency layer pada UI, dan KPI proses sederhana yang realistis untuk kebutuhan pilot dan presentasi.
