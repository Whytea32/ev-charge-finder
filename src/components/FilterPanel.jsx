const POWER_OPTIONS = ['all', 60, 90, 120]

function FilterPanel({
  searchQuery, onSearchChange,
  selectedPower, onPowerChange,
  hasActiveFilters, onClearFilters,
  sortBy, onSortChange,
  hasLocation, locating, onUseLocation,
}) {
  return (
    <div className="filter-panel">
      <div className="search-row">
        <input
          type="search"
          className="search-input"
          placeholder="Search name or area…"
          aria-label="Search stations by name or area"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          className="clear-btn"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear filters
        </button>
      </div>

      <span className="filter-label">Charger power:</span>
      {POWER_OPTIONS.map((option) => (
        <button
          key={option}
          className={`filter-btn ${selectedPower === option ? 'active' : ''}`}
          onClick={() => onPowerChange(option)}
        >
          {option === 'all' ? 'All' : `${option} kW`}
        </button>
      ))}

      <button className="location-btn" onClick={onUseLocation} disabled={locating}>
        {locating ? 'Locating…' : hasLocation ? '📍 Update location' : '📍 Use my location'}
      </button>

      <label className="sort-control">
        Sort by:
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">Default</option>
          {hasLocation && <option value="distance">Nearest first</option>}
          <option value="price">Price: low to high</option>
          <option value="rating">Rating: high to low</option>
          <option value="power">Power: high to low</option>
        </select>
      </label>
    </div>
  )
}

export default FilterPanel