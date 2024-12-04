import React, { useState } from 'react';
import InventoryHeader from './components/InventoryHeader';
import InventoryGrid from './components/InventoryGrid';
import FiltersModal from './components/FiltersModal';
import SellModal from './components/SellModal';
import useInventoryFilter from './hooks/useInventoryFilter';
import { INVENTORY_ITEMS } from './constants/inventory';

const Inventory = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    filters,
    setFilters,
    setSortBy,
    totalItems,
    sortedAndFilteredItems
  } = useInventoryFilter(INVENTORY_ITEMS);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleSellClick = (item) => {
    setSelectedItem(item);
    setIsSellModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <InventoryHeader 
        totalItems={totalItems}
        onSort={handleSort}
        onFilter={() => setIsFiltersModalOpen(true)}
      />
      
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

export default Inventory; 