import { formatPrice } from "../utils/format";
import { useTranslation } from "react-i18next";

interface Passenger {
  seatNo: number;
  fullName: string;
  gender: string;
  idNumber: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface PriceSummaryProps {
  tripId: string;
  unitPrice: number;
  selectedSeats: number[];
  passengers: Passenger[];
  contact: Contact;
  onPay: () => Promise<void>;
  loading: boolean;
  canPay: boolean;
}

export default function PriceSummary({
  tripId,
  unitPrice,
  selectedSeats,
  passengers,
  contact,
  onPay,
  loading,
  canPay,
}: PriceSummaryProps) {
  const { t } = useTranslation();

  const subtotal = unitPrice * selectedSeats.length;
  const serviceFee = 0;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {t("summaryTitle")}
      </h2>

      <p className="text-sm text-gray-600 mb-2">
        <strong>{t("trip")}:</strong> {tripId}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>{t("selectedSeats")}:</strong>{" "}
        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>{t("unitPrice")}:</strong> {formatPrice(unitPrice)}
      </p>

      <div className="flex justify-between text-gray-700 border-t pt-3">
        <span>{t("subtotal")}</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>{t("serviceFee")}</span>
        <span>{formatPrice(serviceFee)}</span>
      </div>
      <div className="flex justify-between text-gray-900 font-semibold text-lg border-t mt-2 pt-2">
        <span>{t("total")}</span>
        <span>{formatPrice(total)}</span>
      </div>

      <button
        onClick={onPay}
        disabled={!canPay || loading}
        className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
          !canPay || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#c4001d] text-white hover:bg-[#a80018]"
        }`}
      >
        {loading ? t("processingPayment") : t("proceedToPayment")}
      </button>
    </div>
  );
}
