import { useState, useEffect } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // 🌐 Dil değiştirme
  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  // 🌗 Tema değiştirme
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Tailwind dark mode class kontrolü
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#c4001d] text-white shadow-md dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="text-4xl font-extrabold cursor-pointer select-none">
          <span className="text-white dark:text-gray-100">Atlas</span>
          <span className="ml-0.5 text-gray-200 dark:text-gray-400">Bus</span>
        </div>

        {/* Sağ Kısım */}
        <div className="flex items-center gap-4">
          {/* 🌐 Dil Seçimi */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-transparent text-white border border-white/40 font-medium px-4 py-2 rounded-full shadow-sm hover:bg-[#a80017] hover:shadow-md transition-all duration-200 dark:border-gray-600"
          >
            <Globe size={18} />
            {i18n.language.toUpperCase()}
          </button>

          {/* 🌗 Tema Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center bg-transparent text-white border border-white/40 p-2 rounded-full shadow-sm hover:bg-[#a80017] hover:shadow-md transition-all duration-200 dark:border-gray-600"
            title={darkMode ? "Açık tema" : "Koyu tema"}
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-300" />
            ) : (
              <Moon size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
