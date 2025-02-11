import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ComplaintDetails({ complaint, onStatusUpdate }) {
  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Complaint Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Complaint ID:</strong> {complaint.id}
          </p>
          <p>
            <strong>Order ID:</strong> {complaint.orderId}
          </p>
          <p>
            <strong>Customer Name:</strong> {complaint.customerName}
          </p>
          <p>
            <strong>Issue Type:</strong> {complaint.issueType}
          </p>
          <p>
            <strong>Status:</strong> {complaint.status}
          </p>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Add investigation notes here..." className="mb-2" />
        </div>
        <div className="mt-4 space-x-2">
          <Button onClick={() => onStatusUpdate(complaint.id, "Investigating")}>Mark as Investigating</Button>
          <Button onClick={() => onStatusUpdate(complaint.id, "Resolved")}>Mark as Resolved</Button>
          <Button onClick={() => onStatusUpdate(complaint.id, "Escalated")}>Escalate</Button>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Send Back to Sales
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

