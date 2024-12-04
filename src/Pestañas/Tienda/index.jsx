import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import { useSkinsFilter } from './hooks/useSkinsFilter';
import './styles/shop.css';
import Pagination from './components/Pagination';
import ShopNav from './components/ShopNav';
import { useShopNavigation } from './hooks/useShopNavigation';
import YourSales from './components/YourSales';

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
    currentPage,
    setCurrentPage,
    totalPages,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredSkins
  } = useSkinsFilter();

  const { currentTab, setCurrentTab } = useShopNavigation();

  return (
    <div className="w-full min-h-screen bg-[#222]">
      <div className="w-full max-w-[1600px] mx-auto px-12 pt-20">
        <ShopNav currentTab={currentTab} onTabChange={setCurrentTab} />
        
        {currentTab === 'market' && (
          <>
            <div className="mt-12">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortByPrice={sortByPrice}
                onSortToggle={() => setSortByPrice(!sortByPrice)}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                rarityFilter={rarityFilter}
                onRarityChange={setRarityFilter}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
              />
            </div>
            <div className="mt-8">
              <ProductGrid skins={filteredSkins} />
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        {currentTab === 'sales' && <YourSales />}
        
        {/* Implementar vista de SkinDrop cuando sea necesario */}
        {currentTab === 'skindrop' && (
          <div className="mt-12 text-white">
            Contenido de SkinDrop (por implementar)
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
