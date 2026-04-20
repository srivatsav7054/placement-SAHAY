import { useState, useEffect } from "react";
import { GraduationCap, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, Education } from "@/lib/api";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const DEMO_USER_ID = "demo-user-123";

const EducationTab = () => {
<<<<<<< HEAD
  const { user } = useUser();
  const userId = user?.id || DEMO_USER_ID;
=======
  const [items, setItems] = useState<Education[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Education | null }>({ open: false, item: null });
  const [form, setForm] = useState({ institution: "", degree: "", field: "", dates: "" });
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8

  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ institution: "", degree: "", field: "", dates: "", grade: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await api.getEducation(userId);
        setItems(data);
      } catch (error) {
        toast.error("Failed to load education");
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, [userId]);

  const handleSave = async () => {
    if (!form.institution) {
      toast.error("Institution name is required");
      return;
    }
    
    setSaving(true);
    try {
      const saved = await api.addEducation(userId, form);
      setItems((p) => [...p, saved]);
      setForm({ institution: "", degree: "", field: "", dates: "", grade: "" });
      setOpen(false);
      toast.success("Education added successfully");
    } catch (error) {
      toast.error("Failed to add education");
    } finally {
      setSaving(false);
    }
  };

<<<<<<< HEAD
  const handleDelete = async (eduId?: string) => {
    if (!eduId) return;
    try {
      await api.deleteEducation(userId, eduId);
      setItems((p) => p.filter((i) => i._id !== eduId));
      toast.success("Entry removed");
    } catch (error) {
      toast.error("Failed to delete entry");
=======
  const handleDelete = (id: number) => {
    const item = items.find(i => i.id === id);
    setDeleteDialog({ open: true, item });
  };

  const confirmDelete = () => {
    if (deleteDialog.item) {
      setItems((p) => p.filter((i) => i.id !== deleteDialog.item!.id));
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
    }
  };

  return (
    <>
      <SectionCard icon={GraduationCap} title="Education" subtitle="Add your academic background here." onAdd={() => setOpen(true)} addLabel="Add Education">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
          </div>
        ) : items.length === 0 ? (
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
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.institution}</TableCell>
                    <TableCell>{item.degree}</TableCell>
                    <TableCell>{item.field}</TableCell>
                    <TableCell>{item.dates}</TableCell>
                    <TableCell>{item.grade}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item._id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </SectionCard>

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Education" onSave={handleSave} saving={saving}>
        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label>Grade / CGPA</Label>
            <Input value={form.grade} onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))} placeholder="8.5 CGPA or 85%" />
          </div>
        </div>
      </ProfileModal>

      <ConfirmDeleteDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Education"
        description="This will permanently remove this education entry from your profile."
        itemName={deleteDialog.item?.institution}
      />
    </>
  );
};

export default EducationTab;
