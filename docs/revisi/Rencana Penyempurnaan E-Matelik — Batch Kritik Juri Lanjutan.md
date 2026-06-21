# Rencana Penyempurnaan E-Matelik — Batch Kritik Juri Lanjutan

## Tujuan

Dokumen ini dipakai untuk menyempurnakan:

1. **tesis dan logika esai**
2. **arsitektur sistem**
3. **batas klaim teknologi**
4. **kelayakan implementasi**
5. **sustainability plan**

Prinsipnya:

* kita tidak mengejar sempurna,
* kita hanya memperbaiki titik yang paling mudah diserang juri,
* dan kita mengubah E-Matelik dari ide yang “bagus” menjadi ide yang **lebih tahan kritik**.

---

# 1. Lompatan Logika: “E-Matelik hanya mengobati gejala, bukan penyakit”

## Kritik Juri

Ancaman utama Subak adalah:

* alih fungsi lahan,
* komersialisasi,
* tekanan pariwisata.

Sementara E-Matelik tampak hanya menangani:

* sumbatan,
* tumpukan material,
* kerusakan fisik telabah.

## Kelemahan yang Terlihat

Kalau tidak dirapikan, esai akan terlihat seperti:

> masalah makro → solusi mikro yang tidak sebanding

## Keputusan Perbaikan

### A. Ubah tesis esai

Jangan posisikan E-Matelik sebagai:

> solusi utama untuk menghentikan alih fungsi lahan

Posisikan E-Matelik sebagai:

> **instrumen perlindungan operasional Subak di level infrastruktur dan pembuktian**, yang memperkuat daya tahan ekosistem Subak di tengah ancaman makro seperti alih fungsi lahan dan pembangunan.

### B. Narasi yang lebih tepat

E-Matelik **tidak mengobati seluruh penyakit**, tetapi:

* memperlambat kerusakan,
* meningkatkan kapasitas dokumentasi,
* meningkatkan peluang intervensi lebih cepat,
* dan menaikkan “biaya sosial-administratif” bagi pelanggaran telabah.

### C. Kalimat posisi yang lebih kuat

Gunakan narasi seperti:

> E-Matelik bukan solusi tunggal atas alih fungsi lahan, tetapi alat strategis untuk melindungi organ vital Subak—jaringan irigasinya—agar kerusakan di tingkat operasional tidak dibiarkan tanpa bukti dan tanpa respons.

### D. Dampak ke esai

Bagian masalah harus dibelah menjadi:

1. **masalah makro**: alih fungsi lahan, tekanan pariwisata, konflik tata ruang
2. **gap operasional**: kerusakan telabah sering terlambat didokumentasikan dan lemah bukti
3. **solusi yang diambil**: E-Matelik fokus pada gap operasional itu

---

# 2. Kekuatan Bukti Hukum: Metadata belum immutable

## Kritik Juri

Kalau foto dan koordinat bisa dimanipulasi, maka sistem tidak punya kekuatan pembuktian kuat.

## Kelemahan yang Terlihat

Kalau kita terlalu percaya diri, juri bisa bilang:

> “Ini hanya foto dan lokasi biasa, tidak cukup untuk chain of custody.”

## Keputusan Perbaikan

### A. Turunkan klaim

Jangan klaim:

* “E-Matelik menghasilkan bukti hukum yang final”
* “E-Matelik setara alat forensik sah pengadilan”

Gunakan klaim yang lebih aman:

* **E-Matelik memperkuat paket bukti administratif awal**
* **E-Matelik menghasilkan dokumentasi digital yang lebih siap diverifikasi**
* **E-Matelik meningkatkan kualitas bukti dibanding laporan verbal biasa**

### B. Penyempurnaan sistem

Tambahkan atau rencanakan fitur berikut:

* server-side timestamp
* penyimpanan hash file foto
* audit trail histori
* identitas pelapor
* foto multi-angle
* catatan verifikasi Pekaseh
* metadata lokasi tersimpan saat laporan dibuat

### C. Posisi yang aman di esai

Tulis bahwa:

> E-Matelik tidak menggantikan proses pembuktian hukum formal, tetapi meningkatkan kualitas dokumentasi awal agar laporan lebih sulit diabaikan oleh pihak yang berwenang.

