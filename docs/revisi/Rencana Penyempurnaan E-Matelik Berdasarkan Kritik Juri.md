# Rencana Penyempurnaan E-Matelik Berdasarkan Kritik Juri

## Tujuan

Dokumen ini digunakan untuk menyempurnakan:

1. **narasi esai**
2. **positioning sistem**
3. **batas klaim MVP**
4. **arah pengembangan fitur**

Prinsip utamanya:

* kita **tidak mengejar kesempurnaan**
* kita **mengurangi kelemahan yang paling mudah diserang juri**
* kita **membuat klaim yang kuat, realistis, dan konsisten**

---

# 1. Perbaikan atas Aspek Masalah dan Urgensi

## Kritik Juri

Juri mempertanyakan:

* seberapa sering gangguan telabah benar-benar terjadi
* apakah masalahnya cukup besar untuk membutuhkan sistem
* apa sebenarnya kegagalan utama dari pelaporan lisan

## Kelemahan yang Terlihat

Saat ini, E-Matelik masih rawan dianggap:

* terlalu besar untuk masalah yang “mungkin jarang”
* terlalu digital untuk sistem yang sebenarnya sudah punya jalur lisan

## Keputusan Perbaikan

### A. Perbaikan Narasi Esai

Di esai, jangan mengklaim:

* “gangguan telabah sangat sering terjadi setiap tahun di semua Subak”

Karena:

* kita belum punya dataset mikro tahunan yang rapi per Subak

Sebaliknya, gunakan posisi ini:

* **gangguan telabah adalah masalah berulang yang terbukti nyata**
* **sekali terjadi, dampaknya besar dan sistemik**
* **masalah utamanya bukan hanya frekuensi, tetapi keterlambatan dokumentasi dan lemahnya bukti**

### B. Narasi Baru yang Lebih Aman

Masalah utama E-Matelik bukan:

> “semua Subak selalu sering rusak”

Tetapi:

> “ketika gangguan telabah terjadi, pelaporan masih lambat, tidak berbasis bukti spasial, dan sulit ditindaklanjuti secara cepat dan terstruktur.”

### C. Perbaikan Sistem

Sistem tidak perlu mengklaim bisa menyelesaikan semua masalah irigasi.

Sistem cukup diposisikan sebagai:

* alat bantu dokumentasi,
* alat bantu pelaporan cepat,
* alat bantu bukti,
* alat bantu tracking.

---

# 2. Perbaikan atas Kesesuaian Budaya dan Adat

## Kritik Juri

Juri mempertanyakan:

* apakah Pekaseh realistis dijadikan verifikator digital
* apakah jejak digital justru bisa memicu konflik horizontal
* apakah sistem ini terlalu mengganggu musyawarah adat

## Kelemahan yang Terlihat

Saat ini, sistem rawan terlihat:

* terlalu digital untuk profil Pekaseh yang mungkin lansia
* terlalu administratif jika keputusan sistem dianggap vonis final

## Keputusan Perbaikan

### A. Perbaikan Posisi Pekaseh

Dalam esai, tegaskan bahwa:

* Pekaseh **bukan operator teknis utama**
* Pekaseh adalah **verifikator kultural**
* input awal bisa dibantu oleh:

  * krama subak
  * pelapor lapangan
  * Kelihan Tempek

### B. Perbaikan Narasi Sistem

Sistem harus dinyatakan sebagai:

* alat bantu dokumentasi
* alat bantu patroli
* alat bantu koordinasi
* **bukan pengganti paruman**
* **bukan pengganti awig-awig**
* **bukan alat untuk memutus sengketa sosial secara final**

### C. Keputusan Penting untuk Status

Keputusan **Selesai Internal** tetap diperlakukan sebagai:

* **keputusan/verdict Pekaseh**
* yang dipetakan ke status sistem **Selesai**

Tetapi makna internalnya harus tetap terekam di:

* histori laporan
* catatan verifikasi

### D. Perbaikan UI/UX

Dashboard Pekaseh harus terus dibuat:

* sederhana
* tidak terlalu teknis
* aksi utama sedikit
* tombol besar dan jelas
* tidak dipenuhi fitur rumit

---

# 3. Perbaikan atas Novelty dan Kekuatan Esai

## Kritik Juri

Juri bertanya:

* apa bedanya E-Matelik dengan SP4N-LAPOR!, Qlue, atau grup WhatsApp + share loc

## Kelemahan yang Terlihat

Kalau tidak dipertegas, E-Matelik bisa terlihat seperti:

