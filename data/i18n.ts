import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import i18n, {init} from "i18next";
import enUsTrans from '../public/locals/en-us.json';
import zhCnTrans from '../public/locals/zh-cn.json';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enUsTrans,
            },
            zh: {
                translation: zhCnTrans,
            },
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    }).then(() => init())

export default i18n;