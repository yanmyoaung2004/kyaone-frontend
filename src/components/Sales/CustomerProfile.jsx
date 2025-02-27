import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
export default function CustomerProfile({
  selectedCustomer,
  customerList,
  setSelectedComplaint,
}) {
  const { complaints } = selectedCustomer;
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Name" value={selectedCustomer.name} />
            <InfoItem label="Email" value={selectedCustomer.email} />
            <InfoItem label="Phone" value={selectedCustomer.phone} />
            <InfoItem label="Address" value={selectedCustomer.address} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Invoice ID</TableHead>
                <TableHead className="text-center">Order ID</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow
                  key={complaint.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="text-center">
                    {complaint.order.invoice.invoice_number.slice(0, 9)}
                  </TableCell>
                  <TableCell className="text-center">
                    {complaint.order_id}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        complaint.type === "delayed"
                          ? "bg-red-500"
                          : complaint.type === "faulty"
                          ? "bg-yellow-500"
                          : complaint.type === "wrong"
                          ? "bg-red-500"
                          : complaint.type === "missing"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }
                    >
                      {complaint.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        complaint.status === "open"
                          ? "bg-blue-500"
                          : complaint.status === "in_progress"
                          ? "bg-yellow-500"
                          : complaint.status === "resolved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {complaint.status === "open"
                        ? "Open"
                        : complaint.status === "in_progress"
                        ? "In Progress"
                        : complaint.status === "resolved"
                        ? "Resolved"
                        : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {complaint.description}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedComplaint(complaint);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <Label className=" font-bold text-md">{label}</Label>
      <br />
      {label == "Type" ? (
        <Badge
          className={
            value == "delayed"
              ? "bg-red-500"
              : value == "faulty"
              ? "bg-yellow-500"
              : value == "wrong"
              ? "bg-red-500"
              : value == "missing"
              ? "bg-blue-500"
              : "bg-green-500"
          }
        >
          {value}
        </Badge>
      ) : (
        <Label className="text-sm font-medium text-muted-foreground">
          {value}
        </Label>
      )}
    </div>
  );
}
