import React, { useState } from 'react';

const SearchUsers = ({ onSearch }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[60vh] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6b00] opacity-5 blur-[100px] rounded-full"></div>
      
      <h1 className="text-8xl font-black text-white mb-6 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#ff6b00]">
          Intercambios
        </span>
      </h1>

      <p className="text-3xl mb-16 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] bg-clip-text text-transparent font-medium">
        Encuentra usuarios y realiza intercambios de skins
      </p>
      
      <div className="flex gap-3 pb-1 w-full max-w-2xl relative">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="flex-1 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all shadow-lg shadow-black/20 text-lg"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#ff6b00]/20 transition-all duration-300 text-lg font-medium">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchUsers;
