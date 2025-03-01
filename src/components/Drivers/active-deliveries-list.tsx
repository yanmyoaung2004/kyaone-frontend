import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customerName: string;
  deliveryAddress: string;
  status: string;
  truckAssigned: string;
  eta: string;
}

interface ActiveDeliveriesListProps {
  orders: Order[];
}

export function ActiveDeliveriesList({
  orders,
  setIsModalOpen,
  setSelectedOrder,
}: ActiveDeliveriesListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Order ID</TableHead>
            <TableHead className="text-center">Customer</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">ETA</TableHead>
            <TableHead className="text-center">Truck</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="text-center cursor-pointer"
              onClick={() => {
                setSelectedOrder(order);
                setIsModalOpen(true);
              }}
            >
              <TableCell>
                {order?.order.invoice?.invoice_number.slice(0, 9)}
              </TableCell>
              <TableCell>{order?.order?.name}</TableCell>
              <TableCell>{order?.order?.location?.address}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order?.order?.status === "completed"
                      ? "success"
                      : order?.order?.status === "cancelled"
                      ? "destructive"
                      : "default"
                  }
                >
                  {order?.order?.status}
                </Badge>
              </TableCell>
              <TableCell>
                {order?.order?.location?.city?.eta || "N/A"}
              </TableCell>
              <TableCell>{order?.truck?.license_plate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
