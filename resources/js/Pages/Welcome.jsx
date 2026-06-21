import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

const features = [
    {
        title: 'Pelaporan Berbasis Peta',
        description:
            'Titik lokasi telabah dicatat langsung agar konteks lapangan, subak, dan arah tindak lanjut tetap jelas sejak awal.',
    },
    {
        title: 'Dokumentasi Bukti',
        description:
            'Foto dan catatan lapangan tersimpan bersama laporan supaya verifikasi tidak bergantung pada ingatan atau pesan terpisah.',
    },
    {
        title: 'Verifikasi Pekaseh',
        description:
            'Pekaseh menjadi pintu awal validasi untuk memastikan laporan relevan, dapat ditindaklanjuti, dan sesuai kondisi lapangan.',
    },
    {
        title: 'Tracking Laporan',
        description:
            'Pelapor dapat memantau perjalanan laporan dari dikirim, diverifikasi, perlu klarifikasi, hingga selesai atau diekskalasi.',
    },
];

const values = [
    {
        title: 'Lingkungan',
        description:
            'Membantu gangguan saluran irigasi terdokumentasi lebih cepat sebelum berdampak lebih luas pada area sekitar.',
    },
    {
        title: 'Sawah dan Subak',
        description:
            'Dirancang mengikuti konteks kerja Subak agar pengawasan telabah terasa dekat dengan realitas pengelolaan sawah.',
    },
    {
        title: 'Air dan Irigasi',
        description:
            'Menjaga alur informasi tetap seteratur alur air, dari temuan lapangan menuju keputusan dan tindak lanjut yang rapi.',
    },
];

const stats = [
    { label: 'Berbasis WebGIS', value: 'Spasial' },
    { label: 'Alur Awal', value: 'Pekaseh' },
    { label: 'Status', value: 'Terlacak' },
];

