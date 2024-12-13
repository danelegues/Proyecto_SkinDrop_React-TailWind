import React from 'react';
import { useTranslation } from 'react-i18next';

const SelectedItems = ({ items, onRemoveItem }) => {
  const { t } = useTranslation();
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-2 sm:p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white text-sm sm:text-base font-medium">
          {t('trade.tradeOffer.selectedItems')}
        </h4>
        <p className="text-[#ff6b00] text-sm sm:text-base">
          {t('trade.tradeOffer.total')} ${totalValue.toFixed(2)}
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {items.map((item) => (
          <div 
            key={item.id}
            className="relative group"
          >
            <img 
              src={`/img/${item.image}`}
              alt={item.name}
              className="w-full aspect-square object-contain rounded"
            />
            <button
              onClick={() => onRemoveItem(item.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedItems;