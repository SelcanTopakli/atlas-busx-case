import { ArrowLeftRight } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function SearchForm({ onSearch }: { onSearch: () => void }) {
  const { t, i18n } = useTranslation();

  const [from, setFrom] = useState("Antalya");
  const [to, setTo] = useState("İstanbul Anadolu");
  const [date, setDate] = useState("2025-11-15");
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleDateClick = () => {
    const input = dateRef.current;
    if (input && "showPicker" in input) {
      (input as any).showPicker();
    }
  };

  // Tarihi aktif dile göre biçimlendir
  const formattedDate = new Date(date).toLocaleDateString(
    i18n.language === "tr" ? "tr-TR" : "en-US",
    {
      day: "2-digit",
      month: "short",
      weekday: "long",
    }
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 p-6 max-w-6xl mx-auto -mt-10 relative z-10">
      {/* Nereden */}
      <div className="bg-gray-100 rounded-xl px-5 py-3 flex-1">
        <label className="text-gray-500 text-sm block mb-1">{t("from")}</label>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full bg-transparent outline-none text-lg font-semibold text-gray-800"
        />
      </div>

      {/* Swap */}
      <button
        onClick={handleSwap}
        aria-label={t("swapCities")}
        className="p-3 rounded-full bg-white border hover:bg-gray-100 transition"
      >
        <ArrowLeftRight className="text-gray-700" />
      </button>

      {/* Nereye */}
      <div className="bg-gray-100 rounded-xl px-5 py-3 flex-1">
        <label className="text-gray-500 text-sm block mb-1">{t("to")}</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-transparent outline-none text-lg font-semibold text-gray-800"
        />
      </div>

      {/* Tarih */}
      <div
        onClick={handleDateClick}
        className="bg-gray-100 rounded-xl px-4 py-3 text-center min-w-[160px] cursor-pointer hover:bg-gray-200 transition relative"
      >
        <label className="text-gray-500 text-sm block">{t("departureDate")}</label>
        <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
        <input
          ref={dateRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
        />
      </div>

      {/* Buton */}
      <button
        onClick={onSearch}
        className="!bg-[#c4001d] text-white font-semibold px-10 py-3 rounded-xl transition duration-200 whitespace-nowrap"
      >
        {t("searchBus")}
      </button>
    </div>
  );
}
