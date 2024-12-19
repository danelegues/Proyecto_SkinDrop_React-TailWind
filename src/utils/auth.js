// Funciones de utilidad para manejar la autenticación
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('Token actual:', token);
  
  // Verificar que el token existe y no está vacío
  if (!token || token === 'undefined' || token === 'null') {
    console.log('No hay token válido');
    return false;
  }
  
  return true;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const setUserData = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
};
