import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import LeafletMap from '@/Components/maps/LeafletMap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function defaultCenter(reports) {
    if (reports.length > 0) {
        return [reports[0].latitude, reports[0].longitude];
    }

    return [-8.65, 115.216];
}

export default function MapIndex({ mapReports, mapContext }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="eyebrow !text-secondary-600">WebGIS</p>
                    <h2 className="page-title">{mapContext.title}</h2>
                    <p className="body-copy">{mapContext.description}</p>
                </div>
            }
        >
            <Head title="Peta Insiden" />

            <div className="app-page">
                    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                        <LeafletMap
                            markers={mapReports}
                            center={defaultCenter(mapReports)}
                            zoom={13}
                            heightClass="h-[420px] sm:h-[520px] lg:h-[560px]"
                        />

                        <div className="space-y-4">
                            <Card>
                                <p className="text-sm text-neutral-500">Jumlah marker</p>
                                <p className="mt-2 text-3xl font-bold text-neutral-900">
                                    {mapReports.length}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-neutral-600">
                                    Peta ini memakai OpenStreetMap dan marker sederhana agar tetap ringan
                                    sesuai scope MVP.
                                </p>
                                <p className="mt-2 text-sm leading-7 text-neutral-600">
                                    Identitas pelapor ditampilkan sesuai kewenangan role untuk menjaga
                                    keterlacakan internal tanpa membuka data lebih luas dari yang diperlukan.
                                </p>
                            </Card>

                            <Card className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-neutral-900">
                                        Laporan pada peta
                                    </h3>
                                    <Badge variant="info">
                                        {mapContext.role ?? 'user'}
                                    </Badge>
                                </div>

                                {mapReports.length > 0 ? (
                                    <div className="space-y-3">
                                        {mapReports.map((report) => (
                                            <div
                                                key={report.id}
                                                className="rounded-soft border border-neutral-200 bg-neutral-50 px-4 py-4"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-neutral-900">
                                                            {report.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-neutral-500">
                                                            {report.report_code}
                                                        </p>
                                                        <p className="mt-2 text-sm text-neutral-600">
                                                            {report.category}
                                                        </p>
                                                    </div>
                                                    {report.status?.name && (
                                                        <Badge variant="default">
                                                            {report.status.name}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {report.subak?.name && (
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        {report.subak.name} • {report.subak.region}
                                                    </p>
                                                )}

                                                <p className="mt-2 text-xs text-neutral-500">
                                                    {report.reporter?.label}
                                                    {report.reporter?.scope === 'full' &&
                                                    report.reporter?.display_name
                                                        ? `: ${report.reporter.display_name}`
                                                        : ''}
                                                </p>

                                                {mapContext.role === 'pelapor' && (
                                                    <div className="mt-3">
                                                        <Link
                                                            href={route('reports.show', report.id)}
                                                            className="text-sm font-semibold text-secondary-700"
                                                        >
                                                            Lihat detail laporan
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-500">
                                        Belum ada laporan yang bisa ditampilkan di peta.
                                    </p>
                                )}
                            </Card>
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
