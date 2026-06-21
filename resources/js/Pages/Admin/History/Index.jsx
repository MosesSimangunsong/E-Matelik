import SimpleTable from '@/Components/SimpleTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminHistoryIndex({ histories }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="eyebrow !text-amber-700">Admin</p>
                    <h2 className="page-title">Histori Aktivitas</h2>
                    <p className="body-copy">
                        Lihat seluruh jejak perubahan laporan untuk audit trail MVP.
                    </p>
                </div>
            }
        >
            <Head title="Histori Aktivitas" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <SimpleTable
                        columns={[
                            { key: 'created_at', label: 'Waktu' },
                            { key: 'report_code', label: 'Kode Laporan' },
                            { key: 'actor', label: 'Aktor' },
                            { key: 'action', label: 'Aksi' },
                            { key: 'to_status', label: 'Status Baru' },
                            { key: 'note', label: 'Catatan' },
                        ]}
                        rows={histories}
                        emptyText="Belum ada histori aktivitas."
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
