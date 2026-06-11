import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ── Fix Leaflet default icon paths for Vite/Webpack ── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ── Custom coloured markers ── */
const makeIcon = (color) =>
  new L.Icon({
    iconUrl:    `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:   [25, 41],
    iconAnchor: [12, 41],
    popupAnchor:[1, -34],
    shadowSize: [41, 41],
  });

const violetIcon = makeIcon('violet');
const greenIcon  = makeIcon('green');

/* ── Region fallback coordinates ── */
const REGION_LATLNG = {
  Asia: [34, 100], Europe: [50, 10], Americas: [20, -80],
  Africa: [0, 20], Oceania: [-25, 135], default: [20, 0],
};

/* ── Auto-fit map bounds to markers ── */
function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => m.latlng));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [markers, map]);
  return null;
}

export default function MapView() {
  const bucketList = useSelector(s => s.bucketList.destinations);
  const visited    = useSelector(s => s.visited.places);

  const toMarker = (p, type) => {
    const latlng = p.latlng || REGION_LATLNG[p.region] || REGION_LATLNG.default;
    return { ...p, latlng, type };
  };

  const bucketMarkers  = bucketList.map(p => toMarker(p, 'bucket'));
  const visitedMarkers = visited.map(p => toMarker(p, 'visited'));
  const allMarkers     = [...bucketMarkers, ...visitedMarkers];

  return (
    <div>
      {/* ── Page header — matches other pages exactly ── */}
      <div style={{ borderBottom: '1px solid var(--line-cool)', background: 'var(--canvas-soft)' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--ink)', marginBottom: 6 }}>
                World Map
              </h1>
              <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
                Your bucket list and visited places — visualised worldwide
              </p>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 4 }}>
              {[
                { color: '#7c3aed', label: 'Bucket list', count: bucketMarkers.length },
                { color: '#16a34a', label: 'Visited',     count: visitedMarkers.length },
              ].map(({ color, label, count }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
                    {label} <span style={{ fontWeight: 600, color: 'var(--ink)' }}>({count})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Map container ── */}
      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          height: 520,
        }}>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {allMarkers.length > 0 && <FitBounds markers={allMarkers} />}

            {bucketMarkers.map(m => (
              <Marker key={`b-${m.id}`} position={m.latlng} icon={violetIcon}>
                <Popup>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 140 }}>
                    {m.flagUrl && <img src={m.flagUrl} alt="flag" style={{ height: 18, marginBottom: 6, borderRadius: 3, display: 'block' }} />}
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{m.city || m.country}</div>
                    {m.city && <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{m.country}</div>}
                    <div style={{ fontSize: 11, color: '#7c3aed', marginTop: 6, fontWeight: 500 }}>✈ In bucket list</div>
                    {m.priority && (
                      <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Priority: {m.priority}</div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

            {visitedMarkers.map(m => (
              <Marker key={`v-${m.id}`} position={m.latlng} icon={greenIcon}>
                <Popup>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 140 }}>
                    {m.flagUrl && <img src={m.flagUrl} alt="flag" style={{ height: 18, marginBottom: 6, borderRadius: 3, display: 'block' }} />}
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{m.city || m.country}</div>
                    {m.city && <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{m.country}</div>}
                    <div style={{ fontSize: 11, color: '#16a34a', marginTop: 6, fontWeight: 500 }}>✓ Visited</div>
                    {m.visitedAt && (
                      <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
                        {new Date(m.visitedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Empty state */}
        {allMarkers.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '48px 24px', marginTop: 16,
            border: '1px solid var(--line-cool)', borderRadius: 'var(--r-lg)',
            background: 'var(--canvas-soft)',
          }}>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>No destinations on the map yet</p>
            <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
              Add destinations with country data using the Auto-fill button — they will appear here automatically.
            </p>
          </div>
        )}
      </div>

      {/* Leaflet CSS override — keep it within design system */}
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 10px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important;
          border: 1px solid #e5e7eb !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 12px 14px !important;
        }
        .leaflet-popup-tip {
          box-shadow: none !important;
        }
        .leaflet-control-zoom {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06) !important;
        }
        .leaflet-control-zoom a {
          color: #444 !important;
          font-weight: 600 !important;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
          color: #aaa !important;
          background: rgba(255,255,255,0.8) !important;
        }
      `}</style>
    </div>
  );
}
