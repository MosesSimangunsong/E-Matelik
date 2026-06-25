Animation Research & Implementation Guide for E-Matelik
1. Executive Summary
Penelitian ini menyajikan analisis komprehensif mengenai strategi desain pergerakan (motion design), animasi, dan interaksi mikro (micro-interaction) yang dirancang khusus untuk E-Matelik, sebuah aplikasi WebGIS pelaporan dan pelacakan gangguan telabah (saluran irigasi) pada ekosistem Subak di Bali. Berdasarkan analisis mendalam terhadap tumpukan teknologi yang digunakan—yaitu Laravel, React, Inertia.js, Tailwind CSS, dan Leaflet—serta identitas visual aplikasi yang berakar pada budaya lokal, pendekatan animasi yang paling optimal adalah pendekatan yang fungsional, terarah, dan minim distraksi. Desain antarmuka E-Matelik menuntut keseimbangan antara modernitas sistem pelaporan digital dan penghormatan terhadap tata kelola air tradisional, sehingga pergerakan visual harus mempertegas identitas sistem tanpa terlihat mendominasi.
Analisis ini menyimpulkan bahwa animasi yang paling cocok untuk E-Matelik adalah pergerakan yang mulus (smooth), organis, dan berpusat pada hierarki informasi. Pergerakan tersebut harus berfungsi untuk membantu pengguna memahami perubahan status pelaporan, memberikan isyarat visual terkait urgensi masalah (seperti penyumbatan saluran parah), dan memandu fokus pada elemen spasial di peta tanpa mengorbankan performa sistem navigasi1. Sebaliknya, animasi yang harus dihindari secara mutlak meliputi efek yang berlebihan, pantulan elastis (bouncy) yang tidak natural, efek paralaks yang membebani memori, serta transisi antar halaman yang terlalu lambat. Aplikasi ini tidak boleh memberikan kesan seperti antarmuka permainan (gamified) atau platform hiburan, mengingat fungsinya sebagai alat administratif yang mengikat keputusan-keputusan penting di tingkat desa dan institusi adat.
Prinsip desain pergerakan yang direkomendasikan berpegang pada filosofi utama: "Calm by identity, urgent by operational signal". Hal ini berarti lapisan dasar antarmuka tetap membumi, tenang, dan natural—menggunakan transisi CSS standar untuk status diam atau interaksi dasar—sementara lapisan operasional seperti marker peta untuk kasus darurat, kartu prioritas, antrean (backlog), dan metrik kinerja menggunakan animasi yang lebih tegas untuk menarik perhatian seketika.
Kesimpulan awal untuk tumpukan animasi merekomendasikan kombinasi yang kuat antara utilitas bawaan Tailwind CSS dan paket Motion (sebelumnya dikenal sebagai Framer Motion). Penggunaan Tailwind CSS murni disarankan untuk interaksi mikro pada tingkat komponen, sedangkan paket motion direkomendasikan sebagai penggerak utama untuk orkestrasi animasi masuk (entrance animation), transisi elemen berbagi (shared layout transitions), dan transisi halaman kompleks2. Paket animasi yang terlalu membebani seperti GSAP atau Animate.css dinilai tidak efisien, memberikan kompleksitas yang tidak perlu, dan karenanya harus dihindari untuk Minimum Viable Product (MVP) E-Matelik.
2. Context: Karakter UI E-Matelik
Konteks operasional E-Matelik sangat unik karena mempertemukan teknologi spasial web modern (WebGIS) dengan sistem tata kelola air, pertanian, dan filosofi Tri Hita Karana yang tertanam dalam sistem Subak Bali. Sistem ini dirancang bukan sekadar sebagai portal pengaduan publik biasa, melainkan sebagai jembatan administratif yang sah antara pelapor (petani atau warga masyarakat), Pekaseh (kepala Subak), dan administrator sistem pemerintahan atau lembaga terkait. Setiap interaksi di dalam sistem ini membawa bobot operasional dan administratif yang tinggi.
Arsitektur antarmuka E-Matelik mencakup berbagai modul fungsional yang memerlukan penanganan pergerakan yang spesifik. Halaman landas (landing page) dan dasbor publik berfungsi sebagai etalase informasi; area ini harus menanamkan kepercayaan (trust) kepada publik melalui penyajian data spasial dan metrik yang transparan. Dasbor personal, yang terbagi untuk Pelapor, Pekaseh, dan Admin, merupakan area kerja dengan kepadatan informasi tinggi. Modul-modul ini mencakup kartu laporan, KPI (Key Performance Indicator) proses, status lencana (badge) prioritas, serta antrean tugas. Selanjutnya, modul WebGIS yang ditenagai oleh Leaflet dan OpenStreetMap menjadi inti spasial aplikasi, menampilkan lokasi telabah, penanda gangguan, dan kluster laporan. Terakhir, terdapat modul detail yang mencakup histori laporan, galeri bukti awal, hingga bukti penyelesaian siklus tertutup (closed-loop evidence).
Dalam konteks yang padat informasi ini, animasi harus dirancang secara eksklusif untuk mendukung arsitektur informasi. Setiap pergerakan harus memperkuat pemahaman status; misalnya, perpindahan sebuah laporan dari status "menunggu verifikasi" menjadi "diproses" harus divisualisasikan dengan pergeseran tata letak yang kohesif. Animasi juga ditugaskan untuk mengarahkan alur gulir (scroll flow), menyusun hierarki informasi secara logis, dan yang terpenting, menyoroti urgensi laporan kritis tanpa memicu kepanikan visual. Teknologi di sini diposisikan sebagai alat bantu operasional yang menghormati mekanisme adat, sehingga desain pergerakan harus memperkuat kesan bahwa sistem ini memfasilitasi—bukan menggantikan—otoritas Pekaseh.
3. Motion Design Principles
Untuk memastikan konsistensi, efektivitas, dan kesesuaian dengan filosofi "Calm by identity, urgent by operational signal", pengembangan E-Matelik harus mematuhi serangkaian prinsip desain pergerakan yang ketat. Prinsip-prinsip ini bertindak sebagai pedoman bagi setiap keputusan teknis terkait animasi di seluruh aplikasi.
Karakteristik pertama adalah mengutamakan kehalusan di atas kemewahan visual (subtle over flashy). Animasi harus nyaris tidak disadari oleh pengguna namun memberikan dampak signifikan pada kelancaran navigasi. Elemen antarmuka tidak diperkenankan berputar tanpa henti, membesar secara berlebihan, atau memiliki pantulan elastis yang ekstrem. Kejelasan fungsional (clarity over decoration) adalah mandat berikutnya; setiap pergerakan wajib memiliki tujuan empiris. Jika sebuah elemen bergerak, hal itu harus mengindikasikan adanya perubahan data, pembaruan status, atau konfirmasi interaksi pengguna. Animasi yang diciptakan murni untuk tujuan dekorasi harus dihilangkan. Selanjutnya, pergerakan harus terasa cepat namun tidak kasar (fast but not abrupt). Dalam sebuah alat produktivitas dan administratif, pengguna tidak boleh dibiarkan menunggu sebuah animasi selesai sebelum mereka dapat berinteraksi kembali dengan sistem. Kecepatan transisi adalah penanda profesionalisme perangkat lunak.
Responsivitas dan aksesibilitas (responsive and accessible) menjadi prinsip yang tidak dapat ditawar. Desain pergerakan harus mampu beradaptasi dengan keterbatasan ukuran layar perangkat seluler dan secara otomatis dinonaktifkan jika pengguna telah mengaktifkan preferensi sistem operasi untuk mengurangi animasi, yakni melalui kueri media prefers-reduced-motion5. Selain itu, setiap pergerakan harus memiliki makna (meaningful motion), di mana transisi tata letak secara logis menghubungkan status lama dan baru, membantu kognisi pengguna dalam mengikuti objek yang berubah. Prinsip urgensi operasional (operational urgency) memperbolehkan pengecualian bagi indikator penting, seperti penanda laporan dengan tingkat kerusakan infrastruktur parah, untuk menggunakan animasi berkelanjutan yang pelan guna membedakannya dari elemen statis. Terakhir, kinerja harus diutamakan (performance-first animation), di mana hanya properti CSS yang dikomputasi oleh Unit Pemrosesan Grafis (GPU)—seperti transform dan opacity—yang diizinkan untuk dianimasikan secara reguler1.
Pengaturan teknis waktu dan kelengkungan akselerasi sangat penting untuk menyeragamkan pengalaman pengguna. Tabel berikut menjabarkan aturan teknis durasi dan implementasi easing (kurva kecepatan) yang direkomendasikan untuk E-Matelik.

