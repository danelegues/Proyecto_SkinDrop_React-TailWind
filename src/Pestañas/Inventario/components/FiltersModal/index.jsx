import React from 'react';
import { useTranslation } from 'react-i18next';

const FiltersModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  const handleReset = () => {
    onApplyFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      wear: [],
      type: [],
      sortBy: '',
      status: 'all'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">{t('inventory.filters.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">{t('inventory.filters.wear')}</label>
            <select 
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
              value={filters.wear}
              onChange={(e) => onApplyFilters({ ...filters, wear: e.target.value })}
            >
              <option value="">{t('inventory.filters.allWears')}</option>
              <option value="Factory New">{t('inventory.filters.factoryNew')}</option>
              <option value="Minimal Wear">{t('inventory.filters.minimalWear')}</option>
              <option value="Field-Tested">{t('inventory.filters.fieldTested')}</option>
              <option value="Well-Worn">{t('inventory.filters.wellWorn')}</option>
              <option value="Battle-Scarred">{t('inventory.filters.battleScarred')}</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">{t('inventory.filters.status')}</label>
            <select 
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
              value={filters.status}
              onChange={(e) => onApplyFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">{t('inventory.filters.allStatuses')}</option>
              <option value="available">{t('inventory.filters.available')}</option>
              <option value="on_sale">{t('inventory.filters.onSale')}</option>
              <option value="locked">{t('inventory.filters.locked')}</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">{t('inventory.filters.priceRange')}</label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder={t('inventory.filters.min')}
                className="w-1/2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
                value={filters.minPrice}
                onChange={(e) => onApplyFilters({ ...filters, minPrice: e.target.value })}
              />
              <input
                type="number"
                placeholder={t('inventory.filters.max')}
                className="w-1/2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
                value={filters.maxPrice}
                onChange={(e) => onApplyFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            {t('inventory.filters.reset')}
          </button>
          <button
            onClick={onClose}
            className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533]"
          >
            {t('inventory.filters.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;