"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { formatToSpecificDateTime } from "../../helpers/services";
import {
  handleSuccessToast,
  handleFailureToast,
} from "../../helpers/ToastService";
export default function EscalationDetails({ selectedIssues }) {
  const [status, setStatus] = useState(selectedIssues.status);

  const changeStatus = async (status) => {
    try {
      const res = await axios.put(
        `api/escalated-issues/${selectedIssues.id}/update`,
        {
          status: status,
        }
      );
      handleSuccessToast("Status updated successfully");
    } catch (error) {
      console.log(error);
      handleFailureToast("Error updating status");
    }
  };
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    changeStatus(newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Customer</Label>
          <p className="text-lg font-medium">
            {selectedIssues?.order.customer.user.name}
          </p>
        </div>
        <div>
          <Label>Order Number</Label>
          <p>{selectedIssues?.order.invoice.invoice_number.slice(0, 9)}</p>
        </div>
        <div>
          <Label>Priority</Label>
          <p>{selectedIssues?.priority}</p>
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <p>{selectedIssues?.description}</p>
      </div>
      <div>
        <Label>Status</Label>
        <Select onValueChange={handleStatusChange} defaultValue={status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inprogress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Timeline</Label>
        <ul className="space-y-2">
          <li className="text-sm">
            <span className="font-medium">
              {formatToSpecificDateTime(selectedIssues.created_at)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