* aplikasi pelaporan biasa dengan peta

## Keputusan Perbaikan

### A. Novelty harus dikunci menjadi 4 pembeda utama

Di esai, novelty E-Matelik harus ditulis sangat tegas:

1. **Spesifik untuk Subak**, bukan aplikasi aduan umum
2. **Punya verifikasi awal oleh Pekaseh**, bukan bypass ke birokrasi
3. **Menggunakan bukti geospasial**, bukan hanya teks dan share location
4. **Membaca konteks jaringan irigasi**, bukan sekadar marker lokasi

### B. Kalimat posisi terbaik

Gunakan narasi seperti ini:

> E-Matelik bukan sekadar aplikasi pelaporan warga, tetapi instrumen dokumentasi dan pembuktian geospasial yang dirancang khusus untuk konteks gangguan telabah pada ekosistem Subak.

### C. Perbaikan Sistem

Landing page, dashboard, dan deskripsi produk harus menonjolkan 4 pembeda ini agar juri tidak melihat produk sebagai “aduan biasa”.

---

# 4. Perbaikan atas Kelayakan Teknis

## Kritik Juri

Juri mempertanyakan:

* bagaimana sistem bekerja di area sinyal lemah
* dari mana data spasial didapat
* apakah peta ini benar-benar bermakna atau hanya marker acak

## Kelemahan yang Terlihat

Sistem rawan dianggap:

* terlalu bergantung pada internet
* terlalu bergantung pada data peta yang belum tentu ada
* terlalu besar cakupannya

## Keputusan Perbaikan

### A. Persempit Klaim Teknis

Di esai, jangan klaim:

* offline-first penuh
* cakupan seluruh Bali
* integrasi data spasial lengkap seluruh Subak

Gunakan klaim yang lebih aman:

* MVP dibangun sebagai **mobile-friendly web app ringan**
* MVP berfokus pada **studi kasus terbatas**
* MVP memanfaatkan **open data yang tersedia** dan/atau digitasi terbatas

### B. Perbaikan Scope Geografis

E-Matelik harus diposisikan sebagai:

* **MVP berbasis studi kasus**
* bukan produk yang sudah final untuk seluruh Bali

### C. Perbaikan Teknis Sistem

Pertahankan keputusan:

* koordinat disimpan di `latitude` dan `longitude`
* map picker hanya menjadi cara input yang lebih baik
* peta tetap ringan
* belum ada simulasi hidrologi

### D. Tambahan yang Bisa Masuk Backlog

Sebagai pengembangan lanjut, bukan klaim MVP:

* kompresi foto otomatis
* mode low-bandwidth lebih hemat
* dukungan draft/offline queue ringan
* layer irigasi lebih detail

---

# 5. Perbaikan atas Modul Triase Prioritas

## Kritik Juri

Juri mempertanyakan:

* siapa yang menentukan prioritas
* apakah otomatis atau manual
* apa parameternya

## Kelemahan yang Terlihat

Saat ini sistem bisa diserang kalau kita mengklaim triase canggih padahal implementasinya belum kuat.

## Keputusan Perbaikan

### A. Jangan Klaim AI

Untuk sekarang, jangan menyebut:

* AI menentukan prioritas
* machine learning menilai laporan

Gunakan posisi yang aman:

* triase bersifat **rule-based**
* transparan
* auditabel
* berbasis kategori dan konteks laporan

### B. Posisi MVP

Untuk MVP awal:

* prioritas bisa tetap sederhana
* boleh default `medium`
* atau semi-manual oleh aturan backend ringan

### C. Arah Penyempurnaan

Saat esai ditulis, jelaskan bahwa:

* modul triase pada MVP awal masih sederhana
* pengembangannya dapat diarahkan menjadi rule-based lebih rinci berdasarkan:

  * kategori gangguan
  * level saluran
  * dampak ke hilir
  * urgensi lapangan

### D. Kesimpulan

Triase tetap dipertahankan sebagai **arah produk yang logis**, tetapi jangan dibesar-besarkan melebihi implementasi nyata.

---

# 6. Perbaikan atas Hubungan dengan Instansi Pemerintah

## Kritik Juri

Juri mempertanyakan:

* kenapa instansi mau memakai dashboard pihak ketiga
* bagaimana sistem Anda masuk ke SOP mereka

## Kelemahan yang Terlihat

Kalau salah framing, E-Matelik bisa dianggap naif karena mengandaikan pemerintah langsung memakai dashboard kita.

## Keputusan Perbaikan

### A. Persempit Klaim

Jangan klaim:

* pemerintah pasti akan memakai dashboard E-Matelik
* E-Matelik langsung menjadi SOP resmi

### B. Posisi yang Lebih Aman

Di esai, nyatakan bahwa:

* E-Matelik adalah **lapisan dokumentasi dan pembuktian**
* E-Matelik membantu menghasilkan **dossier laporan yang lebih siap untuk diekskalasi**
* adopsi formal institusi adalah **tahap kolaborasi lanjutan**, bukan asumsi MVP

### C. Perbaikan Sistem

Dashboard admin pada MVP sebaiknya dibingkai sebagai:

* simulasi alur koordinasi
* model bagaimana data bisa dikelola lebih baik
* bukan klaim integrasi penuh birokrasi

---

# 7. Perbaikan atas Presentasi Visual dan UI/UX

## Kritik Juri

Juri mempertanyakan:

* apakah desain yang terlalu tenang justru mengurangi sense of urgency

## Kelemahan yang Terlihat

Design system kita bisa disalahpahami sebagai terlalu lembut untuk konteks insiden.

## Keputusan Perbaikan

### A. Posisi Desain yang Lebih Tepat

Jelaskan bahwa:

* **identitas visual** sistem memang tenang, natural, dan berbasis lingkungan
* tetapi **indikator operasional** tetap tegas dan berorientasi urgency

### B. Implementasi UI yang Harus Diperkuat

Pada sistem, harus ada penekanan visual untuk:

* badge status
* warna prioritas
* marker darurat
* alert state
* daftar laporan kritis

### C. Prinsip Akhir

Identitas produk boleh tenang, tetapi:

* laporan darurat harus tetap terasa darurat
* dashboard harus tetap memberi sense of urgency secara fungsional

---

# 8. Apa yang Harus Diubah di Esai

## Bagian yang harus diperbaiki

Sebelum menulis esai final, pastikan esai:

1. tidak mengklaim data frekuensi yang tidak dimiliki
2. tidak menjual sistem sebagai solusi total
3. tidak menggambarkan Pekaseh sebagai operator aplikasi rumit
4. tidak menyamakan status digital dengan keputusan sosial final
5. tidak mengklaim adopsi instansi sebagai sesuatu yang pasti
6. tidak membesar-besarkan AI/triase jika implementasi masih sederhana

## Hal yang justru harus ditekankan

1. masalah nyata dan berdampak tinggi
2. kelemahan dokumentasi dan bukti
3. relevansi bukti geospasial
4. verifikasi awal oleh Pekaseh
5. positioning sebagai alat bantu, bukan pengganti adat
6. MVP yang realistis dan berbasis studi kasus

---

# 9. Apa yang Harus Diubah di Sistem

## Perbaikan yang sebaiknya dilakukan

1. Tegaskan di UI bahwa status adalah **status administratif**
2. Pastikan keputusan internal Pekaseh tercatat jelas di histori
3. Perkuat tampilan urgency untuk laporan prioritas tinggi
4. Pertahankan kesederhanaan dashboard Pekaseh
5. Jaga klaim teknis tetap realistis
6. Gunakan peta sebagai alat bukti, bukan kosmetik

---

# 10. Prioritas Perbaikan Sebelum Menulis Esai

## Prioritas Tinggi

* rapikan positioning masalah
* rapikan novelty
* rapikan batas klaim MVP
* sinkronkan keputusan status/verifikasi
* tegaskan relasi sistem dengan adat

## Prioritas Menengah

* perjelas triase
* perjelas scope data spasial
* perjelas posisi dashboard admin

## Prioritas Rendah

* fitur lanjutan seperti offline queue, notifikasi, atau ekspor dokumen

---

# 11. Kesimpulan

Pertanyaan juri tadi menunjukkan bahwa E-Matelik **sudah menarik**, tetapi agar esai dan sistem lebih kuat, kita harus:

* mempersempit klaim,
* mempertegas novelty,
* memperjelas batas MVP,
* menjaga sensitivitas budaya,
* dan memastikan sistem tampil sebagai **alat bantu yang realistis, bukan solusi yang terlalu muluk**.

Jadi arah penyempurnaan kita bukan membuat E-Matelik terlihat sempurna, tetapi membuatnya:

* **lebih logis**
* **lebih tahan diserang**
* **lebih konsisten**
* dan **lebih meyakinkan sebagai karya lomba**
