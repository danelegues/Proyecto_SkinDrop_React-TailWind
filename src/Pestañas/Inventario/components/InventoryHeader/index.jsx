import React from 'react';

const InventoryHeader = ({ totalItems, onSort, onFilter }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Mi Inventario</h1>
        <p className="text-gray-400 text-lg">Total de items: {totalItems}</p>
      </div>
      <div className="flex gap-3">
        <select 
          className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg min-w-[200px]"
          onChange={onSort}
        >
          <option value="">Ordenar por</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="name">Nombre</option>
          <option value="wear">Desgaste</option>
        </select>
        <button 
          onClick={onFilter}
          className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg transition-all hover:scale-105 text-lg font-medium min-w-[120px]"
        >
          Filtros
        </button>
      </div>
    </div>
  );
};

export default InventoryHeader;
