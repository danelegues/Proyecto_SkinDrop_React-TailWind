import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../shared/LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');

  const userMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const inicioItem = document.querySelector('.menu-items a[href="/paginaInicio.html"]');
    if (inicioItem) {
      moveMarker(inicioItem);
    }

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

    const handleClickOutside = (event) => {
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target) && 
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const moveMarker = (element) => {
    const marker = document.querySelector('.marker');
    if (marker && element) {
      marker.style.left = `${element.offsetLeft}px`;
      marker.style.width = `${element.offsetWidth}px`;
    }
  };

  const handleNavClick = (href, element) => {
    setActiveTab(href);
    moveMarker(element);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleProfileClick = (e) => {
    setActiveTab('/perfil');
    moveMarker(e.currentTarget);
    toggleUserMenu();
  };

  return (
    <div className="fixed top-0 w-full bg-[#141414] shadow-md z-50">
      <ul className="menu-list">
        <div className="flex justify-between items-center p-0 list-none">
          <div className="menu-container flex justify-between items-center w-full h-[80px] px-5">
            <div className="apartadoLogo flex justify-start items-center flex-1">
              <img src="/img/LogoSkinDrop.png" alt="Logo SkinDrop" className="h-[60px] w-[60px] mr-2" />
              <span className="text-white text-[30px] font-bold">SkinDrop</span>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>

            <div className="menu-items hidden md:flex items-center space-x-5 relative">
              <div className="marker"></div>
              <NavItem 
                href="/" 
                icon="fa-house-chimney" 
                active={activeTab === '/'} 
                onClick={(e) => handleNavClick('/', e.currentTarget)}
                onMouseEnter={(e) => moveMarker(e.currentTarget)}
              />
              <NavItem 
                href="/tienda" 
                icon="fa-shop" 
                active={activeTab === '/tienda'}
                onClick={(e) => handleNavClick('/tienda', e.currentTarget)}
                onMouseEnter={(e) => moveMarker(e.currentTarget)}
              />
              <NavItem 
                href="/intercambios"
                icon="fa-arrow-right-arrow-left"
                active={activeTab === '/intercambios'}
                onClick={(e) => handleNavClick('/intercambios', e.currentTarget)}
                onMouseEnter={(e) => moveMarker(e.currentTarget)}
              />
              <NavItem 
                href="/objetivos" 
                icon="fa-crosshairs" 
                active={activeTab === '/objetivos'}
                onClick={(e) => handleNavClick('/objetivos', e.currentTarget)}
                onMouseEnter={(e) => moveMarker(e.currentTarget)}
              />
              <NavItem 
                href="/cajas" 
                icon="fa-box-open" 
                active={activeTab === '/cajas'}
                onClick={(e) => handleNavClick('/cajas', e.currentTarget)}
                onMouseEnter={(e) => moveMarker(e.currentTarget)}
              />

              <div 
                className="relative"
                ref={profileButtonRef}
                onClick={handleProfileClick}
              >
                <NavItem 
                  href="/perfil" 
                  icon="fa-user" 
                  active={activeTab === '/perfil'}
                  onClick={(e) => handleNavClick('/perfil', e.currentTarget)}
                  onMouseEnter={(e) => moveMarker(e.currentTarget)}
                />
                {isUserMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <LanguageSelector />
            </div>
          </div>
        </div>

        <div 
          className={`transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} 
            ${isMenuOpen ? '' : 'hidden'}`}
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
    <MobileMenuItem href="/intercambios" icon="fa-arrow-right-arrow-left" text="Intercambios" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-crosshairs" text="Objetivos" onClick={onClose} />
    <MobileMenuItem href="#" icon="fa-box-open" text="Cajas" onClick={onClose} />
    <MobileMenuItem href="/perfil" icon="fa-user" text="Perfil" onClick={onClose} />
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