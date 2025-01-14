import React, { useState } from 'react';
import InventoryHeader from './components/InventoryHeader';
import InventoryGrid from './components/InventoryGrid';
import FiltersModal from './components/FiltersModal';
import SellModal from './components/SellModal';
import { useInventoryFilter } from './hooks/useInventoryFilter';
import { useInventoryActions } from './hooks/useInventoryActions';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Inventario = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { t } = useTranslation();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const {
    items,
    loading,
    error,
    filters,
    setFilters,
    sortedAndFilteredItems,
    totalItems
  } = useInventoryFilter();

  const { handleSort } = useInventoryActions();

  const handleSellClick = (item) => {
    setSelectedItem(item);
    setIsSellModalOpen(true);
  };

  if (loading) return <div className="text-center py-10 text-white">Cargando inventario...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
      <div className="flex flex-col gap-2 mb-8">
        <InventoryHeader 
          totalItems={totalItems}
          onSort={handleSort}
          onFilter={() => setIsFiltersModalOpen(true)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="bg-[#FF6B00] text-white px-4 py-2 rounded hover:bg-[#ff8533] transition-colors">
          {t('inventory.search.sortByPrice')}
        </button>
        <input
          type="text"
          placeholder={t('inventory.search.placeholder')}
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded flex-grow"
        />
        <select className="bg-[#2a2a2a] text-white px-4 py-2 rounded">
          <option value="all">{t('inventory.filters.allTypes')}</option>
          <option value="rifles">{t('inventory.filters.rifles')}</option>
          <option value="pistols">{t('inventory.filters.pistols')}</option>
          <option value="knives">{t('inventory.filters.knives')}</option>
        </select>
        <select className="bg-[#2a2a2a] text-white px-4 py-2 rounded">
          <option value="all">{t('inventory.filters.allRarities')}</option>
          <option value="consumer">{t('inventory.filters.consumer')}</option>
          <option value="industrial">{t('inventory.filters.industrial')}</option>
          <option value="milspec">{t('inventory.filters.milSpec')}</option>
          <option value="restricted">{t('inventory.filters.restricted')}</option>
          <option value="classified">{t('inventory.filters.classified')}</option>
          <option value="covert">{t('inventory.filters.covert')}</option>
        </select>
      </div>

      <InventoryGrid 
        items={sortedAndFilteredItems}
        onSellClick={handleSellClick}
      />

      <FiltersModal 
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <SellModal 
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};

export default Inventario;