Kategori Interaksi
Durasi Ideal
Kurva Kecepatan (Easing)
Deskripsi & Kondisi Penggunaan
Hover & Micro-interaction
150ms - 200ms
ease-out / cubic-bezier(0, 0, 0.2, 1)
Interaksi mikro seperti mengangkat kartu (card lift) atau perubahan warna tombol. Terasa responsif seketika tanpa menahan aksi kursor6.
Entrance Animation
300ms - 400ms
ease-out / cubic-bezier(0.16, 1, 0.3, 1)
Elemen baru yang masuk ke layar (seperti kemunculan modal atau daftar laporan). Durasi ini cukup untuk disadari namun cukup singkat untuk tidak menghambat pembacaan.
Page / Layout Transition
250ms - 300ms
ease-in-out / cubic-bezier(0.4, 0, 0.2, 1)
Perpindahan halaman atau pergeseran elemen yang tetap berada di dalam DOM. ease-in-out menjamin percepatan di awal dan perlambatan di akhir yang halus8.
Penggunaan Spring (Pegas)
400ms - 500ms
Fisika pegas (Stiffness tinggi, Damping besar)
Hanya digunakan secara eksklusif untuk gestur seret dan lepas (drag-and-drop) jika diimplementasikan kelak, atau pemberitahuan darurat. Dilarang untuk transisi halaman.
Penggunaan Linear
Konstan
linear
Hanya diterapkan pada indikator pemuatan berputar (spinning loader). Tidak boleh digunakan untuk pergerakan elemen tata letak karena terasa tidak alami bagi mata manusia.
Animasi Dimatikan
0ms / 1ms
Instan (step-end)
Diwajibkan setiap kali peramban mendeteksi prefers-reduced-motion: reduce. Semua transisi diganti dengan kemunculan instan untuk mencegah disorientasi5.

