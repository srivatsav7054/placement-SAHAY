import { motion } from "framer-motion";
import { FileText, ScanSearch, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const activities = [
  { text: "Updated resume", sub: "Software Engineer Resume", time: "2 hours ago", icon: FileText },
  { text: "Analyzed resume", sub: "Data Analyst Resume", time: "1 day ago", icon: ScanSearch },
  { text: "Profile updated", sub: "Added new skills", time: "3 days ago", icon: UserCheck },
];

const RecentActivity = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 }}
  >
    <Card className="p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-foreground">Recent Activity</h3>
      <ul className="mt-4 space-y-4">
        {activities.map((a, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <a.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.sub}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  </motion.div>
);

export default RecentActivity;
