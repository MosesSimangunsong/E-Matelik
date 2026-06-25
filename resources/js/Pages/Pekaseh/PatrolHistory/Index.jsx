import Badge from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PekasehPatrolHistoryIndex({ historyByDate = [], scope }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="eyebrow !text-secondary-600">Pekaseh</p>
                    <h2 className="page-title">Riwayat Patroli</h2>
                    <p className="body-copy">
                        Lihat histori checklist patroli per tanggal untuk titik-titik yang berada di Subak Anda.
                    </p>
                    {scope?.subak_name && (
                        <p className="mt-2 text-sm font-medium text-neutral-500">
                            Cakupan data: {scope.subak_name} (Subak ID {scope.subak_id})
                        </p>
                    )}
                </div>
            }
        >
            <Head title="Riwayat Patroli Pekaseh" />

            <div className="app-page space-y-6">
                {historyByDate.map((group) => (
                    <section key={group.date} className="space-y-4">
                        <div className="flex flex-col gap-3 rounded-card border border-neutral-200 bg-white p-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-900">{group.label}</h3>
                                <p className="mt-1 text-sm text-neutral-500">{group.date}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="default">Total {group.summary.total_points}</Badge>
                                <Badge variant="info">Diperiksa {group.summary.checked}</Badge>
                                <Badge variant="success">Aman {group.summary.safe}</Badge>
                                <Badge variant="warning">Atensi {group.summary.needs_attention}</Badge>
                                <Badge variant="danger">Rusak {group.summary.damaged}</Badge>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-panel">
                            <div className="hidden overflow-x-auto md:block">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Kode Titik</th>
                                            <th>Nama Titik</th>
                                            <th>Jenis Titik</th>
                                            <th>Lokasi / Koordinat</th>
                                            <th>Status Patroli</th>
                                            <th>Kondisi</th>
                                            <th>Waktu</th>
                                            <th>Petugas</th>
                                            <th>Catatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.rows.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.point_code}</td>
                                                <td>{row.name}</td>
                                                <td>{row.point_type}</td>
                                                <td>{row.location}</td>
                                                <td>{row.inspection_status}</td>
                                                <td>{row.condition}</td>
                                                <td>{row.scanned_at}</td>
                                                <td>{row.inspector}</td>
                                                <td>{row.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-neutral-200 md:hidden">
                                {group.rows.map((row) => (
                                    <div key={row.id} className="space-y-2 px-4 py-4">
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {row.point_code} - {row.name}
                                        </p>
                                        <p className="text-sm text-neutral-600">{row.point_type}</p>
                                        <p className="text-sm text-neutral-600">{row.location}</p>
                                        <p className="text-sm text-neutral-600">
                                            <strong>Status:</strong> {row.inspection_status}
                                        </p>
                                        <p className="text-sm text-neutral-600">
                                            <strong>Kondisi:</strong> {row.condition}
                                        </p>
                                        <p className="text-sm text-neutral-600">
                                            <strong>Waktu:</strong> {row.scanned_at}
                                        </p>
                                        <p className="text-sm text-neutral-600">
                                            <strong>Petugas:</strong> {row.inspector}
                                        </p>
                                        <p className="text-sm text-neutral-600">
                                            <strong>Catatan:</strong> {row.note}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
