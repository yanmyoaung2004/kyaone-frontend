import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderDetails({ order }) {
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
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.address}
          </p>
          <p>
            <strong>Assigned Truck:</strong> {order.assignedTruck || "Not Assigned"}
          </p>
          <p>
            <strong>Estimated Delivery:</strong> {order.estimatedDelivery || "Not Scheduled"}
          </p>
        </div>
        <div className="mt-4 space-x-2">
          <Button>Mark as Picked</Button>
          <Button>Mark as Packed</Button>
          <Button>Mark as Shipped</Button>
        </div>
      </CardContent>
    </Card>
  )
}

