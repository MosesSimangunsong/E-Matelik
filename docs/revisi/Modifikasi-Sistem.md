# Ringkasan Modifikasi Sistem E-Matelik untuk Juri

## Tujuan Modifikasi

Modifikasi sistem E-Matelik dilakukan untuk menjawab kritik utama juri terhadap versi awal, yaitu:

* bukti laporan yang masih lemah,
* alur verifikasi yang belum cukup sensitif budaya,
* risiko laporan palsu,
* perlindungan identitas pelapor,
* dan tampilan sistem yang belum cukup kuat menunjukkan urgensi.

Dengan kata lain, revisi ini bukan sekadar mempercantik sistem, tetapi **membuat E-Matelik lebih realistis, lebih defensible, dan lebih siap dipresentasikan sebagai MVP yang serius**.

---

## 1. Modifikasi Tahap 1 — Penguatan Struktur Data dan Bukti Laporan

Pada tahap pertama, kami memperkuat fondasi backend agar sistem tidak hanya bisa menerima laporan, tetapi juga memiliki **jejak bukti yang lebih rapi dan lebih dapat dipertanggungjawabkan**.

### Perubahan yang dilakukan

* Menambahkan konsep **closed-loop evidence**, sehingga laporan tidak berhenti pada bukti awal saja, tetapi juga dapat memiliki **bukti penyelesaian**.
* Menambahkan data penyelesaian seperti:

  * `resolved_by`
  * `resolved_at`
  * `resolution_note`
* Menambahkan penguatan metadata foto, seperti:

  * `photo_role` untuk membedakan bukti awal dan bukti penyelesaian
  * `file_hash` untuk memperkuat integritas file
  * `captured_from` untuk menandai sumber file, misalnya kamera atau galeri
* Memperkuat histori laporan agar tindakan seperti:

  * dibuat
  * diverifikasi
  * dieskalasi
  * selesai
  * selesai internal
    semua tercatat secara jelas.

### Dampaknya

Dengan revisi ini, E-Matelik tidak lagi hanya menunjukkan bahwa “laporan masuk”, tetapi juga mulai membangun **siklus pelaporan tertutup**, di mana penyelesaian harus memiliki jejak administratif dan bukti pendukung.

---

## 2. Modifikasi Tahap 2 — Perbaikan Flow, Privasi, dan Sensitivitas Budaya

Pada tahap kedua, kami merevisi flow sistem agar lebih aman, lebih realistis, dan lebih sesuai dengan konteks sosial Subak.

### Perubahan yang dilakukan

* Menambahkan **pengaturan visibilitas identitas pelapor berbasis role**, sehingga:

  * Pekaseh dan admin internal dapat melihat identitas lengkap,
  * sedangkan tampilan yang lebih luas hanya menerima identitas yang disamarkan atau label seperti *pelapor terverifikasi*.
* Menegaskan bahwa laporan dalam sistem adalah **sinyal awal yang akan diverifikasi**, bukan kebenaran final.
* Menambahkan **rate limiting ringan** untuk menekan spam atau laporan berulang yang tidak wajar.
* Memperhalus flow verifikasi Pekaseh agar:

  * tetap sederhana,
  * tidak terlalu teknis,
  * dan tetap sesuai perannya sebagai verifikator awal.
* Mengubah narasi eskalasi menjadi **eskalasi administratif lanjutan**, bukan bypass otomatis ke pemerintah.
* Menambahkan indikator **backlog overdue** untuk laporan yang terlalu lama belum diverifikasi, sehingga risiko bottleneck Pekaseh mulai dimitigasi.

### Dampaknya

Dengan revisi ini, sistem menjadi:

* lebih aman bagi pelapor,
* lebih sensitif terhadap tata kelola Subak,
* dan lebih kuat terhadap kritik bahwa sistem digital bisa memotong mekanisme adat atau disalahgunakan untuk konflik personal.

---

## 3. Modifikasi Tahap 3 — Penguatan UI, Urgensi, dan Kesiapan Presentasi

