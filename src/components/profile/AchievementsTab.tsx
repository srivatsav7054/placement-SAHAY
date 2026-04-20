import { useState, useEffect } from "react";
import { Trophy, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, Achievement } from "@/lib/api";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

const DEMO_USER_ID = "demo-user-123";

const AchievementsTab = () => {
  const { user } = useUser();
  const userId = user?.id || DEMO_USER_ID;

  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [saving, setSaving] = useState(false);

  // Load achievements from backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await api.getAchievements(userId);
        setItems(data);
      } catch (error) {
        toast.error("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [userId]);

  const handleSave = async () => {
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    
    setSaving(true);
    try {
      const saved = await api.addAchievement(userId, form);
      setItems((p) => [...p, saved]);
      setForm({ title: "", description: "", date: "" });
      setOpen(false);
      toast.success("Achievement added!");
    } catch (error) {
      toast.error("Failed to add achievement");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (achId?: string) => {
    if (!achId) return;
    try {
      await api.deleteAchievement(userId, achId);
      setItems((p) => p.filter((i) => i._id !== achId));
      toast.success("Achievement removed");
    } catch (error) {
      toast.error("Failed to delete achievement");
    }
  };

  return (
    <>
      <SectionCard 
        icon={Trophy} 
        title="Achievements" 
        subtitle="Add your notable achievements and awards." 
        onAdd={() => setOpen(true)} 
        addLabel="Add Achievement"
      >
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="No achievements added yet" actionLabel="Add your first achievement" onAction={() => setOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item._id} className="rounded-lg border border-border bg-background p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item._id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="text-sm text-foreground">{item.date}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Achievement" onSave={handleSave} saving={saving}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Hackathon Winner" />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} placeholder="2024" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="A brief description of this achievement..." className="min-h-[100px]" />
          </div>
        </div>
      </ProfileModal>
    </>
  );
};

export default AchievementsTab;
