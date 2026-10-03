const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=44.058174&longitude=-121.315308&hourly=temperature_2m&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit";
type WeatherResponse = {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
};
export async function GET() {
    const response = await fetch(OPEN_METEO_URL);
    const data = await response.json();
    const result: WeatherResponse = {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
    }
    return Response.json(result);
  }

