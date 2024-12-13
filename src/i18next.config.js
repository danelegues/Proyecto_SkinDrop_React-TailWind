import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

// Recuperar el idioma guardado o usar el predeterminado
const savedLanguage = localStorage.getItem('language') || 'es';

// Definir los recursos de traducción
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // idioma inicial
    fallbackLng: 'en', // idioma de respaldo
    interpolation: {
      escapeValue: false // no es necesario escapar valores
    },
    react: {
      useSuspense: false // desactivar suspense para evitar problemas de renderizado
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Listener para debugging y guardar preferencia de idioma
i18n.on('languageChanged', (lng) => {
  console.log('Idioma cambiado a:', lng);
  localStorage.setItem('language', lng);
});

export default i18n;