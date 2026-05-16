import { motion } from "framer-motion";
import {
  UserCog,
  FileText,
  Upload,
  ScanSearch,
  Code,
  FolderPlus,
  Award,
  CloudSun,
  CheckSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { label: "Edit Profile", icon: UserCog, route: "/profile" },
  { label: "Create Resume", icon: FileText, route: "/resume-builder" },
  { label: "Upload Resume", icon: Upload, route: "/resume-builder" },
  { label: "Analyze Resume", icon: ScanSearch, route: "/analysis" },
];

const utilityActions = [
  { label: "Weather", icon: CloudSun, route: "/weather" },
  { label: "To-do", icon: CheckSquare, route: "/todo" },
  { label: "Add Skills", icon: Code, route: "/profile?tab=skills" },
  { label: "Add Projects", icon: FolderPlus, route: "/profile?tab=projects" },
  { label: "Add Certificates", icon: Award, route: "/profile?tab=certifications" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
      className="grid grid-cols-1 gap-4 lg:grid-cols-5"
    >
      <Card className="p-5 shadow-card lg:col-span-3">
        <h3 className="font-heading text-base font-semibold text-foreground">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <action.icon className="h-4 w-4 text-muted-foreground" />
              {action.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5 shadow-card lg:col-span-2">
        <h3 className="font-heading text-base font-semibold text-foreground">Utilities</h3>
        <div className="mt-4 space-y-3">
          {utilityActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <action.icon className="h-4 w-4 text-muted-foreground" />
              {action.label}
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