export default function Welcome({ auth, canLogin = true, canRegister = true }) {
    const isAuthenticated = Boolean(auth?.user);
    const primaryHref = isAuthenticated ? route('dashboard') : route('login');
    const primaryLabel = isAuthenticated ? 'Masuk ke Dashboard' : 'Mulai Gunakan Sistem';

    return (
        <>
            <Head title="E-Matelik" />

            <div className="app-shell overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(79,138,63,0.22),transparent_46%),radial-gradient(circle_at_75%_20%,rgba(61,139,186,0.18),transparent_28%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="landing-orb left-[8%] top-28 h-36 w-36 bg-primary-500/18" />
                    <div className="landing-orb right-[10%] top-40 h-48 w-48 bg-secondary-500/16 delay-700" />
                    <div className="landing-orb bottom-40 left-[18%] h-28 w-28 bg-accent-500/12 delay-1000" />
                </div>

                <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                    <header className="hero-reveal flex items-center justify-between rounded-full border border-white/55 bg-white/70 px-4 py-3 shadow-panel backdrop-blur sm:px-6">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-panel">
                                <ApplicationLogo className="h-7 w-7 fill-current" />
                            </span>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-700">
                                    E-Matelik
                                </p>
                                <p className="text-xs text-neutral-500 sm:text-sm">
                                    WebGIS patroli telabah berbasis bukti
                                </p>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-2 sm:gap-3">
                            {canLogin && !isAuthenticated ? (
                                <Link href={route('login')} className="btn-secondary px-4 py-2.5">
                                    Login
                                </Link>
                            ) : null}
                            {isAuthenticated ? (
                                <Link href={route('dashboard')} className="btn-primary px-4 py-2.5">
                                    Dashboard
                                </Link>
                            ) : canRegister ? (
                                <Link href={route('register')} className="btn-primary px-4 py-2.5">
                                    Daftar
                                </Link>
                            ) : null}
                        </nav>
                    </header>

                    <main className="relative mt-8 flex-1 space-y-8 lg:space-y-10">
                        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="hero-reveal app-panel relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
                                <div className="landing-grid absolute inset-0 opacity-50" />
                                <div className="relative max-w-2xl">
                                    <p className="eyebrow">Lingkungan - Sawah - Air</p>
                                    <h1 className="mt-4 text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl lg:text-[3.7rem]">
                                        E-Matelik menjaga laporan telabah tetap
                                        <span className="text-primary-700"> jelas, tenang, </span>
                                        dan terarah.
                                    </h1>
                                    <p className="body-copy mt-6 max-w-xl text-base sm:text-lg">
                                        Sistem ini membantu pelapor, Pekaseh, dan admin
                                        mendokumentasikan gangguan irigasi berbasis lokasi,
                                        bukti lapangan, verifikasi, dan tracking tindak lanjut
                                        dalam satu alur yang rapi.
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                        <Link href={primaryHref} className="btn-primary min-w-[210px]">
                                            {primaryLabel}
                                        </Link>
                                        <a href="#fitur-utama" className="btn-secondary min-w-[210px]">
                                            Lihat Fitur Utama
                                        </a>
                                    </div>

                                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                        {stats.map((item) => (
                                            <div
                                                key={item.label}
                                                className="card-float rounded-card border border-neutral-200/80 bg-white/80 p-4 backdrop-blur"
                                            >
                                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                                    {item.label}
                                                </p>
                                                <p className="mt-2 text-lg font-semibold text-neutral-900">
                                                    {item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="hero-reveal app-panel relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 p-6 text-white sm:p-8">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(180deg,transparent,rgba(22,53,41,0.24))]" />
                                <div className="relative flex h-full flex-col justify-between gap-8">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100/90">
                                            Sistem Pelaporan Subak
                                        </p>
                                        <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
                                            Pusat informasi lapangan untuk menjaga telabah dan
                                            aliran irigasi tetap terpantau.
                                        </h2>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/14">
                                            <p className="text-sm text-emerald-50/80">Masalah yang diselesaikan</p>
                                            <p className="mt-2 text-base leading-7 text-white/90">
                                                Temuan lapangan sering tercecer, sulit diverifikasi,
                                                dan tidak punya jejak status yang mudah diikuti.
                                            </p>
                                        </div>
                                        <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/14">
                                            <p className="text-sm text-emerald-50/80">Cara kerja inti</p>
                                            <p className="mt-2 text-base leading-7 text-white/90">
                                                Laporkan titik kejadian, unggah bukti, biarkan Pekaseh
                                                memverifikasi, lalu pantau tindak lanjut hingga selesai.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="fitur-utama" className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                            <div className="hero-reveal app-card p-6 sm:p-8">
                                <p className="eyebrow">Tentang Sistem</p>
                                <h2 className="section-title mt-4">
                                    E-Matelik adalah ruang dokumentasi digital untuk patroli
                                    telabah berbasis lokasi.
                                </h2>
                                <p className="body-copy mt-4">
                                    Fokus MVP-nya adalah membantu proses pelaporan, verifikasi,
                                    dan pelacakan gangguan irigasi pada konteks Subak tanpa
                                    mengubah peran keputusan lapangan yang sudah ada.
                                </p>
                                <p className="body-copy mt-4">
                                    Sistem ini bukan pengganti tata kelola Subak, melainkan alat
                                    bantu agar informasi kejadian lebih cepat terkumpul,
                                    terbukti, dan mudah diteruskan.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {features.map((feature, index) => (
                                    <article
                                        key={feature.title}
                                        className="card-float app-card group relative overflow-hidden p-6"
                                        style={{ animationDelay: `${index * 120}ms` }}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-70" />
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-700 transition duration-300 group-hover:scale-110 group-hover:bg-secondary-500 group-hover:text-white">
                                            <span className="text-sm font-bold">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-neutral-900">
                                            {feature.title}
                                        </h3>
                                        <p className="body-copy mt-3">{feature.description}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="hero-reveal app-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-2xl">
                                    <p className="eyebrow">Nilai Produk</p>
                                    <h2 className="section-title mt-4">
                                        Dibangun dengan nuansa yang dekat dengan lingkungan,
                                        sawah, dan air.
                                    </h2>
                                    <p className="body-copy mt-4">
                                        Identitas visual dan pesan sistem sengaja dibuat organik,
                                        bersih, dan menenangkan agar terasa akrab dengan konteks
                                        Subak, bukan seperti dashboard administratif yang kaku.
                                    </p>
                                </div>
                                <div className="rounded-full border border-primary-200 bg-primary-50 px-5 py-3 text-sm font-semibold text-primary-700">
                                    Natural, premium, dan mudah dipercaya
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                {values.map((item) => (
                                    <article
                                        key={item.title}
                                        className="card-float rounded-card border border-neutral-200 bg-white/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-soft"
                                    >
                                        <h3 className="text-xl font-semibold text-neutral-900">
                                            {item.title}
                                        </h3>
                                        <p className="body-copy mt-3">{item.description}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="hero-reveal overflow-hidden rounded-[28px] bg-neutral-900 px-6 py-10 text-white shadow-soft sm:px-8 sm:py-12">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-200">
                                        Mulai Menggunakan E-Matelik
                                    </p>
                                    <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                                        Jadikan laporan lapangan lebih tertata dari titik temuan
                                        sampai keputusan tindak lanjut.
                                    </h2>
                                    <p className="mt-4 text-base leading-8 text-neutral-300">
                                        Masuk ke sistem untuk membuat laporan, memverifikasi
                                        temuan, atau memantau status penanganan telabah secara
                                        lebih rapi.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                    <Link
                                        href={primaryHref}
                                        className="inline-flex items-center justify-center rounded-soft bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
                                    >
                                        {primaryLabel}
                                    </Link>
                                    {!isAuthenticated && canLogin ? (
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-soft border border-white/20 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                                        >
                                            Login Sekarang
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
