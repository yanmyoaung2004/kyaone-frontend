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
import OrderDetails from "./OrderDetials";
import { X } from "lucide-react";
import { Search } from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleSuccessToast } from "../../helpers/ToastService";
export default function OrdersPage() {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isReturnFilter, setIsReturnFilter] = useState("all");
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const fuzzySearch = (query) => {
    const lowerQuery = query.toLowerCase();
    console.log(isReturnFilter);
    return allOrders.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerQuery) &&
          (isReturnFilter === "all" ||
            (isReturnFilter === "isReturn" && item.isReturn) ||
            (isReturnFilter === "notReturn" && !item.isReturn))
      )
    );
  };
  useEffect(() => {
    const filteredOrders = fuzzySearch(search);
    setOrders(filteredOrders);
  }, [search, isReturnFilter]); // isReturnFilter is included here to ensure the orders are updated when the filter changes

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="pl-8 pr-10 py-5 rounded-md"
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setSearch("")}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
              <div>
                <Select
                  value={isReturnFilter}
                  onValueChange={(value) => setIsReturnFilter(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Is Return" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="isReturn">Is Return</SelectItem>
                    <SelectItem value="notReturn">Not Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="rounded-md border flex-grow overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Is Return</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.eta ?? "n/a"}</TableCell>
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
                    <TableCell className="text-start">
                      {order.isReturn ? (
                        <CheckCircle className="w-4 h-4 text-green-500 " />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentOrder(order);
                          setIsModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <OrderDetails
              orderId={currentOrder?.id}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              callBackOnSuccess={(id) => {
                // setOrders(allOrders.filter((order) => order.id !== id));
                setRefresh(!refresh);
                handleSuccessToast("Order updated successfully");
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
