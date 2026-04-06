import { useState } from "react";
import { Code2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionCard from "./SectionCard";

const SkillsTab = () => {
  const [skills, setSkills] = useState<string[]>(["React", "Java", "Python"]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((p) => [...p, trimmed]);
      setInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills((p) => p.filter((s) => s !== skill));

  return (
    <SectionCard icon={Code2} title="Skills" subtitle="Add your technical and soft skills.">
      <div className="flex items-center gap-2 mb-5">
        <Input
          placeholder="Type a skill and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm cursor-default">
            {skill}
            <button onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground py-8">No skills added yet. Type above to add your first skill.</p>
        )}
      </div>
    </SectionCard>
  );
};

export default SkillsTab;
