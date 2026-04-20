import { Bell, User, Menu, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useMobileSidebar } from "./DashboardSidebar";
import { UserButton, useAuth } from "@clerk/clerk-react";

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/resume-builder": "Resume Builder",
  "/analysis": "Analysis",
  "/community": "Community",
  "/weather": "Weather",
  "/todo": "To-do",
  "/settings": "Settings",
};

const DashboardTopbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setOpen } = useMobileSidebar();
  const title = pageTitles[location.pathname] || "Dashboard";

  const auth = CLERK_ENABLED ? useAuth() : null; // eslint-disable-line react-hooks/rules-of-hooks
  const isSignedIn = auth?.isSignedIn;

  return (
    <>
      <header className="md:hidden flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <TrendingUp className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          {CLERK_ENABLED && isSignedIn ? (
            <div className="ml-1 scale-90 origin-right">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </header>

      <div className="pointer-events-none fixed right-6 top-5 z-40 hidden md:block">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/80 bg-card/70 p-1.5 shadow-card backdrop-blur-xl">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-secondary transition-transform hover:scale-105">
            <TrendingUp className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9 hover:bg-secondary transition-transform hover:scale-105">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Button>

          {CLERK_ENABLED && isSignedIn ? (
            <div className="px-1 hover:scale-105 transition-transform">
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="rounded-full h-9 w-9 hover:bg-secondary transition-transform hover:scale-105"
            >
              <User className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTopbar;
