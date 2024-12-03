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
      image: "/img/m4a4.png",
      status: "available"
    },
    {
      id: 2,
      name: "M4A4 | Neo-Noir",
      wear: "Minimal Wear",
      price: 89.99,
      image: "/img/m4a4.png",
      status: "available"
    },
    {
      id: 3,
      name: "AWP | Dragon Lore",
      wear: "Field-Tested",
      price: 1500.00,
      image: "/img/deagle.png",
      status: "on_sale"
    },
    {
      id: 4,
      name: "Desert Eagle | Blaze",
      wear: "Factory New",
      price: 420.69,
      image: "/img/deagle.png",
      status: "available"
    },
    {
      id: 5,
      name: "Karambit | Fade",
      wear: "Factory New",
      price: 1200.00,
      image: "/img/glock.png",
      status: "locked"
    },
    {
      id: 6,
      name: "Glock-18 | Fade",
      wear: "Minimal Wear",
      price: 890.00,
      image: "/img/glock.png",
      status: "available"
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-8">
        <InventoryHeader 
          totalItems={totalItems}
          onSort={(e) => setSortBy(e.target.value)}
          onFilter={() => {/* lógica de filtros */}}
        />
        <InventoryGrid items={sortedAndFilteredItems} />
      </div>
    </div>
  );
};

export default Inventory; 