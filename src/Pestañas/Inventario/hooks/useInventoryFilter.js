import { useState, useMemo } from 'react';

const useInventoryFilter = (initialItems) => {
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    wear: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    status: 'all'
  });
  const ITEMS_PER_PAGE = 21

  const sortedAndFilteredItems = useMemo(() => {
    let result = [...initialItems];

    // Aplicar filtros
    if (filters.wear) {
      result = result.filter(item => item.wear === filters.wear);
    }
    if (filters.minPrice) {
      result = result.filter(item => item.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(item => item.price <= Number(filters.maxPrice));
    }
    if (filters.search) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }

    // Aplicar ordenamiento
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [initialItems, sortBy, filters]);

  return {
    sortBy,
    setSortBy,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalItems: sortedAndFilteredItems.length,
    sortedAndFilteredItems,
    ITEMS_PER_PAGE
  };
};

export default useInventoryFilter;
