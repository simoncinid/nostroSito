import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import itTranslations from './locales/it/common.json'
import enTranslations from './locales/en/common.json'
import frTranslations from './locales/fr/common.json'
import esTranslations from './locales/es/common.json'
import deTranslations from './locales/de/common.json'

const resources = {
  it: {
    translation: itTranslations
  },
  en: {
    translation: enTranslations
  },
  fr: {
    translation: frTranslations
  },
  es: {
    translation: esTranslations
  },
  de: {
    translation: deTranslations
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'it',
    lng: 'it',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  })

export default i18n 