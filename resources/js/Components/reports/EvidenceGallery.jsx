import Badge from '@/Components/Badge';
import { capturedFromLabel } from '@/lib/reportPresentation';

function photoRoleLabel(photoRole) {
    if (photoRole === 'initial_evidence') return 'Jenis: Bukti awal';
    if (photoRole === 'resolution_evidence') return 'Jenis: Bukti penyelesaian';

    return 'Jenis: Bukti dokumentasi';
}

export default function EvidenceGallery({
    title,
    description = null,
    photos = [],
    emptyText = 'Belum ada bukti yang ditampilkan.',
    tone = 'default',
}) {
    const toneClass = {
        default: 'border-neutral-200 bg-white',
        success: 'border-emerald-200 bg-emerald-50/40',
        warning: 'border-amber-200 bg-amber-50/40',
    };

    return (
        <section className={`rounded-card border p-5 ${toneClass[tone] ?? toneClass.default}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                {description && (
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{description}</p>
                )}
            </div>

            {photos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="overflow-hidden rounded-card border border-neutral-200 bg-white"
                        >
                            <a
                                href={photo.photo_url ?? photo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                            <img
                                src={photo.photo_url ?? photo.url}
                                alt={photo.original_name ?? photo.name}
                                className="h-56 w-full object-cover"
                                loading="lazy"
                            />
                            </a>
                            <div className="space-y-2 px-4 py-3">
                                <p className="truncate text-sm font-semibold text-neutral-900">
                                    {photo.original_name ?? photo.name}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="default">{capturedFromLabel(photo.captured_from)}</Badge>
                                    <Badge variant="info">{photoRoleLabel(photo.photo_role)}</Badge>
                                    {photo.uploaded_at && (
                                        <Badge variant="success">{photo.uploaded_at}</Badge>
                                    )}
                                </div>
                                {photo.photo_path && (
                                    <p className="truncate text-xs text-neutral-500">
                                        Path: {photo.photo_path}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-neutral-500">{emptyText}</p>
            )}
        </section>
    );
}
