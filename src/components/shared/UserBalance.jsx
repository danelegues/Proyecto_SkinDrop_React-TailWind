import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Auth/AuthContext';

const UserBalance = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBalance();
  }, [user]);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://10.14.4.197:8000/api/profile', {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      setBalance(response.data.user.balance);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching balance:', error);
    }
  };

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (error) {
    return <div className="text-red-500">{t('balance.error')}</div>;
  }

  return (
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <p className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
        {t('balance.title')}
      </p>
      
      <div className="bg-white bg-opacity-5 rounded-lg p-3 sm:p-4">
        <div className="flex items-center mb-3 sm:mb-4">
          
          <div>
            <span className="text-white text-lg sm:text-xl font-bold block">
              {formatBalance(balance)} <i className="fa-solid fa-euro-sign text-orange-500 text-xl sm:text-2xl mr-2 sm:mr-3 opacity-100"></i>
            </span>
          </div>
        </div>

        <button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 sm:px-4 rounded text-sm sm:text-base flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-plus mr-2 opacity-100"></i>
          {t('balance.addFunds')}
        </button>
      </div>
    </div>
  );
};

export default UserBalance;
