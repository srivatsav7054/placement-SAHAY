import { motion } from "framer-motion";

const WelcomeHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-1 hidden md:block"
  >
    <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
      Dashboard Overview
    </h1>
    <p className="mt-1 text-sm text-muted-foreground">
      A compact view of your resume, profile, and progress.
    </p>
  </motion.div>
);

export default WelcomeHeader;
