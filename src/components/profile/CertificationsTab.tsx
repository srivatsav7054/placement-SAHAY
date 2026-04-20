import { useState, useEffect } from "react";
import { Award, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, Certification } from "@/lib/api";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import ProfileModal from "./ProfileModal";

const DEMO_USER_ID = "demo-user-123";

const CertificationsTab = () => {
  const { user: clerkUser } = useUser();
  const userId = clerkUser?.id || DEMO_USER_ID;

  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", issuer: "", date: "", link: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await api.getCertifications(userId);
        setItems(data);
      } catch (error) {
        toast.error("Failed to load certifications");
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, [userId]);

  const handleSave = async () => {
    if (!form.name || !form.issuer || !form.date) {
      toast.error("Please fill Name, Issuer, and Date");
      return;
    }
    
    setSaving(true);
    try {
      const saved = await api.addCertification(userId, form);
      setItems((p) => [...p, saved]);
      setForm({ name: "", issuer: "", date: "", link: "" });
      setOpen(false);
      toast.success("Certification added successfully");
    } catch (error) {
      toast.error("Failed to add certification");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (certId?: string) => {
    if (!certId) return;
    try {
      await api.deleteCertification(userId, certId);
      setItems((p) => p.filter((i) => i._id !== certId));
      toast.success("Entry removed");
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  return (
    <>
      <SectionCard icon={Award} title="Certifications" subtitle="Add your professional certifications." onAdd={() => setOpen(true)} addLabel="Add Certification">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
          </div>
        ) : items.length === 0 ? (
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
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.issuer}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">View</a>
                      )}
                    </TableCell>
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

      <ProfileModal open={open} onClose={() => setOpen(false)} title="Add Certification" onSave={handleSave} saving={saving}>
        <div className="space-y-4">
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
            <Input value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://..." />
          </div>
        </div>
      </ProfileModal>
    </>
  );
};

export default CertificationsTab;
