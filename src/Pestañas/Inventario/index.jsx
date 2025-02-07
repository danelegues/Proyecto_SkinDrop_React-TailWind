import React, { useState, useCallback, useEffect } from 'react';
import InventoryGrid from './components/InventoryGrid';
import { useInventoryFilter } from './hooks/useInventoryFilter';
import { useTranslation } from 'react-i18next';

const Inventario = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { t } = useTranslation();
  const {
    items,
    loading,
    error,
    setItems
  } = useInventoryFilter();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleStatusChange = useCallback((itemId, newStatus) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus }
          : item
      )
    );
  }, [setItems]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...items];

    // Filtro de búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(query) || 
        item.item?.name?.toLowerCase().includes(query)
      );
    }

    // Filtro por tipo usando category
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => {
        const category = item.category || item.item?.category;
        return category?.toLowerCase() === typeFilter.toLowerCase();
      });
    }

    // Ordenar por precio
    if (sortByPrice) {
      filtered.sort((a, b) => {
        const priceA = Number(a.price || a.item?.price || 0);
        const priceB = Number(b.price || b.item?.price || 0);
        return sortByPrice === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [items, searchQuery, typeFilter, sortByPrice]);

  if (loading) return <div className="text-center py-10 text-white">{t('common.loading')}</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{t('inventory.title')}</h1>
          <p className="text-gray-400 text-lg">
            {t('inventory.totalItems')} {filteredItems.length}
          </p>
        </div>
        <br />
        <div className="flex flex-wrap gap-3">
          <select 
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg"
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <option value="">{t('inventory.sort.default')}</option>
            <option value="asc">{t('inventory.sort.priceAsc')}</option>
            <option value="desc">{t('inventory.sort.priceDesc')}</option>
          </select>

          <select 
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t('inventory.filters.allTypes')}</option>
            <option value="knife">{t('inventory.filters.knives')}</option>
            <option value="rifle">{t('inventory.filters.rifles')}</option>
            <option value="pistol">{t('inventory.filters.pistols')}</option>
            <option value="gloves">{t('inventory.filters.gloves')}</option>
          </select>

          <input
            type="text"
            placeholder={t('inventory.search.placeholder')}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#ff6b00] transition-all focus:outline-none focus:border-[#ff6b00] text-lg flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <InventoryGrid 
        items={filteredItems}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Inventario;