import { useState } from "react";
import { getWeatherByCity } from "./services/weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await getWeatherByCity(city);
      setWeather(data);
      setHistory((prev) => [city, ...prev.filter((item) => item !== city)].slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Cidade não encontrada.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={
        darkMode
          ? "min-h-screen bg-slate-950 text-white flex items-center justify-center px-4"
          : "min-h-screen bg-sky-100 text-zinc-900 flex items-center justify-center px-4"
      }
    >
      <div
        className={
          darkMode
            ? "w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            : "w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        }
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">WeatherNow</h1>
            <p className={darkMode ? "text-sm text-zinc-300" : "text-sm text-zinc-600"}>
              Clima em tempo real
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={
              darkMode
                ? "rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2"
                : "rounded-2xl border border-zinc-200 bg-white px-4 py-2"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <span
              className={
                darkMode
                  ? "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  : "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              }
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Digite uma cidade..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={
                darkMode
                  ? "w-full rounded-2xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none"
                  : "w-full rounded-2xl border border-gray-300 py-3 pl-11 pr-4 outline-none"
              }
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!city.trim()}
            className="rounded-2xl bg-sky-500 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buscar
          </button>
        </div>

        {history.length > 0 && (
          <div className="mb-4">
            <p className={darkMode ? "mb-2 text-sm text-zinc-300" : "mb-2 text-sm text-zinc-600"}>
              Buscas recentes
            </p>
            <div className="flex flex-wrap gap-2">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCity(item)}
                  className={
                    darkMode
                      ? "rounded-full bg-slate-800 px-3 py-1 text-sm text-zinc-200"
                      : "rounded-full bg-gray-200 px-3 py-1 text-sm text-zinc-700"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400 border-t-transparent"></div>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {weather && (
          <div className="mt-6 space-y-4 rounded-3xl p-5 shadow-lg bg-opacity-80">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span>📍</span>
                  <h2 className="text-2xl font-semibold">{weather.location.name}</h2>
                </div>
                <p className={darkMode ? "text-zinc-300" : "text-zinc-600"}>
                  {weather.location.country}
                </p>
              </div>

              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="h-20 w-20"
              />
            </div>

            <div className="text-center">
              <p className="text-5xl font-bold">{weather.current.temp_c}°C</p>
              <p className={darkMode ? "mt-2 text-lg text-zinc-300" : "mt-2 text-lg text-zinc-600"}>
                {weather.current.condition.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={darkMode ? "rounded-2xl bg-slate-800 p-4" : "rounded-2xl bg-gray-100 p-4"}>
                <div className="mb-2 flex items-center gap-2">
                  <span>💧</span>
                  <span className={darkMode ? "text-sm text-zinc-300" : "text-sm text-zinc-600"}>
                    Umidade
                  </span>
                </div>
                <p className="text-xl font-semibold">{weather.current.humidity}%</p>
              </div>

              <div className={darkMode ? "rounded-2xl bg-slate-800 p-4" : "rounded-2xl bg-gray-100 p-4"}>
                <div className="mb-2 flex items-center gap-2">
                  <span>🌬️</span>
                  <span className={darkMode ? "text-sm text-zinc-300" : "text-sm text-zinc-600"}>
                    Vento
                  </span>
                </div>
                <p className="text-xl font-semibold">{weather.current.wind_kph} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;