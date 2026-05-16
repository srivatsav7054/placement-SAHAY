import { motion } from "framer-motion";
import { UserPlus, FileText, Brain, Rocket } from "lucide-react";

const steps = [
  { icon: UserPlus, step: "01", title: "Create Profile", description: "Sign up and tell us about your skills, experience, and career goals." },
  { icon: FileText, step: "02", title: "Build Resume", description: "Use our AI-powered builder to craft a professional, ATS-optimized resume." },
  { icon: Brain, step: "03", title: "Analyze with AI", description: "Get instant feedback, ATS scores, and personalized improvement suggestions." },
  { icon: Rocket, step: "04", title: "Improve & Apply", description: "Refine your profile and apply to matched opportunities with confidence." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-secondary/50 py-10 md:py-14">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Four simple steps to transform your job search.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
                <s.icon size={28} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Step {s.step}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
