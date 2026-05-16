import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const insights = [
  {
    title: "ATS Improvement",
    text: "Your average ATS score improved by 12% this month",
    icon: TrendingUp,
    color: "bg-primary/10 text-primary",
  },
];

const AIInsights = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.55 }}
  >
    <Card className="p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-foreground">Insights</h3>
      <div className="mt-4 space-y-3">
        {insights.map((item) => (
          <div key={item.title} className={`rounded-lg ${item.color} p-4`}>
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-semibold">{item.title}</span>
            </div>
            <p className="mt-1 text-xs opacity-80">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  </motion.div>
);

export default AIInsights;
