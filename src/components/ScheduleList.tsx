import { useState, useMemo } from "react";
import { useSchedules } from "../hooks/useSchedules";

interface ScheduleListProps {
  onTripSelect: (tripId: string) => void;
}

export default function ScheduleList({ onTripSelect }: ScheduleListProps) {
  const { schedules, loading, error } = useSchedules();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [companyFilter, setCompanyFilter] = useState<string>("");

  const filteredAndSorted = useMemo(() => {
    let filtered = schedules;
    if (companyFilter) {
      filtered = filtered.filter((t) =>
        t.company.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }
    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [schedules, sortOrder, companyFilter]);

  if (loading) return <p>Seferler yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-lg font-semibold">Uygun Seferler</h2>

        <div className="flex gap-3">
          {/* Firma filtreleme */}
          <input
            type="text"
            placeholder="Firma ara..."
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-[#c4001d]/60"
          />

          {/* Sıralama butonu */}
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="text-sm border rounded-lg px-3 py-1 hover:bg-gray-100 transition"
          >
            {sortOrder === "asc" ? "Artan Fiyat" : "Azalan Fiyat"}
          </button>
        </div>
      </div>

      {filteredAndSorted.map((trip) => (
        <div
          key={trip.id}
          className="flex justify-between items-center border-b last:border-none py-3"
        >
          <div>
            <p className="font-medium">{trip.company}</p>
            <p className="text-gray-600 text-sm">
              {trip.from} → {trip.to}
            </p>
            <p className="text-gray-500 text-xs">
              Kalkış:{" "}
              {new Date(trip.departure).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              — Varış:{" "}
              {new Date(trip.arrival).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#c4001d]">{trip.price} TL</span>
            <button
              onClick={() => onTripSelect(trip.id)}
              className="bg-[#c4001d] hover:bg-[#a80018] text-white px-5 py-2 rounded-full font-medium transition"
            >
              Koltuk Seç
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
