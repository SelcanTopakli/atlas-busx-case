import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  const { state } = useLocation() as { state?: { pnr?: string } };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] w-screen overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      <div className="w-full h-[140px] bg-[#c4001d]" />

      {/* İçerik */}
      <div className="flex flex-1 items-center justify-center px-4 -mt-16">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 text-center animate-fade-in">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Profesyonel ikon */}
            <CheckCircle2
              size={80}
              className="text-green-500 drop-shadow-sm animate-fade-in"
            />

            <h1 className="text-3xl font-bold text-green-600 mt-2">
              {t("paymentSuccess")}
            </h1>
            <p className="text-gray-700 text-lg">
              {t("pnrNumber")}:{" "}
              <strong className="text-[#c4001d]">
                {state?.pnr || "AT-XXXX-XXXX"}
              </strong>
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-[#c4001d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a80018] transition mt-4 shadow-sm"
            >
              {t("returnHome")}
            </button>
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
