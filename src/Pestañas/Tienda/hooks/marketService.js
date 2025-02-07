import axios from 'axios';
import API_URL from '../../../config/config.js';


export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            console.log('Realizando petición a:', `${API_URL}/api/market`);
            console.log('Token usado:', token);

            const response = await axios({
                method: 'GET',
                url: `${API_URL}/api/market`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                validateStatus: status => status < 500 // Permitir manejar errores 4xx
            });

            console.log('Respuesta completa:', response);

            if (response.status === 401) {
                throw new Error('Sesión expirada o inválida');
            }

            if (response.status === 200 && response.data) {
                return {
                    success: true,
                    data: response.data.data || []
                };
            }

            throw new Error(response.data.message || 'Error al obtener los items');

        } catch (error) {
            console.error('Error detallado en getMarketItems:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            throw {
                success: false,
                message: error.message || 'Error al cargar los items del mercado',
                status: error.response?.status || 500
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