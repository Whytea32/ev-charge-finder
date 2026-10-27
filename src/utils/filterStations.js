// powerKw: 'all' or a number (60, 90, 120)
export function filterStations(stations, powerKw) {
  if (powerKw === 'all') return stations
  return stations.filter((s) => s.powerKw === powerKw)
}