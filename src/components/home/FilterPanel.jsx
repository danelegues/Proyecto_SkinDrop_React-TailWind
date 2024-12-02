import React, { useState } from 'react';
import '../../styles/FilterPanel.css';

const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'rifles', name: 'Rifles', count: 45 },
    { id: 'knives', name: 'Cuchillos', count: 32 },
    { id: 'pistols', name: 'Pistolas', count: 28 },
    { id: 'gloves', name: 'Guantes', count: 15 }
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <h3 className="text-white text-lg sm:text-xl mb-4 sm:mb-6">Filtros</h3>

      {/* Filtro de precio */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm block mb-2">
          Rango de precio
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-20 bg-white bg-opacity-5 text-white rounded px-2 py-1 text-sm"
            min="0"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-20 bg-white bg-opacity-5 text-white rounded px-2 py-1 text-sm"
            min="0"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full price-range-slider"
        />
      </div>

      {/* Filtro de categorías */}
      <div>
        <label className="text-gray-400 text-sm block mb-2">
          Categorías
        </label>
        <div className="space-y-2">
          {categories.map(category => (
            <CategoryCheckbox
              key={category.id}
              category={category}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 space-y-2">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-colors">
          Aplicar filtros
        </button>
        <button 
          className="w-full bg-white bg-opacity-5 hover:bg-opacity-10 text-gray-300 py-2 rounded transition-colors"
          onClick={() => {
            setPriceRange([0, 100]);
            setSelectedCategories([]);
          }}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

const CategoryCheckbox = ({ category, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
      <span className="text-gray-300 ml-2 group-hover:text-white transition-colors">
        {category.name}
      </span>
    </div>
    <span className="text-gray-500 text-sm">
      ({category.count})
    </span>
  </label>
);

export default FilterPanel; 