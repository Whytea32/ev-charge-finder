// Keeps a station when it passes BOTH filters:
//   powerKw:     'all' or a number (60, 90, 120). The station must contain at
//                least one charger with exactly that ratedPowerKw.
//   searchQuery: free text matched against station name + address. Every word
//                typed must appear somewhere in name + address, so
//                "baner pune" and "pune baner" both find GreenVolt Hub.
//
// Each returned station is a copy with `matchingChargers` added: the chargers
// that satisfy the power filter (all chargers when the filter is "all").
export function filterStations(stations, powerKw, searchQuery = '') {
  const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const result = []

  for (const station of stations) {
    const chargers = station.chargers ?? []
    const matchingChargers =
      powerKw === 'all' ? chargers : chargers.filter((c) => c.ratedPowerKw === powerKw)

    if (powerKw !== 'all' && matchingChargers.length === 0) continue

    if (terms.length > 0) {
      const haystack = `${station.name} ${station.address}`.toLowerCase()
      if (!terms.every((term) => haystack.includes(term))) continue
    }

    result.push({ ...station, matchingChargers })
  }

  return result
}
