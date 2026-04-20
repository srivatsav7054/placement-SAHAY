import { apiRequest } from "@/services/api";
import { mockWeather } from "@/services/mockData";
import type { WeatherSummary } from "@/types/api";

export const getWeather = async () => {
  try {
    return await apiRequest<WeatherSummary>("/utilities/weather");
  } catch (error) {
    return mockWeather;
  }
};
