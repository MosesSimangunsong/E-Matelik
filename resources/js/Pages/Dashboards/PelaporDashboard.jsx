import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';
import { priorityLabel, priorityVariant, statusVariant } from '@/lib/reportPresentation';

export default function PelaporDashboard({ dashboard }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-primary-600">Pelapor</p>
                        <h2 className="page-title">{dashboard.title}</h2>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('reports.index')}>
                            <SecondaryButton>Laporan Saya</SecondaryButton>
                        </Link>
                        <Link href={route('reports.create')}>
                            <PrimaryButton>Buat Laporan</PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={dashboard.title} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <section className="app-panel overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-emerald-50 p-8">
                        <div className="max-w-3xl space-y-4">
                            <p className="eyebrow">Pelaporan dan Tracking</p>
                            <h3 className="section-title text-[30px]">{dashboard.summary.headline}</h3>
                            <p className="body-copy">
                                E-Matelik membantu Anda menjaga jejak laporan dari bukti awal,
                                verifikasi, hingga bukti penyelesaian bila penanganan sudah selesai.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Badge variant="success">{dashboard.summary.primaryAction}</Badge>
                                <Badge variant="info">{dashboard.summary.secondaryAction}</Badge>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <p className="text-sm text-neutral-500">Total laporan</p>
                            <p className="mt-2 text-3xl font-bold text-neutral-900">
                                {dashboard.stats.totalReports}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Menunggu verifikasi</p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">
                                {dashboard.stats.pendingReports}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Sudah selesai</p>
                            <p className="mt-2 text-3xl font-bold text-emerald-600">
                                {dashboard.stats.completedReports}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Bukti lengkap</p>
                            <p className="mt-2 text-3xl font-bold text-sky-700">
                                {dashboard.stats.withCompleteEvidence}
                            </p>
                        </Card>
                    </section>

                    <section className="app-card border-sky-100 bg-sky-50/80 text-sm leading-7 text-sky-800">
                        Status yang tampil di sistem adalah status administratif proses penanganan
                        dan pelacakan, bukan keputusan sosial final. Nilai utamanya ada pada
                        keterlacakan bukti, verifikasi, dan update tindak lanjut.
                    </section>

                    <section className="app-panel overflow-hidden">
                        <div className="border-b border-neutral-200 px-6 py-5">
                            <h3 className="section-title text-xl">Laporan terbaru</h3>
                        </div>
                        {dashboard.recentReports.length > 0 ? (
                            <div className="divide-y divide-neutral-200">
                                {dashboard.recentReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-lg font-semibold text-neutral-900">
                                                    {report.title}
                                                </p>
                                                <Badge variant={statusVariant(report.status_slug)}>
                                                    {report.status}
                                                </Badge>
                                                <Badge variant={priorityVariant(report.priority_level)}>
                                                    {priorityLabel(report.priority_level)}
                                                </Badge>
                                                {report.has_complete_evidence && (
                                                    <Badge variant="success">Closed-loop lengkap</Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                                                <span>{report.report_code}</span>
                                            </div>
                                        </div>
                                        <Link href={route('reports.show', report.id)}>
                                            <SecondaryButton>Lihat Detail</SecondaryButton>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-10 text-sm text-neutral-500">
                                Belum ada laporan terbaru.
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
