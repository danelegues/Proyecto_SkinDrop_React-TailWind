import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TradeInventory from './TradeInventory';
import SelectedItems from './SelectedItems';
import TradeAction from './TradeAction';

// Datos de prueba para el inventario del usuario actual
const MY_INVENTORY = [
  {
    id: 301,
    name: "AWP | Asiimov",
    wear: "Field-Tested",
    price: 85.50,
    image: "dragonlore.png"
  },
  {
    id: 302,
    name: "M4A4 | Howl",
    wear: "Minimal Wear",
    price: 1200.00,
    image: "m4a4.png"
  }
];

const TradeOffer = ({ user, onClose }) => {
  const { t } = useTranslation();
  const [mySelectedItems, setMySelectedItems] = useState([]);
  const [theirSelectedItems, setTheirSelectedItems] = useState([]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#2a2a2a] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <i className="fas fa-user text-gray-600 text-sm sm:text-base"></i>
            </div>
            <h2 className="text-white text-base sm:text-xl font-bold truncate">
              {t('trade.tradeOffer.title')} {user.username}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-icons text-base sm:text-xl">close</span>
          </button>
        </div>

        {/* Contenido principal con scroll */}
        <div className="flex-1 overflow-y-auto">
          {/* Inventarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
            {/* Left Side - Your Items */}
            <div>
              <h3 className="text-white text-base sm:text-lg font-medium mb-4">
                {t('trade.tradeOffer.yourItems')}
              </h3>
              <TradeInventory 
                items={MY_INVENTORY}
                selectedItems={mySelectedItems}
                onSelectItem={(item) => setMySelectedItems([...mySelectedItems, item])}
              />
            </div>

            {/* Right Side - Their Items */}
            <div>
              <h3 className="text-white text-base sm:text-lg font-medium mb-4">
                {t('trade.tradeOffer.theirItems')} {user.username}
              </h3>
              <TradeInventory 
                items={user.inventory}
                selectedItems={theirSelectedItems}
                onSelectItem={(item) => setTheirSelectedItems([...theirSelectedItems, item])}
              />
            </div>
          </div>

          {/* Items Seleccionados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-6">
            <SelectedItems 
              items={mySelectedItems}
              onRemoveItem={(itemId) => setMySelectedItems(mySelectedItems.filter(item => item.id !== itemId))}
            />
            <SelectedItems 
              items={theirSelectedItems}
              onRemoveItem={(itemId) => setTheirSelectedItems(theirSelectedItems.filter(item => item.id !== itemId))}
            />
          </div>
        </div>

        {/* Trade Actions - Fijo en la parte inferior */}
        <div className="shrink-0">
          <TradeAction 
            myItems={mySelectedItems}
            theirItems={theirSelectedItems}
            onSubmit={() => {
              console.log('Oferta enviada');
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TradeOffer;