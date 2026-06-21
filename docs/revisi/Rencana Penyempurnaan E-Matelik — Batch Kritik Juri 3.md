# Rencana Penyempurnaan E-Matelik — Batch Kritik Juri 3

## Tujuan

Dokumen ini dipakai untuk menyempurnakan:

1. **argumen esai**
2. **arsitektur sistem**
3. **desain produk**
4. **alur verifikasi dan privasi**
5. **batas klaim MVP**

Prinsipnya:

* kita tidak mengejar sistem yang sempurna,
* kita menutup titik-titik yang paling rawan diserang,
* dan kita membuat E-Matelik lebih jujur, lebih kuat, dan lebih konsisten.

---

# 1. Manipulasi Bukti di Web App

## Kritik Juri

Karena E-Matelik adalah web app, pelapor bisa mengunggah foto dari galeri atau file manager. Itu berarti:

* foto bisa lama,
* foto bisa palsu,
* metadata Exif bisa hilang,
* GPS dan waktu kejadian tidak dapat dijamin asli.

## Kelemahan yang Terlihat

Jika tidak dirapikan, sistem bisa terlihat seolah-olah menjanjikan “bukti kuat”, padahal yang dimiliki baru:

* foto digital biasa,
* koordinat yang diinput saat pelaporan,
* timestamp server saat upload.

## Keputusan Perbaikan

### A. Turunkan klaim pembuktian

Jangan klaim:

* sistem menjamin keaslian absolut kejadian
* sistem menghasilkan bukti forensik final

Gunakan posisi yang lebih aman:

> E-Matelik menghasilkan **bukti administratif awal yang lebih kuat** daripada laporan verbal, dengan kombinasi foto, lokasi, timestamp server, identitas akun, dan jejak histori.

### B. Pisahkan tiga jenis waktu/lokasi

Sistem dan esai harus membedakan:

1. **waktu upload ke server**
2. **lokasi pelaporan saat submit**
3. **waktu/lokasi asli pengambilan foto** *(yang belum bisa dijamin penuh pada MVP web app)*

### C. Perbaikan sistem

Tambahkan atau rencanakan:

* server-side timestamp wajib
* hash file foto saat upload
* simpan `captured_from` sederhana:

  * `camera`
  * `gallery`
* tampilkan status bukti:

  * “dokumen lapangan awal”
  * bukan “bukti final”

### D. Narasi esai yang lebih kuat

> Pada fase MVP berbasis web, E-Matelik belum mengklaim otentikasi forensik penuh atas foto, tetapi memperkuat kualitas bukti awal melalui kombinasi akun terautentikasi, lokasi pelaporan, waktu unggah server, dokumentasi visual, dan histori tindakan yang terdigitalisasi.

### E. Backlog lanjutan

* capture langsung dari kamera
* watermark sistem
* file hashing lebih formal
* signed upload metadata
* chain-of-custody lebih kuat di versi lanjutan

---

# 2. Tidak Ada Bukti Penyelesaian

## Kritik Juri

Jika admin mengubah status menjadi “Selesai”, apa buktinya?
Kalau tidak ada foto after atau catatan penyelesaian, maka transparansi berhenti di tengah.

## Kelemahan yang Terlihat

Saat ini sistem baru kuat di:

* pelaporan awal
* foto before
* histori awal

Tetapi belum kuat di:

* bukti penyelesaian
* before-after documentation
* closed-loop transparency

## Keputusan Perbaikan

### A. Ini harus dianggap celah nyata

Jangan dibela. Ini memang perlu diperbaiki.

### B. Perbaikan arsitektur

Ada dua opsi:

1. **tambah tabel baru** misalnya `report_resolution_photos`
2. **lebih hemat untuk MVP**: perluas `report_photos` dengan field tipe foto:

   * `initial_evidence`
   * `resolution_evidence`

Untuk MVP, opsi kedua lebih praktis.

### C. Tambah elemen data

