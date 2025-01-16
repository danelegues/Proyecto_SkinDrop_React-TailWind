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
      const response = await marketService.getMarketItems()
      if (response && Array.isArray(response)) {
        setItems(response)
      } else if (response && Array.isArray(response.data)) {
        setItems(response.data)
      } else {
        console.warn('Formato de respuesta inválido:', response)
        setItems([])
      }
    } catch (error) {
      console.error('Error al cargar items:', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMarketItems()
  }, [fetchMarketItems])

  const convertPrice = useCallback((priceStr) => {
    if (typeof priceStr === 'number') return priceStr
    const cleanPrice = priceStr.replace('€', '').trim()
    if (cleanPrice.includes('M')) {
      return parseFloat(cleanPrice.replace('M', '')) * 1000000
    }
    return parseFloat(cleanPrice)
  }, [])

  const filteredSkins = useMemo(() => {
    let result = [...items]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item => 
        item.item.name.toLowerCase().includes(query)
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter(item => item.item.category === typeFilter)
    }

    if (rarityFilter !== 'all') {
      result = result.filter(item => item.item.rarity === rarityFilter)
    }

    result = result.filter(item => {
      const price = convertPrice(item.price)
      return price >= minPrice && price <= (maxPrice || Infinity)
    })

    if (sortByPrice) {
      result.sort((a, b) => convertPrice(a.price) - convertPrice(b.price))
    }

    return result
  }, [items, searchQuery, sortByPrice, typeFilter, rarityFilter, minPrice, maxPrice, convertPrice])

  const totalItems = filteredSkins.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  
  const paginatedSkins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSkins.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredSkins, currentPage])

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages))
  }, [totalPages])

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
    handlePageChange,
    totalPages,
    paginatedSkins,
    totalItems,
    loading,
    error
  }
}
