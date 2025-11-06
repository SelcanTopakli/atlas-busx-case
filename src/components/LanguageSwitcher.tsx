import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
  };
//language
  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
    >
      {i18n.language === "tr" ? "EN" : "TR"}
    </button>
  );
}
