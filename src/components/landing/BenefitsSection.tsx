import { motion } from "framer-motion";
import { Layers, Clock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Layers,
    title: "All-in-One Platform",
    description: "Resume builder, job matching, mentorship, and guidance under one roof.",
  },
  {
    icon: Clock,
    title: "Save Hours of Guesswork",
    description: "AI does the heavy lifting so you can focus on interview preparation.",
  },
  {
    icon: TrendingUp,
    title: "Increase Your Selection Chances",
    description: "Data-driven insights and ATS optimization give you a measurable edge.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="scroll-mt-24 bg-secondary/50 py-10 md:py-14">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Why Placement-Sahay?
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Built for students and job-seekers who want results, not complexity.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
