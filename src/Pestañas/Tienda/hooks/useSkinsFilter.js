import { useState, useMemo } from 'react'
import { SKINS } from '../constants/skins'

export function useSkinsFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')

  const filteredSkins = useMemo(() => {
    let result = [...SKINS]

    if (searchQuery) {
      result = result.filter(skin => 
        skin.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter(skin => skin.type === typeFilter)
    }

    if (rarityFilter !== 'all') {
      result = result.filter(skin => skin.rarity === rarityFilter)
    }

    if (sortByPrice) {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('M', '000000').replace(',', '.'))
        const priceB = parseFloat(b.price.replace('M', '000000').replace(',', '.'))
        return priceA - priceB
      })
    }

    return result
  }, [searchQuery, sortByPrice, typeFilter, rarityFilter])

  return {
    searchQuery,
    setSearchQuery,
    sortByPrice,
    setSortByPrice,
    typeFilter,
    setTypeFilter,
    rarityFilter,
    setRarityFilter,
    filteredSkins
  }
}
