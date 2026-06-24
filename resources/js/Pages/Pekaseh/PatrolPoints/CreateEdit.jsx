import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import LeafletMap from '@/Components/maps/LeafletMap';

export default function CreateEdit({ auth, patrolPoint = null }) {
    const isEdit = !!patrolPoint;

    const { data, setData, post, put, processing, errors } = useForm({
        point_code: patrolPoint?.point_code || '',
        name: patrolPoint?.name || '',
        point_type: patrolPoint?.point_type || 'tembuku',
        description: patrolPoint?.description || '',
        latitude: patrolPoint?.latitude || '-8.409518', // Default tengah Bali
        longitude: patrolPoint?.longitude || '115.188919',
        is_active: patrolPoint?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('pekaseh.patrol-points.update', patrolPoint.id));
        } else {
            post(route('pekaseh.patrol-points.store'));
        }
    };

    const handleLocationSelect = ({ lat, lng }) => {
        setData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {isEdit ? 'Edit Titik Patroli' : 'Tambah Titik Patroli Baru'}
                </h2>
            }
        >
            <Head title={isEdit ? 'Edit Titik' : 'Tambah Titik'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Bagian Kiri: Data Administratif */}
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="point_code" value="Kode Titik (Contoh: TBA-001)" />
                                            <TextInput
                                                id="point_code"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.point_code}
                                                onChange={(e) => setData('point_code', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.point_code} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="name" value="Nama Titik" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="point_type" value="Jenis Titik" />
                                            <select
                                                id="point_type"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.point_type}
                                                onChange={(e) => setData('point_type', e.target.value)}
                                                required
                                            >
                                                <option value="tembuku">Tembuku</option>
                                                <option value="telabah_aya">Telabah Aya</option>
                                                <option value="telabah_tempek">Telabah Tempek</option>
                                                <option value="gorong_gorong">Gorong-gorong</option>
                                                <option value="titik_rawan">Titik Rawan Penyumbatan</option>
                                            </select>
                                            <InputError message={errors.point_type} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Deskripsi / Catatan Lokasi" />
                                            <textarea
                                                id="description"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="3"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                            ></textarea>
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        {isEdit && (
                                            <div className="flex items-center mt-4">
                                                <input
                                                    id="is_active"
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={data.is_active}
                                                    onChange={(e) => setData('is_active', e.target.checked)}
                                                />
                                                <label htmlFor="is_active" className="ml-2 text-sm text-gray-600">
                                                    Titik Aktif (Matelik bisa scan di titik ini)
                                                </label>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bagian Kanan: Pemetaan Peta */}
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel value="Tandai Lokasi di Peta" />
                                            <p className="text-sm text-gray-500 mb-2">Geser pin untuk menentukan koordinat pasti dari titik pemeriksaan.</p>
                                            <div className="h-64 bg-gray-100 rounded-md overflow-hidden border border-gray-300 relative">
                                                <LeafletMap 
                                                    initialLat={data.latitude} 
                                                    initialLng={data.longitude} 
                                                    onLocationSelect={handleLocationSelect}
                                                    isSelectable={true}
                                                />
                                            </div>
                                            <div className="mt-2 grid grid-cols-2 gap-4">
                                                <div>
                                                    <InputLabel htmlFor="latitude" value="Latitude" />
                                                    <TextInput id="latitude" type="text" className="mt-1 block w-full bg-gray-50" value={data.latitude} readOnly />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="longitude" value="Longitude" />
                                                    <TextInput id="longitude" type="text" className="mt-1 block w-full bg-gray-50" value={data.longitude} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-end border-t pt-6">
                                    <Link href={route('pekaseh.patrol-points.index')}>
                                        <SecondaryButton disabled={processing}>Batal</SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Titik Patroli'}
                                    </PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}