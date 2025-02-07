import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import API_URL from '../../config/config.js';

const BoxPopup = ({ onClose, boxData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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

  const checkAndUpdateBalance = async () => {
    try {
      // Obtener el balance actual
      const balanceResponse = await axios.get(`${API_URL}/api/profile`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });

      const currentBalance = balanceResponse.data.user.balance;

      // Verificar si hay suficiente balance
      if (currentBalance < boxData.price) {
        alert(t('boxPopup.insufficientFunds'));
        return false;
      }

      // Actualizar el balance restando el precio de la caja
      const updateResponse = await axios.put(
        `${API_URL}/api/profile/balance`,
        { 
          amount: -parseFloat(boxData.price) // Aseguramos que sea un número
        },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (updateResponse.data.balance !== undefined) {
        return true;
      }

      alert(t('boxPopup.errorProcessing'));
      return false;
    } catch (error) {
      console.error('Error checking/updating balance:', error.response?.data || error);
      
      if (error.response?.status === 422) {
        alert(t('boxPopup.insufficientFunds'));
      } else {
        alert(t('boxPopup.errorProcessing'));
      }
      
      return false;
    }
  };

  const handleOpenBox = async () => {
    // Verificar si el usuario está autenticado
    if (!user) {
      alert(t('boxPopup.loginRequired'));
      return;
    }

    // Verificar y actualizar el balance
    const canProceed = await checkAndUpdateBalance();
    if (!canProceed) return;

    // Incrementar el contador de cajas abiertas y el valor total
    if (window.incrementCasesOpened) {
      window.incrementCasesOpened(boxData.price);
    }

    // Agregar el drop a los recientes con la imagen correcta
    const newDrop = {
      id: Date.now(),
      name: boxData.name,
      image: boxData.image_url || boxData.image,
      price: boxData.price
    };

    const storedDrops = JSON.parse(localStorage.getItem('recentDrops') || '[]');
    const updatedDrops = [newDrop, ...storedDrops].slice(0, 10);
    localStorage.setItem('recentDrops', JSON.stringify(updatedDrops));
    
    navigate('/box-opening', { 
      state: { 
        boxData: {
          ...boxData,
          items: boxData.items
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
              src={boxData.image_url} 
              alt={boxData.name} 
              className="w-48 h-48 object-contain mx-auto transform transition-transform duration-300 hover:scale-125"
            />
          </div>

          <div className="mb-6 max-h-[300px] overflow-y-auto p-2">
            <h3 className="text-gray-400 text-lg mb-4">{t('boxPopup.possibleRewards')}:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {boxData.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-[#2a2a2a] p-2 rounded-lg`}
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
          {/* abrir caja */}
          <button
            onClick={handleOpenBox}
            className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
              user ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-gray-600 cursor-not-allowed text-gray-300'
            }`}
            disabled={!user}
          >
            {user ? `${t('boxPopup.openFor')} ${boxData.price}€` : t('boxPopup.loginToOpen')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxPopup;