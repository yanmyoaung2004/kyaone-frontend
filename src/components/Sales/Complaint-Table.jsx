import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
export function ComplaintsTable({
  complaints,
  onComplaintSelect,
  onChatComplaint,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Order ID</TableHead>
          <TableHead className="text-center">Customer Name</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Created At</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {complaints.map((complaint) => (
          <TableRow key={complaint.id}>
            <TableCell className="text-center">{complaint.order?.id}</TableCell>
            <TableCell className="text-center">
              {complaint.customer?.user?.name}
            </TableCell>
            <TableCell className="text-center">{complaint.type}</TableCell>
            <TableCell className="text-center">
              <Badge
                className={
                  complaint.status === "open"
                    ? "bg-blue-500"
                    : complaint.status === "in_progress"
                    ? "bg-yellow-500"
                    : complaint.status === "resolved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              >
                {complaint.status === "open"
                  ? "Open"
                  : complaint.status === "in_progress"
                  ? "In Progress"
                  : complaint.status === "resolved"
                  ? "Resolved"
                  : "Closed"}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {new Date(complaint.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="space-x-4 text-center">
              <Button
                variant="outline"
                onClick={() => onComplaintSelect(complaint)}
              >
                View Details
              </Button>
              <Link to={`/sales-customers?complaintId=${complaint.id}`}>
                <Button>Chat</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
