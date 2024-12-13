import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    localStorage.setItem('language', lng); // Guardamos la preferencia del usuario
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
      >
        <span>{i18n.language === 'es' ? 'Español' : 'English'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-50">
          <button
            onClick={() => changeLanguage('es')}
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-orange-500 w-full text-left"
          >
            Español
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-orange-500 w-full text-left"
          >
            English
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
