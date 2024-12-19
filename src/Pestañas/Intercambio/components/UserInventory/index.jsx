import React from 'react';
import { useTranslation } from 'react-i18next';

const UserInventory = ({ user, onClose }) => {
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#2a2a2a] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <i className="fas fa-user text-gray-600 text-base"></i>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">{user.username}</h3>
              <p className="text-gray-400">
                {user.totalItems} {t('trade.inventory.items')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={t('trade.inventory.close')}
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Grid de items */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {user.inventory?.map((item) => (
              <div 
                key={item.id}
                className="bg-[#2a2a2a] rounded-lg p-4 hover:bg-[#3a3a3a] transition-all"
              >
                <img 
                  src={`/img/${item.image}`}
                  alt={item.name}
                  className="w-full aspect-square object-contain mb-2"
                />
                <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                <p className="text-[#ff6b00] text-sm">{item.price.toFixed(2)}€</p>
                <p className="text-gray-400 text-xs">{item.wear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInventory;