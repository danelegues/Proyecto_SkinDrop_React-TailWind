import axios from 'axios';
import API_URL from '../../../config/config.js';


export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('No se encontró token');
                return {
                    success: false,
                    message: 'No hay token de autenticación'
                };
            }

            const response = await axios.get(`${API_URL}/api/market`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (!response.data || !response.data.success) {
                return {
                    success: false,
                    message: 'Error en la respuesta del servidor'
                };
            }

            return {
                success: true,
                data: response.data.data || []
            };

        } catch (error) {
            console.error('Error al obtener items del mercado:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Error al cargar los items del mercado',
                error: error
            };
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