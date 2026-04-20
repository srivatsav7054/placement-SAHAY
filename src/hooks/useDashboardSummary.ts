import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/services/dashboardService";
import { DEMO_USER_ID } from "@/services/mockData";

export const useDashboardSummary = (userId = DEMO_USER_ID) =>
  useQuery({
    queryKey: ["dashboard-summary", userId],
    queryFn: () => getDashboardSummary(userId),
  });
