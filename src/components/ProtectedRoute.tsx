import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * Wraps protected routes. When Clerk is configured, redirects unauthenticated
 * users to /login. When running in demo mode (no key), passes through freely.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!CLERK_ENABLED) return <>{children}</>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    // Clerk is initialising — show a minimal spinner
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
