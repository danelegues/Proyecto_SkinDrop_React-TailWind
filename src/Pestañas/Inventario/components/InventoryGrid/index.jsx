import React from 'react';
import InventoryItem from '../InventoryItem';

const InventoryGrid = ({ items = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryGrid;
