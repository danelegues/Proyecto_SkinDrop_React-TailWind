import React from 'react';
import { useTranslation } from 'react-i18next';

const FiltersModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  const handleReset = () => {
    onApplyFilters({
      search: '',
      type: [],
      sortBy: ''
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
            <label className="block text-white mb-2">{t('inventory.filters.type')}</label>
            <select 
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
              value={filters.type}
              onChange={(e) => onApplyFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">{t('inventory.filters.allTypes')}</option>
              <option value="knife">{t('inventory.filters.knives')}</option>
              <option value="rifle">{t('inventory.filters.rifles')}</option>
              <option value="pistol">{t('inventory.filters.pistols')}</option>
              <option value="gloves">{t('inventory.filters.gloves')}</option>
            </select>
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