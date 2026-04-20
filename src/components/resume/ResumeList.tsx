import { Plus, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResumeData } from "./resumeTypes";

interface ResumeListProps {
  resumes: ResumeData[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const ResumeList = ({ resumes, activeId, onSelect, onCreate, onDelete }: ResumeListProps) => (
  <div className="flex flex-col h-full border-r border-border bg-card">
    <div className="p-4 border-b border-border">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Your Resumes</h3>
      <Button onClick={onCreate} size="sm" className="w-full gap-1.5">
        <Plus className="h-4 w-4" /> Create Resume
      </Button>
    </div>
    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {resumes.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-8">No resumes yet. Create one!</p>
      )}
      {resumes.map((resume) => (
        <div
          key={resume.id}
          onClick={() => onSelect(resume.id)}
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors group",
            activeId === resume.id ? "bg-primary/10 text-primary" : "hover:bg-secondary text-foreground"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{resume.name}</p>
              <p className="text-[10px] text-muted-foreground">{resume.updatedAt}</p>
            </div>
          </div>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete(resume.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-destructive transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ResumeList;
