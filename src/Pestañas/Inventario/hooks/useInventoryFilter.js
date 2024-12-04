import { useState, useMemo } from 'react';
import { INVENTORY_ITEMS } from '../constants/inventory';

export const useInventoryFilter = () => {
  const [items] = useState(INVENTORY_ITEMS);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    wear: [],
    type: []
  });

  const sortedAndFilteredItems = useMemo(() => {
    return items.filter(item => {
      return true; // Por ahora retornamos todos los items
    });
  }, [items, filters]);

  return {
    items,
    filters,
    setFilters,
    sortedAndFilteredItems,
    totalItems: items.length
  };
};

