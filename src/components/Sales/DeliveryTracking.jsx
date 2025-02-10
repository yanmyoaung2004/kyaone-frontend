import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const deliveries = [
  { id: "12345", customer: "Alice Johnson", eta: "11:00 AM", status: "In Progress" },
  { id: "67890", customer: "Bob Smith", eta: "12:00 PM", status: "Delayed" },
  { id: "54321", customer: "Charlie Brown", eta: "1:30 PM", status: "On Time" },
]

export default function DeliveryTracking() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Delivery Tracking</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>{delivery.customer}</TableCell>
                <TableCell>{delivery.eta}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      delivery.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : delivery.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {delivery.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

