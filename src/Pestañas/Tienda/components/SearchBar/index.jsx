import React, { useState } from 'react';

function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onSortToggle, 
  sortByPrice,
  typeFilter,
  onTypeChange,
  rarityFilter,
  onRarityChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange
}) {
  const [showPriceModal, setShowPriceModal] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-2 sm:p-4 bg-[#1a1a1a] rounded-lg transition-all duration-300">
      <div className="flex flex-wrap gap-2">
        <button 
          className={`flex-shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg transition-colors ${
            sortByPrice ? 'bg-[#2a2a2a]' : 'bg-[#ff6b00]'
          } text-white text-sm sm:text-base whitespace-nowrap`}
          onClick={onSortToggle}
        >
          ORDENAR POR PRECIO
        </button>

        <input
          type="text"
          placeholder="BUSCAR MERCADO"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-[200px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        />

        <select 
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="flex-shrink-0 min-w-[150px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <option value="all">Todos los tipos</option>
          <option value="rifle">Rifles</option>
          <option value="pistol">Pistolas</option>
          <option value="knife">Cuchillos</option>
        </select>

        <select 
          value={rarityFilter}
          onChange={(e) => onRarityChange(e.target.value)}
          className="flex-shrink-0 min-w-[150px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <option value="all">Todas las rarezas</option>
          <option value="Consumer">Consumer</option>
          <option value="Industrial">Industrial</option>
          <option value="Mil-Spec">Mil-Spec</option>
          <option value="Restricted">Restricted</option>
          <option value="Classified">Classified</option>
          <option value="Covert">Covert</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
