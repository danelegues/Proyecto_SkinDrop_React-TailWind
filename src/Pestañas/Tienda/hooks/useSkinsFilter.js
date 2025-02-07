import { useState, useMemo, useCallback, useEffect } from 'react'
import { marketService } from './marketService'

export function useSkinsFilter() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 14

  const fetchMarketItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await marketService.getMarketItems();
      if (response && response.success && Array.isArray(response.data)) {
        setItems(response.data);
      }
    } catch (error) {
      console.error('Error al cargar items:', error);
      setError(error.toString());
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketItems();
  }, [fetchMarketItems]);

  const filteredSkins = useMemo(() => {
    console.log('Items en filteredSkins:', items) // Debug log
    let result = [...items]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item => 
        item.name?.toLowerCase().includes(query)
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter(item => item.category === typeFilter)
    }

    if (rarityFilter !== 'all') {
      result = result.filter(item => item.rarity === rarityFilter)
    }

    if (minPrice || maxPrice) {
      result = result.filter(item => {
        const price = parseFloat(item.price)
        return price >= minPrice && price <= (maxPrice || Infinity)
      })
    }

    if (sortByPrice) {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    }

    console.log('Resultado filtrado:', result) // Debug log
    return result
  }, [items, searchQuery, sortByPrice, typeFilter, rarityFilter, minPrice, maxPrice])

  const totalItems = filteredSkins.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  
  const paginatedSkins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const result = filteredSkins.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    console.log('Items paginados:', result) // Debug log
    return result
  }, [filteredSkins, currentPage])

  const refreshItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketService.getMarketItems();
      
      if (response.success) {
        setItems(response.data);
        // Resetear a la primera página después de una compra
        setCurrentPage(1);
      } else {
        throw new Error(response.message || 'Error al cargar los items');
      }
    } catch (error) {
      console.error('Error al refrescar items:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar items inicialmente
  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  return {
    searchQuery,
    setSearchQuery,
    sortByPrice,
    setSortByPrice,
    typeFilter,
    setTypeFilter,
    rarityFilter,
    setRarityFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    currentPage,
    handlePageChange: (newPage) => setCurrentPage(Math.min(Math.max(1, newPage), totalPages)),
    totalPages,
    paginatedSkins,
    totalItems,
    loading,
    error,
    refreshItems
  }
}
