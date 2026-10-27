function StationCard({ station, isCheapest }) {
const { name, address, powerKw, connector, pricePerKwh, rating, availableChargers, totalChargers, distanceKm } = station
  const isAvailable = availableChargers > 0

  return (
    <article className="station-card">
      {isCheapest && <span className="cheapest-badge">Cheapest</span>}
      <div className="card-top">
        <h3>{name}</h3>
        <span className="power-badge">{powerKw} kW</span>
      </div>
      <p className="muted">{address}</p>
      <div className="card-meta">
        <span>{connector}</span>
        <span>₹{pricePerKwh}/kWh</span>
        <span>★ {rating}</span>
        {distanceKm !== undefined && <span>{distanceKm.toFixed(1)} km away</span>}
      </div>
      <p className={isAvailable ? 'status ok' : 'status busy'}>
        {isAvailable ? `${availableChargers} of ${totalChargers} chargers free` : 'All chargers busy'}
      </p>
            <Link to={`/station/${station.id}`} className="details-link">View details →</Link>
    </article>
  )
}

export default StationCard
import { Link } from 'react-router-dom'