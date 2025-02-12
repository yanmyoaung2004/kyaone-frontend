import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReturnDetails({ returnItem, onStatusUpdate, onAssignTruck }) {
  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Return Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Return ID:</strong> {returnItem.id}
          </p>
          <p>
            <strong>Order ID:</strong> {returnItem.orderId}
          </p>
          <p>
            <strong>Product Name:</strong> {returnItem.productName}
          </p>
          <p>
            <strong>Customer Name:</strong> {returnItem.customerName}
          </p>
          <div>
            <strong>Status:</strong>
            <Select defaultValue={returnItem.status} onValueChange={(value) => onStatusUpdate(returnItem.id, value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p>
            <strong>Reason:</strong> {returnItem.reason}
          </p>
          {returnItem.complaintId && (
            <p>
              <strong>Related Complaint:</strong> {returnItem.complaintId}
            </p>
          )}
          <p>
            <strong>Assigned Truck:</strong> {returnItem.assignedTruck || "Not Assigned"}
          </p>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Add notes about the return..." className="mb-2" />
        </div>
        <div className="mt-4 space-x-2">
          <Button onClick={() => onAssignTruck(returnItem.id)}>Assign Truck</Button>
        </div>
      </CardContent>
    </Card>
  )
}

