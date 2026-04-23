"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { locales, defaultLocale, isRTL as checkRTL, type Locale } from './i18nConfig';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
  /** All currently enabled locales — use this to render the language switcher */
  availableLocales: Locale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const localeParam = (params?.lang as Locale) ?? defaultLocale;
  const [locale, setLocaleState] = useState<Locale>(localeParam);

  useEffect(() => {
    if (localeParam !== locale) setLocaleState(localeParam);
    document.documentElement.dir = checkRTL(localeParam) ? 'rtl' : 'ltr';
    document.documentElement.lang = localeParam;
  }, [localeParam]);

  const setLocale = (newLocale: Locale) => {
    if (!locales.includes(newLocale)) return; // guard against disabled locales
    // pathname is always /{lang}/... — swap the lang segment
    const newPath =
      pathname.replace(new RegExp(`^/(${locales.join('|')})(\/|$)`), `/${newLocale}$2`) ||
      `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        isRTL: checkRTL(locale),
        availableLocales: locales,
      }}
    >
      <div dir={checkRTL(locale) ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
