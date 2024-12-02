import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import { useSkinsFilter } from './hooks/useSkinsFilter';
import './styles/shop.css';

function Shop() {
  const {
    searchQuery,
    setSearchQuery,
    sortByPrice,
    setSortByPrice,
    typeFilter,
    setTypeFilter,
    rarityFilter,
    setRarityFilter,
    filteredSkins
  } = useSkinsFilter();

  return (
    <div className="w-full min-h-screen bg-[#222]">
      <div className="w-full px-4 pt-20 mx-auto">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortByPrice={sortByPrice}
          onSortToggle={() => setSortByPrice(!sortByPrice)}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          rarityFilter={rarityFilter}
          onRarityChange={setRarityFilter}
        />
        
        <div className="w-full mt-6">
          <ProductGrid skins={filteredSkins} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
