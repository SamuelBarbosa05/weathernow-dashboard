import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const getWeatherByCity = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: city,
      aqi: "no",
    },
  });

  return response.data;
};