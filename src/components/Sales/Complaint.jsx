import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplaintsTable } from "./Complaint-Table";
import { ComplaintDetailsModal } from "./Complaint-Detials-Modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Mock data
const initialComplaints = [
  {
    id: "1",
    customerName: "John Doe",
    email: "john@example.com",
    subject: "Product Defect",
    description: "The product I received is damaged.",
    status: "New",
    createdAt: "2025-02-10T10:00:00Z",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    email: "jane@example.com",
    subject: "Late Delivery",
    description: "My order is significantly delayed.",
    status: "In Progress",
    createdAt: "2025-02-09T14:30:00Z",
  },
];
export function Complaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState("");

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
  };
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          {selectedComplaint && (
            <ComplaintDetailsModal
              complaint={selectedComplaint}
              onClose={() => setSelectedComplaint(null)}
              onStatusUpdate={(newStatus) =>
                updateComplaintStatus(selectedComplaint.id, newStatus)
              }
            />
          )}
          <ComplaintsTable
            complaints={complaints}
            onComplaintSelect={setSelectedComplaint}
          />
        </CardContent>
      </Card>
    </div>
  );
}
