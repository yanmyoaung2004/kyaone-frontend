import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const deliveries = [
  {
    id: 1,
    customer: "John Doe",
    eta: "2025-02-15T14:30:00Z",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    eta: "2025-02-16T10:00:00Z",
    status: "In Progress",
  },
  {
    id: 3,
    customer: "Alice Brown",
    eta: "2025-02-17T08:45:00Z",
    status: "Completed",
  },
];

export default function DeliveryTracking() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Delivery Tracking</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View All</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Activity</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CardContent>
              <ul className="space-y-4">
                {deliveries.map((delivery) => (
                  <li
                    key={delivery.id}
                    className="bg-gray-50 p-3 rounded-md text-sm"
                  >
                    <p>Customer: {delivery.customer}</p>
                    <p>ETA: {delivery.eta}</p>
                    <p>Status: {delivery.status}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Detiails</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delivery Tracking</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          <li className="bg-gray-50 p-3 rounded-md text-sm">
                            <p>Customer: {deliveries[0].customer}</p>
                            <p>ETA: {deliveries[0].eta}</p>
                            <p>Status: {deliveries[0].status}</p>
                          </li>
                        </ul>
                      </CardContent>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
