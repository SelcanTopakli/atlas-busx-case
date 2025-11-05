// src/hooks/useSchedules.ts
import { useEffect, useState } from "react";
import { getSchedules, type Schedule } from "../services/scheduleService";

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSchedules()
      .then((data) => {
        setSchedules(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Veriler yüklenemedi");
        setLoading(false);
      });
  }, []);

  return { schedules, loading, error };
}
