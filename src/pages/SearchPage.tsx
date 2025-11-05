import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import ScheduleList from "../components/ScheduleList";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => setShowResults(true);
  const handleTripSelect = (tripId: string) => navigate(`/seats/${tripId}`);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-[200px] bg-[#c4001d]" />

      <div className="-mt-20 w-full px-0 flex justify-center">
        <div className="w-[90%] max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center">
            {t("searchTrips")}
          </h1>

          {/* Arama formu */}
          <SearchForm onSearch={handleSearch} />

          {/* Sonuçlar */}
          {showResults && (
            <div className="mt-10">
              <ScheduleList onTripSelect={handleTripSelect} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-6 w-full mt-auto">
        © 2025 AtlasBus | {t("allRightsReserved")}
      </footer>
    </div>
  );
}
