import { useState } from "react";
import { FolderGit2, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

const ProjectsTab = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", techStack: "", link: "" });

  const handleSave = () => {
    if (!form.title) return;
    setItems((p) => [
      ...p,
      {
        id: Date.now(),
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        link: form.link,
      },
    ]);
    setForm({ title: "", description: "", techStack: "", link: "" });
    setOpen(false);
  };

  const handleDelete = (id: number) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <>
      <SectionCard icon={FolderGit2} title="Projects" subtitle="Showcase your best work." onAdd={() => setOpen(true)} addLabel="Add Project">
        {items.length === 0 ? (
          <EmptyState message="No projects added yet" actionLabel="Add your first project" onAction={() => setOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-background p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" /> View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Project" onSave={handleSave}>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="My Portfolio" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="A brief description..." />
        </div>
        <div className="space-y-2">
          <Label>Tech Stack (comma separated)</Label>
          <Input value={form.techStack} onChange={(e) => setForm((p) => ({ ...p, techStack: e.target.value }))} placeholder="React, Tailwind, Node.js" />
        </div>
        <div className="space-y-2">
          <Label>Project Link</Label>
          <Input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://github.com/..." />
        </div>
      </ProfileModal>
    </>
  );
};

export default ProjectsTab;
