import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import EvidenceGallery from '@/Components/reports/EvidenceGallery';
import LeafletMap from '@/Components/maps/LeafletMap';
import SecondaryButton from '@/Components/SecondaryButton';
import SimpleTable from '@/Components/SimpleTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    priorityLabel,
    priorityVariant,
    statusVariant,
} from '@/lib/reportPresentation';

export default function ReportsShow({ report }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-primary-600">Detail Laporan</p>
                        <h2 className="page-title">{report.title}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <Badge variant={statusVariant(report.status?.slug)}>
                                {report.status?.name}
                            </Badge>
                            <Badge variant={priorityVariant(report.priority_level)}>
                                {priorityLabel(report.priority_level)}
                            </Badge>
                            {report.evidence?.has_complete_evidence ? (
                                <Badge variant="success">Closed-loop lengkap</Badge>
                            ) : (
                                <Badge variant="warning">Closed-loop belum lengkap</Badge>
                            )}
                            <span className="text-sm text-neutral-500">{report.report_code}</span>
                            <span className="text-sm text-neutral-500">{report.submitted_at}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href={route('reports.index')}>
                            <SecondaryButton>Kembali</SecondaryButton>
                        </Link>
                        <Link href={route('reports.create')}>
                            <SecondaryButton>Buat Laporan Baru</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={report.title} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <section className="app-card border-sky-100 bg-sky-50/80 text-sm leading-7 text-sky-800">
                        {report.status_context}
                    </section>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <Card className="space-y-5">
                            <div>
                                <p className="text-sm text-neutral-500">Kategori</p>
                                <p className="mt-1 text-lg font-semibold text-neutral-900">
                                    {report.category?.name}
                                </p>
                                {report.category?.description && (
                                    <p className="mt-2 text-sm leading-7 text-neutral-600">
                                        {report.category.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-neutral-500">Deskripsi</p>
                                <p className="mt-2 text-[15px] leading-8 text-neutral-700">
                                    {report.description}
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Latitude</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">
                                        {report.latitude}
                                    </p>
                                </div>
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Longitude</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">
                                        {report.longitude}
                                    </p>
                                </div>
                            </div>

                            <div className="app-card-muted">
                                <p className="text-sm text-neutral-500">Keterangan Lokasi</p>
                                <p className="mt-2 text-sm leading-7 text-neutral-700">
                                    {report.address_text || 'Belum ada keterangan lokasi tambahan.'}
                                </p>
                            </div>

                            <div>
                                <p className="mb-3 text-sm text-neutral-500">Peta lokasi laporan</p>
                                <LeafletMap
                                    markers={[
                                        {
                                            id: report.id,
                                            title: report.title,
                                            report_code: report.report_code,
                                            latitude: Number(report.latitude),
                                            longitude: Number(report.longitude),
                                            category: report.category?.name,
                                            status: report.status,
                                            priority_level: report.priority_level,
                                        },
                                    ]}
                                    center={[Number(report.latitude), Number(report.longitude)]}
                                    zoom={16}
                                    heightClass="h-[320px]"
                                />
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <p className="text-sm text-neutral-500">Subak</p>
                                <p className="mt-2 text-lg font-semibold text-neutral-900">
                                    {report.subak?.name ?? '-'}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-neutral-600">
                                    {[
                                        report.subak?.village,
                                        report.subak?.district,
                                        report.subak?.region,
                                    ]
                                        .filter(Boolean)
                                        .join(', ') || 'Informasi wilayah belum lengkap.'}
                                </p>
                            </Card>

                            <Card className="space-y-4">
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Bukti awal</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">
                                        {report.evidence?.initial_count ?? 0} file
                                    </p>
                                </div>
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Bukti penyelesaian</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">
                                        {report.evidence?.resolution_count ?? 0} file
                                    </p>
                                </div>
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Catatan penyelesaian</p>
                                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                                        {report.resolution_note || 'Belum ada catatan penyelesaian.'}
                                    </p>
                                    <p className="mt-2 text-xs text-neutral-500">
                                        {report.resolved_at
                                            ? `Terakhir diperbarui: ${report.resolved_at}`
                                            : 'Belum ada waktu penyelesaian tercatat.'}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <EvidenceGallery
                            title="Bukti awal lapangan"
                            description="Dokumentasi visual saat laporan pertama kali dibuat."
                            photos={report.initial_photos}
                            emptyText="Belum ada bukti awal pada laporan ini."
                            tone="warning"
                        />

                        <EvidenceGallery
                            title="Bukti penyelesaian"
                            description="Dokumentasi after-action untuk menunjukkan bahwa penanganan sudah dilaporkan selesai."
                            photos={report.resolution_photos}
                            emptyText="Belum ada bukti penyelesaian yang diunggah."
                            tone="success"
                        />
                    </div>

                    <section className="space-y-4">
                        <div>
                            <h3 className="section-title text-xl">Histori laporan</h3>
                            <p className="mt-2 text-sm text-neutral-500">
                                Setiap perubahan penting dicatat untuk menjaga jejak administratif proses.
                            </p>
                        </div>
                        <SimpleTable
                            columns={[
                                { key: 'created_at', label: 'Waktu' },
                                { key: 'actor', label: 'Aktor' },
                                { key: 'action', label: 'Aksi' },
                                { key: 'to_status', label: 'Status Baru' },
                                { key: 'note', label: 'Catatan' },
                            ]}
                            rows={report.history}
                            emptyText="Belum ada histori aktivitas."
                        />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
