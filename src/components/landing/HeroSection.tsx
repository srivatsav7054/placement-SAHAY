import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-card">
              <span className="h-2 w-2 rounded-full bg-primary" />
              AI-Powered Career Platform
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Build Job-Ready Resumes with{" "}
              <span className="text-primary">AI</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Analyze, improve, and get hired faster. Your all-in-one placement
              companion — from resume building to landing your dream job.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <Play size={16} /> View Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span>✓ Free to start</span>
              <span>✓ No credit card</span>
              <span>✓ AI-powered</span>
            </div>
          </motion.div>

          {/* Right — product preview placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl border border-border bg-card shadow-card-hover flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="mx-auto mb-4 h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-2xl">
                  🖥
                </div>
                <p className="text-sm font-medium">Product Preview</p>
                <p className="text-xs mt-1">Add your screenshot here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
