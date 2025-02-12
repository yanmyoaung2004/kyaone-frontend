import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock function to fetch complaint details
const fetchComplaintDetails = (complaintId) => {
  // This would typically be an API call
  return {
    id: complaintId,
    orderId: "ORD-123",
    customerName: "Jane Smith",
    issueType: "Damaged Item",
    status: "In Progress",
    description:
      "The product arrived with visible damage to the packaging and the item inside.",
    dateSubmitted: "2023-06-10",
  };
};

export function ComplaintDetailsModal({ complaintId, onClose }) {
  const complaintDetails = fetchComplaintDetails(complaintId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complaint Details: {complaintId}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Order ID:</strong> {complaintDetails.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {complaintDetails.customerName}
          </p>
          <p>
            <strong>Issue Type:</strong> {complaintDetails.issueType}
          </p>
          <p>
            <strong>Status:</strong> {complaintDetails.status}
          </p>
          <p>
            <strong>Date Submitted:</strong> {complaintDetails.dateSubmitted}
          </p>
          <p>
            <strong>Description:</strong> {complaintDetails.description}
          </p>
        </div>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
