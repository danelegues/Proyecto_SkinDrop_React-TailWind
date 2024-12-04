import { useState, useMemo } from 'react'
import { SKINS } from '../constants/skins'

export function useSkinsFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 21

  // Función auxiliar para convertir precio a número
  const convertPrice = (priceStr) => {
    // Eliminar el símbolo € y convertir M a millones
    const cleanPrice = priceStr.replace('€', '').trim();
    if (cleanPrice.includes('M')) {
      return parseFloat(cleanPrice.replace('M', '')) * 1000000;
    }
    return parseFloat(cleanPrice);
  };

  const filteredSkins = useMemo(() => {
    let result = [...SKINS];

    if (searchQuery) {
      result = result.filter(skin => 
        skin.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter(skin => skin.type === typeFilter);
    }

    if (rarityFilter !== 'all') {
      result = result.filter(skin => skin.rarity === rarityFilter);
    }

    // Filtrar por rango de precio
    result = result.filter(skin => {
      const price = convertPrice(skin.price);
      return price >= minPrice && price <= (maxPrice || Infinity);
    });

    // Ordenar por precio
    if (sortByPrice) {
      result.sort((a, b) => {
        const priceA = convertPrice(a.price);
        const priceB = convertPrice(b.price);
        return priceA - priceB; // Orden ascendente
      });
    }

    return result;
  }, [searchQuery, sortByPrice, typeFilter, rarityFilter, minPrice, maxPrice]);

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
    setCurrentPage,
    totalPages: filteredSkins.length,
    filteredSkins
  }
}
