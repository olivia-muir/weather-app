"use client";
import type { WeatherResponse } from "@/lib/types";

import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  return <p>Weather goes here</p>;
}
