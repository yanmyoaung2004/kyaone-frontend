import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
export function ComplaintList({ complaints, onComplaintClick }) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Complaint ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Issue Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow
              key={complaint.id}
              onClick={() => onComplaintClick(complaint)}
              className="cursor-pointer p-10"
            >
              <TableCell>{complaint.id}</TableCell>
              <TableCell>{complaint.order_id}</TableCell>
              <TableCell>{complaint.customer_name}</TableCell>
              <TableCell>{complaint.type}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {0} of {5} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
