import { useState, useEffect } from "react";
import { FolderGit2, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { api, Project } from "@/lib/api";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

const DEMO_USER_ID = "demo-user-123";

const ProjectsTab = () => {
  const { user } = useUser();
  const userId = user?.id || DEMO_USER_ID;

  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", techStack: "", link: "" });
  const [saving, setSaving] = useState(false);

  // Load projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects(userId);
        setItems(data);
      } catch (error) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [userId]);

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("Please fill all required fields (Title, Description)");
      return;
    }
    
    setSaving(true);
    const newProject = {
      title: form.title,
      description: form.description,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      link: form.link,
    };

    try {
      const saved = await api.addProject(userId, newProject);
      setItems((p) => [saved, ...p]);
      setForm({ title: "", description: "", techStack: "", link: "" });
      setOpen(false);
      toast.success("Project added successfully");
    } catch (error) {
      toast.error("Failed to add project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (projectId?: string) => {
    if (!projectId) return;
    try {
      await api.deleteProject(userId, projectId);
      setItems((p) => p.filter((i) => i._id !== projectId));
      toast.success("Project removed");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <>
      <SectionCard 
        icon={FolderGit2} 
        title="Projects" 
        subtitle="Showcase your best work." 
        onAdd={() => setOpen(true)} 
        addLabel="Add Project"
      >
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="No projects added yet" actionLabel="Add your first project" onAction={() => setOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item._id} className="rounded-lg border border-border bg-background p-5 space-y-3 flex flex-col">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item._id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2 w-fit">
                    <ExternalLink className="h-3.5 w-3.5" /> View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Project" onSave={handleSave} saving={saving}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="My Portfolio" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="A brief description..." className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label>Tech Stack (comma separated)</Label>
            <Input value={form.techStack} onChange={(e) => setForm((p) => ({ ...p, techStack: e.target.value }))} placeholder="React, Tailwind, Node.js" />
          </div>
          <div className="space-y-2">
            <Label>Project Link</Label>
            <Input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://github.com/..." />
          </div>
        </div>
      </ProfileModal>
    </>
  );
};

export default ProjectsTab;
