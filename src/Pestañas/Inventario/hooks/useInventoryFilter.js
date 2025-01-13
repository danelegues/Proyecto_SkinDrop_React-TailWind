import { useState, useMemo, useEffect } from 'react';
import { inventoryService } from './inventoryService';
import { INVENTORY_ITEMS } from '../constants/inventory'; // Mantener como fallback
import axios from 'axios';

export const useInventoryFilter = () => {
    const [items, setItems] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http:/10.14.4.197:8001';
    const [filters, setFilters] = useState({
        search: '',
        minPrice: '',
        maxPrice: '',
        wear: [],
        type: []
    });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await inventoryService.getInventory();
                if (response?.data && Array.isArray(response.data)) {
                    const transformedItems = response.data.map(item => {
                        return {
                            id: item.id || '',
                            name: item.name || '',
                            wear: item.wear || 'Factory New',
                            price: item.price || 0,
                            image: item.image_url || '',
                            status: item.status || 'available',
                            category: item.category || 'rifle'
                        };
                    });

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
    }, []);

    const sortedAndFilteredItems = useMemo(() => {
        return items.filter(item => {
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
