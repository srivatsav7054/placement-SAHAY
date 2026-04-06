import { motion } from "framer-motion";

const mentors = [
  { emoji: "👨‍💼", name: "Mentor Name", role: "Role / Company" },
  { emoji: "👩‍💻", name: "Mentor Name", role: "Role / Company" },
  { emoji: "👨‍🏫", name: "Mentor Name", role: "Role / Company" },
];

const MentorshipSection = () => {
  return (
    <section id="community" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Learn from Industry Mentors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              Connect with experienced professionals who've been where you want to go. Get guidance, feedback, and insider tips.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {mentors.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
                  {m.emoji}
                </div>
                <p className="font-heading font-semibold text-foreground text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
