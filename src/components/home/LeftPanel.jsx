import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import VideoPreview from '../shared/VideoPreview';
import '../../styles/LeftPanel.css';

const LeftPanel = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    boxName: '',
    priceRange: {
      min: '',
      max: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'boxName') {
      setFilters(prev => ({
        ...prev,
        boxName: value
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: value
        }
      }));
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  // Datos de ejemplo para los jugadores
  const recentWinners = [
    {
      id: 1,
      name: "Player123",
      amount: 1500.00,
      skin: "AWP | Dragon Lore",
      time: "Hace 2 min",
      avatar: "/img/avatar1.png"
    },
    {
      id: 2,
      name: "GamerPro",
      amount: 2300.00,
      skin: "AK-47 | Wild Lotus",
      time: "Hace 5 min",
      avatar: "/img/avatar2.png"
    },
    {
      id: 3,
      name: "SkinHunter",
      amount: 890.00,
      skin: "Karambit | Fade",
      time: "Hace 8 min",
      avatar: "/img/avatar3.png"
    }
  ];

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
            value={filters.boxName}
            onChange={handleInputChange}
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
              name="min"
              value={filters.priceRange.min}
              onChange={handleInputChange}
              placeholder={t('filters.min')}
              className="w-1/2 bg-[#1a1a1a] text-white rounded-lg p-2 text-sm"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              name="max"
              value={filters.priceRange.max}
              onChange={handleInputChange}
              placeholder={t('filters.max')}
              className="w-1/2 bg-[#1a1a1a] text-white rounded-lg p-2 text-sm"
            />
          </div>
        </div>

        {/* Botón de aplicar filtros */}
        <button 
          onClick={handleApplyFilters}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-filter"></i>
          {t('filters.apply')}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="bg-[#141414] rounded-lg p-4">
        <h3 className="text-white text-lg font-medium mb-4">{t('home.stats.title')}</h3>
        <div className="space-y-3">
          <StatItem label={t('home.stats.casesOpenedToday')} value="1,234" />
          <StatItem label={t('home.stats.bestDrop')} value="$4,500.00" />
          <StatItem label={t('home.stats.onlineUsers')} value="789" isOnline />
        </div>
      </div>
    </div>
  );
};

const WinnerCard = ({ winner }) => (
  <div className="bg-white bg-opacity-5 rounded-lg p-3 hover:bg-opacity-10 transition-all duration-300 player-card-hover">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <img 
          src={winner.avatar} 
          alt={winner.name} 
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <span className="text-white text-sm font-medium truncate">
            {winner.name}
          </span>
          <span className="text-orange-500 text-sm">
            ${winner.amount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs mt-1">
          <span className="text-gray-400 truncate">{winner.skin}</span>
          <span className="text-gray-500">{winner.time}</span>
        </div>
      </div>
    </div>
  </div>
);

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
