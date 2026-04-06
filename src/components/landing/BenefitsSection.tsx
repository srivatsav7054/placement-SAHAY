import { motion } from "framer-motion";
import { Layers, Clock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Layers,
    title: "All-in-One Platform",
    description: "Resume builder, job matching, mentorship — everything under one roof.",
  },
  {
    icon: Clock,
    title: "Save Hours of Guesswork",
    description: "AI does the heavy lifting so you can focus on what matters — preparing for interviews.",
  },
  {
    icon: TrendingUp,
    title: "Increase Your Selection Chances",
    description: "Data-driven insights and ATS optimization give you a measurable edge.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
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
          <p className="mt-4 text-lg text-muted-foreground">
            Built for students and job-seekers who want results, not complexity.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-card text-center"
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
