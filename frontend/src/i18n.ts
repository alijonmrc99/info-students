import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationUzbek from './common/translation/uz/translation.json'
import translationRussian from './common/translation/ru/translation.json'
import translationEnglish from './common/translation/en/translation.json'
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    Uz: {
        translation: translationUzbek,
    },
    Ru: {
        translation: translationRussian
    },
    En: {
        translation: translationEnglish
    }
}
export const lang: string = localStorage.getItem("i18nextLng") || "Uz";
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: false,
        resources,
        // lng: 'uz'
    })

i18next.changeLanguage(lang)

export default i18next;