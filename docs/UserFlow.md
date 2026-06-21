# User Flow - E-Matelik MVP

## Pemetaan Navigasi dan Alur Penggunaan

---

## 1. Tujuan Dokumen

Dokumen ini menggambarkan alur penggunaan E-Matelik sesuai implementasi terbaru, termasuk:

* pelaporan,
* verifikasi Pekaseh,
* pembaruan status admin,
* visibilitas identitas pelapor,
* dan closed-loop evidence.

---

## 2. Role Aplikasi yang Aktif

1. **Pelapor**
2. **Pekaseh**
3. **Admin**

Role lain seperti Kelihan Tempek atau viewer eksternal masih berada pada level narasi dan roadmap, belum menjadi akses aplikasi terpisah.

---

## 3. Struktur Navigasi Utama

### Halaman Umum

* `/`
* `/login`
* `/register`
* `/dashboard`
* `/profile`

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

## 4. Prinsip Flow yang Berlaku

1. Laporan dibuat sebagai **sinyal awal**, bukan kebenaran final.
2. Pekaseh tetap menjadi pintu verifikasi awal.
3. Eskalasi dibingkai sebagai **koordinasi administratif lanjutan**.
4. Status yang tampil adalah **status administratif proses**.
5. Laporan selesai idealnya memiliki jejak bukti penyelesaian.

---

## 5. Flow Pelapor

### 5.1 Tujuan Pelapor

Pelapor ingin:

* membuat laporan,
* mengunggah bukti awal,
* melihat status laporan,
* melihat histori,
* dan memantau apakah laporan sudah punya bukti penyelesaian.

### 5.2 Alur Utama Pelapor

#### Flow 1 - Login

1. Pelapor membuka aplikasi
2. Pelapor login
3. Sistem mengarahkan ke dashboard pelapor

#### Flow 2 - Membuat Laporan

1. Pelapor membuka `Buat Laporan`
2. Pelapor memilih titik lokasi di peta
3. Pelapor mengisi:
   * judul
   * kategori
   * deskripsi
   * keterangan lokasi
4. Pelapor mengunggah minimal satu foto bukti awal
5. Pelapor submit laporan
6. Sistem:
   * menyimpan laporan
   * memberi status `Menunggu Verifikasi`
   * menyimpan histori `created`
   * menyimpan hash file dan sumber foto bila tersedia
7. Pelapor diarahkan ke detail laporan

#### Flow 3 - Memantau Laporan

1. Pelapor membuka `Laporan Saya`
2. Pelapor melihat:
   * status
   * prioritas
   * jumlah bukti awal
   * jumlah bukti penyelesaian
   * indikator closed-loop lengkap / belum lengkap
3. Pelapor membuka detail laporan
4. Sistem menampilkan:
   * detail laporan
   * peta
   * bukti awal
   * bukti penyelesaian
   * catatan penyelesaian
   * histori

### 5.3 Error dan Validasi Pelapor

Sistem mencegah submit bila:

* judul kosong
* kategori belum dipilih
* lokasi belum dipilih
* foto belum diunggah

Sistem juga membatasi submit dengan **rate limiting ringan** untuk mencegah spam.

---

## 6. Flow Pekaseh

### 6.1 Tujuan Pekaseh

Pekaseh ingin:

* melihat laporan pada Subaknya,
* memverifikasi laporan,
* menentukan apakah laporan valid, perlu klarifikasi, selesai internal, atau perlu eskalasi administratif lanjutan,
* dan memantau backlog verifikasi.

### 6.2 Alur Utama Pekaseh

#### Flow 1 - Login

1. Pekaseh login
2. Sistem mengarahkan ke dashboard Pekaseh

#### Flow 2 - Membaca Backlog

1. Di dashboard atau daftar verifikasi, Pekaseh melihat:
   * jumlah menunggu verifikasi
   * jumlah backlog lewat 24 jam
   * laporan terbaru
2. Laporan yang terlambat diverifikasi diberi penanda backlog

#### Flow 3 - Verifikasi Laporan

1. Pekaseh membuka detail laporan
2. Pekaseh meninjau:
   * lokasi
   * foto bukti
   * kategori
   * deskripsi
   * identitas pelapor penuh
