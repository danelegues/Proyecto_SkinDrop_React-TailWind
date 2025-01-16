import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Auth/AuthContext';

const UserBalance = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [amount, setAmount] = useState('');

  // Opciones predefinidas de cantidades
  const predefinedAmounts = [10, 25, 50, 100, 200, 500];

  useEffect(() => {
    if (user) {
      fetchBalance();
    } else {
      setBalance(0);
    }
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
      setBalance(0);
    }
  };

  const handleAddFunds = async () => {
    try {
      const amountToAdd = parseFloat(amount);
      if (isNaN(amountToAdd) || amountToAdd <= 0) {
        alert(t('balance.errors.invalidAmount'));
        return;
      }

      const response = await axios.put(
        'http://10.14.4.197:8000/api/profile/balance',
        { amount: amountToAdd },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        }
      );

      setBalance(response.data.balance);
      setShowAddFundsModal(false);
      setAmount('');
      alert(t('balance.success'));
    } catch (error) {
      console.error('Error adding funds:', error);
      alert(t('balance.errors.updateError'));
    }
  };

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (error) {
    return <div className="text-red-500">{t('balance.errors.updateError')}</div>;
  }

  return (
    <>
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
            onClick={() => setShowAddFundsModal(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 sm:px-4 rounded text-sm sm:text-base flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-plus mr-2 opacity-100"></i>
            {t('balance.addFunds')}
          </button>
        </div>
      </div>

      {/* Modal para añadir fondos */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-white text-xl font-bold mb-4">{t('balance.modal.title')}</h2>
            
            {/* Cantidades predefinidas */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {predefinedAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className={`p-2 rounded ${
                    amount === preset.toString()
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {preset}€
                </button>
              ))}
            </div>

            {/* Input personalizado */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('balance.modal.amount')}
              className="w-full bg-gray-700 text-white p-2 rounded mb-4"
              min="0"
              step="0.01"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddFundsModal(false);
                  setAmount('');
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddFunds}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {t('balance.modal.submit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserBalance;