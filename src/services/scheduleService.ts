
// src/services/scheduleService.ts
export interface Schedule {
  id: string;
  company: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  availableSeats: number;
}

export async function getSchedules(): Promise<Schedule[]> {
  const res = await fetch("http://localhost:3000/schedules");
  if (!res.ok) throw new Error("Sefer verileri alınamadı");
  return res.json();
}
