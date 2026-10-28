import { useState } from 'react'
import stations from '../data/stations.json'
import { filterStations } from '../utils/filterStations.js'
import { sortStations } from '../utils/sortStations.js'
import { getDistanceKm } from '../utils/distance.js'
import { DEMO_NOTE, getStationPrice } from '../utils/chargers.js'
import { useGeolocation } from '../hooks/useGeolocation.js'
import FilterPanel from '../components/FilterPanel.jsx'
import StationCard from '../components/StationCard.jsx'
import MapView from '../components/MapView.jsx'

function Home() {
  const [selectedPower, setSelectedPower] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const { location, error, loading, requestLocation } = useGeolocation()

  const hasActiveFilters = selectedPower !== 'all' || searchQuery.trim() !== ''

  // Resets search and power only; sorting and location are left as they are
  function clearFilters() {
    setSearchQuery('')
    setSelectedPower('all')
  }

  const withDistance = location
    ? stations.map((s) => ({ ...s, distanceKm: getDistanceKm(location, s) }))
    : stations

  // One list feeds the count, the map and the cards, so they can never disagree
  const filtered = filterStations(withDistance, selectedPower, searchQuery)
  const visibleStations = sortStations(filtered, sortBy)

  // Cheapest among the stations currently shown, judged by their matching chargers
  const prices = visibleStations.map(getStationPrice).filter((p) => p !== null)
  const cheapestPrice = prices.length > 0 ? Math.min(...prices) : null

  const count = visibleStations.length
  const countLabel = hasActiveFilters
    ? `${count} of ${stations.length} stations match`
    : `${count} ${count === 1 ? 'station' : 'stations'} found`

  return (
    <section>
      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPower={selectedPower}
        onPowerChange={setSelectedPower}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hasLocation={Boolean(location)}
        locating={loading}
        onUseLocation={() => requestLocation(() => setSortBy('distance'))}
      />
      {error && <p className="error-text">{error}</p>}
      <p className="muted" aria-live="polite">{countLabel}</p>
      {stations.some((s) => s.isDemoData) && <p className="demo-note">{DEMO_NOTE}</p>}
      <MapView stations={visibleStations} userLocation={location} />

      {count === 0 ? (
        <div className="empty-state">
          <h3>No stations match your search</h3>
          <p className="muted">
            Try a different station name or area, or choose another charger power.
          </p>
          <button className="filter-btn active" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="station-grid">
          {visibleStations.map((s) => (
            <StationCard
              key={s.id}
              station={s}
              powerFilter={selectedPower}
              isCheapest={cheapestPrice !== null && getStationPrice(s) === cheapestPrice}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
