import React from 'react';
import { useTranslation } from 'react-i18next';
import InventoryItem from '../InventoryItem';

const InventoryGrid = ({ items = [] }) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400 text-lg">{t('inventory.grid.noItems')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryGrid;
