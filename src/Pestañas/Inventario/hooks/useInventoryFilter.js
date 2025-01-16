import { useState, useMemo, useEffect } from 'react';
import { inventoryService } from './inventoryService';

export const useInventoryFilter = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        minPrice: '',
        maxPrice: '',
        wear: [],
        type: [],
        sortBy: ''
    });

    // Realizamos una única llamada al montar el componente
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await inventoryService.getInventory();
                if (response?.data && Array.isArray(response.data)) {
                    const transformedItems = response.data.map(item => ({
                        id: item.id || '',
                        name: item.name || '',
                        wear: item.wear || 'Factory New',
                        price: item.price || 0,
                        image: item.image_url || '',
                        status: item.status || 'available',
                        category: item.category || 'rifle'
                    }));
                    setItems(transformedItems);
                } else {
                    console.warn('La respuesta no contiene un array de items:', response);
                    setItems([]);
                }
            } catch (err) {
                console.error('Error fetching inventory:', err);
                setError(err.message);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []); // Solo se ejecuta al montar el componente

    const sortedAndFilteredItems = useMemo(() => {
        let filteredItems = items.filter(item => {
            if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            if (filters.minPrice && item.price < Number(filters.minPrice)) {
                return false;
            }
            if (filters.maxPrice && item.price > Number(filters.maxPrice)) {
                return false;
            }
            if (filters.wear.length > 0 && !filters.wear.includes(item.wear)) {
                return false;
            }
            if (filters.type.length > 0 && !filters.type.includes(item.category)) {
                return false;
            }
            return true;
        });

        if (filters.sortBy) {
            return [...filteredItems].sort((a, b) => {
                switch (filters.sortBy) {
                    case 'price_asc':
                        return a.price - b.price;
                    case 'price_desc':
                        return b.price - a.price;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'wear':
                        const wearOrder = {
                            'Factory New': 1,
                            'Minimal Wear': 2,
                            'Field-Tested': 3,
                            'Well-Worn': 4,
                            'Battle-Scarred': 5
                        };
                        return wearOrder[a.wear] - wearOrder[b.wear];
                    default:
                        return 0;
                }
            });
        }

        return filteredItems;
    }, [items, filters]);

    return {
        items,
        loading,
        error,
        filters,
        setFilters,
        sortedAndFilteredItems,
        totalItems: items.length
    };
};
