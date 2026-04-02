import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function FitBounds({ points }) {
    const map = useMap();

    useEffect(() => {
        if (points && points.length > 0) {
            const bounds = L.latLngBounds(points.map((p) => [p.latitud, p.longitud]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, points]);

    return null;
}

export default function RutaMapa({ puntos, altura = '400px' }) {
    if (!puntos || puntos.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 rounded-lg"
                style={{ height: altura }}
            >
                <p className="text-gray-500">No hay puntos para mostrar en el mapa</p>
            </div>
        );
    }

    const puntosNormalizados = puntos
        .map((p, index) => ({
            ...p,
            latitud: Number(p.latitud),
            longitud: Number(p.longitud),
            index: index + 1,
        }))
        .filter((p) => Number.isFinite(p.latitud) && Number.isFinite(p.longitud));

    if (puntosNormalizados.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 rounded-lg"
                style={{ height: altura }}
            >
                <p className="text-gray-500">No hay coordenadas válidas para mostrar en el mapa</p>
            </div>
        );
    }

    const positions = puntosNormalizados.map((p) => [p.latitud, p.longitud]);
    const centro = positions[Math.floor(positions.length / 2)];

    const formatoFecha = (timestamp) => {
        if (!timestamp) return '';
        const fecha = new Date(timestamp);
        return fecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: altura }}>
            <MapContainer
                center={centro}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds points={puntosNormalizados} />

                {puntosNormalizados.length >= 2 && (
                    <Polyline
                        positions={positions}
                        color="#3b82f6"
                        weight={4}
                        opacity={0.8}
                    />
                )}

                {puntosNormalizados.map((punto, index) => (
                    <CircleMarker
                        key={`${punto.id || 'punto'}-${index}-${punto.latitud}-${punto.longitud}`}
                        center={[punto.latitud, punto.longitud]}
                        radius={6}
                        pathOptions={{ color: '#1d4ed8', fillColor: '#60a5fa', fillOpacity: 0.85 }}
                    >
                        <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
                            Punto {punto.index}
                        </Tooltip>
                        <Popup>
                            <div className="text-sm">
                                <strong>Punto {punto.index}</strong>
                                <br />
                                Latitud: {punto.latitud.toFixed(6)}
                                <br />
                                Longitud: {punto.longitud.toFixed(6)}
                                <br />
                                {formatoFecha(punto.timestamp)}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}

                <Marker position={positions[0]} icon={startIcon}>
                    <Popup>
                        <div className="text-sm">
                            <strong>Inicio</strong>
                            <br />
                            {formatoFecha(puntosNormalizados[0].timestamp)}
                        </div>
                    </Popup>
                </Marker>

                {puntosNormalizados.length > 1 && (
                    <Marker position={positions[puntosNormalizados.length - 1]} icon={endIcon}>
                        <Popup>
                            <div className="text-sm">
                                <strong>Fin</strong>
                                <br />
                                {formatoFecha(puntosNormalizados[puntosNormalizados.length - 1].timestamp)}
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}
