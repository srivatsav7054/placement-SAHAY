import { useState } from "react";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  dates: string;
}

const EducationTab = () => {
  const [items, setItems] = useState<Education[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ institution: "", degree: "", field: "", dates: "" });

  const handleSave = () => {
    if (!form.institution) return;
    setItems((p) => [...p, { ...form, id: Date.now() }]);
    setForm({ institution: "", degree: "", field: "", dates: "" });
    setOpen(false);
  };

  const handleDelete = (id: number) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <>
      <SectionCard icon={GraduationCap} title="Education" subtitle="Add your academic background here." onAdd={() => setOpen(true)} addLabel="Add Education">
        {items.length === 0 ? (
          <EmptyState message="No education added yet" actionLabel="Add your first education" onAction={() => setOpen(true)} />
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Field of Study</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.institution}</TableCell>
                    <TableCell>{item.degree}</TableCell>
                    <TableCell>{item.field}</TableCell>
                    <TableCell>{item.dates}</TableCell>
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

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Education" onSave={handleSave}>
        <div className="space-y-2">
          <Label>Institution</Label>
          <Input value={form.institution} onChange={(e) => setForm((p) => ({ ...p, institution: e.target.value }))} placeholder="MIT" />
        </div>
        <div className="space-y-2">
          <Label>Degree</Label>
          <Input value={form.degree} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} placeholder="B.Tech" />
        </div>
        <div className="space-y-2">
          <Label>Field of Study</Label>
          <Input value={form.field} onChange={(e) => setForm((p) => ({ ...p, field: e.target.value }))} placeholder="Computer Science" />
        </div>
        <div className="space-y-2">
          <Label>Dates</Label>
          <Input value={form.dates} onChange={(e) => setForm((p) => ({ ...p, dates: e.target.value }))} placeholder="2020 - 2024" />
        </div>
      </ProfileModal>
    </>
  );
};

export default EducationTab;
