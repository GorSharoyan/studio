'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import am from '@/locales/am.json';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'am', name: 'Հայերեն', flag: '🇦🇲' },
];

const translations: Record<string, any> = { en, ru, am };

// Simple deep get function
const get = (obj: any, path: string, defaultValue: string = path) => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        result = result?.[key];
        if (result === undefined) return defaultValue;
    }
    return result;
}


type LanguageContextType = {
  language: Language;
  setLanguage: (langCode: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (langCode: string) => {
    const newLang = languages.find(l => l.code === langCode);
    if (newLang) {
      setCurrentLanguage(newLang);
    }
  };

  const t = useCallback((key: string) => {
    const langTranslations = translations[currentLanguage.code] || translations.en;
    return get(langTranslations, key, key);
  }, [currentLanguage]);

  const contextValue = useMemo(() => ({
    language: currentLanguage,
    setLanguage,
    t,
  }), [currentLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
