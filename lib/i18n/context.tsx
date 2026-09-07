"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enMessages from "@/messages/en.json";
import urMessages from "@/messages/ur.json";

export type Locale = "en" | "ur";

interface I18nContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (path: string, fallback?: string) => string;
  isUrdu: boolean;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (path) => path,
  isUrdu: false,
});

const messagesMap = {
  en: enMessages,
  ur: urMessages,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("awf_pk_locale") as Locale;
    if (saved === "en" || saved === "ur") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("awf_pk_locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  const t = (path: string, fallback = ""): string => {
    const keys = path.split(".");
    let current: any = messagesMap[locale] || messagesMap.en;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // fallback to English
        let enCurrent: any = messagesMap.en;
        for (const enKey of keys) {
          if (enCurrent && typeof enCurrent === "object" && enKey in enCurrent) {
            enCurrent = enCurrent[enKey];
          } else {
            return fallback || path;
          }
        }
        return typeof enCurrent === "string" ? enCurrent : (fallback || path);
      }
    }
    return typeof current === "string" ? current : (fallback || path);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isUrdu: locale === "ur" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
