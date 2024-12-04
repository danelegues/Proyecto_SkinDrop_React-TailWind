import React from 'react';

const FiltersModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Filtros</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Filtro de Desgaste */}
          <div>
            <label className="block text-white mb-2">Desgaste</label>
            <select 
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
              value={filters.wear}
              onChange={(e) => onApplyFilters({ ...filters, wear: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="Factory New">Factory New</option>
              <option value="Minimal Wear">Minimal Wear</option>
              <option value="Field-Tested">Field-Tested</option>
              <option value="Well-Worn">Well-Worn</option>
              <option value="Battle-Scarred">Battle-Scarred</option>
            </select>
          </div>

          {/* Filtro de Estado */}
          <div>
            <label className="block text-white mb-2">Estado</label>
            <select 
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
              value={filters.status}
              onChange={(e) => onApplyFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">Todos</option>
              <option value="available">Disponible</option>
              <option value="on_sale">En venta</option>
              <option value="locked">Bloqueado</option>
            </select>
          </div>

          {/* Filtro de Precio */}
          <div>
            <label className="block text-white mb-2">Rango de Precio</label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
                value={filters.minPrice}
                onChange={(e) => onApplyFilters({ ...filters, minPrice: e.target.value })}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
                value={filters.maxPrice}
                onChange={(e) => onApplyFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => onApplyFilters({
              wear: '',
              minPrice: '',
              maxPrice: '',
              status: 'all'
            })}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Resetear
          </button>
          <button
            onClick={onClose}
            className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533]"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;