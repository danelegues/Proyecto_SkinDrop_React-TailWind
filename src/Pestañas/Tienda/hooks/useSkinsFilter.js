import { useState, useMemo } from 'react'

export function useSkinsFilter(skins) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('price')

  const filteredSkins = useMemo(() => {
    return skins
      .filter(skin => 
        skin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a[sortBy] - b[sortBy])
  }, [skins, searchTerm, sortBy])

  return {
    filteredSkins,
    setSearchTerm,
    setSortBy
  }
}
