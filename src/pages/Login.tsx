import { SignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Fallback demo login form (no Clerk key configured)
const DemoLoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/60 border border-white/20 p-8 w-full space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#2e3336] block">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777b7f] w-4 h-4" />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white border border-[#eceef1] rounded-xl py-3 pl-10 pr-4 text-[#2e3336] focus:outline-none focus:ring-2 focus:ring-[#a4b1ff] transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#2e3336] block">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777b7f] w-4 h-4" />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-[#eceef1] rounded-xl py-3 pl-10 pr-4 text-[#2e3336] focus:outline-none focus:ring-2 focus:ring-[#a4b1ff] transition-all"
          />
        </div>
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-[#4d5aa1] hover:bg-[#414e94] text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <LogIn className="w-4 h-4" />
        Sign In (Demo Mode)
      </button>
      <p className="text-center text-xs text-[#777b7f]">
        No Clerk key set — click above to explore the app freely.
      </p>
    </div>
  );
};

// Clerk SignIn widget wrapper
const ClerkSignInWidget = () => {
  const { isSignedIn } = useAuth();

  // Already signed in → go to dashboard
  if (isSignedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex justify-center shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/30 border border-white/20">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-transparent shadow-none border-none",
            headerTitle: "text-[#2e3336] font-['Plus_Jakarta_Sans']",
            headerSubtitle: "text-[#5b6063] font-['Manrope']",
            socialButtonsBlockButton:
              "border-[#eceef1] hover:bg-white/50 transition-all duration-300",
            formButtonPrimary:
              "bg-[#4d5aa1] hover:bg-[#414e94] text-white rounded-xl transition-all duration-300",
            footerActionLink: "text-[#4d5aa1] hover:text-[#414e94]",
          },
        }}
      />
    </div>
  );
};

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f9f9fb]">
      {/* Background blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-32 h-32 bg-[#A7C7E7] opacity-20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[15%] w-48 h-48 bg-[#F8C8DC] opacity-20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[5%] w-24 h-24 bg-[#a4b1ff] opacity-15 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md p-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4d5aa1]/10 rounded-2xl mb-4">
            <span className="text-3xl font-black text-[#4d5aa1]">S</span>
          </div>
          <h1 className="text-4xl font-bold text-[#2e3336] mb-2 font-['Plus_Jakarta_Sans']">
            Welcome to SAHAY
          </h1>
          <p className="text-[#5b6063] font-['Manrope']">
            The bridge to your professional future.
          </p>
        </div>

        {CLERK_ENABLED ? <ClerkSignInWidget /> : <DemoLoginForm />}
      </motion.div>
    </div>
  );
};

export default Login;
