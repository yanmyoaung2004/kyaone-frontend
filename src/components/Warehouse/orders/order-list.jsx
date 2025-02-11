import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderList({ orders, onOrderClick, onAssignTruck }) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Truck</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              onClick={() => onOrderClick(order)}
              className="cursor-pointer"
            >
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.assignedTruck || "Not Assigned"}</TableCell>
              <TableCell>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssignTruck(order);
                  }}
                >
                  Assign Truck
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
