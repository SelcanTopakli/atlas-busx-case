// src/services/seatService.ts
export interface Seat {
  no: number;
  row: number;
  col: number;
  status: "empty" | "taken";
}

export interface SeatSchema {
  tripId: string;
  layout: {
    rows: number;
    cols: number;
    cells: (0 | 1 | 2 | 3)[][];
  };
  seats: Seat[];
  unitPrice: number;
}

// Mock veriyi getirir
export async function getSeatSchema(tripId: string): Promise<SeatSchema> {
  const res = await fetch(`http://localhost:3000/seatSchemas?tripId=${tripId}`);
  if (!res.ok) throw new Error("Koltuk verisi alınamadı");
  const data = await res.json();
  return data[0];
}
