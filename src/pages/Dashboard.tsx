import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import ProfileCompletionCard from "@/components/dashboard/ProfileCompletionCard";
import DashboardTodo from "@/components/dashboard/DashboardTodo";
import TrendingNews from "@/components/dashboard/TrendingNews";

const Dashboard = () => (
  <MobileSidebarProvider>
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto space-y-6 px-4 md:px-6 py-6">
          <WelcomeHeader />
          <StatsGrid />
          <QuickActions />

          {/* Row 1: Recent Activity + Profile / AI sidebar */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentActivity />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <ProfileCompletionCard />
              <AIInsights />
            </div>
          </div>

          {/* Row 2: Trending News (full width or adjusted) */}
          <div className="grid grid-cols-1 gap-6">
            <TrendingNews />
          </div>
        </main>
      </div>
    </div>
  </MobileSidebarProvider>
);

export default Dashboard;
