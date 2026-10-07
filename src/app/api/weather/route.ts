import type { WeatherResponse } from '@/lib/types';

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const latitudeParam = searchParams.get('latitude');
    const longitudeParam = searchParams.get('longitude');

    if (!latitudeParam || !longitudeParam) {
        return Response.json(
            { error: "Latitude and longitude are required" },
            { status: 400 }
        );
    }

    const lat = Number(latitudeParam);
    const long = Number(longitudeParam);

    const latitudeIsValid = !Number.isNaN(lat) && lat >= -90 && lat <= 90;
    const longitudeIsValid = !Number.isNaN(long) && long >= -180 && long <= 180;

    if (!latitudeIsValid || !longitudeIsValid) {
        return Response.json(
            { error: "Latitude and longitude must be valid coordinates" },
            { status: 400 }
        );
    }

    const openMeteoURL = `${OPEN_METEO_BASE_URL}?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit`;

    try {
        const response = await fetch(openMeteoURL, {
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

