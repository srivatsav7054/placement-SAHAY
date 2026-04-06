import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ProductPreviewSection from "@/components/landing/ProductPreviewSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import MentorshipSection from "@/components/landing/MentorshipSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductPreviewSection />
      <BenefitsSection />
      <MentorshipSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
