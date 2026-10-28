import { Link } from 'react-router-dom'
import ChargerList from './ChargerList.jsx'
import PowerBadges from './PowerBadges.jsx'
import {
  getAvailabilitySummary,
  getConnectorTypes,
  getPriceLabel,
  getRelevantChargers,
  hasNumber,
  pluralChargers,
} from '../utils/chargers.js'

function StationCard({ station, isCheapest, powerFilter = 'all' }) {
  const { id, name, address, rating, distanceKm, chargers = [] } = station
  const isFiltered = powerFilter !== 'all'
  const matching = getRelevantChargers(station)
  const connectors = getConnectorTypes(matching)
  const availability = getAvailabilitySummary(
    matching,
    isFiltered ? 'matching chargers' : 'chargers',
  )

  // Carry the filter to the detail page so it can highlight the same chargers
  const detailPath = isFiltered ? `/station/${id}?power=${powerFilter}` : `/station/${id}`

  return (
    <article className="station-card">
      {isCheapest && <span className="cheapest-badge">Cheapest</span>}
      <div className="card-top">
        <h3>{name}</h3>
        <PowerBadges chargers={chargers} powerFilter={powerFilter} />
      </div>
      <p className="muted">{address}</p>
      <div className="card-meta">
        <span>{connectors.length > 0 ? connectors.join(', ') : 'Connector N/A'}</span>
        <span>{getPriceLabel(matching)}</span>
        {hasNumber(rating) && <span>★ {rating}</span>}
        {distanceKm !== undefined && <span>{distanceKm.toFixed(1)} km away</span>}
      </div>
      {isFiltered && (
        <p className="match-summary">
          {matching.length} of {chargers.length} {pluralChargers(chargers.length)} match {powerFilter} kW
        </p>
      )}
      <ChargerList chargers={chargers} powerFilter={powerFilter} />
      <p className={`status ${availability.tone}`}>{availability.text}</p>
      <Link to={detailPath} className="details-link">View details →</Link>
    </article>
  )
}

export default StationCard
