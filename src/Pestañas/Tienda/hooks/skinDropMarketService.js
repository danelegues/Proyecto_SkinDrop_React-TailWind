import axios from 'axios';
import API_URL from '../../../config/config.js';

export const skinDropMarketService = {
    async getItems() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            const response = await axios.get(
                `${API_URL}/api/skindrop-market`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (!response.data.success) {
                throw new Error(response.data?.message || 'Error al obtener items del SkinDrop Market');
            }

            return response.data;

        } catch (error) {
            console.error('Error al obtener items del SkinDrop Market:', error);
            throw error.response?.data?.message || error.message;
        }
    },

    async purchaseItem(itemId) {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            console.log('Intentando comprar item del SkinDrop Market:', itemId);

            const response = await axios.post(
                `${API_URL}/api/skindrop-market/purchase/${itemId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            console.log('Respuesta de compra SkinDrop:', response.data);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al comprar el item');
            }

            return response.data;

        } catch (error) {
            console.error('Error al comprar item del SkinDrop:', error);
            throw error.response?.data?.message || 'Error del servidor al procesar la compra';
        }
    }
}; 