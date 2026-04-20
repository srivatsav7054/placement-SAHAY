import { apiRequest } from "@/services/api";
import { mockDashboardSummary } from "@/services/mockData";
import type { DashboardSummary } from "@/types/api";

export const getDashboardSummary = async (userId: string) => {
  try {
    return await apiRequest<DashboardSummary>(`/users/${userId}/dashboard-summary`);
  } catch (error) {
    return mockDashboardSummary;
  }
};
