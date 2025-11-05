import { useEffect, useState } from "react";
import { getSeatSchema } from "../services/seatService";
import type { SeatSchema } from "../services/seatService";

export function useSeatSchema(tripId: string) {
  const [schema, setSchema] = useState<SeatSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;
    getSeatSchema(tripId)
      .then((data) => {
        setSchema(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Koltuk planı yüklenemedi");
        setLoading(false);
      });
  }, [tripId]);

  return { schema, loading, error };
}
