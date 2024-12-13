import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FilterPanel = () => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'rifles', name: t('store.categories.rifles'), count: 45 },
    { id: 'knives', name: t('store.categories.knives'), count: 32 },
    { id: 'pistols', name: t('store.categories.pistols'), count: 28 }
  ];

  return (
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <h3 className="text-white text-lg sm:text-xl mb-4 sm:mb-6">
        {t('filters.title')}
      </h3>

      <div className="mb-6">
        <label className="text-gray-400 text-sm block mb-2">
          {t('filters.priceRange')}
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="number"
            placeholder={t('filters.min')}
            className="w-20 bg-white bg-opacity-5 text-white rounded px-2 py-1 text-sm"
            min="0"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder={t('filters.max')}
            className="w-20 bg-white bg-opacity-5 text-white rounded px-2 py-1 text-sm"
            min="0"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-colors">
          {t('filters.apply')}
        </button>
        <button className="w-full bg-white bg-opacity-5 hover:bg-opacity-10 text-gray-300 py-2 rounded transition-colors">
          {t('filters.clear')}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel; 