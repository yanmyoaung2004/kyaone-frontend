import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function ComplaintsTable({ complaints, onComplaintSelect }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Customer Name</TableHead>
          <TableHead className="text-center">Subject</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Created At</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {complaints.map((complaint) => (
          <TableRow key={complaint.id}>
            <TableCell className="text-center">
              {complaint.customerName}
            </TableCell>
            <TableCell className="text-center">{complaint.subject}</TableCell>
            <TableCell className="text-center">{complaint.status}</TableCell>
            <TableCell className="text-center">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="space-x-4 text-center">
              <Button>Accept</Button>
              <Button
                variant="outline"
                onClick={() => onComplaintSelect(complaint)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
