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

// Mock data for demonstration
const mockOrders = [
  {
    id: "001",
    customerName: "John Doe",
    status: "Pending",
    address: "123 Main St",
    assignedTruck: null,
    estimatedDelivery: null,
    hasComplaint: false,
    serviceCenter: null,
  },
  {
    id: "002",
    customerName: "Jane Smith",
    status: "Processing",
    address: "456 Elm St",
    assignedTruck: "TRUCK-001",
    estimatedDelivery: "2023-06-15",
    hasComplaint: true,
    serviceCenter: "Service Center A",
  },
  {
    id: "003",
    customerName: "Bob Johnson",
    status: "Shipped",
    address: "789 Oak St",
    assignedTruck: "TRUCK-002",
    estimatedDelivery: "2023-06-14",
    hasComplaint: false,
    serviceCenter: null,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAssigningTruck, setIsAssigningTruck] = useState(false);
  const [isAssigningServiceCenter, setIsAssigningServiceCenter] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedServiceCenter, setSelectedServiceCenter] = useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.includes(searchTerm)) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleAssignTruck = (orderIds, truckId) => {
    console.log(truckId);
    setOrders(
      orders.map((order) =>
        orderIds.includes(order.id)
          ? { ...order, assignedTruck: truckId }
          : order
      )
    );
    setSelectedOrders([]);
    setIsAssigningTruck(false);
    toast.success(`Selected orders have been assigned to truck ${truckId}`);
  };

  const handleAssignServiceCenter = (orderIds, serviceCenter) => {
    setOrders(
      orders.map((order) =>
        orderIds.includes(order.id)
          ? { ...order, serviceCenter: serviceCenter }
          : order
      )
    );
    setSelectedOrders([]);
    setIsAssigningServiceCenter(false);
    toast.success(`Selected orders have been assigned to ${serviceCenter}`);
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

  const assignOrders = orders.filter((order) =>
    selectedOrders.includes(order.id)
  );

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
              <Button
                onClick={() => setIsAssigningServiceCenter(true)}
                className="flex items-center"
              >
                <Building className="mr-2 h-4 w-4" />
                Assign Service Centers
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Order ID or Customer Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
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
            <OrderList
              orders={filteredOrders}
              onOrderClick={handleOrderClick}
              onComplaintClick={setSelectedComplaintId}
              onServiceCenterClick={setSelectedServiceCenter}
              selectedOrders={selectedOrders}
              onSelectOrder={handleSelectOrder}
              handleAssignTruckClick={handleAssignTruckClick}
            />
            {selectedOrder && (
              <OrderDetails
                order={selectedOrders}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
          </div>
        </CardContent>
      </Card>
      {isAssigningTruck && selectedOrders.length > 0 && (
        <TruckAssignmentModal
          orders={assignOrders}
          onAssign={(truckId) => handleAssignTruck(selectedOrders, truckId)}
          onClose={() => setIsAssigningTruck(false)}
        />
      )}

      {isAssigningServiceCenter && (
        <ServiceCenterAssignmentModal
          orders={orders.filter((order) => selectedOrders.includes(order.id))}
          onAssign={(serviceCenter) =>
            handleAssignServiceCenter(selectedOrders, serviceCenter)
          }
          onClose={() => setIsAssigningServiceCenter(false)}
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
