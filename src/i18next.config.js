import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import API_URL from './config/config.js';

const detectUserLanguage = async () => {
  try {
    const response = await fetch(`${API_URL}/api/detect-language`);
    const data = await response.json();
    return data.language;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en'; // Idioma por defecto si hay error
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./locales/en/translation.json')
      },
      es: {
        translation: require('./locales/es/translation.json')
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false
    }
  });

// Detectar y establecer el idioma al cargar la aplicación
(async () => {
  const detectedLanguage = await detectUserLanguage();
  i18n.changeLanguage(detectedLanguage);
})();

export default i18n;