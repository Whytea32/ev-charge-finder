import { useState } from 'react'
import stations from '../data/stations.json'
import { filterStations } from '../utils/filterStations.js'
import { sortStations } from '../utils/sortStations.js'
import { getDistanceKm } from '../utils/distance.js'
import { useGeolocation } from '../hooks/useGeolocation.js'
import FilterPanel from '../components/FilterPanel.jsx'
import StationCard from '../components/StationCard.jsx'
import MapView from '../components/MapView.jsx'

function Home() {
  const [selectedPower, setSelectedPower] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const { location, error, loading, requestLocation } = useGeolocation()

  // Add distance to every station once we know where the user is
  const withDistance = location
    ? stations.map((s) => ({ ...s, distanceKm: getDistanceKm(location, s) }))
    : stations

  const filtered = filterStations(withDistance, selectedPower)
  const visibleStations = sortStations(filtered, sortBy)

  const cheapestPrice =
    visibleStations.length > 0
      ? Math.min(...visibleStations.map((s) => s.pricePerKwh))
      : null

  return (
    <section>
      <FilterPanel
        selectedPower={selectedPower}
        onPowerChange={setSelectedPower}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasLocation={Boolean(location)}
        locating={loading}
        onUseLocation={() => requestLocation(() => setSortBy('distance'))}
      />
      {error && <p className="error-text">{error}</p>}
      <p className="muted">{visibleStations.length} stations found</p>
      <MapView stations={visibleStations} userLocation={location} />
      <div className="station-grid">
        {visibleStations.map((s) => (
          <StationCard
            key={s.id}
            station={s}
            isCheapest={s.pricePerKwh === cheapestPrice}
          />
        ))}
      </div>
    </section>
  )
}

export default Home