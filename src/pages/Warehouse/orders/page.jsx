import { useState } from "react";
import { OrderList } from "../../../components/Warehouse/orders/order-list";
import { OrderDetails } from "../../../components/Warehouse/orders/order-details";
import { TruckAssignmentModal } from "../../../components/Warehouse/orders/truck-assignment-modal";
import { ServiceCenterAssignmentModal } from "../../../components/Warehouse/orders/service-center-assignment-modal";
import { ComplaintDetailsModal } from "../../../components/Warehouse/complaints/complaint-details-modal";
import { ServiceCenterDetailsModal } from "../../../components/Warehouse/service-center/service-center-details-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Building } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Search } from "lucide-react";

// Mock data for demonstration

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAssigningTruck, setIsAssigningTruck] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedServiceCenter, setSelectedServiceCenter] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleAssignTruck = () => {
    setOrders(orders.filter((o) => !selectedOrders.includes(o.id)));
    setSelectedOrders([]);
    setIsAssigningTruck(false);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handleAssignTruckClick = () => {
    if (selectedOrders.length === 0) {
      toast.error("No orders selected. Please select at least one order");
      return;
    }
    setIsAssigningTruck(true);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/warehouse/orders/data");
      if (res.status === 200) {
        setOrders(res.data);
      }

      const resDriver = await axios.get("/api/drivers/getfree");
      if (resDriver.status === 200) {
        setDrivers(resDriver.data);
      }

      const resTruck = await axios.get("/api/trucks?filter[status]=free");
      if (resTruck.status === 200) {
        setTrucks(resTruck.data.trucks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2 h-6 w-6" />
            Orders Management
          </CardTitle>
          {selectedOrders.length > 0 && (
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  handleAssignTruckClick();
                }}
                className="flex items-center"
              >
                <Truck className="mr-2 h-4 w-4" />
                Assign Trucks
              </Button>
              <ServiceCenterAssignmentModal order={selectedOrders} />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by Order ID or Customer Name"
                className="pl-8 pr-10 py-5 rounded-md"
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {orders.length > 0 && (
              <OrderList
                orders={orders}
                onOrderClick={handleOrderClick}
                onComplaintClick={setSelectedComplaintId}
                onServiceCenterClick={setSelectedServiceCenter}
                selectedOrders={selectedOrders}
                onSelectOrder={handleSelectOrder}
                handleAssignTruckClick={handleAssignTruckClick}
              />
            )}
            {selectedOrder && (
              <OrderDetails
                order={selectedOrders}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
          </div>
        </CardContent>
      </Card>
      {/* {drivers.length > 0 &&
        trucks.length > 0 &&
        
        selectedOrders.length > 0 && ( */}
      {isAssigningTruck && (
        <TruckAssignmentModal
          drivers={drivers}
          trucks={trucks}
          selectedOrders={selectedOrders}
          onAssign={handleAssignTruck}
          onClose={() => setIsAssigningTruck(false)}
        />
      )}

      {selectedComplaintId && (
        <ComplaintDetailsModal
          complaintId={selectedComplaintId}
          onClose={() => setSelectedComplaintId(null)}
        />
      )}

      {selectedServiceCenter && (
        <ServiceCenterDetailsModal
          serviceCenter={selectedServiceCenter}
          onClose={() => setSelectedServiceCenter(null)}
        />
      )}
    </div>
  );
}
