import { useState } from 'react';

const useInventoryActions = () => {
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
      // Aquí iría la lógica para poner el item en venta
      console.log(`Vendiendo item ${selectedItem.id} por $${price}`);
      setIsSellingModalOpen(false);
      setSelectedItem(null);
      return true;
    } catch (error) {
      console.error('Error al vender item:', error);
      return false;
    }
  };

  return {
    selectedItem,
    isSellingModalOpen,
    handleSellItem,
    handleCancelSell,
    handleConfirmSell
  };
};

export default useInventoryActions;
