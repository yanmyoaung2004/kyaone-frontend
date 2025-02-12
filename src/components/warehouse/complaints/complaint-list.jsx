import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-800"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800"
    case "Resolved":
      return "bg-green-100 text-green-800"
    case "Closed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getIssueTypeColor = (issueType) => {
  switch (issueType) {
    case "Delayed":
      return "bg-orange-100 text-orange-800"
    case "Faulty":
      return "bg-red-100 text-red-800"
    case "Wrong":
      return "bg-purple-100 text-purple-800"
    case "Missing":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

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
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIssueTypeColor(complaint.issueType)}`}
                >
                  {complaint.issueType}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(complaint.status)}`}
                >
                  {complaint.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

