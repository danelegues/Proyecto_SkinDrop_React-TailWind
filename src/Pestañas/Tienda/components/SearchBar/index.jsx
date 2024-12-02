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
    <div className="bg-[#1a1a1a] rounded-lg p-4 inline-flex items-center gap-4">
      <button 
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          sortByPrice ? 'bg-[#2a2a2a]' : 'bg-[#ff6b00]'
        } text-white`}
        onClick={onSortToggle}
      >
        ORDENAR POR PRECIO
      </button>

      <input
        type="text"
        placeholder="BUSCAR MERCADO"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg w-[200px]"
      />

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

      <div className="flex items-center gap-2">
        <button 
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowPriceModal(true)}
        >
          {minPrice || '0'}€
        </button>
        <span className="text-white">-</span>
        <button 
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowPriceModal(true)}
        >
          {maxPrice === Infinity ? '∞' : `${maxPrice}€`}
        </button>
      </div>

      {/* Modal de rango de precios */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] p-6 rounded-lg w-96">
            <h3 className="text-white text-lg mb-4">Rango de Precio</h3>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(Number(e.target.value))}
                placeholder="Min"
                className="bg-[#1a1a1a] text-white px-4 py-2 rounded w-full"
              />
              <input
                type="number"
                value={maxPrice === Infinity ? '' : maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value ? Number(e.target.value) : Infinity)}
                placeholder="Max"
                className="bg-[#1a1a1a] text-white px-4 py-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  onMinPriceChange(0);
                  onMaxPriceChange(Infinity);
                  setShowPriceModal(false);
                }}
                className="px-4 py-2 rounded bg-[#1a1a1a] text-white"
              >
                Resetear
              </button>
              <button
                onClick={() => setShowPriceModal(false)}
                className="px-4 py-2 rounded bg-[#ff6b00] text-white"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
