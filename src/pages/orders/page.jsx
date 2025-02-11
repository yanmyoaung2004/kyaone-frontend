import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import OrderDetails from "./OrderDetials";

const orders = [
  {
    id: "12345",
    customer: "Alice Johnson",
    address: "123 Main St, City",
    eta: "11:00 AM",
    status: "In Progress",
  },
  {
    id: "67890",
    customer: "Bob Smith",
    address: "456 Elm St, Town",
    eta: "12:00 PM",
    status: "Delayed",
  },
  {
    id: "54321",
    customer: "Charlie Brown",
    address: "789 Oak St, Village",
    eta: "1:30 PM",
    status: "On Time",
  },
  {
    id: "98765",
    customer: "Diana Prince",
    address: "321 Pine St, County",
    eta: "2:45 PM",
    status: "Pending",
  },
  {
    id: "13579",
    customer: "Ethan Hunt",
    address: "654 Maple St, State",
    eta: "3:15 PM",
    status: "Delivered",
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setSearchStatus(value);
  };

  console.log(searchStatus);

  const handleClear = () => {
    setSearchTerm("");
  };
  // const createOrder = async () => {
  //   try {
  //     const res = await axios.post("url", data);

  //     if (!res.ok) {
  //       throw new Error("Error");
  //     }

  //     const data = res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const filterOrders = orders.filter((order) => {
    const customerMatch = order.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const orderIdMatch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch =
      searchStatus === "all" ||
      order.status.toLowerCase().includes(searchStatus.toLowerCase());

    return searchStatus === ""
      ? customerMatch || orderIdMatch
      : (customerMatch || orderIdMatch) && statusMatch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="pl-8 pr-10 py-4 rounded-md"
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
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="on time">On Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.eta}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : order.status === "On Time"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="mr-2">
                      Create Order
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      View Details
                    </Button>
                    <OrderDetails
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
