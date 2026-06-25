Saya ingin kamu melakukan revisi tampilan **Landing Page dan Login Page E-Matelik** berdasarkan file `motion.md`.

Sebelum mengubah kode, lakukan hal berikut:

1. Baca file `motion.md` secara menyeluruh.
2. Jadikan `motion.md` sebagai acuan utama untuk semua keputusan animasi, transisi, dan micro-interaction.
3. Baca juga dokumen desain/produk yang relevan jika tersedia:

   * `docs/DesignSystem.md`
   * `docs/E-Matelik.md`
   * `docs/PRD.md`
   * `docs/UserFlow.md`
4. Fokus modifikasi hanya pada:

   * Landing Page
   * section Dashboard Publik jika sekarang sudah menyatu di Landing Page
   * Login Page
   * navbar/header publik
   * footer publik
5. Jangan mengubah backend, database, migration, controller, role, auth flow, verifikasi, laporan, upload evidence, atau dashboard internal.

---

# Tujuan Revisi

Masalah saat ini:

* Landing Page masih terlihat sangat “AI generated”.
* Tampilan tidak konsisten.
* Banyak card generik yang membuat UI terasa murahan.
* Beberapa tombol dan section tidak sesuai karena E-Matelik adalah sistem internal Subak.
* Login Page juga masih terlalu banyak card dan terlihat seperti template AI.
* Landing Page belum terasa smooth, belum punya flow interaktif, dan belum terasa seperti produk yang matang.

Saya ingin hasil akhirnya terasa:

* smooth,
* modern,
* minimal,
* premium,
* konsisten,
* natural,
* tidak generik,
* tidak terlihat seperti template AI,
* tidak penuh card yang tidak perlu,
* dan tetap sesuai identitas E-Matelik.

Inspirasi rasa visual:

* modern seperti Raycast,
* minimal,
* rapi,
* fokus,
* soft,
* smooth,
* punya transisi halus,
* punya interaksi yang terasa hidup,
* tetapi tetap membumi dengan konteks Subak, sawah, air, dan WebGIS.

Tetap pegang prinsip:

**Calm by identity, urgent by operational signal.**

Artinya:

* tampilan dasar harus tenang, bersih, dan natural;
* elemen penting seperti status, prioritas, titik peta, dan alur laporan boleh punya sinyal visual yang lebih tegas;
* jangan membuat UI menjadi game, terlalu bounce, terlalu neon, atau terlalu ramai.

---

# Scope File yang Perlu Dicek

Cari file yang mengatur halaman publik dan login, misalnya:

* `resources/js/Pages/Welcome.jsx`
* `resources/js/Pages/Home.jsx`
* `resources/js/Pages/Landing.jsx`
* `resources/js/Pages/Auth/Login.jsx`
* `resources/js/Pages/PublicDashboard.jsx`
* `resources/js/Layouts/GuestLayout.jsx`
* `resources/js/Components/...`
* file navbar/header/footer publik
* file CSS/global style/Tailwind yang relevan

Sesuaikan dengan struktur project aktual.

---

# Instruksi Penghapusan Elemen

## 1. Hapus Tombol “Dashboard Publik”

Hapus semua tombol/link bertuliskan:

* `Dashboard Publik`

Termasuk jika muncul di:

* navbar/header,
* jajaran tombol bersama `Daftar` dan `Masuk`,
* hero section,
* CTA section,
* bagian bawah landing page,
* atau section lain di halaman publik.

Saya ingin Dashboard Publik tidak lagi muncul sebagai tombol navigasi terpisah di Landing Page.

Jika konten Dashboard Publik sudah disatukan ke Landing Page sebagai section scroll, biarkan kontennya tetap ada, tetapi jangan tampilkan tombol khusus `Dashboard Publik`.

---

## 2. Hapus Tombol “Daftar”

Hapus semua tombol/link `Daftar` atau `Register` dari halaman publik.

Alasannya: E-Matelik adalah sistem internal Subak, jadi tidak semua orang bebas daftar sendiri.

Yang boleh ada hanya:

* `Masuk`
* atau `Login`

Jangan tampilkan CTA daftar akun publik.

Jika route `/register` masih ada di backend, jangan ubah backend-nya. Cukup hilangkan akses visual dari Landing Page dan Login Page publik.

