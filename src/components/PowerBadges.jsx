import { getPowerRatings } from '../utils/chargers.js'

// One badge per distinct power rating at a station. When a power filter is
// active, ratings that don't match it are shown faded.
function PowerBadges({ chargers = [], powerFilter = 'all' }) {
  const ratings = getPowerRatings(chargers)
  const isFiltered = powerFilter !== 'all'

  return (
    <div className="badge-group">
      {ratings.length === 0 && <span className="power-badge dim">Power N/A</span>}
      {ratings.map((kw) => (
        <span
          key={kw}
          className={`power-badge ${isFiltered && kw !== powerFilter ? 'dim' : ''}`}
        >
          {kw} kW
        </span>
      ))}
    </div>
  )
}

export default PowerBadges
