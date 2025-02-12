import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function ComplaintDetails({ complaint, onStatusUpdate }) {
  // console.log(complaint);
  const [status, setStatus] = useState(complaint.status);
  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Complaint Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Complaint ID:</strong> {complaint.id}
          </p>
          <p>
            <strong>Order ID:</strong> {complaint.orderId}
          </p>
          <p>
            <strong>Customer Name:</strong> {complaint.customerName}
          </p>
          <p>
            <strong>Issue Type:</strong> {complaint.issueType}
          </p>
          <p>
            <strong>Status:</strong> {complaint.status}
          </p>
        </div>
        <div className="mt-4 space-x-2 flex ">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => onStatusUpdate(complaint.id, status)}>
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
