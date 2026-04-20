import { motion } from "framer-motion";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const mentors = [
  {
    name: "Aarav Mehta",
    role: "SDE Mentor",
    description: "Interview strategy, resume reviews, and product-company preparation.",
  },
  {
    name: "Riya Kapoor",
    role: "Data Mentor",
    description: "Portfolio direction, analytics roles, and skill-priority planning.",
  },
  {
    name: "Kabir Singh",
    role: "Campus Mentor",
    description: "Placement timelines, mock interviews, and confidence building.",
  },
  {
    name: "Neha Verma",
    role: "Career Coach",
    description: "Role-fit guidance and application strategy for early-career growth.",
  },
  {
    name: "Ishaan Rao",
    role: "Backend Mentor",
    description: "Project storytelling, technical depth, and recruiter-ready positioning.",
  },
];

interface CommunityCTAProps {
  onOpenSignup?: () => void;
}

const CommunityCTASection = ({ onOpenSignup }: CommunityCTAProps) => {
  return (
    <section
      id="community"
      className="min-h-screen scroll-mt-0 bg-background pt-24 pb-10 md:pb-14"
    >
      <div className="container mx-auto flex min-h-[calc(100vh-6rem)] items-center px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-center space-y-8 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Community
            </div>
            <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Learn from Industry Mentors
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
              Explore mentors who can help you sharpen your profile, prepare smarter, and move toward stronger placement outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background via-background/85 to-transparent md:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background via-background/85 to-transparent md:w-16" />

            <div className="scrollbar-hidden overflow-x-auto pb-2">
              <div className="flex w-max gap-4 px-1 md:gap-5">
                {mentors.map((mentor, index) => (
                  <motion.article
                    key={mentor.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="group w-[260px] shrink-0 rounded-[1.75rem] border border-border/80 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                  >
                    <div className="mx-auto flex w-fit rounded-full bg-[linear-gradient(135deg,rgba(20,184,166,0.24),rgba(20,184,166,0.08))] p-[2px]">
                      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-secondary/70 text-center">
                        <UserRound className="h-6 w-6 text-primary" />
                        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Mentor Photo
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 text-center">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {mentor.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">{mentor.role}</p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {mentor.description}
                      </p>
                    </div>

                    <div className="mt-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                        View Profile
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-8 text-primary-foreground shadow-card-hover md:px-10 md:py-10"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-10 -translate-y-10 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-10 translate-y-10 rounded-full bg-black/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                Ready to Land Your Dream Job?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-foreground/90 md:text-lg">
                Join SAHAY to build stronger resumes, get sharper guidance, and approach placements with more confidence.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 min-w-[180px] rounded-2xl bg-white px-6 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02] hover:bg-slate-100"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenSignup?.();
                  }}
                >
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 min-w-[180px] rounded-2xl border-white/25 bg-transparent px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-white/10 hover:text-white"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTASection;
