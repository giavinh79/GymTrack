import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonTranslationsEN from './en/common.json';
import domainTranslationsEN from './en/domain.json';
import landingTranslationsEN from './en/landing.json';
import commonTranslationsFR from './fr/common.json';
import domainTranslationsFR from './fr/domain.json';
import landingTranslationsFR from './fr/landing.json';

export enum Translations {
  EN = 'en',
  FR = 'fr',
}

// translation files
const resources = {
  [Translations.EN]: {
    common: commonTranslationsEN,
    domain: domainTranslationsEN,
    landing: landingTranslationsEN,
  },
  [Translations.FR]: {
    common: commonTranslationsFR,
    domain: domainTranslationsFR,
    landing: landingTranslationsFR,
  },
};

// config and initialization
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: window.location.hostname === 'localhost',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
