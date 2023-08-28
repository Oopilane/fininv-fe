import en from "./en/en.json"
import localeFunc from "./en/en.js"
import { createI18n } from 'vue-i18n'
import { register } from "timeago.js"



export const defaultLocale = "en" 
export const languages = {
    en: en
}

const messages = Object.assign(languages)

const i18n = createI18n({
    locale: defaultLocale,
    messages
})

register('defaultLocale',localeFunc)
export default i18n