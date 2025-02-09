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
import { FileText, Search, X } from "lucide-react";
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

const TableComponent = ({ isCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );
  //   const [invoices, setInvoices] = useState([]);

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
    try {
      const res = await axios.get(url);
      const data = res.data;
      console.log(data);
      // setInvoices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fetchData();

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

  return (
    <CustomerLayout>
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>
            {isCustomer ? "Invoice History" : "Sale Record"}
          </CardTitle>
          <CardDescription>
            {isCustomer
              ? "View and manage your recent purchases"
              : "Viewing Sale record"}
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
          </div>
          <div className="rounded-md border responsive-table">
            <ScrollArea className={`${isSmallScreen ? "w-full" : "max-w-6xl"} whitespace-nowrap rounded-md border`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>
                      {isCustomer ? "Buy Date" : "Sell Date"}
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
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Invoice Details</DialogTitle>
                            </DialogHeader>
                            <TableDetailComponent isSmallScreen={isSmallScreen} invoice={selectedInvoice} />
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
          <div className="flex justify-end mt-4">
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
