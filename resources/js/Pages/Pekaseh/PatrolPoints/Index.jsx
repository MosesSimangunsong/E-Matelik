import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, patrolPoints = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Titik Patroli</h2>}
        >
            <Head title="Titik Patroli" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Daftar Titik Pemeriksaan Matelik</h3>
                                <Link href={route('pekaseh.patrol-points.create')}>
                                    <PrimaryButton>Tambah Titik Baru</PrimaryButton>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Titik</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {patrolPoints.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    Belum ada titik patroli yang ditambahkan.
                                                </td>
                                            </tr>
                                        ) : (
                                            patrolPoints.map((point) => (
                                                <tr key={point.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                        {point.point_code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {point.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                        {point.point_type.replace('_', ' ')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {point.is_active ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Aktif
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                Nonaktif
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link 
                                                            href={route('pekaseh.patrol-points.edit', point.id)} 
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button 
                                                            className="text-blue-600 hover:text-blue-900 font-medium"
                                                            onClick={() => alert(`QR Token: ${point.qr_token}\n(Fitur Modal QR akan diimplementasikan nanti)`)}
                                                        >
                                                            Lihat QR
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}