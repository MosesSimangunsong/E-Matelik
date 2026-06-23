import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import EvidenceGallery from '@/Components/reports/EvidenceGallery';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SimpleTable from '@/Components/SimpleTable';
import LeafletMap from '@/Components/maps/LeafletMap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    priorityLabel,
    priorityVariant,
    statusVariant,
} from '@/lib/reportPresentation';

export default function AdminReportShow({ report, statusOptions }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, patch, processing, errors } = useForm({
        status_id: String(report.status?.id ?? ''),
        note: '',
        resolution_note: report.resolution_note ?? '',
        resolution_photos: [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.reports.update-status', report.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-amber-700">Detail Laporan Admin</p>
                        <h2 className="page-title">{report.title}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <Badge variant={statusVariant(report.status?.slug)}>
                                {report.status?.name}
                            </Badge>
                            <Badge variant={priorityVariant(report.priority_level)}>
                                {priorityLabel(report.priority_level)}
                            </Badge>
                            {report.evidence?.has_complete_evidence ? (
                                <Badge variant="success">Bukti lengkap</Badge>
                            ) : (
                                <Badge variant="warning">Bukti belum lengkap</Badge>
                            )}
                            <span className="text-sm text-neutral-500">{report.report_code}</span>
                            <span className="text-sm text-neutral-500">{report.submitted_at}</span>
                        </div>
                    </div>
                    <Link href={route('admin.reports.index')}>
                        <SecondaryButton className="w-full sm:w-auto">Kembali ke Semua Laporan</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={`Admin ${report.report_code}`} />

            <div className="app-page">
                    {flash.success && (
                        <div className="app-card border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    <section className="info-strip border-amber-100 bg-amber-50/80 text-amber-900">
                        {report.status_context}
                    </section>

                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <Card className="space-y-5">
                            <div>
                                <p className="text-sm text-neutral-500">Pelapor</p>
                                <p className="mt-2 text-lg font-semibold text-neutral-900">
                                    {report.reporter?.display_name}
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">{report.reporter?.label}</p>
                                {report.reporter?.display_email && (
                                    <p className="mt-1 text-sm text-neutral-500">
                                        {report.reporter.display_email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Kategori</p>
                                <p className="mt-2 text-lg font-semibold text-neutral-900">{report.category?.name}</p>
                                <p className="mt-2 text-sm leading-7 text-neutral-600">{report.category?.description}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Deskripsi</p>
                                <p className="mt-2 text-[15px] leading-8 text-neutral-700">{report.description}</p>
                            </div>
                            <div className="app-card-muted">
                                <p className="text-sm text-neutral-500">Catatan verifikasi Pekaseh</p>
                                <p className="mt-2 text-sm leading-7 text-neutral-700">
                                    {report.verification_note || 'Belum ada catatan verifikasi.'}
                                </p>
                            </div>
                            <LeafletMap
                                markers={[{
                                    id: report.id,
                                    title: report.title,
                                    report_code: report.report_code,
                                    latitude: Number(report.latitude),
                                    longitude: Number(report.longitude),
                                    category: report.category?.name,
                                    status: report.status,
                                    priority_level: report.priority_level,
                                }]}
                                center={[Number(report.latitude), Number(report.longitude)]}
                                zoom={16}
                                heightClass="h-[320px]"
                            />
                        </Card>

                        <div className="space-y-6">
                            <Card className="space-y-4">
                                <div>
                                    <p className="text-sm text-neutral-500">Subak</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">{report.subak?.name}</p>
                                    <p className="mt-1 text-sm text-neutral-500">
                                        {[report.subak?.village, report.subak?.district, report.subak?.region].filter(Boolean).join(', ')}
                                    </p>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="app-card-muted">
                                        <p className="text-sm text-neutral-500">Diverifikasi</p>
                                        <p className="mt-2 font-semibold text-neutral-900">{report.verified_at || '-'}</p>
                                    </div>
                                    <div className="app-card-muted">
                                        <p className="text-sm text-neutral-500">Diselesaikan</p>
                                        <p className="mt-2 font-semibold text-neutral-900">{report.resolved_at || '-'}</p>
                                    </div>
                                </div>
                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Catatan penyelesaian</p>
                                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                                        {report.resolution_note || 'Belum ada catatan penyelesaian.'}
                                    </p>
                                </div>
                            </Card>

                            <form onSubmit={submit} className="app-panel space-y-5 p-5 sm:p-6">
                                <div>
                                    <p className="eyebrow">Update Status</p>
                                    <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                        Tindak lanjut laporan
                                    </h3>
                                </div>
                                <div>
                                    <InputLabel htmlFor="status_id" value="Status Baru" />
                                    <select
                                        id="status_id"
                                        className="form-input mt-2"
                                        value={data.status_id}
                                        onChange={(e) => setData('status_id', e.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status.id} value={status.id}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError className="mt-2" message={errors.status_id} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="note" value="Catatan Tindak Lanjut" />
                                    <textarea
                                        id="note"
                                        className="form-input mt-2 min-h-32"
                                        value={data.note}
                                        onChange={(e) => setData('note', e.target.value)}
                                        placeholder="Tuliskan progres atau keputusan tindak lanjut admin."
                                    />
                                    <InputError className="mt-2" message={errors.note} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="resolution_note" value="Catatan Penyelesaian (opsional)" />
                                    <textarea
                                        id="resolution_note"
                                        className="form-input mt-2 min-h-28"
                                        value={data.resolution_note}
                                        onChange={(e) => setData('resolution_note', e.target.value)}
                                        placeholder="Isi bila status akan ditutup atau sudah ada hasil penanganan di lapangan."
                                    />
                                    <InputError className="mt-2" message={errors.resolution_note} />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="resolution_photos"
                                        value="Foto Bukti Penyelesaian (opsional)"
                                    />
                                    <input
                                        id="resolution_photos"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="mt-2 block w-full rounded-soft border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-amber-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white"
                                        onChange={(e) => setData('resolution_photos', Array.from(e.target.files ?? []))}
                                    />
                                    {data.resolution_photos.length > 0 && (
                                        <p className="mt-2 text-sm text-neutral-500">
                                            {data.resolution_photos.length} foto penyelesaian dipilih.
                                        </p>
                                    )}
                                    <InputError className="mt-2" message={errors.resolution_photos} />
                                    <InputError className="mt-2" message={errors['resolution_photos.0']} />
                                </div>
                                <div className="rounded-soft border border-amber-100 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-800">
                                    Gunakan status ini sebagai indikator proses penanganan dan koordinasi.
                                    Bila status diubah menjadi selesai, sebaiknya disertai catatan dan bukti
                                    penyelesaian agar closed-loop reporting tetap kuat.
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing} className="w-full sm:w-auto">
                                        {processing ? 'Menyimpan...' : 'Update Status'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <EvidenceGallery
                            title="Bukti awal lapangan"
                            description="Dokumen awal yang menjadi basis penanganan dan verifikasi."
                            photos={report.initial_photos}
                            emptyText="Belum ada bukti awal pada laporan ini."
                            tone="warning"
                        />

                        <EvidenceGallery
                            title="Bukti penyelesaian"
                            description="Dokumen penyelesaian yang memperkuat transparansi sebelum status ditutup."
                            photos={report.resolution_photos}
                            emptyText="Belum ada bukti penyelesaian yang diunggah."
                            tone="success"
                        />
                    </div>

                    <section className="space-y-4">
                        <div>
                            <h3 className="section-title text-xl">Histori aktivitas</h3>
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
                        />
                    </section>
            </div>
        </AuthenticatedLayout>
    );
}
