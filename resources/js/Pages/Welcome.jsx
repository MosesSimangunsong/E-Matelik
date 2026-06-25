import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ canLogin, canRegister }) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 antialiased">
            <Head title="E-Matelik - Pengawasan Telabah Subak" />

            {/* NAVBAR */}
            <header className="fixed top-0 inset-x-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/60">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Placeholder Logo */}
                        <img 
                            src="/images/logo-ematelik.png" 
                            alt="Logo E-Matelik" 
                            className="h-8 w-auto object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E";
                            }}
                        />
                        <span className="font-semibold tracking-tight text-lg text-zinc-800">E-Matelik</span>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {canLogin && (
                            <>
                                <Link href={route('login')} className="text-zinc-500 hover:text-zinc-900 transition-colors">
                                    Masuk
                                </Link>
                                {canRegister && (
                                    <Link 
                                        href={route('register')} 
                                        className="bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-all duration-200"
                                    >
                                        Daftar Krama
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="pt-32 pb-16">
                
                {/* 1. HERO SECTION */}
                <section className="max-w-4xl mx-auto px-6 text-center pt-16 pb-24">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-[1.1] mb-6">
                        Pengawasan telabah Subak yang lebih tertib dan terdokumentasi.
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
                        Menghubungkan patroli Matelik, pelaporan lapangan, dan verifikasi Pekaseh dalam satu alur digital yang rapi dan terukur.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href={route('login')} 
                            className="w-full sm:w-auto bg-emerald-700 text-white px-8 py-3.5 rounded-full font-medium hover:bg-emerald-800 transition-colors"
                        >
                            Mulai Gunakan Sistem
                        </Link>
                    </div>

                    {/* Hero Visual Placeholder */}
                    <div className="mt-20 relative mx-auto max-w-5xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA] z-10 rounded-xl" style={{ top: '60%' }}></div>
                        <div className="rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-100 shadow-sm relative z-0">
                            <img 
                                src="/images/hero-dashboard.png" 
                                alt="Tampilan Dashboard E-Matelik" 
                                className="w-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='500' viewBox='0 0 800 500'%3E%3Crect fill='%23f4f4f5' width='800' height='500'/%3E%3Ctext fill='%23a1a1aa' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle'%3E[Placeholder: Screenshot Aplikasi WebGIS]%3C/text%3E%3C/svg%3E";
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. SECTION MASALAH */}
                <section className="max-w-3xl mx-auto px-6 py-24 border-t border-zinc-200/50">
                    <h2 className="text-2xl font-semibold tracking-tight mb-6">Mengapa E-Matelik hadir?</h2>
                    <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
                        <p>
                            Menjaga kelancaran air telabah adalah fondasi Subak. Namun, seringkali patroli lapangan belum terdokumentasi dengan rapi. Laporan kerusakan atau gangguan bisa hilang tanpa jejak.
                        </p>
                        <p>
                            Koordinat dan bukti foto yang terpencar membuat Pekaseh kesulitan memverifikasi masalah secara akurat. E-Matelik dibangun untuk menjawab kebutuhan bukti awal yang lebih mudah dilacak dan diverifikasi.
                        </p>
                    </div>
                </section>

                {/* 3. SECTION CARA KERJA (ALUR) */}
                <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-200/50">
                    <h2 className="text-2xl font-semibold tracking-tight mb-12">Alur kerja lapangan.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        
                        <div className="relative">
                            <div className="text-emerald-700 font-bold mb-3 text-sm tracking-widest uppercase">01</div>
                            <h3 className="font-semibold text-zinc-900 mb-2">Scan Titik QR</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Krama memindai QR Code di checkpoint telabah saat melakukan patroli harian.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="text-emerald-700 font-bold mb-3 text-sm tracking-widest uppercase">02</div>
                            <h3 className="font-semibold text-zinc-900 mb-2">Buat Laporan</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Jika ada gangguan, kirim bukti foto dan koordinat presisi langsung dari lokasi.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="text-emerald-700 font-bold mb-3 text-sm tracking-widest uppercase">03</div>
                            <h3 className="font-semibold text-zinc-900 mb-2">Verifikasi Pekaseh</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Pekaseh menerima dan menyaring laporan untuk divalidasi kebenarannya.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="text-emerald-700 font-bold mb-3 text-sm tracking-widest uppercase">04</div>
                            <h3 className="font-semibold text-zinc-900 mb-2">Kapsul Bukti</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Sistem menerbitkan dokumen administratif awal ber-QR sebagai dasar tindak lanjut.
                            </p>
                        </div>

                    </div>
                </section>

                {/* 4. SECTION VISUAL SISTEM BESAR */}
                <section className="max-w-6xl mx-auto px-6 py-24">
                    <div className="bg-zinc-100 rounded-2xl p-4 md:p-8 border border-zinc-200/60 overflow-hidden">
                        <img 
                            src="/images/system-preview.png" 
                            alt="Detail Peta dan Laporan E-Matelik" 
                            className="w-full rounded-lg shadow-sm border border-zinc-200/80"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='600' viewBox='0 0 1200 600'%3E%3Crect fill='%23e4e4e7' width='1200' height='600'/%3E%3Ctext fill='%2371717a' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle'%3E[Placeholder: Visualisasi Peta WebGIS %26 Laporan]%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                </section>

                {/* 5. SECTION FITUR INTI */}
                <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        
                        <div>
                            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Smart Matelik Checkpoint</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Fitur pengawasan berbasis QR Code fisik. Checkpoint bukan sekadar absensi, melainkan penanda lokasi valid untuk memastikan Krama benar-benar memeriksa telabah.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Pelaporan Geospasial</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Setiap laporan yang dibuat terhubung dengan titik koordinat akurat di atas peta, memudahkan pencarian dan pemetaan daerah rawan pada irigasi Subak.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Verifikasi Pekaseh</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Laporan tidak langsung menjadi kebenaran akhir. Sistem memastikan Pekaseh bertindak sebagai verifikator otoritatif sebelum laporan diproses lebih jauh.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3">Kapsul Bukti Administratif Ber-QR</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Mencetak rangkuman laporan yang diverifikasi menjadi satu dokumen utuh. Menjaga integritas data awal sebelum diteruskan ke tingkat desa atau dinas.
                            </p>
                        </div>

                    </div>
                </section>

            </main>

            {/* 6. FOOTER */}
            <footer className="border-t border-zinc-200/80 bg-white pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-6">
                        Rapi, terdata, dan siap ditindaklanjuti.
                    </h2>
                    <p className="text-zinc-500 mb-10">
                        Buat laporan lapangan tidak lagi hilang tanpa jejak.
                    </p>
                    <Link 
                        href={route('login')} 
                        className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors mb-20"
                    >
                        Masuk ke E-Matelik
                    </Link>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-100">
                        <div className="flex items-center gap-2 mb-4 md:mb-0 grayscale opacity-60">
                            {/* Placeholder Logo Footer */}
                            <img 
                                src="/images/logo-ematelik.png" 
                                alt="Logo E-Matelik" 
                                className="h-6 w-auto object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E";
                                }}
                            />
                            <span className="font-semibold text-sm tracking-tight text-zinc-900">E-Matelik</span>
                        </div>
                        <p className="text-xs text-zinc-400">
                            Sistem Informasi WebGIS Pengawasan Irigasi Subak.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}