import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ report }) {
    // Fungsi pembantu untuk merender status dengan warna yang sesuai
    const renderStatusBadge = (status) => {
        let bgColor = 'bg-gray-100 text-gray-800';
        if (status?.slug === 'completed') bgColor = 'bg-green-100 text-green-800';
        else if (status?.slug === 'verified') bgColor = 'bg-blue-100 text-blue-800';
        else if (status?.slug === 'escalated') bgColor = 'bg-red-100 text-red-800';
        else if (status?.slug === 'pending_verification') bgColor = 'bg-yellow-100 text-yellow-800';

        return (
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
                {status?.name || 'Status Tidak Diketahui'}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Head title={`Kapsul Bukti - ${report?.report_code}`} />

            <div className="max-w-2xl mx-auto">
                {/* Header Kapsul Bukti */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">E-Matelik</h1>
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest mt-1">Kapsul Bukti Administratif</p>
                </div>

                {/* Konten Utama */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg border-t-4 border-indigo-600">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {report?.title || 'Detail Laporan'}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Kode: <span className="font-mono font-bold text-gray-700">{report?.report_code}</span>
                            </p>
                        </div>
                        <div>
                            {renderStatusBadge(report?.status)}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Tanggal Dilaporkan</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.submitted_at}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Lokasi Subak</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {report?.subak?.name || '-'} ({report?.subak?.village}, {report?.subak?.district})
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Kategori Insiden</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.category?.name || '-'}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Keterangan Laporan</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.description}</dd>
                            </div>

                            {/* Foto Bukti Awal */}
                            {report?.initial_photos && report.initial_photos.length > 0 && (
                                <div className="py-4 sm:py-5 sm:px-6 bg-gray-50">
                                    <dt className="text-sm font-medium text-gray-900 mb-2">Foto Bukti Awal (Saat Insiden)</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <div className="grid grid-cols-2 gap-4">
                                            {report.initial_photos.map((photo) => (
                                                <div key={photo.id} className="relative rounded-lg overflow-hidden border border-gray-200">
                                                    <img src={photo.url} alt="Bukti Awal" className="w-full h-32 object-cover" />
                                                    <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-xs text-white p-1 text-center truncate">
                                                        {photo.uploaded_at}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}

                            {/* Foto Bukti Penyelesaian (Jika Ada) */}
                            {report?.resolution_photos && report.resolution_photos.length > 0 && (
                                <div className="py-4 sm:py-5 sm:px-6 bg-green-50 border-t border-green-100">
                                    <dt className="text-sm font-medium text-green-900 mb-2">Foto Bukti Penyelesaian (Closed-loop)</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <div className="grid grid-cols-2 gap-4">
                                            {report.resolution_photos.map((photo) => (
                                                <div key={photo.id} className="relative rounded-lg overflow-hidden border border-green-200 shadow-sm">
                                                    <img src={photo.url} alt="Bukti Selesai" className="w-full h-32 object-cover" />
                                                    <div className="absolute bottom-0 bg-green-900 bg-opacity-70 w-full text-xs text-white p-1 text-center truncate">
                                                        {photo.uploaded_at}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {/* Sanggahan / Disclaimer Produk */}
                <div className="mt-8 text-center px-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        <strong>Perhatian:</strong> Dokumen ini adalah <span className="font-semibold text-gray-700">Kapsul Bukti Administratif Ber-QR</span> yang diterbitkan oleh sistem E-Matelik. 
                        Sistem ini berfungsi sebagai alat bantu dokumentasi dan pelacakan administratif (closed-loop evidence). 
                        Dokumen ini <strong>bukan</strong> pengganti tata kelola adat yang sah dan <strong>bukan</strong> alat bukti hukum final. 
                        Identitas pelapor sengaja disamarkan pada tampilan publik ini demi menjaga privasi dan keamanan krama.
                    </p>
                    <div className="mt-6">
                        <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            &larr; Kembali ke Beranda E-Matelik
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}