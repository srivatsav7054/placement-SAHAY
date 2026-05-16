import { motion } from "framer-motion";
import { FileText, ScanSearch, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardActivity } from "@/types/api";

const iconMap = [FileText, ScanSearch, UserCheck];

const RecentActivity = ({ activities }: { activities: DashboardActivity[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 }}
  >
    <Card className="p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-foreground">Recent Activity</h3>
      <ul className="mt-4 space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[index % iconMap.length];

          return (
            <li key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary p-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.target}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(activity.time).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  </motion.div>
);

export default RecentActivity;
