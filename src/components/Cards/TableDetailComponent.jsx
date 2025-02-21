import React, { useEffect, useState } from "react";
import { format } from "date-fns";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import jsPDF from "jspdf";
import { ComplaintForm } from "../ComplaintForm";

const HistoryDetailCard = ({ invoice, isSmallScreen }) => {
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.text(`Invoice #${invoice.invoiceId}`, 10, 10);
    doc.text(`Purchase Date: ${formatDate(invoice.buyDate)}`, 10, 20);
    doc.text(`Status: ${invoice.status}`, 10, 30);
    doc.text("Products:", 10, 40);

    invoice.product.forEach((prod, index) => {
      doc.text(
        `${prod.productName} - Quantity: ${
          prod.quantity
        } - Price: $${parseFloat(prod.price).toFixed(2)}`,
        10,
        50 + index * 10
      );
    });

    doc.text(`Shipping Fee: $10`, 10, 50 + invoice.product.length * 10);
    doc.text(
      `Total Amount: $${invoice.totalAmount}`,
      10,
      60 + invoice.product.length * 10
    );

    doc.save(`Invoice_${invoice.invoiceId}.pdf`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">
            Invoice #{invoice.invoiceId}
          </CardTitle>
          <Badge variant="outline">{invoice.status}</Badge>
        </div>
        <CardDescription>
          Purchase Date
          {formatDate(invoice.buyDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          <ScrollArea
            className={`${
              isSmallScreen ? "w-96" : "max-w-6xl"
            } whitespace-nowrap rounded-md border`}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.product.map((prod, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{prod.productName}</TableCell>
                      <TableCell>{prod.quantity}</TableCell>
                      <TableCell>
                        {parseFloat(prod.totalAmount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {(parseFloat(prod.totalAmount) * prod.quantity).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-end">Shipping Fee : $10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Additional Information</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>
              Ordered Address: {invoice.location.state}, {invoice.location.city}
              , {invoice.location.address}
            </li>
            {/* <li>Return Policy: 30-day money-back guarantee</li>
            <li>Support: 24/7 customer support available</li> */}
          </ul>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="font-medium">
              {invoice.product.reduce((sum, prod) => sum + prod.quantity, 0)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-medium text-lg">${invoice.totalAmount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={downloadInvoice}>
          Download Invoice
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Complatin</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0">
            <ComplaintForm invoiceId={invoice.invoiceId} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default HistoryDetailCard;
