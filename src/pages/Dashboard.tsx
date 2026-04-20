import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardSummary();

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto space-y-5 px-4 md:px-6 py-3 md:py-4">
            <WelcomeHeader />

            {isLoading && (
              <Card className="p-5 text-sm text-muted-foreground shadow-card">
                Loading your dashboard snapshot...
              </Card>
            )}

            {isError && !data && (
              <Card className="p-5 text-sm text-destructive shadow-card">
                Dashboard data could not be loaded.
              </Card>
            )}

            {data && (
              <>
                <StatsGrid summary={data} />
                <QuickActions />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <RecentActivity activities={data.recentActivity} />
                  </div>
                  <div className="lg:col-span-2">
                    <AIInsights />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Dashboard;
