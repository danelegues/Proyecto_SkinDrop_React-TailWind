import React from 'react';
import InventoryHeader from './components/InventoryHeader';
import InventoryGrid from './components/InventoryGrid';
import useInventoryFilter from './hooks/useInventoryFilter';
import useInventoryActions from './hooks/useInventoryActions';
import './styles/index.css';

const Inventory = () => {
  const initialItems = [
    {
      id: 1,
      name: "AK-47 | Asiimov",
      wear: "Factory New",
      price: 150.50,
      image: "",
      status: "available"
    },
    {
      id: 2,
      name: "M4A4 | Neo-Noir",
      wear: "Minimal Wear",
      price: 89.99,
      image: "",
      status: "available"
    },
    {
      id: 3,
      name: "AWP | Dragon Lore",
      wear: "Field-Tested",
      price: 1500.00,
      image: "",
      status: "on_sale"
    }
  ];
  
  const {
    sortBy,
    setSortBy,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalItems,
    sortedAndFilteredItems,
    ITEMS_PER_PAGE
  } = useInventoryFilter(initialItems);

  const {
    selectedItem,
    isSellingModalOpen,
    handleSellItem,
    handleCancelSell,
    handleConfirmSell
  } = useInventoryActions();

  return (
    <div className="container mx-auto px-4 py-8">
      <InventoryHeader 
        totalItems={totalItems}
        onSort={(e) => setSortBy(e.target.value)}
        onFilter={() => {/* lógica de filtros */}}
      />
      <InventoryGrid items={sortedAndFilteredItems} />
    </div>
  );
};

export default Inventory; 