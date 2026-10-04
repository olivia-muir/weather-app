import type { WeatherResponse } from '@/lib/types';

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=44.058174&longitude=-121.315308&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit";

export async function GET() {
    try {
        const response = await fetch(OPEN_METEO_URL, {
            next: { revalidate: 600 },
        });
        if (!response.ok) {
            return Response.json(
                { error: "Weather service unavailable" },
                { status: 502 }
            );
        }

        const data = await response.json();

        const result: WeatherResponse = {
            temperature: data.current.temperature_2m,
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
        };

        return Response.json(result);
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Weather service unavailable" },
            { status: 502 }
        );
    }
}