4. Animation Categories Suitable for E-Matelik
Analisis terhadap berbagai kategori animasi modern diperlukan untuk menentukan pendekatan mana yang layak dan relevan untuk arsitektur berbasis WebGIS. Setiap kategori di bawah ini telah dievaluasi berdasarkan dampak fungsionalnya terhadap sistem tata kelola Subak, kesesuaiannya dengan perpustakaan React, serta risiko performa yang ditimbulkannya.
4.1 Entrance Animation
Animasi masuk mengontrol bagaimana elemen antarmuka muncul pertama kali saat dimuat. Efek yang dianalisis mencakup fade-in, fade-in-up, fade-in-down, scale-in, pergerakan anak berlapis (staggered children), dan kemunculan lembut (soft reveal). Fungsi utama animasi masuk adalah mengurangi beban kognitif pengguna dengan menghindari tampilan layar yang tiba-tiba penuh dengan data; informasi disajikan secara berurutan dan terstruktur. Animasi ini sangat cocok diaplikasikan pada Landing Page (untuk memperkenalkan fitur), Dasbor (saat memuat kartu metrik), dan Galeri Bukti (memuat deretan foto dari lokasi telabah). Paket motion sangat direkomendasikan untuk implementasi ini karena menyediakan properti initial dan animate, serta kapabilitas staggerChildren yang sangat efisien untuk memunculkan elemen berbaris2. Risiko jika animasi ini diterapkan secara berlebihan adalah timbulnya rasa lamban; jika jarak pergeseran vertikal (y-axis) lebih dari 30 piksel atau durasinya berlarut-larut, sistem akan terasa seperti presentasi animasi alih-alih alat administratif yang tangkas. Rekomendasi implementasinya adalah menggunakan pergeseran vertikal minimal (maksimal 16 piksel) dengan transisi opasitas dari 0 ke 1 selama maksimal 300ms.
4.2 Scroll Animation
Animasi berbasis gulir dirancang untuk memunculkan elemen saat memasuki area pandang (viewport) seiring dengan aktivitas pengguna menggulir halaman. Efek yang dievaluasi termasuk scroll-triggered reveal, whileInView animation, reveal on scroll, sticky storytelling, light parallax, dan section transition. Fungsinya adalah mempertahankan keterlibatan pengguna dengan menyajikan data secara progresif, tanpa membebani memori awal saat memuat halaman panjang. Kategori ini cocok digunakan pada area Landing Page, khususnya pada bagian penjelasan fitur E-Matelik dan pratinjau WebGIS publik. Pustaka motion yang menyediakan properti viewport sangat cocok untuk kebutuhan ini2, atau sebagai alternatif yang sangat ringan, react-intersection-observer dapat dikombinasikan dengan kelas utilitas Tailwind CSS10. Risiko terbesar dari kategori ini adalah kelelahan pengguna (scroll fatigue); keharusan untuk terus menggulir hanya demi melihat konten yang perlahan muncul akan menghambat konsumsi informasi kritis. Rekomendasi implementasi yang aman adalah mengonfigurasi argumen viewport={{ once: true, amount: 0.2 }}9. Konfigurasi ini memastikan elemen tidak akan memudar masuk dan keluar berulang kali saat pengguna menggulir naik-turun, melainkan tetap terlihat secara statis setelah pertama kali dipicu. Paralaks harus sepenuhnya dihindari karena mendistorsi pembacaan data pelaporan.
4.3 Hover & Micro-interaction
Interaksi mikro merupakan bentuk komunikasi visual terkecil antara sistem dan kursor atau sentuhan pengguna. Analisis efek mencakup card hover lift (kartu sedikit terangkat), button lift, subtle scale hover, pergeseran garis bawah (underline slide), icon nudge, badge emphasis, dan sorotan kontrol peta (map control hover). Fungsi utamanya adalah memberikan umpan balik taktil secara visual, menegaskan kepada pengguna—khususnya pelapor atau Pekaseh yang mungkin tidak terlalu terbiasa dengan sistem rumit—bahwa elemen tersebut dapat ditekan atau diinteraksikan, tanpa mengubah struktur tata letak halaman. Interaksi ini wajib diterapkan di seluruh aplikasi, terutama pada tautan, kartu laporan gangguan telabah, tombol verifikasi, dan lapisan kontrol Leaflet. Implementasi paling optimal adalah menggunakan utilitas pseudo-class Tailwind CSS murni, seperti kombinasi hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out7. Penggunaan pustaka JavaScript yang berat untuk hover adalah suatu pemborosan sumber daya. Risiko jika kategori ini dirancang berlebihan adalah memicu pergeseran tata letak (layout shift); misalnya, mengubah ukuran width atau height saat kursor berada di atas elemen akan mendorong elemen di sebelahnya secara agresif. Rekomendasinya adalah membatasi modifikasi CSS hanya pada properti transform, opacity, dan box-shadow.
4.4 Map and WebGIS Motion
Sebagai sistem pelaporan berbasis spasial, pergerakan di atas modul Leaflet membutuhkan perhatian ekstra. Efek yang dianalisis mencakup marker pulse (penanda berdenyut), penekanan prioritas penanda (priority marker emphasis), kemunculan panel peta (map panel reveal), lapisan peta mengambang (floating map overlay), kemunculan popup, serta transisi pudar untuk kluster (cluster/marker fade) dan penyorotan laporan darurat. Fungsi utama animasi ini adalah menarik mata pengguna langsung ke titik krisis geografis—seperti area telabah yang longsor atau debit air yang tersumbat total—di tengah kompleksitas visual peta satelit atau jalan. Area ini dikhususkan untuk Dasbor WebGIS Penuh dan antarmuka pemilih lokasi (map picker) saat membuat laporan.
Pendekatan teknis pada peta tidak boleh mencampuradukkan siklus perenderan React dengan DOM Leaflet. Menganimasikan puluhan marker menggunakan variabel state React yang secara konstan memperbarui komponen Leaflet akan menghancurkan frame rate (menimbulkan lag)12. Solusi yang sangat direkomendasikan adalah menggunakan injeksi L.divIcon dari Leaflet yang dikombinasikan dengan kelas animasi keyframes CSS murni dari Tailwind (seperti animate-ping)3. Pendekatan ini memungkinkan peramban melakukan offload animasi ke GPU secara independen tanpa campur tangan JavaScript12. Risiko berlebihan pada peta adalah disorientasi spasial; jika terlalu banyak marker berdenyut bersamaan, peta akan terlihat seperti lampu peringatan yang mengacaukan analisis spasial. Rekomendasi implementasinya adalah mempertahankan efek fade-animation dan inersia bawaan Leaflet untuk operasi geser dan perbesaran (pan and zoom)1, serta hanya mengaktifkan pulse pada laporan berstatus "Kritis" atau "Belum Diverifikasi Lama".
4.5 Dashboard Animation
Dasbor adalah pusat komando operasional. Efek yang dianalisis untuk kategori ini meliputi perhitungan maju nilai KPI (KPI card count-up), kartu yang muncul berlapis (staggered dashboard cards), pemuatan kerangka (skeleton loading), kemunculan baris tabel (table row reveal), transisi perubahan status, serta kemunculan galeri bukti dan histori lini masa. Animasi dasbor berfungsi menyamarkan waktu tunggu pengambilan data (latensi API) dengan cara yang memuaskan kognisi manusia, serta memberikan kesan bahwa perangkat lunak bekerja secara aktif merekapitulasi data pengairan Subak. Area yang cocok adalah Dasbor Publik, Dasbor Pekaseh, dan Dasbor Admin. Pustaka react-countup sangat efisien untuk menganimasikan agregasi angka metrik14, dipadukan dengan modul utilitas animate-pulse dari Tailwind untuk status pemuatan data3. Risiko terbesar di sini adalah kelelahan sensorik; jika semua elemen di dasbor Admin bergerak setiap detiknya, produktivitas administrator akan menurun drastis. Rekomendasi implementasi menggarisbawahi keharusan penggunaan blok skeleton berwarna abu-abu membumi yang sejalan dengan estetika alami E-Matelik, dan pembatasan animasi tabel agar tidak memuat per baris (yang memakan waktu lama) melainkan memuat seluruh blok secara serentak, yang direpresentasikan melalui efek pudar (fade) yang sangat cepat15.
4.6 Page / Layout Transition
Pergerakan tingkat makro ini melibatkan transisi tata letak halaman dan perpindahan elemen antar komponen. Efek yang dievaluasi mencakup transisi halaman (page transition), transisi elemen berbagi (shared element transition), animasi tata letak (layout animation), serta transisi accordion, modal, dan tab. Dalam lingkungan React dan Inertia.js, animasi ini berfungsi menciptakan pengalaman navigasi yang mulus layaknya Aplikasi Halaman Tunggal (SPA - Single Page Application). Hal ini cocok diterapkan saat pengguna berpindah dari Daftar Laporan menuju Detail Laporan, atau saat membuka galeri foto hambatan telabah.
Transisi ini dapat dicapai melalui View Transition API yang kini didukung oleh Inertia.js untuk navigasi tingkat rute16, serta penggunaan properti layoutId dari paket motion untuk mengikat elemen spesifik—seperti thumbnail gambar yang membesar menjadi mode pratinjau penuh tanpa harus memuat ulang gambar dari awal18. Risiko pengimplementasian transisi ini adalah potensi durasi halaman yang membeku; transisi yang lebih dari 400ms akan terasa merusak kinerja. Selain itu, elemen bertumpuk tanpa manajemen z-index yang benar saat transisi akan menimbulkan artefak visual yang buruk. Rekomendasinya adalah mengimplementasikan View Transitions bawaan Inertia untuk perpindahan dasar, dan mencadangkan kapabilitas motion yang lebih kuat (layoutId dan <AnimatePresence>) secara eksklusif untuk modul penampil gambar dan kotak dialog (modal).
5. Package / Library Research
Pemilihan pustaka (library) untuk menggerakkan mesin animasi sangat menentukan ukuran bundel akhir aplikasi dan kinerja jangka panjang, terutama pada arsitektur hibrida React dan Inertia.js. Berikut adalah penelitian mendalam mengenai paket yang tersedia di ekosistem modern.
Tabel berikut menyajikan ringkasan evaluasi berbagai pustaka animasi untuk kebutuhan E-Matelik.
Nama Package / Ekosistem
Fungsi Utama & Kecocokan
Kompatibilitas Inertia + React
Rekomendasi Akhir
Motion (Framer Motion)
Orkestrasi state deklaratif, shared layout, gestur.
Sangat Tinggi. Ekosistem React native.
Pakai (Paket Utama)
Tailwind CSS Animation
Interaksi hover, utilitas dasar, durasi, dan konfigurasi kurva Bezier.
Sempurna. Tidak ada overhead JS.
Pakai (Paket Dasar)
React CountUp
Animasi perhitungan angka KPI.
Tinggi. Mudah dipadukan dengan hook.
Pakai (Opsional)
GSAP
Garis waktu rumit, scrollytelling, WebGL.
Sedang. Sering berbenturan dengan state React.
Hindari
Animate.css
Prototipe cepat berbasis kelas generik.
Rendah. Tumpang tindih dengan utilitas Tailwind.
Hindari
Lottie
Menampilkan animasi vektor (After Effects).
Tinggi, namun ukuran payload JSON besar.
Hindari
React Spring
Simulasi fisika kompleks untuk animasi.
Tinggi. Namun redundant karena ada Motion.
Hindari

