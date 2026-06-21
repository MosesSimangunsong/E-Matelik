# Revisi Sistem E-Matelik — Instruksi Bertahap untuk Codex

## Tujuan

Dokumen ini berisi instruksi untuk melakukan revisi sistem E-Matelik berdasarkan hasil audit kritik juri dan dokumen penyempurnaan yang sudah dibuat.

Tujuan revisi ini adalah:

* memperkuat sistem terhadap kritik juri,
* menyelaraskan sistem dengan narasi esai,
* menutup celah teknis dan UX yang paling berbahaya,
* dan tetap menjaga scope agar tidak melebar dari MVP.

## Aturan Umum

Sebelum mulai setiap tahap:

1. Baca seluruh file di folder `docs/`
2. Baca seluruh file di folder `docs/mermaid/`
3. Gunakan dokumen tersebut sebagai **source of truth**
4. Patuhi hasil revisi dari dokumen audit kritik juri
5. Jangan menambah fitur di luar scope tahap yang sedang dikerjakan
6. Jika ada konflik antara implementasi lama dan dokumen revisi, prioritaskan dokumen revisi dan laporkan perubahan yang dilakukan

## Fokus Besar Revisi

Revisi sistem difokuskan pada:

* **closed-loop evidence**
* **privasi pelapor**
* **urgency layer di UI**
* **perbaikan alur verifikasi dan eskalasi**
* **kesiapan KPI proses**
* **mitigasi penyalahgunaan**
* **penurunan klaim fitur yang terlalu besar**

---

# TAHAP 1 — Revisi Struktur Data dan Backend Inti

## Tujuan Tahap 1

Memperbaiki fondasi data dan backend agar:

* laporan memiliki bukti penyelesaian,
* histori lebih kuat,
* status penyelesaian lebih dapat dipertanggungjawabkan,
* dan sistem siap untuk closed-loop reporting.

## Scope Tahap 1

Kerjakan hanya revisi backend dan struktur data berikut:

### 1. Closed-loop evidence

Tambahkan dukungan agar laporan yang berstatus `Selesai` memiliki bukti penyelesaian.

Implementasi yang direkomendasikan:

* perluas `report_photos` dengan field tipe foto, misalnya:

  * `initial_evidence`
  * `resolution_evidence`

### 2. Data penyelesaian laporan

Tambahkan elemen data berikut pada report jika diperlukan:

* `resolution_note`
* `resolved_by`
* `resolved_at`

Jika pendekatannya lebih baik diletakkan di histori atau struktur lain yang tetap sederhana untuk MVP, jelaskan alasannya.

### 3. Penguatan bukti administratif awal

Tambahkan dukungan backend untuk:

* server-side timestamp yang jelas
* hash file foto saat upload
* penanda sederhana sumber foto:

  * `camera`
  * `gallery`
  * `unknown` jika perlu

### 4. Perbaikan histori

Pastikan histori dapat merekam:

* pembuatan laporan
* verifikasi Pekaseh
* eskalasi
* perubahan status
* penyelesaian
* penyelesaian internal oleh Pekaseh

### 5. Konsistensi status/verdict

Tetap gunakan keputusan:

* `Selesai Internal` = keputusan Pekaseh
* status database akhir = `Selesai`

Pastikan histori menyimpan makna internal tersebut, misalnya lewat action:

* `completed_internal`

## Batasan Tahap 1

Jangan kerjakan dulu:

* styling frontend
* revisi visual dashboard
* perubahan flow role besar
* fitur map baru
* login OTP
* object storage penuh
* geometri line/polyline

## Output Tahap 1

Saya ingin hasil akhir berupa:

1. migration / perubahan skema jika diperlukan
2. model dan relasi yang diperbarui
3. logika backend yang mendukung bukti penyelesaian
4. histori yang lebih lengkap
5. test yang tetap hijau
6. ringkasan file yang diubah

---

# TAHAP 2 — Revisi Flow, Privasi, dan Verifikasi

## Tujuan Tahap 2

Memperbaiki flow sistem agar:

* lebih sensitif budaya,
* lebih aman bagi pelapor,
* tidak terlalu rawan disalahgunakan,
* dan lebih konsisten dengan proses verifikasi/administratif yang realistis.

## Scope Tahap 2

Kerjakan hanya revisi flow dan akses berikut:

### 1. Privasi pelapor berbasis role

Ubah tampilan dan akses identitas pelapor agar:

* Pekaseh bisa melihat identitas pelapor
* admin internal bisa melihat sesuai kebutuhan
* role lain atau tampilan yang lebih luas hanya melihat identitas tersamarkan atau label seperti “pelapor terverifikasi”

### 2. Perbaikan flow verifikasi Pekaseh

Pastikan flow verifikasi:

* tetap sederhana
* tidak membuat Pekaseh terlihat seperti operator teknis berat
* menyimpan keputusan dengan jelas
* menyimpan histori lengkap

### 3. Eskalasi yang tidak terkesan bypass adat

Rapikan flow eskalasi agar narasinya tidak terlihat sebagai:

* otomatis dilempar ke pemerintah

Gunakan pendekatan yang lebih aman:

