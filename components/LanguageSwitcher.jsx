import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      title={language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {language === "vi" ? "VI" : "EN"}
      </span>
    </button>
  );
};
