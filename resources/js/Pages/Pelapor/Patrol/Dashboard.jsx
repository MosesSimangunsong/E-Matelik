import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Dashboard({ auth, points = [], statistics = {} }) {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraError, setCameraError] = useState('');

    useEffect(() => {
        let html5QrcodeScanner = null;
        let isMounted = true;

        const startScanner = async () => {
            setCameraError('');

            if (!navigator.mediaDevices?.getUserMedia) {
                if (isMounted) {
                    setCameraError('Browser ini tidak mendukung akses kamera untuk pemindaian QR.');
                }
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                });

                stream.getTracks().forEach((track) => track.stop());

                if (!isMounted) {
                    return;
                }

                html5QrcodeScanner = new Html5QrcodeScanner(
                    'qr-reader',
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    false,
                );

                html5QrcodeScanner.render(
                    (decodedText) => {
                        html5QrcodeScanner.clear();
                        setIsScanning(false);

                        if (decodedText.includes('/pelapor/patrol/scan/')) {
                            router.visit(decodedText);
                        } else {
                            alert('Gagal: QR Code ini tidak dikenali oleh sistem E-Matelik.');
                        }
                    },
                    () => {
                        // Abaikan error pembacaan per frame agar UI tidak spam.
                    },
                );
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                const deniedPermission =
                    error?.name === 'NotAllowedError' ||
                    error?.name === 'PermissionDeniedError' ||
                    error?.message?.toLowerCase().includes('permission');

                const message = deniedPermission
                    ? 'Akses kamera ditolak. Izinkan kamera di browser agar Anda bisa memindai QR checkpoint.'
                    : 'Kamera gagal dibuka. Pastikan tidak sedang dipakai aplikasi lain, lalu coba lagi.';

                setCameraError(message);
                alert(message);
            }
        };

        if (isScanning) {
            startScanner();
        }

        return () => {
            isMounted = false;

            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch((error) => {
                    console.error('Gagal membersihkan scanner', error);
                });
            }
        };
    }, [isScanning]);

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'safe':
                return (
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold leading-5 text-green-800">
                        Aman
                    </span>
                );
            case 'needs_attention':
                return (
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold leading-5 text-yellow-800">
                        Perlu Perhatian
                    </span>
                );
            case 'damaged':
                return (
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold leading-5 text-red-800">
                        Rusak
                    </span>
                );
            case 'unchecked':
            default:
                return (
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold leading-5 text-gray-500">
                        Belum Dicek
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Checklist Patroli Harian
                </h2>
            }
        >
            <Head title="Patroli Matelik" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-4">
                        <div className="rounded-lg border-t-4 border-blue-500 bg-white p-4 text-center shadow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Total Titik
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {statistics.total || 0}
                            </p>
                        </div>
                        <div className="rounded-lg border-t-4 border-green-500 bg-white p-4 text-center shadow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Sudah Dicek
                            </p>
                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {statistics.checked || 0}
                            </p>
                        </div>
                        <div className="rounded-lg border-t-4 border-yellow-500 bg-white p-4 text-center shadow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Atensi
                            </p>
                            <p className="mt-2 text-3xl font-bold text-yellow-600">
                                {statistics.needs_attention || 0}
                            </p>
                        </div>
                        <div className="rounded-lg border-t-4 border-red-500 bg-white p-4 text-center shadow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Rusak
                            </p>
                            <p className="mt-2 text-3xl font-bold text-red-600">
                                {statistics.damaged || 0}
                            </p>
                        </div>
                    </div>

                    <div className="px-4">
                        <button
                            onClick={() => {
                                setCameraError('');
                                setIsScanning(true);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-4 font-bold text-white shadow-lg transition duration-150 hover:bg-indigo-700"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5v3a1 1 0 01-2 0V4zm14-1a1 1 0 011 1v3a1 1 0 01-2 0V5h-3a1 1 0 010-2h4zM3 20a1 1 0 001 1h4a1 1 0 000-2H5v-3a1 1 0 00-2 0v4zm14 1a1 1 0 001-1v-4a1 1 0 00-2 0v3h-3a1 1 0 000 2h4z"
                                ></path>
                            </svg>
                            <span className="text-lg">Scan QR Patroli</span>
                        </button>
                        {cameraError && (
                            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {cameraError}
                            </div>
                        )}
                    </div>

                    <div className="px-4">
                        <h3 className="mb-3 text-lg font-medium text-gray-900">
                            Daftar Titik Hari Ini
                        </h3>
                        <div className="grid gap-3">
                            {points.map((point) => (
                                <div
                                    key={point.id}
                                    className={`flex items-center justify-between rounded-lg border-l-4 bg-white p-4 shadow-sm ${
                                        point.status === 'damaged'
                                            ? 'border-red-500 opacity-75'
                                            : point.status === 'needs_attention'
                                              ? 'border-yellow-500 opacity-75'
                                              : point.status === 'safe'
                                                ? 'border-green-500 opacity-75'
                                                : 'border-gray-300'
                                    }`}
                                >
                                    <div>
                                        <h4 className="font-bold text-gray-800">{point.name}</h4>
                                        <p className="text-xs uppercase text-gray-500">
                                            {point.point_code}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">{renderStatusBadge(point.status)}</div>
                                </div>
                            ))}

                            {points.length === 0 && (
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                                    <p className="text-sm text-gray-500">
                                        Pekaseh belum memetakan titik patroli di Subak Anda.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isScanning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
                    <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-indigo-600 p-4">
                            <h3 className="text-lg font-bold text-white">Pindai QR Titik</h3>
                            <button
                                onClick={() => {
                                    setIsScanning(false);
                                    setCameraError('');
                                }}
                                className="text-2xl font-bold leading-none text-white hover:text-indigo-200"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="bg-gray-50 p-4">
                            {cameraError && (
                                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {cameraError}
                                </div>
                            )}
                            <div
                                id="qr-reader"
                                className="w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300"
                            ></div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Arahkan kamera ke QR Code yang tertempel di titik telabah.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
