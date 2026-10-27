import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const PUNE_CENTER = [18.5204, 73.8567]

// Re-zooms the map to fit whichever stations are currently shown
function FitToStations({ stations }) {
  const map = useMap()

  useEffect(() => {
    if (stations.length === 0) return
    const bounds = stations.map((s) => [s.lat, s.lng])
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }, [stations, map])

  return null
}

function MapView({ stations, userLocation }) {
  return (
    <MapContainer center={PUNE_CENTER} zoom={12} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToStations stations={stations} />
            {userLocation && (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={8}
          pathOptions={{ color: '#fff', fillColor: '#2563eb', fillOpacity: 1, weight: 3 }}
        >
          <Popup>You are here</Popup>
        </CircleMarker>
      )}
      {stations.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.lat, s.lng]}
          radius={11}
          pathOptions={{ color: '#14213d', fillColor: '#1b9e5a', fillOpacity: 0.9, weight: 2 }}
        >
          <Popup>
            <strong>{s.name}</strong>
            <br />
            {s.powerKw} kW · {s.connector}
            <br />
            ₹{s.pricePerKwh}/kWh
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default MapView