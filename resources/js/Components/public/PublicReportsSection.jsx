import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import LeafletMap from '@/Components/maps/LeafletMap';
import { priorityLabel, priorityVariant, statusVariant } from '@/lib/reportPresentation';

function mapCenter(reports) {
    if (reports.length > 0) {
        return [reports[0].latitude, reports[0].longitude];
    }

    return [-8.65, 115.216];
}

export default function PublicReportsSection({ reports = [], summary = {} }) {
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
        <section id="laporan-publik" className="border-t border-zinc-200/70 bg-white/70 py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                        Dashboard Publik
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                        Pantau Laporan Telabah Terverifikasi
                    </h2>
                    <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">
                        Laporan yang tampil di sini telah melewati proses verifikasi awal atau tindak lanjut administratif.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-4">
                    <Card className="metric-card bg-white/90">
                        <p className="metric-label">Total laporan publik</p>
                        <p className="metric-value">{summary.total ?? 0}</p>
                    </Card>
                    <Card className="metric-card bg-white/90">
                        <p className="metric-label">Diverifikasi</p>
                        <p className="metric-value text-sky-600">{summary.verified ?? 0}</p>
                    </Card>
                    <Card className="metric-card bg-white/90">
                        <p className="metric-label">Diekskalasi</p>
                        <p className="metric-value text-rose-600">{summary.escalated ?? 0}</p>
                    </Card>
                    <Card className="metric-card bg-white/90">
                        <p className="metric-label">Selesai</p>
                        <p className="metric-value text-emerald-600">{summary.completed ?? 0}</p>
                    </Card>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <LeafletMap
                        markers={markers}
                        center={mapCenter(reports)}
                        zoom={12}
                        heightClass="h-[380px] lg:h-[560px]"
                    />

                    <Card className="space-y-4 bg-white/90">
                        <h3 className="text-xl font-semibold text-neutral-900">
                            Ringkasan laporan publik
                        </h3>
                        <p className="text-sm leading-7 text-neutral-600">
                            Section ini hanya menampilkan laporan dengan status <strong>Diverifikasi</strong>, <strong>Diekskalasi</strong>, atau <strong>Selesai</strong>.
                        </p>
                        <p className="text-sm leading-7 text-neutral-600">
                            Laporan <strong>Menunggu Verifikasi</strong>, <strong>Perlu Klarifikasi</strong>, dan <strong>Ditolak</strong> sengaja tidak ditampilkan agar halaman publik hanya memuat data yang sudah melalui proses administratif yang cukup.
                        </p>
                        <p className="text-sm leading-7 text-neutral-600">
                            Klik detail untuk membuka kapsul bukti administratif yang dapat dibaca masyarakat tanpa login.
                        </p>
                    </Card>
                </div>

                <div className="mt-12 space-y-4">
                    <div>
                        <h3 className="text-2xl font-semibold text-neutral-900">Daftar laporan publik</h3>
                        <p className="mt-2 text-sm text-neutral-500">
                            Informasi ini ditujukan untuk transparansi administratif dan bukan bukti forensik final.
                        </p>
                    </div>

                    {reports.length > 0 ? (
                        <div className="grid gap-5 lg:grid-cols-2">
                            {reports.map((report) => (
                                <Card key={report.id} className="overflow-hidden bg-white/95">
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
                                        <h4 className="text-xl font-semibold text-neutral-900">
                                            {report.title}
                                        </h4>
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
                                                className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                                            >
                                                Lihat Detail
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-white/90">
                            <p className="text-sm text-neutral-500">
                                Belum ada laporan terproses yang dapat ditampilkan ke publik.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
