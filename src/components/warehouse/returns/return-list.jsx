import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "../../../components/warehouse/ui/checkbox"
import { Button } from "@/components/ui/button"

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "InProgress":
      return "bg-blue-100 text-blue-800"
    case "Delivered":
      return "bg-green-100 text-green-800"
    case "Cancelled":
      return "bg-red-100 text-red-800"
    case "Delayed":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ReturnList({
  returns,
  onReturnClick,
  onOrderClick,
  onComplaintClick,
  selectedReturns,
  onSelectReturn,
}) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Return ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Complaint ID</TableHead>
            <TableHead>Assigned Truck</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.map((returnItem) => (
            <TableRow key={returnItem.id}>
              <TableCell>
                <Checkbox
                  checked={selectedReturns.includes(returnItem.id)}
                  onCheckedChange={() => onSelectReturn(returnItem.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{returnItem.id}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => onOrderClick(returnItem.orderId)}>
                  {returnItem.orderId}
                </Button>
              </TableCell>
              <TableCell>{returnItem.productName}</TableCell>
              <TableCell>{returnItem.customerName}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(returnItem.status)}`}
                >
                  {returnItem.status}
                </span>
              </TableCell>
              <TableCell>
                {returnItem.complaintId ? (
                  <Button variant="link" onClick={() => onComplaintClick(returnItem.complaintId)}>
                    {returnItem.complaintId}
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{returnItem.assignedTruck || "Not Assigned"}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => onReturnClick(returnItem)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

