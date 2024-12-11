import React, { useState } from 'react';
import BoxCard from '../shared/BoxCard';
import '../../styles/MainContent.css';

const MainContent = () => {
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
      {/* Separador con título */}
      <div className="col-span-full flex items-center justify-center my-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
        <h2 className="text-orange-500 text-2xl uppercase font-bold mx-5">CAJAS POPULARES</h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
      </div>

      {/* Grid de cajas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div key={box.id} className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-all duration-300">
            <img 
              src={box.image} 
              alt={box.name} 
              className="w-full h-48 object-contain mb-4 hover:scale-105 transition-transform duration-300"
            />
            <div className="text-center">
              <h3 className="text-white text-xl mb-2">{box.name}</h3>
              <p className="text-orange-500 text-2xl font-bold">{box.price}€</p>
            </div>
          </div>
        ))}
      </div>

      {/* Segundo separador */}
      <div className="col-span-full flex items-center justify-center my-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
        <h2 className="text-orange-500 text-2xl uppercase font-bold mx-5">CAJAS MAS VENDIDAS</h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
      </div>

      {/* Segunda grid de cajas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div key={box.id} className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-all duration-300">
            <img 
              src={box.image} 
              alt={box.name} 
              className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
            />
            <div className="text-center">
              <p className="text-white text-xl mb-2">{box.name}</p>
              <p className="text-orange-500 text-2xl font-bold">{box.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
