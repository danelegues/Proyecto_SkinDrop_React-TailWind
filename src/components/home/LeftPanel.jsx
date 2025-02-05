import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VideoPreview from '../shared/VideoPreview';
import '../../styles/LeftPanel.css';
import { useAuth } from '../Auth/AuthContext';



const LeftPanel = ({ setFilters }) => {
  const { t } = useTranslation();
  const { user } = useAuth();


  const [localFilters, setLocalFilters] = useState({
    boxName: "",
    minPrice: "",
    maxPrice: ""
  });

  const [stats, setStats] = useState({
    casesOpened: 0,
    totalValue: 0,
    onlineUsers: 0
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    setFilters({
      boxName: localFilters.boxName,
      priceRange: {
        min: localFilters.minPrice,
        max: localFilters.maxPrice
      }
    });
  };

  const clearFilters = () => {
    const defaultFilters = { boxName: "", minPrice: "", maxPrice: "" };
    setLocalFilters(defaultFilters);
    setFilters({
      boxName: "",
      priceRange: { min: "", max: "" }
    });
  };

  // Función para incrementar casesOpened y totalValue
  const incrementCasesOpened = (boxPrice) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        casesOpened: prev.casesOpened + 1,
        totalValue: prev.totalValue + parseFloat(boxPrice || 0)
      };
      // Guardar en localStorage para persistencia
      localStorage.setItem('casesOpened', newStats.casesOpened);
      localStorage.setItem('totalValue', newStats.totalValue);
      return newStats;
    });
  };

  // Añadir esta nueva función para obtener usuarios
  const fetchTotalUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.ok) {
        const users = await response.json();
        setStats(prev => ({
          ...prev,
          onlineUsers: users.length
        }));
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    // Cargar valores iniciales desde localStorage
    const savedCasesOpened = localStorage.getItem('casesOpened');
    const savedTotalValue = localStorage.getItem('totalValue');

    if (savedCasesOpened || savedTotalValue) {
      setStats(prev => ({
        ...prev,
        casesOpened: parseInt(savedCasesOpened, 10) || 0,
        totalValue: parseFloat(savedTotalValue) || 0
      }));
    }

    // Cargar total de usuarios
    fetchTotalUsers();

    // Exponer la función a través del window object
    window.incrementCasesOpened = incrementCasesOpened;
    return () => {
      delete window.incrementCasesOpened;
    };
  }, []);

  return (
    <div className="h-full flex flex-col space-y-4 mt-16">
      {/* Video Tutorial */}
      <VideoPreview />

      
      {/* Filtros */}
      <div className="bg-[#141414] rounded-lg p-4">
        <h3 className="text-white text-lg font-medium mb-4">{t('filters.title')}</h3>
        
        {/* Nombre de la caja */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">{t('filters.boxName')}</label>
          <input 
            type="text" 
            name="boxName"
            value={localFilters.boxName}
            onChange={handleFilterChange}
            placeholder={t('filters.searchBox')}
            className="w-full bg-[#1a1a1a] text-white rounded-lg p-2 text-sm"
          />
        </div>

        {/* Rango de precio */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-2">{t('filters.priceRange')}</label>
          <div className="flex gap-2 items-center">
            <input 
              type="number" 
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleFilterChange}
              placeholder={t('filters.min')}
              className="w-1/2 bg-[#1a1a1a] text-white rounded-lg p-2 text-sm"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleFilterChange}
              placeholder={t('filters.max')}
              className="w-1/2 bg-[#1a1a1a] text-white rounded-lg p-2 text-sm"
            />
          </div>
        </div>

        {/* Botón de aplicar filtros */}
        <button onClick={applyFilters} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mb-2">
          <i className="fas fa-filter"></i>
          {t('filters.apply')}
        </button>

        <button 
          onClick={clearFilters}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-times"></i>
          {t('filters.clear')}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="bg-[#141414] rounded-lg p-4">
        <h3 className="text-white text-lg font-medium mb-4">{t('home.stats.title')}</h3>
        <div className="space-y-3">
          <StatItem label={t('home.stats.casesOpened')} value={stats.casesOpened} />
          {user && user.is_admin && (
          <StatItem 
            label={t('home.stats.totalValue')} 
            value={`${stats.totalValue.toFixed(2)}€`} 
          />
          )}
          <StatItem label={t('home.stats.onlineUsers')} value={stats.onlineUsers} isOnline />
        </div>
      </div>
    </div>
  );
};



const StatItem = ({ label, value, isOnline }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-white text-sm font-medium flex items-center gap-2">
      {value}
      {isOnline && (
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      )}
    </span>
  </div>
);

export default LeftPanel;
