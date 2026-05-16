import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onAdd?: () => void;
  addLabel?: string;
  children: ReactNode;
}

const SectionCard = ({ icon: Icon, title, subtitle, onAdd, addLabel, children }: SectionCardProps) => (
  <div className="rounded-xl border border-border bg-card shadow-sm p-6">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {onAdd && (
        <Button onClick={onAdd} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          {addLabel || "Add"}
        </Button>
      )}
    </div>
    {children}
  </div>
);

export default SectionCard;
