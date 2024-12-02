function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onSortToggle, 
  sortByPrice,
  typeFilter,
  onTypeChange,
  rarityFilter,
  onRarityChange 
}) {
  return (
    <div className="w-full bg-[#1a1a1a] rounded-lg p-4">
      <div className="flex items-center gap-4">
        <button 
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            sortByPrice ? 'bg-[#2a2a2a]' : 'bg-[#ff6b00]'
          } text-white`}
          onClick={onSortToggle}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          ORDENAR POR PRECIO
        </button>

        <select 
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todos los tipos</option>
          <option value="knife">Cuchillos</option>
          <option value="rifle">Rifles</option>
          <option value="pistol">Pistolas</option>
        </select>

        <select 
          value={rarityFilter}
          onChange={(e) => onRarityChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todas las rarezas</option>
          <option value="Consumer">Consumer</option>
          <option value="Industrial">Industrial</option>
          <option value="Mil-Spec">Mil-Spec</option>
          <option value="Restricted">Restricted</option>
          <option value="Classified">Classified</option>
          <option value="Covert">Covert</option>
          <option value="Contraband">Contraband</option>
        </select>

        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="BUSCAR MERCADO"
            className="search-input"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg">
            0$
          </button>
          <button className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg">
            0$
          </button>
          <button className="bg-[#2a2a2a] text-white p-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
