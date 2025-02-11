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
import QuickStats from "../../components/Sales/QuickStats";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { X } from "lucide-react";
import { Search } from "lucide-react";
import DeliveryTracking from "./DeliveryTracking";

const deliveries = [
  {
    id: "12345",
    customer: "Alice Johnson",
    address: "123 Main St, City",
    eta: "11:00 AM",
    status: "In Progress",
    driver: "John Doe",
  },
  {
    id: "67890",
    customer: "Bob Smith",
    address: "456 Elm St, Town",
    eta: "12:00 PM",
    status: "Delayed",
    driver: "Jane Smith",
  },
  {
    id: "54321",
    customer: "Charlie Brown",
    address: "789 Oak St, Village",
    eta: "1:30 PM",
    status: "In Progress",
    driver: "Mike Johnson",
  },
  {
    id: "98765",
    customer: "Diana Prince",
    address: "321 Pine St, County",
    eta: "2:45 PM",
    status: "Pending",
    driver: "Sarah Williams",
  },
  {
    id: "13579",
    customer: "Ethan Hunt",
    address: "654 Maple St, State",
    eta: "3:15 PM",
    status: "Delivered",
    driver: "Tom Wilson",
  },
];

export default function DeliveriesPage() {
  // const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setSearchStatus(value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const filterDeliveries = deliveries.filter((delivery) => {
    const customerMatch = delivery.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const orderIdMatch = delivery.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch =
      searchStatus === "all" ||
      delivery.status.toLowerCase().includes(searchStatus.toLowerCase());

    return searchStatus === ""
      ? customerMatch || orderIdMatch
      : (customerMatch || orderIdMatch) && statusMatch;
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const res = await axios.get("url");

  //       if(!res.ok) {
  //         console.error("Error fetching data");
  //       }

  //       const data = res.data;

  //       setDeliveries(data);
  //     } catch(err) {
  //       console.error(err);
  //     }
  //   }
  // }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Delivery Tracking</h1>
      <QuickStats />
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
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
                </SelectContent>
              </Select>
            </div>
            <Button>Refresh</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.eta}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        delivery.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : delivery.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : delivery.status === "On Time"
                          ? "bg-green-100 text-green-800"
                          : delivery.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </TableCell>
                  <TableCell>{delivery.driver}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Track
                    </Button>
                  </TableCell>
                  <DeliveryTracking
                    isOpen={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                    delivery={delivery}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
