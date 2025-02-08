import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import { useSkinsFilter } from './hooks/useSkinsFilter';
import './styles/shop.css';
import Pagination from './components/Pagination';
import ShopNav from './components/ShopNav';
import { useShopNavigation } from './hooks/useShopNavigation';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SkinDropMarket from './components/SkinDropMarket';
import BuyModal from './components/BuyModal';
import SkinDropBuyModal from './components/SkinDropBuyModal';

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
    totalItems,
    loading,
    error,
    refreshItems
  } = useSkinsFilter();

  const { currentTab, setCurrentTab } = useShopNavigation();
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handlePurchaseSuccess = async () => {
    try {
      await refreshItems();
      window.location.reload();
    } catch (error) {
      console.error('Error al refrescar items:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#222]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-36">
        <ShopNav currentTab={currentTab} onTabChange={setCurrentTab} />
        
        {currentTab === 'market' && (
          <div className="bg-[#131313] rounded-lg p-3 sm:p-4 lg:p-6 mt-8 mb-12 transition-all duration-300">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">
                {error}
              </div>
            ) : (
              <>
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
                  <ProductGrid 
                    skins={paginatedSkins} 
                    onItemClick={handleItemClick}
                    isSkinDrop={false}
                  />
                  <div className="mt-8">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={totalItems}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Modal para Market */}
            <BuyModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              item={selectedItem}
              onSuccess={handlePurchaseSuccess}
              isSkinDrop={false}
            />
          </div>
        )}
        
        {currentTab === 'skindrop' && (
          <div className="mt-12 mb-12 text-white">
            <SkinDropMarket 
              onItemClick={handleItemClick}
              isSkinDrop={true}
            />
            {/* Modal para SkinDrop */}
            <BuyModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              item={selectedItem}
              onSuccess={handlePurchaseSuccess}
              isSkinDrop={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;