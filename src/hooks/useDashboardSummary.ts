import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/services/dashboardService";

const GUEST_USER_ID = "guest-user";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary", GUEST_USER_ID],
    queryFn: () => getDashboardSummary(GUEST_USER_ID),
  });
};
