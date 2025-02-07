import axios from 'axios';
import API_URL from '../../config/config.js';

export const inventoryService = {
    async getInventoryItems() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/inventory`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener items del inventario:', error);
            throw error;
        }
    }
};