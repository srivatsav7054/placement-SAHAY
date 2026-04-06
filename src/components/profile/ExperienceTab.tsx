import { useState } from "react";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

const ExperienceTab = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", duration: "", description: "" });

  const handleSave = () => {
    if (!form.company) return;
    setItems((p) => [...p, { ...form, id: Date.now() }]);
    setForm({ company: "", role: "", duration: "", description: "" });
    setOpen(false);
  };

  const handleDelete = (id: number) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <>
      <SectionCard icon={Building2} title="Work Experience" subtitle="Add your professional work history here." onAdd={() => setOpen(true)} addLabel="Add Experience">
        {items.length === 0 ? (
          <EmptyState message="No experience added yet" actionLabel="Add your first experience" onAction={() => setOpen(true)} />
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.company}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </SectionCard>

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Experience" onSave={handleSave}>
        <div className="space-y-2">
          <Label>Company</Label>
          <Input value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} placeholder="Google" />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} placeholder="Software Engineer" />
        </div>
        <div className="space-y-2">
          <Label>Duration</Label>
          <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} placeholder="Jan 2022 - Present" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Worked on..." />
        </div>
      </ProfileModal>
    </>
  );
};

export default ExperienceTab;
