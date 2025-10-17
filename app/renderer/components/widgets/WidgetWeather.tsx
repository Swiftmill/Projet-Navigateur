import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function WidgetWeather({ city }: { city: string }) {
  const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) {
          return;
        }
        const response = await axios.get(API_URL, {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric',
            lang: 'fr'
          }
        });
        setWeather({
          temp: response.data.main.temp,
          description: response.data.weather[0].description
        });
      } catch (error) {
        console.warn('Weather API error', error);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-5 text-slate-100 shadow-xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400">Météo</p>
      <p className="mt-2 text-4xl font-semibold">
        {weather ? `${Math.round(weather.temp)}°C` : '—°C'}
      </p>
      <p className="text-sm text-slate-400">{weather?.description ?? 'Configurez votre clé API'}</p>
    </div>
  );
}
