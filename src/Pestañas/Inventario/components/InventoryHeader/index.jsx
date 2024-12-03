import React from 'react';

const InventoryHeader = ({ totalItems, onSort, onFilter }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Mi Inventario</h1>
        <p className="text-gray-400">Total de items: {totalItems}</p>
      </div>
      <div className="flex gap-4">
        <select 
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          onChange={onSort}
        >
          <option value="">Ordenar por</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="name">Nombre</option>
        </select>
        <button 
          onClick={onFilter}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Filtros
        </button>
      </div>
    </div>
  );
};

export default InventoryHeader;
