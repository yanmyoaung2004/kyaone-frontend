import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ReturnDetails({ returnItem, onStatusUpdate }) {
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
          <p>
            <strong>Status:</strong> {returnItem.status}
          </p>
          <p>
            <strong>Reason:</strong> {returnItem.reason}
          </p>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Add notes about the return..." className="mb-2" />
        </div>
        <div className="mt-4 space-x-2">
          <Button onClick={() => onStatusUpdate(returnItem.id, "Processed")}>Accept Return</Button>
          <Button onClick={() => onStatusUpdate(returnItem.id, "Rejected")}>Reject Return</Button>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Restock Item
          </Button>
        </div>
        <div className="mt-2">
          <Button variant="outline" className="w-full">
            Send Back to Sales
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

