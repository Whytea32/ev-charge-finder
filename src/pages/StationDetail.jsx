import { useParams, useSearchParams, Link } from 'react-router-dom'
import stations from '../data/stations.json'
import ChargerList from '../components/ChargerList.jsx'
import PowerBadges from '../components/PowerBadges.jsx'
import {
  DEMO_NOTE,
  getAvailabilitySummary,
  getConnectorTypes,
  getPriceLabel,
  hasNumber,
  pluralChargers,
} from '../utils/chargers.js'

function StationDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const station = stations.find((s) => s.id === Number(id))

  if (!station) {
    return (
      <section>
        <p>Station not found.</p>
        <Link to="/" className="back-link">← Back to stations</Link>
      </section>
    )
  }

  const { name, address, lat, lng, rating, isDemoData, chargers = [] } = station
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  // The station list passes ?power=120 etc. so we can highlight the matching chargers
  const rawPower = searchParams.get('power')
  const powerFilter =
    rawPower !== null && rawPower.trim() !== '' && Number.isFinite(Number(rawPower))
      ? Number(rawPower)
      : 'all'
  const isFiltered = powerFilter !== 'all'
  const matching = isFiltered ? chargers.filter((c) => c.ratedPowerKw === powerFilter) : chargers

  const connectors = getConnectorTypes(chargers)
  const availability = getAvailabilitySummary(chargers)

  return (
    <section className="detail">
      <Link to="/" className="back-link">← Back to stations</Link>

      <div className="card-top">
        <h2>{name}</h2>
        <PowerBadges chargers={chargers} powerFilter={powerFilter} />
      </div>
      <p className="muted">{address}</p>

      <dl className="detail-grid">
        <div><dt>Chargers</dt><dd>{chargers.length}</dd></div>
        <div><dt>Connectors</dt><dd>{connectors.length > 0 ? connectors.join(', ') : 'N/A'}</dd></div>
        <div><dt>Price</dt><dd>{getPriceLabel(chargers)}</dd></div>
        <div><dt>Rating</dt><dd>{hasNumber(rating) ? `★ ${rating}` : 'No rating yet'}</dd></div>
        <div>
          <dt>Availability</dt>
          <dd className={`status ${availability.tone}`}>{availability.text}</dd>
        </div>
      </dl>

      <h3>Charger units</h3>
      {isFiltered && (
        <p className="match-summary">
          {matching.length} of {chargers.length} {pluralChargers(chargers.length)} match {powerFilter} kW
        </p>
      )}
      <ChargerList chargers={chargers} powerFilter={powerFilter} />

      {isDemoData && <p className="demo-note">{DEMO_NOTE}</p>}

      <a className="directions-btn" href={directionsUrl} target="_blank" rel="noreferrer">
        Get Directions
      </a>
    </section>
  )
}

export default StationDetail
