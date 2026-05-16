import { apiRequest } from "@/services/api";
import type { DashboardSummary } from "@/types/api";

export const getDashboardSummary = async (userId: string) => {
  try {
    return await apiRequest<DashboardSummary>(`/users/${userId}/dashboard-summary`);
  } catch (error) {
    console.error("Failed to fetch dashboard summary", error);
    throw error;
  }
};