### D. Implikasi sistem

Di roadmap teknis, tambahkan backlog:

* hash bukti file
* immutable audit log ringan
* export bukti terstruktur untuk eskalasi

---

# 3. KPI Masih Naif: “user bisa lapor” bukan impact metric

## Kritik Juri

KPI saat ini terlalu teknis dan terlalu “mahasiswa”.

## Kelemahan yang Terlihat

Sistem terlihat sukses hanya karena:

* form jalan,
* marker muncul,
* laporan tersimpan.

Padahal juri ingin:

* efek,
* outcome,
* dampak.

## Keputusan Perbaikan

### A. Pisahkan KPI menjadi 3 level

#### 1. KPI Produk

* persentase laporan berhasil dikirim
* persentase laporan dengan bukti lengkap
* waktu rata-rata input laporan

#### 2. KPI Proses

* waktu dari laporan masuk ke verifikasi Pekaseh
* waktu dari verifikasi ke eskalasi
* persentase laporan yang memiliki histori lengkap

#### 3. KPI Outcome

* penurunan waktu respons penanganan
* peningkatan kualitas dokumentasi kasus
* peningkatan jumlah laporan yang bisa ditindaklanjuti
* pemetaan hotspot gangguan berulang

### B. Jangan mengklaim baseline palsu

Kalau belum ada data X hari menjadi Y hari, jangan mengada-ada.

Gunakan posisi:

> baseline empiris penuh belum tersedia karena salah satu masalah utama adalah belum adanya pencatatan terstruktur. Oleh karena itu, E-Matelik juga dirancang sebagai alat untuk membentuk baseline tersebut pada fase pilot.

### C. Perbaikan esai

Tambahkan bagian:

* **indikator evaluasi pilot E-Matelik**
* bukan langsung “dampak nasional”

---

# 4. Representasi Geospasial Salah Kaprah: Telabah itu garis, bukan titik

## Kritik Juri

Ini kritik yang sangat valid.

## Kelemahan yang Terlihat

Saat ini `reports` hanya menyimpan:

* latitude
* longitude

Padahal kerusakan telabah bisa memanjang.

## Keputusan Perbaikan

### A. Jangan membantah kritik ini

Akui bahwa:

* secara geospasial penuh, kerusakan saluran memang idealnya dapat direpresentasikan sebagai **line/segment**
* sedangkan MVP saat ini masih memakai **point-based incident anchor**

### B. Posisi yang aman

Gunakan narasi:

> Pada MVP, titik koordinat dipakai sebagai anchor lokasi insiden untuk mempercepat pelaporan. Pada pengembangan lanjutan, representasi geometri dapat diperluas menjadi line segment atau polyline agar sesuai dengan karakter telabah sebagai objek linear.

### C. Penyempurnaan sistem

Tambahkan roadmap arsitektur:

* kolom `geometry_type` atau `segment_type`
* panjang area terdampak (mis. `affected_length_m`)
* atau pengembangan ke PostGIS / GeoJSON line layer

### D. Implikasi esai

Jangan bilang sistem ini sudah “spatially complete”.
Katakan bahwa:

* MVP memakai point untuk kesederhanaan input,
* pengembangan lanjut diarahkan ke linear asset reporting.

---

# 5. Risiko Data Poisoning / Laporan Palsu

## Kritik Juri

User pelapor bisa menyalahgunakan sistem untuk konflik personal.

## Kelemahan yang Terlihat

Sistem bisa terlihat terlalu terbuka.

## Keputusan Perbaikan

### A. Tegaskan bahwa E-Matelik bukan open public reporting

Pelapor tidak boleh dibingkai sebagai:

* siapa saja di internet

Pelapor harus dibingkai sebagai:

* pengguna terdaftar
* terhubung ke Subak tertentu
* ada jalur verifikasi berlapis

### B. Mekanisme mitigasi yang harus disebut

Tambahkan ke narasi sistem:

* akun terautentikasi
* role pelapor terbatas
* keterikatan user ke Subak
* verifikasi awal oleh Pekaseh
* histori laporan
* rate limiting / anti-spam (sebagai roadmap atau implementasi lanjutan)
* pengelompokan laporan duplikat
* catatan klarifikasi jika laporan diragukan

