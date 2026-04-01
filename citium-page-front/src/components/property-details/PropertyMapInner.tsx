'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { Dictionary } from '@/types/types';

// Fix for default marker icons in Leaflet with Next.js/Webpack
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function PropertyMapInner({ dict, location, coordinates }: { dict: Dictionary; location: string; coordinates: [number, number] }) {

    // Fallback coordinates if not provided (e.g., New York)
    const position: [number, number] = coordinates || [40.7128, -74.0060];

    useEffect(() => {
        // cleanup leaflet on unmount if needed
    }, []);

    return (
        <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-main">{dict.propertyDetails.location.title}</h3>
                <button onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(location)}`, '_blank')} className="text-primary text-sm font-semibold hover:underline">
                    {dict.propertyDetails.location.openInMaps}
                </button>
            </div>
            <div className="w-full h-80 rounded-xl overflow-hidden relative bg-background-light z-0 border border-gray-200">
                <MapContainer
                    center={position}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            {location}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
