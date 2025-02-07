import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { marketService } from '../../hooks/marketService';
import ProductGrid from '../ProductGrid';
import SearchBar from '../SearchBar';
import Pagination from '../Pagination';

function SkinDropMarket() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByPrice, setSortByPrice] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const ITEMS_PER_PAGE = 14;
    const { t } = useTranslation();

    useEffect(() => {
        loadMarketItems();
    }, []);

    const loadMarketItems = async () => {
        try {
            setLoading(true);
            const response = await marketService.getMarketItems();
            console.log('Respuesta de items:', response);
            
            if (response.success && Array.isArray(response.data)) {
                setItems(response.data);
            } else {
                throw new Error('Formato de respuesta inválido');
            }
        } catch (error) {
            console.error('Error al cargar items:', error);
            setError(t('store.errors.loadFailed'));
        } finally {
            setLoading(false);
        }
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
            <ProductGrid skins={paginatedItems} />
            <div className="mt-8">
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={totalItems}
                />
            </div>
        </div>
    );
}

export default SkinDropMarket;
