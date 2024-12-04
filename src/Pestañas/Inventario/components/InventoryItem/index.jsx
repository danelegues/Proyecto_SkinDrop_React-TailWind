import React from 'react';

const InventoryItem = ({ item }) => {
  const { name, wear, price, image, status } = item;

  return (
    <div className="inventory-item bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        {status === 'on_sale' && (
          <span className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-green-500">
            En venta
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-gray-400 text-sm">{wear}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-500 font-bold">${price}</span>
        <button 
          className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-3 py-1 rounded"
          disabled={status === 'locked' || status === 'on_sale'}
        >
          Vender
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
