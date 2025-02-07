import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from '../shared/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Auth/AuthContext';
import AuthPopup from '../Auth/AuthPopup';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleNavigation = (path, requiresAuth) => {
    navigate(path);
    if (requiresAuth && !isAuth) {
      setShowAuthPopup(true);
    }
  };

  const menuItems = [
    { path: '/', icon: 'fa-house-chimney', label: t('navbar.home'), requiresAuth: false },
    { path: '/tienda', icon: 'fa-shop', label: t('navbar.store'), requiresAuth: false },
    { path: '/intercambio', icon: 'fa-arrow-right-arrow-left', label: t('navbar.trade'), requiresAuth: true },
    { path: '/inventario', icon: 'fa-box-open', label: t('navbar.inventory'), requiresAuth: true },
    { path: '/perfil', icon: 'fa-user', label: t('navbar.login'), requiresAuth: true },
  ];

  return (
    <>
      <div className="fixed top-0 w-full bg-[#141414] shadow-md z-50">
        <ul className="menu-list">
          <div className="flex justify-between items-center p-0 list-none">
            {/* Menu Container */}
            <div className="menu-container flex justify-between items-center w-full h-[80px] px-5">
              {/* Logo Section */}
              <div className="apartadoLogo flex justify-start items-center flex-1">
                <a href="/" className="flex items-center">
                  <img src="/img/LogoSkinDrop.png" alt="Logo SkinDrop" className="h-[60px] w-[60px] mr-2" />
                  <span className="text-white text-[30px] font-bold">SkinDrop</span>
                </a>
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
                {menuItems.map((item) => (
                  <NavItem 
                    key={item.path}
                    href={item.path} 
                    icon={item.icon} 
                    active={activeTab === item.path}
                    requiresAuth={item.requiresAuth}
                    onClick={(e) => handleNavigation(item.path, item.requiresAuth)}
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    isAuth={isAuth}
                    iconColor={item.path === '/perfil' && isAuth ? 'text-orange-500' : ''}
                  />
                ))}
                <LanguageSelector />
              </div>
            </div>
          </div>
        </ul>

        {/* Menu móvil */}
        <div 
          className={`transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} 
            ${isMenuOpen ? '' : 'hidden'}
          `}
        >
          <MobileMenu onClose={() => setIsMenuOpen(false)} />
        </div>
      </div>

      {showAuthPopup && (
        <AuthPopup 
          onClose={() => {
            setShowAuthPopup(false);
            navigate('/');
          }} 
        />
      )}
    </>
  );
};

const NavItem = ({ href, icon, active, requiresAuth, onClick, onMouseEnter, isAuth, iconColor }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <a 
      href={href} 
      className={`p-[10px_20px] text-white cursor-pointer ${active ? 'active' : ''} ${requiresAuth && !isAuth ? 'opacity-75' : ''}`}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
    >
      <i className={`fa-solid ${icon} ${iconColor}`}></i>
    </a>
  );
};

const MobileMenu = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#141414] text-white py-4 px-5 space-y-4">
      <MobileMenuItem href="/" icon="fa-house-chimney" text={t('navbar.home')} onClick={onClose} />
      <MobileMenuItem href="/tienda" icon="fa-shop" text={t('navbar.store')} onClick={onClose} />
      <MobileMenuItem href="/intercambio" icon="fa-arrow-right-arrow-left" text={t('navbar.trade')} onClick={onClose} />
      <MobileMenuItem href="/inventario" icon="fa-box-open" text={t('navbar.inventory')} onClick={onClose} />
      <MobileMenuItem href="/perfil" icon="fa-user" text={t('navbar.profile')} onClick={onClose} />
      
      {/* Selector de idioma móvil */}
      <div className="p-3">
        <LanguageSelector isMobile={true} />
      </div>
    </div>
  );
};


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
