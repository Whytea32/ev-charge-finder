// Returns a new sorted array; never changes the original
export function sortStations(stations, sortBy) {
  const list = [...stations]
  switch (sortBy) {
    case 'price':
      return list.sort((a, b) => a.pricePerKwh - b.pricePerKwh)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating)
    case 'power':
      return list.sort((a, b) => b.powerKw - a.powerKw)
    case 'distance':
      return list.sort((a, b) => a.distanceKm - b.distanceKm)
    default:
      return list
  }
}