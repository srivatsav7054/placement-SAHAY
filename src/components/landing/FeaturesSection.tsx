import { motion } from "framer-motion";
import { FileText, Search, BarChart3, Route, BookOpen, Users } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional, ATS-friendly resumes with our intuitive builder and smart templates.",
  },
  {
    icon: Search,
    title: "AI Job Matching",
    description: "Get matched with relevant opportunities based on your skills, experience, and preferences.",
  },
  {
    icon: BarChart3,
    title: "ATS Score Checker",
    description: "Instantly analyze your resume against ATS systems and get actionable improvement tips.",
  },
  {
    icon: Route,
    title: "Skill Gap Analysis",
    description: "Identify missing skills for your target role and get personalized learning recommendations.",
  },
  {
    icon: BookOpen,
    title: "Career Roadmap",
    description: "Get a step-by-step plan to reach your career goals with milestones and timelines.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with industry mentors who can guide you through your career journey.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to Get Placed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed to give you an unfair advantage in your job search.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
