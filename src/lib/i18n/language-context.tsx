"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { messages } from './messages';

// Define supported languages
export type Language = 'en' | 'es';
export type MessagePath = string;

// Type for the context value
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: MessagePath, placeholders?: Record<string, string | number>) => string;
  availableLanguages: Language[];
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => { },
  t: () => '',
  availableLanguages: ['en', 'es'],
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'en'
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const availableLanguages: Language[] = ['en', 'es'];

  // Load user preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Check browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (availableLanguages.includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (path: string, placeholders: Record<string, string | number> = {}): string => {
    // Split the path (e.g., "auth.login.title" => ["auth", "login", "title"])
    const keys = path.split('.');

    // Navigate through the messages object
    let value: Record<string, unknown> | string | undefined = messages[language];
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key] as Record<string, unknown> | string;
      } else {
        console.warn(`Translation missing: ${path} in ${language}`);
        // Fallback to English
        value = getFromEnglish(path);
        break;
      }
    }

    // Return the value if it's a string, otherwise return the path
    if (typeof value === 'string') {
      // Replace placeholders
      return value.replace(/\{([^}]+)\}/g, (_, key) => {
        return String(placeholders[key] || `{${key}}`);
      });
    }

    return path;
  };

  // Fallback function to get value from English translations
  const getFromEnglish = (path: string): string => {
    const keys = path.split('.');
    let value: Record<string, unknown> | string | undefined = messages['en'];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key] as Record<string, unknown> | string;
      } else {
        return path;
      }
    }

    return typeof value === 'string' ? value : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}
