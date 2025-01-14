import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../shared/LanguageSelector';

const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed right-0 top-0 h-full w-64 bg-[#141414] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-home mr-3"></i>
                  {t('navbar.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/store" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-store mr-3"></i>
                  {t('navbar.store')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/inventory" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-box mr-3"></i>
                  {t('navbar.inventory')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/trade" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-exchange-alt mr-3"></i>
                  {t('navbar.trade')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-sign-in-alt mr-3"></i>
                  {t('navbar.login')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="text-gray-300 hover:text-white block py-2"
                  onClick={onClose}
                >
                  <i className="fas fa-user-plus mr-3"></i>
                  {t('navbar.register')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
