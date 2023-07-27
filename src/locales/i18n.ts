import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import localStorageAvailable from "@/utils/localStorageAvailable";
import { defaultLang } from "./config-lang";
import enLocales from "./langs/en";
import esLocales from "./langs/es";

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

const detectionOptions = {
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
  caches: ["localStorage", "cookie"],
};

if (storageAvailable) {
  lng = localStorage.getItem("i18nextLng") || defaultLang.value;
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      es: { translations: esLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    detection: detectionOptions,
  });

export default i18n;
