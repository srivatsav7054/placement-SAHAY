import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ResumeData, ResumeSection } from "./resumeTypes";

interface BuilderControlsProps {
  resume: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

const templates: { id: ResumeData["template"]; label: string; desc: string }[] = [
  { id: "simple", label: "Simple", desc: "Clean & minimal" },
  { id: "modern", label: "Modern", desc: "Bold headers" },
  { id: "compact", label: "Compact", desc: "Dense layout" },
];

const BuilderControls = ({ resume, onUpdate }: BuilderControlsProps) => {
  const toggleSection = (id: string) => {
    onUpdate({
      sections: resume.sections.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    });
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    const newSections = [...resume.sections];
    const target = index + dir;
    if (target < 0 || target >= newSections.length) return;
    [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
    onUpdate({ sections: newSections });
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-6 border-r border-border bg-background">
      {/* Template */}
      <div>
        <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Template</h4>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onUpdate({ template: t.id })}
              className={cn(
                "rounded-lg border p-3 text-center transition-all",
                resume.template === t.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <p className="text-sm font-medium text-foreground">{t.label}</p>
              <p className="text-[10px] text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Section Toggles */}
      <div>
        <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Sections</h4>
        <div className="space-y-2">
          {resume.sections.map((section, i) => (
            <div key={section.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <div className="flex items-center gap-3">
                <Switch
                  checked={section.enabled}
                  onCheckedChange={() => toggleSection(section.id)}
                  id={section.id}
                />
                <Label htmlFor={section.id} className="text-sm cursor-pointer">{section.label}</Label>
              </div>
              <div className="flex gap-0.5">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(i, -1)} disabled={i === 0}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(i, 1)} disabled={i === resume.sections.length - 1}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Editor */}
      <div>
        <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Summary</h4>
        <Textarea
          value={resume.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          placeholder="Write your professional summary..."
          className="min-h-[100px] text-sm"
        />
      </div>
    </div>
  );
};

export default BuilderControls;
