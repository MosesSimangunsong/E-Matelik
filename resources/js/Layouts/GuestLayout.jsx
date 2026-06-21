import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
            <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <section className="hidden min-h-[620px] overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 p-10 text-white shadow-soft lg:flex lg:flex-col lg:justify-between">
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center gap-4">
                            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/12 backdrop-blur">
                                <ApplicationLogo className="h-10 w-10 fill-current text-white" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">
                                    E-Matelik
                                </p>
                                <p className="text-sm text-emerald-50/80">
                                    WebGIS patroli Subak berbasis bukti
                                </p>
                            </div>
                        </Link>
                        <div className="max-w-xl space-y-5">
                            <p className="eyebrow !text-emerald-100">Lingkungan - Sawah - Air</p>
                            <h1 className="text-4xl font-bold leading-tight text-white">
                                Dokumentasikan gangguan telabah dengan alur yang rapi, tenang, dan terarah.
                            </h1>
                            <p className="max-w-lg text-base leading-8 text-emerald-50/85">
                                E-Matelik membantu pelapor, Pekaseh, dan admin menjaga bukti lapangan
                                tetap terhubung dengan lokasi, verifikasi, dan tindak lanjut.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur">
                            <p className="text-sm text-emerald-50/80">Spasial</p>
                            <p className="mt-2 text-lg font-semibold">Peta jadi pusat laporan</p>
                        </div>
                        <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur">
                            <p className="text-sm text-emerald-50/80">Verifikasi</p>
                            <p className="mt-2 text-lg font-semibold">Pekaseh tetap jadi pintu awal</p>
                        </div>
                        <div className="rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur">
                            <p className="text-sm text-emerald-50/80">Tracking</p>
                            <p className="mt-2 text-lg font-semibold">Status mudah dipantau</p>
                        </div>
                    </div>
                </section>

                <section className="flex items-center">
                    <div className="w-full app-panel px-6 py-8 sm:px-8 sm:py-10">
                        <div className="mb-8 flex items-center gap-4 lg:hidden">
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-panel">
                                <ApplicationLogo className="h-8 w-8 fill-current" />
                            </span>
                            <div>
                                <p className="text-lg font-bold text-neutral-900">E-Matelik</p>
                                <p className="text-sm text-neutral-500">Pelaporan telabah berbasis lokasi</p>
                            </div>
                        </div>

                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}
