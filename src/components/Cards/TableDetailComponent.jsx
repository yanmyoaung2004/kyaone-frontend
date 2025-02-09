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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const HistoryDetailCard = ({ invoice, isCustomer, isSmallScreen }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const totalAmount = invoice.product
    .reduce((sum, product) => sum + parseFloat(product.price), 0)
    .toFixed(2);

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
          {isCustomer ? "Purchase Date" : "Sell Date"}:{" "}
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
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.product.map((prod, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{prod.productName}</TableCell>
                      <TableCell>{prod.quantity}</TableCell>
                      <TableCell className="text-right">
                        ${parseFloat(prod.totalAmount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <Separator />
        {isCustomer ? (
          <>
            <div>
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Warranty: 1 year limited warranty on all products</li>
                <li>Return Policy: 30-day money-back guarantee</li>
                <li>Support: 24/7 customer support available</li>
              </ul>
            </div>
            <Separator />
          </>
        ) : (
          <div>Hello</div>
        )}
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
        <Button variant="outline">Download Invoice</Button>
        {isCustomer && <Button>Contact Support</Button>}
      </CardFooter>
    </Card>
  );
};

export default HistoryDetailCard;
