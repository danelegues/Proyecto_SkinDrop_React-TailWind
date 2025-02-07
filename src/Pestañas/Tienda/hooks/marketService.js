import axios from 'axios';
import API_URL from '../../../config/config.js';


export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            const response = await axios.get(
                `${API_URL}/api/market`,
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
                throw new Error(response.data?.message || 'Error al obtener items del mercado');
            }

            return response.data;

        } catch (error) {
            console.error('Error al obtener items del mercado:', error);
            throw error.response?.data?.message || error.message;
        }
    },

    async buyItem(itemId) {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            console.log('Intentando comprar item del Market:', itemId);

            const response = await axios.post(
                `${API_URL}/api/market/buy/${itemId}`,
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

            console.log('Respuesta de compra Market:', response.data);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al comprar el item');
            }

            return response.data;

        } catch (error) {
            console.error('Error al comprar item del Market:', error);
            throw error.response?.data?.message || 'Error del servidor al procesar la compra';
        }
    },

    async listItemForSale(itemId, price) {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.post(
                `${API_URL}/api/market/items`,
                {
                    item_id: itemId,
                    price: parseFloat(price)
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error al listar item:', error);
            throw error.response?.data?.message || error.message;
        }
    },

    async addToMarket(itemId, price) {
        try {
            console.log('Enviando datos al servidor:', { itemId, price }); // Debug log
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            const response = await axios.post(
                `${API_URL}/api/market/items`,
                {
                    item_id: itemId,
                    price: parseFloat(price)
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al poner el item en venta');
            }

            return response.data;
        } catch (error) {
            console.error('Error detallado en addToMarket:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error.response?.data?.message || error.message || 'Error al poner el item en venta';
        }
    },

    async removeFromMarket(itemId) {
        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.delete(
                `${API_URL}/api/market/remove/${itemId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error al remover item del mercado:', error);
            throw error.response?.data?.message || error.message;
        }
    },

    async buyMarketItem(listingId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            const response = await axios.post(
                `${API_URL}/api/market/buy/${listingId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al comprar el item');
            }

            return response.data;
        } catch (error) {
            console.error('Error en buyMarketItem:', error);
            throw error.response?.data?.message || error.message;
        }
    }
};