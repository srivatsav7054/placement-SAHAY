import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ProductPreviewSection from "@/components/landing/ProductPreviewSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import CommunityCTASection from "@/components/landing/CommunityCTASection";
import Footer from "@/components/landing/Footer";
import { AuthModal, type AuthMode } from "@/components/landing/AuthModal";

const Index = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  // Re-export so sections can trigger it easily
  const handleOpenSignup = () => navigate("/dashboard");
  const handleOpenLogin = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-background relative">
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
      
      <Navbar 
        onOpenLogin={handleOpenLogin} 
        onOpenSignup={handleOpenSignup} 
      />
      <HeroSection 
        onOpenSignup={handleOpenSignup} 
      />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductPreviewSection />
      <BenefitsSection />
      <CommunityCTASection 
        onOpenSignup={handleOpenSignup}
      />
      <Footer />
    </div>
  );
};

export default Index;
