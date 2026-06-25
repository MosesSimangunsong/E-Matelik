import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LeafletMap from "@/Components/maps/LeafletMap";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({
    auth,
    categories,
    subaks,
    reportDefaults,
    prefill_data,
}) {
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [photoPreviews, setPhotoPreviews] = useState([]);
    const hasQrPrefill =
        Boolean(prefill_data?.patrol_point_id) &&
        prefill_data?.latitude !== undefined &&
        prefill_data?.latitude !== null &&
        prefill_data?.longitude !== undefined &&
        prefill_data?.longitude !== null;

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category_id: "",
        subak_id: reportDefaults.subakId ? String(reportDefaults.subakId) : "",
        description: "",
        latitude: prefill_data?.latitude ?? "",
        longitude: prefill_data?.longitude ?? "",
        patrol_point_id: prefill_data?.patrol_point_id ?? "",
        address_text: "",
        photos: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("reports.store"));
    };

    useEffect(() => {
        const previews = data.photos.map((file) => ({
            id: `${file.name}-${file.lastModified}-${file.size}`,
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setPhotoPreviews(previews);

        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [data.photos]);

    const requiresSubakSelection = !reportDefaults.subakId;
    const selectedPoint =
        data.latitude && data.longitude
            ? {
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
              }
            : null;

    const handleMapPick = ({ lat, lng }) => {
        setLocationError("");
        setData("latitude", lat.toFixed(7));
        setData("longitude", lng.toFixed(7));
    };

    const useCurrentLocation = () => {
        if (hasQrPrefill) {
            return;
        }

        if (!("geolocation" in navigator)) {
            setLocationError(
                "Browser Anda tidak mendukung geolocation. Gunakan pemilihan titik manual di peta.",
            );
            return;
        }

        setIsFetchingLocation(true);
        setLocationError("");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData("latitude", position.coords.latitude.toFixed(7));
                setData("longitude", position.coords.longitude.toFixed(7));
                setIsFetchingLocation(false);
            },
            (error) => {
                let message =
                    "Lokasi saat ini gagal diambil. Silakan coba lagi atau pilih titik manual di peta.";

                if (error.code === error.PERMISSION_DENIED) {
                    message =
                        "Izin lokasi ditolak. Aktifkan akses lokasi browser lalu coba lagi.";
                } else if (error.code === error.TIMEOUT) {
                    message =
                        "Pengambilan lokasi melebihi batas waktu 10 detik. Pastikan GPS aktif lalu coba lagi.";
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    message =
                        "Lokasi tidak tersedia saat ini. Coba pindah ke area dengan sinyal lokasi yang lebih baik.";
                }

                setLocationError(message);
                setIsFetchingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        );
    };

    const removePhoto = (indexToRemove) => {
        setData(
            "photos",
            data.photos.filter((_, index) => index !== indexToRemove),
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-primary-600">Pelapor</p>
                        <h2 className="page-title">Buat Laporan</h2>
                        <p className="body-copy">
                            Dokumentasikan gangguan telabah dengan deskripsi,
                            koordinat, dan foto bukti.
                        </p>
                    </div>
                    <Link href={route("reports.index")}>
                        <SecondaryButton className="w-full sm:w-auto">
                            Kembali ke Laporan Saya
                        </SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Buat Laporan" />

            <div className="app-page">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <form
                        onSubmit={submit}
                        className="app-panel space-y-6 p-5 sm:p-6"
                    >
                        <div className="rounded-card border border-primary-100 bg-primary-50 px-4 py-4 text-sm leading-7 text-primary-700">
                            Isi bagian yang paling penting dulu: pilih titik,
                            isi judul singkat, pilih kategori, lalu unggah foto.
                            Form dibuat lebih lega agar nyaman diisi dari HP.
                        </div>

                        {hasQrPrefill && (
                            <div className="rounded-card border border-indigo-200 bg-indigo-50 px-4 py-4 text-sm leading-7 text-indigo-700">
                                <span className="font-semibold">
                                    Mode Patroli Aktif:
                                </span>{" "}
                                laporan ini berasal dari scan QR checkpoint.
                                Koordinat dan titik patroli sudah diisi otomatis
                                dari hasil pemindaian.
                            </div>
                        )}

                        {!hasQrPrefill && (
                            <div className="space-y-4">
                                <div>
                                    <p className="eyebrow">
                                        Pilih titik insiden
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                        Ketuk peta untuk mengisi koordinat
                                        otomatis
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        onClick={useCurrentLocation}
                                        disabled={isFetchingLocation}
                                        className="inline-flex items-center justify-center rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isFetchingLocation
                                            ? "Mengambil lokasi..."
                                            : "Gunakan Lokasi Saat Ini"}
                                    </button>
                                    <p className="text-sm text-neutral-500">
                                        Lokasi perangkat akan mengisi latitude,
                                        longitude, dan memindahkan marker ke
                                        posisi Anda.
                                    </p>
                                </div>
                                {locationError && (
                                    <div className="rounded-soft border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
                                        {locationError}
                                    </div>
                                )}
                                <LeafletMap
                                    selectable
                                    onPick={handleMapPick}
                                    selectedPoint={selectedPoint}
                                    center={
                                        selectedPoint
                                            ? [
                                                  selectedPoint.latitude,
                                                  selectedPoint.longitude,
                                              ]
                                            : [-8.65, 115.216]
                                    }
                                    zoom={selectedPoint ? 15 : 12}
                                    heightClass="h-[360px]"
                                />
                                <p className="text-sm text-neutral-500">
                                    Peta menggunakan OpenStreetMap. Anda juga
                                    tetap bisa mengoreksi latitude dan longitude
                                    secara manual bila diperlukan.
                                </p>
                                <div className="rounded-soft border border-secondary-100 bg-secondary-50 px-4 py-4 text-sm leading-7 text-secondary-700">
                                    Laporan Anda diperlakukan sebagai sinyal
                                    awal yang akan diverifikasi, bukan
                                    kebenaran final. Gunakan foto dan deskripsi
                                    yang relevan agar proses klarifikasi lebih
                                    cepat.
                                </div>
                            </div>
                        )}

                        <div className="grid gap-5 md:grid-cols-2">
                            <input
                                type="hidden"
                                value={data.patrol_point_id}
                                readOnly
                            />

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="title"
                                    value="Judul Laporan"
                                />
                                <TextInput
                                    id="title"
                                    className="mt-2"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    placeholder="Contoh: Telabah tersumbat material proyek"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.title}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Kategori Gangguan"
                                />
                                <select
                                    id="category_id"
                                    className="form-input mt-2"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="subak_id" value="Subak" />
                                {requiresSubakSelection ? (
                                    <select
                                        id="subak_id"
                                        className="form-input mt-2"
                                        value={data.subak_id}
                                        onChange={(e) =>
                                            setData("subak_id", e.target.value)
                                        }
                                    >
                                        <option value="">Pilih Subak</option>
                                        {subaks.map((subak) => (
                                            <option
                                                key={subak.id}
                                                value={subak.id}
                                            >
                                                {subak.name} - {subak.region}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="mt-2 rounded-soft border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                        {reportDefaults.subakName}
                                    </div>
                                )}
                                <InputError
                                    className="mt-2"
                                    message={errors.subak_id}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="latitude"
                                    value="Latitude"
                                />
                                <TextInput
                                    id="latitude"
                                    className="mt-2"
                                    value={data.latitude}
                                    onChange={(e) =>
                                        setData("latitude", e.target.value)
                                    }
                                    placeholder="-8.6500000"
                                    readOnly={hasQrPrefill}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.latitude}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="longitude"
                                    value="Longitude"
                                />
                                <TextInput
                                    id="longitude"
                                    className="mt-2"
                                    value={data.longitude}
                                    onChange={(e) =>
                                        setData("longitude", e.target.value)
                                    }
                                    placeholder="115.2160000"
                                    readOnly={hasQrPrefill}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.longitude}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="address_text"
                                    value="Keterangan Lokasi"
                                />
                                <textarea
                                    id="address_text"
                                    className="form-input mt-2 min-h-32"
                                    value={data.address_text}
                                    onChange={(e) =>
                                        setData("address_text", e.target.value)
                                    }
                                    placeholder="Tambahkan penanda lokasi singkat, misalnya dekat jembatan kecil atau saluran utama."
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.address_text}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="description"
                                    value="Deskripsi Singkat"
                                />
                                <textarea
                                    id="description"
                                    className="form-input mt-2 min-h-40"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Jelaskan kondisi gangguan, dampak awal, dan situasi lapangan yang terlihat."
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="photos"
                                    value="Foto Bukti"
                                />
                                <input
                                    id="photos"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="mt-2 block w-full rounded-soft border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-500 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white"
                                    onChange={(e) =>
                                        setData(
                                            "photos",
                                            Array.from(e.target.files ?? []),
                                        )
                                    }
                                />
                                {data.photos.length > 0 && (
                                    <p className="mt-2 text-sm text-neutral-500">
                                        {data.photos.length} foto dipilih.
                                    </p>
                                )}
                                {photoPreviews.length > 0 && (
                                    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        {photoPreviews.map((photo, index) => (
                                            <div
                                                key={photo.id}
                                                className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-sm"
                                            >
                                                <img
                                                    src={photo.url}
                                                    alt={photo.name}
                                                    className="h-44 w-full object-cover"
                                                />
                                                <div className="space-y-3 px-4 py-3">
                                                    <p className="truncate text-sm font-semibold text-neutral-900">
                                                        {photo.name}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePhoto(index)
                                                        }
                                                        className="inline-flex items-center rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                                                    >
                                                        Hapus foto
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <InputError
                                    className="mt-2"
                                    message={errors.photos}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors["photos.0"]}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Link href={route("reports.index")}>
                                <SecondaryButton
                                    type="button"
                                    className="w-full sm:w-auto"
                                >
                                    Batal
                                </SecondaryButton>
                            </Link>
                            <PrimaryButton
                                disabled={processing}
                                className="w-full sm:w-auto"
                            >
                                {processing ? "Mengirim..." : "Kirim Laporan"}
                            </PrimaryButton>
                        </div>
                    </form>

                    <aside className="space-y-6">
                        <div className="app-card">
                            <p className="eyebrow">Tahap 7 WebGIS</p>
                            <h3 className="mt-3 text-xl font-semibold text-neutral-900">
                                {hasQrPrefill
                                    ? "Koordinat checkpoint sudah dibawa otomatis dari hasil scan QR."
                                    : "Koordinat sekarang bisa dipilih langsung dari peta interaktif."}
                            </h3>
                            <p className="mt-3 body-copy">
                                {hasQrPrefill
                                    ? "Form ini tetap bisa dipakai seperti biasa untuk melaporkan kerusakan, tetapi lokasi patroli tidak perlu dipilih ulang agar tetap konsisten dengan checkpoint yang dipindai."
                                    : "Marker yang Anda pilih akan menjadi dasar lokasi laporan, lalu dipakai lagi pada halaman detail dan peta insiden."}
                            </p>
                        </div>

                        <div className="app-card">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Checklist laporan
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
                                <li>Judul laporan jelas dan singkat.</li>
                                <li>
                                    Kategori gangguan dipilih sesuai kondisi
                                    lapangan.
                                </li>
                                <li>Koordinat lokasi sudah terisi.</li>
                                <li>Minimal satu foto bukti terunggah.</li>
                            </ul>
                        </div>

                        {(data.latitude || data.longitude) && (
                            <div className="app-card">
                                <h3 className="text-lg font-semibold text-neutral-900">
                                    Titik yang dipilih
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-neutral-600">
                                    Latitude: {data.latitude || "-"}
                                    <br />
                                    Longitude: {data.longitude || "-"}
                                </p>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
