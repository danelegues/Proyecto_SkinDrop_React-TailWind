import React, { useState } from 'react';

const SearchUsers = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-6">Intercambios</h1>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar usuario..."
            className="w-full bg-[#1a1a1a] text-white px-6 py-4 rounded-lg border border-[#2a2a2a] 
                     focus:outline-none focus:border-[#ff6b00] text-lg pr-32"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff6b00] hover:bg-[#ff8533] 
                     text-white px-6 py-2 rounded-lg transition-all hover:scale-105 text-lg font-medium"
          >
            Buscar
          </button>
        </form>
        <p className="text-gray-400 mt-2 text-center">
          Busca usuarios por su nombre para realizar intercambios
        </p>
      </div>
    </div>
  );
};

export default SearchUsers;
