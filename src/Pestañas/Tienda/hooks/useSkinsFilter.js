import { useState, useMemo, useCallback } from 'react'
import { SKINS } from '../constants/skins'

export function useSkinsFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 14

  const convertPrice = useCallback((priceStr) => {
    const cleanPrice = priceStr.replace('€', '').trim()
    if (cleanPrice.includes('M')) {
      return parseFloat(cleanPrice.replace('M', '')) * 1000000
    }
    return parseFloat(cleanPrice)
  }, [])

  const filteredSkins = useMemo(() => {
    let result = [...SKINS]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(skin => 
        skin.name.toLowerCase().includes(query)
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter(skin => skin.type === typeFilter)
    }

    if (rarityFilter !== 'all') {
      result = result.filter(skin => skin.rarity === rarityFilter)
    }

    result = result.filter(skin => {
      const price = convertPrice(skin.price)
      return price >= minPrice && price <= (maxPrice || Infinity)
    })

    if (sortByPrice) {
      result.sort((a, b) => convertPrice(a.price) - convertPrice(b.price))
    }

    return result
  }, [searchQuery, sortByPrice, typeFilter, rarityFilter, minPrice, maxPrice, convertPrice])

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
    totalItems
  }
}
