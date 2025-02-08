import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { skinDropMarketService } from '../../hooks/skinDropMarketService';
import ProductGrid from '../ProductGrid';
import SearchBar from '../SearchBar';
import Pagination from '../Pagination';
import BuyModal from '../BuyModal';
import SkinDropBuyModal from '../SkinDropBuyModal';

function SkinDropMarket({ onItemClick }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByPrice, setSortByPrice] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const ITEMS_PER_PAGE = 14;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadItems = async () => {
        try {
            setLoading(true);
            const response = await skinDropMarketService.getItems();
            if (response.success) {
                setItems(response.data);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleItemClick = (item) => {
        console.log('Seleccionando item de SkinDrop Market:', item);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const filteredItems = React.useMemo(() => {
        let result = [...items];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                item.name?.toLowerCase().includes(query)
            );
        }

        if (typeFilter !== 'all') {
            result = result.filter(item => item.category === typeFilter);
        }

        if (sortByPrice) {
            result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }

        return result;
    }, [items, searchQuery, sortByPrice, typeFilter]);

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handlePurchaseSuccess = async () => {
        console.log('Compra exitosa en SkinDrop Market');
        await loadItems();
        window.location.reload();
    };

    if (loading) return <div className="text-white text-center p-8">{t('common.loading')}</div>;
    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

    return (
        <div className="bg-[#131313] rounded-lg p-3 sm:p-4 lg:p-6 transition-all duration-300">
            <div className="mb-4 sm:mb-6">
                <SearchBar 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortByPrice={sortByPrice}
                    onSortToggle={() => setSortByPrice(!sortByPrice)}
                    typeFilter={typeFilter}
                    onTypeChange={setTypeFilter}
                />
            </div>
            <ProductGrid 
                skins={paginatedItems} 
                onItemClick={handleItemClick}
                onRefresh={loadItems}
                isSkinDrop={true}
            />
            <div className="mt-8">
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalItems}
                />
            </div>

            <SkinDropBuyModal 
                isOpen={isModalOpen}
                onClose={handleModalClose}
                item={selectedItem}
                onSuccess={handlePurchaseSuccess}
            />

           
        </div>
    );
}

export default SkinDropMarket;