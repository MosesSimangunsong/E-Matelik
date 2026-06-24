import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { QRCodeCanvas } from 'qrcode.react'; // Menggunakan Canvas agar mudah di-download

export default function Index({ auth, patrolPoints }) {
    const { delete: destroy } = useForm();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const qrRef = useRef(null);

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus titik patroli ini?')) {
            destroy(route('pekaseh.patrol-points.destroy', id));
        }
    };

    // --- LOGIKA MODAL QR CODE ---
    const openQrModal = (point) => {
        setSelectedPoint(point);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPoint(null);
    };

    const getScanUrl = () => {
        if (!selectedPoint) return '';
        // Menggunakan Ziggy route() untuk mendapatkan Absolute URL
        return route('pelapor.patrol.scan.page', selectedPoint.qr_token);
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(getScanUrl());
        alert('URL Scan berhasil disalin!');
    };

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;
        
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_${selectedPoint.point_code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const printQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;
        
        const dataUrl = canvas.toDataURL();
        const windowContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print QR - ${selectedPoint.point_code}</title>
                <style>
                    body { font-family: sans-serif; text-align: center; margin-top: 50px; }
                    .container { display: inline-block; border: 2px dashed #000; padding: 20px; border-radius: 10px; }
                    h2 { margin: 0 0 10px 0; }
                    p { margin: 10px 0 0 0; font-size: 14px; color: #555; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>${selectedPoint.name}</h2>
                    <h3>${selectedPoint.point_code}</h3>
                    <img src="${dataUrl}" style="width: 250px; height: 250px;" />
                    <p>Subak E-Matelik Checkpoint</p>
                </div>
                <script>
                    window.onload = function() { window.print(); window.close(); };
                </script>
            </body>
            </html>
        `;
        const printWin = window.open('', '', 'width=600,height=600');
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.close();
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Titik Patroli</h2>}>
            <Head title="Titik Patroli" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Action */}
                    <div className="mb-4 flex justify-between items-center px-4 sm:px-0">
                        <p className="text-gray-600 text-sm">Kelola lokasi telabah yang menjadi checkpoint pengawasan Krama.</p>
                        <Link
                            href={route('pekaseh.patrol-points.create')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow"
                        >
                            + Tambah Titik
                        </Link>
                    </div>

                    {/* Tabel Data */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode / Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {patrolPoints.map((point) => (
                                        <tr key={point.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{point.name}</div>
                                                <div className="text-sm text-gray-500">{point.point_code}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="capitalize text-sm text-gray-700">{point.point_type.replace('_', ' ')}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${point.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {point.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                {/* Tombol Tampilkan QR */}
                                                <button onClick={() => openQrModal(point)} className="text-blue-600 hover:text-blue-900 font-semibold">
                                                    Lihat QR
                                                </button>
                                                
                                                <Link href={route('pekaseh.patrol-points.edit', point.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(point.id)} className="text-red-600 hover:text-red-900">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {patrolPoints.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                Belum ada data titik patroli.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* MODAL QR CODE */}
            {isModalOpen && selectedPoint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
                        >
                            &times;
                        </button>
                        
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">QR Code {selectedPoint.point_code}</h3>
                            <p className="text-sm text-gray-500 mb-6">{selectedPoint.name}</p>
                            
                            {/* Tempat Render QR Code Canvas */}
                            <div className="flex justify-center bg-gray-50 p-4 rounded-lg border border-gray-200" ref={qrRef}>
                                <QRCodeCanvas 
                                    value={getScanUrl()} 
                                    size={200}
                                    level={"H"} // Error correction level High agar tetap terbaca meski agak pudar
                                    includeMargin={true}
                                />
                            </div>
                            
                            <p className="mt-3 text-xs text-gray-400 break-all bg-gray-100 p-2 rounded">
                                {getScanUrl()}
                            </p>

                            <div className="mt-6 grid grid-cols-3 gap-2">
                                <button onClick={copyUrl} className="flex flex-col items-center justify-center p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded">
                                    <span className="text-xs font-semibold mt-1">Copy URL</span>
                                </button>
                                <button onClick={downloadQR} className="flex flex-col items-center justify-center p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded">
                                    <span className="text-xs font-semibold mt-1">Download</span>
                                </button>
                                <button onClick={printQR} className="flex flex-col items-center justify-center p-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded">
                                    <span className="text-xs font-semibold mt-1">Print QR</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}