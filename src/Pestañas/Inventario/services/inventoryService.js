import axios from 'axios';
import API_URL from '../../../config/config';


export const inventoryService = {
    async getInventory() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/inventory`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    }
}; 