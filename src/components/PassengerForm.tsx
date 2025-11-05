import { useEffect, useMemo, useState } from "react";
import { passengersSchema, passengerSchema } from "../utils/validation";
import type { PassengerInput } from "../utils/validation";
import { useTranslation } from "react-i18next";

interface Passenger extends PassengerInput {}
interface PassengerFormProps {
  selectedSeats: number[];
  onChange: (passengers: Passenger[]) => void;
  onValidityChange?: (ok: boolean) => void;
}

type ErrorMap = Record<number, Partial<Record<keyof Passenger, string>>>;

export default function PassengerForm({
  selectedSeats,
  onChange,
  onValidityChange,
}: PassengerFormProps) {
  const { t } = useTranslation();

  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map((seat) => ({
      seatNo: seat,
      fullName: "",
      gender: "" as Passenger["gender"],
      idNumber: "",
    }))
  );

  // Koltuk değişimi
  useEffect(() => {
    const updated = selectedSeats.map((seat) => {
      const existing = passengers.find((p) => p.seatNo === seat);
      return (
        existing || {
          seatNo: seat,
          fullName: "",
          gender: "" as Passenger["gender"],
          idNumber: "",
        }
      );
    });
    setPassengers(updated);
  }, [selectedSeats]);

  // Üst bileşene bildir
  useEffect(() => {
    onChange(passengers);
  }, [passengers]);

  // Zod hatalarını çeviriyle göster
  const errorMap: ErrorMap = useMemo(() => {
    const errors: ErrorMap = {};
    passengers.forEach((p) => {
      const res = passengerSchema.safeParse(p);
      if (!res.success) {
        for (const issue of res.error.issues) {
          const field = issue.path[0] as keyof Passenger;
          errors[p.seatNo] ||= {};
          errors[p.seatNo]![field] =
            issue.message ===
            'Invalid enum value. Expected "Erkek" | "Kadın"'
              ? t("selectGender")
              : issue.message;
        }
      }
    });
    return errors;
  }, [passengers, t]);

  // Tüm form geçerli mi?
  const isValid = useMemo(() => {
    return passengersSchema.safeParse(passengers).success;
  }, [passengers]);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid]);

  const handleInputChange = (
    seatNo: number,
    field: keyof Passenger,
    value: string
  ) => {
    setPassengers((prev) =>
      prev.map((p) => (p.seatNo === seatNo ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t("passengerInfo")}
      </h2>

      <div className="space-y-6">
        {passengers.map((p, index) => {
          const err = errorMap[p.seatNo] || {};
          return (
            <div
              key={p.seatNo}
              className="border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-[#c4001d]">
                  {t("seat")} {p.seatNo}
                </h3>
                <span className="text-gray-500 text-sm">
                  {index + 1}. {t("passenger")}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ad Soyad */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    value={p.fullName}
                    onChange={(e) =>
                      handleInputChange(p.seatNo, "fullName", e.target.value)
                    }
                    placeholder={t("fullNamePlaceholder")}
                    className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c4001d]/60 ${
                      err.fullName ? "border-red-400" : ""
                    }`}
                  />
                  {err.fullName && (
                    <p className="text-xs text-red-500 mt-1">{err.fullName}</p>
                  )}
                </div>

                {/* Cinsiyet */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    {t("gender")}
                  </label>
                  <select
                    value={p.gender}
                    onChange={(e) =>
                      handleInputChange(
                        p.seatNo,
                        "gender",
                        e.target.value as Passenger["gender"]
                      )
                    }
                    className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c4001d]/60 ${
                      err.gender ? "border-red-400" : ""
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    <option value="Erkek">{t("male")}</option>
                    <option value="Kadın">{t("female")}</option>
                  </select>
                  {err.gender && (
                    <p className="text-xs text-red-500 mt-1">{err.gender}</p>
                  )}
                </div>

                {/* T.C. Kimlik No */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    {t("idNumber")}
                  </label>
                  <input
                    inputMode="numeric"
                    maxLength={11}
                    value={p.idNumber}
                    onChange={(e) =>
                      handleInputChange(p.seatNo, "idNumber", e.target.value)
                    }
                    placeholder={t("idPlaceholder")}
                    className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#c4001d]/60 ${
                      err.idNumber ? "border-red-400" : ""
                    }`}
                  />
                  {err.idNumber && (
                    <p className="text-xs text-red-500 mt-1">{err.idNumber}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isValid && (
        <div className="mt-4 text-sm text-red-600">
          {t("requiredFields")}
        </div>
      )}
    </div>
  );
}
