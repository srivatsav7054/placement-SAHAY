import { apiRequest } from "@/services/api";
import type { WeatherSummary } from "@/types/api";

export const getWeather = async () => {
  try {
    return await apiRequest<WeatherSummary>("/utilities/weather");
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    throw error;
  }
};
