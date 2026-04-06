import { LucideIcon, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState = ({ icon: Icon = Inbox, message, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Icon className="h-10 w-10 text-muted-foreground/50 mb-3" />
    <p className="text-sm text-muted-foreground mb-4">{message}</p>
    <Button onClick={onAction} variant="outline" size="sm" className="gap-1.5">
      <Plus className="h-4 w-4" />
      {actionLabel}
    </Button>
  </div>
);

export default EmptyState;
