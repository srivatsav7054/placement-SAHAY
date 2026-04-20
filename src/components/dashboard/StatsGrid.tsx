import { TrendingUp, RefreshCw, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const anim = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.08 },
});

const StatsGrid = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <motion.div {...anim(0)}>
      <Card className="flex h-full flex-col justify-between p-5 shadow-card">
        <p className="text-sm font-medium text-muted-foreground">Highest ATS Score</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="font-heading text-3xl font-bold text-foreground">92%</p>
            <a href="#" className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View resume ↗
            </a>
          </div>
          <div className="rounded-full bg-primary/10 p-2.5">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>

    <motion.div {...anim(1)}>
      <Card className="flex h-full flex-col justify-between p-5 shadow-card">
        <p className="text-sm font-medium text-muted-foreground">Latest ATS Score</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="font-heading text-3xl font-bold text-foreground">87%</p>
            <a href="#" className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View resume ↗
            </a>
          </div>
          <div className="rounded-full bg-accent/10 p-2.5">
            <RefreshCw className="h-5 w-5 text-accent" />
          </div>
        </div>
      </Card>
    </motion.div>

    <motion.div {...anim(2)}>
      <Card className="flex h-full flex-col justify-between p-5 shadow-card">
        <p className="text-sm font-medium text-muted-foreground">Total Resume Count</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="font-heading text-3xl font-bold text-foreground">12</p>
          <div className="rounded-full bg-secondary p-2.5">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </Card>
    </motion.div>

    <motion.div {...anim(3)}>
      <Card className="flex h-full flex-col justify-between p-5 shadow-card">
        <p className="text-sm font-medium text-muted-foreground">Profile Completion</p>
        <p className="mt-2 font-heading text-3xl font-bold text-foreground">78%</p>
        <Progress value={78} className="mt-3 h-2.5" />
      </Card>
    </motion.div>
  </div>
);

export default StatsGrid;
