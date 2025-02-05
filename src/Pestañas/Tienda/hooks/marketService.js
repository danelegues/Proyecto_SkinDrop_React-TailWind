import axios from 'axios';
import API_URL from '../../../config/config.js';


export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.get(`${API_URL}/api/market`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            // Asegurarnos de que devolvemos la respuesta en el formato correcto
            if (response.data && response.data.success) {
                return response.data;
            } else {
                throw new Error('Formato de respuesta inválido');
            }
        } catch (error) {
            console.error('Error en marketService:', error);
            throw error;
        }
    },

    async buyItem(itemId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/market/buy/${itemId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error al comprar item:', error.response?.data || error.message);
            throw error;
        }
    },

    async listItemForSale(itemId, price) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/market/items`, {
                item_id: itemId,
                price: price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async addToMarket(itemId, price) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'POST',
                url: `${API_URL}/api/market/items`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    item_id: itemId,
                    price: price
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error in addToMarket:', error);
            throw error;
        }
    },

    async removeFromMarket(itemId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                method: 'DELETE',
                url: `${API_URL}/api/market/remove/${itemId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error in removeFromMarket:', error);
            throw error;
        }
    }
};