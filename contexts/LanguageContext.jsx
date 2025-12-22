import React, { createContext, useContext, useState, useEffect } from "react";

// Import translations
import { translations } from "../constants/translations.js";

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
    const savedLang = localStorage.getItem("appLanguage");
    return savedLang || "vi";
  });

  useEffect(() => {
    // Lưu ngôn ngữ vào localStorage khi thay đổi
    localStorage.setItem("appLanguage", language);
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
  };

  const t = (key) => {
    return translations[language][key] || translations["vi"][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
