import React, { useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function CreateEdit({ auth, patrolPoint }) {
    const isEdit = !!patrolPoint;
    
    const { data, setData, post, put, processing, errors } = useForm({
        point_code: patrolPoint?.point_code || '',
        name: patrolPoint?.name || '',
        point_type: patrolPoint?.point_type || 'tembuku',
        description: patrolPoint?.description || '',
        latitude: patrolPoint?.latitude || '',
        longitude: patrolPoint?.longitude || '',
        is_active: patrolPoint?.is_active ?? true,
    });

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);

    useEffect(() => {
        // Inisialisasi Peta hanya jika belum ada
        if (!mapInstance.current && mapRef.current) {
            // Default ke koordinat Bali jika belum ada data (menyesuaikan konteks Subak)
            const defaultLat = data.latitude || -8.409518;
            const defaultLng = data.longitude || 115.188916;

            mapInstance.current = L.map(mapRef.current).setView([defaultLat, defaultLng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapInstance.current);

            // Setup Custom Icon karena default icon Leaflet sering bermasalah di bundler Vite
            const icon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            });

            // Pasang marker jika sudah ada koordinat (misal saat Edit)
            if (data.latitude && data.longitude) {
                markerInstance.current = L.marker([data.latitude, data.longitude], { icon }).addTo(mapInstance.current);
            }

            // Event Listener klik pada peta
            mapInstance.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                const formattedLat = lat.toFixed(7);
                const formattedLng = lng.toFixed(7);

                // Update state form Inertia
                setData((prev) => ({
                    ...prev,
                    latitude: formattedLat,
                    longitude: formattedLng
                }));

                // Update posisi marker di peta
                if (markerInstance.current) {
                    markerInstance.current.setLatLng([lat, lng]);
                } else {
                    markerInstance.current = L.marker([lat, lng], { icon }).addTo(mapInstance.current);
                }
            });
        }

        // Cleanup peta saat komponen di-unmount agar memori tidak bocor
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    // Sinkronisasi jika user mengetik manual di input teks
    useEffect(() => {
        if (mapInstance.current && markerInstance.current && data.latitude && data.longitude) {
            markerInstance.current.setLatLng([data.latitude, data.longitude]);
        }
    }, [data.latitude, data.longitude]);

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('pekaseh.patrol-points.update', patrolPoint.id));
        } else {
            post(route('pekaseh.patrol-points.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{isEdit ? 'Edit Titik Patroli' : 'Tambah Titik Patroli'}</h2>}>
            <Head title={isEdit ? "Edit Titik Patroli" : "Tambah Titik Patroli"} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Kolom Kiri: Data Identitas Titik */}
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="point_code" value="Kode Titik (Misal: TBA-001)" />
                                        <TextInput
                                            id="point_code"
                                            className="mt-1 block w-full bg-gray-50"
                                            value={data.point_code}
                                            onChange={(e) => setData('point_code', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.point_code} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Titik Lokasi" />
                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="point_type" value="Jenis Titik" />
                                        <select
                                            id="point_type"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.point_type}
                                            onChange={(e) => setData('point_type', e.target.value)}
                                        >
                                            <option value="tembuku">Tembuku</option>
                                            <option value="telabah_aya">Telabah Aya</option>
                                            <option value="telabah_tempek">Telabah Tempek</option>
                                            <option value="rawan_sampah">Rawan Penyumbatan/Sampah</option>
                                            <option value="rawan_longsor">Rawan Longsor/Jebol</option>
                                            <option value="lainnya">Lainnya</option>
                                        </select>
                                        <InputError className="mt-2" message={errors.point_type} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description" value="Deskripsi / Catatan Lokasi (Opsional)" />
                                        <textarea
                                            id="description"
                                            rows="3"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.description} />
                                    </div>

                                    <div className="flex items-center mt-4">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <label htmlFor="is_active" className="ml-2 text-sm text-gray-600">Titik Patroli Aktif</label>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Map Picker */}
                                <div className="space-y-4">
                                    <InputLabel value="Tentukan Lokasi di Peta (Klik pada Peta)" />
                                    <p className="text-xs text-gray-500 mb-2">Geser dan klik pada area peta untuk mengatur koordinat secara otomatis.</p>
                                    
                                    {/* Kontainer Peta Leaflet */}
                                    <div 
                                        ref={mapRef} 
                                        className="w-full h-64 md:h-80 rounded-md border border-gray-300 z-0"
                                        style={{ isolation: 'isolate' }}
                                    ></div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="latitude" value="Latitude" />
                                            <TextInput
                                                id="latitude"
                                                className="mt-1 block w-full bg-gray-100 text-sm"
                                                value={data.latitude}
                                                onChange={(e) => setData('latitude', e.target.value)}
                                                readOnly
                                            />
                                            <InputError className="mt-2" message={errors.latitude} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="longitude" value="Longitude" />
                                            <TextInput
                                                id="longitude"
                                                className="mt-1 block w-full bg-gray-100 text-sm"
                                                value={data.longitude}
                                                onChange={(e) => setData('longitude', e.target.value)}
                                                readOnly
                                            />
                                            <InputError className="mt-2" message={errors.longitude} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center justify-end mt-6 border-t pt-4">
                                <Link
                                    href={route('pekaseh.patrol-points.index')}
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mr-3"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Titik Patroli'}
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}