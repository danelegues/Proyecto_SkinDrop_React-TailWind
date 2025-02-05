import axios from 'axios';
import API_URL from '../../../config/config.js'; 


export const inventoryService = {
    async getInventory() {
        try {
            const token = localStorage.getItem('token');
            console.log('Intentando conectar con:', `${API_URL}/api/inventory`);
            console.log('Token:', token);

            const response = await axios.get(`${API_URL}/api/inventory`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            console.log('Respuesta del servidor:', response.data);
            return response.data;   
        } catch (error) {
            console.error('Error detallado:', error);
            return { data: [], message: 'Error de conexión con el servidor' };
        }
    }
};