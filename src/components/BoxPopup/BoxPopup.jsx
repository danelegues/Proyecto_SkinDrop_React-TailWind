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
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOpenBox = () => {
    navigate('/box-opening', { 
      state: { 
        boxData: boxData,
        items: boxData.items // Asegúrate de que los items vengan de la API
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
              src={boxData.image_url} 
              alt={boxData.name} 
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-gray-400 text-lg mb-4">{t('boxPopup.possibleRewards')}:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {boxData.items && boxData.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-[#2a2a2a] p-2 rounded-lg border-2 ${getRarityBorderColor(item.rarity)}`}
                >
                  <img 
                    src={item.image_url} 
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

const getRarityBorderColor = (rarity) => {
  const colors = {
    'common': 'border-gray-400',
    'uncommon': 'border-blue-400',
    'rare': 'border-purple-400',
    'epic': 'border-pink-400',
    'legendary': 'border-orange-400',
    'mythical': 'border-red-400',
    'ancient': 'border-yellow-400',
    'default': 'border-gray-400'
  };
  return colors[rarity?.toLowerCase()] || colors.default;
};

export default BoxPopup;