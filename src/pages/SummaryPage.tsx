import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PassengerForm from "../components/PassengerForm";
import PriceSummary from "../components/PriceSummary";
import Navbar from "../components/Navbar";
import { contactSchema } from "../utils/validation";
import { useTranslation } from "react-i18next";

type Passenger = {
  seatNo: number;
  fullName: string;
  gender: string;
  idNumber: string;
};

export default function SummaryPage() {
  const { t } = useTranslation();
  const { state } = useLocation() as {
    state?: { tripId: string; selectedSeats: number[] };
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.tripId || !state?.selectedSeats?.length) navigate("/");
  }, [state, navigate]);

  const tripId = state?.tripId ?? "TRIP-UNKNOWN";
  const selectedSeats = state?.selectedSeats ?? [];

  const [unitPrice, setUnitPrice] = useState<number>(1200);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [kvkk, setKvkk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passengerFormValid, setPassengerFormValid] = useState(false);

  // (Opsiyonel) Fiyat fetch
  useEffect(() => {
    fetch("/mock/trips.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const match = data?.trips?.find((t: any) => t.id === tripId);
        if (match?.unitPrice) setUnitPrice(Number(match.unitPrice));
      })
      .catch(() => {});
  }, [tripId]);

  const contactValid = useMemo(
    () => contactSchema.safeParse(contact).success,
    [contact]
  );

  const canPay =
    passengerFormValid && contactValid && kvkk && selectedSeats.length > 0;

  const handlePay = async () => {
    if (!canPay) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    navigate("/payment-success", {
      state: { pnr: `AT-${new Date().getFullYear()}-XYZ` },
    });
  };

  if (selectedSeats.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-[140px] bg-[#c4001d]" />

      <div className="-mt-16 w-full px-0 flex justify-center">
        <div className="w-[92%] max-w-7xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
          {/* Başlık */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {t("passengerAndSummary")}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              ← {t("goBack")}
            </button>
          </div>

          {/* İçerik */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol kısım */}
            <div className="lg:col-span-2 space-y-6">
              <PassengerForm
                selectedSeats={selectedSeats}
                onChange={setPassengers}
                onValidityChange={setPassengerFormValid}
              />

              {/* İletişim Bilgileri */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">
                  {t("contactInfo")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, email: e.target.value }))
                      }
                      placeholder={t("emailPlaceholder")}
                      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c4001d]/60"
                    />
                    {!contact.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {t("invalidEmail")}
                      </p>
                    )}
                  </div>

                  {/* Telefon */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, phone: e.target.value }))
                      }
                      placeholder={t("phonePlaceholder")}
                      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c4001d]/60"
                    />
                    {!contact.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {t("invalidPhone")}
                      </p>
                    )}
                  </div>
                </div>

                {/* KVKK */}
                <label className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    checked={kvkk}
                    onChange={(e) => setKvkk(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    {t("kvkkText")}{" "}
                    <a
                      href="#"
                      className="text-[#c4001d] underline underline-offset-4"
                    >
                      {t("kvkkLink")}
                    </a>
                    {t("kvkkAccept")}
                  </span>
                </label>
              </div>
            </div>

            {/* Sağ kısım */}
            <div>
              <PriceSummary
                tripId={tripId}
                unitPrice={unitPrice}
                selectedSeats={selectedSeats}
                passengers={passengers}
                contact={contact}
                onPay={handlePay}
                loading={loading}
                canPay={canPay}
              />
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
