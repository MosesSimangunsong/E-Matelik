import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import LeafletMap from '@/Components/maps/LeafletMap';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { priorityLabel, priorityVariant, statusVariant } from '@/lib/reportPresentation';

export default function AdminReportsIndex({ reports, filters, filterOptions, summary }) {
    const updateFilter = (key, value) => {
        router.get(route('admin.reports.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const markers = reports.slice(0, 20).map((report) => ({
        id: report.id,
        title: report.title,
        report_code: report.report_code,
        latitude: -8.65,
        longitude: 115.216,
        category: report.category,
        status: report.status,
        priority_level: report.priority_level,
    }));

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="eyebrow !text-amber-700">Admin</p>
                    <h2 className="page-title">Semua Laporan</h2>
                    <p className="body-copy">
                        Pantau seluruh laporan dan buka detail untuk memperbarui status tindak lanjut.
                    </p>
                </div>
            }
        >
            <Head title="Semua Laporan" />

            <div className="app-page">
                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <Card className="metric-card">
                            <p className="metric-label">Total terlihat</p>
                            <p className="metric-value">{summary.total}</p>
                        </Card>
                        <Card className="metric-card">
                            <p className="metric-label">Butuh perhatian</p>
                            <p className="metric-value text-amber-600">{summary.attention}</p>
                        </Card>
                        <Card className="metric-card">
                            <p className="metric-label">Bukti lengkap</p>
                            <p className="metric-value text-emerald-600">{summary.withCompleteEvidence}</p>
                        </Card>
                    </section>

                    <section className="grid gap-4 lg:grid-cols-3">
                        <Card>
                            <label className="form-label">Status</label>
                            <select
                                className="form-input mt-2"
                                value={filters.status}
                                onChange={(e) => updateFilter('status', e.target.value)}
                            >
                                <option value="">Semua status</option>
                                {filterOptions.statuses.map((status) => (
                                    <option key={status.slug} value={status.slug}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </Card>
                        <Card>
                            <label className="form-label">Kategori</label>
                            <select
                                className="form-input mt-2"
                                value={filters.category}
                                onChange={(e) => updateFilter('category', e.target.value)}
                            >
                                <option value="">Semua kategori</option>
                                {filterOptions.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </Card>
                        <Card>
                            <label className="form-label">Prioritas</label>
                            <select
                                className="form-input mt-2"
                                value={filters.priority}
                                onChange={(e) => updateFilter('priority', e.target.value)}
                            >
                                <option value="">Semua prioritas</option>
                                {filterOptions.priorities.map((priority) => (
                                    <option key={priority.value} value={priority.value}>
                                        {priority.label}
                                    </option>
                                ))}
                            </select>
                        </Card>
                    </section>

                    <section className="app-panel overflow-hidden">
                        <div className="border-b border-neutral-200 px-6 py-5">
                            <h3 className="section-title text-xl">Daftar laporan</h3>
                        </div>
                        {reports.length > 0 ? (
                            <div className="divide-y divide-neutral-200">
                                {reports.map((report) => (
                                    <div key={report.id} className="report-list-card m-4 flex flex-col gap-4 md:m-5 md:flex-row md:items-center md:justify-between">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-lg font-semibold text-neutral-900">
                                                    {report.title}
                                                </p>
                                                <Badge variant={statusVariant(report.status?.slug)}>
                                                    {report.status?.name}
                                                </Badge>
                                                <Badge variant={priorityVariant(report.priority_level)}>
                                                    {priorityLabel(report.priority_level)}
                                                </Badge>
                                                {report.has_complete_evidence ? (
                                                    <Badge variant="success">Bukti lengkap</Badge>
                                                ) : (
                                                    <Badge variant="warning">Bukti belum lengkap</Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                                                <span>{report.report_code}</span>
                                                <span>{report.reporter}</span>
                                                <span>{report.category}</span>
                                                <span>{report.subak}</span>
                                                <span>{report.submitted_at}</span>
                                            </div>
                                        </div>
                                        <Link href={route('admin.reports.show', report.id)}>
                                            <SecondaryButton className="w-full sm:w-auto">Lihat Detail</SecondaryButton>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-12 text-center text-neutral-500">
                                Tidak ada laporan yang cocok dengan filter saat ini.
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <div>
                            <h3 className="section-title text-xl">Peta monitoring cepat</h3>
                            <p className="mt-2 text-sm text-neutral-500">
                                Marker ringkas untuk membantu admin membaca persebaran laporan secara cepat.
                            </p>
                        </div>
                        <LeafletMap
                            markers={markers}
                            center={[-8.65, 115.216]}
                            zoom={11}
                            heightClass="h-[360px]"
                        />
                    </section>
            </div>
        </AuthenticatedLayout>
    );
}
