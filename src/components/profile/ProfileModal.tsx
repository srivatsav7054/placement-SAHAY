import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onSave: () => void;
  children: ReactNode;
}

const ProfileModal = ({ open, onClose, title, onSave, children }: ProfileModalProps) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-2">{children}</div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ProfileModal;
