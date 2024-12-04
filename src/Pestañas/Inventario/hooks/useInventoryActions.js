import { useState } from 'react';

export const useInventoryActions = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSellingModalOpen, setIsSellingModalOpen] = useState(false);

  const handleSellItem = (item) => {
    setSelectedItem(item);
    setIsSellingModalOpen(true);
  };

  const handleCancelSell = () => {
    setSelectedItem(null);
    setIsSellingModalOpen(false);
  };

  const handleConfirmSell = async (price) => {
    try {
      console.log(`Vendiendo item ${selectedItem.id} por $${price}`);
      setIsSellingModalOpen(false);
      setSelectedItem(null);
      return true;
    } catch (error) {
      console.error('Error al vender item:', error);
      return false;
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    console.log('Ordenando por:', sortValue);
  };

  return {
    selectedItem,
    isSellingModalOpen,
    handleSellItem,
    handleCancelSell,
    handleConfirmSell,
    handleSort
  };
};