Minimal saat status berubah ke `Selesai`, sistem sebaiknya punya:

* `resolution_note`
* `resolved_by`
* `resolved_at`
* minimal satu foto penyelesaian

### D. Perbaikan narasi esai

Masukkan bahwa transparansi E-Matelik bukan hanya:

* laporan masuk,
  tetapi juga:
* **jejak penyelesaian**

### E. Posisi yang lebih kuat

> E-Matelik tidak hanya mendokumentasikan masalah, tetapi diarahkan untuk membangun siklus pelaporan tertutup (closed-loop reporting), di mana klaim penyelesaian harus disertai catatan dan bukti pendukung.

---

# 3. Ilusi Visualisasi Dampak Hilir

## Kritik Juri

Tanpa topologi jaringan, flow direction, node-edge, atau DEM, sistem tidak bisa benar-benar memprediksi hilir terdampak.

## Kelemahan yang Terlihat

Kalau kita tetap menjual “visualisasi dampak hilir” terlalu keras, juri IT akan menganggap itu gimmick.

## Keputusan Perbaikan

### A. Turunkan klaim

Jangan pakai bahasa:

* prediksi hilir
* simulasi dampak
* estimasi hidrologi

Kalau backend belum mendukung.

### B. Ubah posisi fitur

Pada MVP, ubah fitur ini menjadi:

> **indikasi visual area/jalur yang berpotensi terdampak berdasarkan kedekatan spasial atau segment yang diketahui**, bukan simulasi hidrologi penuh.

### C. Perbaikan dokumen

Dalam PRD, ganti istilah:

* dari **Visualisasi Dampak Hilir**
* menjadi **Highlight Jalur/Area Potensi Terdampak**

### D. Perbaikan esai

Tulis bahwa:

* fitur ini masih eksploratif
* hanya bersifat pendukung visual
* bukan mesin analisis hidrologi

### E. Keputusan teknis

Kalau belum siap, lebih aman:

* turunkan dari “fitur penting presentasi”
* menjadi “roadmap lanjutan”

---

# 4. Onboarding Krama Subak: Email dan Password Tidak Realistis

## Kritik Juri

Banyak krama Subak tidak aktif memakai email. Jika registrasi dibuka bebas, muncul risiko troll. Jika admin yang input semua, bebannya besar.

## Kelemahan yang Terlihat

Saat ini sistem terlalu dekat dengan pola aplikasi digital urban.

## Keputusan Perbaikan

### A. Ubah asumsi onboarding

Jangan asumsikan:

* semua pengguna daftar mandiri dengan email

### B. Posisi yang lebih realistis

Untuk MVP, sistem bisa diposisikan sebagai:

* digunakan lebih dulu oleh aktor yang lebih siap digital:

  * Kelihan Tempek
  * krama muda
  * operator lokal
  * perwakilan kelompok
* bukan seluruh petani sekaligus

### C. Perbaikan sistem

Beberapa opsi yang lebih realistis:

1. login tetap berbasis email untuk MVP teknis
2. tetapi secara konsep produk, roadmap diarahkan ke:

   * nomor HP / OTP
   * akun dibuat oleh admin lokal terbatas
   * undangan akun berbasis Subak

### D. Perbaikan esai

Tulis bahwa:

> E-Matelik tidak diasumsikan langsung dipakai oleh seluruh krama subak, melainkan dimulai melalui pengguna perwakilan yang lebih siap digital dalam satuan Subak tertentu.

### E. Implikasi implementasi

Untuk sekarang, **tidak perlu ubah auth dulu** jika itu mengganggu scope MVP.
Tapi ini harus diakui sebagai keterbatasan pilot.

---

# 5. Kontradiksi Design System vs Urgensi

## Kritik Juri

Kalau desain terlalu “tenang”, dashboard insiden bisa terasa kurang mendesak.

## Kelemahan yang Terlihat

Sistem punya identitas natural yang bagus, tetapi perlu lapisan urgency yang lebih tegas.

