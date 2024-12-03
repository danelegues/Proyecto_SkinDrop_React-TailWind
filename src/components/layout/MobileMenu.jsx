import React from 'react';
import LanguageSelector from './LanguageSelector';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: 'fa-house-chimney', text: 'Inicio', href: '/paginaInicio.html' },
    { icon: 'fa-shop', text: 'Tienda', href: '#' },
    { icon: 'fa-arrow-right-arrow-left', text: 'Intercambios', href: '#' },
    { icon: 'fa-crosshairs', text: 'Objetivos', href: '#' },
    { icon: 'fa-box-open', text: 'Inventario', href: '/inventory' },
    { icon: 'fa-user', text: 'Perfil', href: '#' }
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
          <a 
            key={index}
            href={item.href}
            className="block p-3 hover:bg-gray-700 rounded-lg transition-colors"
            onClick={onClose}
          >
            <i className={`fa-solid ${item.icon} mr-3 opacity-100`}></i>
            {item.text}
          </a>
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
