import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Automatically bypass login and go to dashboard
    navigate("/dashboard");
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No auth check — just go to dashboard
    navigate("/dashboard");
  };

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
        {/* Header */}
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

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/60 border border-white/20 p-8 w-full space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2e3336] block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777b7f] w-4 h-4" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-[#eceef1] rounded-xl py-3 pl-10 pr-4 text-[#2e3336] focus:outline-none focus:ring-2 focus:ring-[#a4b1ff] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2e3336] block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777b7f] w-4 h-4" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#eceef1] rounded-xl py-3 pl-10 pr-10 text-[#2e3336] focus:outline-none focus:ring-2 focus:ring-[#a4b1ff] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777b7f]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            id="login-submit"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#4d5aa1] hover:bg-[#414e94] text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
