import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CustomerProfile({ selectedComplaints }) {
  const { customer, order, subject, description } = selectedComplaints;

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
            <InfoItem label="Name" value={customer.user.name} />
            <InfoItem label="Email" value={customer.user.email} />
            <InfoItem label="Phone" value={customer.phone} />
            <InfoItem label="Address" value={customer.address} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Complaint Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem
            label="Invoice ID"
            value={order.invoice.invoice_number.slice(0, 9)}
          />
          <InfoItem label="Subject" value={subject} />
          <div>
            <InfoItem label="Description" value={description} />
          </div>
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
      <Label className="text-sm font-medium text-muted-foreground">
        {value}
      </Label>
    </div>
  );
}
