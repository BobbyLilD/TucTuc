import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from '../config';
import './locales';

const backend = new Backend({
  loadPath: 'locales/{{lng}}/{{ns}}.json',
});
i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    // lng: 'ru', // use for force lang select
    supportedLngs: ['en', 'ru'],
    debug: config.debug,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;
