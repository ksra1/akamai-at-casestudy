import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CalloutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

const CalloutModal = ({ open, onOpenChange, title, children }: CalloutModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-lg">{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="text-foreground space-y-3 text-sm leading-relaxed">{children}</div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
);

export default CalloutModal;
