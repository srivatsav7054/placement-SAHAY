import { SignUp, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { UserPlus, Lock, Mail, User } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Fallback demo signup form (no Clerk key configured)
const DemoSignupForm = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/60 border border-white/20 p-8 w-full space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#2e3336] block">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777b7f] w-4 h-4" />
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-white border border-[#eceef1] rounded-xl py-3 pl-10 pr-4 text-[#2e3336] focus:outline-none focus:ring-2 focus:ring-[#a4b1ff] transition-all"
          />
        </div>
      </div>
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
        <UserPlus className="w-4 h-4" />
        Create Account (Demo Mode)
      </button>
      <div className="text-center mt-4">
        <span className="text-sm text-[#5b6063]">Already have an account? </span>
        <button onClick={() => navigate("/login")} className="text-sm font-semibold text-[#4d5aa1] hover:underline">
          Sign In
        </button>
      </div>
      <p className="text-center text-xs text-[#777b7f] mt-4">
        No Clerk key set — click above to explore the app freely.
      </p>
    </div>
  );
};

// Clerk SignUp widget wrapper
const ClerkSignUpWidget = () => {
  const { isSignedIn } = useAuth();

  // Already signed in → go to dashboard
  if (isSignedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex justify-center shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/30 border border-white/20">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        afterSignUpUrl="/dashboard"
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

const Signup = () => {
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
            Join SAHAY
          </h1>
          <p className="text-[#5b6063] font-['Manrope']">
            Start your journey to placement success.
          </p>
        </div>

        {CLERK_ENABLED ? <ClerkSignUpWidget /> : <DemoSignupForm />}
      </motion.div>
    </div>
  );
};

export default Signup;
