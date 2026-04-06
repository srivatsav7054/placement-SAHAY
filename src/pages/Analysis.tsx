import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileSearch, TrendingUp } from "lucide-react";
import JobMatchTab from "@/components/analysis/JobMatchTab";
import ATSScoreTab from "@/components/analysis/ATSScoreTab";
import CareerInsightsTab from "@/components/analysis/CareerInsightsTab";

const Analysis = () => (
  <MobileSidebarProvider>
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Analysis</h1>
            <p className="text-sm text-muted-foreground mt-1">Paste → Click → Insight → Improve</p>
          </div>

          <Tabs defaultValue="job-match" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="job-match" className="gap-1.5">
                <Briefcase className="h-4 w-4" /> Job Match
              </TabsTrigger>
              <TabsTrigger value="ats-score" className="gap-1.5">
                <FileSearch className="h-4 w-4" /> ATS Score
              </TabsTrigger>
              <TabsTrigger value="career-insights" className="gap-1.5">
                <TrendingUp className="h-4 w-4" /> Career Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="job-match">
              <JobMatchTab />
            </TabsContent>
            <TabsContent value="ats-score">
              <ATSScoreTab />
            </TabsContent>
            <TabsContent value="career-insights">
              <CareerInsightsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  </MobileSidebarProvider>
);

export default Analysis;
