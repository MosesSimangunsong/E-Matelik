import PublicReportsSection from '@/Components/public/PublicReportsSection';
import {
    fadeIn,
    fadeInUp,
    scaleIn,
    staggerContainer,
    staggerItem,
} from '@/lib/motionPresets';
import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const workflowSteps = [
    {
        id: 'capture',
        label: 'Laporan dibuat dari titik lokasi',
        eyebrow: 'Step 01',
        description:
            'Pelapor atau petugas Matelik mengirim sinyal awal dari lokasi telabah dengan koordinat yang terikat ke konteks Subak.',
        emphasis: 'Lokasi menjadi jangkar administratif awal.',
        chips: ['Koordinat terikat', 'Subak terkait', 'Timestamp server'],
    },
    {
        id: 'evidence',
        label: 'Bukti awal dikirim',
        eyebrow: 'Step 02',
        description:
            'Foto bukti dan keterangan lapangan membantu memisahkan laporan yang masih umum dari kasus yang sudah punya konteks visual yang cukup.',
        emphasis: 'Bukti awal memperkuat kualitas verifikasi.',
        chips: ['Foto awal', 'Deskripsi singkat', 'Sinyal prioritas'],
    },
    {
        id: 'verify',
        label: 'Pekaseh memverifikasi',
        eyebrow: 'Step 03',
        description:
            'Pekaseh tetap menjadi pintu awal yang menentukan apakah laporan valid, perlu klarifikasi, atau perlu koordinasi administratif lanjutan.',
        emphasis: 'Sistem mendukung otoritas Pekaseh, bukan menggantikannya.',
        chips: ['Validasi awal', 'Catatan verifikasi', 'Identitas pelapor'],
    },
    {
        id: 'track',
        label: 'Status administratif dilacak',
        eyebrow: 'Step 04',
        description:
            'Setelah diverifikasi, laporan tetap dapat dipantau melalui status administratif yang jelas sehingga tidak hilang di tengah proses tindak lanjut.',
        emphasis: 'Status adalah jejak proses, bukan keputusan sosial final.',
        chips: ['Diverifikasi', 'Diekskalasi', 'Selesai'],
    },
    {
        id: 'closure',
        label: 'Bukti penyelesaian ditambahkan',
        eyebrow: 'Step 05',
        description:
            'Dokumentasi after-action menjaga closed-loop evidence tetap utuh agar penyelesaian lapangan tidak berhenti di klaim verbal saja.',
        emphasis: 'Penyelesaian tetap kembali ke bukti.',
        chips: ['Resolution note', 'Foto penyelesaian', 'Histori lengkap'],
    },
];

const featureGroups = [
    {
        title: 'Bukti geospasial yang membumi',
        body: 'Koordinat, titik patroli, dan foto membantu laporan tetap dekat dengan realitas lapangan, bukan sekadar teks.',
    },
    {
        title: 'Verifikasi Pekaseh sebagai pintu awal',
        body: 'Keputusan administratif awal tetap berada pada Pekaseh sehingga alur digital menghormati mekanisme Subak.',
    },
    {
        title: 'Tracking proses yang tidak mudah hilang',
        body: 'Status, histori, dan bukti penyelesaian menjaga laporan tetap terlihat sampai benar-benar ditindaklanjuti.',
    },
];

