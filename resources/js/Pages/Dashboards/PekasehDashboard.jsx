import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';

export default function PekasehDashboard({ dashboard, statistics = {} }) {
    const patrolStatistics = {
        total: statistics.total ?? dashboard.statistics?.total ?? 0,
        safe: statistics.safe ?? dashboard.statistics?.safe ?? 0,
        needs_attention:
            statistics.needs_attention ??
            dashboard.statistics?.needs_attention ??
            0,
        damaged: statistics.damaged ?? dashboard.statistics?.damaged ?? 0,
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-secondary-600">Pekaseh</p>
                        <h2 className="page-title">{dashboard.title}</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href={route('map.index')}>
                            <SecondaryButton className="w-full sm:w-auto">Peta</SecondaryButton>
                        </Link>
                        <Link href={route('verification.index')}>
                            <PrimaryButton className="w-full sm:w-auto">Verifikasi Laporan</PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={dashboard.title} />

            <div className="app-page">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm shadow-slate-200/60">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Total Titik
                        </p>
                        <p className="mt-4 text-3xl font-bold text-slate-900">
                            {patrolStatistics.total}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Jumlah checkpoint aktif yang dipantau hari ini.
                        </p>
                    </Card>

                    <Card className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm shadow-emerald-100/70">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                            Aman
                        </p>
                        <p className="mt-4 text-3xl font-bold text-emerald-700">
                            {patrolStatistics.safe}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-emerald-700/80">
                            Titik yang dipindai dan dinyatakan aman oleh Krama.
                        </p>
                    </Card>

                    <Card className="rounded-3xl border border-amber-200 bg-amber-50/90 p-6 shadow-sm shadow-amber-100/70">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                            Atensi
                        </p>
                        <p className="mt-4 text-3xl font-bold text-amber-700">
                            {patrolStatistics.needs_attention}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-amber-700/80">
                            Titik yang butuh perhatian lanjutan, namun belum dilaporkan rusak.
                        </p>
                    </Card>

                    <Card className="rounded-3xl border border-rose-200 bg-rose-50/90 p-6 shadow-sm shadow-rose-100/70">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
                            Rusak
                        </p>
                        <p className="mt-4 text-3xl font-bold text-rose-700">
                            {patrolStatistics.damaged}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-rose-700/80">
                            Titik yang hari ini sudah terhubung ke laporan kerusakan.
                        </p>
                    </Card>
                </section>

                <section className="app-panel overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-sky-50 p-8">
                    <div className="max-w-3xl space-y-4">
                        <p className="eyebrow !text-primary-600">
                            Tahap 8 • Verifikasi Pekaseh
                        </p>
                        <h3 className="section-title text-[30px]">
                            {dashboard.summary.headline}
                        </h3>
                        <p className="body-copy">
                            Pekaseh meninjau laporan di lingkup Subaknya, lalu menentukan
                            apakah laporan valid, perlu klarifikasi, selesai secara internal,
                            atau perlu eskalasi administratif lanjutan.
                        </p>
                        <div className="flex gap-3 pt-1">
                            <Badge variant="info">{dashboard.summary.primaryAction}</Badge>
                            <Badge variant="warning">{dashboard.summary.secondaryAction}</Badge>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card className="metric-card">
                        <p className="metric-label">Subak aktif</p>
                        <p className="mt-2 text-xl font-bold text-neutral-900">
                            {dashboard.subak?.name ?? 'Belum ditetapkan'}
                        </p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Menunggu verifikasi</p>
                        <p className="metric-value">{dashboard.stats.pendingReports}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Backlog lewat 24 jam</p>
                        <p className="metric-value text-rose-600">
                            {dashboard.stats.overdueReports}
                        </p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Region</p>
                        <p className="mt-2 text-xl font-bold text-neutral-900">
                            {dashboard.subak?.region ?? '-'}
                        </p>
                    </Card>
                </section>

                <section className="info-strip border-secondary-100 bg-secondary-50/80 text-secondary-800">
                    <p className="font-semibold">{dashboard.processGuidance.headline}</p>
                    <p className="mt-2">{dashboard.processGuidance.fallbackNote}</p>
                </section>

                <section className="app-panel overflow-hidden">
                    <div className="border-b border-neutral-200 px-6 py-5">
                        <h3 className="section-title text-xl">Laporan terbaru untuk ditinjau</h3>
                    </div>

                    {dashboard.recentReports.length > 0 ? (
                        <div className="divide-y divide-neutral-200">
                            {dashboard.recentReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="report-list-card m-4 flex flex-col gap-4 md:m-5 md:flex-row md:items-center md:justify-between"
                                >
                                    <div>
                                        <p className="text-lg font-semibold text-neutral-900">
                                            {report.title}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-500">
                                            <span>{report.report_code}</span>
                                            <span>{report.category}</span>
                                            {report.is_overdue && (
                                                <span className="font-semibold text-rose-600">
                                                    Lewat 24 jam
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <Link href={route('verification.show', report.id)}>
                                        <SecondaryButton className="w-full sm:w-auto">
                                            Tinjau Detail
                                        </SecondaryButton>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-10 text-sm text-neutral-500">
                            Belum ada laporan menunggu verifikasi pada Subak ini.
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}