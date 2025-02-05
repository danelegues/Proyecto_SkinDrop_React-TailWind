import { useState, useEffect, useCallback, useMemo } from 'react';
import { inventoryService } from '../services/inventoryService';

export const useInventoryFilter = () => {
    const [items, setItems] = useState([]);
    const [filteredSkins, setFilteredSkins] = useState([]);
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

    // Función para cargar los items
    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            const response = await inventoryService.getInventory();
            console.log('Datos recibidos del inventario:', response.data);
            // Log detallado de cada item
            response.data.forEach((item, index) => {
                console.log(`Item ${index + 1}:`, {
                    id: item.id,
                    name: item.name,
                    image_url: item.image_url,
                    status: item.status,
                    // ... otros campos
                });
            });
            setItems(response.data);
            setFilteredSkins(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Error loading inventory:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar items al montar el componente
    useEffect(() => {
        loadItems();
    }, [loadItems]);

    // Función para actualizar el estado de un item específico
    const updateItemStatus = useCallback((itemId, newStatus) => {
        // Actualizar items y filteredSkins simultáneamente
        const updateItem = (item) => 
            item.id === itemId ? { ...item, status: newStatus } : item;

        setItems(prevItems => prevItems.map(updateItem));
        setFilteredSkins(prevFiltered => prevFiltered.map(updateItem));
    }, []);

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
        setItems: updateItemStatus,
        filteredSkins,
        setFilteredSkins,
        loading,
        error,
        refreshItems: loadItems,
        filters,
        setFilters,
        sortedAndFilteredItems,
        totalItems: items.length
    };
};
