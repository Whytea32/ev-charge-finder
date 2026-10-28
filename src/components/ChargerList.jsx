import { formatPower, formatPrice, getStatusKey, getStatusLabel } from '../utils/chargers.js'

// Lists every charger unit at a station. When a power filter is active the
// matching units are highlighted with a "Matches" tag and the rest are faded.
function ChargerList({ chargers = [], powerFilter = 'all' }) {
  if (chargers.length === 0) {
    return <p className="muted">No charger details listed.</p>
  }

  const isFiltered = powerFilter !== 'all'

  return (
    <ul className="charger-list">
      {chargers.map((charger, index) => {
        const matches = charger.ratedPowerKw === powerFilter
        const rowClass = isFiltered ? (matches ? 'match' : 'no-match') : ''

        return (
          <li key={charger.id ?? index} className={`charger-row ${rowClass}`}>
            <span className="charger-name">
              {charger.label ?? `Charger ${index + 1}`}
              {isFiltered && matches && <span className="match-tag">✓ Matches</span>}
            </span>
            <span>{formatPower(charger.ratedPowerKw)}</span>
            <span>{charger.connectorType ?? 'Connector N/A'}</span>
            <span>{formatPrice(charger.pricePerKwh)}</span>
            <span className={`status-chip ${getStatusKey(charger)}`}>{getStatusLabel(charger)}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default ChargerList
