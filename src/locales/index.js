import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from "./en.json"
import ru from "./ru.json"
import az from "./az.json"
import tr from "./tr.json"

const resources={
    ru:{
        translation:ru,
    },
    en:{
        translation:en,
    },
    az:{
        translation:az,
    },
    tr:{
        translation:tr,
    },

}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'ru',
    compatibilityJSON: 'v3',
    interpolation: {
        escapeValue: false,
    },
});