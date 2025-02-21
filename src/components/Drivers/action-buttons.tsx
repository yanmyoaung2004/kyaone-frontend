import { RefreshCw, Send, CheckCircle } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ActionButtonsProps {
  onReassign: () => void;
  onNotifyDriver: () => void;
  onConfirmCompletion: () => void;
}

export default function ActionButtons({
  onReassign,
  onNotifyDriver,
  onConfirmCompletion,
  markAsComplete,
}: ActionButtonsProps) {
  const [status, setStatus] = useState("Pending");
  const onStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };
  return (
    <div className="flex justify-start space-x-4">
      <Button onClick={markAsComplete}>Mark as Complete</Button>
    </div>
  );
}
