import React from "react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HistoryDetailCard = ({ invoice }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl mt-4">{invoice.ProductName}</CardTitle>
      <CardDescription>Invoice Details</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Purchase Date</p>
          <p className="font-medium">{formatDate(invoice.buyDate)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="font-medium text-lg">{invoice.totalAmount}</p>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-2">Product Details</h3>
        <p className="text-sm text-muted-foreground">
          {invoice.description || "No description available."}
        </p>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-2">Additional Information</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          <li>Warranty: 1 year limited warranty</li>
          <li>Return Policy: 30-day money-back guarantee</li>
          <li>Support: 24/7 customer support available</li>
        </ul>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Download Invoice</Button>
      <Button>Contact Support</Button>
    </CardFooter>
  </Card>
  );
};

export default HistoryDetailCard;