---

## 3. Hapus Tombol “Masuk ke E-Matelik” di Bagian Bawah

Di bagian bawah landing page saat ini ada copy seperti:

> Rapi, terdata, dan siap ditindaklanjuti.
> Buat laporan lapangan tidak lagi hilang tanpa jejak.

dan ada tombol:

> Masuk ke E-Matelik

Saya ingin bagian CTA bawah itu dihapus atau dirombak total.

Jangan tampilkan lagi tombol `Masuk ke E-Matelik` di bagian bawah.

Jika masih butuh footer closing, buat sangat minimal dan tidak seperti CTA besar.

---

## 4. Hapus Placeholder Screenshot WebGIS

Di landing page saat ini ada placeholder untuk screenshot aplikasi WebGIS.

Saya ingin placeholder screenshot itu dihapus.

Jangan tampilkan kotak placeholder kosong, dummy screenshot, mockup palsu, atau area “screenshot aplikasi” yang terlihat generik.

Jika ingin menampilkan visual WebGIS, ganti dengan visual yang lebih konseptual dan rapi, misalnya:

* abstract map panel,
* miniature spatial grid,
* soft coordinate lines,
* animated report flow,
* small status chips,
* map-like surface tanpa mengklaim sebagai screenshot asli.

Tapi jangan gunakan placeholder screenshot.

---

## 5. Hapus Section “Detail Peta dan Laporan E-Matelik”

Jika ada section dengan judul:

> Detail Peta dan Laporan E-Matelik

hapus section tersebut.

Jangan hanya disembunyikan dengan CSS kalau tidak perlu. Hapus dari render JSX agar struktur halaman lebih bersih.

---

## 6. Footer Copyright

Di paling bawah halaman, tampilkan footer yang sederhana dengan teks:

> Copyright @E-Matelik Team

Footer harus minimal, rapi, tidak besar, tidak seperti CTA, dan tidak penuh tombol.

---

# Instruksi Navbar / Header Publik

Navbar harus sangat sederhana.

Gunakan struktur:

* kiri: logo/nama `E-Matelik`
* tengah: anchor link section jika diperlukan, misalnya:

  * Tentang
  * Alur
  * Fitur
  * Monitoring
* kanan: hanya tombol/link `Masuk`

Jangan tampilkan:

* `Daftar`
* `Dashboard Publik`
* CTA berlebihan
* banyak tombol dalam satu baris

Tombol `Masuk` harus halus, modern, dan tidak terlalu mencolok. Bisa berupa button kecil dengan border lembut atau surface gelap/hijau yang konsisten.

---

# Revisi Landing Page Secara Besar

Landing Page jangan hanya diberi animasi pada layout lama yang buruk.

Lakukan **visual cleanup** dan **struktur ulang** agar lebih konsisten.

## Prinsip Tampilan Baru

Landing Page harus:

* tidak penuh card generik,
* tidak memakai banyak container yang saling tidak konsisten,
* tidak terlihat seperti hasil generate AI,
* tidak memakai terlalu banyak gradient yang bertabrakan,
* tidak memakai icon dekoratif berlebihan,
* tidak memakai placeholder screenshot palsu,
* tidak terlalu banyak CTA,
* tidak terlalu banyak teks bombastis.

Gunakan pendekatan:

* clean editorial layout,
* spacing lega,
* typography kuat,
* section yang punya ritme,
* visual interaktif yang halus,
* soft background,
* sedikit glass/surface tapi konsisten,
* elemen bergerak smooth berdasarkan `motion.md`.

---

# Struktur Landing Page yang Diinginkan

Boleh sesuaikan dengan data/komponen yang ada, tetapi arah struktur idealnya:

## 1. Hero Section

Hero harus menjadi bagian paling kuat.

Isi hero sebaiknya:

* nama E-Matelik,
* headline yang kuat tetapi tidak bombastis,
* subheadline yang menjelaskan:

  * pelaporan gangguan telabah,
  * bukti lokasi,
  * verifikasi Pekaseh,
  * tracking administratif.
* hanya satu tombol utama:

  * `Masuk`

Jangan tampilkan tombol:

* `Daftar`
* `Dashboard Publik`
* `Masuk ke E-Matelik` sebagai CTA bawah tambahan

Animasi hero:

* headline `fade-in-up`,
* subheadline muncul setelah headline,
* tombol `Masuk` muncul setelah subheadline,
* visual kanan/pendukung muncul dengan `scale-in` atau `fade-in-up`,
* gunakan `staggered reveal`.

Hero visual jangan berupa screenshot placeholder. Buat visual konseptual yang terasa seperti sistem WebGIS:

* panel koordinat kecil,
* titik laporan,
* status chip,
* garis alur laporan,
* ring pulse halus untuk titik kritis,
* abstract map surface,
* bukan screenshot palsu.

---

## 2. Section Alur Kerja Interaktif

Saya ingin alur kerja sistem lebih interaktif, tidak hanya card statis.

Buat section alur kerja yang terasa smooth dan hidup.

Isi alur minimal:

1. Laporan dibuat dari titik lokasi
2. Bukti awal dikirim
3. Pekaseh memverifikasi
4. Status administratif dilacak
5. Bukti penyelesaian ditambahkan

Tampilan jangan hanya 5 card biasa.

Buat lebih interaktif, misalnya salah satu dari pendekatan ini:

### Opsi A - Interactive Stepper

* Ada daftar step di kiri.
* Saat hover/click step, panel kanan berubah.
* Panel kanan menampilkan detail step, status chip, mini visual, atau mini timeline.
* Transisi antar step memakai fade/slide smooth.

### Opsi B - Vertical Timeline Premium

* Timeline vertikal dengan garis halus.
* Setiap step muncul dengan scroll reveal.
* Saat step masuk viewport, titik timeline aktif.
* Ada micro-interaction pada step aktif.

### Opsi C - Process Rail

* Alur horizontal/vertical seperti pipeline.
* Ada node yang terhubung garis.
* Node punya hover state.
* Node aktif menampilkan detail.
* Animasi smooth, bukan bounce.

Pilih pendekatan yang paling cocok dengan struktur kode.

Gunakan Motion/Tailwind sesuai `motion.md`:

* `whileInView`
* `staggered reveal`
* `fade-in-up`
* `layout` jika diperlukan
* hover lift halus
* transition 150ms-400ms
* `prefers-reduced-motion`

Jangan membuat animasi terlalu berat.

---

## 3. Section Nilai/Fitur Utama

Tampilkan fitur utama secara lebih elegan, tidak seperti kumpulan card AI.

Fitur yang boleh ditampilkan:

* Bukti geospasial
* Verifikasi Pekaseh
* Status administratif
* Closed-loop evidence
* Urgency layer
* Riwayat laporan

Desainnya bisa berupa:

* compact feature list,
* split layout,
* alternating rows,
* small feature pills,
* interactive tabs,
* atau feature grid yang sangat rapi.

Kalau tetap pakai card, card harus:

* konsisten,
* halus,
* tidak terlalu banyak,
* tidak terlalu besar,
* tidak memakai icon generik berlebihan,
* punya hover lift ringan.

---

## 4. Section Dashboard Publik yang Menyatu

Jika Dashboard Publik sudah ada di bawah landing page, jadikan dia section natural dalam landing page, bukan tombol/halaman terpisah.

Section ini boleh berisi:

* KPI ringkas,
* laporan prioritas,
* peta ringkas,
* status administratif.

Tapi tampilannya harus konsisten dengan landing page.

Gunakan:

* staggered KPI reveal,
* soft card hover,
* map panel reveal,
* pulse marker hanya untuk status penting,
* count-up jika sudah aman.

Jangan ada tombol `Dashboard Publik`.

---

## 5. Footer Minimal

Footer paling bawah cukup:

> Copyright @E-Matelik Team

Boleh ditambah garis border atas yang halus, tetapi jangan tambah CTA, daftar, dashboard publik, atau tombol lain.

---

# Revisi Login Page

Login Page saat ini juga masih terlihat seperti hasil AI dan terlalu banyak card.

Saya ingin tampilan login lebih seperti Raycast:

* minimal,
* clean,
* fokus,
* smooth,
* tidak banyak card,
* tidak banyak dekorasi,
* tidak banyak teks,
* tidak terlalu ramai,
* surface rapi,
* background soft,
* input jelas,
* tombol masuk elegan.

## Arahan Login Page

Ubah Login Page agar:

* hanya fokus pada form login,
* tidak ada card-card promosi berlebihan,
* tidak ada tombol daftar/register,
* tidak ada link dashboard publik,
* visualnya terasa premium dan internal,
* ada kesan “sistem internal Subak”.

Struktur login yang disarankan:

* background full page dengan soft gradient / neutral surface;
* satu panel login utama yang kecil dan rapi;
* logo/nama `E-Matelik`;
* subtitle singkat:

  * `Masuk ke sistem internal pemantauan telabah Subak`
* email input;
* password input;
* remember me jika sudah ada;
* tombol `Masuk`;
* error message tetap jelas.

Jangan mengubah logika login.

Jangan menghapus validasi.

Jangan mengubah route auth.

Hanya ubah tampilan dan micro-interaction.

Animasi login:

* panel login `fade-in-up` halus saat page load;
* input focus ring smooth;
* button hover/active halus;
* error message muncul dengan fade-in;
* tidak ada animasi loop yang mengganggu.

---

# Motion dan Animasi yang Harus Dipakai

Ikuti `motion.md`.

Gunakan efek utama:

* fade-in-up,
* section reveal,
* staggered reveal,
* soft scale-in,
* card hover lift,
* button hover lift,
* smooth layout transition,
* subtle marker pulse untuk titik penting.

Gunakan pattern:

```jsx
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.2 }}
```

Untuk hero yang langsung tampil:

```jsx
initial="hidden"
animate="visible"
```

Jika belum ada, buat atau gunakan:

* `resources/js/lib/motionPresets.js`
* `FadeIn`
* `FadeInUp`
* `SectionReveal`
* `StaggerContainer`
* `StaggerItem`
* `MotionCard`

Gunakan import:

```js
import { motion, useReducedMotion } from "motion/react";
```

Jika `motion` belum ada di `package.json`, install:

```bash
npm install motion
```

Jangan install:

* GSAP
* Animate.css
* Lottie
* React Spring

---

# Motion Preset

Jika belum ada, buat preset yang konsisten seperti ini:

```js
export const matelikEasing = [0.16, 1, 0.3, 1];

export const matelikTransition = {
  duration: 0.45,
  ease: matelikEasing,
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: matelikTransition,
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: matelikTransition,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...matelikTransition, duration: 0.35 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: matelikTransition,
  },
};
```

Jangan membuat transisi acak di banyak file. Pakai preset.

---

# Styling Direction

Gunakan gaya yang lebih konsisten dan mature:

* background neutral hangat;
* hijau sawah sebagai aksen, bukan memenuhi seluruh halaman;
* biru air untuk elemen spasial;
* earth tone untuk aksen kecil;
* border tipis;
* shadow halus;
* radius konsisten;
* typography rapi;
* spacing lega;
* tidak ada card berlebihan.

Hindari:

* gradient bertabrakan,
* card terlalu banyak,
* icon terlalu besar,
* section terlalu mirip template SaaS,
* teks bombastis,
* warna terlalu terang/neon,
* elemen palsu seperti screenshot placeholder.

---

# Copywriting yang Harus Dipertahankan Arahnya

Gunakan tone yang defensible:

* alat bantu dokumentasi,
* bukti administratif awal,
* verifikasi Pekaseh,
* tracking proses,
* koordinasi administratif lanjutan,
* mendukung Matelik,
* tidak menggantikan mekanisme adat,
* status administratif, bukan keputusan sosial final.

Hindari klaim seperti:

* solusi pasti,
* revolusi total,
* AI pintar,
* otomatis menyelesaikan konflik,
* menggantikan Subak,
* membuktikan secara hukum final.

---

# Accessibility dan Reduced Motion

Wajib dukung reduced motion:

* jika user mengaktifkan reduced motion, matikan transisi besar;
* jangan pakai animasi loop kecuali marker penting;
* semua informasi tetap terbaca tanpa animasi;
* jangan memakai flashing;
* jangan membuat pengguna pusing.

---

# Performance Rules

Ikuti aturan ini:

1. Animasikan hanya:

   * opacity,
   * transform,
   * scale,
   * translate,
   * shadow ringan.

