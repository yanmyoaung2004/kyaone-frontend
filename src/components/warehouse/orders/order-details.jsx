import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OrderDetails({ order, onStatusUpdate }) {
  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer Name:</strong> {order.customerName}
          </p>
          <div>
            <strong>Status:</strong>
            <Select defaultValue={order.status} onValueChange={(value) => onStatusUpdate(order.id, value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p>
            <strong>Delivery Address:</strong> {order.address}
          </p>
          <p>
            <strong>Assigned Truck:</strong> {order.assignedTruck || "Not Assigned"}
          </p>
          <p>
            <strong>Estimated Delivery:</strong> {order.estimatedDelivery || "Not Scheduled"}
          </p>
          <p>
            <strong>Has Complaint:</strong> {order.hasComplaint ? "Yes" : "No"}
          </p>
          <p>
            <strong>Service Center:</strong> {order.serviceCenter || "Not Assigned"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

