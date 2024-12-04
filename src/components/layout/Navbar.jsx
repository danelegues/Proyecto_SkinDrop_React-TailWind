import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from '../shared/LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
    const activeItem = document.querySelector(`.menu-items a[href="${location.pathname}"]`);
    if (activeItem) {
      moveMarker(activeItem);
    }
  }, [location.pathname]);

  useEffect(() => {
    const menuItems = document.querySelectorAll('.menu-items a');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => moveMarker(e.currentTarget));
    });

    const menuList = document.querySelector('.menu-items');
    if (menuList) {
      menuList.addEventListener('mouseleave', () => {
        const activeItem = document.querySelector(`.menu-items a[href="${activeTab}"]`);
        if (activeItem) {
          moveMarker(activeItem);
        }
      });
    }

    setTimeout(() => {
      const activeItem = document.querySelector(`.menu-items a[href="${activeTab}"]`);
      if (activeItem) {
        moveMarker(activeItem);
      }
    }, 100);

    return () => {
      menuItems.forEach(item => {
        item.removeEventListener('mouseenter', (e) => moveMarker(e.currentTarget));
      });
      if (menuList) {
        menuList.removeEventListener('mouseleave', () => {
          const activeItem = document.querySelector(`.menu-items a[href="${activeTab}"]`);
          if (activeItem) {
            moveMarker(activeItem);
          }
        });
      }
    };
  }, [activeTab]);

  const moveMarker = (element) => {
    const marker = document.querySelector('.marker');
    if (marker && element) {
      marker.style.left = `${element.offsetLeft}px`;
      marker.style.width = `${element.offsetWidth}px`;
    }
  };

  const handleMouseEnter = (element) => {
    const marker = document.querySelector('.marker');
    if (marker && element) {
      marker.style.left = `${element.offsetLeft}px`;
      marker.style.width = `${element.offsetWidth}px`;
    }
  };

  const handleMouseLeave = () => {
    const activeItem = document.querySelector('.menu-items a.active');
    if (activeItem) {
      moveMarker(activeItem);
    }
  };

  const handleNavClick = (href, element) => {
    setActiveTab(href);
    moveMarker(element);
  };

  const menuItems = [
    { path: '/', icon: 'home', label: 'Inicio' },
    { path: '/tienda', icon: 'store', label: 'Tienda' },
    { path: '/intercambio', icon: 'swap_horiz', label: 'Intercambios' },
    { path: '/inventario', icon: 'inventory_2', label: 'Inventario' },
    { path: '/perfil', icon: 'person', label: 'Perfil' },
  ];

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
            <div className="menu-items hidden md:flex items-center space-x-5"
                 onMouseLeave={handleMouseLeave}>
              <div className="marker"></div>
              <NavItem 
                href="/" 
                icon="fa-house-chimney" 
                active={activeTab === '/'} 
                onClick={(e) => handleNavClick('/', e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              />
              <NavItem 
                href="/tienda" 
                icon="fa-shop" 
                active={activeTab === '/tienda'}
                onClick={(e) => handleNavClick('/tienda', e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              />
              <NavItem 
                href="/intercambio" 
                icon="fa-arrow-right-arrow-left" 
                active={activeTab === '/intercambio'}
                onClick={(e) => handleNavClick('/intercambio', e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              />
              <NavItem 
                href="/inventario" 
                icon="fa-box-open" 
                active={activeTab === '/inventario'}
                onClick={(e) => handleNavClick('/inventario', e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              />
              <NavItem 
                href="/perfil" 
                icon="fa-user" 
                active={activeTab === '/perfil'}
                onClick={(e) => handleNavClick('/perfil', e.currentTarget)}
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              />
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

const NavItem = ({ href, icon, active, onClick, onMouseEnter }) => (
  <Link 
    to={href} 
    className={`p-[10px_20px] text-white cursor-pointer ${active ? 'active' : ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    <i className={`fa-solid ${icon}`}></i>
  </Link>
);

const MobileMenu = ({ onClose }) => (
  <div className="bg-[#141414] text-white py-4 px-5 space-y-4">
    <MobileMenuItem href="/paginaInicio.html" icon="fa-house-chimney" text="Inicio" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-shop" text="Tienda" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-arrow-right-arrow-left" text="Intercambios" onClick={onClose} />
    <MobileMenuItem href="/inventario" icon="fa-box-open" text="Inventario" onClick={onClose} />
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
