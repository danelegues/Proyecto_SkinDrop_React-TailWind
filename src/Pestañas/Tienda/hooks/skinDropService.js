import axios from 'axios';
import API_URL from '../../../config/config.js';

export const skinDropService = {
    async getSkinDropItems() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${API_URL}/api/skindrop-market`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            if (response.data && response.data.success) {
                return response.data;
            } else {
                throw new Error('Formato de respuesta inválido');
            }
        } catch (error) {
            console.error('Error en skinDropService:', error);
            throw error;
        }
    },

    async purchaseItem(itemId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/skindrop-market/purchase/${itemId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error al comprar item:', error);
            throw error;
        }
    }
};