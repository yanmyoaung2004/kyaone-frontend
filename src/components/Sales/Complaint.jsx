import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplaintsTable } from "./Complaint-Table";
import { ComplaintDetailsModal } from "./Complaint-Detials-Modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { handleSuccessToast } from "../../helpers/ToastService";
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
export function Complaints({ searchQuery, filteredStatus }) {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");

  useEffect(() => {
    axios.get("/api/complaints").then((resp) => {
      setComplaints(resp.data);
    });
  }, []);
  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.customer.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (filteredStatus === "all" || complaint.status === filteredStatus)
  );

  const updateComplaintStatus = (id, newStatus) => {
    axios.put(`/api/complaints/${id}`, { status: newStatus }).then((resp) => {
      setComplaints(
        complaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
      handleSuccessToast("Complaint status updated successfully");
    });
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
            complaints={filteredComplaints}
            onComplaintSelect={setSelectedComplaint}
          />
        </CardContent>
      </Card>
    </div>
  );
}
