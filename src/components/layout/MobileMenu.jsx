import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: 'fa-house-chimney', text: 'Inicio', to: '/' },
    { icon: 'fa-shop', text: 'Tienda', to: '/tienda' },
    { icon: 'fa-arrow-right-arrow-left', text: 'Intercambios', to: '/intercambio' },
    { icon: 'fa-crosshairs', text: 'Objetivos', to: '#' },
    { icon: 'fa-box-open', text: 'Inventario', to: '/inventario' },
    { icon: 'fa-user', text: 'Perfil', to: '/registro' }
  ];

  return (
    <div 
      className={`
        fixed w-full bg-[#141414] transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="bg-[#141414] text-white py-4 px-5 space-y-4">
        {menuItems.map((item, index) => (
          <Link 
            key={index}
            to={item.to}
            className="block p-3 hover:bg-gray-700 rounded-lg transition-colors"
            onClick={onClose}
          >
            <i className={`fa-solid ${item.icon} mr-3 opacity-100`}></i>
            {item.text}
          </Link>
        ))}
        
        {/* Selector de idioma móvil */}
        <div className="p-3">
          <LanguageSelector isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
