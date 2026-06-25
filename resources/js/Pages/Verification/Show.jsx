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
import { Head, Link, useForm } from '@inertiajs/react';
import {
    priorityLabel,
    priorityVariant,
    statusVariant,
} from '@/lib/reportPresentation';

export default function VerificationShow({ report, verdictOptions, verificationGuidance }) {
    const { data, setData, patch, processing, errors } = useForm({
        verdict: '',
        verification_note: report.verification_note ?? '',
        resolution_photos: [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('verification.update', report.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-secondary-600">Verifikasi Laporan</p>
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
                                <Badge variant="warning">Perlu bukti lanjutan</Badge>
                            )}
                            <span className="text-sm text-neutral-500">{report.report_code}</span>
                            <span className="text-sm text-neutral-500">{report.submitted_at}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                            href={route('verification.pdf', report.id)}
                            className="btn-secondary inline-flex w-full items-center justify-center sm:w-auto"
                        >
                            Unduh PDF
                        </a>
                        <Link href={route('verification.index')}>
                            <SecondaryButton className="w-full sm:w-auto">Kembali ke Daftar Verifikasi</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Verifikasi ${report.report_code}`} />

            <div className="app-page">
                    <section className="info-strip border-secondary-100 bg-secondary-50/80 text-secondary-800">
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
                                <p className="mt-2 text-lg font-semibold text-neutral-900">
                                    {report.category?.name}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-neutral-600">
                                    {report.category?.description}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-neutral-500">Deskripsi laporan</p>
                                <p className="mt-2 text-[15px] leading-8 text-neutral-700">
                                    {report.description}
                                </p>
                            </div>

                            <div className="app-card-muted">
                                <p className="text-sm text-neutral-500">Keterangan lokasi</p>
                                <p className="mt-2 text-sm leading-7 text-neutral-700">
                                    {report.address_text || 'Belum ada keterangan tambahan.'}
                                </p>
                            </div>

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
                        </Card>

                        <div className="space-y-6">
                            <Card className="space-y-4">
                                <div>
                                    <p className="text-sm text-neutral-500">Subak</p>
                                    <p className="mt-2 text-lg font-semibold text-neutral-900">
                                        {report.subak?.name}
                                    </p>
                                    <p className="mt-1 text-sm text-neutral-500">
                                        {[report.subak?.village, report.subak?.district, report.subak?.region]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="app-card-muted">
                                        <p className="text-sm text-neutral-500">Bukti awal</p>
                                        <p className="mt-2 font-semibold text-neutral-900">
                                            {report.evidence?.initial_count ?? 0} file
                                        </p>
                                    </div>
                                    <div className="app-card-muted">
                                        <p className="text-sm text-neutral-500">Bukti penyelesaian</p>
                                        <p className="mt-2 font-semibold text-neutral-900">
                                            {report.evidence?.resolution_count ?? 0} file
                                        </p>
                                    </div>
                                </div>

                                <div className="app-card-muted">
                                    <p className="text-sm text-neutral-500">Catatan penyelesaian</p>
                                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                                        {report.resolution_note || 'Belum ada catatan penyelesaian.'}
                                    </p>
                                    <p className="mt-2 text-xs text-neutral-500">
                                        {report.resolved_at
                                            ? `Tercatat selesai pada ${report.resolved_at}`
                                            : 'Belum ada waktu penyelesaian tercatat.'}
                                    </p>
                                </div>
                            </Card>

                            <form onSubmit={submit} className="app-panel space-y-5 p-5 sm:p-6">
                                <div>
                                    <p className="eyebrow">Keputusan Pekaseh</p>
                                    <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                        Simpan hasil verifikasi awal
                                    </h3>
                                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                                        {verificationGuidance.headline}
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="verdict" value="Keputusan Verifikasi" />
                                    <select
                                        id="verdict"
                                        className="form-input mt-2"
                                        value={data.verdict}
                                        onChange={(e) => setData('verdict', e.target.value)}
                                    >
                                        <option value="">Pilih keputusan</option>
                                        {verdictOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label} -&gt; {option.mapsTo}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError className="mt-2" message={errors.verdict} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="verification_note" value="Catatan Verifikasi" />
                                    <textarea
                                        id="verification_note"
                                        className="form-input mt-2 min-h-36"
                                        value={data.verification_note}
                                        onChange={(e) => setData('verification_note', e.target.value)}
                                        placeholder="Tuliskan hasil peninjauan Pekaseh, konteks lapangan, dan alasan keputusan."
                                    />
                                    <InputError className="mt-2" message={errors.verification_note} />
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
                                        className="mt-2 block w-full rounded-soft border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-secondary-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white"
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

                                <div className="rounded-soft border border-secondary-100 bg-secondary-50 px-4 py-4 text-sm leading-7 text-secondary-700">
                                    <p>{verificationGuidance.clarificationNote}</p>
                                    <p className="mt-2">{verificationGuidance.escalationNote}</p>
                                    <p className="mt-2">
                                        <strong>Selesai Internal</strong> diperlakukan sebagai verdict Pekaseh dan
                                        dipetakan ke status sistem <strong>Selesai</strong>, sambil tetap mencatat
                                        histori <code>completed_internal</code>.
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing} className="w-full sm:w-auto">
                                        {processing ? 'Menyimpan...' : 'Simpan Keputusan'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <EvidenceGallery
                            title="Bukti awal lapangan"
                            description="Dokumen lapangan awal yang menjadi dasar verifikasi, bukan bukti forensik final."
                            photos={report.initial_photos}
                            emptyText="Belum ada bukti awal pada laporan ini."
                            tone="warning"
                        />

                        <EvidenceGallery
                            title="Bukti penyelesaian"
                            description="Dokumentasi after-action untuk memperkuat transparansi closed-loop reporting."
                            photos={report.resolution_photos}
                            emptyText="Belum ada bukti penyelesaian yang diunggah."
                            tone="success"
                        />
                    </div>

                    <section className="space-y-4">
                        <div>
                            <h3 className="section-title text-xl">Histori laporan</h3>
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
        </AuthenticatedLayout>
    );
}
