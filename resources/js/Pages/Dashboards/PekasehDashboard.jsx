import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Head, Link } from '@inertiajs/react';

export default function PekasehDashboard({ dashboard }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-secondary-600">Pekaseh</p>
                        <h2 className="page-title">{dashboard.title}</h2>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('map.index')}>
                            <SecondaryButton>Peta</SecondaryButton>
                        </Link>
                        <Link href={route('verification.index')}>
                            <PrimaryButton>Verifikasi Laporan</PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={dashboard.title} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
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

                    <section className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <p className="text-sm text-neutral-500">Subak aktif</p>
                            <p className="mt-2 text-lg font-semibold text-neutral-900">
                                {dashboard.subak?.name ?? 'Belum ditetapkan'}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Menunggu verifikasi</p>
                            <p className="mt-2 text-lg font-semibold text-neutral-900">
                                {dashboard.stats.pendingReports}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Backlog lewat 24 jam</p>
                            <p className="mt-2 text-lg font-semibold text-rose-600">
                                {dashboard.stats.overdueReports}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Region</p>
                            <p className="mt-2 text-lg font-semibold text-neutral-900">
                                {dashboard.subak?.region ?? '-'}
                            </p>
                        </Card>
                    </section>

                    <section className="app-card border-secondary-100 bg-secondary-50/80 text-sm leading-7 text-secondary-800">
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
                                        className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
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
                                            <SecondaryButton>Tinjau Detail</SecondaryButton>
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
            </div>
        </AuthenticatedLayout>
    );
}
