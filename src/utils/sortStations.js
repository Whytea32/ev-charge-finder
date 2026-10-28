import { getMaxPower, getRelevantChargers, getStationPrice } from './chargers.js'

const numberOrNull = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

// Compares by a numeric value; stations with no value always go last
function byNumber(getValue, direction) {
  return (a, b) => {
    const x = getValue(a)
    const y = getValue(b)
    if (x === null && y === null) return 0
    if (x === null) return 1
    if (y === null) return -1
    return direction === 'asc' ? x - y : y - x
  }
}

// Returns a new sorted array; never changes the original.
// Price and power use the chargers that match the current power filter, so
// with "120 kW" selected a station is ranked by its 120 kW chargers only.
export function sortStations(stations, sortBy) {
  const list = [...stations]
  switch (sortBy) {
    case 'price':
      return list.sort(byNumber(getStationPrice, 'asc'))
    case 'rating':
      return list.sort(byNumber((s) => numberOrNull(s.rating), 'desc'))
    case 'power':
      return list.sort(byNumber((s) => getMaxPower(getRelevantChargers(s)), 'desc'))
    case 'distance':
      return list.sort(byNumber((s) => numberOrNull(s.distanceKm), 'asc'))
    default:
      return list
  }
}
