import React from 'react';
import { useTranslation } from 'react-i18next';

const InventoryHeader = ({ totalItems, onSort, onFilter }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{t('inventory.title')}</h1>
        <p className="text-gray-400 text-lg">
          {t('inventory.totalItems')} {totalItems}
        </p>
      </div>
      <div className="flex gap-3">
        <select 
          className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg min-w-[200px]"
          onChange={onSort}
        >
          <option value="">{t('inventory.sort.default')}</option>
          <option value="price_asc">{t('inventory.sort.priceAsc')}</option>
          <option value="price_desc">{t('inventory.sort.priceDesc')}</option>
          <option value="name">{t('inventory.sort.name')}</option>
          <option value="wear">{t('inventory.sort.wear')}</option>
        </select>
        <button 
          onClick={onFilter}
          className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg transition-all hover:scale-105 text-lg font-medium min-w-[120px]"
        >
          {t('inventory.filters.title')}
        </button>
      </div>
    </div>
  );
};

export default InventoryHeader;