5.1 Framer Motion / Motion (Direkomendasikan)
Pustaka ini, yang sebelumnya dikenal luas sebagai framer-motion, baru-baru ini telah melakukan rebranding dan pemisahan arsitektur menjadi paket independen dengan nama motion2. Penting bagi pengembang untuk memahami bahwa perintah instalasi yang benar kini adalah npm install motion, dan cara pemanggilannya di dalam React diubah menjadi import { motion, AnimatePresence } from "motion/react"2.
Paket ini direkomendasikan sebagai paket utama untuk E-Matelik karena kemampuannya yang tak tertandingi dalam menangani siklus hidup React. Fitur seperti <AnimatePresence> sangat krusial untuk menganimasikan elemen keluar dari DOM (seperti menutup modal atau menghapus laporan dari layar) tanpa langsung terpotong oleh sistem React. Fitur layoutId memungkinkan orkestrasi transisi mulus dari satu komponen ke komponen lain18, misalnya memperbesar foto telabah dari kisi menjadi tampilan layar penuh. Meskipun kuat, paket ini telah mendukung proses tree-shaking (membuang kode tak terpakai dari bundel produksi) dan otomatis menyesuaikan dengan preferensi aksesibilitas gerakan dari pengguna5. Kompatibilitasnya dengan Tailwind dan Inertia.js membuatnya menjadi fondasi yang sempurna untuk operasi logika UI kompleks.
5.2 GSAP (GreenSock Animation Platform)
GSAP adalah pustaka industri standar untuk pergerakan scrollytelling yang sangat berat dan kompleks. Walaupun sangat powerful, pengaplikasiannya di E-Matelik akan menjadi sebuah antipola (anti-pattern). Desain imperatif GSAP seringkali tidak selaras dengan arsitektur deklaratif React, yang memicu kerumitan saat disandingkan dengan proses pembaharuan komponen (re-render)2. GSAP sangat menambah beban muatan paket (bundle size) dan membutuhkan kurva pembelajaran yang curam. Mengingat karakter operasional MVP E-Matelik yang menuntut kejelasan informasi dan bukan pameran efek visual sinematik, GSAP harus dihindari.
5.3 Animate.css
Pustaka ini menyediakan serangkaian kelas utilitas animasi statis. Meskipun mudah diaplikasikan, penggunaannya di era aplikasi React modern sering kali menghasilkan kualitas antarmuka yang usang (outdated) dan tidak organik. Selain itu, kelas-kelas di Animate.css akan sangat tumpang tindih dan berbenturan dengan arsitektur utilitas Tailwind CSS. Oleh karena itu, pustaka ini terbukti tidak cocok untuk E-Matelik.
5.4 Tailwind CSS Animation (Direkomendasikan)
Bukan berbentuk pustaka eksternal yang menambah beban bundle size, Tailwind memanfaatkan kapabilitas CSS bawaan. Melalui tailwind.config.js, pengembang dapat menulis konfigurasi keyframes buatan khusus (misalnya pulsate) dan kurva Bezier (transition-timing-function)3. Hal ini sangat vital bagi MVP E-Matelik untuk menata kelas hover, transisi status, pemuatan kerangka data (animate-pulse), dan efek radar denyut penanda peta (animate-ping) yang dieksekusi murni pada level peramban, menghemat siklus komputasi React. Ini adalah tulang punggung animasi sistem.
5.5 React CountUp / Number Animation
Untuk meningkatkan persepsi presisi dalam laporan statistik E-Matelik, modul metrik dapat menggunakan react-countup14. Pustaka ini memfasilitasi pembuatan angka yang bergulir maju dengan cepat saat pertama kali dirender di Dasbor Admin atau Publik. Perintah instalasinya adalah npm install react-countup, dan pustaka ini menawarkan fitur kait (hook) useCountUp yang berjalan sangat efisien14. Meskipun tidak secara mutlak memblokir fungsionalitas aplikasi, mengimplementasikan modul ini sangat direkomendasikan untuk menunjang kesan sistem pemantauan analitik tingkat lanjut.
5.6 Lottie & 5.7 React Spring
Lottie merupakan perender animasi berbasis data JSON. Walaupun indah, penggunaan aset vektor bergaya ilustrasi yang berputar konstan akan mengurangi bobot keandalan sistem administratif (terkesan terlalu dekoratif) dan harus dihindari untuk mempertahankan karakter UI yang membumi. Di sisi lain, React Spring menawarkan pendekatan animasi berbasis fisika matematis. Namun, karena paket motion telah mengemban tugas animasi utama dan menyertakan algoritma tipe spring bawaannya sendiri, menambahkan React Spring hanya akan menambah muatan bundel secara tidak perlu.
6. Recommended Animation Stack
Berdasarkan tinjauan di atas, tiga skenario tumpukan animasi dapat diajukan untuk E-Matelik:
Option A: Minimal & Safe (Hanya Tailwind CSS)
Opsi ini tidak menggunakan dependensi Javascript eksternal. Semua transisi dan keyframes ditulis sepenuhnya dalam kelas utilitas Tailwind. Pendekatan ini ditujukan bagi tim dengan kendala ukuran bundel yang amat ekstrem. Kelebihannya adalah kecepatan maksimal dengan tanpa biaya performa tambahan. Kekurangannya adalah kelemahan mutlak dalam mengatur transisi komponen yang menghilang dari DOM React (misalnya, kotak pemberitahuan atau modal tidak dapat perlahan memudar keluar saat ditutup).
Option B: Recommended (Motion + Tailwind CSS + Inertia Native API) Kombinasi ini menduduki titik eksekusi paling rasional untuk arsitektur React-Inertia-Tailwind. Tailwind CSS berfungsi mendelegasikan semua status interaksi level-rendah (hover, focus, penanda peta) ke dalam ranah CSS murni untuk ketangkasan perenderan GPU7. Paket motion/react mengambil alih kendali struktural tingkat menengah untuk menyelenggarakan animasi masuk halaman (entrance), elemen bertumpuk, perlindungan siklus unmount (AnimatePresence), dan pergeseran dimensi otomatis (layoutId) yang tak mampu dilakukan CSS statis2. View Transitions API bawaan Inertia.js dapat diaktifkan sebagai sokongan tambahan pada tingkat makro routing jika peramban pengguna mendukungnya16.
Option C: Advanced (Motion + GSAP)
Skenario berat di mana GSAP digunakan untuk menceritakan kondisi geografis sambil menggulir secara sinematik. Pendekatan ini memakan biaya dan waktu pengembangan yang sangat besar serta rentan memunculkan eror integrasi dengan Leaflet dan status internal React. Opsi ini sama sekali tidak cocok dan tidak disarankan.
Rekomendasi Final MVP: Terapkan Option B. Opsi ini menjamin stabilitas struktural, menghormati karakter desain yang membumi, mengisolasi beban animasi agar tidak memengaruhi komponen Leaflet, serta memperkuat sinyal urgensi secara arsitektural tanpa modifikasi yang membengkak.
7. Page-by-Page Animation Plan
Guna memastikan harmoni visual di seluruh aspek E-Matelik, penerapan animasi harus dipetakan per modul halaman. Tabel berikut merinci elemen, tindakan animasi yang dirancang, serta rekomendasi efek teknis.

Halaman
Elemen Target
Rencana Animasi & Rekomendasi Efek
7.1 Landing Page
Hero Section, Headline, Subheadline, CTA
Gunakan orkestrasi staggered hero content (fade-in-up bertahap). Headline muncul pertama, diikuti deskripsi, lalu tombol. Jarak waktu antar elemen 100ms.


Fitur Cards & Preview Peta
Soft section reveal menggunakan whileInView9. Card hover lift melalui Tailwind (hover:-translate-y-1 hover:shadow-lg).
7.2 Dashboard Publik
Kartu KPI & Daftar Laporan
Angka pada KPI memakai KpiCountUp14. Pemuatan data direpresentasikan oleh kelas Tailwind animate-pulse (skeleton membumi)3.


Peta Publik (WebGIS)
Transisi ubin dan penanda bawaan Leaflet CSS. Animasi JavaScript eksternal sama sekali dilarang agar fungsi perbesaran cepat tidak rusak1.
7.3 Dashboard Pelapor
Ringkasan & Card Laporan
Kartu laporan individual muncul menyembur dengan halus memakai Staggered Reveal untuk menghadirkan kesan kemajuan pelaporan dari waktu ke waktu2.


Status & Tombol Buat Laporan
Tombol pengajuan memanfaatkan perubahan bayangan (shadow) kedalaman pada interaksi klik dan hover untuk respons taktil langsung.
7.4 Form Laporan
Form Section & Map Picker
Transisi lateral dengan motion (geser perlahan 15px dari kiri) antarlangkah form. Ini tidak akan membebani input teks pengguna24.


Upload Evidence
Indikator loading melingkar yang ringkas dan memudar masuk saat foto disimpan ke dalam database, mencegah input ganda.
7.5 Detail Laporan
Histori Timeline & Galeri Bukti
Area yang menjadi penekanan kuat untuk transisi dimensi. Memanfaatkan layoutId dari motion agar thumbnail bukti kerusakan mengembang tanpa putus membesar menjadi dialog modal [closed-loop evidence]18. Lini masa muncul bergiliran seiring gulir halaman.
7.6 Dasbor Pekaseh
Backlog Card & Urgency Badge
Laporan dengan tingkat darurat infrastruktur akan memiliki cincin indikator berkedip ringan (pulse)3. Ini menyoroti kewaspadaan. Saat verifikasi selesai diproses, kartu akan menghilang mulus menggunakan exit (AnimatePresence) sementara kartu di bawahnya naik menutup rongga (layout transition)25.
7.7 Dashboard Admin
Tabel Data & Filter Proses
Transisi fade yang sangat singkat dan utilitarian untuk seluruh tabel. Baris per baris tidak perlu dianimasikan karena administrator membutuhkan percepatan pembacaan (data density) untuk memproses ratusan data agregat.
7.8 Map Page
Marker, Popup, Panel Filter
Penanda laporan "Kritis" dipasangi elemen divHTML statis berkekuatan animate-urgent-pulse yang dirender L.divIcon12. Kemunculan panel saringan menu diseret (sliding out) dari samping layar menggunakan utilitas transisi letak CSS bawaan.

8. Animation Components to Build
Dalam ekosistem pengembangan React, membuat komponen yang dapat digunakan ulang (reusable components) adalah kunci untuk menjaga agar codebase tetap teratur dan mencegah Codex menulis logika pergerakan sembarangan (random transitions) di setiap berkas. Daftar komponen wajib dan opsional ini telah disesuaikan agar Codex dapat memelihara kode yang bersih.

Nama Komponen
Tujuan & Fungsi Utama
Props Penting
Halaman Penggunaan & Status
<FadeIn>
Utilitas pembungkus dasar untuk memberikan efek memudar statis pada teks deskriptif atau elemen UI generik.
duration, delay, children
Detail laporan, blok paragraf umum (Wajib).
<FadeInUp>
Membawa elemen dari posisi bawah (offset 16px) menuju posisi aslinya seraya memudar, memberi kesan elegan dan terstruktur.
yOffset, duration, children
Hero section, modal konfirmasi, pesan peringatan (Wajib).
<StaggerContainer>
Berfungsi sebagai pengelola antrean penundaan, memerintahkan anak komponennya untuk memudar masuk satu per satu.
staggerDelay, children
Semua daftar kartu di dasbor (Wajib)2.
<StaggerItem>
Merupakan pasangan iterasi bagi Container di atas, memuat logika posisi dasar yang diikatkan ke induk.
children
Daftar Laporan Pelapor, Daftar Antrean Pekaseh (Wajib).
<MotionCard>
Sebuah wadah generik penyajian konten yang telah dipasangi logika batas hover lift dan layout shift detection otomatis.
layoutId, onClick, children
Galeri foto, Kartu Laporan Utama (Wajib).
<PageTransition>
Pembungkus akar (root wrapper) untuk integrasi dengan tata letak transisi tingkat-rute jika Inertia View Transitions dimatikan.
children, animationType
Layout Utama Aplikasi (Opsional).
<SectionReveal>
Memanfaatkan whileInView untuk membangkitkan elemen yang muncul akibat perilaku gulir di Landing Page.
viewportOffset, children
Landing Page, modul penceritaan (Wajib)9.
<KpiCountUp>
Komponen pintar untuk memproses dan menganimasikan format angka analitik menjadi pergerakan perhitungan maju yang mulus.
endValue, prefix, suffix
Dasbor Admin, Dasbor Publik (Opsional, tapi disarankan)14.
<PulseMarker>
Fungsi pembuat markup string HTML (bukan dirender React langsung) untuk diinjeksi ke penanda urgensi Leaflet.
color, size, pulseStrength
Halaman WebGIS Penuh (Wajib)12.
<SkeletonBlock>
Kotak netral berkedip perlahan yang digunakan sebelum data asli diterima dari permintaan basis data.
width, height, roundedClass
Semua Dasbor pada tahap awal pemuatan informasi (Wajib)3.

