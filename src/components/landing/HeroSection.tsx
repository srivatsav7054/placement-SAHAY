import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenSignup?: () => void;
}

const HeroSection = ({ onOpenSignup }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden h-screen min-h-[600px] w-full flex items-center bg-slate-900 border-none m-0 p-0">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-227-large.mp4" type="video/mp4" />
      </video>

      {/* Deep Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

      {/* Foreground Content */}
      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm text-slate-200 shadow-xl">
            <span className="h-2 w-2 rounded-full bg-primary" />
            AI-Powered Career Platform
          </div>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
            Build Job-Ready Resumes with{" "}
            <span className="text-primary">AI</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-xl">
            Analyze, improve, and get hired faster. Your all-in-one placement
            companion — from resume building to landing your dream job.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 text-base font-semibold"
              onClick={(e) => { e.preventDefault(); onOpenSignup?.(); }}
            >
              Get Started <ArrowRight size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-sm"
              onClick={(e) => {
                 e.preventDefault();
                 document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play size={16} /> View Demo
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-slate-400 font-medium">
            <span>✓ Free to start</span>
            <span>✓ No credit card</span>
            <span>✓ AI-powered accuracy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