## Keputusan Perbaikan

### A. Pertahankan identitas utama

Nuansa:

* sawah
* air
* lingkungan
  tetap dipertahankan.

### B. Tambahkan lapisan operasional

Yang harus diperkuat:

* badge prioritas
* warna status kritis
* panel laporan mendesak
* kartu alert
* marker merah/oranye untuk kasus prioritas tinggi

### C. Prinsip desain baru

> **Calm by identity, urgent by operational signal**

### D. Perbaikan sistem

Di dashboard, laporan darurat harus:

* muncul paling atas
* punya warna lebih tegas
* punya label visual jelas
* tidak tenggelam dalam estetika natural

### E. Perbaikan esai

Jelaskan bahwa:

* identitas visual sistem tetap tenang agar ramah komunitas
* tetapi sistem operasional tetap menonjolkan urgensi melalui status, prioritas, dan alert state

---

# 6. Perlindungan Whistleblower / Privasi Pelapor

## Kritik Juri

Kalau nama pelapor terlalu terbuka, pelapor bisa rentan. Kalau anonim penuh, verifikasi jadi sulit.

## Kelemahan yang Terlihat

Ini celah sosial yang penting dan tidak bisa diabaikan.

## Keputusan Perbaikan

### A. Jangan pakai model “semua orang lihat semua identitas”

Identitas pelapor harus dibatasi berdasarkan role.

### B. Model akses yang lebih aman

* **Pekaseh** boleh melihat identitas pelapor
* **admin internal sistem** boleh melihat bila relevan
* **instansi/viewer umum** tidak harus melihat identitas lengkap
* tampilan eksternal cukup menampilkan:

  * “Pelapor terverifikasi”
  * atau identitas tersamarkan

### C. Narasi produk yang lebih kuat

> E-Matelik tidak dirancang sebagai sistem pelaporan anonim penuh, tetapi sebagai sistem pelaporan terbatas dengan kontrol visibilitas identitas berdasarkan kewenangan.

### D. Perbaikan sistem

Tambahkan konsep:

* `reporter_visibility_scope`
* atau minimal aturan role-based display di UI

### E. Perbaikan esai

Masukkan bahwa sistem:

* menjaga keterlacakan internal
* tetapi membatasi eksposur identitas secara publik

---

# 7. Risiko Bypass Hierarki Adat

## Kritik Juri

Jika laporan langsung dilempar ke birokrasi pemerintah, E-Matelik bisa dianggap memotong jalur adat.

## Kelemahan yang Terlihat

Ini kritik yang sangat sensitif budaya.

## Keputusan Perbaikan

### A. Tegaskan ulang posisi eskalasi

Eskalasi **bukan jalur otomatis ke pemerintah**.

Eskalasi harus dibingkai sebagai:

* tahap administratif lanjutan
* dilakukan setelah verifikasi lokal
* menghormati struktur kelembagaan internal terlebih dahulu

### B. Perbaikan flow

Dalam narasi sistem, ubah:

* dari “langsung ke instansi”
* menjadi “siap untuk dibawa ke tahapan koordinasi lanjutan sesuai konteks kelembagaan”

### C. Tambahkan opsi eskalasi berjenjang

Secara konsep, eskalasi bisa dibagi:

1. internal Subak
2. koordinasi kelembagaan adat/lokal
3. eskalasi administratif formal

### D. Perbaikan esai

> E-Matelik tidak dirancang untuk memotong hierarki adat, tetapi untuk memperkuat dokumentasi pada setiap tahap eskalasi, baik internal maupun administratif.

### E. Catatan implementasi

Di MVP, tidak perlu bangun seluruh jalur kelembagaan kompleks, tetapi narasi sistem harus sudah menghormati struktur itu.

---

# 8. Premis “Digitalisasi = Transparansi” Terlalu Naif

## Kritik Juri

