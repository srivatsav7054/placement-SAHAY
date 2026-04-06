import { motion } from "framer-motion";

const ProductPreviewSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            See It in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A powerful yet simple interface designed for results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 mx-auto max-w-4xl"
        >
          <div className="aspect-video rounded-2xl border border-border bg-card shadow-card-hover flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                📊
              </div>
              <p className="font-heading font-semibold">Product Screenshot</p>
              <p className="text-sm mt-1">Add your app preview or demo here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
