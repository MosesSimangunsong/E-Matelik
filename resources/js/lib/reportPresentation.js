export function statusVariant(statusSlug) {
    if (statusSlug === 'menunggu-verifikasi') return 'warning';
    if (statusSlug === 'diverifikasi') return 'info';
    if (statusSlug === 'perlu-klarifikasi') return 'warning';
    if (statusSlug === 'diekskalasi') return 'danger';
    if (statusSlug === 'selesai') return 'success';
    if (statusSlug === 'ditolak') return 'danger';

    return 'default';
}

export function priorityVariant(priorityLevel) {
    if (priorityLevel === 'urgent') return 'danger';
    if (priorityLevel === 'high') return 'warning';
    if (priorityLevel === 'medium') return 'info';
    if (priorityLevel === 'low') return 'success';

    return 'default';
}

export function priorityLabel(priorityLevel) {
    if (priorityLevel === 'urgent') return 'Prioritas Darurat';
    if (priorityLevel === 'high') return 'Prioritas Tinggi';
    if (priorityLevel === 'medium') return 'Prioritas Sedang';
    if (priorityLevel === 'low') return 'Prioritas Rendah';

    return 'Prioritas Belum Diatur';
}

export function capturedFromLabel(capturedFrom) {
    if (capturedFrom === 'camera') return 'Sumber: Kamera';
    if (capturedFrom === 'gallery') return 'Sumber: Galeri';

    return 'Sumber: Tidak diketahui';
}

export function isAttentionStatus(statusSlug) {
    return ['menunggu-verifikasi', 'perlu-klarifikasi', 'diekskalasi'].includes(statusSlug);
}
