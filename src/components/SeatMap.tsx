import React, { useMemo, useState } from "react";

interface Seat {
  no: number;
  type: "empty" | "male" | "female";
  isDoor?: boolean;
}

interface SeatMapProps {
  selectedSeats: number[];
  onSelectSeat: (seatNo: number) => void;
}

function SeatMapComponent({ selectedSeats, onSelectSeat }: SeatMapProps) {
  const totalSeats = 38;
  const DOOR_ROW = 5;
  const [showPopup, setShowPopup] = useState(false);

  // 🧠 Koltuklar yalnızca 1 kez hesaplanır
  const seats = useMemo<Seat[]>(
    () =>
      Array.from({ length: totalSeats }, (_, i) => {
        const no = i + 1;
        return {
          no,
          type: no % 7 === 0 ? "male" : no % 9 === 0 ? "female" : "empty",
        };
      }),
    []
  );

  const handleClick = (seat: Seat) => {
    if (seat.type !== "empty" || seat.isDoor) return;

    if (selectedSeats.includes(seat.no)) {
      onSelectSeat(seat.no);
      return;
    }

    if (selectedSeats.length >= 4) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }

    onSelectSeat(seat.no);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isDoor) return "bg-amber-200 text-gray-700 border-dashed";
    if (selectedSeats.includes(seat.no)) return "bg-green-500 text-white";
    switch (seat.type) {
      case "male":
        return "bg-blue-400 text-white cursor-not-allowed";
      case "female":
        return "bg-pink-400 text-white cursor-not-allowed";
      default:
        return "bg-white hover:bg-gray-100";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {showPopup && (
        <div className="fixed top-5 right-5 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg text-sm animate-fade-in z-50">
          En fazla 4 koltuk seçebilirsiniz!
        </div>
      )}

      <div className="bg-gray-50 rounded-[40px] border-4 border-gray-300 shadow-inner px-8 py-10 w-fit relative">
        {/* 🧩 Legend - Renk Açıklaması */}
        <div className="flex justify-center gap-4 mt-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm border" /> Seçilen
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded-sm border" /> Erkek
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-400 rounded-sm border" /> Kadın
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border rounded-sm" /> Boş
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[85%] bg-gradient-to-b from-gray-200 to-gray-50 w-40 h-10 rounded-t-full border border-gray-300 flex items-center justify-center text-gray-600 text-sm">
          🪟 Ön Cam
        </div>

        <div className="absolute top-[20px] left-[35px] text-2xl">🛞</div>

        <div className="flex flex-col gap-3 mt-8">
          {Array.from({ length: Math.ceil(totalSeats / 4) }, (_, rowIndex) => {
            let base = rowIndex * 4;
            const rowSeats = seats.slice(base, base + 4);

            if (rowIndex === DOOR_ROW) {
              return (
                <div
                  key={`door-${rowIndex}`}
                  className="flex justify-between gap-10 items-center"
                >
                  <div className="flex gap-2">
                    {rowSeats.slice(0, 2).map((seat) => (
                      <button
                        key={seat.no}
                        onClick={() => handleClick(seat)}
                        className={`w-10 h-10 rounded-md border font-semibold text-sm flex items-center justify-center ${getSeatColor(
                          seat
                        )}`}
                      >
                        {seat.no}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-12 bg-amber-200 border border-gray-400 rounded-md flex items-center justify-center text-gray-700 text-xs">
                      🚪
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={rowIndex}
                className="flex justify-between gap-10 items-center"
              >
                <div className="flex gap-2">
                  {rowSeats.slice(0, 2).map((seat) => (
                    <button
                      key={seat.no}
                      onClick={() => handleClick(seat)}
                      className={`w-10 h-10 rounded-md border font-semibold text-sm flex items-center justify-center ${getSeatColor(
                        seat
                      )}`}
                    >
                      {seat.no}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {rowSeats.slice(2, 4).map((seat) => (
                    <button
                      key={seat.no}
                      onClick={() => handleClick(seat)}
                      className={`w-10 h-10 rounded-md border font-semibold text-sm flex items-center justify-center ${getSeatColor(
                        seat
                      )}`}
                    >
                      {seat.no}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 🔒 React.memo ile sarmalıyoruz
export default React.memo(SeatMapComponent);
