import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Badge from '@/Components/Badge';

export default function Dashboard({ auth, points = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Patroli Matelik</h2>}
        >
            <Head title="Dashboard Patroli" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 px-4">
                        <h3 className="text-lg font-medium text-gray-900">Checklist Patroli Hari Ini</h3>
                        <p className="text-sm text-gray-600">Pastikan semua titik telah diperiksa.</p>
                    </div>

                    <div className="grid gap-4 px-4">
                        {points.map((point) => (
                            <div key={point.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-200 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-800">{point.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase">{point.point_type.replace('_', ' ')}</p>
                                </div>
                                
                                {point.is_checked_today ? (
                                    <Badge color="green">Sudah Diperiksa</Badge>
                                ) : (
                                    <Link 
                                        href={route('pelapor.patrol.scan.page', point.qr_token)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Scan QR
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}