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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function EscalationDetails({ selectedIssues, truck }) {
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
        <InfoItem
          label="Customer"
          value={selectedIssues?.order.customer.user.name}
        />
        <InfoItem
          label="Order Number"
          value={`ORD# ${selectedIssues?.order.id}`}
        />
        <InfoItem
          label="Invoice Number"
          value={selectedIssues?.order.invoice.invoice_number.slice(0, 9)}
        />
        <InfoItem label="Priority" value={selectedIssues?.priority} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <InfoItem label="Description" value={selectedIssues?.description} />
          </div>
          <div>
            <Label className=" font-bold text-md mb-2">Status</Label>
            <Select
              className="mt-2"
              onValueChange={handleStatusChange}
              defaultValue={status}
            >
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
            <InfoItem
              label="Timeline"
              value={formatToSpecificDateTime(selectedIssues.created_at)}
            />
          </div>
        </div>

        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Truck Info</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <InfoItem label="License Plate" value={truck?.license_plate} />
              <InfoItem label="Status" value={truck?.status} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <Label className=" font-bold text-md">{label}</Label>
      <br />
      <Label className="text-sm font-medium text-muted-foreground">
        {value}
      </Label>
    </div>
  );
}
