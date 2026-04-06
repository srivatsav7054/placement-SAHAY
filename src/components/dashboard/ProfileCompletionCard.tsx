import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const missingItems = [
  "Add at least 3 more skills",
  "Add work experience",
  "Upload a profile photo",
];

const ProfileCompletionCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 }}
  >
    <Card className="p-5 shadow-card">
      <h3 className="font-heading text-lg font-semibold text-foreground">Profile Completion</h3>
      <div className="mt-3 flex items-center gap-3">
        <Progress value={65} className="h-2.5 flex-1" />
        <span className="text-sm font-semibold text-primary">65%</span>
      </div>
      <ul className="mt-4 space-y-2">
        {missingItems.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 text-destructive/70" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  </motion.div>
);

export default ProfileCompletionCard;
