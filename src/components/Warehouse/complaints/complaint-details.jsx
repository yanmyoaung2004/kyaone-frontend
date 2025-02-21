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
            <strong>Order ID:</strong> {complaint.order_id}
          </p>
          <p>
            <strong>Customer Name:</strong> {complaint.customer_name}
          </p>
          <p>
            <strong>Issue Type:</strong>{" "}
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                complaint.type === "delayed"
                  ? "bg-blue-100 text-blue-800"
                  : complaint.type === "faulty"
                  ? "bg-purple-100 text-purple-800"
                  : complaint.type === "wrong"
                  ? "bg-orange-100 text-orange-800"
                  : complaint.type === "missing"
                  ? "bg-pink-100 text-pink-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {complaint.type}
            </span>
          </p>
          <p>
            <strong>Status :</strong>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                complaint.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : complaint.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : complaint.status === "open"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {complaint.status === "resolved"
                ? "Resolved"
                : complaint.status === "in_progress"
                ? "In Progress"
                : complaint.status === "open"
                ? "Open"
                : "Closed"}
            </span>
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
