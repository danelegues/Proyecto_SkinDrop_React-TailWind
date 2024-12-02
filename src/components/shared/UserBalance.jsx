import React from 'react';

const UserBalance = () => {
  return (
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <p className="text-white text-lg sm:text-xl mb-3 sm:mb-4">Tu Balance</p>
      
      <div className="bg-white bg-opacity-5 rounded-lg p-3 sm:p-4">
        {/* Sección de monedas */}
        <div className="flex items-center mb-3 sm:mb-4">
          <i className="fa-solid fa-coins text-orange-500 text-xl sm:text-2xl mr-2 sm:mr-3 opacity-100"></i>
          <div>
            <span className="text-gray-400 text-xs sm:text-sm">CS Coins</span>
            <span className="text-white text-lg sm:text-xl font-bold block">1,500</span>
          </div>
        </div>

        {/* Botón de añadir fondos */}
        <button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 sm:px-4 rounded text-sm sm:text-base flex items-center justify-center transition-colors"
          onClick={() => console.log('Añadir fondos')}
        >
          <i className="fa-solid fa-plus mr-2 opacity-100"></i>
          Añadir Fondos
        </button>
      </div>
    </div>
  );
};

export default UserBalance;
