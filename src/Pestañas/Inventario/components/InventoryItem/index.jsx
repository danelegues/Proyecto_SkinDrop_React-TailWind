import React from 'react';

const InventoryItem = ({ item }) => {
  const { name, wear, price, image, status } = item;

  const getWearColor = (wear) => {
    const colors = {
      'Factory New': 'text-blue-400',
      'Minimal Wear': 'text-purple-400',
      'Field-Tested': 'text-yellow-400',
      'Well-Worn': 'text-orange-400',
      'Battle-Scarred': 'text-red-400'
    };
    return colors[wear] || 'text-gray-400';
  };

  const handleImageError = (e) => {
    e.target.src = '/img/default-skin.png';
  };

  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-lg overflow-hidden group border border-transparent hover:border-[#ff6b00]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6b00]/20">
      <div className="relative">
        <div className="bg-[#141414] p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <img 
            src={image} 
            alt={name}
            onError={handleImageError}
            className="max-w-full max-h-full object-contain group-hover:scale-110 group-hover:rotate-1"
            style={{
              maxHeight: '150px',
              width: 'auto'
            }}
          />
        </div>
        {status === 'on_sale' && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            En venta
          </span>
        )}
        {status === 'locked' && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
            Bloqueado
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-xl font-bold text-white truncate flex-1" title={name}>{name}</h3>
          <span className="text-green-500 font-bold text-xl ml-2">${price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-sm ${getWearColor(wear)} font-medium`}>{wear}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400 text-sm">ID: #{item.id}</span>
        </div>
        <button 
          className={`w-full py-2.5 rounded-lg font-medium
            ${status === 'locked' || status === 'on_sale' 
              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white hover:shadow-lg hover:shadow-[#ff6b00]/25 hover:scale-[1.02] active:scale-95'}`}
          disabled={status === 'locked' || status === 'on_sale'}
        >
          {status === 'locked' ? 'Bloqueado' : status === 'on_sale' ? 'En venta' : 'Vender'}
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