2. Jangan animasikan:

   * width,
   * height,
   * top,
   * left,
   * margin,
   * padding.

3. Jangan animasikan terlalu banyak elemen sekaligus.

4. Jangan membuat layout shift.

5. Jangan membuat landing page berat.

6. Jangan membuat Leaflet map re-render terus-menerus.

7. Mobile harus tetap nyaman.

---

# Batasan Penting

Jangan ubah:

* database,
* migration,
* controller backend,
* route backend,
* auth logic,
* role system,
* verifikasi Pekaseh,
* upload evidence,
* logic laporan,
* middleware,
* permission,
* dashboard internal selain bagian publik yang memang tampil di landing page.

Jangan refactor besar-besaran di luar scope.

Jangan menghapus fitur backend.

Jangan menghapus route register jika masih dipakai oleh auth scaffolding, cukup hilangkan tombol/link register dari UI publik.

---

# Checklist Wajib Setelah Modifikasi

Pastikan semua poin ini selesai:

* [ ] Tombol `Dashboard Publik` dihapus dari navbar/header.
* [ ] Tombol `Dashboard Publik` dihapus dari semua bagian landing page.
* [ ] Tombol `Daftar`/`Register` dihapus dari halaman publik.
* [ ] Hanya ada tombol `Masuk`/`Login` sebagai akses publik.
* [ ] Placeholder screenshot WebGIS dihapus.
* [ ] Section `Detail Peta dan Laporan E-Matelik` dihapus.
* [ ] CTA bawah berisi `Rapi, terdata, dan siap ditindaklanjuti...` dihapus atau dirombak total tanpa tombol.
* [ ] Tombol `Masuk ke E-Matelik` di bagian bawah dihapus.
* [ ] Footer paling bawah menampilkan `Copyright @E-Matelik Team`.
* [ ] Landing Page tidak terlihat seperti template AI.
* [ ] Landing Page punya visual yang lebih konsisten.
* [ ] Alur kerja sistem dibuat lebih interaktif dan smooth.
* [ ] Login Page dibuat lebih minimal, smooth, dan premium.
* [ ] Login Page tidak punya tombol daftar/register.
* [ ] Login Page tidak punya tombol Dashboard Publik.
* [ ] Motion mengikuti `motion.md`.
* [ ] Reduced motion didukung.
* [ ] Build berhasil.

---

# Langkah Kerja

Kerjakan berurutan:

1. Baca `motion.md`.
2. Cek struktur file landing page dan login page.
3. Cek `package.json`.
4. Install `motion` jika belum tersedia.
5. Buat motion preset/component kecil jika dibutuhkan.
6. Bersihkan navbar dari `Dashboard Publik` dan `Daftar`.
7. Rombak landing page agar lebih konsisten, modern, dan tidak generik.
8. Hapus placeholder screenshot WebGIS.
9. Hapus section `Detail Peta dan Laporan E-Matelik`.
10. Buat section alur kerja menjadi interaktif dan smooth.
11. Rapikan section Dashboard Publik agar menyatu dengan landing page tanpa tombol khusus.
12. Hapus CTA bawah yang tidak diperlukan.
13. Tambahkan footer `Copyright @E-Matelik Team`.
14. Rombak login page agar minimal seperti Raycast dan tidak banyak card.
15. Pastikan semua route dan logic tetap aman.
16. Jalankan build/test yang relevan.
17. Berikan ringkasan perubahan.

---

# Output Akhir yang Harus Kamu Berikan

Setelah selesai, berikan laporan ringkas berisi:

1. File yang diubah.
2. File yang dibuat.
3. Package yang di-install jika ada.
4. Elemen yang dihapus.
5. Animasi/interaksi yang ditambahkan.
6. Perubahan pada Landing Page.
7. Perubahan pada Login Page.
8. Hal yang sengaja tidak dikerjakan.
9. Hasil build/test.
10. Catatan jika ada bagian yang perlu dicek manual di browser.

Ingat: tujuan utama revisi ini adalah membuat Landing Page dan Login Page E-Matelik tidak lagi terlihat seperti hasil AI generik, tetapi terasa sebagai sistem internal Subak yang modern, smooth, matang, minimal, dan konsisten.
