import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services/utilityService";

export const useWeather = () =>
  useQuery({
    queryKey: ["weather"],
    queryFn: getWeather,
  });
