import React from 'react';
import { useTranslation } from 'react-i18next';

function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onSortToggle, 
  sortByPrice,
  typeFilter,
  onTypeChange,
  rarityFilter,
  onRarityChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 p-2 sm:p-4 bg-[#1a1a1a] rounded-lg transition-all duration-300">
      <div className="flex flex-wrap gap-2">
        <button 
          className={`flex-shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg transition-colors ${
            sortByPrice ? 'bg-[#2a2a2a]' : 'bg-[#ff6b00]'
          } text-white text-sm sm:text-base whitespace-nowrap`}
          onClick={onSortToggle}
        >
          {t('store.search.sortByPrice')}
        </button>

        <input
          type="text"
          placeholder={t('store.search.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-[200px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        />

        <select 
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="flex-shrink-0 min-w-[150px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <option value="all">{t('store.search.filters.allTypes')}</option>
          <option value="rifle">{t('store.search.filters.rifles')}</option>
          <option value="pistol">{t('store.search.filters.pistols')}</option>
          <option value="knife">{t('store.search.filters.knives')}</option>
        </select>

        <select 
          value={rarityFilter}
          onChange={(e) => onRarityChange(e.target.value)}
          className="flex-shrink-0 min-w-[150px] bg-[#2a2a2a] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <option value="all">{t('store.search.filters.allRarities')}</option>
          <option value="Consumer">{t('store.search.filters.consumer')}</option>
          <option value="Industrial">{t('store.search.filters.industrial')}</option>
          <option value="Mil-Spec">{t('store.search.filters.milSpec')}</option>
          <option value="Restricted">{t('store.search.filters.restricted')}</option>
          <option value="Classified">{t('store.search.filters.classified')}</option>
          <option value="Covert">{t('store.search.filters.covert')}</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
