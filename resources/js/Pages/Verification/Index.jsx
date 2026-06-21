import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import LeafletMap from '@/Components/maps/LeafletMap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { priorityLabel, priorityVariant } from '@/lib/reportPresentation';

export default function VerificationIndex({ verification }) {
    const flash = usePage().props.flash ?? {};
    const markers = verification.pendingReports.map((report) => ({
        id: report.id,
        title: report.title,
        report_code: report.report_code,
        category: report.category,
        latitude: Number(report.latitude),
        longitude: Number(report.longitude),
        status: { name: report.status, slug: 'menunggu-verifikasi' },
        priority_level: report.priority_level,
    }));
    const center = markers.length > 0 ? [markers[0].latitude, markers[0].longitude] : [-8.65, 115.216];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-secondary-600">Pekaseh</p>
                        <h2 className="page-title">Daftar Verifikasi</h2>
                        <p className="body-copy">
                            Tinjau laporan yang masuk di lingkup Subak Anda lalu beri keputusan awal.
                        </p>
                    </div>
                    <Link href={route('pekaseh.dashboard')}>
                        <SecondaryButton>Kembali ke Dashboard</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Verifikasi Laporan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="app-card border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    <section className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <p className="text-sm text-neutral-500">Subak aktif</p>
                            <p className="mt-2 text-lg font-semibold text-neutral-900">
                                {verification.subak?.name ?? 'Belum ditetapkan'}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Region</p>
                            <p className="mt-2 text-lg font-semibold text-neutral-900">
                                {verification.subak?.region ?? '-'}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Menunggu verifikasi</p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">
                                {verification.stats.pendingCount}
                            </p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Backlog lewat 24 jam</p>
                            <p className="mt-2 text-3xl font-bold text-rose-600">
                                {verification.stats.overdueCount}
                            </p>
                        </Card>
                    </section>

                    <section className="app-card border-secondary-100 bg-secondary-50/80 text-sm leading-7 text-secondary-800">
                        <p className="font-semibold">{verification.processGuidance.headline}</p>
                        <p className="mt-2">{verification.processGuidance.escalationNote}</p>
                        <p className="mt-2">{verification.processGuidance.fallbackNote}</p>
                    </section>

                    {!verification.hasSubakAssignment ? (
                        <section className="app-card border-amber-200 bg-amber-50 text-sm leading-7 text-amber-800">
                            Akun Pekaseh ini belum terhubung ke Subak tertentu, jadi daftar verifikasi
                            belum bisa ditampilkan.
                        </section>
                    ) : (
                        <>
                            <section className="app-panel overflow-hidden">
                                <div className="border-b border-neutral-200 px-6 py-5">
                                    <h3 className="section-title text-xl">Laporan masuk</h3>
                                </div>
                                {verification.pendingReports.length > 0 ? (
                                    <div className="divide-y divide-neutral-200">
                                        {verification.pendingReports.map((report) => (
                                            <div
                                                key={report.id}
                                                className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                                            >
                                                <div className="space-y-2">
                                                    <p className="text-lg font-semibold text-neutral-900">
                                                        {report.title}
                                                    </p>
                                                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                                                        <span>{report.report_code}</span>
                                                        <span>{report.category}</span>
                                                        <span>{report.reporter?.display_name}</span>
                                                        <span>{report.submitted_at}</span>
                                                        {report.is_overdue && (
                                                            <span className="font-semibold text-rose-600">
                                                                Lewat 24 jam
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <Badge variant={priorityVariant(report.priority_level)}>
                                                            {priorityLabel(report.priority_level)}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Link href={route('verification.show', report.id)}>
                                                    <PrimaryButton>Tinjau Laporan</PrimaryButton>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-12 text-center">
                                        <p className="text-lg font-semibold text-neutral-900">
                                            Belum ada laporan menunggu verifikasi
                                        </p>
                                    </div>
                                )}
                            </section>

                            <section className="space-y-4">
                                <div>
                                    <h3 className="section-title text-xl">Peta laporan masuk</h3>
                                    <p className="mt-2 text-sm text-neutral-500">
                                        Marker membantu Pekaseh melihat persebaran laporan pada Subak yang sama.
                                    </p>
                                </div>
                                <LeafletMap
                                    markers={markers}
                                    center={center}
                                    zoom={13}
                                    heightClass="h-[420px]"
                                />
                            </section>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
