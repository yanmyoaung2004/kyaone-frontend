"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface OrderHeaderProps {
  orderId: string;
  status: string;
  onStatusChange: (newStatus: string) => void;
  onClose: () => void;
}

export default function OrderHeader({
  order,
  status,
  onStatusChange,
  onClose,
  markAsComplete,
}: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Order #{order?.id}</h2>
          <div className="flex justify-start space-x-4">
            {order?.status !== "completed" && (
              <Button onClick={markAsComplete}>Mark as Complete</Button>
            )}
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <Badge variant={"outline"}>{order?.status}</Badge>
          {order.isReturn ? <Badge variant="destructive">Return</Badge> : ""}
        </div>
      </div>
    </div>
  );
}
