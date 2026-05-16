import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { useWeather } from "@/hooks/useWeather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Droplets, Wind } from "lucide-react";

const Weather = () => {
  const { data, isLoading, isError } = useWeather();

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 shadow-card">
                <CardHeader>
                  <CardTitle>Weather Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading && <p className="text-sm text-muted-foreground">Loading weather widget...</p>}
                  {isError && !data && <p className="text-sm text-destructive">Weather data is unavailable right now.</p>}
                  {data && (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-xl bg-primary/5 p-5">
                        <CloudSun className="h-6 w-6 text-primary" />
                        <p className="mt-3 text-sm text-muted-foreground">{data.city}</p>
                        <p className="font-heading text-4xl font-bold text-foreground">{data.temperatureCelsius}°C</p>
                        <p className="text-sm text-muted-foreground">{data.condition}</p>
                      </div>
                      <div className="rounded-xl bg-secondary p-5">
                        <Droplets className="h-6 w-6 text-primary" />
                        <p className="mt-3 text-sm text-muted-foreground">Humidity</p>
                        <p className="font-heading text-3xl font-bold text-foreground">{data.humidity}%</p>
                      </div>
                      <div className="rounded-xl bg-secondary p-5">
                        <Wind className="h-6 w-6 text-primary" />
                        <p className="mt-3 text-sm text-muted-foreground">Wind Speed</p>
                        <p className="font-heading text-3xl font-bold text-foreground">{data.windKph} kph</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>This page uses static dummy API data by design for the MVP utility module.</p>
                  <p>Swap the frontend service or backend utility route later if you want a live weather provider.</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Weather;
