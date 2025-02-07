import axios from 'axios';
import API_URL from '../../../config/config.js';


export const marketService = {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('No se encontró token');
                throw new Error('No hay token de autenticación');
            }

            // Crear instancia de axios con configuración específica
            const axiosInstance = axios.create({
                baseURL: API_URL,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // Aumentar el timeout si es necesario
                timeout: 10000,
                // Permitir ver la respuesta incluso con error
                validateStatus: function (status) {
                    return true; // Siempre devuelve true para poder manejar el error
                },
            });

            console.log('Iniciando petición a:', `${API_URL}/api/market`);
            
            const response = await axiosInstance.get('/api/market');
            
            // Log detallado de la respuesta
            console.log('Respuesta completa:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data,
                config: {
                    url: response.config.url,
                    method: response.config.method,
                    headers: response.config.headers
                }
            });

            // Si hay error en la respuesta
            if (response.status >= 400) {
                throw {
                    status: response.status,
                    message: response.data?.message || 'Error del servidor',
                    data: response.data
                };
            }

            // Si la respuesta es exitosa pero no tiene el formato esperado
            if (!response.data || !Array.isArray(response.data.data)) {
                console.error('Formato de respuesta inválido:', response.data);
                throw new Error('Formato de respuesta inválido');
            }

            return {
                success: true,
                data: response.data.data
            };

        } catch (error) {
            // Log detallado del error
            console.error('Error detallado en getMarketItems:', {
                message: error.message,
                status: error.status,
                response: error.response?.data,
                config: error.config,
                stack: error.stack
            });

            // Rethrow con información más detallada
            throw {
                success: false,
                message: error.message || 'Error al cargar los items del mercado',
                status: error.status || 500,
                details: error.response?.data
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