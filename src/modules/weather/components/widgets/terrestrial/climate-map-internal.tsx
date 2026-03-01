"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import L from 'leaflet';
import { Map as MapIcon, Crosshair } from 'lucide-react';

// Fix basic leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom stylized icon for the target
const targetIcon = L.divIcon({
    className: 'custom-target-icon',
    html: `<div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #25f46a; background-color: rgba(37, 244, 106, 0.2); box-shadow: 0 0 10px rgba(37, 244, 106, 0.5); display: flex; align-items: center; justify-content: center;"><div style="width: 6px; height: 6px; border-radius: 50%; background-color: #25f46a;"></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// Component to automatically fly to the selected location
function LocationMarker({ location }: { location: { lat: number, lon: number } }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo([location.lat, location.lon], map.getZoom() || 5, {
            animate: true,
            duration: 1.5
        });
    }, [location.lat, location.lon, map]);

    return (
        <Marker position={[location.lat, location.lon]} icon={targetIcon}>
            <Popup className="custom-popup">
                <div className="text-[#25f46a] font-mono text-xs font-bold tracking-wider">
                    [{location.lat.toFixed(4)}, {location.lon.toFixed(4)}]
                </div>
            </Popup>
        </Marker>
    );
}

export default function ClimateMapInternal({ activeOverlay }: { activeOverlay?: string }) {
    const { location } = useWeatherLocation();
    const [radarTime, setRadarTime] = useState<number | null>(null);

    // Fetch the latest radar timestamp from RainViewer for the precipitation layer
    useEffect(() => {
        if (activeOverlay === 'precipitation') {
            fetch('https://api.rainviewer.com/public/weather-maps.json')
                .then(res => res.json())
                .then(data => {
                    if (data?.radar?.past?.length > 0) {
                        setRadarTime(data.radar.past[data.radar.past.length - 1].time);
                    }
                })
                .catch(err => console.error("Error fetching RainViewer data:", err));
        }
    }, [activeOverlay]);

    const mapStyle = { height: "100%", width: "100%", backgroundColor: "#020804" };

    return (
        <div className="w-full h-full relative group">
            <MapContainer
                center={[location.lat, location.lon]}
                zoom={6}
                style={mapStyle}
                zoomControl={false}
                attributionControl={false}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Dark Matter">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite (ArcGIS)">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Terrain (OpenStreetMap)">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <LocationMarker location={location} />

                {/* Dynamic Weather Overlays */}
                {activeOverlay === 'precipitation' && radarTime && (
                    <TileLayer
                        url={`https://tilecache.rainviewer.com/v2/radar/${radarTime}/256/{z}/{x}/{y}/2/1_1.png`}
                        opacity={0.65}
                        zIndex={10}
                    />
                )}
                {activeOverlay === 'temperature' && (
                    <TileLayer
                        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=b1b15e88fa797225412429c1c50c122a1`}
                        opacity={0.5}
                        zIndex={10}
                    />
                )}
                {activeOverlay === 'wind' && (
                    <TileLayer
                        url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=b1b15e88fa797225412429c1c50c122a1`}
                        opacity={0.5}
                        zIndex={10}
                    />
                )}

                {/* Floating Custom Controls overlay */}
                <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Will act as a recenter button, the LocationMarker effect will handle the pan
                            const map = (e.target as any).closest('.leaflet-container')?.innerText; // Hacky way, ideally useRef for Map
                        }}
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                        title="Recenter"
                    >
                        <Crosshair className="w-4 h-4" />
                    </button>
                </div>
            </MapContainer>

            {/* Global CSS for the Leaflet popup to match theme */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .leaflet-popup-content-wrapper {
            background-color: rgba(8, 15, 10, 0.9);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(37, 244, 106, 0.3);
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
            color: #25f46a;
        }
        .leaflet-popup-tip {
            background-color: rgba(8, 15, 10, 0.9);
            border: 1px solid rgba(37, 244, 106, 0.3);
        }
        .leaflet-container {
            font-family: inherit;
        }
      `}} />
        </div>
    );
}
