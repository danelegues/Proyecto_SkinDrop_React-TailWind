import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BoxPopup = ({ onClose, boxData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const possibleItems = [
    {
      id: 1,
      name: "AWP | Dragon Lore",
      image: "/img/dragonlore.png",
      rarity: "legendary"
    },
    {
      id: 2,
      name: "AK-47 | Asiimov",
      image: "/img/akruleta.png",
      rarity: "rare"
    },
    {
      id: 3,
      name: "M4A4 | Howl",
      image: "/img/howl.png",
      rarity: "mythical"
    },
    {
      id: 4,
      name: "Desert Eagle | Blaze",
      image: "/img/deagle.png",
      rarity: "rare"
    },
    {
      id: 5,
      name: "USP-S | Kill Confirmed",
      image: "/img/deagle.png",
      rarity: "classified"
    },
    {
      id: 6,
      name: "Glock-18 | Fade",
      image: "/img/glock.png",
      rarity: "rare"
    },
    {
      id: 7,
      name: "M4A1-S | Hyper Beast",
      image: "/img/howl.png",
      rarity: "classified"
    },
    {
      id: 8,
      name: "Karambit | Fade",
      image: "/img/karambitbluegem.png",
      rarity: "legendary"
    },
    {
      id: 9,
      name: "Butterfly | Doppler",
      image: "/img/karambitbluegem.png",
      rarity: "legendary"
    },
    {
      id: 10,
      name: "AK-47 | Fire Serpent",
      image: "/img/akruleta.png",
      rarity: "covert"
    }
  ];

  const handleOpenBox = () => {
    navigate('/box-opening', { 
      state: { 
        boxData: {
          ...boxData,
          possibleItems: possibleItems
        }
      } 
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="relative z-[10000] bg-[#1a1a1a] backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-4xl w-full mx-4 border-2 border-orange-500">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {boxData.name}
          </h2>
          
          <div className="mb-6">
            <img 
              src={boxData.image} 
              alt={boxData.name} 
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-gray-400 text-lg mb-4">{t('boxPopup.possibleRewards')}:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {possibleItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-[#2a2a2a] p-2 rounded-lg`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-24 object-contain"
                  />
                  <p className="text-sm text-white mt-2">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleOpenBox}
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            {t('boxPopup.openFor')} {boxData.price}€
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxPopup;