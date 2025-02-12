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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useSelector } from "react-redux";

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );
  const [invoices, setInvoices] = useState([]);
  let [filterInvoices, setFilterInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

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
      const res = await axios.get(`/api/orders/user/${currentUser.id}`);
      setInvoices(res.data);
      setFilterInvoices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch invoices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let filtered = invoices;
    if (searchTerm) {
      filtered = filtered.filter((invoice) =>
        invoice.product?.some((p) =>
          p.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (category && category !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === category);
    }

    setFilterInvoices(filtered);
  }, [searchTerm, category, invoices]);
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
          <CardContent className="flex items-center justify-center h-64" />
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
          <CardTitle>Invoice History</CardTitle>
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
            <Select
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border responsive-table">
            <ScrollArea
              className={`${
                isSmallScreen ? "w-full" : "max-w-6xl"
              } whitespace-nowrap rounded-md border`}
            >
              <div className="rounded-md border flex-grow overflow-x-auto bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Buy Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead className="w-[100px] text-center">
                        Details
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterInvoices.length > 0 &&
                      filterInvoices.map((invoice) => (
                        <TableRow key={invoice.invoiceId}>
                          <TableCell className="font-medium">
                            {invoice.invoiceId}
                          </TableCell>
                          <TableCell>
                            {invoice.product.map((prod) => (
                              <div key={prod.productName}>
                                {prod.productName},
                              </div>
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
                            ${invoice.totalAmount}
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
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="flex justify-between items-center mt-4">
            {/* <PaginationForItems /> */}
          </div>
        </CardContent>
      </Card>
    </CustomerLayout>
  );
};

export default TableComponent;
