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
import axios from "axios";
import { useEffect, useState } from "react";
import OrderDetailsModal from "../../components/OrderDetailModel";

export default function OrdersPage() {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await axios.get("/api/orders");
      setAllOrders(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const fuzzySearch = (query) => {
    if (!query.trim()) return allOrders;

    const lowerQuery = query.toLowerCase();

    return allOrders.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      )
    );
  };
  useEffect(() => {
    setOrders(fuzzySearch(search));
  }, [search]);

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
              <Input
                placeholder="Search orders..."
                className="w-[300px]"
                onChange={(e) => setSearch(e.target.value)}
              />
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
                <TableHead className="text-right">Action</TableHead>
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
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(true)}
                    >
                      View Details
                    </Button>
                    <OrderDetails
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </TableCell>
                  <OrderDetailsModal
                    order={order}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
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
