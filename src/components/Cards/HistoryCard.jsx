"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

import HistoryDetailCard from "./HistoryDetailCard";

const invoices = [
  {
    invoiceId: "INV001",
    product: [
      {
        productName: "Wireless Mouse",
        totalAmount: 1299.99,
      },
      {
        productName: "Laptop",
        totalAmount: 1000,
      }
    ],
    totalAmount: 2299.99,
    buyDate: new Date("2023-05-15"),
    status: "Paid",
  },
  {
    invoiceId: "INV002",
    product: [
      {
        productName: "Wireless Mouse",
        totalAmount: 1299.99,
      },
    ],
    totalAmount: 49.99,
    buyDate: new Date("2023-05-18"),
    status: "Processing",
  },
  {
    invoiceId: "INV003",
    product: [
      {
        productName: "Laptop Pro X",
        totalAmount: 399.99,
      },
    ],
    totalAmount: 399.99,
    buyDate: new Date("2023-05-20"),
    status: "Shipped",
  },
];

const HistoryCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Invoice History</CardTitle>
        <CardDescription>View and manage your recent purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Buy Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="w-[100px] text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-medium">
                    {invoice.invoiceId}
                  </TableCell>
                  <TableCell>{invoice.productName}</TableCell>
                  <TableCell>
                    {format(invoice.buyDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "Paid"
                          ? "success"
                          : invoice.status === "Processing"
                          ? "warning"
                          : "default"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${invoice.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invoice Details</DialogTitle>
                        </DialogHeader>
                        <HistoryDetailCard invoice={selectedInvoice} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-sm font-medium">
            Total: <span className="text-lg">${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
