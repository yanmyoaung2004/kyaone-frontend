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
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// const deliveries = [
//   {
//     id: "12345",
//     customer: "Alice Johnson",
//     address: "123 Main St, City",
//     eta: "11:00 AM",
//     status: "In Progress",
//     driver: "John Doe",
//   },
//   {
//     id: "67890",
//     customer: "Bob Smith",
//     address: "456 Elm St, Town",
//     eta: "12:00 PM",
//     status: "Delayed",
//     driver: "Jane Smith",
//   },
//   {
//     id: "54321",
//     customer: "Charlie Brown",
//     address: "789 Oak St, Village",
//     eta: "1:30 PM",
//     status: "On Time",
//     driver: "Mike Johnson",
//   },
//   {
//     id: "98765",
//     customer: "Diana Prince",
//     address: "321 Pine St, County",
//     eta: "2:45 PM",
//     status: "Pending",
//     driver: "Sarah Williams",
//   },
//   {
//     id: "13579",
//     customer: "Ethan Hunt",
//     address: "654 Maple St, State",
//     eta: "3:15 PM",
//     status: "Delivered",
//     driver: "Tom Wilson",
//   },
// ];

export default function DeliveriesPage() {
  const [status, setStatus] = useState();
  const [deliveries, setDeliveries] = useState([]);
  const [orderTruck, setOrderTruck] = useState([]);
  const [viewMode, setViewMode] = useState("byorder");
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/deliveries`);
      setDeliveries(res.data.order);
      setOrderTruck(res.data.orderTruck);

      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Delivery Tracking</h1>
      <QuickStats
        activeDelivery={status?.activeDelivery}
        escalatedDelivery={status?.escalatedDelivery}
        pendingDelivery={status?.pendingDelivery}
      />
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Input placeholder="Search deliveries..." className="w-[300px]" />
              <Select>
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
              <Select onValueChange={(value) => setViewMode(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="byorder">By Order</SelectItem>
                  <SelectItem value="bytruck">By Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Refresh</Button>
          </div>
          {viewMode === "byorder" && (
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
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">
                      {delivery.id.slice(0, 9)}
                    </TableCell>
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
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {viewMode === "bytruck" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Truck</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderTruck.map((order, index) => (
                  <TableRow key={order}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{order.driver_name}</TableCell>
                    <TableCell>{order.truck_name}</TableCell>
                    <TableCell>{order.route}</TableCell>
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

                    <TableCell className="text-right">
                      <Link to={`detail/${order.truck_id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
