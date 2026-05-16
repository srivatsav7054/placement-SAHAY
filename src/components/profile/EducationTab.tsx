import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { updateUserProfile } from "@/services/userService";
import { toast } from "sonner";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  dates: string;
}

const GUEST_USER_ID = "guest-user";

const EducationTab = () => {
  const { data: userProfile, refetch } = useUserProfile();
  const items: Education[] = userProfile?.education || [];

  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Education | null }>({ open: false, item: null });
  const [form, setForm] = useState({ institution: "", degree: "", field: "", dates: "" });

  const handleSave = async () => {
    if (!form.institution) return;
    try {
      const newItems = [...items, { ...form, id: Date.now() }];
      await updateUserProfile(GUEST_USER_ID, { education: newItems });
      await refetch();
      setForm({ institution: "", degree: "", field: "", dates: "" });
      setOpen(false);
      toast.success("Education added");
    } catch (e: any) {
      toast.error(e.message || "Failed to save education");
    }
  };

  const handleDelete = (id: number) => {
    const item = items.find(i => i.id === id);
    setDeleteDialog({ open: true, item: item || null });
  };

  const confirmDelete = async () => {
    if (deleteDialog.item) {
      try {
        const newItems = items.filter((i) => i.id !== deleteDialog.item!.id);
        await updateUserProfile(GUEST_USER_ID, { education: newItems });
        await refetch();
        setDeleteDialog({ open: false, item: null });
        toast.success("Education deleted");
      } catch (e: any) {
        toast.error(e.message || "Failed to delete education");
      }
    }
  };

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
