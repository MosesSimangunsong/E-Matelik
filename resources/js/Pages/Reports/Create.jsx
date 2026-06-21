import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LeafletMap from '@/Components/maps/LeafletMap';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ReportsCreate({ categories, subaks, reportDefaults }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        subak_id: reportDefaults.subakId ? String(reportDefaults.subakId) : '',
        description: '',
        latitude: '',
        longitude: '',
        address_text: '',
        photos: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reports.store'));
    };

    const requiresSubakSelection = !reportDefaults.subakId;
    const selectedPoint =
        data.latitude && data.longitude
            ? {
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
              }
            : null;

    const handleMapPick = ({ lat, lng }) => {
        setData('latitude', lat.toFixed(7));
        setData('longitude', lng.toFixed(7));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-primary-600">Pelapor</p>
                        <h2 className="page-title">Buat Laporan</h2>
                        <p className="body-copy">
                            Dokumentasikan gangguan telabah dengan deskripsi, koordinat, dan foto bukti.
                        </p>
                    </div>
                    <Link href={route('reports.index')}>
                        <SecondaryButton>Kembali ke Laporan Saya</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Buat Laporan" />

            <div className="py-10">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                    <form onSubmit={submit} className="app-panel space-y-6 p-6">
                        <div className="space-y-4">
                            <div>
                                <p className="eyebrow">Pilih titik insiden</p>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                    Klik peta untuk mengisi koordinat otomatis
                                </h3>
                            </div>
                            <LeafletMap
                                selectable
                                onPick={handleMapPick}
                                selectedPoint={selectedPoint}
                                center={selectedPoint ? [selectedPoint.latitude, selectedPoint.longitude] : [-8.65, 115.216]}
                                zoom={selectedPoint ? 15 : 12}
                                heightClass="h-[360px]"
                            />
                            <p className="text-sm text-neutral-500">
                                Peta menggunakan OpenStreetMap. Anda juga tetap bisa mengoreksi
                                latitude dan longitude secara manual bila diperlukan.
                            </p>
                            <div className="rounded-soft border border-secondary-100 bg-secondary-50 px-4 py-4 text-sm leading-7 text-secondary-700">
                                Laporan Anda diperlakukan sebagai sinyal awal yang akan diverifikasi,
                                bukan kebenaran final. Gunakan foto dan deskripsi yang relevan agar
                                proses klarifikasi lebih cepat.
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="title" value="Judul Laporan" />
                                <TextInput
                                    id="title"
                                    className="mt-2"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Telabah tersumbat material proyek"
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="category_id" value="Kategori Gangguan" />
                                <select
                                    id="category_id"
                                    className="form-input mt-2"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.category_id} />
                            </div>

                            <div>
                                <InputLabel htmlFor="subak_id" value="Subak" />
                                {requiresSubakSelection ? (
                                    <select
                                        id="subak_id"
                                        className="form-input mt-2"
                                        value={data.subak_id}
                                        onChange={(e) => setData('subak_id', e.target.value)}
                                    >
                                        <option value="">Pilih Subak</option>
                                        {subaks.map((subak) => (
                                            <option key={subak.id} value={subak.id}>
                                                {subak.name} - {subak.region}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="mt-2 rounded-soft border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                        {reportDefaults.subakName}
                                    </div>
                                )}
                                <InputError className="mt-2" message={errors.subak_id} />
                            </div>

                            <div>
                                <InputLabel htmlFor="latitude" value="Latitude" />
                                <TextInput
                                    id="latitude"
                                    className="mt-2"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                    placeholder="-8.6500000"
                                />
                                <InputError className="mt-2" message={errors.latitude} />
                            </div>

                            <div>
                                <InputLabel htmlFor="longitude" value="Longitude" />
                                <TextInput
                                    id="longitude"
                                    className="mt-2"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                    placeholder="115.2160000"
                                />
                                <InputError className="mt-2" message={errors.longitude} />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="address_text" value="Keterangan Lokasi" />
                                <textarea
                                    id="address_text"
                                    className="form-input mt-2 min-h-28"
                                    value={data.address_text}
                                    onChange={(e) => setData('address_text', e.target.value)}
                                    placeholder="Tambahkan penanda lokasi singkat, misalnya dekat jembatan kecil atau saluran utama."
                                />
                                <InputError className="mt-2" message={errors.address_text} />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Deskripsi Singkat" />
                                <textarea
                                    id="description"
                                    className="form-input mt-2 min-h-40"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan kondisi gangguan, dampak awal, dan situasi lapangan yang terlihat."
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="photos" value="Foto Bukti" />
                                <input
                                    id="photos"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="mt-2 block w-full rounded-soft border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                                    onChange={(e) => setData('photos', Array.from(e.target.files ?? []))}
                                />
                                <InputError className="mt-2" message={errors.photos} />
                                <InputError className="mt-2" message={errors['photos.0']} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Link href={route('reports.index')}>
                                <SecondaryButton type="button">Batal</SecondaryButton>
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Mengirim...' : 'Kirim Laporan'}
                            </PrimaryButton>
                        </div>
                    </form>

                    <aside className="space-y-6">
                        <div className="app-card">
                            <p className="eyebrow">Tahap 7 WebGIS</p>
                            <h3 className="mt-3 text-xl font-semibold text-neutral-900">
                                Koordinat sekarang bisa dipilih langsung dari peta interaktif.
                            </h3>
                            <p className="mt-3 body-copy">
                                Marker yang Anda pilih akan menjadi dasar lokasi laporan, lalu
                                dipakai lagi pada halaman detail dan peta insiden.
                            </p>
                        </div>

                        <div className="app-card">
                            <h3 className="text-lg font-semibold text-neutral-900">Checklist laporan</h3>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
                                <li>Judul laporan jelas dan singkat.</li>
                                <li>Kategori gangguan dipilih sesuai kondisi lapangan.</li>
                                <li>Koordinat lokasi sudah terisi.</li>
                                <li>Minimal satu foto bukti terunggah.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
