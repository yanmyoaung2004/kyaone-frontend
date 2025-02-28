import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
  handleWarningToast,
} from "../../helpers/ToastService";
import { useState } from "react";

export default function CustomerProfile({ selectedComplaints }) {
  const { customer, order, description } = selectedComplaints;
  const [isResolved, setIsResolved] = useState(
    selectedComplaints.status === "resolved"
  );

  const clickResolve = async () => {
    try {
      const res = await axios.put(
        `api/complaints/status/update/${selectedComplaints.id}/resolved`
      );
      if (res.status === 200) {
        setIsResolved(true);
        handleSuccessToast("Complaint is resolved successfully!");
      }
    } catch (error) {
      handleFailureToast("Failed to resolve!");
      console.log(error);
    }
  };
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
            <InfoItem label="Name" value={order.name} />
            <InfoItem label="Email" value={customer.user.email} />
            <InfoItem label="Phone" value={order.phone} />
            <InfoItem label="Address" value={order.location.address} />
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

          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Description
            </Label>
            <p className="mt-1 text-lg">{description}</p>
          </div>
          <div className="flex justify-end">
            {isResolved ? (
              <Button
                onClick={() => {
                  handleWarningToast("Already resolved!");
                }}
              >
                Resolved
              </Button>
            ) : (
              <Button onClick={clickResolve}>Resolve</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <Label className="text-lg">{label}</Label>
      <p>{value}</p>
    </div>
  );
}
