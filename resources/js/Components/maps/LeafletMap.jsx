import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import { useEffect, useMemo } from 'react';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function MapClickHandler({ onPick }) {
    useMapEvents({
        click(event) {
            onPick?.(event.latlng);
        },
    });

    return null;
}

function RecenterMap({ center, zoom }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, zoom ?? map.getZoom(), {
                animate: true,
            });
        }
    }, [center, map, zoom]);

    return null;
}

function markerColor(statusSlug, priorityLevel) {
    if (priorityLevel === 'urgent') return '#C94B4B';
    if (priorityLevel === 'high') return '#D97706';
    if (statusSlug === 'menunggu-verifikasi') return '#D39A2C';
    if (statusSlug === 'diverifikasi') return '#3D8BBA';
    if (statusSlug === 'perlu-klarifikasi') return '#D39A2C';
    if (statusSlug === 'diekskalasi') return '#C94B4B';
    if (statusSlug === 'selesai') return '#3F8C5A';
    if (statusSlug === 'ditolak') return '#C94B4B';

    return '#4F8A3F';
}

function createStatusIcon(statusSlug, priorityLevel) {
    const color = markerColor(statusSlug, priorityLevel);

    return L.divIcon({
        className: '',
        html: `<div style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9999px;background:${color};border:3px solid white;box-shadow:0 8px 16px rgba(37,36,31,0.18)"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    });
}

export default function LeafletMap({
    center = [-8.65, 115.216],
    zoom = 13,
    className = '',
    markers = [],
    selectable = false,
    selectedPoint = null,
    onPick = null,
    heightClass = 'h-[420px]',
}) {
    const fallbackCenter = useMemo(() => center, [center]);
    const selectedCenter = selectedPoint
        ? [selectedPoint.latitude, selectedPoint.longitude]
        : fallbackCenter;

    return (
        <div className={`map-frame ${className}`}>
            {selectable && (
                <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-600">
                    Ketuk peta untuk memilih titik laporan. Geser dua jari bila ingin memindahkan peta dengan lebih stabil.
                </div>
            )}
            <MapContainer
                center={selectedCenter}
                zoom={zoom}
                scrollWheelZoom
                className={heightClass}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap center={selectedCenter} zoom={zoom} />

                {selectable && <MapClickHandler onPick={onPick} />}

                {markers.map((marker) => (
                    <Marker
                        key={marker.id ?? `${marker.latitude}-${marker.longitude}`}
                        position={[marker.latitude, marker.longitude]}
                        icon={createStatusIcon(marker.status?.slug, marker.priority_level)}
                    >
                        <Popup>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-neutral-900">
                                    {marker.title}
                                </p>
                                {marker.category && (
                                    <p className="text-xs text-neutral-600">{marker.category}</p>
                                )}
                                {marker.status?.name && (
                                    <p className="text-xs text-neutral-600">{marker.status.name}</p>
                                )}
                                {marker.priority_level && (
                                    <p className="text-xs text-neutral-600">
                                        Prioritas: {marker.priority_level}
                                    </p>
                                )}
                                {marker.report_code && (
                                    <p className="text-xs text-neutral-500">{marker.report_code}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {selectedPoint && (
                    <Marker
                        position={[selectedPoint.latitude, selectedPoint.longitude]}
                    >
                        <Popup>Titik laporan dipilih di sini.</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}
