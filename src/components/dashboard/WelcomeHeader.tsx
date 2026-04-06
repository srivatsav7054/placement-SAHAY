import { motion } from "framer-motion";

const WelcomeHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h1 className="font-heading text-3xl font-bold text-foreground">
      Welcome back! 👋
    </h1>
    <p className="mt-1 text-muted-foreground">
      Here's an overview of your resume and profile activity
    </p>
  </motion.div>
);

export default WelcomeHeader;
