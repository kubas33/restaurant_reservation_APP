import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import plTranslations from "./lang/pl.json";
import enTranslations from "./lang/en.json";
import enValidationTranslations from "./lang/validation/en.json";
import plValidationTranslations from "./lang/validation/pl.json";

// the translations
const resources = {
  en: {
    translation: {
      ...enValidationTranslations,
      ...enTranslations,
    },
  },
  pl: {
    translation: {
      ...plValidationTranslations,
      ...plTranslations,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pl",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    keySeparator: ".",
  });

export default i18n;