9. Implementation Guide for Codex
Bagian panduan teknis ini dirancang sebagai instruksi eksplisit untuk agen rekayasa kecerdasan buatan (Codex). Instruksi ini akan membimbing asisten koding agar modifikasi pada pohon kode tidak merusak stabilitas sistem yang ada dan mematuhi batas-batas kebudayaan tata UI Subak.
9.1 File yang Mungkin Perlu Dibuat
Lokalisasi logika pengaturan animasi dalam tatanan proyek harus dijaga kerahasiaannya di dalam direktori Components/Motion. Codex diperintahkan untuk menginisiasi skrip berikut:
resources/js/Components/Motion/FadeIn.jsx
resources/js/Components/Motion/FadeInUp.jsx
resources/js/Components/Motion/StaggerContainer.jsx
resources/js/Components/Motion/StaggerItem.jsx
resources/js/Components/Motion/MotionCard.jsx
resources/js/Components/Motion/KpiCountUp.jsx
resources/js/Components/Motion/SkeletonBlock.jsx
resources/js/hooks/usePrefersReducedMotion.js (Membungkus utilitas aksesibilitas dari paket motion).
resources/js/lib/motionPresets.js (Sebagai sumber kebenaran tunggal untuk pengaturan waktu dan variabel kelengkungan Bezier).
9.2 File yang Mungkin Perlu Dimodifikasi
Codex akan menyesuaikan diri dengan arsitektur proyek aktual, namun secara fundamental, intervensi harus menargetkan berkas-berkas pengontrol antarmuka:
Berkas Lingkungan dan Global: tailwind.config.js (Penyematan timing function khusus dan utilitas keyframes pulse darurat)6.
Halaman Antarmuka: Pengaturan layout utama untuk rute inersia, komponen halaman mendarat (landing page), dasbor pelapor, Pekaseh, admin, detail laporan, dan elemen bentuk isian (form).
Komponen UI Individual: Modifikasi terhadap komponen statis seperti kartu laporan, baris tabel, lencana prioritas prioritas laporan (badge status), dan panel pengatur WebGIS.
Eksekusi Peta Leaflet: Mengubah pengolah API di halaman WebGIS yang mengatur injeksi kelas pada antarmuka peta menjadi statis, menjauhkan operasi render dari status React1.
9.3 Install Command
Agar ekosistem yang dibahas di atas siap pakai, instruksikan terminal proyek untuk menarik pustaka dengan versi mutakhir menggunakan Node Package Manager. Jangan menebak dependensi. Lakukan hanya instalasi berdasarkan perintah tervalidasi ini:



Bash
npm install motion react-countup react-intersection-observer


(Perhatian: Jangan menggunakan penamaan usang framer-motion dalam lingkungan versi baru).2.
9.4 Coding Pattern (Pedoman Pola Penulisan)
Codex, seluruh blok kode yang dibuat harus mematuhi aturan operasional berikut:
Konsistensi Preset: Kode variasi transisi seperti transition={{ duration: 0.5 }} tidak boleh tersebar bebas secara acak di sembarang fail (hardcoded). Seluruh properti transisi harus ditarik dari berkas motionPresets.js.
Keamanan Visceral: Wajib untuk membungkus pengembalian nilai pergerakan tinggi dengan pemeriksaan terhadap nilai variabel yang dihasilkan oleh prefers-reduced-motion. Jangan paksa pengguna menghadapi gerakan ekstrem5.
Optimalisasi Reveal: Properti pengungkapan gulir halaman yang dibangun memakai API motion harus secara mutlak disertai dengan viewport={{ once: true, amount: 0.2 }} agar elemen yang telah dibuka tetap terkunci di layar dan tidak membebani komputasi ulang pengamat silang (Intersection Observer)9.
Hormati Leaflet: Dilarang menggunakan parameter render atau modifikasi tata ukuran React JavaScript yang ditumpukkan ke objek marker DOM milik pustaka peta Leaflet. Operasi berlebihan akan mengakibatkan kegagalan kanvas dan pengguliran gambar. Menganimasikan peta dilakukan 100% menggunakan properti penyebaran elemen CSS divIcon secara manual12.
Pergeseran Nol (Zero Layout Shift): Cegah penggunaan animasi modifikasi ukuran langsung (seperti penganimasian piksel di height dan width) untuk menghindari perombakan batas (layout thrashing). Selalu mendelegasikan manipulasi dimensi kompleks ke fungsi under-the-hood milik layoutId4.
10. Motion Preset Recommendation
Untuk memberikan rasa yang kohesif pada interaksi aplikasi E-Matelik—rasa yang mewakili kekuatan birokrasi Subak yang membumi, kuat, dan responsif—berikut adalah rancangan arsitektur pengaturan kustom untuk pustaka animasi React dan CSS (melalui fail konfigurasi pusat).
Buatlah berkas konfigurasi tersentralisasi:



JavaScript
// resources/js/lib/motionPresets.js

// Kurva akselerasi identitas E-Matelik: Halus, membumi, dan tidak terpental.
export const matelikEasing = [0.16, 1, 0.3, 1]; // Custom ease-out
export const matelikTransition = { duration: 0.4, ease: matelikEasing };

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: matelikTransition 
  },
};

// Jarak pergerakan disetel sangat minim (16px) untuk mempertahankan keanggunan.
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: matelikTransition,
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: matelikTransition,
  },
};

export const scaleIn = {
  // Tidak bermula dari 0 untuk mencegah distorsi elemen yang terlalu ekstrem.
  hidden: { opacity: 0, scale: 0.96 }, 
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...matelikTransition, duration: 0.3 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda penundaan dinamik berjarak pendek.
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: matelikTransition,
  },
};

// Prasetel Transisi Antarmuka Galeri Bukti Laporan (Modal Motion)
export const modalMotion = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: matelikTransition },
  // Transisi eksit (keluar) diatur menggunakan pola ease-in agar lebih mulus saat menghilang
  exit: { opacity: 0, scale: 0.98, y: 10, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }, 
};


Pada tataran CSS untuk elemen yang memanggil transisi statis (seperti tombol dan peta darurat), perluasan di dalam konfigurasi Tailwind diwajibkan:



JavaScript
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      transitionTimingFunction: {
        'matelik': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // Penanda khusus untuk tingkat pelaporan kasus bencana parah
      animation: {
        'urgent-pulse': 'urgentPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        urgentPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.5', transform: 'scale(1.25)' },
        }
      }
    }
  }
}


11. Accessibility & Reduced Motion
Aplikasi yang melayani spektrum masyarakat luas—dari petani muda yang paham teknologi hingga pemangku adat (Pekaseh) yang lebih tua—harus memprioritaskan prinsip inklusivitas dan aksesibilitas. E-Matelik harus mempertimbangkan kerentanan sebagian demografi pengguna terhadap ketidaknyamanan fisik (seperti rasa pusing, mual, atau disorientasi spasial) yang diakibatkan oleh pergeseran paralelisme yang berulang-ulang, ilusi paralaks berat, atau pergerakan layang yang berpotensi memicu mabuk visual (motion sickness).
Implementasi Sistem Aksesibilitas
Pendeteksian lingkungan perangkat pengguna menjadi garda pertama. Semua efek makro, khususnya pergeseran penempatan DOM secara drastis, harus tunduk pada fitur preferensi sistem prefers-reduced-motion. Pustaka motion dirancang dengan fitur keselamatan tersembunyi yang akan mempercepat siklus animasi hingga batas .001 detik secara otomatis saat preferensi ini bernilai benar (aktif), yang pada praktiknya menjadikan perpindahan berwujud instan tanpa menunda eksekusi kode internal5.
Seluruh implementasi animasi harus memiliki rencana mundur (fallback) operasional. Pengguna dilarang kehilangan wawasan kognitif dari pesan kritis apabila animasi dimatikan. Contoh paling menonjol berada di atas modul WebGIS: bilamana laporan berstatus "kritis" menggunakan lapisan detak CSS, fallback desain untuk aksesibilitas wajib menggunakan warna merah terang dengan penanda bingkai ganda statis—sehingga tanpa memerlukan gerak sama sekali, signifikansi tingkat darurat di wilayah Subak tersebut tersampaikan dengan tegas13. Pada perangkat genggam, aksi pergerakan perantaraan mouse (seperti fitur hover-lift) seringkali tertunda atau tidak berfungsi semestinya. Modifikasi visual akibat keadaan interaksi ini dapat dinegasikan melalui pendekatan sintaks pembatas Tailwind, seperti memanfaatkan rantai pemilih hover:md:translate-y-0, demi mencegah tumpang tindih elemen sentuh pada peramban seluler.
Contoh implementasi pemeriksaan lingkungan ini diwujudkan dengan hook rekayasa yang dikembangkan pada kerangka React:



JavaScript
// resources/js/hooks/usePrefersReducedMotion.js
import { useReducedMotion } from 'motion/react';

export function useSafeMotion() {
    const shouldReduceMotion = useReducedMotion();
    
    return {
        // Mengembalikan nilai benar jika preferensi pengurangan pergerakan diset oleh perangkat
        shouldReduceMotion,
        
        // Memaksa pengabaian transisi
        getSafeTransition: (customTransition) => 
            shouldReduceMotion ? { duration: 0 } : customTransition
    };
}


12. Performance Guidelines
Kestabilan bingkai penyajian (frame rate rendering) perangkat keras berada di urutan teratas dalam prioritas operasional E-Matelik. Pergerakan yang lambat atau tersendat akan menggerus wibawa dari perangkat lunak yang diandalkan oleh sistem administrasi institusional desa. Kinerja web modern menuntut pengembang memahami perbedaan mendasar antara menganimasikan properti struktural DOM dan properti percepatan grafis (hardware acceleration).
Mengubah dimensi properti seperti height, width, margin (top, left), serta jarak (padding) secara konstan memicu browser layout engine bekerja secara sekuensial yang merombak ulang posisi dan penempatan setiap elemen di seluruh halaman—gejala destruktif ini dikenal sebagai Layout Thrashing. Guna menangkal kondisi tersebut, E-Matelik menetapkan pedoman kinerja berikut:
Percepatan Grafis: Segala wujud penyematan pergerakan visual pada lapisan kelas Tailwind harus dibatasi dengan ketat hanya pada manipulasi CSS transform (yang mencakup scale, translate, rotate) serta properti intensitas opacity4. Jika ada elemen, semisal bingkai panel laporan pelapor, yang mengharuskan peregangan skala non-ortodoks, hal tersebut tidak boleh diproses secara mandiri oleh kode intervensi ukuran. Momen tersebut sepenuhnya dikendalikan oleh algoritma pengatur layoutId dari dalam modul paket motion untuk mitigasi layout thrashing18.
Kanvas Leaflet Terisolasi: Menyebarkan ratusan penanda gangguan telabah di atas peta satelit berisiko menyita alokasi daya siklus mesin penggambar kanvas ganda (double-buffering engine). Jauhkan rantai komponen simpul dari motion serta modifikasi siklus state berulang (re-render React loop) untuk menghidupkan animasi penanda di atas struktur geografi. Penyelenggaraan indikator urgensi marker pulse dijalankan seketika (fire-and-forget) melalui injeksi tata rias murni kelas CSS pada kerangka bawaan Leaflet L.divIcon. Ini menyelaraskan pergerakan sepenuhnya dengan operasi latar CPU klien3.
Prioritas Pemuatan (Lazy Loading): Pemuatan gambar peninjauan ukuran besar (seperti foto beton irigasi hancur pada laporan) yang digabungkan dengan manipulasi pergerakan shared layout, secara operasional menuntut pemakaian memori sementara. Oleh karena itu, semua elemen dasbor berat akan mendahulukan blok pemuatan kerangka (skeleton block loading) minimalis; pergerakan animasi sebenarnya baru dikonfigurasi untuk tereksekusi pada saat respons koneksi jaringan menyatakan status diam atau terselesaikan (resolved).
13. Effects to Avoid
Sistem administrasi persawahan ekologis menolak segala unsur visual yang menurunkan tingkat kelaikan formal perangkat lunaknya. Pendekatan pergerakan "Calm by identity" (Karakteristik Tenang) akan hancur dan terganggu manakala beberapa jenis animasi berikut lolos uji pengembangan (quality assurance).
Pantulan Ekstrem (Bouncy/Elastic Physics): Integrasi simulasi pegas dengan perhitungan kurva gaya gravitasi melenting—seperti yang dominan pada model aplikasi permainan digital (gamifikasi)—akan merusak narasi dan beban tanggung jawab penanganan masalah struktural irigasi. Laporan masalah krisis tidak boleh melompat-lompat dengan ceria.
Kemiringan Dinamis Tiga Dimensi (Heavy 3D Tilt & Parallax): Pendekatan yang mendistorsi posisi Z-Axis melalui paralaks yang lambat, menstimulasikan kesan elemen melayang saat digulir. Ini mengaburkan nilai ruang dan spasial yang vital saat meninjau titik buta krisis sumber daya air di atas peta.
Pendaran Metalik Keras (Harsh Shimmer/Flash): Ketika menunggu penyatuan koneksi, indikator yang melintasi area kosong dengan pantulan warna perak/putih berkilau (shimmer ekstrem) terasa usang, tajam, dan memusingkan. Alternatif estetika yang jauh lebih menenangkan adalah pulsa kepekatan warna netral dari modul kelipan halus animate-pulse dari Tailwind3.
Pengulangan Otomatis Berkelanjutan (Autoplay Chaos): Penempatan dekorasi melingkar berulang (loop animation) di luar dari pemberitahuan indikator "Memuat" (loader) atau peringatan titik kritis "Tingkat Merah", akan mendisrupsi atensi operator (Pekaseh) saat melakukan tinjauan saringan tabel analitik yang padat. Transisi lambat—animasi yang menyandera interaksi lebih dari standar durasi rasional (di atas 500 milidetik)—turut dianggap merugikan dan membangkitkan persepsi kualitas perangkat lunak kategorial murah (laggy illusion).
14. Final Recommendation
Rekonstruksi komprehensif atas tata letak teknis menyimpulkan bahwa rancangan tumpukan arsitektur eksekusi (Animation Stack) untuk WebGIS E-Matelik bersandar pada kolaborasi dari dua ekosistem yang teruji waktu: Tailwind CSS sebagai infrastruktur tulang punggung tingkat mikro, diselaraskan dengan paket pustaka motion untuk menyelenggarakan orkestrasi DOM dekoratif terkomputasi2. Paket berat tak fungsional seperti GSAP, Animate.css, dan aset manipulatif Lottie tidak dianjurkan.
Skenario pengembangan arsitektur dan penulisan skrip diserahkan kepada agen integrasi pengkabelan kode (Codex) yang dieksekusi mengikuti rangkaian prosedur urutan pembangunan berlapis (Phased Implementation Strategy) sebagai berikut:
Phase 1 - Motion Foundation
Fase ini berfokus pada pemasangan instalasi sistem pusat.
Menggunakan pengelola paket yang relevan, instal motion, react-intersection-observer, serta react-countup pada rantai dependencies utama2.
Mengembangkan ekosistem profil variabel di dalam pengaturan bawaan konfigurasi tailwind.config.js yang mengakomodasi durasi pusat serta penyematan varian kurva perhitungan Bezier yang lebih alami.
Menciptakan pustaka inti motionPresets.js dan segera mengeksekusi kelas-kelas rekayasa kerangka penampung modular seperti <FadeIn>, <FadeInUp>, hingga implementasi khusus kotak transisi muatan <SkeletonBlock>. Termasuk menyempurnakan kait pelindung reduced motion (Aksesibilitas).
Phase 2 - Landing Page & Dashboard Publik
Fase kedua berekspansi menuju modul antarmuka komersial dan transparansi warga.
Memasukkan intervensi eksekusi fungsi pengungkapan berurutan (staggered reveal) ke dalam kawasan konten selamat datang (hero animation).
Menghidupkan utilitas fungsi pemantau visibilitas whileInView di area penjelajahan saringan cuplikan (mockup map preview) agar bagian tersebut bereaksi anggun tanpa perulangan komputasi memori.
Memasang algoritma gerak penghitung agregasi KpiCountUp pada statistik ringkasan masyarakat luas14, serta memodifikasi seluruh jajaran tautan agar membangkitkan impresi interaksi bayangan peninggian halus (card hover).
Phase 3 - Internal Dashboard
Fase ini dikhususkan untuk membangun sistem inti pada manajemen administratif harian.
Merangkai kerangka arsitektur logis <StaggerContainer> untuk menerjemahkan kemunculan deretan kartu laporan warga di panel Pelapor maupun penyajian struktur tumpukan verifikasi ganda (backlog overload) di panel kontrol Pekaseh.
Penerapan transisi status operasional yang mulus saat komponen dihapus. Saat pelaporan dituntaskan dan kartu dipindahkan dari tabel (unmount), kartu di bawahnya naik menutup struktur pergeseran yang hilang, bebas sentakan, menutupi kecacatan bingkai.
Mensinergikan peranti penyamaan dimensi (shared layoutId variable mapping) pada komponen jendela rincian pratinjau bukti fotorealistik, agar thumbnail membesar secara terorganisasi menuju penampil dimensi tunggal18.
Phase 4 - Map & Urgency Layer
Di fase krusial ini, sistem beralih pada perlakuan pemantauan infrastruktur topografi pengairan.
Menyebarkan blok pemisahan sistem darurat, menganimasikan kelas HTML string rekaan penanda urgensi CSS secara independen untuk dipanggil melalui L.divIcon tanpa menginterupsi kinerja Leaflet12.
Menampilkan sorotan kotak informasi detail lokasi (popup reveal) di titik lokasi secara pudar setelah interaksi penggeseran kordinat usai.
Phase 5 - Polish & QA (Quality Assurance)
Di titik paripurna ini, prioritas adalah peninjauan akhir operasionalitas.
Pemastian bahwasannya kode instruksi pada kait prefers-reduced-motion berhasil menangkap gelombang preferensi pengguna, menggagalkan pemicu efek visual5.
Menyelidiki kelemahan hover loop atau tumpang tindih elemen tap geser untuk operasi di perangkat ponsel.
Menganalisa integritas memori terhadap potensi kebocoran proses rendering (re-render leakage) agar antarmuka senantiasa bersinar secara organik, profesional, serta memastikan animasi E-Matelik menunaikan tujuannya sebagai pelacak sistem ekologi irigasi Subak sejati; tidak pernah berlebihan, namun lugas berbunyi pada porsi kepentingannya.
Dokumen Animation Research & Implementation Guide for E-Matelik ini merupakan fondasi struktural cetak biru terperinci yang dipersiapkan secara holistik agar agen penyedia koding tingkat lanjut (Codex) dapat menerjemahkan falsafah kesunyian yang tangkas ini menjadi realitas produk teknologi fungsional dan berkelanjutan.
Works cited
Leaflet - a JavaScript library for interactive maps, https://leafletjs.com/
Motion for React: Get started - React Animation Library - Motion.dev, https://motion.dev/docs/react
Transitions & Animation - Tailwind CSS, https://tailwindcss.com/docs/animation
Transitions | Tailwind - Steve Kinney, https://stevekinney.com/courses/tailwind/tailwind-transition
thedotmack/framer-motion-animations - GitHub, https://github.com/thedotmack/framer-motion-animations
transition-timing-function - Transitions & Animation - Tailwind CSS, https://tailwindcss.com/docs/transition-timing-function
Tailwind CSS Transitions Guide: Duration, Easing, Delay - Unwired Learning, https://unwiredlearning.com/blog/tailwind-transitions-guide
Transition Property - Tailwind CSS, https://v3.tailwindcss.com/docs/transition-property
Framer Motion React Animations: Complete Guide - Refine, https://refine.dev/blog/framer-motion/
React Intersection Observer vs Native API: Complete Guide - Zoer.ai, https://zoer.ai/posts/zoer/react-intersection-observer-vs-native-api
Lazy-Load Videos in Next.js Pages - Cloudinary, https://cloudinary.com/blog/lazy-load-videos-in-next-js-pages
Animating Leaflet Markers (the hacky way) - Commented, https://piratefsh.github.io/how-to/2015/10/16/animating-leaflet-markers.html
Pulsating Leaflet marker using CSS3 animations - Stack Overflow, https://stackoverflow.com/questions/31961549/pulsating-leaflet-marker-using-css3-animations
react-countup - NPM, https://www.npmjs.com/package/react-countup
Optimizing Render Performance in React with Hooks: A Deep Dive into useMemo and useCallback | HackerOne, https://www.hackerone.com/blog/optimizing-render-performance-react-hooks-deep-dive-usememo-and-usecallback
View Transitions - Inertia.js Documentation, https://inertiajs.com/docs/v2/the-basics/view-transitions
Links - Inertia.js Documentation, https://inertiajs.com/docs/v3/the-basics/links
Layout Animation | React FLIP & Shared Element - Motion.dev, https://motion.dev/docs/react-layout-animations
How I Use Shared Layout Animations, https://jakub.kr/work/shared-layout-animations
Everything about Framer Motion layout animations - The Blog of Maxime Heckel, https://blog.maximeheckel.com/posts/framer-motion-layout-animations/
Framer Motion - web design and AI dictionary from Framer, https://www.framer.com/dictionary/framer-motion
Motion v. Framer Motion : r/reactjs - Reddit, https://www.reddit.com/r/reactjs/comments/1ij6xuh/motion_v_framer_motion/
transition-property - Transitions & Animation - Tailwind CSS, https://tailwindcss.com/docs/transition-property
Optimizing React Performance: Custom Debounce Hook with useCallback - Medium, https://medium.com/@markovsve/optimizing-react-performance-custom-debounce-hook-with-usecallback-8d841fee6615
Animate Elements When Their Layout Changes with Framer Motion layoutId - Egghead.io, https://egghead.io/lessons/react-animate-elements-when-their-layout-changes-with-framer-motion-layoutid
The Complete Guide to Video Optimization in Next.js - ImageKit, https://imagekit.io/blog/nextjs-video-optimization/
React Hooks: TypeScript SDKs with TanStack React Query Support - Speakeasy, https://www.speakeasy.com/blog/release-react-hooks
