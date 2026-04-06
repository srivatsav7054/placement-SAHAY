import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  index: number;
}

const StatCard = ({ title, value, description, icon: Icon, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Card className="p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-heading text-3xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground/70">{description}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  </motion.div>
);

export default StatCard;
