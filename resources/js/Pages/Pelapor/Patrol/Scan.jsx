import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Scan({ auth, patrolPoint }) {
    const [gpsStatus, setGpsStatus] = useState('Mencari lokasi GPS Anda...');
    const [hasGps, setHasGps] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        gps_latitude: '',
        gps_longitude: '',
        inspection_note: '',
    });

    // Meminta akses GPS saat halaman pertama kali dibuka
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData((prev) => ({
                        ...prev,
                        gps_latitude: position.coords.latitude,
                        gps_longitude: position.coords.longitude
                    }));
                    setGpsStatus('Lokasi GPS berhasil ditemukan.');
                    setHasGps(true);
                },
                (error) => {
                    console.error("Error GPS:", error);
                    setGpsStatus('Gagal mendapatkan lokasi GPS. Pastikan izin lokasi aktif.');
                    setHasGps(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setGpsStatus('Browser Anda tidak mendukung fitur GPS.');
        }
    }, []);

    const markSafe = (e) => {
        e.preventDefault();
        // Mengirim data scan ke backend
        post(route('pelapor.patrol.scan.store', patrolPoint.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Verifikasi Checkpoint</h2>}
        >
            <Head title="Scan QR Checkpoint" />

            <div className="py-6">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                        <div className="text-center mb-6">
                            <p className="text-sm text-indigo-600 font-semibold tracking-wide uppercase">Titik Pemeriksaan</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{patrolPoint.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{patrolPoint.point_code} &bull; <span className="capitalize">{patrolPoint.point_type.replace('_', ' ')}</span></p>
                        </div>

                        {/* Indikator Status GPS */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-md text-sm text-center border border-gray-100">
                            <p className="text-gray-700 font-medium mb-1">Status GPS Lapangan:</p>
                            <p className={hasGps ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{gpsStatus}</p>
                            {hasGps && (
                                <p className="text-xs text-gray-500 mt-1">Lat: {data.gps_latitude}, Lng: {data.gps_longitude}</p>
                            )}
                        </div>

                        <form onSubmit={markSafe} className="space-y-4">
                            <div>
                                <label htmlFor="inspection_note" className="block text-sm font-medium text-gray-700">
                                    Catatan Singkat (Opsional)
                                </label>
                                <textarea
                                    id="inspection_note"
                                    rows="2"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Contoh: Kondisi fisik aman, aliran air lancar..."
                                    value={data.inspection_note}
                                    onChange={(e) => setData('inspection_note', e.target.value)}
                                />
                                {errors.inspection_note && <p className="text-red-500 text-xs mt-1">{errors.inspection_note}</p>}
                            </div>

                            <div className="pt-6 grid gap-4">
                                {/* Tombol Alur Aman */}
                                <PrimaryButton 
                                    className="w-full justify-center py-3 text-sm" 
                                    disabled={!hasGps || processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Tandai Aman & Sudah Diperiksa'}
                                </PrimaryButton>
                                
                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Atau</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                {/* Tombol Alur Bermasalah (Auto-fill Create Report) */}
                                <Link 
                                    href={route('reports.create', { 
                                        patrol_point_id: patrolPoint.id, 
                                        latitude: patrolPoint.latitude, 
                                        longitude: patrolPoint.longitude 
                                    })}
                                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Ada Kerusakan? Buat Laporan
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}