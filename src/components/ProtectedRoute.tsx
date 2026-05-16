// Auth guard — no Clerk, all routes are open
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
