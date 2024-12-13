import React from 'react';
import { useTranslation } from 'react-i18next';

const UserBalance = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <p className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
        {t('balance.title')}
      </p>
      
      <div className="bg-white bg-opacity-5 rounded-lg p-3 sm:p-4">
        <div className="flex items-center mb-3 sm:mb-4">
          <i className="fa-solid fa-euro-sign text-orange-500 text-xl sm:text-2xl mr-2 sm:mr-3 opacity-100"></i>
          <div>
            <span className="text-white text-lg sm:text-xl font-bold block">1.500,00 {t('balance.currency')}</span>
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
