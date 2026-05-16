import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WindowControls = () => (
  <div className="flex gap-1.5 mb-3">
    <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
    <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
  </div>
);

const featureCards = [
  {
    title: "AI Resume Builder",
    description: "Create ATS-ready professional resumes tailored to your target role in minutes.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          Resume Builder Preview
        </div>
        <div className="flex-1 overflow-hidden space-y-4">
          <div className="w-1/3 h-5 bg-primary/20 rounded-md" />
          <div className="w-2/3 h-3 bg-muted rounded-full" />
          <div className="w-full h-3 bg-muted rounded-full" />
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="h-16 bg-secondary/60 rounded-xl" />
            <div className="h-16 bg-secondary/60 rounded-xl" />
            <div className="h-16 bg-secondary/60 rounded-xl" />
            <div className="h-16 bg-secondary/60 rounded-xl" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Job Matching Engine",
    description: "Surface the most relevant job openings accurately based on your verified profile.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          Job Matching UI Preview
        </div>
        <div className="flex-1 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-2/3 h-2.5 bg-foreground/20 rounded-full" />
                <div className="w-1/3 h-2 bg-muted rounded-full" />
              </div>
              <div className="w-16 h-6 rounded-full bg-primary/10" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "ATS Score Analyzer",
    description: "Measure resume compatibility via smart scoring and spot optimization wins fast.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          ATS Analyzer Preview
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-[6px] border-primary/20">
            <div className="absolute inset-0 rounded-full border-[6px] border-primary border-t-transparent border-l-transparent transform rotate-45" />
            <div className="text-2xl font-bold font-heading text-foreground">87%</div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Keyword Match</span>
              <span className="text-foreground font-medium">High</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
               <div className="w-4/5 h-full bg-primary" />
            </div>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-muted-foreground">Formatting</span>
              <span className="text-foreground font-medium">Perfect</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
               <div className="w-full h-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Skill Gap Detector",
    description: "See exactly which skills stand between you and your target software engineering job.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          Skill Gap UI Preview
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="col-span-2 h-20 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 p-3 flex flex-col justify-end">
             <div className="w-1/3 h-2 bg-primary/40 rounded-full mb-2" />
             <div className="w-1/2 h-4 bg-primary/60 rounded-full" />
          </div>
          <div className="h-20 rounded-xl bg-secondary/60 flex items-center justify-center px-4">
             <div className="w-full space-y-2">
                <div className="w-3/4 h-2 bg-muted-foreground/30 rounded-full" />
                <div className="w-1/2 h-2 bg-muted-foreground/30 rounded-full" />
             </div>
          </div>
          <div className="h-20 rounded-xl bg-secondary/60 flex items-center justify-center px-4">
             <div className="w-full space-y-2">
                <div className="w-5/6 h-2 bg-muted-foreground/30 rounded-full" />
                <div className="w-1/3 h-2 bg-muted-foreground/30 rounded-full" />
             </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Career Roadmap",
    description: "Follow a precisely guided path with interactive milestones for your next big move.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          Roadmap UI Preview
        </div>
        <div className="flex-1 relative flex flex-col gap-4 pl-4 border-l-2 border-primary/20 py-2">
           {[1, 2, 3].map((i, index) => (
             <div key={i} className="relative w-full h-12 bg-secondary/50 rounded-lg p-3">
                <div className="absolute -left-[23px] top-1/2 -transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-card shadow-sm" />
                <div className={`w-1/2 h-2 rounded-full ${index === 0 ? 'bg-primary/80' : 'bg-muted'}`} />
                <div className="w-1/3 h-1.5 rounded-full bg-muted mt-2" />
             </div>
           ))}
        </div>
      </div>
    ),
  },
  {
    title: "Mentorship Hub",
    description: "Connect with dedicated industry mentors for actionable feedback and strategic support.",
    mockup: (
      <div className="absolute inset-0 p-5 flex flex-col h-full bg-card">
        <WindowControls />
        <div className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
          Mentorship UI Preview
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-secondary/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20" />
                <div className="w-3/4 h-2 bg-foreground/20 rounded-full" />
                <div className="w-1/2 h-1.5 bg-muted rounded-full" />
             </div>
          ))}
        </div>
      </div>
    ),
  }
];

const ProductPreviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featureCards.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featureCards.length) % featureCards.length);
  }, []);

  useEffect(() => {
    if (!isHovered && !isDragging) {
      timerRef.current = setInterval(nextSlide, 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isDragging, nextSlide]);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    setIsDragging(false);
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -100) {
      nextSlide();
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 100) {
      prevSlide();
    }
  };

  const getCardLayout = (index: number) => {
    const diff = (index - currentIndex + featureCards.length) % featureCards.length;
    
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === featureCards.length - 1) return "left";
    return "hidden";
  };

  const variants = {
    center: { x: "0%", scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px)" },
    left: { x: "-80%", scale: 0.85, zIndex: 5, opacity: 0.6, filter: "blur(2px)" },
    right: { x: "80%", scale: 0.85, zIndex: 5, opacity: 0.6, filter: "blur(2px)" },
    hidden: { x: "0%", scale: 0.6, zIndex: 0, opacity: 0, filter: "blur(4px)" },
  };

  return (
    <section id="preview" className="scroll-mt-24 overflow-hidden bg-background py-6 md:py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-4 max-w-2xl text-center md:mb-6"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            See It in Action
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Explore the product moments that make every placement decision feel faster and smarter.
          </p>
        </motion.div>

        <div 
          className="relative flex h-[360px] w-full items-center justify-center cursor-grab active:cursor-grabbing md:h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {featureCards.map((card, index) => {
              const layout = getCardLayout(index);
              if (layout === "hidden") return null;

              return (
                <motion.article
                  key={card.title}
                  custom={layout}
                  variants={variants}
                  initial="hidden"
                  animate={layout}
                  exit="hidden"
                  transition={{ type: "spring", stiffness: 220, damping: 25, mass: 1 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  className="absolute flex h-[330px] w-[84%] max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-card/50 shadow-card backdrop-blur-xl md:h-[360px] md:w-[64%]"
                >
                  {/* Fake UI Container */}
                  <div className="relative h-[58%] w-full origin-top overflow-hidden border-b border-border/50 bg-muted/20">
                     {card.mockup}
                  </div>
                  
                  {/* Feature Text Info */}
                  <div className="flex flex-1 flex-col justify-center bg-card px-4 py-4 text-center md:px-6 md:py-5">
                    <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">
                      {card.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground md:text-base">
                      {card.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls Overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-2 md:px-10">
             <button 
                onClick={prevSlide}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
             >
                <ChevronLeft size={24} />
             </button>
             <button 
                onClick={nextSlide}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
             >
                <ChevronRight size={24} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
