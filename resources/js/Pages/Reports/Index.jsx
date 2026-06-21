import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import LeafletMap from '@/Components/maps/LeafletMap';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    priorityLabel,
    priorityVariant,
    statusVariant,
} from '@/lib/reportPresentation';

export default function ReportsIndex({ reports, summary }) {
    const flash = usePage().props.flash ?? {};
    const mapMarkers = reports.map((report) => ({
        id: report.id,
        title: report.title,
        report_code: report.report_code,
        latitude: Number(report.latitude),
        longitude: Number(report.longitude),
        category: report.category,
        status: report.status,
        priority_level: report.priority_level,
    }));
    const mapCenter = mapMarkers.length > 0
        ? [mapMarkers[0].latitude, mapMarkers[0].longitude]
        : [-8.65, 115.216];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-primary-600">Pelapor</p>
                        <h2 className="page-title">Laporan Saya</h2>
                        <p className="body-copy">
                            Pantau status administratif, bukti awal, dan kelengkapan jejak penyelesaian laporan Anda.
                        </p>
                    </div>
                    <Link href={route('reports.create')}>
                        <PrimaryButton>Buat Laporan</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Laporan Saya" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="app-card border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    <section className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <p className="text-sm text-neutral-500">Total laporan</p>
                            <p className="mt-2 text-3xl font-bold text-neutral-900">{summary.total}</p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Menunggu verifikasi</p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">{summary.pending}</p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Selesai</p>
                            <p className="mt-2 text-3xl font-bold text-emerald-600">{summary.completed}</p>
                        </Card>
                        <Card>
                            <p className="text-sm text-neutral-500">Bukti lengkap</p>
                            <p className="mt-2 text-3xl font-bold text-sky-700">
                                {summary.withCompleteEvidence}
                            </p>
                        </Card>
                    </section>

                    <section className="app-card border-sky-100 bg-sky-50/80 text-sm leading-7 text-sky-800">
                        Status sistem pada daftar ini adalah status administratif penanganan. Jika laporan
                        sudah selesai tetapi belum memiliki bukti penyelesaian, itu berarti closed-loop evidence
                        masih belum lengkap.
                    </section>

                    <section className="app-panel overflow-hidden">
                        <div className="border-b border-neutral-200 px-6 py-5">
                            <h3 className="section-title text-xl">Daftar laporan</h3>
                        </div>

                        {reports.length > 0 ? (
                            <div className="divide-y divide-neutral-200">
                                {reports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-lg font-semibold text-neutral-900">
                                                    {report.title}
                                                </p>
                                                <Badge variant={statusVariant(report.status?.slug)}>
                                                    {report.status?.name ?? 'Status belum tersedia'}
                                                </Badge>
                                                <Badge variant={priorityVariant(report.priority_level)}>
                                                    {priorityLabel(report.priority_level)}
                                                </Badge>
                                                {report.has_complete_evidence ? (
                                                    <Badge variant="success">Closed-loop lengkap</Badge>
                                                ) : (
                                                    <Badge variant="warning">Butuh bukti lanjutan</Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                                                <span>{report.report_code}</span>
                                                <span>{report.category}</span>
                                                <span>{report.submitted_at}</span>
                                                <span>{report.initial_photos_count} bukti awal</span>
                                                <span>{report.resolution_photos_count} bukti selesai</span>
                                            </div>
                                            <p className="text-sm text-neutral-600">
                                                Koordinat: {report.latitude}, {report.longitude}
                                            </p>
                                        </div>

                                        <Link href={route('reports.show', report.id)}>
                                            <SecondaryButton>Lihat Detail</SecondaryButton>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="text-lg font-semibold text-neutral-900">
                                    Belum ada laporan yang dikirim
                                </p>
                                <p className="mt-2 body-copy">
                                    Mulai dari satu laporan pertama untuk mendokumentasikan gangguan
                                    telabah di lapangan.
                                </p>
                                <div className="mt-6">
                                    <Link href={route('reports.create')}>
                                        <PrimaryButton>Buat Laporan Pertama</PrimaryButton>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="section-title text-xl">Peta laporan saya</h3>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Marker prioritas tinggi dan darurat akan tampil lebih tegas agar tidak tenggelam.
                                </p>
                            </div>
                            <Link href={route('map.index')} className="text-sm font-semibold text-secondary-700">
                                Buka peta penuh
                            </Link>
                        </div>

                        <LeafletMap
                            markers={mapMarkers}
                            center={mapCenter}
                            zoom={13}
                            heightClass="h-[360px]"
                        />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
