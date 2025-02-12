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

export default function DeliveriesPage() {
  const [status, setStatus] = useState();
  const [searchStatus, setSearchStatus] = useState();
  const [allDeliveries, setAllDeliveries] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [orderTruck, setOrderTruck] = useState([]);
  const [allOrderTruck, setAllOrderTruck] = useState([]);
  const [viewMode, setViewMode] = useState("byorder");
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/deliveries`);
      setDeliveries(res.data.order);
      setAllDeliveries(res.data.order);
      setOrderTruck(res.data.orderTruck);
      setAllOrderTruck(res.data.orderTruck);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fuzzySearch = (query) => {
    if (viewMode === "byorder") {
      if (!query.trim()) return allDeliveries;
      const lowerQuery = query.toLowerCase();
      return allDeliveries.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(lowerQuery)
        )
      );
    } else {
      if (!query.trim()) return allOrderTruck;
      const lowerQuery = query.toLowerCase();
      return allOrderTruck.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(lowerQuery)
        )
      );
    }
  };

  useEffect(() => {
    if (searchStatus === "all") {
      if (viewMode === "byorder") {
        setDeliveries(allDeliveries);
      } else {
        setOrderTruck(allOrderTruck);
      }
      return;
    }
    if (viewMode === "byorder") {
      setDeliveries(
        allDeliveries.filter((item) => item.status === searchStatus)
      );
    } else {
      setOrderTruck(
        allOrderTruck.filter((item) => item.status === searchStatus)
      );
    }
  }, [searchStatus, allDeliveries]);

  useEffect(() => {
    if (viewMode === "byorder") {
      setDeliveries(fuzzySearch(search));
    } else {
      setOrderTruck(fuzzySearch(search));
    }
  }, [search, allDeliveries]);

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
              <Input
                placeholder="Search deliveries..."
                className="w-[300px]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                onValueChange={(value) => {
                  setSearchStatus(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Progressing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
          </div>
          {viewMode === "byorder" && (
            <div className="rounded-md border flex-grow overflow-x-auto bg-white">
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
                  {deliveries.map((delivery, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {delivery.id.slice(0, 9)}
                      </TableCell>

                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell>{delivery.address}</TableCell>
                      <TableCell>
                        {delivery.eta === null ? 10 : delivery.eta}
                      </TableCell>

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
            </div>
          )}

          {viewMode === "bytruck" && (
            <div className="rounded-md border flex-grow overflow-x-auto bg-white">
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
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{order.driver_name}</TableCell>
                      <TableCell>{order.truck_name}</TableCell>
                      <TableCell>{order.route}</TableCell>
                      <TableCell>
                        {order.eta === null ? 10 : delivery.eta}
                      </TableCell>
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
