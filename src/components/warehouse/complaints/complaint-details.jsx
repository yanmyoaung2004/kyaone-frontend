import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
          <div>
            <strong>Status:</strong>
            <Select defaultValue={complaint.status} onValueChange={(value) => onStatusUpdate(complaint.id, value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Add investigation notes here..." className="mb-2" />
        </div>
      </CardContent>
    </Card>
  )
}

