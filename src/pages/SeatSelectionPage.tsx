import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeatMap from "../components/SeatMap";
import { useTranslation } from "react-i18next";

export default function SeatSelectionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const unitPrice = 1200;

  const handleSeatSelect = (seatNo: number) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNo)) return prev.filter((s) => s !== seatNo);
      if (prev.length < 4) return [...prev, seatNo];
      alert(t("maxSeatsWarning"));
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert(t("selectAtLeastOneSeat"));
      return;
    }
    navigate("/summary", { state: { tripId, selectedSeats } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-[200px] bg-[#c4001d]" />

      <div className="-mt-20 w-full px-0 flex justify-center">
        <div className="w-[90%] max-w-7xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Başlık */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {t("seatSelection")} – {tripId}
            </h1>

            <button
              onClick={() => navigate("/")}
              className="text-[#c4001d] font-semibold border border-[#c4001d] px-5 py-2 rounded-lg hover:bg-[#c4001d] hover:text-white transition"
            >
              {t("goBack")}
            </button>
          </div>

          {/* İçerik alanı */}
          <div className="flex flex-col xl:flex-row gap-8 w-full">
            {/* Koltuk haritası */}
            <div className="flex-1 bg-gray-50 rounded-2xl shadow-inner p-6 flex justify-center items-center">
              <SeatMap selectedSeats={selectedSeats} onSelectSeat={handleSeatSelect} />
            </div>

            {/* Sağ panel */}
            <div className="w-full xl:w-[30%] bg-gray-50 rounded-2xl shadow-inner p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("selectedSeats")}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm"
                      >
                        {seat}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">{t("noSeatSelected")}</p>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-gray-700 font-medium">
                    {t("totalPrice")}:
                    <span className="text-green-600 font-bold text-lg ml-2">
                      {selectedSeats.length * unitPrice} TL
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
                className={`mt-6 py-3 rounded-lg font-semibold transition w-full ${
                  selectedSeats.length > 0
                    ? "!bg-[#c4001d] hover:!bg-[#a80017] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("confirmAndContinue")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-6 w-full mt-auto">
        © 2025 AtlasBus | {t("allRightsReserved")}
      </footer>
    </div>
  );
}
