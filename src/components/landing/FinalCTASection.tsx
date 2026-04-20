import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl bg-primary p-12 text-center text-primary-foreground shadow-card-hover md:p-16"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of students already building their future with Placement-Sahay.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2 font-semibold"
            >
              Get Started Now <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
