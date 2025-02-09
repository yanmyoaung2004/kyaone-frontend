"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search, X, RefreshCcw } from "lucide-react";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axios from "axios";

import TableDetailComponent from "./TableDetailComponent";
import CustomerLayout from "../../layout/CustomerLayout";
import { PaginationForItems } from "../PaginationForItems";

const invoices = [
  {
    invoiceId: "INV001",
    product: [
      {
        productName: "Wireless Mouse",
        quantity: 2,
        totalAmount: 1299.99,
      },
      {
        productName: "Laptop",
        quantity: 1,
        totalAmount: 1000,
      },
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
        quantity: 3,
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
        quantity: 2,
        totalAmount: 399.99,
      },
    ],
    totalAmount: 399.99,
    buyDate: new Date("2023-05-20"),
    status: "Shipped",
  },
];

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(
      window.matchMedia("(max-width: 500px)").matches
  );
  // const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const idMatch = invoice.invoiceId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const productNameMatch = invoice.product.some((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return idMatch || productNameMatch;
  });

  const totalAmount = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/invoices");
      // setInvoices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch invoices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    handleMediaChange(mediaQuery);

    mediaQuery.addListener(handleMediaChange);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  if (loading) {
    return (
      <CustomerLayout>
        <Card className="max-w-6xl mb-10 mx-auto">
          <CardContent className="flex items-center justify-center h-64">
            <RefreshCcw className="w-8 h-8 animate-spin" />
          </CardContent>
        </Card>
      </CustomerLayout>
    );
  }

  if (error) {
    return (
      <CustomerLayout>
        <Card className="max-w-6xl mb-10 mx-auto">
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchData}>Try Again</Button>
          </CardContent>
        </Card>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <Card className="max-w-6xl mb-10 mx-auto">
        <CardHeader>
          <CardTitle>
            Invoice History
          </CardTitle>
          <CardDescription>
            View and manage your recent purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`flex items-center space-x-2 mb-2`}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className="pl-8 pr-10 py-5 rounded-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <Button onClick={fetchData} className="flex items-center">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="rounded-md border responsive-table">
            <ScrollArea
              className={`${
                isSmallScreen ? "w-full" : "max-w-6xl"
              } whitespace-nowrap rounded-md border`}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>
                      Buy Date
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Details
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.invoiceId}>
                      <TableCell className="font-medium">
                        {invoice.invoiceId}
                      </TableCell>
                      <TableCell>
                        {invoice.product.map((prod) => (
                          <div key={prod.productName}>{prod.productName},</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.buyDate), "MMM d, yyyy")}
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
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Invoice Details</DialogTitle>
                            </DialogHeader>
                            <TableDetailComponent
                              isSmallScreen={isSmallScreen}
                              invoice={selectedInvoice}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="flex justify-between items-center mt-4">
            <PaginationForItems />
            <p className="text-sm font-medium">
              Total: <span className="text-lg">${totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </CustomerLayout>
  );
};

export default TableComponent;