### C. Narasi esai yang lebih kuat

> E-Matelik tidak memperlakukan semua laporan sebagai kebenaran final, tetapi sebagai sinyal awal yang harus diverifikasi secara berlapis.

---

# 6. Penyimpanan File Lokal Terlalu Lemah untuk Skala Besar

## Kritik Juri

Kalau skala kabupaten/provinsi, local disk VPS tidak cukup.

## Kelemahan yang Terlihat

Arsitektur sekarang cocok untuk MVP, tetapi kalau diklaim skalabel besar, itu lemah.

## Keputusan Perbaikan

### A. Bedakan arsitektur MVP dan arsitektur produksi

MVP:

* boleh memakai local/public disk
* karena sederhana dan cepat dibangun

Produksi/skala lebih besar:

* harus diarahkan ke object storage
* misalnya S3-compatible storage

### B. Narasi aman di esai

> Pada tahap MVP, penyimpanan lokal digunakan untuk efisiensi pengembangan. Namun, arsitektur file E-Matelik dirancang agar dapat dimigrasikan ke object storage pada fase implementasi lebih luas.

### C. Implikasi sistem

Kalau memungkinkan, sejak sekarang abstraction storage tetap dipertahankan melalui filesystem driver, agar nanti migrasi lebih mudah.

---

# 7. “Triase Prioritas” Terlalu Biasa

## Kritik Juri

Kalau hanya IF-ELSE, itu bukan kecerdasan istimewa.

## Kelemahan yang Terlihat

Triase rawan overclaim.

## Keputusan Perbaikan

### A. Hentikan bahasa “cerdas” jika implementasi belum mendukung

Jangan sebut:

* AI triage
* intelligent prioritization
* smart prioritization

Kalau faktanya masih rule-based sederhana.

### B. Ubah novelty

Novelty utama **bukan** pada triase.
Novelty utama ada pada:

* domain-specific WebGIS
* bukti geospasial untuk Subak
* verifikasi Pekaseh
* tracking lintas peran
* positioning budaya yang tepat

### C. Posisi triase yang lebih aman

Triase ditulis sebagai:

* **modul prioritisasi berbasis aturan**
* transparan
* auditabel
* dan dapat dikembangkan lebih lanjut

### D. Jika ingin diperkuat

Triase bisa ditingkatkan dari IF-ELSE biasa menjadi:

* rule engine berbobot
* misalnya skor berdasarkan:

  * kategori
  * lokasi
  * kedekatan ke saluran utama
  * kelengkapan bukti
  * pengulangan kasus di titik yang sama

Tetapi tetap jangan dijual sebagai AI.

---

# 8. Bottleneck Otoritas: Pekaseh jadi single point of failure

## Kritik Juri

Jika Pekaseh sibuk, semua laporan macet.

## Kelemahan yang Terlihat

Flow verifikasi terlalu sentralistis.

## Keputusan Perbaikan

### A. Tambahkan mekanisme delegasi

Dalam desain proses, tambahkan:

* Kelihan Tempek sebagai penyaring/backup awal
* admin/sekretaris lokal sebagai pendamping teknis
* fallback eskalasi jika tidak ada respons dalam rentang tertentu

### B. Tambahkan SLA sederhana

Misalnya:

* jika laporan tidak diverifikasi dalam 24–48 jam, sistem menandai sebagai pending critical
* atau dapat diteruskan ke level berikutnya sesuai aturan lokal

### C. Narasi esai

Tulis bahwa:

> Pekaseh tetap menjadi verifikator utama, namun E-Matelik dapat dirancang dengan mekanisme delegasi dan pengingat untuk mencegah bottleneck otoritas.

### D. Implikasi sistem

Belum harus langsung dibuat kompleks di MVP, tapi minimal:

* backlog fitur delegasi
* atau rule proses cadangan
  harus sudah disebut.

---

# 9. Ketiadaan Insentif Pengguna

## Kritik Juri

Mengapa petani harus repot login, foto, isi form?

## Kelemahan yang Terlihat

Flow pelapor bisa dianggap terlalu berat.

## Keputusan Perbaikan

### A. Ubah asumsi pengguna

Jangan asumsi:

* semua petani akan aktif mengisi sistem satu per satu

