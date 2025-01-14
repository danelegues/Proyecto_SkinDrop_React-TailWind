import React from 'react';
import { useTranslation } from 'react-i18next';
import UserBalance from '../shared/UserBalance';
import '../../styles/RightPanel.css';

const RightPanel = () => {
  const { t } = useTranslation();

  const recentDrops = [
    {
      id: 1,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 2,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 3,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    }
  ];

  return (
    <div className="h-full flex flex-col space-y-4 mt-16">
      {/* Balance del Usuario */}
      <UserBalance />

      

      {/* Últimos Drops */}
      <div className="bg-[#141414] rounded-lg p-4">
        <h3 className="text-white text-xl font-bold mb-4">{t('lastDrops.title')}</h3>
        <div className="space-y-2">
          {recentDrops.map((drop) => (
            <div 
              key={drop.id} 
              className="bg-[#1a1a1a] rounded-lg p-3 flex items-center gap-3 hover:bg-[#222] transition-all duration-300"
            >
              <img 
                src={drop.image} 
                alt={drop.name} 
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium">{drop.name}</h4>
                <p className="text-orange-500 font-bold">{drop.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
