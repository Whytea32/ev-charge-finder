import { useParams, Link } from 'react-router-dom'
import stations from '../data/stations.json'

function StationDetail() {
  const { id } = useParams()
  const station = stations.find((s) => s.id === Number(id))

  if (!station) {
    return (
      <section>
        <p>Station not found.</p>
        <Link to="/" className="back-link">← Back to stations</Link>
      </section>
    )
  }

  const { name, address, lat, lng, powerKw, connector, pricePerKwh, rating, availableChargers, totalChargers } = station
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const isAvailable = availableChargers > 0

  return (
    <section className="detail">
      <Link to="/" className="back-link">← Back to stations</Link>

      <div className="card-top">
        <h2>{name}</h2>
        <span className="power-badge">{powerKw} kW</span>
      </div>
      <p className="muted">{address}</p>

      <dl className="detail-grid">
        <div><dt>Charger power</dt><dd>{powerKw} kW</dd></div>
        <div><dt>Connector</dt><dd>{connector}</dd></div>
        <div><dt>Price</dt><dd>₹{pricePerKwh}/kWh</dd></div>
        <div><dt>Rating</dt><dd>★ {rating}</dd></div>
        <div>
          <dt>Availability</dt>
          <dd className={isAvailable ? 'status ok' : 'status busy'}>
            {isAvailable ? `${availableChargers} of ${totalChargers} free` : 'All chargers busy'}
          </dd>
        </div>
      </dl>

      <a className="directions-btn" href={directionsUrl} target="_blank" rel="noreferrer">
        Get Directions
      </a>
    </section>
  )
}

export default StationDetail