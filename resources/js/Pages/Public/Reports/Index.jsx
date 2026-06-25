import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import LeafletMap from '@/Components/maps/LeafletMap';
import { Head, Link } from '@inertiajs/react';
import { priorityLabel, priorityVariant, statusVariant } from '@/lib/reportPresentation';

function mapCenter(reports) {
    if (reports.length > 0) {
        return [reports[0].latitude, reports[0].longitude];
    }

    return [-8.65, 115.216];
}

const logoPath = '/assets/img/e-matelik%20logo.png';

export default function PublicReportsIndex({ reports, summary }) {
    const markers = reports.map((report) => ({
        id: report.id,
        title: report.title,
        report_code: report.report_code,
        latitude: Number(report.latitude),
        longitude: Number(report.longitude),
        category: report.category,
        status: report.status,
        priority_level: report.priority_level,
    }));

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
            <Head title="Dashboard Publik E-Matelik" />

            <header className="border-b border-zinc-200/70 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <img src={logoPath} alt="E-Matelik Logo" className="h-12 w-auto object-contain" />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                                E-Matelik
                            </p>
                            <p className="text-sm text-zinc-500">Dashboard Publik Laporan Terproses</p>
                        </div>
                    </Link>
                    <Link href={route('login')} className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">
                        Masuk
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
                <section className="grid gap-4 md:grid-cols-4">
                    <Card className="metric-card">
                        <p className="metric-label">Total laporan publik</p>
                        <p className="metric-value">{summary.total}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Diverifikasi</p>
                        <p className="metric-value text-sky-600">{summary.verified}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Diekskalasi</p>
                        <p className="metric-value text-rose-600">{summary.escalated}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Selesai</p>
                        <p className="metric-value text-emerald-600">{summary.completed}</p>
                    </Card>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <LeafletMap
                        markers={markers}
                        center={mapCenter(reports)}
                        zoom={12}
                        heightClass="h-[380px] lg:h-[560px]"
                    />

                    <Card className="space-y-4">
                        <h2 className="text-xl font-semibold text-neutral-900">
                            Ringkasan dashboard publik
                        </h2>
                        <p className="text-sm leading-7 text-neutral-600">
                            Halaman ini menampilkan laporan yang sudah diproses secara administratif,
                            yaitu status diverifikasi, diekskalasi, atau selesai. Laporan menunggu
                            verifikasi dan ditolak tidak ditampilkan di sini.
                        </p>
                        <p className="text-sm leading-7 text-neutral-600">
                            Klik detail laporan untuk membuka kapsul bukti administratif yang dapat
                            dibaca masyarakat tanpa login.
                        </p>
                    </Card>
                </section>

                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-neutral-900">Daftar laporan publik</h2>
                        <p className="mt-2 text-sm text-neutral-500">
                            Informasi ini ditujukan untuk transparansi administratif dan bukan bukti
                            forensik final.
                        </p>
                    </div>

                    {reports.length > 0 ? (
                        <div className="grid gap-5 lg:grid-cols-2">
                            {reports.map((report) => (
                                <Card key={report.id} className="overflow-hidden">
                                    {report.initial_photo_url ? (
                                        <img
                                            src={report.initial_photo_url}
                                            alt={report.title}
                                            className="h-56 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-56 items-center justify-center bg-zinc-100 text-sm text-zinc-500">
                                            Belum ada foto bukti awal
                                        </div>
                                    )}
                                    <div className="space-y-3 p-5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant={statusVariant(report.status?.slug)}>
                                                {report.status?.name}
                                            </Badge>
                                            {report.priority_level && (
                                                <Badge variant={priorityVariant(report.priority_level)}>
                                                    {priorityLabel(report.priority_level)}
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold text-neutral-900">
                                            {report.title}
                                        </h3>
                                        <div className="grid gap-2 text-sm text-neutral-600">
                                            <p><strong>Kode:</strong> {report.report_code}</p>
                                            <p><strong>Pelapor:</strong> {report.reporter_name || '-'}</p>
                                            <p><strong>Kategori:</strong> {report.category || '-'}</p>
                                            <p><strong>Koordinat:</strong> {report.latitude}, {report.longitude}</p>
                                            <p><strong>Tanggal:</strong> {report.submitted_at || '-'}</p>
                                        </div>
                                        <div className="pt-2">
                                            <a
                                                href={report.detail_url}
                                                className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                                            >
                                                Lihat Detail
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <p className="text-sm text-neutral-500">
                                Belum ada laporan terproses yang dapat ditampilkan ke publik.
                            </p>
                        </Card>
                    )}
                </section>
            </main>
        </div>
    );
}
