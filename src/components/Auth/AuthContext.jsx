import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  isAuthenticated, 
  removeToken, 
  getUserData, 
  setUserData,
  setToken 
} from '../../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setToken(token);
    setUserData(userData);
    setIsAuth(true);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('userData');
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      if (authenticated) {
        setUser(getUserData());
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

