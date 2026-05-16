import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export type AuthMode = "signIn" | "signUp" | null;

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
}

/* ─── Simple auth form (no Clerk) ───────────────────────────────────────── */
const AuthForm = ({
  mode,
  onToggle,
  onClose,
}: {
  mode: "signIn" | "signUp";
  onToggle: () => void;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const isSignUp = mode === "signUp";

  const handleSubmit = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <div className="w-full rounded-[1.75rem] border border-border/40 bg-gradient-to-b from-white to-slate-50 dark:from-card dark:to-background px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8 sm:py-8">
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignUp
            ? "Start your placement journey with SAHAY"
            : "Sign in to continue to your dashboard"}
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="auth-name" className="text-sm font-semibold">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="auth-name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="h-11 pl-10 rounded-xl border-border/70 bg-background focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="auth-email" className="text-sm font-semibold">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="h-11 pl-10 rounded-xl border-border/70 bg-background focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="auth-password" className="text-sm font-semibold">
              Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="auth-password"
              type={showPw ? "text" : "password"}
              placeholder={isSignUp ? "Min. 8 characters" : "Enter password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="h-11 pr-10 rounded-xl border-border/70 bg-background focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        className="mt-7 h-11 w-full rounded-xl gap-2 font-semibold text-sm shadow-lg"
        onClick={handleSubmit}
      >
        {isSignUp ? "Create Account" : "Sign In"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {/* Toggle */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={onToggle}
          className="font-bold text-primary hover:text-primary/80 transition-colors"
        >
          {isSignUp ? "Sign in" : "Get started"}
        </button>
      </p>
    </div>
  );
};

/* ─── Modal shell ────────────────────────────────────────────────────────── */
export const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [localMode, setLocalMode] = useState<"signIn" | "signUp">(
    mode === "signIn" ? "signIn" : "signUp"
  );

  useEffect(() => {
    if (mode) setLocalMode(mode);
  }, [mode]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = mode ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mode]);

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-3 sm:p-4 backdrop-blur-md"
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-full border border-border/60 bg-white/90 p-2 text-muted-foreground shadow-sm transition-colors hover:bg-white hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="relative flex justify-center">
              <AuthForm
                mode={localMode}
                onToggle={() =>
                  setLocalMode((m) => (m === "signIn" ? "signUp" : "signIn"))
                }
                onClose={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