3. Pekaseh memilih keputusan:
   * `Valid`
   * `Perlu Klarifikasi`
   * `Eskalasi Administratif Lanjutan`
   * `Selesai Internal`
4. Pekaseh mengisi catatan verifikasi
5. Bila perlu, Pekaseh dapat menambahkan foto penyelesaian
6. Sistem menyimpan:
   * status baru
   * catatan verifikasi
   * histori keputusan
   * bukti penyelesaian bila ada

### 6.3 Aturan Khusus Pekaseh

* Pekaseh hanya bisa memverifikasi laporan dari Subaknya.
* `Selesai Internal` dipetakan ke status sistem `Selesai`.
* Histori tetap mencatat makna internal melalui `completed_internal`.

---

## 7. Flow Admin

### 7.1 Tujuan Admin

Admin ingin:

* memantau seluruh laporan,
* membaca prioritas dan urgensi,
* menjaga kualitas histori,
* memperbarui status,
* dan memperkuat closed-loop evidence bila laporan ditutup.

### 7.2 Alur Utama Admin

#### Flow 1 - Login

1. Admin login
2. Sistem mengarahkan ke dashboard admin

#### Flow 2 - Monitoring

1. Admin membuka dashboard atau `Semua Laporan`
2. Admin melihat:
   * total laporan
   * laporan menunggu verifikasi
   * laporan diverifikasi
   * laporan selesai
   * laporan dengan bukti lengkap
3. Admin memakai filter status, kategori, dan prioritas

#### Flow 3 - Update Status

1. Admin membuka detail laporan
2. Admin meninjau:
   * bukti awal
   * bukti penyelesaian
   * histori
   * status saat ini
3. Admin memilih status baru
4. Admin mengisi catatan tindak lanjut
5. Bila perlu, admin mengisi catatan penyelesaian dan menambah foto penyelesaian
6. Sistem menyimpan:
   * status baru
   * histori
   * `resolved_by`, `resolved_at`, `resolution_note` bila status selesai

---

## 8. Visibilitas Identitas Pelapor

### 8.1 Pelapor

* hanya melihat detail laporannya sendiri

### 8.2 Pekaseh

* melihat identitas pelapor penuh pada laporan Subaknya

### 8.3 Admin

* melihat identitas pelapor penuh sesuai kebutuhan monitoring internal

### 8.4 Tampilan yang Lebih Luas

* memakai label seperti `Pelapor terverifikasi`
* identitas dapat disamarkan

---

## 9. End-to-End Flow

1. Pelapor login
2. Pelapor membuat laporan + bukti awal
3. Sistem menyimpan laporan `Menunggu Verifikasi`
4. Pekaseh meninjau dan memberi keputusan
5. Jika perlu, laporan masuk koordinasi administratif lanjutan
6. Admin memperbarui status tindak lanjut
7. Bila selesai, sistem dapat menyimpan bukti penyelesaian
8. Pelapor memantau status, histori, dan kelengkapan bukti

---

## 10. Komponen Detail Laporan yang Sekarang Wajib

Halaman detail laporan sekarang menampilkan:

* ringkasan laporan
* status dan prioritas
* penjelasan status administratif
* peta lokasi
* bukti awal
* bukti penyelesaian
* catatan penyelesaian
* histori

---

## 11. Kondisi Error dan Pembatasan

### 11.1 Pelapor

* tidak bisa melihat laporan milik user lain
* submit laporan dibatasi oleh throttle ringan

### 11.2 Pekaseh

* tidak bisa memverifikasi laporan luar Subak

### 11.3 Admin

* hanya admin yang boleh memperbarui status admin route

---

## 12. Kesimpulan

User flow E-Matelik saat ini sudah berjalan utuh sebagai:

**laporan dibuat -> diverifikasi -> ditindaklanjuti -> ditracking -> didukung bukti penyelesaian**

Alur ini sudah lebih defensible untuk presentasi karena:

* verifikasi sensitif budaya,
* identitas pelapor lebih aman,
* status administratif dijelaskan,
* dan closed-loop evidence terlihat jelas di UI.