Gunakan asumsi yang lebih realistis:

* pelapor utama bisa:

  * krama yang lebih digital-ready
  * Kelihan Tempek
  * anggota muda
  * atau perwakilan kelompok

### B. Ringankan friksi sistem

Esai harus menyebut bahwa sistem dirancang untuk:

* input singkat
* kategori sederhana
* lokasi otomatis lewat peta
* foto minimum
* tidak banyak field panjang

### C. Insentif utama bukan hadiah, tetapi manfaat praktis

Insentifnya adalah:

* laporan punya jejak
* bukti tidak hilang
* status bisa dipantau
* lebih kuat dibanding teriakan lisan yang mudah lupa
* bisa dipakai sebagai arsip saat sengketa berulang

### D. Posisi yang lebih aman

> E-Matelik tidak mengasumsikan seluruh petani akan menjadi pengguna aktif harian, tetapi menyediakan kanal digital minimum bagi aktor lapangan yang mampu dan bersedia mendokumentasikan masalah secara lebih kuat.

---

# 10. Sustainability Pasca-Lomba

## Kritik Juri

Siapa yang akan membayar server, domain, dan operasional?

## Kelemahan yang Terlihat

Kalau dijawab “pemerintah nanti”, itu terdengar lemah.

## Keputusan Perbaikan

### A. Bagi sustainability menjadi 3 fase

#### Fase 1 — Pilot Akademik

* berjalan sebagai prototype / pilot terbatas
* biaya rendah
* dikelola oleh tim pengembang / kampus

#### Fase 2 — Kemitraan Lokal

* kerja sama dengan Subak tertentu, desa adat, atau komunitas lokal
* validasi kebutuhan lapangan

#### Fase 3 — Institusionalisasi

* baru setelah terbukti berguna, sistem bisa:

  * diadopsi pemerintah daerah
  * diintegrasikan ke program pelestarian
  * atau dijalankan melalui mitra lokal

### B. Hindari jawaban naif

Jangan bilang:

* “pemerintah pasti akan biayai”

Gunakan posisi:

> E-Matelik pada tahap lomba diposisikan sebagai pilot akademik yang membuktikan nilai, bukan langsung sebagai sistem produksi skala penuh.

### C. Perbaikan sistem

Secara arsitektur, buat sistem:

* modular
* ringan
* murah di-host
* mudah diporting

### D. Perbaikan esai

Masukkan subbagian:

* **strategi keberlanjutan dan adopsi bertahap**

---

# 11. Prioritas Perbaikan Paling Penting

## Prioritas 1 — Wajib dirapikan sebelum esai ditulis

1. posisi E-Matelik terhadap alih fungsi lahan
2. status bukti: administratif awal, bukan bukti hukum final
3. KPI pilot yang lebih matang
4. penjelasan point vs line dalam WebGIS
5. novelty utama bukan triase, tetapi domain-specific geospatial governance

## Prioritas 2 — Harus disebut walau belum semua diimplementasikan

1. mitigasi laporan palsu
2. delegasi jika Pekaseh bottleneck
3. low-friction reporting
4. object storage sebagai roadmap produksi
5. sustainability plan bertahap

## Prioritas 3 — Bisa jadi roadmap lanjutan

1. line-based geometry
2. weighted triage engine
3. offline draft / low bandwidth mode
4. export dossier bukti
5. integrasi storage skala besar

---

# 12. Kesimpulan Akhir

Batch kritik juri ini menunjukkan bahwa E-Matelik sudah cukup kuat untuk dianggap serius, tetapi agar esai dan sistemnya lebih tahan serangan, kita harus:

* memperbaiki **lompatan logika antara masalah makro dan solusi mikro**
* menurunkan klaim hukum dan teknis yang terlalu tinggi
* memperjelas bahwa E-Matelik adalah **pilot yang realistis**
* memperkuat novelty pada **domain-specific spatial governance**
* dan menambahkan narasi keberlanjutan serta mitigasi risiko implementasi

Jadi arah kita sekarang bukan membuat E-Matelik terlihat sempurna, tetapi membuatnya:

* lebih jujur,
* lebih tajam,
* lebih strategis,
* dan lebih layak dipercaya oleh juri.
