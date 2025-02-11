import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
            <TableRow key={complaint.id} onClick={() => onComplaintClick(complaint)} className="cursor-pointer">
              <TableCell>{complaint.id}</TableCell>
              <TableCell>{complaint.orderId}</TableCell>
              <TableCell>{complaint.customerName}</TableCell>
              <TableCell>{complaint.issueType}</TableCell>
              <TableCell>{complaint.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

