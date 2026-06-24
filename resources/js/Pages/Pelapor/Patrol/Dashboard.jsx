import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Dashboard({ auth, points = [], statistics = {} }) {
    const [isScanning, setIsScanning] = useState(false);

    // --- LOGIKA SCANNER KAMERA ---
    useEffect(() => {
        let html5QrcodeScanner = null;

        if (isScanning) {
            // Inisialisasi Scanner saat modal dibuka
            html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            html5QrcodeScanner.render(
                (decodedText) => {
                    // JIKA SCAN BERHASIL:
                    // 1. Hentikan kamera
                    html5QrcodeScanner.clear();
                    setIsScanning(false);
                    
                    // 2. Validasi apakah QR Code milik E-Matelik (mengandung URL scan)
                    if (decodedText.includes('/pelapor/patrol/scan/')) {
                        // Redirect mulus menggunakan Inertia
                        router.visit(decodedText);
                    } else {
                        alert("Gagal: QR Code ini tidak dikenali oleh sistem E-Matelik.");
                    }
                },
                (errorMessage) => {
                    // Scan gagal (berjalan tiap frame saat QR belum terbaca), biarkan kosong agar tidak spam console
                }
            );
        }

        // Cleanup: Matikan kamera saat komponen ditutup/unmount
        return () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch(error => {
                    console.error("Gagal membersihkan scanner", error);
                });
            }
        };
    }, [isScanning]);


    // --- FUNGSI RENDER UI ---
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'safe':
                return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">✅ Aman</span>;
            case 'needs_attention':
                return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">⚠️ Perlu Perhatian</span>;
            case 'damaged':
                return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">🚨 Rusak</span>;
            case 'unchecked':
            default:
                return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-500">⏳ Belum Dicek</span>;
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Checklist Patroli Harian</h2>}>
            <Head title="Patroli Matelik" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* BAGIAN 1: STATISTIK HARIAN */}
                    <div className="px-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-blue-500 text-center">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Titik</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{statistics.total || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-green-500 text-center">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Sudah Dicek</p>
                            <p className="mt-2 text-3xl font-bold text-green-600">{statistics.checked || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-yellow-500 text-center">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Atensi</p>
                            <p className="mt-2 text-3xl font-bold text-yellow-600">{statistics.needs_attention || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-red-500 text-center">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Rusak</p>
                            <p className="mt-2 text-3xl font-bold text-red-600">{statistics.damaged || 0}</p>
                        </div>
                    </div>

                    {/* BAGIAN 2: TOMBOL SCAN QR */}
                    <div className="px-4">
                        <button 
                            onClick={() => setIsScanning(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg flex justify-center items-center gap-2 transition duration-150"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5v3a1 1 0 01-2 0V4zm14-1a1 1 0 011 1v3a1 1 0 01-2 0V5h-3a1 1 0 010-2h4zM3 20a1 1 0 001 1h4a1 1 0 000-2H5v-3a1 1 0 00-2 0v4zm14 1a1 1 0 001-1v-4a1 1 0 00-2 0v3h-3a1 1 0 000 2h4z"></path>
                            </svg>
                            <span className="text-lg">Scan QR Patroli</span>
                        </button>
                    </div>

                    {/* BAGIAN 3: DAFTAR TITIK TELABAH */}
                    <div className="px-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Daftar Titik Hari Ini</h3>
                        <div className="grid gap-3">
                            {points.map((point) => (
                                <div key={point.id} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 flex justify-between items-center ${
                                    point.status === 'damaged' ? 'border-red-500 opacity-75' : 
                                    point.status === 'needs_attention' ? 'border-yellow-500 opacity-75' :
                                    point.status === 'safe' ? 'border-green-500 opacity-75' : 'border-gray-300'
                                }`}>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{point.name}</h4>
                                        <p className="text-xs text-gray-500 uppercase">{point.point_code}</p>
                                    </div>
                                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                                        {renderStatusBadge(point.status)}
                                        {point.status === 'unchecked' && (
                                            <Link 
                                                href={route('pelapor.patrol.scan.page', point.qr_token)}
                                                className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
                                            >
                                                Buka Manual
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {points.length === 0 && (
                                <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                                    <p className="text-gray-500 text-sm">Pekaseh belum memetakan titik patroli di Subak Anda.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* MODAL SCANNER KAMERA */}
            {isScanning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
                        <div className="bg-indigo-600 p-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">Pindai QR Titik</h3>
                            <button 
                                onClick={() => setIsScanning(false)} 
                                className="text-white hover:text-indigo-200 font-bold text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Area Render html5-qrcode */}
                        <div className="p-4 bg-gray-50">
                            <div id="qr-reader" className="w-full border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"></div>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Arahkan kamera ke QR Code yang tertempel di titik telabah.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}