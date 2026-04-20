import { useState } from "react";
import { Award, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialLink: string;
}

const CertificationsTab = () => {
  const [items, setItems] = useState<Certification[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Certification | null }>({ open: false, item: null });
  const [form, setForm] = useState({ name: "", issuer: "", date: "", credentialLink: "" });

  const handleSave = () => {
    if (!form.name) return;
    setItems((p) => [...p, { ...form, id: Date.now() }]);
    setForm({ name: "", issuer: "", date: "", credentialLink: "" });
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    const item = items.find(i => i.id === id);
    setDeleteDialog({ open: true, item });
  };

  const confirmDelete = () => {
    if (deleteDialog.item) {
      setItems((p) => p.filter((i) => i.id !== deleteDialog.item!.id));
    }
  };

  return (
    <>
      <SectionCard icon={Award} title="Certifications" subtitle="Add your professional certifications." onAdd={() => setOpen(true)} addLabel="Add Certification">
        {items.length === 0 ? (
          <EmptyState message="No certifications added yet" actionLabel="Add your first certification" onAction={() => setOpen(true)} />
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate Name</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Credential Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.issuer}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.credentialLink && (
                        <a href={item.credentialLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">View</a>
                      )}
                    </TableCell>
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

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Certification" onSave={handleSave}>
        <div className="space-y-2">
          <Label>Certificate Name</Label>
          <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="AWS Solutions Architect" />
        </div>
        <div className="space-y-2">
          <Label>Issuer</Label>
          <Input value={form.issuer} onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))} placeholder="Amazon" />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} placeholder="2024" />
        </div>
        <div className="space-y-2">
          <Label>Credential Link</Label>
          <Input value={form.credentialLink} onChange={(e) => setForm((p) => ({ ...p, credentialLink: e.target.value }))} placeholder="https://..." />
        </div>
      </ProfileModal>

      <ConfirmDeleteDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Certification"
        description="This will permanently remove this certification from your profile."
        itemName={deleteDialog.item?.name}
      />
    </>
  );
};

export default CertificationsTab;
