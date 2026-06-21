# PRD - E-Matelik MVP

## Product Requirements Document

**Nama Produk:** E-Matelik  
**Versi:** MVP Sinkron Implementasi  
**Stack:** Laravel + React + PostgreSQL  
**Tujuan Dokumen:** Menjadi acuan produk yang sesuai dengan sistem yang sudah berjalan

---

## 1. Ringkasan Produk

E-Matelik adalah aplikasi **WebGIS pelaporan dan tracking gangguan telabah** pada ekosistem Subak. Produk ini difokuskan sebagai:

* alat dokumentasi berbasis lokasi,
* alat bantu verifikasi Pekaseh,
* alat bantu tracking administratif,
* dan alat bantu closed-loop reporting.

Produk ini **tidak** diposisikan sebagai:

* sistem hidrologi,
* alat forensik hukum final,
* atau mesin penyelesai masalah kelembagaan.

---

## 2. Masalah yang Disasar MVP

MVP ini fokus menyasar masalah berikut:

1. laporan lapangan belum terstruktur,
2. bukti awal sering lemah dan tercecer,
3. titik lokasi insiden tidak terdokumentasi rapi,
4. verifikasi awal oleh Pekaseh belum terdigitalisasi,
5. status tindak lanjut sulit dipantau,
6. bukti penyelesaian belum konsisten,
7. laporan rawan hilang tanpa jejak histori.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama

1. menerima laporan insiden telabah berbasis lokasi,
2. menyimpan bukti administratif awal yang lebih kuat,
3. memfasilitasi verifikasi awal oleh Pekaseh,
4. memperlihatkan status administratif tindak lanjut,
5. dan mendukung bukti penyelesaian sebelum laporan selesai.

### 3.2 Tujuan Pilot MVP

MVP harus cukup membuktikan bahwa:

* laporan dapat dibuat end-to-end,
* laporan dapat diverifikasi,
* laporan dapat dipantau di peta,
* histori proses tercatat,
* dan penyelesaian dapat didukung dengan bukti lanjutan.

---

## 4. Target Pengguna

### 4.1 Role Aplikasi yang Aktif

* **Pelapor**
* **Pekaseh**
* **Admin**

### 4.2 Aktor Konseptual yang Masih Roadmap

* Kelihan Tempek
* Instansi terkait / viewer

---

## 5. Nilai Produk

E-Matelik memberi nilai utama berupa:

* pelaporan berbasis peta,
* dokumentasi foto dan lokasi,
* verifikasi Pekaseh,
* tracking status dan histori,
* closed-loop evidence,
* dan visibilitas proses yang lebih kuat daripada laporan verbal biasa.

---

## 6. Ruang Lingkup Fitur MVP Saat Ini

### 6.1 Fitur yang Sudah Termasuk

1. **Autentikasi Dasar**
   * login
   * logout
   * proteksi route berbasis role

2. **Role Dasar**
   * pelapor
   * pekaseh
   * admin

3. **Peta Interaktif**
   * basemap OpenStreetMap
   * marker laporan
   * pemilihan titik saat buat laporan

4. **Form Laporan**
   * judul
   * kategori
   * deskripsi
   * lokasi
   * foto bukti

5. **Upload Bukti**
   * minimal satu foto
   * metadata upload
   * `file_hash`
   * `captured_from`

6. **Verifikasi Pekaseh**
   * verdict `valid`
   * verdict `perlu klarifikasi`
   * verdict `eskalasi administratif lanjutan`
   * verdict `selesai internal`

7. **Tracking Status**
   * menunggu verifikasi
   * diverifikasi
   * perlu klarifikasi
   * diekskalasi
   * diproses
   * selesai
   * ditolak

8. **Closed-Loop Evidence**
   * bukti awal
   * bukti penyelesaian
   * catatan penyelesaian
   * waktu penyelesaian

9. **Dashboard**
   * dashboard pelapor
   * dashboard Pekaseh
   * dashboard admin
   * KPI proses sederhana

10. **Histori**
   * laporan dibuat
   * verifikasi
   * klarifikasi
   * eskalasi
   * perubahan status
   * penyelesaian
   * penyelesaian internal

### 6.2 Fitur Penting yang Sudah Masuk Setelah Revisi

