import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://10.14.4.197:8001';

export const inventoryService = {
    async getInventory() {
        try {
            const token = localStorage.getItem('token');
            console.log('Intentando conectar con:', `http://10.14.4.197:8001/api/inventory`);
            console.log('Token:', token);

            const response = await axios.get(`http://10.14.4.197:8001/api/inventory`, {
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