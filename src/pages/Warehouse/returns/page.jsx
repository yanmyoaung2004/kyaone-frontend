"use client";

import { useState } from "react";
import { ReturnList } from "../../../components/Warehouse/returns/return-list";
import { ReturnDetails } from "../../../components/Warehouse/returns/return-details";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Search } from "lucide-react";

// Mock data for demonstration
const mockReturns = [
  {
    id: "R001",
    orderId: "O123",
    productName: "Widget A",
    customerName: "John Doe",
    status: "Pending",
    reason: "Wrong Product",
  },
  {
    id: "R002",
    orderId: "O456",
    productName: "Gadget B",
    customerName: "Jane Smith",
    status: "Processed",
    reason: "Damaged Item",
  },
  {
    id: "R003",
    orderId: "O789",
    productName: "Doohickey C",
    customerName: "Bob Johnson",
    status: "Rejected",
    reason: "Changed Mind",
  },
];

export default function Returns() {
  const [returns, setReturns] = useState([]);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [refresh, setRefresh] = useState(false);

  function refreshReturns() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      console.log(response.data);
      setReturns(response.data);
    });
  }, [refresh]);

  const filteredReturns = returns.filter(
    (returnItem) =>
      returnItem?.id?.toString()?.includes(searchTerm) &&
      (statusFilter === "All" || returnItem.status === statusFilter)
  );

  // console.log(filteredReturns);

  const handleReturnClick = (returnItem) => {
    setSelectedReturn(returnItem);
  };

  const handleStatusUpdate = (returnId, newStatus) => {
    setReturns(
      returns.map((returnItem) =>
        returnItem.id === returnId
          ? { ...returnItem, status: newStatus }
          : returnItem
      )
    );
    if (selectedReturn && selectedReturn.id === returnId) {
      setSelectedReturn({ ...selectedReturn, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <RotateCcw className="mr-2 h-6 w-6" />
            Returns Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search"
                className="pl-8 pr-10 py-4 rounded-md"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <ReturnList
              orders={filteredReturns}
              onReturnClick={handleReturnClick}
              refreshList={refreshReturns}
            />
            {selectedReturn && (
              <ReturnDetails
                returnItem={selectedReturn}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
