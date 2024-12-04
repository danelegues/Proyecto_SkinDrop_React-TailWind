import React, { useState } from 'react';

const SellModal = ({ isOpen, onClose, item }) => {
  const [price, setPrice] = useState('');
  // Esto luego vendrá del backend
  const quickSellPrice = (item?.price * 0.8).toFixed(2); // 80% del precio original como ejemplo

  if (!isOpen) return null;

  const handleQuickSell = () => {
    // Aquí irá la lógica del backend para venta rápida
    console.log(`Venta rápida de ${item?.name} por $${quickSellPrice}`);
    onClose();
  };

  const handleMarketSell = () => {
    if (!price || price <= 0) {
      alert('Por favor, introduce un precio válido');
      return;
    }
    // Aquí irá la lógica del backend para venta en mercado
    console.log(`Vendiendo ${item?.name} en el mercado por $${price}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Vender Arma</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col items-center">
          {/* Imagen */}
          <div className="mb-4 w-48 h-48 flex items-center justify-center">
            <img 
              src={`/img/${item?.image}`}
              alt={item?.name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Info del arma */}
          <div className="text-center mb-6">
            <h3 className="text-white text-xl font-bold mb-1">{item?.name}</h3>
            <p className={`text-purple-400 text-sm font-medium`}>{item?.wear}</p>
          </div>

          {/* Botones de venta */}
          <div className="w-full space-y-4">
            {/* Venta Rápida */}
            <button
              onClick={handleQuickSell}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
            >
              Venta Rápida ${quickSellPrice}
            </button>

            {/* Input y botón de venta en mercado */}
            <div className="relative">
              <div className="relative flex items-center bg-[#2a2a2a] rounded-lg mb-2">
                <span className="text-gray-400 pl-3">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent text-white px-2 py-3 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <button
                onClick={handleMarketSell}
                className="w-full py-3 bg-[#ff6b00] text-white rounded-lg font-medium hover:bg-[#ff8533] transition-all"
              >
                Poner en venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellModal;