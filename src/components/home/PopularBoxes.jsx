import React from 'react';
import BoxCard from '../shared/BoxCard';

const PopularBoxes = () => {
  // Datos de ejemplo para las cajas
  const boxes = [
    {
      id: 1,
      name: "Caja Premium",
      price: 4.99,
      image: "/img/CAJA 4_preview_rev_1.png"
    },
    {
      id: 2,
      name: "Caja Premium",
      price: 4.99,
      image: "/img/descarga (3)-fotor-bg-remover-202410031336.png"
    },
    {
      id: 3,
      name: "Caja Premium",
      price: 4.99,
      image: "/img/descarga-fotor-bg-remover-2024100313334.png"
    }
  ];

  return (
    <div className="flex-1 min-h-0 px-4 lg:px-6">
      {/* Filtros superiores */}
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterButton active>Todos</FilterButton>
        <FilterButton>Populares</FilterButton>
        <FilterButton>Nuevos</FilterButton>
        <FilterButton>Premium</FilterButton>
      </div>

      {/* Separador con título */}
      <div className="col-span-full flex items-center justify-center my-4">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[100px] opacity-60"></div>
        <h2 className="text-orange-500 text-xl uppercase font-bold mx-3">Cajas mas vendidas</h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[100px] opacity-60"></div>
      </div>

      {/* Grid de cajas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
};

const FilterButton = ({ children, active }) => (
  <button
    className={`
      px-4 py-2 rounded-lg text-sm transition-all duration-300
      ${active 
        ? 'bg-orange-500 text-white' 
        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525]'}
    `}
  >
    {children}
  </button>
);

export default PopularBoxes;
