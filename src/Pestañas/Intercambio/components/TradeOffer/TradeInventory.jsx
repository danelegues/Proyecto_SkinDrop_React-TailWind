import React from 'react';

const TradeInventory = ({ items, onSelectItem, selectedItems }) => {
  const availableItems = items.filter(
    item => !selectedItems.some(selected => selected.id === item.id)
  );

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-2 sm:p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 h-[200px] sm:h-[250px] md:h-[300px] overflow-y-auto">
        {availableItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-[#1a1a1a] aspect-[3/4] rounded-lg cursor-pointer transition-all flex flex-col"
          >
            <div className="flex-1 p-4 flex items-center justify-center hover:scale-110">
              <img 
                src={`/img/${item.image}`}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 pt-0">
              <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
              <p className="text-[#ff6b00] text-sm mt-1">{item.price.toFixed(2)}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeInventory;