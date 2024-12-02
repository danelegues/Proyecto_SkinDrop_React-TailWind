import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../shared/LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Inicializar el marker
    const inicioItem = document.querySelector('.menu-items a[href="/paginaInicio.html"]');
    if (inicioItem) {
      moveMarker(inicioItem);
    }

    // Event listeners para el marker
    const menuItems = document.querySelectorAll('.menu-items a');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => moveMarker(e.currentTarget));
    });

    const menuList = document.querySelector('.menu-items');
    menuList.addEventListener('mouseleave', () => {
      const activeItem = document.querySelector('.menu-items a.active');
      if (activeItem) {
        moveMarker(activeItem);
      }
    });
  }, []);

  const moveMarker = (element) => {
    const marker = document.querySelector('.marker');
    if (marker && element) {
      marker.style.left = `${element.offsetLeft}px`;
      marker.style.width = `${element.offsetWidth}px`;
    }
  };

  return (
    <div className="fixed top-0 w-full bg-[#141414] shadow-md z-50">
      <ul className="menu-list">
        <div className="flex justify-between items-center p-0 list-none">
          {/* Menu Container */}
          <div className="menu-container flex justify-between items-center w-full h-[80px] px-5">
            {/* Logo Section */}
            <div className="apartadoLogo flex justify-start items-center flex-1">
              <img src="/img/LogoSkinDrop.png" alt="Logo SkinDrop" className="h-[60px] w-[60px] mr-2" />
              <span className="text-white text-[30px] font-bold">SkinDrop</span>
            </div>
            
            {/* Botón Hamburguesa */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>

            {/* Menu Items Desktop */}
            <div className="menu-items hidden md:flex items-center space-x-5">
              <div className="marker"></div>
              <NavItem href="/paginaInicio.html" icon="fa-house-chimney" active />
              <NavItem href="#" icon="fa-shop" />
              <NavItem href="#" icon="fa-arrow-right-arrow-left" />
              <NavItem href="#" icon="fa-crosshairs" />
              <NavItem href="#" icon="fa-box-open" />
              <NavItem href="#" icon="fa-user" />
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Menu móvil */}
        <div 
          className={`transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} 
            ${isMenuOpen ? '' : 'hidden'}
          `}
        >
          <MobileMenu onClose={() => setIsMenuOpen(false)} />
        </div>
      </ul>
    </div>
  );
};

const NavItem = ({ href, icon, active }) => (
  <Link 
    to={href} 
    className={`p-[10px_20px] text-white cursor-pointer ${active ? 'active' : ''}`}
  >
    <i className={`fa-solid ${icon}`}></i>
  </Link>
);

const MobileMenu = ({ onClose }) => (
  <div className="bg-[#141414] text-white py-4 px-5 space-y-4">
    <MobileMenuItem href="/paginaInicio.html" icon="fa-house-chimney" text="Inicio" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-shop" text="Tienda" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-arrow-right-arrow-left" text="Intercambios" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-crosshairs" text="Objetivos" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-box-open" text="Cajas" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-user" text="Perfil" onClick={onClose} />
    
    {/* Selector de idioma móvil */}
    <div className="p-3">
      <LanguageSelector isMobile={true} />
    </div>
  </div>
);

const MobileMenuItem = ({ href, icon, text, onClick }) => (
  <Link 
    to={href} 
    className="block p-3 hover:bg-gray-700 rounded-lg transition-colors"
    onClick={onClick}
  >
    <i className={`fa-solid ${icon} mr-3 opacity-100`}></i> {text}
  </Link>
);

export default Navbar;
