import React, { useState, useCallback } from 'react';
import InventoryGrid from './components/InventoryGrid';
import FiltersModal from './components/FiltersModal';
import SellModal from './components/SellModal';
import { useInventoryFilter } from './hooks/useInventoryFilter';
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
    totalItems,
    setItems
  } = useInventoryFilter();

  const handleSort = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    });
  };

  const handleSellClick = (item) => {
    setSelectedItem(item);
    setIsSellModalOpen(true);
  };

  const handleStatusChange = useCallback((itemId, newStatus) => {
    console.log('Updating status for item:', itemId, 'to:', newStatus);
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus }
          : item
      )
    );
  }, [setItems]);

  if (loading) return <div className="text-center py-10 text-white">Cargando inventario...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{t('inventory.title')}</h1>
          <p className="text-gray-400 text-lg">
            {t('inventory.totalItems')} {totalItems}
          </p>
        </div>
        <br />
        <div className="flex gap-3">
          
          <select 
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg min-w-[200px]"
            onChange={handleSort}
          >
            <option value="">{t('inventory.sort.default')}</option>
            <option value="price_asc">{t('inventory.sort.priceAsc')}</option>
            <option value="price_desc">{t('inventory.sort.priceDesc')}</option>
            <option value="name">{t('inventory.sort.name')}</option>
            <option value="wear">{t('inventory.sort.wear')}</option>
          </select>
          <button 
            onClick={() => setIsFiltersModalOpen(true)}
            className="bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg transition-all hover:scale-105 text-lg font-medium min-w-[120px]"
          >
            {t('inventory.filters.title')}
          </button>

          <input
            type="text"
            placeholder={t('inventory.search.placeholder')}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg flex-1"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      <InventoryGrid 
        items={items}
        onSellClick={handleSellClick}
        onStatusChange={handleStatusChange}
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