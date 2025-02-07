import axios from 'axios';
import API_URL from '../config/config';

class MarketService {
    async getMarketItems() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/market`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener items del mercado:', error);
            throw error;
        }
    }

    async sellItem(itemId, price) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/market/sell`, {
                item_id: itemId,
                price: parseFloat(price)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al vender item:', error);
            throw error;
        }
    }
}

export const marketService = new MarketService();