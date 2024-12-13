import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import { useSkinsFilter } from './hooks/useSkinsFilter';
import './styles/shop.css';
import Pagination from './components/Pagination';
import ShopNav from './components/ShopNav';
import { useShopNavigation } from './hooks/useShopNavigation';
import YourSales from './components/YourSales';
import { useTranslation } from 'react-i18next';

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
    handlePageChange,
    totalPages,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    paginatedSkins,
    totalItems
  } = useSkinsFilter();

  const { currentTab, setCurrentTab } = useShopNavigation();
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-[#222]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-36">
        <ShopNav currentTab={currentTab} onTabChange={setCurrentTab} />
        
        {currentTab === 'market' && (
          <div className="bg-[#131313] rounded-lg p-3 sm:p-4 lg:p-6 mt-8 mb-12 transition-all duration-300">
            <div className="mb-4 sm:mb-6">
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
            <div>
              <ProductGrid skins={paginatedSkins} />
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                />
              </div>
            </div>
          </div>
        )}

        {currentTab === 'sales' && (
          <div className="mb-12">
            <YourSales />
          </div>
        )}
        
        {currentTab === 'skindrop' && (
          <div className="mt-12 mb-12 text-white">
            Contenido de SkinDrop (por implementar)
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