Pada tahap ketiga, kami memperbaiki frontend dan pengalaman pengguna agar sistem lebih siap dipresentasikan ke juri, tanpa meninggalkan identitas visual E-Matelik yang ramah lingkungan dan membumi.

### Perubahan yang dilakukan

* Menambahkan **urgency layer** pada UI, seperti:

  * badge prioritas,
  * warna status yang lebih tegas,
  * marker peta berdasarkan prioritas,
  * dan panel laporan yang lebih mendesak.
* Menampilkan **closed-loop evidence** secara lebih jelas di frontend, sehingga pengguna dapat melihat:

  * bukti awal,
  * bukti penyelesaian,
  * catatan penyelesaian,
  * dan histori proses.
* Memperkuat copywriting sistem agar lebih defensible, misalnya:

  * menegaskan bahwa status dalam sistem adalah **status administratif**,
  * bukan keputusan sosial final.
* Menambahkan **KPI proses sederhana** yang lebih realistis untuk konteks pilot, seperti:

  * jumlah laporan selesai,
  * laporan dengan bukti lengkap,
  * backlog verifikasi,
  * dan laporan yang masih menunggu tindak lanjut.

### Dampaknya

Dengan revisi ini, E-Matelik tidak hanya lebih enak dilihat, tetapi juga:

* lebih kuat secara argumentasi,
* lebih jelas menunjukkan mana laporan kritis,
* dan lebih siap dipertanggungjawabkan di hadapan juri.

---

## 4. Keputusan Penting yang Kami Ambil Selama Revisi

Selama proses revisi, kami juga sengaja mengambil beberapa keputusan penting agar sistem tetap realistis dan tidak overclaim.

### A. Tidak mengklaim bukti hukum final

Kami tidak menyebut E-Matelik sebagai alat pembuktian hukum final.
Posisinya adalah **penguat bukti administratif awal** melalui:

* foto,
* lokasi,
* timestamp server,
* identitas akun,
* dan histori digital.

### B. Tidak mengklaim menggantikan mekanisme adat

E-Matelik diposisikan sebagai:

* alat bantu dokumentasi,
* alat bantu verifikasi,
* alat bantu koordinasi,
* dan alat bantu tracking,

bukan pengganti:

* paruman,
* awig-awig,
* atau keputusan adat.

### C. Tidak mengklaim visualisasi hidrologi canggih

Kami sengaja menahan diri untuk tidak menjual fitur seperti prediksi hilir atau simulasi spasial berat jika datanya belum memadai di level MVP.

### D. Tidak mengklaim adopsi institusional penuh

Dashboard admin dan flow administratif diposisikan sebagai:

* simulasi proses koordinasi yang lebih baik,
* bukan klaim bahwa pemerintah pasti langsung memakai sistem ini sebagai SOP resmi.

---

## 5. Hasil Akhir dari Revisi

Setelah tiga tahap modifikasi, E-Matelik berubah dari:

* sekadar sistem pelaporan berbasis peta,

menjadi:

* sistem pelaporan yang lebih lengkap,
* punya jejak verifikasi,
* punya bukti penyelesaian,
* lebih aman untuk pelapor,
* lebih sensitif budaya,
* dan lebih siap dievaluasi sebagai MVP berbasis masalah nyata.

---

## 6. Kesimpulan untuk Juri

Modifikasi yang kami lakukan menunjukkan bahwa E-Matelik tidak dikembangkan sebagai ide yang “asal digital”, tetapi sebagai sistem yang terus disempurnakan agar:

* lebih realistis,
* lebih jujur dalam klaim,
* lebih kuat dalam dokumentasi,
* lebih sensitif terhadap konteks Subak,
* dan lebih layak diuji sebagai inovasi teknologi berbasis kebutuhan lapangan.

Dengan revisi ini, kami tidak mengklaim E-Matelik sebagai solusi sempurna, tetapi sebagai **MVP yang lebih matang, lebih terarah, dan lebih siap untuk dikembangkan sebagai pilot nyata**.
