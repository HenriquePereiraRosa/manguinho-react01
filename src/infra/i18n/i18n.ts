import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nResources from './i18nResources'

i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  debug: true
})

export default i18n
