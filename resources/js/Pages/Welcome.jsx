import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

const features = [
    {
        title: 'Lapor cepat dari HP',
        description: 'Pilih titik, isi ringkas, unggah foto, lalu kirim laporan tanpa alur yang membingungkan.',
    },
    {
        title: 'Pekaseh tetap jadi pintu awal',
        description: 'Setiap laporan masuk ke alur verifikasi yang menghormati koordinasi Subak.',
    },
    {
        title: 'Status mudah dipantau',
        description: 'Perubahan penting dan bukti penyelesaian tetap terlihat jelas di setiap tahap.',
    },
];

const steps = [
    'Tandai lokasi gangguan di peta.',
    'Tambahkan foto dan keterangan singkat.',
    'Pantau verifikasi dan tindak lanjutnya.',
];

export default function Welcome({ auth, canLogin = true, canRegister = true }) {
    const isAuthenticated = Boolean(auth?.user);
    const primaryHref = isAuthenticated ? route('dashboard') : route('login');
    const primaryLabel = isAuthenticated ? 'Buka Dashboard' : 'Mulai Lapor';

    return (
        <>
            <Head title="E-Matelik - Patroli Subak Digital" />

            <div className="min-h-screen bg-[#F8F7F2] text-neutral-900">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between gap-4 rounded-[24px] border border-white/80 bg-white/80 px-4 py-3 shadow-panel backdrop-blur sm:px-5">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white">
                                <ApplicationLogo className="h-6 w-6 fill-current" />
                            </span>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-600">E-Matelik</p>
                                <p className="text-sm text-neutral-500">Patroli telabah berbasis bukti</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            {canLogin && !isAuthenticated && (
                                <Link href={route('login')} className="hidden text-sm font-semibold text-neutral-600 sm:inline-flex">
                                    Masuk
                                </Link>
                            )}
                            {(isAuthenticated || canRegister) && (
                                <Link href={isAuthenticated ? route('dashboard') : route('register')} className="btn-primary px-4 sm:px-5">
                                    {isAuthenticated ? 'Dashboard' : 'Daftar'}
                                </Link>
                            )}
                        </div>
                    </nav>

                    <section className="relative mt-6 overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-white via-[#F6F5EE] to-[#EAF4F8] px-5 py-8 shadow-soft sm:px-8 sm:py-12 lg:px-12 lg:py-16">
                        <div className="absolute inset-0 landing-grid opacity-40" />
                        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm font-semibold text-secondary-700">
                                    WebGIS yang tenang, jelas, dan mudah dipakai
                                </div>
                                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                                    Jaga aliran telabah dengan laporan yang mudah dibuat dan mudah ditindaklanjuti.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8 text-neutral-600">
                                    E-Matelik membantu pelapor, Pekaseh, dan admin mendokumentasikan gangguan telabah
                                    dengan peta, bukti foto, verifikasi, dan tracking yang lebih rapi.
                                </p>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Link href={primaryHref} className="btn-primary w-full sm:w-auto">
                                        {primaryLabel}
                                    </Link>
                                    <a href="#cara-kerja" className="btn-secondary w-full sm:w-auto">
                                        Lihat Cara Kerja
                                    </a>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {features.map((feature) => (
                                        <div key={feature.title} className="rounded-card border border-neutral-200 bg-white/90 p-4">
                                            <p className="text-base font-semibold text-neutral-900">{feature.title}</p>
                                            <p className="mt-2 text-sm leading-7 text-neutral-600">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-[28px] border border-primary-100 bg-primary-700 p-6 text-white shadow-panel">
                                    <p className="eyebrow !text-emerald-100">Untuk pengguna lapangan</p>
                                    <h2 className="mt-3 text-2xl font-bold">Lebih nyaman dipakai dari layar kecil.</h2>
                                    <p className="mt-3 text-base leading-8 text-primary-100">
                                        Tombol dibuat lebih besar, alur dipersingkat, dan informasi penting diletakkan lebih dekat ke tindakan utama.
                                    </p>
                                </div>

                                <div id="cara-kerja" className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-panel">
                                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-600">Cara kerja singkat</p>
                                    <div className="mt-4 space-y-3">
                                        {steps.map((step, index) => (
                                            <div key={step} className="flex items-start gap-3 rounded-card border border-neutral-200 bg-neutral-50 p-4">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-600 text-sm font-bold text-white">
                                                    {index + 1}
                                                </span>
                                                <p className="text-base leading-7 text-neutral-700">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