* eskalasi administratif lanjutan
* siap dibawa ke tahapan koordinasi berikutnya
* tidak memotong struktur adat secara langsung

### 4. Mitigasi laporan palsu / spam

Tambahkan mitigasi minimum yang realistis untuk MVP, misalnya:

* pembatasan berdasarkan akun terautentikasi
* validasi user terhadap Subak
* rate limiting ringan jika relevan
* catatan klarifikasi
* perlakuan bahwa laporan adalah sinyal awal, bukan kebenaran final

### 5. Bottleneck Pekaseh

Tambahkan dasar flow untuk mengurangi single point of failure, misalnya:

* penanda laporan yang belum diverifikasi dalam rentang waktu tertentu
* backlog atau struktur untuk delegasi/fallback
* minimal indikator proses yang bisa dipakai nanti

## Batasan Tahap 2

Jangan kerjakan dulu:

* redesign besar UI
* revisi visual map
* fitur offline
* OTP login
* geometry line
* object storage skala produksi

## Output Tahap 2

Saya ingin hasil akhir berupa:

1. flow verifikasi yang lebih aman
2. kontrol visibilitas identitas pelapor
3. mitigasi awal laporan palsu
4. catatan atau struktur fallback Pekaseh
5. ringkasan file yang diubah
6. test tetap hijau

---

# TAHAP 3 — Revisi Frontend, UX, dan Kesiapan Presentasi

## Tujuan Tahap 3

Memperbaiki tampilan dan pengalaman sistem agar:

* tetap tenang secara identitas,
* tetapi tegas secara operasional,
* menunjukkan urgensi laporan,
* dan lebih siap dipresentasikan ke juri.

## Scope Tahap 3

Kerjakan hanya revisi frontend/UX berikut:

### 1. Urgency layer pada UI

Tambahkan atau perkuat:

* badge prioritas
* warna status kritis
* marker darurat/tinggi
* alert card untuk laporan penting
* daftar laporan prioritas tinggi di dashboard

### 2. Closed-loop evidence pada UI

Pastikan UI menampilkan dengan jelas:

* bukti awal
* bukti penyelesaian
* catatan penyelesaian
* histori perubahan status

### 3. Penjelasan status administratif

Tambahkan penanda atau copy ringan agar jelas bahwa:

* status di sistem adalah status administratif/penanganan
* bukan keputusan sosial final

### 4. Perbaikan copy dan positioning

Rapikan teks UI agar sesuai dengan revisi narasi:

* tidak overclaim
* tidak terkesan “AI pintar”
* tidak memberi kesan sistem menggantikan mekanisme adat
* tetap menonjolkan:

  * bukti geospasial
  * verifikasi Pekaseh
  * tracking proses

### 5. Kesiapan KPI proses

Jika memungkinkan, tampilkan data proses yang sederhana dan realistis, misalnya:

* jumlah laporan terverifikasi
* laporan yang selesai
* laporan yang menunggu tindak lanjut
* laporan dengan bukti lengkap

## Hal yang harus diturunkan / jangan dipaksakan

* jangan menjual visualisasi dampak hilir sebagai prediksi
* jika ada elemen itu, posisikan hanya sebagai indikasi visual sederhana atau roadmap
* jangan membuat gimmick spasial yang tidak ditopang data

## Batasan Tahap 3

Jangan masuk ke:

* implementasi full offline
* OTP / auth baru
* object storage penuh
* PostGIS / line geometry kompleks
* fitur AI/ML

## Output Tahap 3

Saya ingin hasil akhir berupa:

1. dashboard dan halaman laporan yang lebih kuat secara urgency
2. closed-loop evidence terlihat jelas di UI
3. copywriting produk lebih defensible
4. presentasi sistem lebih siap untuk dinilai juri
5. ringkasan file yang diubah
6. test/build tetap aman

---

# Hal yang Wajib Dijaga Selama Semua Tahap

1. Tetap dalam scope MVP
2. Jangan ubah arsitektur inti tanpa alasan kuat
3. Jangan menambah fitur besar yang belum defensible
4. Jika ada fitur yang terlalu lemah secara argumen, turunkan klaimnya
5. Sinkronkan hasil revisi dengan dokumen di `docs/` dan `docs/mermaid/`
6. Jika implementasi membuat dokumen lama tidak akurat, beri tahu bagian mana yang harus ikut direvisi

---

# Checklist Evaluasi Setelah Setiap Tahap

Setelah menyelesaikan tiap tahap, lakukan evaluasi:

1. Apakah revisi ini benar-benar menutup kritik juri?
2. Apakah sistem menjadi lebih realistis?
3. Apakah scope tetap terjaga?
4. Apakah implementasi masih sesuai dengan MVP?
5. Apakah ada dokumen di `docs/` yang sekarang perlu diperbarui?

---

# Ringkasan Akhir

Lakukan revisi sistem E-Matelik dalam **3 tahap**:

1. **Tahap 1:** struktur data dan backend inti
2. **Tahap 2:** flow, privasi, dan verifikasi
3. **Tahap 3:** frontend, UX, dan kesiapan presentasi

Kerjakan bertahap, jangan lompat-lompat, dan laporkan hasil tiap tahap sebelum masuk ke tahap berikutnya.
