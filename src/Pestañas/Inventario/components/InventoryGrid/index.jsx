import React from 'react';
import { useTranslation } from 'react-i18next';
import InventoryItem from '../InventoryItem';

const InventoryGrid = ({ items = [], onStatusChange }) => {
  const { t } = useTranslation();

  // Verificar que onStatusChange sea una función
  const handleStatusChange = (itemId, status) => {
    if (typeof onStatusChange === 'function') {
      onStatusChange(itemId, status);
    }
  };

  if (!items || items.length === 0) {
    return <div>{t('inventory.grid.noItems')}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map(item => (
        <InventoryItem 
          key={item.id} 
          item={item}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

InventoryGrid.defaultProps = {
  items: [],
  onStatusChange: () => {} // Función vacía por defecto
};

export default InventoryGrid;
