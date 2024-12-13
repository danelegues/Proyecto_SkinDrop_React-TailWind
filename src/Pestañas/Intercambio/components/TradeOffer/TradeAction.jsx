import React from 'react';
import { useTranslation } from 'react-i18next';

const TradeAction = ({ myItems, theirItems, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const myTotal = myItems.reduce((sum, item) => sum + item.price, 0);
  const theirTotal = theirItems.reduce((sum, item) => sum + item.price, 0);
  const difference = myTotal - theirTotal;

  return (
    <div className="border-t border-[#2a2a2a] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-white text-sm sm:text-base">
          <p>{t('trade.values.yourItems')} ${myTotal.toFixed(2)}</p>
          <p>{t('trade.values.theirItems')} ${theirTotal.toFixed(2)}</p>
          <p className={difference > 0 ? 'text-red-500' : 'text-green-500'}>
            {t('trade.values.difference')} ${Math.abs(difference).toFixed(2)}
          </p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={onCancel}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-all"
          >
            {t('trade.tradeOffer.cancel')}
          </button>
          <button
            onClick={onSubmit}
            disabled={myItems.length === 0 || theirItems.length === 0}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#ff8533] transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('trade.tradeOffer.submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeAction;