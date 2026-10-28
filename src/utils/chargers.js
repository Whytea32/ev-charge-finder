// Shared helpers for the station -> chargers data model.
//
// Station:  { id, name, address, lat, lng, rating?, isDemoData?, chargers: [...] }
// Charger:  { id, ratedPowerKw, connectorType, pricePerKwh?, demoStatus? }
//
// After filtering, a station also carries `matchingChargers`: the chargers that
// satisfy the selected power filter (all of them when the filter is "All").
// Every component reads charger info through these helpers so that missing
// optional fields (price, status, rating, connector) are handled in one place.

export const DEMO_NOTE =
  'Demo data: all stations and chargers shown here are fictional, and charger status is sample data, not live.'

export const STATUS_LABELS = {
  available: 'Available',
  occupied: 'In use',
  offline: 'Offline',
}

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)

export function hasNumber(value) {
  return isNum(value)
}

export function getStatusKey(charger) {
  const status = charger?.demoStatus
  return Object.hasOwn(STATUS_LABELS, status) ? status : 'unknown'
}

export function getStatusLabel(charger) {
  return STATUS_LABELS[getStatusKey(charger)] ?? 'Status unknown'
}

// The chargers that count for this station right now (matching the filter if one is applied)
export function getRelevantChargers(station) {
  return station?.matchingChargers ?? station?.chargers ?? []
}

// Distinct power ratings, ascending, e.g. [60, 90, 120]
export function getPowerRatings(chargers = []) {
  return [...new Set(chargers.map((c) => c.ratedPowerKw).filter(isNum))].sort((a, b) => a - b)
}

export function getMaxPower(chargers = []) {
  const ratings = getPowerRatings(chargers)
  return ratings.length ? ratings[ratings.length - 1] : null
}

export function getMinPrice(chargers = []) {
  const prices = chargers.map((c) => c.pricePerKwh).filter(isNum)
  return prices.length ? Math.min(...prices) : null
}

// Lowest price among the chargers that matter for this station (used by sort + Cheapest badge)
export function getStationPrice(station) {
  return getMinPrice(getRelevantChargers(station))
}

export function getConnectorTypes(chargers = []) {
  return [...new Set(chargers.map((c) => c.connectorType).filter(Boolean))]
}

export function formatPower(kw) {
  return isNum(kw) ? `${kw} kW` : 'Power N/A'
}

export function formatPrice(price) {
  return isNum(price) ? `₹${price}/kWh` : 'Price N/A'
}

// "₹18/kWh" when all prices agree, "from ₹18/kWh" when they differ, "Price N/A" when none
export function getPriceLabel(chargers = []) {
  const prices = chargers.map((c) => c.pricePerKwh).filter(isNum)
  if (prices.length === 0) return 'Price N/A'
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? `₹${min}/kWh` : `from ₹${min}/kWh`
}

export function pluralChargers(count) {
  return count === 1 ? 'charger' : 'chargers'
}

// { text, tone } where tone is 'ok' | 'busy' | 'unknown' (matches the .status CSS classes)
export function getAvailabilitySummary(chargers = [], noun = 'chargers') {
  if (chargers.length === 0) return { text: 'No charger details', tone: 'unknown' }
  const known = chargers.filter((c) => getStatusKey(c) !== 'unknown')
  if (known.length === 0) return { text: 'Availability unknown', tone: 'unknown' }
  const available = chargers.filter((c) => getStatusKey(c) === 'available').length
  return {
    text: `${available} of ${chargers.length} ${noun} available`,
    tone: available > 0 ? 'ok' : 'busy',
  }
}
