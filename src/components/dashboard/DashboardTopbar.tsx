import { Bell, User, Menu } from "lucide-react";
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
  "/settings": "Settings",
};

const DashboardTopbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setOpen } = useMobileSidebar();
  const title = pageTitles[location.pathname] || "Dashboard";

  // Only call useAuth when Clerk is enabled
  const auth = CLERK_ENABLED ? useAuth() : null; // eslint-disable-line react-hooks/rules-of-hooks
  const isSignedIn = auth?.isSignedIn;

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-xl px-4 md:px-6 py-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* Show Clerk UserButton if signed in, else fall back to profile icon */}
        {CLERK_ENABLED && isSignedIn ? (
          <div className="ml-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <User className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default DashboardTopbar;
