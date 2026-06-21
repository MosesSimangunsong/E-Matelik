# Design System - E-Matelik

## Tema Visual: Lingkungan, Sawah, dan Air

---

## 1. Tujuan

Design system ini menjadi acuan visual aktif untuk implementasi E-Matelik yang sekarang berjalan.

Tujuannya:

* menjaga konsistensi tampilan,
* mempertahankan identitas Subak yang organik dan tenang,
* memperjelas sinyal operasional pada laporan penting,
* dan memastikan UI siap untuk dashboard, peta, verifikasi, tracking, dan presentasi.

---

## 2. Karakter Visual

### 2.1 Kata Kunci

* organik
* tenang
* alami
* bersih
* membumi
* terpercaya
* spasial
* operasional

### 2.2 Prinsip Inti

E-Matelik harus terasa seperti:

* alat bantu komunitas,
* sistem dokumentasi yang serius namun tidak mengintimidasi,
* platform yang lahir dari konteks sawah, air, dan koordinasi lokal.

### 2.3 Prinsip Operasional

**Calm by identity, urgent by operational signal**

Artinya:

* dasar tampilan tetap natural dan ramah,
* tetapi status, prioritas, backlog, dan kasus penting harus terlihat tegas.

---

## 3. Sistem Warna

### 3.1 Primary - Sawah Green

* `#4F8A3F`
* `#3F7332`
* `#315B27`

Dipakai untuk:

* tombol utama
* identitas brand
* heading penting
* state aktif

### 3.2 Secondary - Water Blue

* `#3D8BBA`
* `#2F739D`
* `#255B7D`

Dipakai untuk:

* elemen peta
* status informatif
* highlight spasial
* panel penjelasan

### 3.3 Accent - Earth Brown

* `#A8743B`
* `#8C6030`

Dipakai untuk:

* aksen kecil
* nuansa tanah
* elemen penyeimbang visual

### 3.4 Neutral

* `#F8F7F2`
* `#F1EFE8`
* `#E3E0D7`
* `#CFC9BC`
* `#7B766B`
* `#4D4A43`
* `#25241F`

Dipakai untuk:

* background
* surface
* border
* body text

---

## 4. Warna Semantik

### Success

* `#3F8C5A`

### Warning

* `#D39A2C`

### Error / Critical

* `#C94B4B`

### Info

* `#3D8BBA`

---

## 5. Prioritas dan Urgency Layer

### Prioritas Rendah

* hijau lembut

### Prioritas Sedang

* biru informatif

### Prioritas Tinggi

* oranye

### Prioritas Darurat

* merah

### Implementasi yang Sudah Dipakai

Urgency layer saat ini muncul pada:

* badge prioritas,
* badge status,
* marker peta,
* kartu backlog verifikasi,
* KPI dashboard,
* indikator bukti lengkap / belum lengkap.

---

## 6. Typography

### 6.1 Font Aktif

Implementasi frontend saat ini memakai:

* **Plus Jakarta Sans**

### 6.2 Hierarki

* Page title: `32px`, `700`
* Section title: `24px`, `600`
* Card title: `18px`, `600`
* Body text: `14px`-`16px`, `400`
* Caption / helper: `12px`, `400`
* Label form: `14px`, `500`

### 6.3 Tone Tipografi

Teks harus:

* jelas
* tenang
* tidak bombastis
* mudah dipindai
* tidak overclaim

---

## 7. Layout

### 7.1 Filosofi

Layout harus:

* lapang,
* mudah dibaca,
* nyaman untuk peta,
* dan tetap rapi untuk tabel, histori, serta galeri bukti.

### 7.2 Grid

* desktop: grid fleksibel
* mobile: stacked layout

### 7.3 Spacing

Skala utama:

* `4px`
* `8px`
* `12px`
* `16px`
* `24px`
* `32px`
* `48px`

---

## 8. Shape dan Surface

### Border Radius

* button: `10px`
* input: `10px`
* card: `16px`
* modal: `20px`

### Surface

Surface harus:

* terang
* lembut
* punya border tipis
* punya shadow halus

Gradient ringan boleh dipakai pada:

* hero
* dashboard
* panel identitas produk

---

## 9. Komponen Inti

### 9.1 Card

Dipakai untuk:

* statistik
* ringkasan laporan
* panel verifikasi
* alert proses
* penjelasan sistem

### 9.2 Button

* primary: hijau utama
* secondary: putih/netral dengan border lembut
* destructive: merah lembut

### 9.3 Badge

Dipakai untuk:

* status
* prioritas
* closed-loop evidence
* metadata bukti

### 9.4 Table

Dipakai untuk:

* histori
* daftar laporan
* data admin

Table harus:

* mudah dipindai
* tidak terlalu berat
* punya hover ringan

### 9.5 Evidence Gallery

Galeri bukti harus memisahkan:

* bukti awal
* bukti penyelesaian

Supaya closed-loop evidence mudah dipahami.

---

## 10. Peta

### 10.1 Prinsip Peta

Peta harus:

* ringan
* fokus pada marker laporan
* tidak dipenuhi gimmick yang belum defensible

### 10.2 Marker

Marker membaca:

* status
* prioritas

Kasus prioritas tinggi dan darurat harus tampak lebih tegas dibanding marker biasa.

### 10.3 Popup

Popup marker minimal menampilkan:

* judul laporan
* kategori
* status
* prioritas
* kode laporan

---

## 11. Motion

Animasi harus:

* halus
* cepat
* tidak berlebihan

Dipakai untuk:

* hero reveal
* hover state
* card lift ringan
* transisi ringan

Harus tetap aman untuk `prefers-reduced-motion`.

---

## 12. Tone of Copy

Copy UI harus:

* jelas
* singkat
* sopan
* tidak overclaim
* tidak memberi kesan sistem menggantikan mekanisme adat

Copy penting yang harus dipertahankan:

* laporan adalah sinyal awal
* status adalah status administratif
* eskalasi adalah koordinasi administratif lanjutan
* bukti awal bukan bukti forensik final

---

## 13. Implementasi Frontend

Implementasi saat ini dibangun dengan:

* Tailwind CSS
* CSS variables
* reusable React components

Token yang dipakai mencakup:

* `--color-primary`
* `--color-secondary`
* `--color-accent`
* `--color-bg`
* `--color-surface`
* `--color-text`
* `--color-success`
* `--color-warning`
* `--color-error`

---

## 14. Kesimpulan

Design system E-Matelik saat ini menjaga identitas **lingkungan, sawah, dan air**, tetapi sudah menambahkan lapisan urgency yang cukup tegas untuk kebutuhan verifikasi, tracking, dan presentasi. Dengan arah ini, UI tetap terasa natural dan ramah komunitas, sekaligus lebih kuat secara operasional.