Kalau akar masalahnya anggaran atau konflik kepentingan, aplikasi bisa berubah menjadi kuburan laporan digital.

## Kelemahan yang Terlihat

Ini kritik paling strategis, karena menyerang asumsi dasar solusi digital.

## Keputusan Perbaikan

### A. Ubah tesis besar

Jangan menulis:

> digitalisasi otomatis membuat penanganan lebih cepat dan transparan

Gunakan tesis yang lebih matang:

> digitalisasi meningkatkan visibilitas, keterlacakan, dan kualitas dokumentasi, tetapi efektivitas penanganan tetap bergantung pada tata kelola, kewenangan, dan kemauan institusional.

### B. Repositioning E-Matelik

E-Matelik bukan:

* mesin penyelesai masalah non-teknis

E-Matelik adalah:

* **enabler tata kelola**
* **alat dokumentasi dan pressure mechanism**
* **alat untuk mengurangi invisibility dan amnesia birokrasi**

### C. Perbaikan esai

Tambahkan satu subbagian:

## Keterbatasan Solusi Digital

Jelaskan bahwa:

* aplikasi tidak menggantikan anggaran
* aplikasi tidak menghapus konflik kepentingan
* aplikasi tidak otomatis memperbaiki telabah

Tetapi:

* aplikasi membuat penundaan lebih terlihat
* aplikasi memperkuat arsip kasus
* aplikasi membantu akuntabilitas proses

### D. Perbaikan KPI

Tambahkan metrik yang lebih realistis:

* persentase laporan yang diverifikasi
* persentase laporan yang punya bukti lengkap
* rata-rata waktu dari laporan ke verifikasi
* rata-rata waktu dari verifikasi ke update tindak lanjut
* jumlah laporan yang tidak lagi “hilang”

---

# 9. Revisi Konkrit yang Perlu Dimasukkan ke Dokumen Sistem

## PRD

Perlu direvisi pada:

* posisi visualisasi dampak hilir
* closed-loop evidence
* privasi pelapor
* batas klaim triase
* batas klaim transparansi

## ERD

Perlu dipertimbangkan penambahan:

* tipe foto / photo_role (`initial`, `resolution`)
* `resolved_at`
* `resolved_by`
* `resolution_note`
* atau relasi yang setara

## User Flow

Perlu ditambah:

* alur unggah bukti penyelesaian
* alur visibilitas identitas pelapor
* alur eskalasi berjenjang secara konseptual

## Design System

Perlu dipertegas:

* visual urgency layer
* alert card
* badge kritis
* marker warna darurat

---

# 10. Prioritas Perbaikan

## Prioritas 1 — Sangat penting

1. closed-loop evidence / bukti penyelesaian
2. narasi point vs line
3. turunkan klaim visualisasi hilir
4. perjelas privasi pelapor
5. perbaiki tesis tentang transparansi digital

## Prioritas 2 — Penting

1. perjelas onboarding realistis
2. tambahkan konsep eskalasi berjenjang
3. tambahkan lapisan urgency di UI

## Prioritas 3 — Roadmap

1. integritas bukti lebih kuat
2. flow kamera langsung
3. object storage
4. arsitektur geometri linear
5. login berbasis nomor HP/OTP

---

# 11. Kesimpulan

Batch kritik ini menunjukkan bahwa E-Matelik semakin matang, tetapi untuk benar-benar kuat di depan juri, kita harus mengubah beberapa hal penting:

* dari **klaim besar** menjadi **klaim realistis**
* dari **fitur presentasi** menjadi **fitur yang benar-benar defensible**
* dari **aplikasi pelaporan biasa** menjadi **alat dokumentasi dan akuntabilitas yang sensitif budaya**

Artinya, langkah kita berikutnya bukan sekadar menambah fitur, tetapi:

* merapikan logika,
* memperjelas batas,
* dan memastikan semua klaim di esai sesuai dengan apa yang benar-benar bisa dipertanggungjawabkan.
