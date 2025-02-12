import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "../../../components/warehouse/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Processing":
      return "bg-blue-100 text-blue-800"
    case "Shipped":
      return "bg-purple-100 text-purple-800"
    case "Delivered":
      return "bg-green-100 text-green-800"
    case "Cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function OrderList({
  orders,
  onOrderClick,
  onComplaintClick,
  onServiceCenterClick,
  selectedOrders,
  onSelectOrder,
}) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Truck</TableHead>
            <TableHead>Has Complaint</TableHead>
            <TableHead>Service Center</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox checked={selectedOrders.includes(order.id)} onCheckedChange={() => onSelectOrder(order.id)} />
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.assignedTruck || "Not Assigned"}</TableCell>
              <TableCell>
                {order.hasComplaint ? (
                  <Button variant="link" onClick={() => onComplaintClick(order.id)}>
                    View Complaint
                  </Button>
                ) : (
                  "No"
                )}
              </TableCell>
              <TableCell>
                {order.serviceCenter ? (
                  <Button variant="link" onClick={() => onServiceCenterClick(order.serviceCenter)}>
                    {order.serviceCenter}
                  </Button>
                ) : (
                  "Not Assigned"
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onOrderClick(order)}>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