* kontrol visibilitas identitas pelapor
* rate limiting ringan submit laporan
* indikator backlog verifikasi Pekaseh
* urgency layer pada badge, marker, dan dashboard
* pemisahan bukti awal dan bukti penyelesaian di UI

### 6.3 Fitur yang Tetap Tidak Masuk MVP

* mobile native
* OTP / login nomor HP
* object storage produksi
* polyline / line geometry
* simulasi hidrologi
* prediksi dampak hilir
* AI/ML
* export PDF bukti
* integrasi birokrasi penuh

---

## 7. Aturan Produk yang Berlaku

1. Semua laporan dibuat oleh user login.
2. Semua laporan wajib punya lokasi.
3. Semua laporan wajib punya minimal satu foto bukti awal.
4. Semua laporan baru otomatis berstatus **Menunggu Verifikasi**.
5. Pekaseh adalah verifikator awal.
6. `Selesai Internal` adalah verdict Pekaseh, bukan status baru.
7. Semua perubahan penting harus tercatat di histori.
8. Identitas pelapor harus dibatasi berdasarkan role.
9. Laporan diperlakukan sebagai **sinyal awal**, bukan kebenaran final.
10. Status pada sistem adalah **status administratif penanganan**, bukan keputusan sosial final.

---

## 8. Alur Utama Produk

### 8.1 Pelapor

1. login
2. buka form laporan
3. pilih titik di peta
4. isi form
5. upload bukti awal
6. kirim laporan
7. pantau status dan histori

### 8.2 Pekaseh

1. login
2. buka daftar verifikasi
3. tinjau detail, bukti, dan identitas pelapor
4. beri keputusan
5. simpan histori verifikasi

### 8.3 Admin

1. login
2. buka daftar semua laporan
3. filter laporan
4. tinjau detail dan histori
5. update status
6. tambahkan bukti penyelesaian bila diperlukan

---

## 9. Requirement Data Produk

### 9.1 Data Pengguna

* name
* email
* password
* phone
* role
* subak_id
* is_active

### 9.2 Data Laporan

* pelapor
* subak
* judul
* kategori
* deskripsi
* latitude
* longitude
* priority_level
* verification_note
* resolution_note
* status
* submitted_at
* verified_at
* resolved_at

### 9.3 Data Bukti

* file foto
* `photo_role`
* `file_hash`
* `captured_from`
* `uploaded_by`

### 9.4 Data Histori

* aksi
* status lama
* status baru
* aktor
* catatan
* waktu

---

## 10. KPI MVP yang Realistis

KPI yang relevan untuk MVP dan pilot:

* jumlah laporan terkirim
* laporan menunggu verifikasi
* laporan diverifikasi
* laporan selesai
* laporan dengan bukti lengkap
* backlog verifikasi Pekaseh lewat 24 jam

KPI ini diposisikan sebagai **indikator proses pilot**, bukan klaim dampak besar.

---

## 11. Batas Klaim Produk

Produk boleh mengklaim:

* dokumentasi lebih rapi,
* keterlacakan lebih jelas,
* bukti awal lebih siap diverifikasi,
* dan status tidak mudah hilang dari pengawasan.

Produk tidak boleh mengklaim:

* bukti hukum final,
* prediksi hilir,
* AI triase cerdas,
* atau digitalisasi otomatis menyelesaikan masalah kelembagaan.

---

## 12. Kriteria Sukses MVP

MVP dianggap berhasil bila:

1. user dapat login sesuai role,
2. pelapor dapat membuat laporan berbasis lokasi,
3. foto dan metadata dasar tersimpan,
4. Pekaseh dapat memverifikasi laporan,
5. admin dapat memperbarui status,
6. histori proses tercatat,
7. closed-loop evidence dapat ditampilkan,
8. seluruh alur dapat didemokan end-to-end.

---

## 13. Ringkasan Akhir

E-Matelik MVP saat ini adalah sistem WebGIS yang fokus pada pelaporan, verifikasi, tracking, dan closed-loop evidence gangguan telabah. Nilai utamanya ada pada dokumentasi berbasis lokasi, keterlibatan Pekaseh sebagai verifikator awal, dan visibilitas proses yang lebih kuat daripada mekanisme manual, sambil tetap menjaga batas klaim agar realistis dan defensible.