function HeroVisual({ shouldReduceMotion }) {
    const pulseClass = shouldReduceMotion ? '' : 'animate-urgent-pulse';

    // return (
    //     <div className="public-surface public-subtle-grid relative overflow-hidden px-6 py-6 sm:px-7 sm:py-7">
    //         <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-secondary-200/35 blur-3xl" />
    //         <div className="absolute bottom-0 left-6 h-24 w-24 rounded-full bg-primary-500/10 blur-3xl" />

    //         {/* <div className="relative grid gap-4">
    //             <div className="flex items-center justify-between">
    //                 <div>
    //                     <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-700">
    //                         Monitoring Telabah
    //                     </p>
    //                     <p className="mt-2 text-sm text-neutral-600">
    //                         WebGIS pelaporan, verifikasi, dan tracking administratif.
    //                     </p>
    //                 </div>
    //                 <div className="rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
    //                     Internal Subak
    //                 </div>
    //             </div>

    //             <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
    //                 <div className="public-hairline public-hover-lift rounded-[20px] p-4">
    //                     <div className="flex items-center justify-between text-xs text-neutral-500">
    //                         <span>Lapisan spasial</span>
    //                         <span>Telabah aya - telabah tempek</span>
    //                     </div>
    //                     <div className="relative mt-4 h-72 overflow-hidden rounded-[18px] border border-neutral-200/70 bg-[linear-gradient(180deg,#fbfbf8_0%,#eef5f8_100%)]">
    //                         <div className="absolute inset-0 public-subtle-grid opacity-70" />
    //                         <div className="absolute left-10 top-12 h-24 w-24 rounded-full border border-primary-500/20 bg-primary-500/6" />
    //                         <div className="absolute right-12 top-10 h-28 w-28 rounded-full border border-secondary-500/20 bg-secondary-500/6" />
    //                         <div className="absolute bottom-10 left-16 h-16 w-36 rounded-full bg-primary-500/10 blur-2xl" />
    //                         <div className="absolute left-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-primary-500" />
    //                         <div className="absolute left-[44%] top-[46%] h-2.5 w-2.5 rounded-full bg-secondary-500" />
    //                         <div className="absolute right-[22%] top-[34%] h-3 w-3 rounded-full bg-danger" />
    //                         <div className={`absolute right-[22%] top-[34%] h-3 w-3 rounded-full border border-danger/50 bg-danger/20 ${pulseClass}`} />
    //                         <div className="absolute bottom-[24%] left-[28%] h-px w-[34%] rotate-[-16deg] bg-secondary-500/30" />
    //                         <div className="absolute bottom-[38%] left-[46%] h-px w-[26%] rotate-[12deg] bg-primary-500/35" />
    //                         <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/88 px-3 py-1 text-[11px] text-neutral-600 shadow-sm">
    //                             Bukti lokasi
    //                         </div>
    //                         <div className="absolute right-4 bottom-4 rounded-full border border-white/80 bg-white/88 px-3 py-1 text-[11px] text-neutral-600 shadow-sm">
    //                             Titik kritis
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="grid gap-4">
    //                     <div className="public-hairline public-hover-lift rounded-[20px] p-4">
    //                         <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
    //                             Sinyal operasional
    //                         </p>
    //                         <div className="mt-4 space-y-3">
    //                             <div className="flex items-center justify-between rounded-[16px] border border-neutral-200/80 bg-white/88 px-3 py-3">
    //                                 <div>
    //                                     <p className="text-sm font-semibold text-neutral-900">Menunggu Verifikasi</p>
    //                                     <p className="text-xs text-neutral-500">Laporan baru dari titik patroli</p>
    //                                 </div>
    //                                 <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-semibold text-warning">
    //                                     awal
    //                                 </span>
    //                             </div>
    //                             <div className="flex items-center justify-between rounded-[16px] border border-neutral-200/80 bg-white/88 px-3 py-3">
    //                                 <div>
    //                                     <p className="text-sm font-semibold text-neutral-900">Diverifikasi Pekaseh</p>
    //                                     <p className="text-xs text-neutral-500">Siap dilacak lebih lanjut</p>
    //                                 </div>
    //                                 <span className="rounded-full bg-secondary-500/14 px-2.5 py-1 text-[11px] font-semibold text-secondary-700">
    //                                     proses
    //                                 </span>
    //                             </div>
    //                             <div className="flex items-center justify-between rounded-[16px] border border-neutral-200/80 bg-white/88 px-3 py-3">
    //                                 <div>
    //                                     <p className="text-sm font-semibold text-neutral-900">Bukti penyelesaian</p>
    //                                     <p className="text-xs text-neutral-500">Closed-loop evidence</p>
    //                                 </div>
    //                                 <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
    //                                     selesai
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="public-hairline rounded-[20px] p-4">
    //                         <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
    //                             Jejak administrasi
    //                         </p>
    //                         <div className="mt-4 space-y-3">
    //                             {[
    //                                 'Laporan diterima dengan titik lokasi yang jelas',
    //                                 'Verifikasi awal memberi konteks administratif',
    //                                 'Status dan bukti penyelesaian tetap terlacak',
    //                             ].map((item) => (
    //                                 <div key={item} className="flex items-start gap-3">
    //                                     <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-500" />
    //                                     <p className="text-sm leading-6 text-neutral-600">{item}</p>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div> */}
    //     </div>
    // );
}

export default function Welcome({ canLogin, reports = [], summary = {} }) {
    const shouldReduceMotion = useReducedMotion();
    const [activeStep, setActiveStep] = useState(workflowSteps[0].id);
    const activeWorkflow = workflowSteps.find((step) => step.id === activeStep) ?? workflowSteps[0];
    const logoPath = '/assets/img/e-matelik-logo.png';
    const waMessage = encodeURIComponent('Halo, saya ingin melaporkan gangguan telabah melalui E-Matelik.');
    const waPekaseh = `https://wa.me/628xxxxxxxxxx?text=${waMessage}`;
    const waPelapor = `https://wa.me/628xxxxxxxxxx?text=${waMessage}`;

    const heroAnimate = shouldReduceMotion
        ? {}
        : { initial: 'hidden', animate: 'visible' };

    const revealInView = shouldReduceMotion
        ? {}
        : {
              initial: 'hidden',
              whileInView: 'visible',
              viewport: { once: true, amount: 0.2 },
          };

    return (
        <div className="public-shell selection:bg-emerald-200 selection:text-emerald-900 antialiased">
            <Head title="E-Matelik - Pengawasan Telabah Subak" />

            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-[#f7f4ec]/85 backdrop-blur-xl">
                <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/75 bg-white/85 shadow-[0_8px_24px_rgba(37,36,31,0.06)]">
                            <img src={logoPath} alt="E-Matelik Logo" className="h-7 w-7 object-contain" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                                E-Matelik
                            </p>
                            <p className="text-xs text-neutral-500">Sistem internal pemantauan telabah</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 lg:flex">
                        <a href="#tentang" className="public-nav-link">Tentang</a>
                        <a href="#alur" className="public-nav-link">Alur</a>
                        <a href="#fitur" className="public-nav-link">Fitur</a>
                        <a href="#laporan-publik" className="public-nav-link">Monitoring</a>
                    </nav>

                    {canLogin && (
                        <Link
                            href={route('login')}
                            className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-neutral-800 transition duration-200 ease-matelik hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-white"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            </header>

            <main className="pb-16 pt-28">
                <section className="mx-auto max-w-5xl px-6 py-10 md:py-16">
    <div className="flex flex-col items-center text-center gap-10">
        
        {/* Teks Utama */}
        <motion.div className="space-y-8 max-w-3xl" variants={staggerContainer} {...heroAnimate}>

            <motion.div variants={staggerItem} className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary-600">
                    Internal Subak, berbasis bukti lapangan
                </p>
                <h1 className="text-[3rem] font-semibold tracking-[-0.04em] text-neutral-900 md:text-[5rem] md:leading-[0.95]">
                    Pengawasan telabah yang lebih tenang, presisi, dan terlacak.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                    E-Matelik membantu mendokumentasikan gangguan telabah melalui titik lokasi,
                    bukti awal, verifikasi Pekaseh, dan jejak proses administratif yang lebih rapi
                    tanpa mengklaim menggantikan mekanisme adat Subak.
                </p>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {canLogin && (
                    <Link
                        href={route('login')}
                        className="inline-flex min-h-[3.4rem] items-center justify-center rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white transition duration-200 ease-matelik hover:-translate-y-0.5 hover:bg-primary-600"
                    >
                        Masuk
                    </Link>
                )}
                <div className="flex flex-wrap justify-center gap-3">
                    <a href={waPekaseh} target="_blank" rel="noopener noreferrer" className="public-pill transition duration-200 hover:-translate-y-0.5">
                        Hubungi Pekaseh
                    </a>
                    <a href={waPelapor} target="_blank" rel="noopener noreferrer" className="public-pill transition duration-200 hover:-translate-y-0.5">
                        Hubungi Pelapor
                    </a>
                </div>
            </motion.div>

            {/* Visual Produk (Diletakkan di bawah teks) */}
            <motion.div variants={scaleIn} {...heroAnimate} className="pt-8">
                <HeroVisual shouldReduceMotion={shouldReduceMotion} />
            </motion.div>

            {/* Footer Penjelasan */}
            <motion.div
                variants={staggerItem}
                className="grid gap-8 border-t border-neutral-200/80 pt-10 sm:grid-cols-3 text-left"
            >
                <div>
                    <p className="text-sm font-semibold text-neutral-900">Bukti lokasi</p>
                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                        Anchor koordinat dan konteks Subak untuk laporan lapangan.
                    </p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-neutral-900">Verifikasi awal</p>
                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                        Pekaseh tetap menjadi pintu administratif utama.
                    </p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-neutral-900">Closed-loop evidence</p>
                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                        Bukti awal dan bukti penyelesaian tetap terhubung.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    </div>
</section>

                <motion.section
                    id="tentang"
                    className="mx-auto max-w-7xl px-6 py-20"
                    variants={fadeInUp}
                    {...revealInView}
                >
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-700">
                                Tentang E-Matelik
                            </p>
                            <h2 className="mt-4 public-section-title">
                                Sistem dokumentasi yang tenang, namun tegas pada sinyal penting.
                            </h2>
                        </div>
                        <div className="space-y-5">
                            <p className="public-muted">
                                E-Matelik lahir untuk membantu laporan gangguan telabah tidak berhenti sebagai
                                kabar lisan. Sistem ini menata bukti lokasi, foto, verifikasi Pekaseh, dan
                                histori administratif agar proses lebih mudah ditelusuri kembali.
                            </p>
                            <p className="public-muted">
                                Ia diposisikan sebagai alat bantu dokumentasi dan koordinasi. Status yang tampil
                                di dalam sistem adalah status administratif penanganan, bukan keputusan sosial final
                                dan bukan pengganti tata kelola adat Subak.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <section id="alur" className="mx-auto max-w-7xl px-6 py-20">
                    <motion.div className="mb-10 max-w-3xl" variants={fadeInUp} {...revealInView}>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-700">
                            Alur kerja
                        </p>
                        <h2 className="mt-4 public-section-title">
                            Alur lapangan yang terasa hidup, tetapi tetap fokus.
                        </h2>
                        <p className="mt-4 public-muted">
                            Dari titik lokasi sampai bukti penyelesaian, setiap langkah dirancang untuk menjaga
                            sinyal awal tetap jelas dan jejak tindak lanjut tidak terputus.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                        <motion.div
                            className="public-surface overflow-hidden p-3"
                            variants={staggerContainer}
                            {...revealInView}
                        >
                            {workflowSteps.map((step, index) => {
                                const isActive = step.id === activeStep;

                                return (
                                    <motion.button
                                        key={step.id}
                                        type="button"
                                        variants={staggerItem}
                                        onMouseEnter={() => setActiveStep(step.id)}
                                        onFocus={() => setActiveStep(step.id)}
                                        onClick={() => setActiveStep(step.id)}
                                        className={`w-full rounded-[20px] px-4 py-4 text-left transition duration-200 ease-matelik ${
                                            isActive
                                                ? 'bg-white shadow-[0_18px_40px_rgba(37,36,31,0.08)]'
                                                : 'hover:bg-white/70'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                                isActive
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-neutral-100 text-neutral-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
                                                    {step.eyebrow}
                                                </p>
                                                <p className="mt-2 text-sm font-semibold text-neutral-900 md:text-base">
                                                    {step.label}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </motion.div>

                        <motion.div
                            key={activeWorkflow.id}
                            className="public-surface overflow-hidden p-6 md:p-8"
                            variants={scaleIn}
                            {...(shouldReduceMotion ? {} : { initial: 'hidden', animate: 'visible' })}
                        >
                            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                                        {activeWorkflow.eyebrow}
                                    </p>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
                                        {activeWorkflow.label}
                                    </h3>
                                    <p className="mt-4 text-base leading-8 text-neutral-600">
                                        {activeWorkflow.description}
                                    </p>
                                    <p className="mt-4 text-sm font-medium text-neutral-900">
                                        {activeWorkflow.emphasis}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {activeWorkflow.chips.map((chip) => (
                                            <span key={chip} className="public-pill">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="public-hairline public-subtle-grid rounded-[22px] p-5">
                                    <div className="space-y-4">
                                        {workflowSteps.map((step, index) => {
                                            const isCurrent = step.id === activeWorkflow.id;
                                            const isPast = workflowSteps.findIndex((item) => item.id === activeWorkflow.id) > index;

                                            return (
                                                <div key={step.id} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <span
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                                                isCurrent
                                                                    ? 'bg-primary-500 text-white'
                                                                    : isPast
                                                                      ? 'bg-secondary-500 text-white'
                                                                      : 'bg-neutral-100 text-neutral-500'
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </span>
                                                        {index < workflowSteps.length - 1 && (
                                                            <span className="mt-2 h-10 w-px bg-neutral-200" />
                                                        )}
                                                    </div>
                                                    <div className="pb-4">
                                                        <p className="text-sm font-semibold text-neutral-900">
                                                            {step.label}
                                                        </p>
                                                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                                                            {step.id === activeWorkflow.id
                                                                ? step.description
                                                                : 'Tetap menjadi bagian dari jejak administratif yang sama.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="fitur" className="mx-auto max-w-7xl px-6 py-20">
                    <motion.div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" variants={fadeInUp} {...revealInView}>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-700">
                                Fitur utama
                            </p>
                            <h2 className="mt-4 public-section-title">
                                Ringkas, operasional, dan tidak berlebihan.
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {featureGroups.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="public-surface public-hover-lift p-5 md:p-6"
                                    variants={fadeIn}
                                    {...revealInView}
                                >
                                    <div className="grid gap-4 md:grid-cols-[56px_1fr] md:items-start">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-sm font-semibold text-neutral-700">
                                            0{index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">
                                                {feature.body}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <PublicReportsSection reports={reports} summary={summary} />
            </main>

            <footer className="border-t border-neutral-200/80 py-8">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-center text-sm text-neutral-500">
                        Copyright @E-Matelik Team
                    </p>
                </div>
            </footer>
        </div>
    );
}
