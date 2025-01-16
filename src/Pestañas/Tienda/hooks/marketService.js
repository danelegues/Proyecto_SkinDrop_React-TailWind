import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://10.14.4.197:8001';

export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/market`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.data) {
                console.warn('No se recibieron datos del servidor');
                return [];
            }

            console.log('Respuesta del servidor:', response.data);
            
            if (response.data.success && Array.isArray(response.data.data)) {
                return response.data.data;
            }
            
            if (Array.isArray(response.data)) {
                return response.data;
            }
            
            console.warn('Formato de respuesta no reconocido:', response.data);
            return [];
            
        } catch (error) {
            console.error('Error al obtener items del mercado:', error.response?.data || error.message);
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

    async putItemOnSale(itemId, price) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/market/sell`, {
                item_id: itemId,
                price: price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Respuesta al poner en venta:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al poner item en venta:', error.response?.data || error.message);
            throw error;
        }
    }
};